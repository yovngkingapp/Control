/* ================================================================
   Banco de datos · TEA 2do Control
   Fuentes: OMS (2024), Peiró & Martínez-Tur (2022),
            Hervás, Cebolla & Soler (2016), Gorbeña et al. (2021),
            Rodríguez Araneda et al. (2017)
   Estructura de cada pregunta:
     id      → identificador único
     text    → id del texto al que pertenece (1..5)
     q       → enunciado
     o       → array de 4 opciones
     c       → índice de la opción correcta (0..3)
     fb      → array de 4 retroalimentaciones (una por opción)
================================================================ */

export const TEXTS = [
  {
    id: 1,
    code: 'OMS (2024)',
    title: 'Intervenciones psicológicas',
    sub: 'Implementation Manual · Caps. 1, 2, 3 y 6',
    c1: '#60a5fa',
    c2: '#3b82f6'
  },
  {
    id: 2,
    code: 'Peiró & Martínez-Tur (2022)',
    title: 'Competencias digitalizadas',
    sub: 'Más allá de las competencias digitales puras',
    c1: '#a78bfa',
    c2: '#8b5cf6'
  },
  {
    id: 3,
    code: 'Hervás, Cebolla & Soler (2016)',
    title: 'Intervenciones basadas en mindfulness',
    sub: 'Mecanismos, evidencia y efectos adversos',
    c1: '#34d399',
    c2: '#10b981'
  },
  {
    id: 4,
    code: 'Gorbeña et al. (2021)',
    title: 'Psicología positiva y florecimiento',
    sub: 'Estudio piloto preexperimental',
    c1: '#fbbf24',
    c2: '#f59e0b'
  },
  {
    id: 5,
    code: 'Rodríguez Araneda et al. (2017)',
    title: 'Ética en selección de personal',
    sub: 'Psicólogos nóveles chilenos',
    c1: '#fb7185',
    c2: '#f43f5e'
  }
];

