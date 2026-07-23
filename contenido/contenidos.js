window.SITE_CONTENT = {
  sections: [
    ["inicio", "Inicio"], ["problema", "Problema"], ["autor", "Autor"], ["contexto", "Contexto"],
    ["lectura", "Lectura"], ["archivo", "Archivo"], ["interpretacion", "Interpretación"], ["cierre", "Cierre"]
  ],
  argumentMap: [
    ["Historizar", "Reconstruye organismos y proyectos anteriores para evitar presentar 1946 como un comienzo absoluto de la intervención estatal sobre la cultura física."],
    ["Comparar proyectos", "Contrasta iniciativas ligadas al Ministerio de Guerra y a la Secretaría de Salud Pública para mostrar las disputas dentro de la coalición oficialista."],
    ["Leer las fuentes", "Analiza los cuadernillos de 1949 y 1950 como documentos prescriptivos: allí aparecen destinatarios, métodos, promesas y formas de legitimación."],
    ["Seguir la implementación", "Interpreta la necesidad de persuadir a docentes, empleados y empleadores como indicio de resistencias, negociaciones y límites concretos."]
  ],
  timeline: [
    ["1936–1938", "Continuidad", "Organismos que preceden al peronismo", "La creación de dependencias estatales dedicadas a la cultura física muestra que el interés por regular los cuerpos no comenzó en 1946."],
    ["1946–1947", "Tensión", "Tres proyectos, distintas dependencias", "Las iniciativas legislativas oscilaron entre el Ministerio de Guerra y la Secretaría de Salud Pública."],
    ["6 NOV 1947", "Institución", "Consejo Nacional de Educación Física", "Perón dispuso su creación mediante el decreto 34.817. El organismo buscó planificar y extender la educación corporal a escala nacional."],
    ["1949", "Aula", "El cuerpo entra en cada hora escolar", "Gimnasia compensatoria en el aula propuso prácticas diarias de hasta tres minutos dirigidas por el maestro de grado. Se imprimieron 10.000 ejemplares."],
    ["1950", "Oficina", "Salud, trabajo y oficina", "Gimnasia de oficinas intentó trasladar la educación corporal al ámbito laboral privado y articular salud, rendimiento y relaciones laborales."]
  ],
  concepts: [
    ["Educación integral", "Concepción que rechaza separar la formación física, intelectual y moral. En el texto permite presentar la gimnasia como parte de la misión de todo educador."],
    ["Biopolítica", "Intervención estatal sobre la vida, la salud, los hábitos y las capacidades de la población."],
    ["Normalización", "Producción de hábitos y conductas considerados correctos, saludables, disciplinados y productivos."],
    ["Prescripción / implementación", "Diferencia entre lo que una política ordena o recomienda y lo que efectivamente ocurre en instituciones y prácticas."]
  ],
  quiz: [
    {q:"¿Qué distingue al Consejo creado en 1947 según Orbuch?", options:["La inexistencia de antecedentes","La escala nacional y masiva de sus políticas","La eliminación de toda influencia militar"], correct:1, feedback:"La novedad no radica en una creación desde cero, sino en la escala, la centralización y el alcance poblacional."},
    {q:"¿Por qué la insistencia persuasiva de los cuadernillos es históricamente significativa?", options:["Porque prueba una aplicación uniforme","Porque permite inferir resistencias y necesidad de adhesión","Porque reemplaza toda evidencia institucional"], correct:1, feedback:"La necesidad de convencer docentes, empleados y empleadores funciona como indicio de límites y negociaciones."}
  ],
  dossiers: [
    {year:"1949", title:"Gimnasia compensatoria en el aula", label:"Escuela primaria", summary:"Ejercicios breves, diarios y realizados en medio de las clases para contrarrestar la inmovilidad, ordenar la atención y formar hábitos posturales.", print:"10.000 ejemplares", url:"https://educar-el-cuerpo.man-ign.chatgpt.site/archivo/gimnasia-compensatoria-1949.pdf"},
    {year:"1950", title:"Gimnasia de oficinas", label:"Ámbito laboral", summary:"Pausas de cinco a diez minutos durante la jornada, dirigidas por líderes elegidos entre los trabajadores y justificadas por la salud, la disciplina y la producción.", print:"5.000 ejemplares", url:"https://educar-el-cuerpo.man-ign.chatgpt.site/archivo/gimnasia-oficinas-1950.pdf"}
  ],
  evidence: [
    {text:"El folleto escolar se imprimió en 10.000 ejemplares y fue distribuido en escuelas de todo el país.", answer:"alcance"},
    {text:"Se indica practicar tres minutos a mitad de cada hora escolar.", answer:"prescripcion"},
    {text:"El material insiste en convencer al plantel docente de las ventajas de la propuesta.", answer:"tension"},
    {text:"En las oficinas se formarían líderes entre los propios trabajadores.", answer:"implementacion"},
    {text:"La gimnasia prometía mejorar salud, disciplina, relaciones laborales y productividad.", answer:"legitimacion"}
  ]
};
