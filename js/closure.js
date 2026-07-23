(() => {
  const data = window.CLOSURE_CONTENT;
  const section = document.getElementById('cierre');
  if (!data || !section || section.dataset.closureReady === 'true') return;
  section.dataset.closureReady = 'true';

  const storageKey = 'educar-el-cuerpo-cierre-v1';
  const defaultCriteria = Object.fromEntries(data.criteria.map(item => [item.id, false]));
  const defaultState = {
    pasado: '',
    presente: '',
    futuro: '',
    caseId: data.presentCases[0].id,
    caseText: '',
    finalText: '',
    criteria: defaultCriteria,
    complete: false
  };

  const state = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return {
        ...defaultState,
        ...saved,
        criteria: {...defaultCriteria, ...(saved.criteria || {})}
      };
    } catch {
      return {...defaultState, criteria: {...defaultCriteria}};
    }
  })();

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const heading = section.querySelector('.section-heading');
  [...section.children].forEach(child => { if (child !== heading) child.remove(); });

  const module = document.createElement('div');
  module.className = 'closure-module';
  module.innerHTML = `
    <div class="closure-opening">
      <article class="closure-manifesto">
        <p class="mini-label">Cerrar no es clausurar</p>
        <h3>Usar el pasado para orientar preguntas, decisiones y futuros posibles</h3>
        <p>La conciencia histórica no consiste en trasladar mecánicamente una experiencia de 1949 o 1950 hacia el presente. Exige reconstruir su contexto, reconocer herencias y rupturas, interrogar problemas actuales y formular una orientación propia.</p>
        <p>El cierre retoma las dos fuentes, la interpretación comparada y la diferencia entre intención e implementación. Después abre una pregunta: qué educación corporal queremos construir cuando el Estado, la escuela, el trabajo o la tecnología intentan intervenir sobre los cuerpos.</p>
        <div class="closure-principle"><strong>Movimiento central:</strong> pasado, presente y futuro se relacionan mediante una interpretación argumentada, no por semejanza superficial.</div>
      </article>
      <aside class="closure-compass">
        <p class="mini-label">Brújula final</p>
        <h3>Una genealogía para tomar posición</h3>
        <ol>
          <li>Reconstruir de dónde proviene un problema.</li>
          <li>Distinguir qué permanece y qué cambió.</li>
          <li>Reconocer qué evidencia sostiene la comparación.</li>
          <li>Proponer un futuro deseable y sus criterios.</li>
        </ol>
      </aside>
    </div>

    <section class="closure-progress" aria-labelledby="closureProgressTitle">
      <header><div><p class="mini-label">Progreso del cierre</p><h3 id="closureProgressTitle">Seis movimientos para completar la producción</h3></div><p>El avance se guarda solamente en este navegador.</p></header>
      <div class="closure-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="6" aria-valuenow="0"><span></span></div>
      <p class="closure-progress-copy" aria-live="polite">0 de 6 movimientos desarrollados.</p>
    </section>

    <section class="temporal-bridge" aria-labelledby="temporalBridgeTitle">
      <header class="temporal-heading"><p class="mini-label">Puente temporal</p><h3 id="temporalBridgeTitle">Pasado, presente y futuro</h3></header>
      <div class="temporal-grid">
        ${data.temporalMovements.map(item => `
          <article class="temporal-card">
            <header><span>${item.number}</span><p class="temporal-label">${escapeHtml(item.label)}</p><h4>${escapeHtml(item.title)}</h4></header>
            <p class="temporal-prompt">${escapeHtml(item.prompt)}</p>
            <p class="temporal-guide">${escapeHtml(item.guide)}</p>
            <textarea data-temporal="${item.id}" aria-label="Reflexión sobre ${escapeHtml(item.label)}" placeholder="${escapeHtml(item.placeholder)}"></textarea>
          </article>`).join('')}
      </div>
    </section>

    <section class="present-lab" aria-labelledby="presentLabTitle">
      <header class="present-heading"><p class="mini-label">Laboratorio del presente</p><h3 id="presentLabTitle">Elegir un problema actual para interrogar</h3></header>
      <div class="present-layout">
        <div class="present-cases" role="list" aria-label="Casos para comparar">
          ${data.presentCases.map(item => `
            <button class="present-case" type="button" data-present-case="${item.id}" aria-pressed="false">
              <strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.question)}</span>
            </button>`).join('')}
        </div>
        <article class="present-analysis">
          <p class="mini-label">Caso seleccionado</p>
          <h4 id="selectedCaseTitle"></h4>
          <p id="selectedCaseQuestion"></p>
          <textarea id="presentCaseText" placeholder="Describí el caso y comparalo con las fuentes. Señalá al menos una continuidad, una ruptura y una pregunta abierta."></textarea>
          <small>No es necesario afirmar que las experiencias son iguales. La comparación histórica gana precisión cuando también marca diferencias.</small>
        </article>
      </div>
    </section>

    <section class="final-production" aria-labelledby="finalProductionTitle">
      <header class="final-heading"><p class="mini-label">Producción final</p><h3 id="finalProductionTitle">Una hipótesis entre herencias y futuros</h3></header>
      <div class="final-workspace">
        <aside class="final-scaffold">
          <h4>Preguntas para organizar el texto</h4>
          <ol>${data.finalPrompts.map(prompt => `<li>${escapeHtml(prompt)}</li>`).join('')}</ol>
          <div class="sentence-starters">
            <p>Inicios posibles</p>
            ${data.sentenceStarters.map(starter => `<button type="button" data-sentence-starter="${escapeHtml(starter)}">${escapeHtml(starter)}</button>`).join('')}
          </div>
        </aside>
        <article class="final-editor">
          <div class="final-editor-top"><h4>Texto final</h4><span id="closureWordCount">0 palabras</span></div>
          <textarea id="closureFinalText" placeholder="Redactá una interpretación de al menos 180 palabras. Articulá las fuentes, el caso presente y una orientación futura."></textarea>
          <div class="final-editor-actions">
            <button type="button" id="importInterpretation">Traer hipótesis anterior</button>
            <button class="gold" type="button" id="checkClosure">Comprobar cierre</button>
            <button class="secondary" type="button" id="downloadClosure">Descargar producción</button>
            <button class="secondary" type="button" id="clearClosure">Borrar cierre</button>
          </div>
          <p class="final-status" id="closureStatus" aria-live="polite">El borrador se guarda automáticamente en este dispositivo.</p>
        </article>
      </div>
    </section>

    <section class="closure-selfcheck" aria-labelledby="selfcheckTitle">
      <article class="selfcheck-intro">
        <p class="mini-label">Autoevaluación</p>
        <h3 id="selfcheckTitle">Revisar antes de cerrar</h3>
        <p>Marcá cada criterio sólo cuando puedas localizarlo en tu producción. La autoevaluación no califica: devuelve información para revisar el texto.</p>
      </article>
      <div class="selfcheck-list">
        ${data.criteria.map(item => `
          <label data-criterion-label="${item.id}">
            <input type="checkbox" data-criterion="${item.id}"/>
            <span><strong>${escapeHtml(item.title)}</strong>${escapeHtml(item.text)}</span>
          </label>`).join('')}
      </div>
    </section>

    <section class="closure-result" aria-labelledby="closureResultTitle">
      <p class="mini-label">Estado del recorrido</p>
      <h3 id="closureResultTitle">La historia queda abierta como problema</h3>
      <p id="closureResultText">Completá las notas temporales, el caso presente, la producción final y la autoevaluación para cerrar el recorrido.</p>
      <div class="closure-result-actions">
        <button type="button" id="printClosure">Imprimir o guardar en PDF</button>
        <a class="secondary" href="#inicio">Volver al inicio</a>
      </div>
    </section>

    <section class="closure-references" aria-label="Referencias y privacidad">
      <article><h3>Fuentes del recorrido</h3><ul>${data.references.map(reference => `<li>${escapeHtml(reference)}</li>`).join('')}</ul></article>
      <aside class="privacy-note"><strong>Privacidad</strong>Los textos, selecciones y autoevaluaciones se almacenan localmente. La página no solicita nombre, correo ni otros datos personales y no envía las respuestas a un servidor.</aside>
    </section>

    <footer class="closure-footer"><p>Recurso educativo autónomo · Historia de la Educación Física · Argentina, 1946–1950</p><a href="#inicio">Reiniciar la lectura desde la portada</a></footer>`;
  section.appendChild(module);

  const temporalInputs = [...module.querySelectorAll('[data-temporal]')];
  const caseButtons = [...module.querySelectorAll('[data-present-case]')];
  const caseText = module.querySelector('#presentCaseText');
  const selectedCaseTitle = module.querySelector('#selectedCaseTitle');
  const selectedCaseQuestion = module.querySelector('#selectedCaseQuestion');
  const finalText = module.querySelector('#closureFinalText');
  const wordCountOutput = module.querySelector('#closureWordCount');
  const closureStatus = module.querySelector('#closureStatus');
  const resultText = module.querySelector('#closureResultText');
  const criterionInputs = [...module.querySelectorAll('[data-criterion]')];
  const progress = module.querySelector('.closure-progress-track');
  const progressBar = progress.querySelector('span');
  const progressCopy = module.querySelector('.closure-progress-copy');

  const wordCount = value => value.trim() ? value.trim().split(/\s+/).length : 0;
  const meaningful = (value, minimum = 45) => value.trim().length >= minimum;

  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
    updateProgress();
  };

  const currentCase = () => data.presentCases.find(item => item.id === state.caseId) || data.presentCases[0];

  const renderCase = () => {
    const item = currentCase();
    selectedCaseTitle.textContent = item.title;
    selectedCaseQuestion.textContent = item.question;
    caseButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.presentCase === item.id)));
  };

  const updateFinalStatus = () => {
    const words = wordCount(finalText.value);
    wordCountOutput.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
    if (!state.complete) {
      closureStatus.classList.remove('is-ready');
      closureStatus.textContent = words < 180
        ? `El texto tiene ${words} palabras. Desarrollá al menos 180 para comprobar el cierre.`
        : 'La extensión es suficiente. Revisá las notas temporales, el caso presente y los cuatro criterios antes de comprobar.';
    }
  };

  const completedMilestones = () => {
    const temporal = ['pasado','presente','futuro'].filter(key => meaningful(state[key], 45)).length;
    const present = meaningful(state.caseText, 70) ? 1 : 0;
    const final = wordCount(state.finalText) >= 180 ? 1 : 0;
    const criteria = data.criteria.every(item => state.criteria[item.id]) ? 1 : 0;
    return temporal + present + final + criteria;
  };

  function updateProgress() {
    const completed = completedMilestones();
    progress.setAttribute('aria-valuenow', String(completed));
    progressBar.style.width = `${(completed / 6) * 100}%`;
    progressCopy.textContent = completed === 6
      ? '6 de 6 movimientos desarrollados. El cierre está listo para comprobar.'
      : `${completed} de 6 movimientos desarrollados.`;

    if (state.complete) {
      resultText.textContent = 'Completaste una interpretación que relaciona pasado, presente y futuro, distingue evidencia e inferencia y formula una orientación propia para la educación corporal.';
    } else {
      resultText.textContent = 'Completá las notas temporales, el caso presente, la producción final y la autoevaluación para cerrar el recorrido.';
    }
  }

  temporalInputs.forEach(input => {
    input.value = state[input.dataset.temporal] || '';
    input.addEventListener('input', () => {
      state[input.dataset.temporal] = input.value;
      state.complete = false;
      save();
    });
  });

  caseText.value = state.caseText || '';
  caseText.addEventListener('input', () => {
    state.caseText = caseText.value;
    state.complete = false;
    save();
  });

  caseButtons.forEach(button => button.addEventListener('click', () => {
    state.caseId = button.dataset.presentCase;
    state.complete = false;
    renderCase();
    save();
  }));

  finalText.value = state.finalText || '';
  finalText.addEventListener('input', () => {
    state.finalText = finalText.value;
    state.complete = false;
    updateFinalStatus();
    save();
  });

  module.querySelectorAll('[data-sentence-starter]').forEach(button => button.addEventListener('click', () => {
    const starter = button.dataset.sentenceStarter;
    const start = finalText.selectionStart;
    const end = finalText.selectionEnd;
    const before = finalText.value.slice(0, start);
    const after = finalText.value.slice(end);
    const separator = before && !before.endsWith('\n') ? '\n' : '';
    finalText.value = `${before}${separator}${starter} ${after}`;
    finalText.focus();
    const position = before.length + separator.length + starter.length + 1;
    finalText.setSelectionRange(position, position);
    finalText.dispatchEvent(new Event('input'));
  }));

  criterionInputs.forEach(input => {
    input.checked = Boolean(state.criteria[input.dataset.criterion]);
    input.closest('label').classList.toggle('is-checked', input.checked);
    input.addEventListener('change', () => {
      state.criteria[input.dataset.criterion] = input.checked;
      state.complete = false;
      input.closest('label').classList.toggle('is-checked', input.checked);
      save();
    });
  });

  module.querySelector('#importInterpretation').addEventListener('click', () => {
    let previous = '';
    try {
      previous = JSON.parse(localStorage.getItem('educar-el-cuerpo-interpretacion-v1') || '{}').draft || '';
    } catch {}
    if (!previous) {
      closureStatus.classList.remove('is-ready');
      closureStatus.textContent = 'No se encontró una hipótesis guardada en la etapa anterior. Podés comenzar el texto directamente aquí.';
      return;
    }
    const prefix = finalText.value.trim() ? `${finalText.value.trim()}\n\n` : '';
    finalText.value = `${prefix}${previous}`;
    finalText.dispatchEvent(new Event('input'));
    closureStatus.textContent = 'La hipótesis anterior fue incorporada. Revisala y ampliala con el caso presente y la orientación futura.';
  });

  module.querySelector('#checkClosure').addEventListener('click', () => {
    const missing = [];
    ['pasado','presente','futuro'].forEach(key => {
      if (!meaningful(state[key], 45)) missing.push(`la nota de ${key}`);
    });
    if (!meaningful(state.caseText, 70)) missing.push('el análisis del caso presente');
    if (wordCount(state.finalText) < 180) missing.push('el texto final de al menos 180 palabras');
    if (!data.criteria.every(item => state.criteria[item.id])) missing.push('los cuatro criterios de autoevaluación');

    if (missing.length) {
      state.complete = false;
      closureStatus.classList.remove('is-ready');
      closureStatus.textContent = `Todavía falta completar: ${missing.join(', ')}.`;
      save();
      return;
    }

    state.complete = true;
    closureStatus.classList.add('is-ready');
    closureStatus.textContent = 'Cierre completado. La producción articula temporalidades, evidencia histórica y una orientación futura.';
    save();
    module.querySelector('.closure-result').scrollIntoView({behavior:'smooth', block:'center'});
  });

  module.querySelector('#downloadClosure').addEventListener('click', () => {
    const item = currentCase();
    const criteriaText = data.criteria.map(entry => `${state.criteria[entry.id] ? '[x]' : '[ ]'} ${entry.title}: ${entry.text}`).join('\n');
    const text = [
      'EDUCAR EL CUERPO DENTRO Y FUERA DEL AULA',
      'Cierre de conciencia histórica',
      '',
      '1. PASADO',
      state.pasado || '(Sin desarrollar)',
      '',
      '2. PRESENTE',
      state.presente || '(Sin desarrollar)',
      '',
      '3. FUTURO',
      state.futuro || '(Sin desarrollar)',
      '',
      `CASO PRESENTE: ${item.title}`,
      state.caseText || '(Sin desarrollar)',
      '',
      'PRODUCCIÓN FINAL',
      state.finalText || '(Sin desarrollar)',
      '',
      'AUTOEVALUACIÓN',
      criteriaText,
      '',
      `Estado: ${state.complete ? 'Cierre completado' : 'Cierre en proceso'}`,
      '',
      'Archivo generado localmente. No contiene datos personales ni fue enviado a un servidor.'
    ].join('\n');
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cierre-conciencia-historica-educar-el-cuerpo.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  module.querySelector('#clearClosure').addEventListener('click', () => {
    if (!confirm('¿Borrar todas las notas, el caso presente, el texto final y la autoevaluación guardados en este dispositivo?')) return;
    Object.assign(state, {...defaultState, criteria:{...defaultCriteria}});
    temporalInputs.forEach(input => { input.value = ''; });
    caseText.value = '';
    finalText.value = '';
    criterionInputs.forEach(input => {
      input.checked = false;
      input.closest('label').classList.remove('is-checked');
    });
    renderCase();
    updateFinalStatus();
    save();
    closureStatus.textContent = 'El cierre fue borrado. Podés comenzar una nueva producción.';
    module.querySelector('.temporal-bridge').scrollIntoView({behavior:'smooth', block:'start'});
  });

  module.querySelector('#printClosure').addEventListener('click', () => window.print());

  renderCase();
  updateFinalStatus();
  updateProgress();
})();
