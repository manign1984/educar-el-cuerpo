(() => {
  const data = window.CHECK_CONTENT;
  const toolbox = document.querySelector('.concept-toolbox');
  const readingCheck = document.querySelector('.reading-check');
  const quiz = document.getElementById('quiz');
  if (!data || !toolbox || !readingCheck || !quiz || document.getElementById('conceptLab')) return;

  const storageKey = 'educar-el-cuerpo-comprobaciones-v1';
  const state = (() => {
    try {
      return {...{concepts:false,evidence:false,quiz:false}, ...JSON.parse(localStorage.getItem(storageKey) || '{}')};
    } catch {
      return {concepts:false,evidence:false,quiz:false};
    }
  })();

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const saveState = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
    updateRoute();
  };

  const route = document.createElement('section');
  route.className = 'learning-route';
  route.setAttribute('aria-labelledby', 'learningRouteTitle');
  route.innerHTML = `
    <header>
      <div><p class="mini-label">Progreso de lectura</p><h3 id="learningRouteTitle">Tres movimientos para comprobar la interpretación</h3></div>
      <p>El progreso se guarda sólo en este dispositivo.</p>
    </header>
    <div class="learning-steps">
      <article class="learning-step" data-progress-step="concepts"><span>01</span><h4>Aplicar conceptos</h4><p>Relacionar expresiones del artículo con las herramientas conceptuales.</p></article>
      <article class="learning-step" data-progress-step="evidence"><span>02</span><h4>Medir la evidencia</h4><p>Distinguir afirmaciones directas, inferencias y aquello que las fuentes no prueban.</p></article>
      <article class="learning-step" data-progress-step="quiz"><span>03</span><h4>Reconstruir el argumento</h4><p>Responder la comprobación final de la sección de lectura.</p></article>
    </div>
    <div class="learning-progress" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-valuenow="0"><span></span></div>
    <p class="learning-progress-copy" aria-live="polite">0 de 3 movimientos completados.</p>`;
  toolbox.before(route);

  const relations = document.createElement('section');
  relations.className = 'concept-relations';
  relations.innerHTML = `
    <header><div><p class="mini-label">Relaciones</p><h3>Los conceptos no funcionan de manera aislada</h3></div><p>Leé las conexiones como hipótesis para volver al texto.</p></header>
    <div class="relation-grid">${data.conceptRelations.map((relation, index) => `
      <article class="relation-card">
        <span>Conexión 0${index + 1}</span>
        <h4>${escapeHtml(relation.from)} ↔ ${escapeHtml(relation.to)}</h4>
        <p>${escapeHtml(relation.text)}</p>
      </article>`).join('')}</div>`;
  toolbox.appendChild(relations);

  const lab = document.createElement('section');
  lab.className = 'concept-lab';
  lab.id = 'conceptLab';
  lab.innerHTML = `
    <header class="concept-lab-heading">
      <div><p class="mini-label">Laboratorio conceptual</p><h3>Usar los conceptos para leer evidencias</h3></div>
      <p>No se trata de recordar definiciones de memoria. Cada elección debe ayudar a explicar qué operación realiza el texto sobre los cuerpos, la población o las prácticas.</p>
    </header>
    <section class="check-stage" id="conceptCases" aria-labelledby="conceptCasesTitle">
      <header><span>01</span><div><h4 id="conceptCasesTitle">¿Qué concepto permite interpretar cada formulación?</h4><p>Elegí la herramienta que mejor explica la evidencia. Una misma fuente puede admitir más de una lectura, pero aquí se solicita la relación predominante desarrollada en el artículo.</p></div></header>
      <div class="check-items"></div>
      <div class="check-actions"><button type="button" data-check="concepts">Comprobar conceptos</button><button class="secondary" type="button" data-reset="concepts">Reiniciar</button></div>
      <p class="check-result" aria-live="polite"></p>
    </section>
    <section class="evidence-meter" id="evidenceMeter" aria-labelledby="evidenceMeterTitle">
      <header><span>02</span><div><h4 id="evidenceMeterTitle">¿Hasta dónde permite llegar la evidencia?</h4><p>Clasificá cada enunciado según el grado de apoyo que ofrecen los cuadernillos y la lectura historiográfica de Orbuch.</p></div></header>
      <div class="check-items"></div>
      <div class="check-actions"><button type="button" data-check="evidence">Comprobar evidencia</button><button class="secondary" type="button" data-reset="evidence">Reiniciar</button></div>
      <p class="check-result" aria-live="polite"></p>
    </section>`;
  readingCheck.before(lab);

  const renderCards = (container, items, labels, prefix) => {
    const list = container.querySelector('.check-items');
    list.innerHTML = items.map((item, index) => `
      <article class="check-card" data-answer="${escapeHtml(item.answer)}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <p>${escapeHtml(item.text)}</p>
        <select aria-label="Respuesta del enunciado ${index + 1}">
          <option value="">Elegir una opción</option>
          ${Object.entries(labels).map(([value,label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('')}
        </select>
        <p class="item-feedback" aria-live="polite" data-feedback="${prefix}-${index}"></p>
      </article>`).join('');
  };

  renderCards(lab.querySelector('#conceptCases'), data.conceptCases, data.conceptLabels, 'concept');
  renderCards(lab.querySelector('#evidenceMeter'), data.evidenceClaims, data.evidenceLabels, 'evidence');

  const evaluate = (kind) => {
    const config = kind === 'concepts'
      ? {container: lab.querySelector('#conceptCases'), items:data.conceptCases}
      : {container: lab.querySelector('#evidenceMeter'), items:data.evidenceClaims};
    const cards = [...config.container.querySelectorAll('.check-card')];
    let correct = 0;
    let answered = 0;

    cards.forEach((card, index) => {
      const selected = card.querySelector('select').value;
      const feedback = card.querySelector('.item-feedback');
      const isCorrect = selected === config.items[index].answer;
      if (selected) answered += 1;
      if (isCorrect) correct += 1;
      card.classList.toggle('is-correct', isCorrect);
      card.classList.toggle('is-incorrect', Boolean(selected) && !isCorrect);
      if (!selected) {
        feedback.textContent = 'Elegí una opción antes de comprobar.';
      } else {
        feedback.textContent = `${isCorrect ? 'Correcto. ' : 'Revisá la clasificación. '}${config.items[index].feedback}`;
      }
    });

    const result = config.container.querySelector('.check-result');
    const completed = correct === config.items.length;
    result.classList.toggle('is-complete', completed);
    result.textContent = answered < config.items.length
      ? `Respondiste ${answered} de ${config.items.length} enunciados. Completá los restantes y volvé a comprobar.`
      : completed
        ? `${correct} de ${config.items.length} correctos. El movimiento quedó completado.`
        : `${correct} de ${config.items.length} correctos. Leé las devoluciones y volvé a intentar.`;

    if (completed) {
      state[kind] = true;
      saveState();
    }
  };

  const reset = (kind) => {
    const container = kind === 'concepts' ? lab.querySelector('#conceptCases') : lab.querySelector('#evidenceMeter');
    container.querySelectorAll('select').forEach(select => { select.value = ''; });
    container.querySelectorAll('.check-card').forEach(card => card.classList.remove('is-correct','is-incorrect'));
    container.querySelectorAll('.item-feedback').forEach(feedback => { feedback.textContent = ''; });
    const result = container.querySelector('.check-result');
    result.textContent = '';
    result.classList.remove('is-complete');
    state[kind] = false;
    saveState();
    container.scrollIntoView({behavior:'smooth', block:'start'});
  };

  lab.querySelectorAll('[data-check]').forEach(button => button.addEventListener('click', () => evaluate(button.dataset.check)));
  lab.querySelectorAll('[data-reset]').forEach(button => button.addEventListener('click', () => reset(button.dataset.reset)));

  const quizNote = document.createElement('div');
  quizNote.className = 'quiz-enhancement-note';
  quizNote.innerHTML = '<span>03</span><p>Las pistas orientan la relectura, pero no muestran la opción correcta. La comprobación puede repetirse todas las veces que sea necesario.</p>';
  quiz.before(quizNote);

  [...quiz.querySelectorAll('fieldset')].forEach((fieldset, index) => {
    const number = document.createElement('span');
    number.className = 'quiz-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const hintButton = document.createElement('button');
    hintButton.className = 'quiz-hint-button';
    hintButton.type = 'button';
    hintButton.textContent = 'Mostrar pista';
    hintButton.setAttribute('aria-expanded', 'false');
    const hint = document.createElement('p');
    hint.className = 'quiz-hint';
    hint.hidden = true;
    hint.textContent = data.quizHints[index] || 'Volvé al texto y buscá la relación entre problema, destinatarios y forma de intervención.';
    hintButton.addEventListener('click', () => {
      hint.hidden = !hint.hidden;
      hintButton.setAttribute('aria-expanded', String(!hint.hidden));
      hintButton.textContent = hint.hidden ? 'Mostrar pista' : 'Ocultar pista';
    });
    fieldset.append(number, hintButton, hint);
  });

  const quizBanner = document.createElement('div');
  quizBanner.className = 'quiz-complete-banner';
  quizBanner.hidden = true;
  quizBanner.textContent = 'Comprobación completa: reconociste la tesis, la comparación de experiencias y los límites de implementación.';
  quiz.appendChild(quizBanner);

  const inspectQuiz = () => {
    const fields = [...quiz.querySelectorAll('fieldset')];
    const complete = fields.length > 0 && fields.every(field => field.querySelector('.feedback')?.classList.contains('ok'));
    quizBanner.hidden = !complete;
    state.quiz = complete;
    saveState();
  };

  quiz.addEventListener('submit', () => setTimeout(inspectQuiz, 0));
  document.getElementById('resetQuiz')?.addEventListener('click', () => {
    state.quiz = false;
    quizBanner.hidden = true;
    saveState();
  });

  function updateRoute() {
    const completed = ['concepts','evidence','quiz'].filter(key => state[key]).length;
    route.querySelectorAll('[data-progress-step]').forEach(step => {
      step.classList.toggle('is-complete', Boolean(state[step.dataset.progressStep]));
    });
    const progress = route.querySelector('.learning-progress');
    progress.setAttribute('aria-valuenow', String(completed));
    progress.querySelector('span').style.width = `${(completed / 3) * 100}%`;
    route.querySelector('.learning-progress-copy').textContent = completed === 3
      ? '3 de 3 movimientos completados. La sección de lectura quedó resuelta.'
      : `${completed} de 3 movimientos completados.`;
  }

  updateRoute();
})();