export const QUESTIONS = [

  /* ================= TEXTO 1 · OMS (2024) ================= */
  {
    id: 't1q1',
    text: 1,
    q: '¿Cuál es la estrategia central que propone el manual de la OMS (2024) para reducir la brecha global de atención en salud mental?',
    o: [
      'Expandir la psicoterapia convencional brindada exclusivamente por psiquiatras y psicólogos clínicos.',
      'El modelo de transferencia de tareas (task sharing): capacitar y supervisar a proveedores no especialistas para aplicar intervenciones manualizadas de baja intensidad.',
      'Sustituir las intervenciones psicológicas por intervenciones psicosociales de tipo informativo.',
      'Digitalizar la totalidad de las intervenciones mediante plataformas de e-learning.'
    ],
    c: 1,
    fb: [
      'Error conceptual: el manual advierte explícitamente que la solución NO es expandir la psicoterapia convencional de especialistas, porque esa vía perpetúa la brecha de atención. Su apuesta es el task sharing.',
      'Correcto: la estrategia central es el task sharing, que capacita y supervisa a proveedores no especialistas (trabajadores sanitarios comunitarios, enfermeros generales, voluntarios o personas con experiencia vivida) para aplicar intervenciones manualizadas de baja intensidad.',
      'Error: confundes intervención psicológica (estructurada, manualizada y basada en evidencia) con intervención psicosocial (más amplia, no necesariamente manualizada ni basada en evidencia). La OMS no las sustituye.',
      'Error: la digitalización existe (por ejemplo Step-by-Step, probado con refugiados sirios en Líbano), pero es un recurso puntual, no la estrategia central del manual.'
    ]
  },
  {
    id: 't1q2',
    text: 1,
    q: 'Según el manual de la OMS (2024), ¿cuántas personas en el mundo padecían aproximadamente un trastorno mental en 2019?',
    o: [
      '1 de cada 8, alrededor de 970 millones.',
      '1 de cada 4, alrededor de 2.000 millones.',
      '1 de cada 20, alrededor de 390 millones.',
      '1 de cada 3, alrededor de 2.600 millones.'
    ],
    c: 0,
    fb: [
      'Correcto: en 2019 cerca de 1 de cada 8 personas (unos 970 millones) padecía un trastorno mental, siendo la depresión y la ansiedad las principales causas de años vividos con discapacidad.',
      'Error de cifra: el manual habla de 1 de cada 8 personas (≈970 millones), no de 1 de cada 4.',
      'Error de cifra: subestimas notablemente la prevalencia. El dato exacto es 1 de cada 8 (≈970 millones).',
      'Error de cifra: sobreestimas la prevalencia. El dato exacto es 1 de cada 8 (≈970 millones).'
    ]
  },
  {
    id: 't1q3',
    text: 1,
    q: '¿Cuál es la distinción terminológica crucial que establece el manual entre intervención psicológica e intervención psicosocial?',
    o: [
      'La psicológica es un tratamiento estructurado, manualizado y respaldado por evidencia; la psicosocial es un término más amplio que abarca cualquier actividad interpersonal o informativa para mejorar el bienestar, no necesariamente manualizada ni basada en evidencia probada.',
      'La psicológica es más amplia e incluye a la psicosocial, que siempre está manualizada.',
      'Son términos sinónimos; el manual los usa de forma indistinta.',
      'La psicosocial es exclusiva de contextos de emergencia humanitaria y la psicológica de atención primaria.'
    ],
    c: 0,
    fb: [
      'Correcto: la intervención psicológica es tratamiento estructurado, manualizado y con evidencia empírica (TCC, activación conductual, solución de problemas, terapia interpersonal); la psicosocial es el término amplio y no necesariamente basado en evidencia.',
      'Error: inviertes la relación. La categoría amplia es la psicosocial; la estructurada y basada en evidencia es la psicológica.',
      'Error: el manual subraya que NO son sinónimos. Es una distinción terminológica crucial para la implementación.',
      'Error: el manual no restringe la intervención psicosocial a emergencias; lo que marca es su falta de manualización y de evidencia probada.'
    ]
  },
  {
    id: 't1q4',
    text: 1,
    q: '¿Cuáles son los programas transdiagnósticos desarrollados por la OMS destacados en el manual?',
    o: [
      'PM+ (Problem Management Plus), SH+ (Self-Help Plus), Thinking Healthy y Step-by-Step.',
      'MBSR y MBCT.',
      'TCC, activación conductual y terapia interpersonal.',
      'DigComp y ESCO.'
    ],
    c: 0,
    fb: [
      'Correcto: son protocolos diseñados para abordar síntomas comunes presentes en múltiples trastornos a la vez (ansiedad, depresión y estrés postraumático). Step-by-Step se probó en refugiados sirios en Líbano.',
      'Error: MBSR y MBCT son programas de mindfulness del texto de Hervás, Cebolla y Soler, no los transdiagnósticos de la OMS.',
      'Error: la TCC, la activación conductual y la terapia interpersonal son ejemplos de intervenciones psicológicas estructuradas, pero los transdiagnósticos destacados por la OMS son PM+, SH+, Thinking Healthy y Step-by-Step.',
      'Error: DigComp y ESCO son marcos de competencias digitales del texto de Peiró y Martínez-Tur.'
    ]
  },
  {
    id: 't1q5',
    text: 1,
    q: 'El Capítulo 2 del manual de la OMS (Planificación) se centra fundamentalmente en:',
    o: [
      'El análisis situacional local, 7 preguntas clave (por qué, cuál, dónde, cómo, qué otros servicios, quién entrena y cómo se entrega) y los modelos de atención escalonada (stepped care) y colaborativa.',
      'La adaptación de idioma, metáforas e ilustraciones de la intervención.',
      'La recolección continua de datos y la matriz de resultados.',
      'La descripción de la prevalencia global de trastornos mentales.'
    ],
    c: 0,
    fb: [
      'Correcto: el Capítulo 2 establece el análisis situacional local, las 7 preguntas clave y analiza los modelos de atención escalonada (stepped care) y colaborativa.',
      'Error: la adaptación (idioma, metáforas, ilustraciones) corresponde al Capítulo 3.',
      'Error: el monitoreo y la evaluación corresponden al Capítulo 6.',
      'Error: la prevalencia global se describe en el Capítulo 1 (Introducción), junto con la justificación del task sharing.'
    ]
  },
  {
    id: 't1q6',
    text: 1,
    q: 'Según el Capítulo 3 (Adaptación), ¿cuáles son los 4 criterios que debe cumplir una adaptación?',
    o: [
      'Precisa, comprensible, aceptable y relevante.',
      'Eficaz, eficiente, efectiva y equitativa.',
      'Fiable, válida, sensible y específica.',
      'Económica, escalable, sostenible y replicable.'
    ],
    c: 0,
    fb: [
      'Correcto: los cuatro criterios de adaptación son precisa, comprensible, aceptable y relevante.',
      'Error: esos son criterios de evaluación de servicios sanitarios, no los 4 criterios de adaptación del manual.',
      'Error: esos son criterios psicométricos propios de los instrumentos de medición.',
      'Error: son criterios de implementación y sostenibilidad, pero el manual fija precisa, comprensible, aceptable y relevante.'
    ]
  },
  {
    id: 't1q7',
    text: 1,
    q: 'Al adaptar una intervención psicológica (idioma, metáforas, ilustraciones), ¿qué debe preservarse por encima de todo?',
    o: [
      'Los ingredientes activos de la terapia.',
      'La duración exacta de cada sesión.',
      'El número de participantes por grupo.',
      'El título original del manual.'
    ],
    c: 0,
    fb: [
      'Correcto: el Capítulo 3 exige modificar idioma, metáforas e ilustraciones SIN alterar los ingredientes activos de la terapia.',
      'Error: el manual admite flexibilidad en el formato; lo intocable son los ingredientes activos, no la duración exacta.',
      'Error: el tamaño del grupo es un parámetro operativo ajustable; lo que no se altera son los ingredientes activos.',
      'Error: el título es irrelevante para la fidelidad de la intervención; lo crítico es preservar los ingredientes activos.'
    ]
  },
  {
    id: 't1q8',
    text: 1,
    q: 'En la matriz de resultados del Capítulo 6 (Monitoreo y Evaluación), ¿a qué nivel corresponden las "personas atendidas"?',
    o: [
      'Productos / Outputs.',
      'Resultados / Outcomes.',
      'Metas.',
      'Indicadores de riesgo.'
    ],
    c: 0,
    fb: [
      'Correcto: la matriz distingue Metas (reducir el sufrimiento), Resultados/Outcomes (atención efectiva) y Productos/Outputs (personas atendidas).',
      'Error: los Outcomes se refieren a la atención efectiva, no al conteo de personas atendidas.',
      'Error: la Meta es reducir el sufrimiento; el conteo de personas atendidas es un producto.',
      'Error: los indicadores de riesgo no constituyen un nivel de la matriz de resultados del manual.'
    ]
  },
  {
    id: 't1q9',
    text: 1,
    q: '¿Qué salvaguardas éticas exige el manual para el monitoreo y la evaluación (M&E)?',
    o: [
      'Consentimiento informado, confidencialidad, análisis por género y protocolos explícitos de manejo del riesgo de suicidio para personal no especialista.',
      'Únicamente la firma de un consentimiento al inicio de la terapia.',
      'Solo la anonimización de los datos clínicos.',
      'Ninguna, porque el M&E es una actividad puramente administrativa.'
    ],
    c: 0,
    fb: [
      'Correcto: el manual exige consentimiento informado, confidencialidad, análisis por género y protocolos explícitos de manejo del riesgo de suicidio adaptados a personal no especialista.',
      'Error: el consentimiento es solo una de las salvaguardas; faltan confidencialidad, análisis por género y manejo del riesgo suicida.',
      'Error: la anonimización es insuficiente; el manual exige un paquete completo de salvaguardas éticas.',
      'Error: el M&E no es neutral; implica riesgos éticos que el manual obliga a gestionar explícitamente.'
    ]
  },
  {
    id: 't1q10',
    text: 1,
    q: 'Respecto a la delimitación metodológica del documento analizado, ¿qué capítulos NO forman parte del archivo procesado?',
    o: [
      'Los capítulos 4 (Workforce) y 5 (Identification, Assessment and Delivery).',
      'Los capítulos 1 y 2.',
      'Los capítulos 3 y 6.',
      'Solo los anexos.'
    ],
    c: 0,
    fb: [
      'Correcto: el PDF disponible contiene solo los Capítulos 1, 2, 3 y 6 (junto con anexos); los capítulos 4 y 5 no forman parte del archivo procesado, por lo que la síntesis se limita estrictamente a las fases cubiertas.',
      'Error: los capítulos 1 y 2 sí están incluidos en el archivo.',
      'Error: los capítulos 3 y 6 sí están incluidos en el archivo.',
      'Error: los anexos sí forman parte del documento procesado; los ausentes son los capítulos 4 y 5.'
    ]
  },

  /* ================= TEXTO 2 · PEIRÓ & MARTÍNEZ-TUR (2022) ================= */
  {
    id: 't2q1',
    text: 2,
    q: '¿Qué tipo de documento es el trabajo de Peiró y Martínez-Tur (2022)?',
    o: [
      'Una propuesta teórica, conceptual y tipológica (no empírica).',
      'Un estudio empírico con grupo control y medidas repetidas.',
      'Una revisión sistemática con meta-análisis.',
      'Un estudio piloto preexperimental.'
    ],
    c: 0,
    fb: [
      'Correcto: es una propuesta teórica, conceptual y tipológica publicada en el Journal of Work and Organizational Psychology, que busca redirigir el debate sobre la transformación digital en el mercado laboral.',
      'Error: no es un estudio empírico; no comprueba hipótesis ni mide efectos directos.',
      'Error: no es una revisión sistemática ni un meta-análisis; es una propuesta conceptual.',
      'Error: el estudio piloto preexperimental corresponde a Gorbeña et al. (2021), del texto 4.'
    ]
  },
  {
    id: 't2q2',
    text: 2,
    q: '¿Cuál es la tesis principal del artículo?',
    o: [
      'Las competencias tradicionales no digitales se reconfiguran sustancialmente al ejecutarse en medios virtuales; la formación debe ir más allá de la alfabetización técnica básica.',
      'Las competencias digitales puras son lo único relevante para el futuro del trabajo.',
      'La digitalización destruye más empleos de los que crea, sin transformar las tareas existentes.',
      'El teletrabajo reduce la productividad de todos los equipos.'
    ],
    c: 0,
    fb: [
      'Correcto: los autores sostienen que la literatura, los gestores y los diseñadores de políticas se han enfocado de forma miope en las competencias digitales puras, ignorando la transformación de las competencias digitalizadas.',
      'Error: esa es justamente la mirada miope que los autores critican.',
      'Error: los autores señalan que el impacto más prevalente ocurre a nivel micro (transformación de tareas), no en la destrucción o creación neta de empleos.',
      'Error: el artículo no formula esa afirmación; su foco es la tipología de competencias digitalizadas.'
    ]
  },
  {
    id: 't2q3',
    text: 2,
    q: '¿Cuál es la diferencia entre competencias digitales puras y competencias digitalizadas?',
    o: [
      'Las puras son habilidades técnicas e informáticas operativas (software, programación, redes, ciberseguridad; DigComp, ESCO); las digitalizadas son competencias tradicionales no digitales transformadas en su naturaleza, conocimientos, actitudes y modo de ejecución al operar en entornos virtuales o con IA y algoritmos.',
      'Las puras se adquieren en la universidad y las digitalizadas se aprenden en el puesto de trabajo.',
      'Las digitalizadas consisten únicamente en saber usar el correo electrónico y las videollamadas.',
      'Ambas describen exactamente lo mismo con nombres distintos.'
    ],
    c: 0,
    fb: [
      'Correcto: la clave está en que las digitalizadas son competencias tradicionales (comunicación, lectura crítica, liderazgo, trabajo en equipo) que sufren una transformación sustancial e ineludible, no simples habilidades técnicas.',
      'Error: la distinción no es por el lugar de adquisición, sino por la naturaleza de la competencia y su transformación cualitativa.',
      'Error: reducir las digitalizadas al uso del correo es confundirlas con competencias digitales puras de nivel básico.',
      'Error: son conceptos distintos y esa distinción es precisamente la tesis del artículo.'
    ]
  },
  {
    id: 't2q4',
    text: 2,
    q: 'Según los datos de McKinsey citados por los autores, ¿en qué porcentaje de los empleos al menos el 30% de las tareas pueden digitalizarse?',
    o: ['66%', '30%', '90%', '45%'],
    c: 0,
    fb: [
      'Correcto: en el 66% de los empleos al menos el 30% de las tareas pueden digitalizarse. Esto sustenta que el impacto más prevalente es la transformación de tareas, no la destrucción neta de empleos.',
      'Error: confundes el porcentaje de tareas (30%) con el porcentaje de empleos afectados (66%).',
      'Error de cifra: el dato citado es 66%, no 90%.',
      'Error de cifra: el dato citado es 66%, no 45%.'
    ]
  },
  {
    id: 't2q5',
    text: 2,
    q: '¿Qué designa el acrónimo 4D en la transformación de tareas?',
    o: [
      'dull, demeaning, dirty, dangerous: tareas repetitivas, degradantes, sucias o peligrosas que la automatización sustituye.',
      'digital, dynamic, diverse, distributed.',
      'design, develop, deploy, debug.',
      'data, device, display, dialogue.'
    ],
    c: 0,
    fb: [
      'Correcto: la automatización sustituye tareas 4D (dull, demeaning, dirty, dangerous), aunque también estandariza procesos profesionales complejos.',
      'Error: esas palabras no forman el acrónimo 4D del artículo.',
      'Error: ese es un ciclo de desarrollo de software, no el 4D del texto.',
      'Error: esos términos no corresponden al acrónimo 4D descrito.'
    ]
  },
  {
    id: 't2q6',
    text: 2,
    q: '¿Qué es la "paradoja de la conectividad"?',
    o: [
      'El sentimiento de aislamiento psicológico que experimentan trabajadores hiperconectados.',
      'La mejora de la cohesión de equipo gracias a las herramientas digitales.',
      'La brecha de acceso a internet entre zonas rurales y urbanas.',
      'El aumento de la productividad cuando se reducen las reuniones.'
    ],
    c: 0,
    fb: [
      'Correcto: la paradoja de la conectividad alude al aislamiento psicológico que sienten trabajadores hiperconectados, y es uno de los fenómenos destacados del artículo.',
      'Error: la paradoja describe lo contrario: hiperconexión técnica con sensación de aislamiento.',
      'Error: eso es brecha digital de acceso, un fenómeno distinto.',
      'Error: el artículo no vincula la paradoja con la reducción de reuniones.'
    ]
  },
  {
    id: 't2q7',
    text: 2,
    q: '¿Cómo debe ejercerse el liderazgo digitalizado (e-leadership) según los autores?',
    o: [
      'Influyendo y coordinando equipos remotos o híbridos: inspirar, fomentar la cohesión y evaluar por resultados, sin recurrir al control presencial ni a software de monitoreo intrusivo.',
      'Instalando software de vigilancia que registre cada clic y cada pausa del equipo.',
      'Exigiendo presencialidad total para recuperar el control directo.',
      'Delegando la coordinación en algoritmos sin intervención humana alguna.'
    ],
    c: 0,
    fb: [
      'Correcto: el e-leadership se define por influir y coordinar equipos mediados por tecnología, inspirando y evaluando por resultados, no por hipervigilancia.',
      'Error: el software de monitoreo intrusivo es precisamente lo que el artículo desaconseja como modelo de e-leadership.',
      'Error: exigir presencialidad contradice la naturaleza remota o híbrida del e-leadership.',
      'Error: el artículo no plantea una delegación algorítmica sin intervención humana; habla de colaboración con IA y algoritmos.'
    ]
  },
  {
    id: 't2q8',
    text: 2,
    q: 'Las competencias cognitivas nucleares digitalizadas (alfabetización digital) implican, según los autores:',
    o: [
      'Construir y validar conocimiento, contrastar fuentes masivas en motores de búsqueda, detectar fake news y navegar en la ambigüedad informativa.',
      'Memorizar información precodificada de enciclopedias.',
      'Programar algoritmos de inteligencia artificial.',
      'Manejar bases de datos y sistemas de ciberseguridad.'
    ],
    c: 0,
    fb: [
      'Correcto: la lectura en el siglo XXI (marcada en PISA 2018) ya no consiste en extraer información precodificada, sino en construir y validar conocimiento y navegar la ambigüedad informativa.',
      'Error: ese es justamente el modelo antiguo de lectura que los autores señalan como superado.',
      'Error: la programación es una competencia digital pura, no una competencia cognitiva nuclear digitalizada.',
      'Error: la gestión de bases de datos y la ciberseguridad son competencias digitales puras según el artículo.'
    ]
  },
  {
    id: 't2q9',
    text: 2,
    q: 'El fenómeno cues-filtered-out en la comunicación digital se refiere a:',
    o: [
      'La filtración de señales no verbales y contextuales, que exige mayor explicitud en la negociación, manejo consciente de las normas del canal y evitar conductas desinhibidas o agresivas (flaming).',
      'La pérdida de conexión a internet durante una videollamada.',
      'La censura de contenidos en redes sociales corporativas.',
      'La sobrecarga de información en los motores de búsqueda.'
    ],
    c: 0,
    fb: [
      'Correcto: la comunicación virtual filtra señales no verbales y contextuales, lo que exige mayor explicitud y un manejo consciente de las normas del canal para evitar el flaming.',
      'Error: no se refiere a fallos técnicos de conexión, sino a la ausencia de señales no verbales.',
      'Error: la censura de contenidos es un fenómeno distinto, no descrito con ese término.',
      'Error: la sobrecarga informativa corresponde a otra competencia (alfabetización digital), no al cues-filtered-out.'
    ]
  },
  {
    id: 't2q10',
    text: 2,
    q: '¿Qué implicaciones prácticas destacan los autores para preservar la empleabilidad?',
    o: [
      'Aprendizaje a lo largo de la vida (lifelong learning), up-skilling y re-skilling.',
      'Sustituir a los trabajadores mayores por perfiles nativos digitales.',
      'Limitar la formación a cursos de ofimática básica.',
      'Prohibir el uso de inteligencia artificial en el puesto de trabajo.'
    ],
    c: 0,
    fb: [
      'Correcto: los autores subrayan la necesidad de lifelong learning, up-skilling y re-skilling para preservar la empleabilidad.',
      'Error: el artículo no propone sustituir a trabajadores mayores; aboga por la actualización continua de todas las personas.',
      'Error: la ofimática básica es alfabetización técnica mínima, justo lo que los autores consideran insuficiente.',
      'Error: el artículo plantea colaborar con IA y algoritmos, no prohibirlos.'
    ]
  },

  /* ================= TEXTO 3 · HERVÁS, CEBOLLA & SOLER (2016) ================= */
  {
    id: 't3q1',
    text: 3,
    q: '¿Cómo definen Hervás, Cebolla y Soler (2016) el mindfulness?',
    o: [
      'El estado de conciencia que emerge al prestar atención de forma deliberada, en el momento presente y sin juzgar, con actitudes de curiosidad, apertura y aceptación.',
      'La relajación muscular progresiva inducida por respiración profunda.',
      'La eliminación voluntaria de todo pensamiento negativo.',
      'Una técnica de hipnosis clínica para el dolor crónico.'
    ],
    c: 0,
    fb: [
      'Correcto: esa es la definición exacta que ofrece la revisión publicada en Clínica y Salud.',
      'Error: la relajación muscular progresiva es otra técnica; el mindfulness se define por la cualidad atencional, no por la relajación.',
      'Error: el mindfulness no propone eliminar pensamientos, sino observarlos sin juzgar y con aceptación.',
      'Error: el mindfulness no es hipnosis clínica; sus orígenes se vinculan a la meditación y a programas como MBSR y MBCT.'
    ]
  },
  {
    id: 't3q2',
    text: 3,
    q: '¿Cuál es la estructura del programa MBSR de Kabat-Zinn?',
    o: [
      '8 sesiones grupales de 2 horas (hasta 30 participantes) con 45 minutos de práctica diaria individual: escaneo corporal, meditación sentado/caminando, yoga suave y psicoeducación del estrés.',
      '12 sesiones individuales de 1 hora sin práctica entre sesiones.',
      'Un retiro residencial de 30 días.',
      '4 sesiones de 30 minutos centradas únicamente en yoga.'
    ],
    c: 0,
    fb: [
      'Correcto: el MBSR (Kabat-Zinn, 1979/1990) se diseñó para pacientes con dolor crónico y estrés, con esa estructura exacta.',
      'Error: el MBSR es grupal (hasta 30 participantes) y de 8 sesiones de 2 horas, con práctica diaria individual de 45 minutos.',
      'Error: el MBSR no es un retiro residencial de 30 días; son 8 sesiones grupales.',
      'Error: el yoga suave es solo uno de los componentes; el programa incluye escaneo corporal, meditación y psicoeducación del estrés.'
    ]
  },
  {
    id: 't3q3',
    text: 3,
    q: '¿Qué diferencia clave existe entre el MBSR y el MBCT?',
    o: [
      'El MBCT (Segal, Williams y Teasdale, 2012) fue adaptado para la depresión, elimina el yoga e integra elementos de la psicología cognitiva centrados en desactivar patrones de pensamiento automático.',
      'El MBCT añade yoga intensivo y elimina la meditación.',
      'Son idénticos; solo cambia el nombre comercial.',
      'El MBSR se centra en la depresión y el MBCT en el dolor crónico.'
    ],
    c: 0,
    fb: [
      'Correcto: el MBCT elimina el yoga del MBSR e integra elementos cognitivos orientados a desactivar patrones automáticos de pensamiento en la depresión.',
      'Error: el MBCT precisamente ELIMINA el yoga y añade elementos de psicología cognitiva.',
      'Error: son programas distintos, con poblaciones diana y componentes diferenciados.',
      'Error: inviertes las poblaciones. El MBSR nace para dolor crónico y estrés; el MBCT para la depresión recurrente.'
    ]
  },
  {
    id: 't3q4',
    text: 3,
    q: '¿Cuáles son los tres mecanismos de cambio propuestos por la revisión?',
    o: [
      'Control atencional, regulación emocional y transformación de la autoconsciencia.',
      'Relajación muscular, sugestión y catarsis.',
      'Reforzamiento, modelado y extinción.',
      'Atención plena, empatía y resiliencia.'
    ],
    c: 0,
    fb: [
      'Correcto: los tres mecanismos que interactúan dinámicamente son control atencional, regulación emocional y transformación de la autoconsciencia.',
      'Error: esos conceptos pertenecen a otras tradiciones terapéuticas, no a los mecanismos descritos en la revisión.',
      'Error: reforzamiento, modelado y extinción son conceptos conductuales ajenos a este modelo.',
      'Error: son términos afines, pero no los tres mecanismos formales que articula la revisión.'
    ]
  },
  {
    id: 't3q5',
    text: 3,
    q: 'El control atencional, considerado "puerta de entrada" al proceso, logra desactivar:',
    o: [
      'La red neuronal por defecto (córtex prefrontal medial y cingulado posterior), reduciendo la divagación mental, que consume hasta el 50% de la actividad cognitiva diurna.',
      'La amígdala y la ínsula anterior derecha.',
      'El hipocampo y el cerebelo.',
      'La corteza motora primaria.'
    ],
    c: 0,
    fb: [
      'Correcto: el control atencional combina focalización y monitorización abierta, y desactiva la red neuronal por defecto reduciendo la divagación mental (hasta el 50% de la actividad cognitiva diurna).',
      'Error: la reducción de la reactividad amigdalina corresponde a la regulación emocional, y la ínsula anterior derecha a la autoconsciencia/embodiment.',
      'Error: esas estructuras no se vinculan con el control atencional en la revisión.',
      'Error: la corteza motora primaria no interviene en el mecanismo descrito.'
    ]
  },
  {
    id: 't3q6',
    text: 3,
    q: 'El "descentramiento" (insight metacognitivo de Teasdale) se define como:',
    o: [
      'La capacidad de observar los propios pensamientos y emociones como eventos mentales transitorios y no como reflejos literales de la realidad.',
      'La capacidad de eliminar los pensamientos indeseados mediante supresión.',
      'La desconexión emocional frente al sufrimiento propio.',
      'La tendencia a analizar obsesivamente los propios errores.'
    ],
    c: 0,
    fb: [
      'Correcto: el descentramiento se acompaña de un procesamiento no autorreferencial y de mayor conciencia corporal (embodiment), asociada al incremento de materia gris en la ínsula anterior derecha.',
      'Error: el mindfulness no propone suprimir pensamientos, sino observarlos sin juzgar.',
      'Error: el descentramiento no es evitación ni desconexión; es observar los eventos mentales como transitorios.',
      'Error: ese patrón se aproxima a la rumiación, que el mindfulness precisamente reduce.'
    ]
  },
  {
    id: 't3q7',
    text: 3,
    q: '¿Cuál es el área con máxima evidencia empírica del MBCT, incluida en las guías NICE del Reino Unido?',
    o: [
      'La prevención de recaídas en depresión mayor recurrente, reduciendo el riesgo de recaída a 60 semanas.',
      'El tratamiento de la esquizofrenia aguda.',
      'El trastorno bipolar en fase maníaca.',
      'El insomnio crónico primario.'
    ],
    c: 0,
    fb: [
      'Correcto: el MBCT cuenta con la máxima evidencia en prevención de recaídas en depresión mayor recurrente y está incluido en las guías NICE, reduciendo el riesgo de recaída a 60 semanas.',
      'Error: en psicosis se emplean prácticas breves (menos de 10 minutos), no el MBCT como tratamiento de elección.',
      'Error: la revisión no señala el trastorno bipolar maníaco como área de máxima evidencia del MBCT.',
      'Error: el insomnio no es el área de máxima evidencia descrita en la revisión.'
    ]
  },
  {
    id: 't3q8',
    text: 3,
    q: 'Respecto a los efectos adversos, los autores advierten que:',
    o: [
      'Los beneficios no son universales ni están garantizados: un porcentaje moderado puede experimentar desorientación, despersonalización, ansiedad o incomodidad, con riesgo de precipitar episodios psicóticos o reactivar trauma previo si se aplica por personal no sanitario sin evaluación de idoneidad.',
      'El mindfulness no tiene ningún riesgo documentado.',
      'Los efectos adversos aparecen exclusivamente en pacientes con psicosis.',
      'Los efectos adversos son exclusivos de las prácticas de yoga.'
    ],
    c: 0,
    fb: [
      'Correcto: esa es la cautela central de la revisión, que exige evaluación previa de idoneidad del paciente y supervisión clínica calificada.',
      'Error: la revisión documenta explícitamente efectos no deseados; afirmar lo contrario es una distorsión del texto.',
      'Error: los efectos adversos se reportan en practicantes en general, no solo en psicosis; el riesgo psicótico es una posibilidad, no la única población afectada.',
      'Error: los efectos adversos descritos no se limitan al yoga.'
    ]
  },
  {
    id: 't3q9',
    text: 3,
    q: 'El programa MBRP de Bowen se aplica específicamente a:',
    o: ['Adicciones.', 'Dolor crónico oncológico.', 'Trastornos del espectro psicótico.', 'Depresión resistente.'],
    c: 0,
    fb: [
      'Correcto: el MBRP (Mindfulness-Based Relapse Prevention) de Bowen se aplica a adicciones.',
      'Error: para el dolor crónico y el cáncer se describen otras aplicaciones; el MBRP de Bowen se centra en adicciones.',
      'Error: en psicosis se emplean prácticas breves de menos de 10 minutos, no el MBRP.',
      'Error: para la depresión recurrente el programa de referencia es el MBCT.'
    ]
  },

  /* ================= TEXTO 4 · GORBEÑA ET AL. (2021) ================= */
  {
    id: 't4q1',
    text: 4,
    q: '¿En qué modelo teórico se fundamenta explícitamente la intervención de Gorbeña et al. (2021)?',
    o: [
      'El Modelo de Florecimiento o Salud Mental Completa de Corey Keyes.',
      'El modelo transdiagnóstico de la OMS.',
      'La Terapia Cognitiva Basada en Mindfulness (MBCT).',
      'El modelo de competencias digitalizadas.'
    ],
    c: 0,
    fb: [
      'Correcto: la intervención se fundamenta explícitamente en el Modelo de Salud Mental Completa o Florecimiento de Corey Keyes, que define la salud mental como algo más que la ausencia de psicopatología.',
      'Error: el modelo transdiagnóstico corresponde al texto de la OMS (texto 1).',
      'Error: el MBCT es un programa de mindfulness del texto de Hervás, Cebolla y Soler (texto 3).',
      'Error: las competencias digitalizadas corresponden a Peiró y Martínez-Tur (texto 2).'
    ]
  },
  {
    id: 't4q2',
    text: 4,
    q: '¿Cuáles son las tres dimensiones del bienestar en el modelo de Keyes?',
    o: [
      'Bienestar subjetivo o emocional, bienestar psicológico (eudaimónico, Ryff) y bienestar social.',
      'Bienestar físico, mental y espiritual.',
      'Bienestar cognitivo, conductual y afectivo.',
      'Bienestar individual, familiar y comunitario.'
    ],
    c: 0,
    fb: [
      'Correcto: subjetivo (afecto positivo y satisfacción con la vida), psicológico (autoaceptación, relaciones positivas, autonomía, dominio del entorno, propósito y crecimiento personal de Ryff) y social (integración, aceptación, contribución, coherencia y actualización social).',
      'Error: no son las dimensiones del Modelo de Florecimiento de Keyes.',
      'Error: esas son dimensiones de otras tradiciones psicológicas, no del modelo de Keyes.',
      'Error: el modelo de Keyes distingue subjetivo, psicológico y social, no esos tres niveles.'
    ]
  },
  {
    id: 't4q3',
    text: 4,
    q: '¿Qué diseño metodológico empleó el estudio?',
    o: [
      'Estudio piloto preexperimental de medidas repetidas: T1 línea base, T2 post-test tras las 8 sesiones y T3 seguimiento a los 6 meses.',
      'Ensayo clínico aleatorizado con grupo control y enmascaramiento.',
      'Estudio transversal de prevalencia.',
      'Estudio de caso único.'
    ],
    c: 0,
    fb: [
      'Correcto: es un estudio piloto preexperimental de medidas repetidas con tres momentos de evaluación (T1, T2 y T3 a los 6 meses).',
      'Error: no hubo aleatorización ni grupo control; esa es precisamente la limitación clave del estudio.',
      'Error: no es transversal; tiene medidas repetidas en el tiempo (T1, T2 y T3).',
      'Error: la muestra fue de 56 participantes en T1 y T2, no un caso único.'
    ]
  },
  {
    id: 't4q4',
    text: 4,
    q: '¿Cuál fue la muestra finalmente analizada en T1 y T2?',
    o: [
      '56 participantes (tras excluir 1 caso atípico de los 57 reclutados); edad media 21.8 años y 89.5% mujeres.',
      '57 participantes.',
      '44 participantes.',
      '40 participantes.'
    ],
    c: 0,
    fb: [
      'Correcto: se reclutaron 57, pero se eliminó a 1 participante por presentar un patrón de respuesta polarizado en los extremos, quedando 56 en T1 y T2.',
      'Error: 57 es la muestra reclutada; se eliminó 1 caso atípico por patrón de respuesta polarizado.',
      'Error: 44 es la muestra del seguimiento a 6 meses (T3), con una retención del 79% respecto a la muestra inicial.',
      'Error: 40 es la muestra del estudio de Rodríguez Araneda et al. (2017), no de este.'
    ]
  },
  {
    id: 't4q5',
    text: 4,
    q: '¿Cuáles fueron los tamaños de efecto inmediatos (T2 vs. T1)?',
    o: [
      'Salud Mental Positiva Total d = 0.50; Bienestar Social d = 0.48; Bienestar Subjetivo d = 0.40; Bienestar Psicológico d = 0.38.',
      'Total d = 0.90; Social d = 0.75; Subjetivo d = 0.60; Psicológico d = 0.55.',
      'Total d = 0.23; Social d = 0.06; Subjetivo d = 0.25; Psicológico d = 0.35.',
      'Todos los efectos fueron superiores a d = 0.80.'
    ],
    c: 0,
    fb: [
      'Correcto: Total d = 0.50 (efecto medio), Social d = 0.48 (medio), Subjetivo d = 0.40 y Psicológico d = 0.38 (moderado-bajo).',
      'Error: sobreestimas los efectos; esos valores no corresponden al estudio.',
      'Error: confundes los efectos inmediatos (T2) con los del seguimiento a 6 meses (T3).',
      'Error: ningún efecto alcanzó d = 0.80; el mayor fue d = 0.50 (efecto medio).'
    ]
  },
  {
    id: 't4q6',
    text: 4,
    q: 'En el seguimiento a 6 meses (T3 vs. T1), ¿qué dimensión retornó a los niveles basales?',
    o: [
      'Bienestar Social (d = 0.06; cambio no significativo, p = .573).',
      'Bienestar Psicológico (d = 0.35).',
      'Bienestar Subjetivo (d = 0.25).',
      'Salud Mental Positiva Total (d = 0.23).'
    ],
    c: 0,
    fb: [
      'Correcto: el Bienestar Social retornó a los niveles basales iniciales (d = 0.06; p = .573), mientras las otras dimensiones se mantuvieron significativamente superiores.',
      'Error: el Bienestar Psicológico se mantuvo significativamente superior al basal (d = 0.35).',
      'Error: el Bienestar Subjetivo se mantuvo (d = 0.25).',
      'Error: la puntuación total se mantuvo (d = 0.23).'
    ]
  },
  {
    id: 't4q7',
    text: 4,
    q: '¿Cuál es la limitación metodológica clave que los propios autores declaran?',
    o: [
      'La ausencia de grupo de control: al ser un diseño preexperimental, resulta imposible establecer atribución causal directa de los cambios a la intervención.',
      'El uso de medidas fisiológicas invasivas.',
      'La falta de manualización del programa.',
      'El tamaño excesivo y heterogéneo de la muestra.'
    ],
    c: 0,
    fb: [
      'Correcto: sin grupo de comparación, los resultados pueden explicarse por variables no controladas como la dinámica grupal, las expectativas o la motivación previa de participantes autoseleccionados.',
      'Error: el estudio usó autoinformes, no medidas fisiológicas invasivas.',
      'Error: el programa sí estaba manualizado; era un programa multicomponente de 8 sesiones.',
      'Error: la muestra era pequeña y homogénea, no excesiva ni heterogénea.'
    ]
  },
  {
    id: 't4q8',
    text: 4,
    q: '¿Qué otra limitación señalan los autores respecto a la muestra?',
    o: [
      'Su homogeneidad: estudiantes universitarios caucásicos predominantemente femeninos, lo que restringe la validez externa y la generalización de los datos.',
      'Que incluía participantes de 20 nacionalidades distintas.',
      'Que la media de edad era de 45 años.',
      'Que la mayoría de la muestra eran hombres.'
    ],
    c: 0,
    fb: [
      'Correcto: la homogeneidad de la muestra (universitarios caucásicos, mayoritariamente mujeres) restringe la validez externa.',
      'Error: la muestra era homogénea, no diversa en nacionalidades.',
      'Error: la edad promedio era 21.8 años.',
      'Error: el 89.5% de la muestra eran mujeres.'
    ]
  },
  {
    id: 't4q9',
    text: 4,
    q: 'El programa diseñado por Gorbeña et al. consistió en:',
    o: [
      'Un programa manualizado multicomponente de 8 sesiones.',
      'Una intervención breve de una sola sesión.',
      'Un tratamiento de 12 meses de duración.',
      'Una aplicación móvil de autoayuda sin sesiones.'
    ],
    c: 0,
    fb: [
      'Correcto: diseñaron un programa manualizado multicomponente de 8 sesiones para investigar sus efectos preliminares mediante una prueba piloto.',
      'Error: el programa tenía 8 sesiones, no una sola.',
      'Error: el programa duró 8 sesiones; el seguimiento fue a los 6 meses, no el tratamiento.',
      'Error: no fue una app de autoayuda; fue un programa manualizado con sesiones.'
    ]
  },

  /* ================= TEXTO 5 · RODRÍGUEZ ARANEDA ET AL. (2017) ================= */
  {
    id: 't5q1',
    text: 5,
    q: '¿Cuál fue la muestra del estudio de Rodríguez Araneda, Navarrete y Bargsted (2017)?',
    o: [
      '40 psicólogos nóveles chilenos (6 meses a 5 años de experiencia) en selección de personal en Santiago, 50% en empresas privadas y 50% en consultoras.',
      '57 psicólogos con más de 10 años de experiencia.',
      '56 estudiantes universitarios de la Universidad de Deusto.',
      '120 candidatos entrevistados en 15 minutos cada uno.'
    ],
    c: 0,
    fb: [
      'Correcto: 40 psicólogos nóveles chilenos en su primer o segundo trabajo, con experiencia de 6 meses a 5 años, en unidades de RRHH de empresas privadas (50%) y consultoras de selección (50%) en Santiago.',
      'Error: 57 es el número de relatos de faltas éticas, no de participantes.',
      'Error: esa es la muestra del estudio de Gorbeña et al. (texto 4).',
      'Error: los 120 candidatos al día en 15 minutos son el ejemplo de "producción de pollos" dentro de las metodologías inadecuadas.'
    ]
  },
  {
    id: 't5q2',
    text: 5,
    q: '¿Qué enfoque metodológico y técnica de recolección se utilizaron?',
    o: [
      'Cualitativo, Teoría Fundamentada Constructivista de Charmaz, con entrevistas semiestructuradas de 50 minutos de duración media.',
      'Cuantitativo, con encuestas cerradas tipo Likert.',
      'Experimental, con asignación aleatoria a condiciones.',
      'Revisión sistemática de la literatura.'
    ],
    c: 0,
    fb: [
      'Correcto: estudio empírico cualitativo que utilizó el marco de la Teoría Fundamentada Constructivista de Charmaz, con entrevistas semiestructuradas de 50 minutos de duración media.',
      'Error: el estudio es cualitativo, no cuantitativo con escalas Likert.',
      'Error: no es experimental; no hay manipulación ni asignación aleatoria.',
      'Error: es un estudio empírico cualitativo, no una revisión sistemática.'
    ]
  },
  {
    id: 't5q3',
    text: 5,
    q: '¿Cuántos profesionales describieron las 57 situaciones éticamente conflictivas con participación directa?',
    o: ['30 profesionales.', '40 profesionales.', '57 profesionales.', '21 profesionales.'],
    c: 0,
    fb: [
      'Correcto: de la muestra total, 31 entrevistados relataron haber sido testigos o participantes de dilemas éticos; específicamente 30 profesionales describieron 57 situaciones éticamente conflictivas con participación directa.',
      'Error: 40 es la muestra total del estudio, no quienes relataron las 57 situaciones.',
      'Error: 57 es el número de relatos, no de profesionales.',
      'Error: 21 profesionales son los que describieron consecuencias al COMETER la falta ética.'
    ]
  },
  {
    id: 't5q4',
    text: 5,
    q: '¿Cuál es la distribución exacta de los 57 relatos por categoría?',
    o: [
      '32 discriminación arbitraria; 8 favorecer candidatos (nepotismo / pituto); 8 adulteración de informes psicolaborales; 8 metodologías e instrumentos inadecuados; 1 difusión indebida de instrumentos a no psicólogos.',
      '20 discriminación; 20 nepotismo; 10 adulteración; 5 metodologías; 2 difusión.',
      '32 nepotismo; 8 discriminación; 8 metodologías; 8 adulteración; 1 difusión.',
      '57 discriminación arbitraria.'
    ],
    c: 0,
    fb: [
      'Correcto: 32 + 8 + 8 + 8 + 1 = 57 relatos. La discriminación arbitraria concentra la mayoría.',
      'Error: las cifras no coinciden con las reportadas; la discriminación es la categoría más frecuente con 32 relatos.',
      'Error: inviertes los pesos; la discriminación arbitraria concentra 32 de los 57 relatos, no el nepotismo.',
      'Error: la discriminación no explica la totalidad; hay otras cuatro categorías documentadas.'
    ]
  },
  {
    id: 't5q5',
    text: 5,
    q: 'Respecto a la discriminación arbitraria (32 relatos), ¿qué patrón se describe?',
    o: [
      'La mitad correspondió a discriminación hacia la mujer por estereotipos físicos ("no ser del perfil / ser fea"), edad fértil, embarazo o hijos pequeños; además se excluyó por comuna de residencia periférica, edad, apariencia, religión o afiliación sindical.',
      'Todos los casos correspondieron a discriminación por nacionalidad.',
      'Solo se discriminó por nivel educacional.',
      'La discriminación fue exclusivamente por discapacidad.'
    ],
    c: 0,
    fb: [
      'Correcto: la mitad de los 32 relatos correspondió a discriminación hacia la mujer por estereotipos físicos, edad fértil, embarazo o hijos pequeños, además de exclusión por comuna periférica, edad, apariencia, religión o afiliación sindical.',
      'Error: el estudio no reporta la nacionalidad como eje principal de discriminación.',
      'Error: el nivel educacional no aparece como el criterio central descrito.',
      'Error: la discapacidad no es el eje señalado en los relatos; el principal es el género y los estereotipos físicos.'
    ]
  },
  {
    id: 't5q6',
    text: 5,
    q: 'La adulteración de informes psicolaborales (8 relatos) consistía en:',
    o: [
      'Órdenes directas de jefaturas para falsificar el juicio técnico, cambiando la categoría de "apto" a "no apto" o viceversa para respaldar decisiones arbitrarias.',
      'Corregir errores de tipeo en los informes.',
      'Eliminar datos personales por confidencialidad.',
      'Aplicar test adicionales de forma voluntaria.'
    ],
    c: 0,
    fb: [
      'Correcto: se trataba de órdenes directas de jefaturas para falsificar el juicio técnico, cambiando la categoría de apto a no apto o viceversa para respaldar decisiones arbitrarias.',
      'Error: no se trata de correcciones formales, sino de falsificación del juicio técnico.',
      'Error: la eliminación de datos por confidencialidad es una práctica legítima, no una falta ética.',
      'Error: el estudio no describe esa conducta como adulteración de informes.'
    ]
  },
  {
    id: 't5q7',
    text: 5,
    q: '¿Qué caracterizó a las "metodologías inadecuadas" (8 relatos)?',
    o: [
      'Evaluaciones exprés sin rigurosidad técnica ("producción de pollos": 120 personas al día en 15 minutos), filtros telefónicos improvisados y uso de pruebas proyectivas sin validez predictiva demostrada.',
      'Uso excesivo de pruebas psicométricas validadas.',
      'Entrevistas en profundidad de dos horas por candidato.',
      'Triangulación de múltiples fuentes de evaluación.'
    ],
    c: 0,
    fb: [
      'Correcto: el estudio describe evaluaciones exprés sin rigurosidad técnica, filtros telefónicos improvisados y pruebas proyectivas sin validez predictiva demostrada.',
      'Error: el problema no es el exceso de pruebas validadas, sino la falta de rigurosidad técnica.',
      'Error: las entrevistas eran exprés, no en profundidad.',
      'Error: la triangulación de fuentes es una buena práctica, no la falta descrita.'
    ]
  },
  {
    id: 't5q8',
    text: 5,
    q: '¿Qué consecuencias experimentaron quienes cometieron la falta ética (21 profesionales)?',
    o: [
      'La gran mayoría (13 de 14 que describieron impacto personal) experimentó distrés moral, con culpa, rabia, vergüenza, frustración y pérdida de sentido profesional; 5 manifestaron rechazo explícito a su disciplina con deseos de renunciar.',
      'Ninguna consecuencia psicológica relevante.',
      'Solo satisfacción por haber cumplido las órdenes recibidas.',
      'Únicamente consecuencias económicas positivas.'
    ],
    c: 0,
    fb: [
      'Correcto: el distrés moral fue el hallazgo central, acompañado de culpa, rabia, vergüenza, frustración y pérdida de sentido profesional. También se observó marcada autorreferencialidad y baja visibilización del daño a candidatos o a la imagen corporativa.',
      'Error: el estudio documenta un impacto psicológico intenso en esta categoría.',
      'Error: el estudio reporta culpa, rabia, vergüenza y frustración, no satisfacción.',
      'Error: el estudio no reporta beneficios económicos, sino malestar psicológico.'
    ]
  },
  {
    id: 't5q9',
    text: 5,
    q: '¿Qué ocurrió a los profesionales que decidieron NO cometer la falta ética (16 profesionales)?',
    o: [
      '5 sufrieron sanciones organizacionales y represalias directas: amonestaciones verbales, descuentos salariales arbitrarios como castigo económico, desprecio de jefaturas o reasignación de la falta a otro colega; solo 2 expresaron emociones positivas (liberación y gratificación por cumplir el deber).',
      'Todos fueron ascendidos por su integridad.',
      'Ninguno enfrentó consecuencias de ningún tipo.',
      'Todos renunciaron voluntariamente de inmediato.'
    ],
    c: 0,
    fb: [
      'Correcto: 5 de los 16 sufrieron sanciones y represalias directas, y solo 2 expresaron emociones positivas (sensación de liberación y gratificación por cumplir el deber).',
      'Error: el estudio no reporta ascensos, sino represalias.',
      'Error: 5 profesionales sí enfrentaron sanciones organizacionales directas.',
      'Error: el estudio no indica renuncias voluntarias inmediatas en ese grupo.'
    ]
  },
  {
    id: 't5q10',
    text: 5,
    q: '¿A qué conclusión llegan las autoras sobre la posición de los psicólogos nóveles?',
    o: [
      'Los relatos denotan pasividad, escaso poder organizacional y precariedad laboral frente a prácticas empresariales abusivas y naturalizadas en el medio local.',
      'Los psicólogos nóveles tienen un alto poder de negociación frente a las jefaturas.',
      'Las faltas éticas son casos aislados y poco frecuentes en el medio chileno.',
      'El problema se limita a las consultoras y no afecta a las empresas privadas.'
    ],
    c: 0,
    fb: [
      'Correcto: las autoras concluyen que los relatos denotan pasividad, escaso poder organizacional y precariedad laboral frente a prácticas empresariales abusivas y naturalizadas en el medio local.',
      'Error: la conclusión apunta exactamente a lo contrario: escaso poder organizacional.',
      'Error: 30 profesionales relataron 57 situaciones conflictivas; no son casos aislados.',
      'Error: la muestra incluyó 50% de empresas privadas y 50% de consultoras, y el problema se observó en ambas.'
    ]
  }
];
