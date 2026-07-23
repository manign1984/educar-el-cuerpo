(() => {
  const c = window.SITE_CONTENT;
  const textContainer = document.getElementById('readingText');
  const tabs = [...document.querySelectorAll('[data-reading-tab]')];
  const panels = [...document.querySelectorAll('[data-reading-panel]')];
  const chapterSelect = document.getElementById('voiceChapter');
  const speed = document.getElementById('voiceSpeed');
  const speedOutput = document.getElementById('voiceSpeedOutput');
  const playButton = document.getElementById('voicePlay');
  const stopButton = document.getElementById('voiceStop');
  const status = document.getElementById('voiceStatus');
  const pdfFrame = document.getElementById('articlePdf');

  if (!textContainer) return;

  let chapters = [];
  let currentUtterance = null;

  const escapeHtml = (value = '') => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const injectAudiobookStyles = () => {
    if (document.getElementById('audiobook-inline-styles')) return;
    const style = document.createElement('style');
    style.id = 'audiobook-inline-styles';
    style.textContent = `
      .audiobook-player{margin:0 0 20px;padding:16px;background:#fffaf0;color:#071b35;border:2px solid #f3c552;box-shadow:4px 4px 0 rgba(211,63,43,.9)}
      .audiobook-player .mini-label{margin-bottom:7px;color:#d33f2b}
      .audiobook-player h4{margin:0 0 7px;font:900 1.15rem/1.15 Georgia,serif}
      .audiobook-player p{margin:0 0 13px;font-size:.78rem;line-height:1.45}
      .audiobook-frame{display:block;width:100%;height:112px;border:0;background:#111;margin:0 0 12px}
      .audiobook-meta{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:center}
      .audiobook-meta small{font-size:.67rem;color:#4d626d}
      .audiobook-open{display:inline-block;padding:9px 11px;background:#071b35;color:#fff4c8;text-decoration:none;text-transform:uppercase;letter-spacing:.05em;font:900 .62rem/1 "Arial Narrow",Arial,sans-serif}
      .voice-fallback{border-top:1px solid rgba(255,255,255,.3);padding-top:15px}
      .voice-fallback summary{cursor:pointer;color:#f3c552;text-transform:uppercase;letter-spacing:.055em;font:900 .66rem/1.3 "Arial Narrow",Arial,sans-serif}
      .voice-fallback[open] summary{margin-bottom:16px}
      .voice-fallback-body{padding-top:1px}
      .audio-migration-note{margin-top:16px!important}
      @media(max-width:520px){.audiobook-frame{height:128px}.audiobook-meta{display:block}.audiobook-open{margin-top:9px}}
    `;
    document.head.appendChild(style);
  };

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes)) return '';
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const installAudiobook = (config) => {
    const listeningConsole = document.querySelector('.listening-console');
    const listeningHeader = document.querySelector('.listening-header');
    const listeningBody = document.querySelector('.listening-body');
    const contractText = document.querySelector('.reading-contract > p:not(.mini-label)');
    if (!listeningConsole || !listeningHeader || !listeningBody || !config?.previewUrl) return;

    injectAudiobookStyles();
    listeningConsole.setAttribute('aria-label', 'Audiolibro y escucha asistida');
    const headerLabel = listeningHeader.querySelector('.mini-label');
    const headerTitle = listeningHeader.querySelector('h3');
    const headerText = listeningHeader.querySelector('p');
    if (headerLabel) headerLabel.textContent = 'Audiolibro';
    if (headerTitle) headerTitle.textContent = 'Escuchar el texto completo';
    if (headerText) headerText.textContent = 'La reproducción continúa mientras consultás la síntesis o el artículo en PDF.';
    if (contractText) contractText.textContent = 'Podés recorrer la síntesis accesible, consultar el artículo académico en PDF y reproducir el audiolibro completo. Texto y sonido funcionan juntos o de manera independiente.';

    const originalNodes = [...listeningBody.children];
    const fallbackDetails = document.createElement('details');
    fallbackDetails.className = 'voice-fallback';
    const fallbackSummary = document.createElement('summary');
    fallbackSummary.textContent = 'Lectura automática de respaldo';
    const fallbackBody = document.createElement('div');
    fallbackBody.className = 'voice-fallback-body';
    originalNodes.forEach(node => fallbackBody.appendChild(node));
    const migrationNote = fallbackBody.querySelector('.audio-migration-note');
    if (migrationNote) migrationNote.innerHTML = '<strong>Alternativa accesible:</strong> esta voz automática permite elegir capítulos y velocidad cuando no se desea utilizar el audiolibro grabado.';
    fallbackDetails.append(fallbackSummary, fallbackBody);

    const player = document.createElement('section');
    player.className = 'audiobook-player';
    player.innerHTML = `
      <p class="mini-label">Versión grabada · MP3</p>
      <h4>${escapeHtml(config.title || 'Audiolibro')}</h4>
      <p>Reproducción alojada en ${escapeHtml(config.host || 'Google Drive')}. Usá el control del reproductor para iniciar, pausar y desplazarte por el audio.</p>
      <iframe class="audiobook-frame" src="${escapeHtml(config.previewUrl)}" title="Audiolibro: ${escapeHtml(config.title || '')}" loading="lazy" allow="autoplay"></iframe>
      <div class="audiobook-meta">
        <small>${escapeHtml(config.mimeType || 'audio/mpeg')} · ${formatBytes(Number(config.sizeBytes))}</small>
        <a class="audiobook-open" href="${escapeHtml(config.openUrl)}" target="_blank" rel="noreferrer">Abrir audiolibro aparte</a>
      </div>
    `;

    listeningBody.replaceChildren(player, fallbackDetails);
  };

  const parseAccessibleText = (raw) => {
    const lines = raw.replace(/\r/g, '').split('\n');
    const parsed = [];
    let current = null;
    const intro = [];

    for (const line of lines) {
      const clean = line.trim();
      if (!clean) {
        if (current) current.blocks.push({type: 'space'});
        continue;
      }

      const heading = clean.match(/^(\d+)\.\s+(.+)$/);
      if (heading) {
        current = {
          id: `lectura-capitulo-${heading[1]}`,
          number: heading[1],
          title: heading[2],
          blocks: []
        };
        parsed.push(current);
        continue;
      }

      if (!current) {
        intro.push(clean);
        continue;
      }

      if (clean.startsWith('- ')) {
        current.blocks.push({type: 'list', text: clean.slice(2)});
      } else {
        current.blocks.push({type: 'paragraph', text: clean});
      }
    }

    return {intro, chapters: parsed};
  };

  const renderText = ({intro, chapters: parsed}) => {
    chapters = parsed;
    const title = intro[2] || 'Educar al cuerpo dentro y fuera del aula';
    const noteIndex = intro.findIndex(line => line === 'Nota');
    const note = noteIndex >= 0 ? intro[noteIndex + 1] : 'Síntesis accesible para acompañar el artículo académico.';

    const chapterHtml = parsed.map((chapter) => {
      let html = '';
      let openList = false;
      chapter.blocks.forEach((block) => {
        if (block.type === 'list') {
          if (!openList) {
            html += '<ul>';
            openList = true;
          }
          html += `<li>${escapeHtml(block.text)}</li>`;
          return;
        }
        if (openList) {
          html += '</ul>';
          openList = false;
        }
        if (block.type === 'paragraph') html += `<p>${escapeHtml(block.text)}</p>`;
      });
      if (openList) html += '</ul>';

      return `<section class="reading-chapter" id="${chapter.id}" data-reading-chapter="${chapter.id}">
        <h4><span>${chapter.number}.</span> ${escapeHtml(chapter.title)}</h4>
        ${html}
      </section>`;
    }).join('');

    textContainer.innerHTML = `<header>
      <p class="mini-label">Síntesis accesible</p>
      <h3>${escapeHtml(title.replace(/[“”]/g, ''))}</h3>
      <p>${escapeHtml(note)}</p>
    </header>${chapterHtml}`;

    chapterSelect.innerHTML = `<option value="all">Recorrido completo</option>${parsed.map((chapter) =>
      `<option value="${chapter.id}">${chapter.number}. ${escapeHtml(chapter.title)}</option>`
    ).join('')}`;

    playButton.disabled = false;
    stopButton.disabled = false;
    status.textContent = 'Texto cargado. Elegí un capítulo o reproducí el recorrido completo.';
  };

  const chapterPlainText = (chapter) => {
    const body = chapter.blocks
      .filter(block => block.type !== 'space')
      .map(block => block.text || '')
      .join('. ');
    return `${chapter.number}. ${chapter.title}. ${body}`;
  };

  const selectedSpeechText = () => {
    const value = chapterSelect.value;
    if (value === 'all') return chapters.map(chapterPlainText).join('. ');
    const chapter = chapters.find(item => item.id === value);
    return chapter ? chapterPlainText(chapter) : '';
  };

  const clearSpeakingHighlight = () => {
    document.querySelectorAll('.reading-chapter.is-speaking').forEach(el => el.classList.remove('is-speaking'));
  };

  const highlightSelectedChapter = () => {
    clearSpeakingHighlight();
    if (chapterSelect.value === 'all') return;
    const chapter = document.getElementById(chapterSelect.value);
    if (chapter) {
      chapter.classList.add('is-speaking');
      chapter.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const chooseSpanishVoice = () => {
    const voices = speechSynthesis.getVoices();
    return voices.find(voice => /^es-AR/i.test(voice.lang))
      || voices.find(voice => /^es/i.test(voice.lang))
      || null;
  };

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      status.textContent = 'Este navegador no ofrece lectura por voz. El texto, el PDF y el audiolibro siguen disponibles.';
      return;
    }

    if (speechSynthesis.speaking && speechSynthesis.paused) {
      speechSynthesis.resume();
      playButton.textContent = 'Pausar';
      status.textContent = 'Lectura reanudada.';
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      playButton.textContent = 'Continuar';
      status.textContent = 'Lectura pausada. Podés seguir leyendo o cambiar de vista.';
      return;
    }

    const text = selectedSpeechText();
    if (!text) return;

    speechSynthesis.cancel();
    highlightSelectedChapter();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'es-AR';
    currentUtterance.rate = Number(speed.value);
    currentUtterance.pitch = 1;
    const voice = chooseSpanishVoice();
    if (voice) currentUtterance.voice = voice;

    currentUtterance.onstart = () => {
      playButton.textContent = 'Pausar';
      status.textContent = chapterSelect.value === 'all'
        ? 'Reproduciendo la síntesis completa mediante la voz automática.'
        : `Reproduciendo: ${chapterSelect.options[chapterSelect.selectedIndex].text}.`;
    };
    currentUtterance.onend = () => {
      playButton.textContent = 'Escuchar';
      status.textContent = 'Lectura finalizada.';
      clearSpeakingHighlight();
      currentUtterance = null;
    };
    currentUtterance.onerror = () => {
      playButton.textContent = 'Escuchar';
      status.textContent = 'La lectura automática se interrumpió. Podés volver a iniciarla.';
      clearSpeakingHighlight();
      currentUtterance = null;
    };

    speechSynthesis.speak(currentUtterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    currentUtterance = null;
    playButton.textContent = 'Escuchar';
    status.textContent = 'Lectura automática detenida.';
    clearSpeakingHighlight();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.readingTab;
      tabs.forEach(button => button.setAttribute('aria-selected', String(button === tab)));
      panels.forEach(panel => {
        panel.hidden = panel.dataset.readingPanel !== target;
      });
      if (target === 'pdf' && pdfFrame && !pdfFrame.src) pdfFrame.src = pdfFrame.dataset.src;
    });
  });

  chapterSelect.addEventListener('change', () => {
    stop();
    if (chapterSelect.value !== 'all') {
      document.getElementById(chapterSelect.value)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
  speed.addEventListener('input', () => {
    speedOutput.textContent = `${Number(speed.value).toFixed(1)}×`;
  });
  playButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);
  window.addEventListener('beforeunload', stop);

  fetch('contenido/audiolibro.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar la configuración del audiolibro.');
      return response.json();
    })
    .then(installAudiobook)
    .catch(() => {
      const migrationNote = document.querySelector('.audio-migration-note');
      if (migrationNote) migrationNote.textContent = 'El audiolibro no pudo cargarse en esta sesión. La lectura automática continúa disponible.';
    });

  fetch(c.reading.textUrl)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el texto accesible.');
      return response.text();
    })
    .then(raw => renderText(parseAccessibleText(raw)))
    .catch(() => {
      textContainer.innerHTML = '<p class="reading-loading">No fue posible cargar la síntesis en esta sesión. Podés abrirla mediante el enlace superior.</p>';
      status.textContent = 'La lectura automática no está disponible porque el texto no pudo cargarse.';
    });

  if ('speechSynthesis' in window) speechSynthesis.getVoices();
})();
