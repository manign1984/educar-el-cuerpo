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
  contextAxes: [
    {id:"transformacion", number:"01", title:"Un país industrial y urbano", text:"La expansión fabril, el crecimiento de las ciudades y las migraciones internas transformaron la composición de la población y multiplicaron los espacios de trabajo asalariado."},
    {id:"bienestar", number:"02", title:"Democratización del bienestar", text:"La redistribución de ingresos y la ampliación de políticas educativas, sanitarias y previsionales acercaron derechos, consumos y servicios a sectores más amplios."},
    {id:"estado", number:"03", title:"Centralización y alcance nacional", text:"El peronismo procuró coordinar organismos, recursos y programas para intervenir sobre la población como un conjunto y sobre todo el territorio nacional."},
    {id:"cuerpo", number:"04", title:"El cuerpo como asunto público", text:"Salud, postura, disciplina, educación integral y productividad convergieron en políticas que buscaron formar hábitos dentro y fuera de la escuela."}
  ],
  contextStats: [
    {value:"62,7 %", label:"de la población argentina residía en localidades urbanas en 1947", source:"Torre y Pastoriza"},
    {value:"2,1 %", label:"de crecimiento anual de la matrícula primaria entre 1946 y 1950", source:"Torre y Pastoriza"},
    {value:"10.000", label:"ejemplares de Gimnasia compensatoria en el aula distribuidos en 1949", source:"Orbuch"},
    {value:"5.000", label:"ejemplares informados para Gimnasia de oficinas en 1950", source:"Orbuch"}
  ],
  timeline: [
    {
      date:"1930–1945", label:"Transformación estructural", axes:["transformacion"],
      title:"Industrialización, urbanización y nuevas migraciones internas",
      text:"La crisis mundial y la Segunda Guerra favorecieron la producción local de manufacturas. Las fábricas y talleres se expandieron alrededor de las ciudades, mientras grandes contingentes del interior migraron hacia los centros urbanos en busca de empleo.",
      why:"La fábrica, la oficina, el transporte y la vida urbana se convierten en escenarios estratégicos para políticas que quieren intervenir sobre hábitos, salud y rendimiento."
    },
    {
      date:"1936–1938", label:"Antecedentes", axes:["estado","cuerpo"],
      title:"La cultura física ya contaba con organismos estatales",
      text:"Antes de la llegada del peronismo al gobierno se crearon dependencias destinadas a regular y difundir la educación corporal.",
      points:[
        "21 de julio de 1936: Dirección General de Educación Física y Cultura de la provincia de Buenos Aires.",
        "4 de junio de 1937: Consejo Nacional de Educación Física.",
        "17 de junio de 1938: Dirección General de Educación Física bajo el Ministerio de Justicia e Instrucción Pública."
      ],
      why:"Orbuch utiliza estos antecedentes para evitar una interpretación fundacional: 1946 no fue un comienzo absoluto."
    },
    {
      date:"17 OCT 1945", label:"Sociedad de masas", axes:["transformacion","bienestar"],
      title:"Nuevos trabajadores ocupan el centro de la escena política",
      text:"La movilización del 17 de octubre hizo visible una Argentina transformada por la urbanización, las migraciones internas y la expansión del trabajo industrial. La incorporación política de esos sectores fue más rápida que su integración social plena.",
      why:"Las políticas de alcance masivo se dirigen a una población urbana y trabajadora que adquiere centralidad política y reclama una pertenencia más igualitaria."
    },
    {
      date:"SEP 1946–FEB 1947", label:"Proyectos en disputa", axes:["estado","cuerpo"],
      title:"Tres iniciativas y dos modos de pensar la Educación Física",
      text:"En pocos meses se presentaron proyectos que ubicaban la conducción de la Educación Física bajo el Ministerio de Guerra o bajo la Secretaría de Salud Pública. Las propuestas combinaron educación integral, medicina social, preparación militar y regulación del trabajo.",
      why:"El oficialismo no fue un bloque homogéneo: la política corporal se construyó en medio de tensiones institucionales e ideológicas."
    },
    {
      date:"1946–1949", label:"Bienestar y servicios", axes:["bienestar","estado"],
      title:"Educación y salud amplían su escala de intervención",
      text:"La Secretaría de Salud Pública creada en 1946 fue elevada a ministerio en 1949. La educación obtuvo una jurisdicción ministerial independiente en 1948 y mayores recursos para extender el acceso a la enseñanza.",
      points:[
        "La acción sanitaria buscó integrar atención médica, prevención y asistencia social.",
        "La matrícula primaria retomó su crecimiento y la enseñanza media se expandió con fuerza.",
        "La ambición universalista convivió con obstáculos administrativos, territoriales e institucionales."
      ],
      why:"La educación corporal formó parte de una ampliación más general del radio de acción estatal sobre la salud, la educación y la vida cotidiana."
    },
    {
      date:"6 NOV 1947", label:"Institución", axes:["estado","cuerpo"],
      title:"Creación del Consejo Nacional de Educación Física",
      text:"Luego de las demoras legislativas, Perón creó el organismo mediante el decreto 34.817. Su rasgo distintivo fue la voluntad de proveer contenidos, métodos, recursos humanos y materiales para toda la población y el territorio nacional.",
      why:"Aquí se articula la tesis central de Orbuch: continuidad institucional, pero ruptura en la escala, la masividad y la centralización."
    },
    {
      date:"1949", label:"Aula", axes:["cuerpo","estado"],
      title:"La gimnasia ingresa en medio de todas las clases",
      text:"Gimnasia compensatoria en el aula propuso ejercicios diarios de hasta tres minutos para estudiantes de segundo a sexto grado, dirigidos por el maestro de grado y distribuidos mediante una tirada de 10.000 ejemplares.",
      why:"El Estado buscó convertir cada hora escolar y a cada docente en vehículos de educación corporal, aunque necesitó persuadirlos para lograr adhesión."
    },
    {
      date:"1950", label:"Oficina", axes:["cuerpo","bienestar"],
      title:"La educación corporal sale de la escuela y entra al trabajo",
      text:"Gimnasia de oficinas recomendó pausas de cinco a diez minutos, líderes elegidos entre los trabajadores y argumentos que vinculaban postura, salud, relaciones laborales, disciplina, productividad y disminución del ausentismo.",
      why:"La propuesta muestra tanto la ambición de extender la política a espacios privados como los límites del Estado para intervenir efectivamente dentro de las empresas."
    }
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
