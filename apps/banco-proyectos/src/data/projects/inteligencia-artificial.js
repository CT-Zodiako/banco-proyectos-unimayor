// Projects for the area "Inteligencia Artificial" (proj_171–proj_180). Schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_171",
        "titulo": "🤖 Proyecto 171: Asistente Conversacional con RAG para Consultas sobre Reglamentos y Trámites Académicos de UNIMAYOR",
        "descripcion": "Problema: Los estudiantes de UNIMAYOR deben consultar reglamentos, acuerdos del Consejo Académico y calendarios dispersos en archivos PDF extensos; las dudas sobre cancelaciones, homologaciones y plazos saturan a Registro y Control en temporada de matrículas y generan trámites perdidos por fechas vencidas.\n\nDescripción: Asistente basado en generación aumentada por recuperación (RAG) que indexa los documentos institucionales vigentes, responde en español citando el artículo y el documento de origen, y se ejecuta con un modelo de lenguaje abierto alojado localmente para no enviar datos de estudiantes a servicios externos.",
        "area": "Inteligencia Artificial",
        "sector": "Educación superior - Gestión académica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento y fragmentación de documentos PDF",
            "Búsqueda semántica con embeddings",
            "Generación aumentada por recuperación (RAG)",
            "Despliegue local de modelos de lenguaje abiertos",
            "Evaluación de sistemas de pregunta-respuesta"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un asistente conversacional con RAG que responda consultas sobre reglamentos y trámites académicos de UNIMAYOR citando la fuente documental de cada respuesta.",
            "📌 Objetivos Específicos:",
            "• Construir un índice vectorial con al menos 30 documentos institucionales vigentes, segmentados por artículo y con metadatos de fecha y órgano emisor.",
            "• Elaborar un conjunto de 150 preguntas reales de estudiantes con respuesta de referencia validada por Registro y Control para evaluar el sistema.",
            "• Alcanzar al menos un 80 % de respuestas correctas con cita verificable y comparar el desempeño frente a un modelo sin recuperación."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gestión académica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja la interfaz web y el índice vectorial como servidor ligero del laboratorio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ollama con Llama 3.1 8B / Qwen2.5 7B",
                "tipo": "Modelo de Lenguaje (LLM)",
                "descripcion": "Genera las respuestas en español a partir de los fragmentos recuperados."
            },
            {
                "herramienta": "LangChain / LlamaIndex",
                "tipo": "Framework de IA",
                "descripcion": "Orquesta la carga de documentos, la recuperación y la construcción del prompt."
            },
            {
                "herramienta": "ChromaDB",
                "tipo": "Base de Datos Vectorial",
                "descripcion": "Almacena los embeddings de los fragmentos de reglamentos."
            },
            {
                "herramienta": "multilingual-e5 / BGE-M3",
                "tipo": "Modelo de Embeddings",
                "descripcion": "Representa preguntas y fragmentos en español para la búsqueda semántica."
            },
            {
                "herramienta": "Ragas",
                "tipo": "Herramienta de Evaluación",
                "descripcion": "Mide fidelidad, relevancia y precisión de contexto de las respuestas."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz de chat para estudiantes y personal administrativo."
            }
        ]
    },
    {
        "id": "proj_172",
        "titulo": "🗣️ Proyecto 172: Corpus Paralelo y Traductor Neuronal de Bajo Recurso Nasa Yuwe–Español",
        "descripcion": "Problema: El Nasa Yuwe, lengua del pueblo Nasa en el Cauca, cuenta con muy pocos recursos digitales; docentes de etnoeducación y traductores comunitarios trabajan sin herramientas que agilicen la traducción de materiales escolares, de salud y normativos, lo que acelera la pérdida de uso de la lengua entre jóvenes.\n\nDescripción: Construcción, en acuerdo con autoridades y docentes comunitarios, de un corpus paralelo Nasa Yuwe–Español a partir de cartillas, textos escolares y traducciones validadas, y ajuste fino de un modelo multilingüe de traducción para lenguas de bajo recurso, con una prueba exploratoria de transferencia hacia el Namtrik.",
        "area": "Inteligencia Artificial",
        "sector": "Comunidades indígenas - Revitalización lingüística",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Construcción y alineación de corpus paralelos",
            "Traducción automática neuronal de bajo recurso",
            "Ajuste fino de modelos multilingües",
            "Métricas de evaluación de traducción",
            "Ética y soberanía de datos de comunidades indígenas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un traductor neuronal Nasa Yuwe–Español entrenado sobre un corpus paralelo construido y validado junto con hablantes de la comunidad.",
            "📌 Objetivos Específicos:",
            "• Recopilar y alinear a nivel de oración al menos 5.000 pares Nasa Yuwe–Español con consentimiento informado y normalización ortográfica acordada.",
            "• Ajustar un modelo NLLB-200 y compararlo contra una línea base sin ajuste mediante las métricas chrF++ y BLEU en un conjunto de prueba separado.",
            "• Realizar una evaluación humana con al menos 3 hablantes nativos sobre 100 oraciones y reportar adecuación y fluidez en escala de 1 a 5."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Comunidades indígenas - Revitalización lingüística"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Escáner de documentos de cama plana",
                "categoria": "Periférico de Digitalización",
                "funcion": "Digitaliza cartillas y materiales impresos en Nasa Yuwe para construir el corpus."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "NLLB-200 (distilled 600M)",
                "tipo": "Modelo de Traducción",
                "descripcion": "Modelo multilingüe base que se ajusta al par Nasa Yuwe–Español."
            },
            {
                "herramienta": "Hugging Face Transformers",
                "tipo": "Librería de Deep Learning",
                "descripcion": "Entrenamiento y ajuste fino del modelo de traducción."
            },
            {
                "herramienta": "SentencePiece",
                "tipo": "Tokenizador",
                "descripcion": "Construye un vocabulario de subpalabras adaptado a la morfología del Nasa Yuwe."
            },
            {
                "herramienta": "sacreBLEU",
                "tipo": "Herramienta de Evaluación",
                "descripcion": "Calcula BLEU y chrF++ de forma reproducible."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Anotación",
                "descripcion": "Interfaz para que los hablantes validen y corrijan pares de oraciones."
            }
        ]
    },
    {
        "id": "proj_173",
        "titulo": "🎙️ Proyecto 173: Reconocimiento Automático de Voz Adaptado al Español Hablado en el Cauca",
        "descripcion": "Problema: Los sistemas comerciales de reconocimiento de voz están entrenados principalmente con acentos de grandes ciudades y cometen muchos errores con el habla caucana y de zonas rurales; esto excluye a usuarios campesinos y adultos mayores de servicios por voz y encarece la transcripción de entrevistas en investigación social.\n\nDescripción: Construcción de un conjunto de audios transcritos de hablantes del Cauca y ajuste fino de un modelo Whisper para reducir la tasa de error por palabra frente al modelo original, con despliegue en un servidor local para transcribir entrevistas y atención ciudadana.",
        "area": "Inteligencia Artificial",
        "sector": "Servicios públicos - Atención ciudadana",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de señales de audio",
            "Reconocimiento automático de voz (ASR)",
            "Ajuste fino de modelos de voz",
            "Construcción de corpus de habla",
            "Análisis de errores por variedad dialectal"
        ],
        "objetivos": [
            "🎯 Objetivo General: Adaptar un modelo de reconocimiento automático de voz al español hablado en el Cauca y medir la mejora en la precisión de transcripción respecto a modelos generales.",
            "📌 Objetivos Específicos:",
            "• Grabar y transcribir al menos 10 horas de habla de 40 hablantes caucanos de zonas urbanas y rurales, con equilibrio de género y edad.",
            "• Ajustar un modelo Whisper small y reducir la tasa de error por palabra (WER) en al menos un 20 % relativo frente al modelo sin ajuste.",
            "• Analizar los errores por subgrupo (rural/urbano, edad) y publicar el conjunto anonimizado bajo licencia abierta con consentimiento de los participantes."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Servicios públicos - Atención ciudadana"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Micrófono de condensador USB",
                "categoria": "Sensor de Audio",
                "funcion": "Captura grabaciones de voz con calidad homogénea para el corpus."
            },
            {
                "componente": "Grabadora de voz portátil",
                "categoria": "Dispositivo de Captura",
                "funcion": "Permite grabar hablantes en veredas y zonas sin acceso a computador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenAI Whisper (small)",
                "tipo": "Modelo de Reconocimiento de Voz",
                "descripcion": "Modelo base de transcripción que se ajusta al español caucano."
            },
            {
                "herramienta": "Hugging Face Transformers y Datasets",
                "tipo": "Librería de Deep Learning",
                "descripcion": "Gestión del corpus y entrenamiento del modelo."
            },
            {
                "herramienta": "Audacity",
                "tipo": "Editor de Audio",
                "descripcion": "Limpieza y segmentación de grabaciones."
            },
            {
                "herramienta": "jiwer",
                "tipo": "Herramienta de Evaluación",
                "descripcion": "Cálculo de la tasa de error por palabra y por carácter."
            },
            {
                "herramienta": "faster-whisper",
                "tipo": "Motor de Inferencia",
                "descripcion": "Transcripción eficiente en el servidor local."
            }
        ]
    },
    {
        "id": "proj_174",
        "titulo": "📜 Proyecto 174: Transcripción Automática de Manuscritos Coloniales del Archivo Histórico de Popayán",
        "descripcion": "Problema: Miles de folios coloniales del Archivo Central del Cauca en Popayán solo pueden consultarse leyendo la caligrafía de los siglos XVII y XVIII; la transcripción manual es lenta, depende de pocos paleógrafos y deja la mayor parte del fondo documental sin buscar para historiadores y estudiantes.\n\nDescripción: Sistema de reconocimiento de texto manuscrito (HTR) que segmenta las líneas de folios digitalizados y transcribe la escritura colonial mediante un modelo entrenado con páginas transcritas por paleógrafos, generando texto buscable y exportable para el archivo.",
        "area": "Inteligencia Artificial",
        "sector": "Cultura - Patrimonio documental",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Visión por computador aplicada a documentos",
            "Reconocimiento de texto manuscrito (HTR)",
            "Segmentación de líneas y regiones",
            "Paleografía digital",
            "Evaluación con tasa de error por carácter"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de transcripción automática de manuscritos coloniales que haga buscable una muestra del fondo documental histórico de Popayán.",
            "📌 Objetivos Específicos:",
            "• Digitalizar y transcribir manualmente al menos 150 páginas de referencia con apoyo de historiadores para entrenar y evaluar el modelo.",
            "• Entrenar un modelo HTR que alcance una tasa de error por carácter (CER) inferior al 12 % en páginas no vistas durante el entrenamiento.",
            "• Publicar un buscador de texto completo sobre al menos 500 folios transcritos automáticamente con enlace a la imagen original."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Cultura - Patrimonio documental"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Cámara réflex o sin espejo con trípode de reproducción",
                "categoria": "Dispositivo de Captura",
                "funcion": "Digitaliza los folios sin contacto agresivo con el documento original."
            },
            {
                "componente": "Iluminación LED difusa de luz fría",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Ilumina los folios de forma uniforme sin calor que dañe el papel."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Kraken / eScriptorium",
                "tipo": "Plataforma de HTR",
                "descripcion": "Segmentación de líneas, anotación y entrenamiento del modelo de manuscritos."
            },
            {
                "herramienta": "TrOCR",
                "tipo": "Modelo de Reconocimiento de Texto",
                "descripcion": "Modelo transformer alternativo para comparación de desempeño."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión por Computador",
                "descripcion": "Preprocesamiento, binarización y corrección de perspectiva de las imágenes."
            },
            {
                "herramienta": "Elasticsearch",
                "tipo": "Motor de Búsqueda",
                "descripcion": "Indexa las transcripciones para búsqueda de texto completo."
            }
        ]
    },
    {
        "id": "proj_175",
        "titulo": "🗓️ Proyecto 175: Planificador Inteligente de Horarios de Aulas y Laboratorios mediante Programación con Restricciones",
        "descripcion": "Problema: La asignación semestral de aulas, laboratorios y docentes en UNIMAYOR se hace con hojas de cálculo; esto produce cruces de horario, laboratorios subutilizados y semanas de ajustes manuales que retrasan el inicio de clases y afectan a estudiantes con asignaturas de varios programas.\n\nDescripción: Herramienta de planificación que modela la asignación de horarios como un problema de satisfacción de restricciones con optimización, considerando capacidad, equipos de laboratorio, disponibilidad docente y preferencias, y que propone horarios factibles en minutos con explicación de las restricciones en conflicto.",
        "area": "Inteligencia Artificial",
        "sector": "Educación superior - Planeación académica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Modelado de problemas de satisfacción de restricciones",
            "Búsqueda y optimización combinatoria",
            "Programación con OR-Tools",
            "Diseño de funciones objetivo multicriterio",
            "Desarrollo de interfaces web"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un planificador automático de horarios que asigne aulas, laboratorios y docentes sin cruces y con mejor aprovechamiento de los espacios.",
            "📌 Objetivos Específicos:",
            "• Modelar al menos 10 tipos de restricciones duras y blandas a partir de los datos reales de un semestre de la facultad.",
            "• Generar horarios sin cruces para al menos 80 grupos en menos de 5 minutos de cómputo.",
            "• Comparar el horario generado con el horario manual del semestre en ocupación de laboratorios, huecos de estudiantes y preferencias docentes satisfechas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Planeación académica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (CPU de 8 núcleos, 16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el solucionador de restricciones y la aplicación web."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Google OR-Tools (CP-SAT)",
                "tipo": "Solucionador de Optimización",
                "descripcion": "Resuelve el modelo de restricciones y optimiza la función objetivo."
            },
            {
                "herramienta": "Python con pandas",
                "tipo": "Lenguaje / Análisis de Datos",
                "descripcion": "Carga y depuración de la oferta académica y la disponibilidad docente."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Expone el planificador como servicio."
            },
            {
                "herramienta": "React.js con FullCalendar",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Muestra y permite ajustar los horarios generados."
            }
        ]
    },
    {
        "id": "proj_176",
        "titulo": "📰 Proyecto 176: Detector de Desinformación en Noticias y Mensajes Regionales del Cauca con Modelos de Lenguaje en Español",
        "descripcion": "Problema: En el Cauca circulan por WhatsApp y redes sociales cadenas falsas sobre orden público, salud y bloqueos viales que generan pánico y decisiones equivocadas; los medios locales y verificadores tienen poco personal para revisar a tiempo el volumen de mensajes.\n\nDescripción: Sistema que clasifica afirmaciones en español según su probabilidad de ser desinformación, entrenado con un corpus de noticias y mensajes regionales etiquetados, y que recupera evidencia de fuentes confiables para apoyar al periodista verificador en lugar de reemplazarlo.",
        "area": "Inteligencia Artificial",
        "sector": "Medios de comunicación - Verificación periodística",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de lenguaje natural en español",
            "Clasificación de texto con transformers",
            "Construcción y etiquetado de corpus",
            "Recuperación de evidencia",
            "Análisis de sesgo y errores del clasificador"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de apoyo a la verificación periodística que detecte posible desinformación regional y sugiera evidencia de fuentes confiables.",
            "📌 Objetivos Específicos:",
            "• Construir un corpus de al menos 3.000 afirmaciones regionales etiquetadas con acuerdo entre anotadores (kappa de Cohen) superior a 0,7.",
            "• Ajustar un modelo BETO o RoBERTa-BNE y alcanzar un F1 macro de al menos 0,80 en el conjunto de prueba.",
            "• Validar con al menos 2 periodistas locales el tiempo de verificación con y sin la herramienta sobre 50 casos reales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medios de comunicación - Verificación periodística"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja el bot de recepción de mensajes y la API de consulta."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "BETO / RoBERTa-BNE",
                "tipo": "Modelo de Lenguaje en Español",
                "descripcion": "Modelo base para la clasificación de afirmaciones."
            },
            {
                "herramienta": "Hugging Face Transformers",
                "tipo": "Librería de Deep Learning",
                "descripcion": "Ajuste fino y evaluación del clasificador."
            },
            {
                "herramienta": "Doccano",
                "tipo": "Herramienta de Anotación",
                "descripcion": "Etiquetado colaborativo del corpus de afirmaciones."
            },
            {
                "herramienta": "Sentence-Transformers",
                "tipo": "Modelo de Embeddings",
                "descripcion": "Recupera artículos de verificación similares a la afirmación consultada."
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Canal para que periodistas envíen mensajes a verificar."
            }
        ]
    },
    {
        "id": "proj_177",
        "titulo": "🧰 Proyecto 177: Agente de IA con Uso de Herramientas para la Gestión de Préstamos e Inventario del Laboratorio",
        "descripcion": "Problema: En el Laboratorio de Física y Sistemas Embebidos de UNIMAYOR los préstamos de tarjetas, sensores y osciloscopios se registran en formatos manuales; los estudiantes no saben qué equipos están disponibles, los monitores pierden tiempo respondiendo las mismas preguntas y se extravían componentes sin trazabilidad.\n\nDescripción: Agente basado en un modelo de lenguaje local que interpreta solicitudes en lenguaje natural y ejecuta herramientas controladas: consulta del inventario, reserva de equipos, registro de devoluciones y lectura de códigos QR, con confirmación humana para toda acción que modifique datos.",
        "area": "Inteligencia Artificial",
        "sector": "Educación superior - Gestión de laboratorios",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de agentes con modelos de lenguaje",
            "Llamado a funciones (tool calling)",
            "Diseño de APIs seguras",
            "Control de permisos y confirmación humana",
            "Evaluación de agentes por tareas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un agente de IA que gestione préstamos, reservas e inventario del laboratorio mediante lenguaje natural y herramientas controladas.",
            "📌 Objetivos Específicos:",
            "• Implementar al menos 6 herramientas (consultar, reservar, prestar, devolver, reportar daño, buscar alternativas) expuestas al agente con validación de parámetros.",
            "• Evaluar el agente sobre 100 solicitudes reales y alcanzar al menos un 85 % de tareas completadas correctamente sin acciones no autorizadas.",
            "• Medir durante 4 semanas la reducción de equipos sin registro de devolución frente al sistema manual."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gestión de laboratorios"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (8 GB) con disipador activo",
                "categoria": "Computador de Placa Única",
                "funcion": "Servidor del agente, la base de datos y la API del inventario."
            },
            {
                "componente": "Lector de códigos QR USB",
                "categoria": "Periférico de Entrada",
                "funcion": "Registra la salida y devolución de cada equipo etiquetado."
            },
            {
                "componente": "Impresora térmica de etiquetas",
                "categoria": "Periférico de Salida",
                "funcion": "Imprime los códigos QR de cada componente del inventario."
            },
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ollama con Qwen2.5 7B Instruct",
                "tipo": "Modelo de Lenguaje (LLM)",
                "descripcion": "Interpreta las solicitudes y decide qué herramienta invocar."
            },
            {
                "herramienta": "LangGraph",
                "tipo": "Framework de Agentes",
                "descripcion": "Define el flujo del agente con pasos de confirmación humana."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Expone las herramientas del inventario como endpoints validados."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Almacena inventario, préstamos y usuarios."
            },
            {
                "herramienta": "Model Context Protocol (MCP)",
                "tipo": "Protocolo de Integración",
                "descripcion": "Estandariza la conexión entre el agente y las herramientas."
            }
        ]
    },
    {
        "id": "proj_178",
        "titulo": "✏️ Proyecto 178: Generador de Ejercicios de Física con IA Generativa y Verificación Automática de Soluciones",
        "descripcion": "Problema: Los docentes de física básica de UNIMAYOR y de colegios de Popayán disponen de pocos ejercicios contextualizados y variados; los estudiantes repiten los mismos problemas del libro, y las herramientas generativas comerciales producen enunciados con errores numéricos que nadie verifica.\n\nDescripción: Sistema que genera ejercicios de cinemática, dinámica y circuitos con contexto regional mediante un modelo de lenguaje, verifica cada solución con cálculo simbólico antes de publicarla y adapta la dificultad según el desempeño del estudiante.",
        "area": "Inteligencia Artificial",
        "sector": "Educación - Enseñanza de ciencias",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Ingeniería de prompts",
            "IA generativa aplicada a la educación",
            "Cálculo simbólico con Python",
            "Verificación automática de respuestas",
            "Diseño de evaluaciones pedagógicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un generador de ejercicios de física que produzca problemas contextualizados con soluciones verificadas automáticamente.",
            "📌 Objetivos Específicos:",
            "• Generar un banco de al menos 300 ejercicios de 3 temas con plantillas paramétricas y contexto regional.",
            "• Verificar simbólicamente cada solución y reportar el porcentaje de ejercicios descartados por error antes y después de la verificación.",
            "• Aplicar el sistema en un curso de física básica y comparar resultados de un pretest y un postest frente a un grupo control."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación - Enseñanza de ciencias"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el modelo de lenguaje cuantizado y la plataforma web."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ollama con Llama 3.1 8B",
                "tipo": "Modelo de Lenguaje (LLM)",
                "descripcion": "Redacta enunciados contextualizados y explicaciones paso a paso."
            },
            {
                "herramienta": "SymPy",
                "tipo": "Librería de Cálculo Simbólico",
                "descripcion": "Resuelve y comprueba las respuestas numéricas de cada ejercicio."
            },
            {
                "herramienta": "Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Plataforma para docentes y estudiantes con seguimiento de desempeño."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacena el banco de ejercicios y los intentos de los estudiantes."
            }
        ]
    },
    {
        "id": "proj_179",
        "titulo": "🕸️ Proyecto 179: Grafo de Conocimiento sobre Buenas Prácticas de Caficultura en el Cauca con Consulta en Lenguaje Natural",
        "descripcion": "Problema: Los pequeños caficultores del Cauca reciben recomendaciones de manejo de roya, broca, fertilización y beneficio dispersas en boletines técnicos y cartillas; los extensionistas no alcanzan a atender todas las veredas y las respuestas inconsistentes afectan la calidad del café de especialidad y el precio de venta.\n\nDescripción: Grafo de conocimiento que estructura entidades como variedades, plagas, síntomas, prácticas y altitudes a partir de documentos técnicos mediante extracción asistida por modelos de lenguaje, y que responde preguntas en lenguaje natural combinando consultas al grafo con generación de texto (GraphRAG).",
        "area": "Inteligencia Artificial",
        "sector": "Agricultura - Caficultura",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Representación del conocimiento y ontologías",
            "Bases de datos de grafos",
            "Extracción de entidades y relaciones",
            "Consultas Cypher y SPARQL",
            "Recuperación aumentada con grafos (GraphRAG)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un grafo de conocimiento sobre caficultura caucana que permita responder preguntas técnicas de productores en lenguaje natural.",
            "📌 Objetivos Específicos:",
            "• Diseñar una ontología con al menos 15 tipos de entidad y 20 tipos de relación validada por un agrónomo o extensionista.",
            "• Poblar el grafo a partir de al menos 40 documentos técnicos y medir la precisión de las relaciones extraídas automáticamente sobre una muestra revisada manualmente.",
            "• Comparar la exactitud de respuestas de GraphRAG frente a un RAG basado solo en texto sobre 100 preguntas de caficultores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura - Caficultura"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            },
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Prueba de la interfaz de consulta en campo con productores."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Neo4j Community",
                "tipo": "Base de Datos de Grafos",
                "descripcion": "Almacena y consulta el grafo de conocimiento."
            },
            {
                "herramienta": "Protégé",
                "tipo": "Editor de Ontologías",
                "descripcion": "Diseño y validación de la ontología del dominio."
            },
            {
                "herramienta": "spaCy con modelo es_core_news",
                "tipo": "Librería de PLN",
                "descripcion": "Reconocimiento de entidades en los documentos técnicos."
            },
            {
                "herramienta": "LlamaIndex (Property Graph)",
                "tipo": "Framework de IA",
                "descripcion": "Extracción de tripletas y consultas GraphRAG."
            },
            {
                "herramienta": "Ollama con Qwen2.5 7B",
                "tipo": "Modelo de Lenguaje (LLM)",
                "descripcion": "Genera respuestas en lenguaje sencillo a partir del grafo."
            }
        ]
    },
    {
        "id": "proj_180",
        "titulo": "⚖️ Proyecto 180: Evaluación de Sesgos Regionales, Étnicos y de Género en Modelos de Lenguaje con Español Colombiano",
        "descripcion": "Problema: Los modelos de lenguaje que ya se usan en chatbots de atención y selección de personal pueden reproducir estereotipos sobre personas indígenas, afrodescendientes, campesinas o de regiones como el Cauca; sin instrumentos de medición en español colombiano, las entidades que los adoptan no pueden detectar respuestas discriminatorias.\n\nDescripción: Banco de pruebas que adapta metodologías de evaluación de sesgo al español colombiano mediante pares contrafactuales y preguntas ambiguas, y que compara de forma reproducible varios modelos abiertos y comerciales, reportando métricas de sesgo y de calidad de respuesta.",
        "area": "Inteligencia Artificial",
        "sector": "Investigación - Ética de la inteligencia artificial",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Evaluación de modelos de lenguaje",
            "Medición de sesgo y equidad",
            "Diseño de conjuntos de prueba contrafactuales",
            "Análisis estadístico de resultados",
            "Ética de la inteligencia artificial"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un banco de pruebas en español colombiano para medir sesgos regionales, étnicos y de género en modelos de lenguaje.",
            "📌 Objetivos Específicos:",
            "• Construir al menos 1.500 ítems contrafactuales y de pregunta ambigua en 5 dimensiones de sesgo, revisados por un panel diverso de 5 personas.",
            "• Evaluar al menos 5 modelos de lenguaje con el mismo protocolo y reportar puntajes de sesgo con intervalos de confianza por dimensión.",
            "• Probar una estrategia de mitigación por instrucción de sistema y cuantificar su efecto sobre el sesgo y la exactitud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Ética de la inteligencia artificial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA RTX 3060 (12 GB)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el entrenamiento, el ajuste fino y la inferencia de los modelos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "lm-evaluation-harness",
                "tipo": "Herramienta de Evaluación",
                "descripcion": "Ejecuta el banco de pruebas de forma reproducible sobre varios modelos."
            },
            {
                "herramienta": "Ollama / vLLM",
                "tipo": "Motor de Inferencia",
                "descripcion": "Sirve localmente los modelos abiertos evaluados."
            },
            {
                "herramienta": "Python con pandas y SciPy",
                "tipo": "Lenguaje / Análisis de Datos",
                "descripcion": "Cálculo de métricas, pruebas estadísticas e intervalos de confianza."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Documenta el análisis y la generación de figuras para publicación."
            }
        ]
    }
];
