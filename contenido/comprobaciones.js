window.CHECK_CONTENT = {
  conceptLabels: {
    integral: "Educación integral",
    biopolitica: "Biopolítica",
    normalizacion: "Normalización",
    prescripcion: "Prescripción e implementación"
  },
  conceptRelations: [
    {
      from: "Educación integral",
      to: "Normalización",
      text: "La formación conjunta de cuerpo, intelecto y moral se traduce en hábitos, posturas y conductas que deben incorporarse a la vida cotidiana."
    },
    {
      from: "Biopolítica",
      to: "Normalización",
      text: "La intervención estatal sobre salud y capacidades de la población se vuelve concreta mediante prácticas que regulan posturas, atención, disciplina y rendimiento."
    },
    {
      from: "Prescripción e implementación",
      to: "Los otros tres conceptos",
      text: "Permite distinguir entre el proyecto que las fuentes formulan y las prácticas que efectivamente pudieron realizarse en escuelas y oficinas."
    }
  ],
  conceptCases: [
    {
      text: "El maestro de grado debía comprender que la educación del cuerpo complementaba su tarea y no pertenecía exclusivamente al profesor especializado.",
      answer: "integral",
      feedback: "La formulación amplía la misión educativa del docente y rechaza separar la formación corporal del resto de la enseñanza."
    },
    {
      text: "Los ejercicios debían contribuir al desarrollo físico, intelectual y moral de quienes asistían a la escuela.",
      answer: "integral",
      feedback: "La articulación de dimensiones físicas, intelectuales y morales corresponde a la idea de educación integral."
    },
    {
      text: "La gimnasia de oficinas vinculaba salud, prolongación de la vida útil, disminución del ausentismo y productividad.",
      answer: "biopolitica",
      feedback: "La vida, la salud y las capacidades productivas de la población aparecen como asuntos sobre los que el Estado busca intervenir."
    },
    {
      text: "La política aspiraba a actuar sobre toda la población y a organizar centralizadamente prácticas corporales en distintos espacios.",
      answer: "biopolitica",
      feedback: "La escala poblacional y la gestión estatal de salud, hábitos y capacidades permiten reconocer una lectura biopolítica."
    },
    {
      text: "La repetición de ejercicios buscaba automatizar posturas correctas, regular la atención y producir conductas consideradas adecuadas.",
      answer: "normalizacion",
      feedback: "La producción de hábitos y conductas correctas, saludables y disciplinadas es una operación de normalización."
    },
    {
      text: "La gimnasia compensatoria prometía actuar positivamente sobre la disciplina escolar y reducir la necesidad de reconvenciones verbales.",
      answer: "normalizacion",
      feedback: "La propuesta no se limita al cuidado físico: también procura ordenar comportamientos y formas de autorregulación."
    },
    {
      text: "La tirada, las instrucciones y los horarios muestran qué quiso promover el Consejo, pero no prueban que todas las instituciones lo aplicaran.",
      answer: "prescripcion",
      feedback: "La fuente permite reconstruir una prescripción estatal; para demostrar la implementación harían falta otras evidencias."
    },
    {
      text: "La insistencia en persuadir a docentes y empleadores puede leerse como indicio de que la adhesión no estaba garantizada.",
      answer: "prescripcion",
      feedback: "El argumento distingue lo recomendado de su realización e interpreta la persuasión como una pista sobre resistencias o límites."
    }
  ],
  evidenceLabels: {
    directa: "La fuente permite afirmarlo",
    inferencia: "La fuente permite inferirlo",
    no_prueba: "La fuente no permite demostrarlo"
  },
  evidenceClaims: [
    {
      text: "El cuadernillo escolar prescribía ejercicios de hasta tres minutos en medio de las clases.",
      answer: "directa",
      feedback: "Es un dato explícito del documento: duración, momento y modalidad forman parte de la prescripción."
    },
    {
      text: "Todas las escuelas del país realizaron diariamente los ejercicios durante 1949.",
      answer: "no_prueba",
      feedback: "La distribución nacional y la tirada no demuestran una aplicación completa, diaria y uniforme."
    },
    {
      text: "La necesidad de convencer a los docentes sugiere que la propuesta podía encontrar resistencias o falta de adhesión.",
      answer: "inferencia",
      feedback: "No es una constatación directa de rechazo, sino una inferencia fundada en la insistencia persuasiva de la fuente."
    },
    {
      text: "El folleto de oficinas relacionaba los ejercicios con salud, disciplina, productividad y reducción del ausentismo.",
      answer: "directa",
      feedback: "Esas finalidades aparecen expresamente articuladas en la justificación del documento."
    },
    {
      text: "La totalidad de las empresas privadas aceptó incorporar pausas gimnásticas durante la jornada laboral.",
      answer: "no_prueba",
      feedback: "El cuadernillo expresa una propuesta y procura adhesión; no ofrece evidencia de adopción uniforme por las empresas."
    },
    {
      text: "Intervenir en oficinas privadas exigía más negociación que actuar dentro de escuelas dependientes del Estado.",
      answer: "inferencia",
      feedback: "La diferencia institucional entre escuela y empresa permite formular esta inferencia, pero no constituye un dato textual aislado."
    }
  ],
  quizHints: [
    "Revisá la diferencia entre continuidad institucional y ruptura de escala.",
    "Observá qué significa que una fuente tenga que explicar y persuadir insistentemente.",
    "Buscá aquello que comparten las prácticas breves del aula y de la oficina.",
    "Compará la capacidad estatal de intervenir en una escuela con su ingreso a una empresa privada."
  ]
};
