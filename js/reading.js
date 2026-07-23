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
  let activeChapterId = null;

  const escapeHtml = (value = '') => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const parseAccessibleText = (raw) => {
    const lines = raw.replace(/\r/g, '').split('\n');
    const parsed = [];
    let current = null;
    let intro = [];

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
    activeChapterId = null;
  };

  const highlightSelectedChapter = () => {
    clearSpeakingHighlight();
    if (chapterSelect.value === 'all') return;
    const chapter = document.getElementById(chapterSelect.value);
    if (chapter) {
      activeChapterId = chapter.id;
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
      status.textContent = 'Este navegador no ofrece lectura por voz. El texto y el PDF siguen disponibles.';
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
        ? 'Reproduciendo la síntesis completa. Podés abrir el PDF sin interrumpir la voz.'
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
      status.textContent = 'La lectura por voz se interrumpió. Podés volver a iniciarla.';
      clearSpeakingHighlight();
      currentUtterance = null;
    };

    speechSynthesis.speak(currentUtterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    currentUtterance = null;
    playButton.textContent = 'Escuchar';
    status.textContent = 'Lectura detenida.';
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

  fetch(c.reading.textUrl)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el texto accesible.');
      return response.text();
    })
    .then(raw => renderText(parseAccessibleText(raw)))
    .catch(() => {
      textContainer.innerHTML = '<p class="reading-loading">No fue posible cargar la síntesis en esta sesión. Podés abrirla mediante el enlace superior.</p>';
      status.textContent = 'La lectura por voz no está disponible porque el texto no pudo cargarse.';
    });

  if ('speechSynthesis' in window) speechSynthesis.getVoices();
})();
