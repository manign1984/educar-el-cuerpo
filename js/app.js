(() => {
  const c = window.SITE_CONTENT;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const nav = $('#mainNav');
  c.sections.forEach(([id, name], i) => {
    const b = document.createElement('button');
    b.textContent = name;
    b.dataset.go = id;
    b.title = `${i+1}. ${name}`;
    nav.appendChild(b);
  });
  $$('[data-go]').forEach(el => el.addEventListener('click', () => document.getElementById(el.dataset.go)?.scrollIntoView({behavior:'smooth'})));

  $('#argumentMap').innerHTML = c.argumentMap.map((x,i)=>`<article><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');

  const contextAxes = $('#contextAxes');
  if (contextAxes) {
    contextAxes.innerHTML = c.contextAxes.map(axis=>`<button class="context-lens" type="button" data-context-filter="${axis.id}" data-filter-label="${axis.title}" aria-pressed="false"><span>${axis.number}</span><h4>${axis.title}</h4><p>${axis.text}</p></button>`).join('');
  }
  const contextStats = $('#contextStats');
  if (contextStats) {
    contextStats.innerHTML = c.contextStats.map(stat=>`<article class="context-stat"><strong>${stat.value}</strong><p>${stat.label}</p><small>Fuente: ${stat.source}</small></article>`).join('');
  }
  const timeline = $('#timeline');
  if (timeline) {
    timeline.innerHTML = c.timeline.map((item)=>{
      const points = item.points?.length ? `<ul>${item.points.map(point=>`<li>${point}</li>`).join('')}</ul>` : '';
      const tags = item.axes.map(axis=>`<span>${c.contextAxes.find(entry=>entry.id===axis)?.title || axis}</span>`).join('');
      return `<li data-axes="${item.axes.join(' ')}"><div class="context-date"><strong>${item.date}</strong><small>${item.label}</small></div><div class="context-marker" aria-hidden="true"></div><article class="context-event"><div class="context-event-tags">${tags}</div><h4>${item.title}</h4><p>${item.text}</p>${points}<p class="context-why"><strong>¿Qué ayuda a comprender?</strong>${item.why}</p></article></li>`;
    }).join('');
  }

  const concepts = $('#concepts');
  if (concepts) {
    concepts.innerHTML = `<h3>Herramientas conceptuales</h3>${c.concepts.map((concept,i)=>{
      const objectForm = typeof concept === 'object' && !Array.isArray(concept);
      const title = objectForm ? concept.title : concept[0];
      const definition = objectForm ? concept.definition : concept[1];
      const extra = objectForm ? `<div class="concept-body">
        <p><strong>Definición en este texto</strong>${definition}</p>
        <p><strong>Pista para reconocerlo</strong>${concept.clue}</p>
        <p><strong>No confundir con</strong>${concept.contrast}</p>
        <p><strong>Ejemplo</strong>${concept.example}</p>
      </div>` : `<div class="concept-body"><p>${definition}</p></div>`;
      return `<details><summary><span>0${i+1}</span>${title}</summary>${extra}</details>`;
    }).join('')}`;
  }

  const dossiers = $('#dossiers');
  if (dossiers) {
    dossiers.innerHTML = c.dossiers.map(d=>`<article class="dossier"><div class="cover"><small>Consejo Nacional de Educación Física</small><strong>${d.title}</strong><span>${d.year}</span></div><p class="tag">${d.label}</p><h3>${d.title}</h3><p>${d.summary}</p><p><b>Tirada informada:</b> ${d.print}</p><a class="button" target="_blank" rel="noreferrer" href="${d.url}">Abrir fuente digitalizada</a></article>`).join('');
  }

  const loadArchiveModule = () => {
    if (!document.querySelector('link[href="css/archive.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/archive.css';
      document.head.appendChild(link);
    }
    const dataScript = document.createElement('script');
    dataScript.src = 'contenido/archivo.js';
    dataScript.onload = () => {
      const archiveScript = document.createElement('script');
      archiveScript.src = 'js/archive.js';
      document.body.appendChild(archiveScript);
    };
    document.body.appendChild(dataScript);
  };
  loadArchiveModule();

  const quiz = $('#quiz');
  if (quiz) {
    quiz.innerHTML = `<h3>Primera comprobación</h3>${c.quiz.map((q,qi)=>`<fieldset data-q="${qi}"><legend>${q.q}</legend>${q.options.map((o,oi)=>`<label><input type="radio" name="q${qi}" value="${oi}"> ${o}</label>`).join('')}<div class="feedback" aria-live="polite"></div></fieldset>`).join('')}<div class="quiz-actions"><button type="submit">Comprobar respuestas</button><button class="secondary" id="resetQuiz" type="button">Volver a intentar</button></div><p class="quiz-total" id="quizTotal" aria-live="polite"></p>`;

    quiz.addEventListener('submit', e => {
      e.preventDefault();
      let correct = 0;
      let answered = 0;
      c.quiz.forEach((q,qi)=>{
        const fieldset = $(`fieldset[data-q="${qi}"]`,quiz);
        const selected = $('input:checked',fieldset);
        const out = $('.feedback',fieldset);
        if(!selected){
          out.textContent = 'Elegí una opción antes de comprobar.';
          out.className = 'feedback warn';
          return;
        }
        answered += 1;
        const ok = Number(selected.value) === q.correct;
        if (ok) correct += 1;
        out.textContent = `${ok ? 'Correcto. ' : 'Revisá la respuesta. '}${q.feedback}`;
        out.className = `feedback ${ok ? 'ok' : 'bad'}`;
      });
      const total = $('#quizTotal', quiz);
      total.textContent = answered < c.quiz.length
        ? `Respondiste ${answered} de ${c.quiz.length} preguntas. Completá las restantes y volvé a comprobar.`
        : `${correct} de ${c.quiz.length} respuestas correctas. ${correct === c.quiz.length ? 'Ya podés avanzar al archivo documental.' : 'Leé la retroalimentación y probá nuevamente.'}`;
    });

    $('#resetQuiz', quiz).addEventListener('click', () => {
      $$('input', quiz).forEach(input => { input.checked = false; });
      $$('.feedback', quiz).forEach(out => { out.textContent = ''; out.className = 'feedback'; });
      $('#quizTotal', quiz).textContent = '';
      quiz.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  const labels = {prescripcion:'Prescripción',implementacion:'Implementación',tension:'Tensión o límite',alcance:'Escala y alcance',legitimacion:'Justificación o legitimación'};
  const list = $('#evidenceActivity');
  if (list) {
    list.innerHTML = c.evidence.map((e,i)=>`<article class="evidence"><span>0${i+1}</span><p>${e.text}</p><select aria-label="Clasificación de evidencia ${i+1}"><option value="">Elegir categoría</option>${Object.entries(labels).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></article>`).join('');
    $('#checkEvidence').addEventListener('click', e=>{
      e.preventDefault();
      let good=0;
      $$('.evidence',list).forEach((card,i)=>{
        const ok=$('select',card).value===c.evidence[i].answer;
        card.classList.toggle('correct',ok);
        card.classList.toggle('incorrect',!ok);
        good+=ok?1:0;
      });
      $('#evidenceFeedback').textContent=`${good} de ${c.evidence.length} clasificaciones correctas. ${good===c.evidence.length?'La lectura distingue lo prescripto, sus fundamentos y sus problemas de realización.':'Revisá qué operación histórica permite hacer cada evidencia.'}`;
    });
    $('#resetEvidence').addEventListener('click', e=>{
      e.preventDefault();
      $$('select',list).forEach(x=>x.value='');
      $$('.evidence',list).forEach(x=>x.classList.remove('correct','incorrect'));
      $('#evidenceFeedback').textContent='';
    });
  }

  const writing=$('#finalWriting');
  if (writing) {
    const key='educar-el-cuerpo-borrador';
    writing.value=localStorage.getItem(key)||'';
    writing.addEventListener('input',()=>localStorage.setItem(key,writing.value));
    $('#clearWriting').addEventListener('click',e=>{e.preventDefault();if(confirm('¿Borrar el borrador guardado en este dispositivo?')){writing.value='';localStorage.removeItem(key);}});
    $('#downloadWriting').addEventListener('click',e=>{e.preventDefault();const blob=new Blob([writing.value||''],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='interpretacion-educar-el-cuerpo.txt';a.click();URL.revokeObjectURL(a.href);});
  }

  const sections=c.sections.map(([id])=>document.getElementById(id));
  const update=()=>{
    const y=scrollY+innerHeight*.28;
    let idx=0;
    sections.forEach((s,i)=>{if(s.offsetTop<=y)idx=i;});
    const [,name]=c.sections[idx];
    $('#sectionCount').textContent=`${String(idx+1).padStart(2,'0')} / ${String(c.sections.length).padStart(2,'0')}`;
    $('#sectionName').textContent=name;
    $('#progressBar').style.width=`${idx/(c.sections.length-1)*100}%`;
    $$('#mainNav button').forEach((b,i)=>b.classList.toggle('active',i===idx));
  };
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  update();
})();
