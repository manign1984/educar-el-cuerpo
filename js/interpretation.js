(() => {
  const data = window.INTERPRETATION_CONTENT;
  const section = document.getElementById('interpretacion');
  if (!data || !section || section.dataset.interpretationReady === 'true') return;
  section.dataset.interpretationReady = 'true';

  const storageKey = 'educar-el-cuerpo-interpretacion-v1';
  const defaultState = {chains:false, comparison:false, thesis:false, synthesis:false, draft:''};
  const state = (() => {
    try { return {...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}')}; }
    catch { return {...defaultState}; }
  })();

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;');

  const heading = section.querySelector('.section-heading');
  [...section.children].forEach(child => { if (child !== heading) child.remove(); });

  const shell = document.createElement('div');
  shell.className = 'interpretation-module';
  shell.innerHTML = `
    <div class="interpretation-opening">
      <article class="interpretation-brief">
        <p class="mini-label">Mesa de interpretación</p>
        <h3>Reconstruir una política sin confundir intención, argumento y realización</h3>
        <p>Las dos fuentes permiten observar una misma voluntad de extender la educación corporal, pero no describen espacios equivalentes ni ofrecen la misma capacidad de intervención estatal. La actividad reúne problemas, métodos, intermediarios, promesas y límites para producir una explicación comparada.</p>
        <p>El recorrido no busca repetir información: exige decidir qué evidencia sostiene cada afirmación y hasta dónde puede llegar la interpretación.</p>
        <div class="interpretation-principle"><strong>Regla de trabajo:</strong> una fuente prescriptiva permite reconstruir lo que se quiso hacer y cómo se intentó legitimarlo. Para afirmar qué ocurrió efectivamente se necesitan indicios adicionales.</div>
      </article>
      <aside class="interpretation-map">
        <p class="mini-label">Secuencia</p>
        <h3>Cuatro movimientos</h3>
        <ol>
          <li>Reconstruir la cadena de intervención de cada cuadernillo.</li>
          <li>Comparar qué corresponde al aula, a la oficina o a ambas.</li>
          <li>Ponderar el grado de apoyo de distintas interpretaciones.</li>
          <li>Redactar una síntesis que articule continuidad, escala y límites.</li>
        </ol>
      </aside>
    </div>
    <div class="interpretation-progress-card">
      <div class="interpretation-progress-top"><strong>Progreso de la actividad integradora</strong><span id="interpretationProgressCopy">0 de 4 movimientos completados</span></div>
      <div class="interpretation-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="0"><span></span></div>
    </div>

    <section class="interpretation-stage" id="chainStage">
      <header><span>01</span><div><h3>Reconstruir dos cadenas de intervención</h3><p>Relacioná en cada fuente el problema diagnosticado, la intervención, el intermediario, la promesa y el límite de implementación.</p></div></header>
      <div class="source-chain-grid" id="sourceChains"></div>
      <div class="interpretation-actions"><button type="button" data-stage-check="chains">Comprobar cadenas</button><button class="secondary" type="button" data-stage-reset="chains">Reiniciar</button></div>
      <p class="interpretation-result" data-stage-result="chains" aria-live="polite"></p>
    </section>

    <section class="interpretation-stage" id="comparisonStage">
      <header><span>02</span><div><h3>Comparar aula y oficina</h3><p>Determiná si cada formulación corresponde principalmente a la experiencia escolar, a la laboral o a ambas.</p></div></header>
      <div class="comparison-grid" id="comparisonCases"></div>
      <div class="interpretation-actions"><button type="button" data-stage-check="comparison">Comprobar comparación</button><button class="secondary" type="button" data-stage-reset="comparison">Reiniciar</button></div>
      <p class="interpretation-result" data-stage-result="comparison" aria-live="polite"></p>
    </section>

    <section class="interpretation-stage" id="thesisStage">
      <header><span>03</span><div><h3>Ponderar interpretaciones</h3><p>Clasificá cada tesis según esté sostenida por las fuentes, sostenida sólo en parte o no pueda demostrarse con este corpus.</p></div></header>
      <div class="thesis-grid" id="thesisCases"></div>
      <div class="interpretation-actions"><button type="button" data-stage-check="thesis">Comprobar tesis</button><button class="secondary" type="button" data-stage-reset="thesis">Reiniciar</button></div>
      <p class="interpretation-result" data-stage-result="thesis" aria-live="polite"></p>
    </section>

    <section class="interpretation-stage" id="synthesisStage">
      <header><span>04</span><div><h3>Construir una hipótesis integradora</h3><p>Redactá una explicación breve. No se evalúa una fórmula exacta: se solicita articular evidencias del artículo y de ambas fuentes.</p></div></header>
      <div class="synthesis-workspace">
        <aside class="synthesis-prompts"><p class="mini-label">Preguntas de apoyo</p><h4>La síntesis debería responder</h4><ol>${data.synthesisPrompts.map(prompt => `<li>${escapeHtml(prompt)}</li>`).join('')}</ol></aside>
        <div class="synthesis-editor">
          <label for="interpretationDraft">Hipótesis de trabajo</label>
          <textarea id="interpretationDraft" placeholder="Una posible formulación puede comenzar así: Las experiencias del aula y la oficina muestran que…"></textarea>
          <div class="synthesis-counter"><span id="interpretationWordCount">0 palabras</span><span>Extensión orientativa: 120–220 palabras</span></div>
          <p class="synthesis-status" id="synthesisStatus" aria-live="polite">El borrador se guarda automáticamente en este dispositivo.</p>
          <div class="interpretation-actions"><button type="button" id="saveSynthesis">Marcar síntesis como terminada</button><button class="secondary" type="button" id="downloadInterpretation">Descargar ficha</button><button class="secondary" type="button" id="clearSynthesis">Borrar borrador</button></div>
          <p class="export-note">La ficha descargada reúne el estado de los cuatro movimientos y tu síntesis. No se envía ninguna información a un servidor.</p>
        </div>
      </div>
    </section>

    <section class="interpretation-complete" id="interpretationComplete" hidden>
      <p class="mini-label">Actividad completada</p>
      <h3>La explicación ya distingue expansión estatal, mediaciones y límites</h3>
      <p>El paso siguiente será convertir esta hipótesis en una reflexión histórica que conecte pasado, presente y futuro sin perder la especificidad de las fuentes.</p>
    </section>`;
  heading.after(shell);

  const chainsRoot = shell.querySelector('#sourceChains');
  chainsRoot.innerHTML = data.sourceChains.map(source => `
    <article class="source-chain" data-source="${escapeHtml(source.id)}">
      <header><span>${escapeHtml(source.year)}</span><div><h4>${escapeHtml(source.title)}</h4><p>${escapeHtml(source.label)}</p></div></header>
      <div class="chain-fields">${source.fields.map(field => `
        <div class="chain-field" data-answer="${escapeHtml(field.answer)}">
          <label>${escapeHtml(field.label)}</label>
          <select aria-label="${escapeHtml(field.label)} de ${escapeHtml(source.title)}">
            <option value="">Elegir una opción</option>
            ${Object.entries(field.options).map(([value,label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('')}
          </select>
          <p class="chain-feedback" aria-live="polite"></p>
        </div>`).join('')}</div>
    </article>`).join('');

  const renderCards = (rootId, items, labels) => {
    const root = shell.querySelector(`#${rootId}`);
    root.innerHTML = items.map((item,index) => `
      <article class="interpretation-card" data-answer="${escapeHtml(item.answer)}">
        <span>${String(index + 1).padStart(2,'0')}</span>
        <div><p>${escapeHtml(item.text)}</p><select aria-label="Respuesta del enunciado ${index + 1}"><option value="">Elegir una opción</option>${Object.entries(labels).map(([value,label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('')}</select></div>
        <p class="card-feedback" aria-live="polite"></p>
      </article>`).join('');
  };
  renderCards('comparisonCases', data.comparisonCases, data.comparisonLabels);
  renderCards('thesisCases', data.thesisCases, data.thesisLabels);

  const stageConfig = {
    chains: {
      root: shell.querySelector('#chainStage'),
      cards: () => [...shell.querySelectorAll('.chain-field')],
      items: data.sourceChains.flatMap(source => source.fields),
      feedbackSelector: '.chain-feedback'
    },
    comparison: {
      root: shell.querySelector('#comparisonStage'),
      cards: () => [...shell.querySelectorAll('#comparisonCases .interpretation-card')],
      items: data.comparisonCases,
      feedbackSelector: '.card-feedback'
    },
    thesis: {
      root: shell.querySelector('#thesisStage'),
      cards: () => [...shell.querySelectorAll('#thesisCases .interpretation-card')],
      items: data.thesisCases,
      feedbackSelector: '.card-feedback'
    }
  };

  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
    updateProgress();
  };

  const evaluateStage = kind => {
    const config = stageConfig[kind];
    const cards = config.cards();
    let correct = 0;
    let answered = 0;
    cards.forEach((card,index) => {
      const select = card.querySelector('select');
      const value = select.value;
      const ok = value === config.items[index].answer;
      if (value) answered += 1;
      if (ok) correct += 1;
      card.classList.toggle('is-correct', ok);
      card.classList.toggle('is-incorrect', Boolean(value) && !ok);
      const feedback = card.querySelector(config.feedbackSelector);
      feedback.textContent = !value
        ? 'Elegí una opción antes de comprobar.'
        : `${ok ? 'Correcto. ' : 'Revisá esta relación. '}${config.items[index].feedback}`;
    });
    const completed = correct === cards.length;
    const result = shell.querySelector(`[data-stage-result="${kind}"]`);
    result.classList.toggle('is-complete', completed);
    result.textContent = answered < cards.length
      ? `Respondiste ${answered} de ${cards.length} relaciones. Completá las restantes y volvé a comprobar.`
      : completed
        ? `${correct} de ${cards.length} correctas. El movimiento quedó completado.`
        : `${correct} de ${cards.length} correctas. Utilizá las devoluciones para revisar la interpretación.`;
    state[kind] = completed;
    save();
  };

  const resetStage = kind => {
    const config = stageConfig[kind];
    config.cards().forEach(card => {
      card.querySelector('select').value = '';
      card.classList.remove('is-correct','is-incorrect');
      card.querySelector(config.feedbackSelector).textContent = '';
    });
    const result = shell.querySelector(`[data-stage-result="${kind}"]`);
    result.textContent = '';
    result.classList.remove('is-complete');
    state[kind] = false;
    save();
    config.root.scrollIntoView({behavior:'smooth',block:'start'});
  };

  shell.querySelectorAll('[data-stage-check]').forEach(button => button.addEventListener('click', () => evaluateStage(button.dataset.stageCheck)));
  shell.querySelectorAll('[data-stage-reset]').forEach(button => button.addEventListener('click', () => resetStage(button.dataset.stageReset)));

  const draft = shell.querySelector('#interpretationDraft');
  const count = shell.querySelector('#interpretationWordCount');
  const synthesisStatus = shell.querySelector('#synthesisStatus');
  draft.value = state.draft || '';

  const wordCount = value => value.trim() ? value.trim().split(/\s+/).length : 0;
  const updateDraftStatus = () => {
    const words = wordCount(draft.value);
    count.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
    state.draft = draft.value;
    if (!state.synthesis) {
      synthesisStatus.classList.remove('is-ready');
      synthesisStatus.textContent = words < 80
        ? 'El borrador se guarda automáticamente. Desarrollá al menos una comparación y una tensión de implementación.'
        : 'La extensión ya permite construir una hipótesis. Revisá que aparezcan aula, oficina, escala y límites antes de marcarla como terminada.';
    }
    save();
  };
  draft.addEventListener('input', updateDraftStatus);

  shell.querySelector('#saveSynthesis').addEventListener('click', () => {
    const words = wordCount(draft.value);
    if (words < 80) {
      state.synthesis = false;
      synthesisStatus.classList.remove('is-ready');
      synthesisStatus.textContent = `El borrador tiene ${words} palabras. Ampliá la explicación hasta al menos 80 para poder marcar este movimiento.`;
      save();
      return;
    }
    state.synthesis = true;
    synthesisStatus.classList.add('is-ready');
    synthesisStatus.textContent = 'Síntesis marcada como terminada. Podés seguir editándola o descargar la ficha de interpretación.';
    save();
  });

  shell.querySelector('#clearSynthesis').addEventListener('click', () => {
    if (!confirm('¿Borrar la síntesis guardada en este dispositivo?')) return;
    draft.value = '';
    state.draft = '';
    state.synthesis = false;
    synthesisStatus.classList.remove('is-ready');
    updateDraftStatus();
  });

  const stageSummary = key => state[key] ? 'Completado' : 'Pendiente';
  shell.querySelector('#downloadInterpretation').addEventListener('click', () => {
    const text = [
      'EDUCAR EL CUERPO DENTRO Y FUERA DEL AULA',
      'Ficha de interpretación',
      '',
      `1. Cadenas de intervención: ${stageSummary('chains')}`,
      `2. Comparación aula/oficina: ${stageSummary('comparison')}`,
      `3. Ponderación de interpretaciones: ${stageSummary('thesis')}`,
      `4. Síntesis integradora: ${stageSummary('synthesis')}`,
      '',
      'HIPÓTESIS DE TRABAJO',
      state.draft || '(Sin texto)',
      '',
      'Esta ficha fue generada localmente. No contiene datos personales ni fue enviada a un servidor.'
    ].join('\n');
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ficha-interpretacion-educar-el-cuerpo.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  function updateProgress() {
    const keys = ['chains','comparison','thesis','synthesis'];
    const completed = keys.filter(key => state[key]).length;
    const progress = shell.querySelector('.interpretation-progress-track');
    progress.setAttribute('aria-valuenow', String(completed));
    progress.querySelector('span').style.width = `${(completed / 4) * 100}%`;
    shell.querySelector('#interpretationProgressCopy').textContent = completed === 4
      ? '4 de 4 movimientos completados'
      : `${completed} de 4 movimientos completados`;
    shell.querySelector('#interpretationComplete').hidden = completed !== 4;
  }

  updateDraftStatus();
  if (state.synthesis) {
    synthesisStatus.classList.add('is-ready');
    synthesisStatus.textContent = 'Síntesis marcada como terminada. Podés seguir editándola o descargar la ficha de interpretación.';
  }
  updateProgress();
})();
