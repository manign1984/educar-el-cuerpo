(() => {
  const sources = window.ARCHIVE_SOURCES || [];
  const comparison = window.ARCHIVE_COMPARISON || [];
  const section = document.getElementById('archivo');
  if (!section || !sources.length) return;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const sourceCard = (source, index) => `
    <article class="archive-source-card" data-source-card="${escapeHtml(source.id)}" aria-current="${index === 0 ? 'true' : 'false'}">
      <div class="archive-cover">
        <span class="archive-year">${escapeHtml(source.year)}</span>
        <img src="${escapeHtml(source.coverUrl)}" alt="Portada digitalizada de ${escapeHtml(source.title)}" loading="lazy"/>
      </div>
      <div class="archive-card-body">
        <p class="mini-label">${escapeHtml(source.institution)} · ${escapeHtml(source.space)}</p>
        <h3>${escapeHtml(source.title)}</h3>
        <p>${escapeHtml(source.summary)}</p>
        <dl class="archive-meta">
          <div><dt>Destinatarios</dt><dd>${escapeHtml(source.audience)}</dd></div>
          <div><dt>Intermediario</dt><dd>${escapeHtml(source.intermediary)}</dd></div>
          <div><dt>Ritmo</dt><dd>${escapeHtml(source.rhythm)}</dd></div>
          <div><dt>Digitalización</dt><dd>${escapeHtml(source.pages)} · ${escapeHtml(source.fileSize)}</dd></div>
        </dl>
        <div class="archive-card-actions">
          <button type="button" data-open-source="${escapeHtml(source.id)}">Explorar documento</button>
          <a href="${escapeHtml(source.openUrl)}" target="_blank" rel="noreferrer">Abrir aparte</a>
        </div>
      </div>
    </article>`;

  const comparisonRows = comparison.map(row => `
    <tr>
      <td>${escapeHtml(row[0])}</td>
      <td>${escapeHtml(row[1])}</td>
      <td>${escapeHtml(row[2])}</td>
    </tr>`).join('');

  section.innerHTML = `
    <header class="section-heading"><span>06</span><div><p class="kicker">Fuentes primarias</p><h2>Entrar al archivo: dos cuadernillos, dos espacios cotidianos</h2></div></header>
    <div class="archive-opening">
      <article>
        <p class="mini-label">Mesa de consulta</p>
        <h3>Leer los documentos como intervenciones, no como espejos transparentes</h3>
        <p>Estos cuadernillos permiten conocer qué problemas diagnosticó el Consejo Nacional de Educación Física, qué prácticas quiso instalar, a quiénes convocó para ejecutarlas y con qué argumentos buscó legitimarlas. También permiten advertir silencios: la fuente prescribe, persuade y organiza, pero no demuestra por sí sola que la política se haya aplicado de manera homogénea.</p>
      </article>
      <aside class="archive-warning">
        <p class="mini-label">Regla de archivo</p>
        <h3>Separar lo que el documento dice de lo que podemos inferir</h3>
        <p>Primero describí soporte, destinatarios, instrucciones y promesas. Después formulá hipótesis sobre escala, normalización, mediadores y resistencias.</p>
      </aside>
    </div>

    <div class="archive-source-grid" id="archiveSourceGrid">
      ${sources.map(sourceCard).join('')}
    </div>

    <div class="archive-reader" id="archiveReader">
      <div class="archive-viewer">
        <div class="archive-viewer-toolbar">
          <div><small id="archiveViewerLabel">Documento seleccionado</small><strong id="archiveViewerTitle"></strong></div>
          <a id="archiveViewerOpen" href="#" target="_blank" rel="noreferrer">Abrir en una pestaña nueva</a>
        </div>
        <iframe class="archive-frame" id="archiveFrame" title="Visor de fuente primaria" loading="lazy"></iframe>
      </div>
      <aside class="archive-reader-notes">
        <section class="archive-note-block">
          <p class="mini-label">Qué mirar</p>
          <h4 id="archiveKeyTitle">Pistas de lectura</h4>
          <ul id="archiveClues"></ul>
        </section>
        <section class="archive-note-block">
          <p class="mini-label">Promesas del documento</p>
          <h4>Beneficios y finalidades</h4>
          <ul id="archivePromises"></ul>
        </section>
        <section class="archive-note-block archive-tension">
          <p class="mini-label">Indicio de tensión</p>
          <h4>Prescripción ≠ implementación</h4>
          <p id="archiveTension"></p>
        </section>
      </aside>
    </div>

    <section class="archive-comparison">
      <header class="archive-comparison-heading"><p class="mini-label">Lectura comparada</p><h3>Una política común cambia al atravesar instituciones diferentes</h3></header>
      <div class="archive-table-wrap">
        <table class="archive-table">
          <thead><tr><th>Dimensión</th><th>Gimnasia compensatoria en el aula</th><th>Gimnasia de oficinas</th></tr></thead>
          <tbody>${comparisonRows}</tbody>
        </table>
      </div>
      <div class="archive-activity">
        <span>?</span>
        <div><h4>Pregunta para salir del archivo</h4><p>¿Qué cambia en la capacidad de intervención estatal cuando la misma voluntad de educar el cuerpo se dirige a una escuela pública o intenta ingresar en una empresa privada?</p></div>
      </div>
    </section>`;

  const frame = document.getElementById('archiveFrame');
  const viewerTitle = document.getElementById('archiveViewerTitle');
  const viewerLabel = document.getElementById('archiveViewerLabel');
  const viewerOpen = document.getElementById('archiveViewerOpen');
  const clues = document.getElementById('archiveClues');
  const promises = document.getElementById('archivePromises');
  const tension = document.getElementById('archiveTension');
  const keyTitle = document.getElementById('archiveKeyTitle');
  const reader = document.getElementById('archiveReader');

  const selectSource = (id, scroll = false) => {
    const source = sources.find(item => item.id === id) || sources[0];
    document.querySelectorAll('[data-source-card]').forEach(card => {
      card.setAttribute('aria-current', String(card.dataset.sourceCard === source.id));
    });
    viewerLabel.textContent = `${source.year} · ${source.space} · ${source.pages}`;
    viewerTitle.textContent = source.title;
    viewerOpen.href = source.openUrl;
    frame.src = source.previewUrl;
    frame.title = `Fuente primaria: ${source.title}`;
    keyTitle.textContent = source.keyPages;
    clues.innerHTML = source.clues.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    promises.innerHTML = source.promises.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    tension.textContent = source.tension;
    if (scroll) reader.scrollIntoView({behavior:'smooth', block:'start'});
  };

  document.querySelectorAll('[data-open-source]').forEach(button => {
    button.addEventListener('click', () => selectSource(button.dataset.openSource, true));
  });

  selectSource(sources[0].id);
})();
