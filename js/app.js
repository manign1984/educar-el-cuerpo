(() => {
  const c = window.SITE_CONTENT;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const nav = $('#mainNav');
  c.sections.forEach(([id, name], i) => {
    const b = document.createElement('button'); b.textContent = name; b.dataset.go = id; b.title = `${i+1}. ${name}`; nav.appendChild(b);
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

  $('#concepts').innerHTML = `<h3>Herramientas conceptuales</h3>${c.concepts.map((x,i)=>`<details><summary><span>0${i+1}</span>${x[0]}</summary><p>${x[1]}</p></details>`).join('')}`;
  $('#dossiers').innerHTML = c.dossiers.map(d=>`<article class="dossier"><div class="cover"><small>Consejo Nacional de Educación Física</small><strong>${d.title}</strong><span>${d.year}</span></div><p class="tag">${d.label}</p><h3>${d.title}</h3><p>${d.summary}</p><p><b>Tirada informada:</b> ${d.print}</p><a class="button" target="_blank" rel="noreferrer" href="${d.url}">Abrir fuente digitalizada</a></article>`).join('');

  const quiz = $('#quiz');
  quiz.innerHTML = `<h3>Primera comprobación</h3>${c.quiz.map((q,qi)=>`<fieldset data-q="${qi}"><legend>${q.q}</legend>${q.options.map((o,oi)=>`<label><input type="radio" name="q${qi}" value="${oi}"> ${o}</label>`).join('')}<div class="feedback"></div></fieldset>`).join('')}<button class="button" type="submit">Comprobar respuestas</button>`;
  quiz.addEventListener('submit', e => {e.preventDefault(); c.quiz.forEach((q,qi)=>{const f=$(`fieldset[data-q="${qi}"]`,quiz), selected=$(`input:checked`,f), out=$('.feedback',f); if(!selected){out.textContent='Elegí una opción.';out.className='feedback warn';return;} const ok=Number(selected.value)===q.correct; out.textContent=(ok?'Correcto. ':'Revisá la respuesta. ')+q.feedback;out.className=`feedback ${ok?'ok':'bad'}`;});});

  const labels = {prescripcion:'Prescripción',implementacion:'Implementación',tension:'Tensión o límite',alcance:'Escala y alcance',legitimacion:'Justificación o legitimación'};
  const list = $('#evidenceActivity');
  list.innerHTML = c.evidence.map((e,i)=>`<article class="evidence"><span>0${i+1}</span><p>${e.text}</p><select aria-label="Clasificación de evidencia ${i+1}"><option value="">Elegir categoría</option>${Object.entries(labels).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></article>`).join('');
  $('#checkEvidence').addEventListener('click', e=>{e.preventDefault();let good=0;$$('.evidence',list).forEach((card,i)=>{const ok=$('select',card).value===c.evidence[i].answer;card.classList.toggle('correct',ok);card.classList.toggle('incorrect',!ok);good+=ok?1:0;});$('#evidenceFeedback').textContent=`${good} de ${c.evidence.length} clasificaciones correctas. ${good===c.evidence.length?'La lectura distingue lo prescripto, sus fundamentos y sus problemas de realización.':'Revisá qué operación histórica permite hacer cada evidencia.'}`;});
  $('#resetEvidence').addEventListener('click', e=>{e.preventDefault();$$('select',list).forEach(x=>x.value='');$$('.evidence',list).forEach(x=>x.classList.remove('correct','incorrect'));$('#evidenceFeedback').textContent='';});

  const writing=$('#finalWriting'), key='educar-el-cuerpo-borrador'; writing.value=localStorage.getItem(key)||''; writing.addEventListener('input',()=>localStorage.setItem(key,writing.value));
  $('#clearWriting').addEventListener('click',e=>{e.preventDefault();if(confirm('¿Borrar el borrador guardado en este dispositivo?')){writing.value='';localStorage.removeItem(key);}});
  $('#downloadWriting').addEventListener('click',e=>{e.preventDefault();const blob=new Blob([writing.value||''],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='interpretacion-educar-el-cuerpo.txt';a.click();URL.revokeObjectURL(a.href);});

  const sections=c.sections.map(([id])=>document.getElementById(id));
  const update=()=>{const y=scrollY+innerHeight*.28;let idx=0;sections.forEach((s,i)=>{if(s.offsetTop<=y)idx=i;});const [,name]=c.sections[idx];$('#sectionCount').textContent=`${String(idx+1).padStart(2,'0')} / ${String(c.sections.length).padStart(2,'0')}`;$('#sectionName').textContent=name;$('#progressBar').style.width=`${idx/(c.sections.length-1)*100}%`;$$('#mainNav button').forEach((b,i)=>b.classList.toggle('active',i===idx));};
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
})();
