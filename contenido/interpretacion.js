window.INTERPRETATION_CONTENT = {
  sourceChains: [
    {
      id: "aula",
      title: "Gimnasia compensatoria en el aula",
      year: "1949",
      label: "Escuela primaria",
      fields: [
        {
          key: "problema",
          label: "Problema diagnosticado",
          answer: "inmovilidad",
          options: {
            inmovilidad: "Inmovilidad forzada, posturas inadecuadas y pérdida de atención",
            ausentismo: "Ausentismo laboral y baja productividad",
            militarizacion: "Falta de preparación premilitar de la población"
          },
          feedback: "El cuadernillo atribuye los vicios posturales a los bancos, la inmovilidad del aula y ciertas técnicas de enseñanza."
        },
        {
          key: "intervencion",
          label: "Intervención propuesta",
          answer: "tres-minutos",
          options: {
            tres-minutos: "Ejercicios breves, diarios y dentro de las demás asignaturas",
            pausas-oficina: "Pausas de cinco a diez minutos durante la jornada laboral",
            clubes: "Prácticas deportivas voluntarias fuera del horario escolar"
          },
          feedback: "La propuesta buscaba introducir hasta tres minutos de gimnasia en medio de cada hora escolar."
        },
        {
          key: "intermediario",
          label: "Intermediario principal",
          answer: "maestro",
          options: {
            maestro: "Maestro o maestra de grado",
            lider: "Líder elegido entre los trabajadores",
            medico: "Médico escolar externo"
          },
          feedback: "El material amplía la responsabilidad corporal del docente común, no sólo la del profesor de Educación Física."
        },
        {
          key: "promesa",
          label: "Promesa legitimadora",
          answer: "atencion-disciplina",
          options: {
            atencion-disciplina: "Mejorar postura, atención, conducta y aprendizaje",
            produccion: "Aumentar producción y disminuir ausentismo",
            seleccion: "Seleccionar a los estudiantes físicamente más aptos"
          },
          feedback: "La gimnasia se presenta como una práctica capaz de reemplazar reconvenciones disciplinarias y favorecer la enseñanza."
        },
        {
          key: "limite",
          label: "Límite de implementación",
          answer: "resistencia-docente",
          options: {
            resistencia-docente: "Necesidad de persuadir al plantel docente y lograr su adhesión",
            empresa-privada: "Dificultad estatal para ingresar en empresas privadas",
            falta-alumnos: "Ausencia de población escolar suficiente"
          },
          feedback: "La insistencia en convencer al personal docente permite inferir resistencias o una adhesión que no estaba garantizada."
        }
      ]
    },
    {
      id: "oficina",
      title: "Gimnasia de oficinas",
      year: "1950",
      label: "Ámbito laboral",
      fields: [
        {
          key: "problema",
          label: "Problema diagnosticado",
          answer: "sedentarismo",
          options: {
            sedentarismo: "Sedentarismo, monotonía, fatiga y posturas laborales prolongadas",
            recreo: "Falta de recreos escolares organizados",
            alfabetizacion: "Dificultades de alfabetización de los trabajadores"
          },
          feedback: "El cuadernillo describe dolor, fatiga, inmovilidad y absorción mental producidos por el trabajo continuado y monótono."
        },
        {
          key: "intervencion",
          label: "Intervención propuesta",
          answer: "pausas",
          options: {
            pausas: "Pausas gimnásticas de cinco a diez minutos con ropa de trabajo",
            tres-minutos: "Tres minutos en medio de cada hora escolar",
            campamento: "Campamentos obligatorios de fin de semana"
          },
          feedback: "La práctica debía realizarse en el momento de mayor necesidad de pausa, sin cambiar la indumentaria laboral."
        },
        {
          key: "intermediario",
          label: "Intermediario principal",
          answer: "lideres",
          options: {
            lideres: "Líderes seleccionados entre los propios trabajadores",
            maestros: "Maestros de grado",
            militares: "Instructores enviados por el Ejército"
          },
          feedback: "El Consejo proponía formar líderes dentro de cada oficina para conducir el procedimiento."
        },
        {
          key: "promesa",
          label: "Promesa legitimadora",
          answer: "salud-produccion",
          options: {
            salud-produccion: "Preservar la salud, mejorar relaciones laborales y aumentar el rendimiento",
            examen: "Preparar a los empleados para un examen físico estatal",
            ocio: "Separar por completo el cuidado corporal de la productividad"
          },
          feedback: "El material combina beneficios para el empleado, el empleador y el desarrollo productivo del país."
        },
        {
          key: "limite",
          label: "Límite de implementación",
          answer: "privadas",
          options: {
            privadas: "Necesidad de obtener consenso dentro de empresas privadas",
            docentes: "Resistencia exclusiva de los maestros de escuela",
            normativa: "Prohibición legal de hacer pausas durante la jornada"
          },
          feedback: "Orbuch destaca la dificultad del Estado para avanzar en empresas privadas y la presencia esperable de escépticos."
        }
      ]
    }
  ],
  comparisonLabels: {
    aula: "Aula",
    oficina: "Oficina",
    ambas: "Ambas experiencias"
  },
  comparisonCases: [
    {
      text: "La intervención depende de una institución directamente integrada al sistema educativo estatal.",
      answer: "aula",
      feedback: "La escuela ofrecía una estructura estatal previa, aunque la adhesión docente no estuviera asegurada."
    },
    {
      text: "La propuesta combina el cuidado de la salud con argumentos sobre cantidad y calidad del trabajo.",
      answer: "oficina",
      feedback: "La productividad, el ausentismo y la relación entre empleados y jefes son argumentos específicos del ámbito laboral."
    },
    {
      text: "Los ejercicios son breves y buscan interrumpir los efectos de una inmovilidad prolongada.",
      answer: "ambas",
      feedback: "Aula y oficina comparten la idea de compensar la quietud mediante prácticas cortas incorporadas a la rutina."
    },
    {
      text: "La implementación se apoya en personas que no son necesariamente profesores de Educación Física.",
      answer: "ambas",
      feedback: "Maestros de grado y líderes de oficina debían actuar como intermediarios de la política."
    },
    {
      text: "La insistencia en persuadir revela que la aceptación de la propuesta no podía darse por supuesta.",
      answer: "ambas",
      feedback: "En los dos casos el lenguaje persuasivo permite inferir resistencias, escepticismo o negociación."
    },
    {
      text: "La propuesta busca actuar simultáneamente sobre postura, atención, disciplina escolar y aprendizaje.",
      answer: "aula",
      feedback: "Esa combinación aparece en la justificación pedagógica de la gimnasia compensatoria escolar."
    }
  ],
  thesisLabels: {
    sostenida: "Sostenida por las fuentes",
    parcial: "Sostenida sólo en parte",
    no-demostrable: "No demostrable con estas fuentes"
  },
  thesisCases: [
    {
      text: "El Consejo quiso ampliar la educación corporal hacia una población más extensa y hacia espacios cotidianos distintos.",
      answer: "sostenida",
      feedback: "Los dos cuadernillos y la interpretación de Orbuch sostienen una voluntad de expansión en escala, destinatarios y ámbitos."
    },
    {
      text: "Las dos iniciativas se aplicaron de manera uniforme en todas las escuelas y oficinas del país.",
      answer: "no-demostrable",
      feedback: "Las fuentes muestran prescripciones, tiradas y estrategias de persuasión, pero no prueban una aplicación uniforme."
    },
    {
      text: "El Estado peronista creó desde cero el interés gubernamental por la cultura física.",
      answer: "parcial",
      feedback: "Hubo organismos anteriores. La novedad destacada por Orbuch reside principalmente en la escala y masividad."
    },
    {
      text: "La educación corporal fue presentada como una herramienta de salud, formación de hábitos, disciplina y productividad.",
      answer: "sostenida",
      feedback: "Esas finalidades aparecen distribuidas de manera diferente entre el cuadernillo escolar y el laboral."
    },
    {
      text: "El lenguaje persuasivo de los documentos permite formular hipótesis sobre resistencias y límites de implementación.",
      answer: "sostenida",
      feedback: "Orbuch interpreta la necesidad de convencer y la mención de escépticos como señales de una distancia entre teoría y práctica."
    }
  ],
  synthesisPrompts: [
    "¿Qué continuidad institucional reconoce Orbuch antes de 1946?",
    "¿En qué consiste la ruptura de escala producida por el nuevo Consejo?",
    "¿Qué comparten las intervenciones del aula y la oficina?",
    "¿Por qué sus límites de implementación no fueron idénticos?"
  ]
};
