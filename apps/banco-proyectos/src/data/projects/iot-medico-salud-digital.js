// Bioingeniería projects that use IoT connectivity, moved to the original "IoT Médico y Salud Digital" area
// (odd/tasks/neuro-discapacidad.md, S2). Ids are kept so existing links keep working.
// Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_161",
        "titulo": "🦾 Proyecto 161: Prótesis Mioeléctrica de Mano Impresa en 3D con Control por Patrones EMG",
        "descripcion": "Problema: Las personas con amputación transradial en el Cauca, muchas de ellas víctimas de accidentes laborales agrícolas o del conflicto armado, acceden casi siempre a prótesis estéticas o mecánicas de gancho, porque una prótesis mioeléctrica comercial supera con creces su capacidad económica, lo que limita su autonomía en tareas cotidianas como sujetar utensilios o herramientas.\n\nDescripción: Prótesis de mano impresa en 3D con dedos accionados por servomotores y tendones, controlada por dos canales de electromiografía de superficie colocados en el antebrazo residual. Un microcontrolador extrae características de la señal EMG en tiempo real y un clasificador ligero distingue entre al menos cuatro gestos de agarre, permitiendo evaluar la tasa de acierto y la latencia del control con usuarios voluntarios.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Salud - Rehabilitación y prótesis",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición y acondicionamiento de señales EMG de superficie",
            "Extracción de características en el dominio del tiempo",
            "Clasificación de gestos con aprendizaje automático embebido",
            "Diseño mecánico e impresión 3D de mecanismos subactuados",
            "Control de servomotores con microcontroladores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una prótesis de mano mioeléctrica de bajo costo, impresa en 3D, capaz de ejecutar distintos tipos de agarre a partir de la actividad muscular del antebrazo residual.",
            "📌 Objetivos Específicos:",
            "• Adquirir dos canales de EMG de superficie con una relación señal a ruido superior a 20 dB y una frecuencia de muestreo de al menos 1 kHz.",
            "• Clasificar como mínimo cuatro gestos de agarre con una exactitud superior al 85 % y una latencia de decisión inferior a 300 ms.",
            "• Evaluar la funcionalidad de la prótesis con al menos cinco voluntarios mediante una prueba estandarizada de manipulación de objetos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Rehabilitación y prótesis"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Adquiere las señales EMG, ejecuta el clasificador y controla los actuadores."
            },
            {
                "componente": "Sensores EMG MyoWare 2.0 (2 unidades)",
                "categoria": "Sensor Biomédico",
                "funcion": "Amplifican y rectifican la actividad eléctrica de los músculos del antebrazo."
            },
            {
                "componente": "Electrodos de superficie Ag/AgCl desechables",
                "categoria": "Sensor Biomédico",
                "funcion": "Establecen el contacto eléctrico entre la piel y la etapa de adquisición."
            },
            {
                "componente": "Servomotores MG90S (5 unidades)",
                "categoria": "Actuador",
                "funcion": "Tiran de los tendones de nailon que flexionan cada dedo."
            },
            {
                "componente": "Mano y socket impresos en PLA y TPU",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Conforman la estructura antropomórfica y el acople al muñón."
            },
            {
                "componente": "Batería LiPo 7.4 V con regulador DC-DC",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta de forma aislada la electrónica de adquisición y los servomotores."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE / ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición y control."
            },
            {
                "herramienta": "Python con SciPy y scikit-learn",
                "tipo": "Procesamiento de Señales / Machine Learning",
                "descripcion": "Filtrado, extracción de características y entrenamiento del clasificador."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Inferencia Embebida",
                "descripcion": "Ejecución del modelo de clasificación de gestos en el microcontrolador."
            },
            {
                "herramienta": "Fusion 360 / Ultimaker Cura",
                "tipo": "Diseño CAD / Fabricación",
                "descripcion": "Modelado de la mano y preparación de las piezas para impresión 3D."
            }
        ]
    },
    {
        "id": "proj_162",
        "titulo": "🦺 Proyecto 162: Exoesqueleto Pasivo de Soporte Lumbar para Recolectores de Café",
        "descripcion": "Problema: Los recolectores de café del Cauca permanecen durante jornadas largas en posturas de flexión de tronco en terrenos de alta pendiente y cargan costales de hasta 40 kg, lo que genera una alta prevalencia de dolor lumbar, incapacidades y abandono temprano de la labor en una actividad que ya enfrenta escasez de mano de obra.\n\nDescripción: Exoesqueleto pasivo de espalda fabricado con perfiles de aluminio, piezas impresas en 3D y elementos elásticos que almacenan energía durante la flexión del tronco y la devuelven en la extensión. El prototipo incorpora electromiografía e unidades inerciales para cuantificar la reducción de la actividad de los músculos erectores espinales durante tareas simuladas de recolección y carga.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Agricultura - Salud ocupacional",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Biomecánica de la columna y ergonomía ocupacional",
            "Diseño de mecanismos elásticos de almacenamiento de energía",
            "Instrumentación con EMG y sensores inerciales",
            "Análisis estadístico de ensayos con sujetos",
            "Fabricación digital e impresión 3D"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y evaluar un exoesqueleto pasivo de soporte lumbar que reduzca la carga muscular de los recolectores de café durante las tareas de flexión y levantamiento.",
            "📌 Objetivos Específicos:",
            "• Dimensionar los elementos elásticos para que aporten un momento de apoyo de al menos 15 N·m a 60° de flexión de tronco.",
            "• Medir con EMG la actividad de los erectores espinales con y sin exoesqueleto en un protocolo de levantamiento con al menos ocho voluntarios.",
            "• Demostrar una reducción mínima del 20 % en la amplitud EMG normalizada sin restringir más de 10° el rango de movimiento del tronco."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura - Salud ocupacional"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Perfiles de aluminio y bisagras con rodamientos",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forman el armazón que transmite el momento entre tronco y muslos."
            },
            {
                "componente": "Bandas elásticas de látex y resortes de torsión",
                "categoria": "Componente Mecánico",
                "funcion": "Almacenan y devuelven energía durante la flexión y extensión del tronco."
            },
            {
                "componente": "Arnés acolchado y piezas de acople impresas en PETG",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fijan el exoesqueleto al cuerpo del usuario de forma cómoda."
            },
            {
                "componente": "Sensores EMG MyoWare 2.0",
                "categoria": "Sensor Biomédico",
                "funcion": "Registran la actividad de los músculos erectores espinales."
            },
            {
                "componente": "IMU MPU-6050 (2 unidades)",
                "categoria": "Sensor Inercial",
                "funcion": "Miden los ángulos de flexión del tronco y la cadera."
            },
            {
                "componente": "ESP32 con módulo microSD",
                "categoria": "Microcontrolador",
                "funcion": "Sincroniza y almacena las señales EMG e inerciales durante los ensayos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenSim",
                "tipo": "Simulación Biomecánica",
                "descripcion": "Estimación de momentos lumbares para dimensionar los elementos elásticos."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Modelado paramétrico del armazón y las piezas de acople."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición sincronizada de EMG e IMU."
            },
            {
                "herramienta": "Python con pandas y SciPy",
                "tipo": "Análisis de Datos",
                "descripcion": "Normalización EMG y pruebas estadísticas pareadas entre condiciones."
            }
        ]
    },
    {
        "id": "proj_164",
        "titulo": "🫁 Proyecto 164: Espirómetro Digital de Bajo Costo con Neumotacógrafo Impreso en 3D",
        "descripcion": "Problema: La enfermedad pulmonar obstructiva crónica es frecuente en zonas rurales del Cauca por la exposición prolongada al humo de leña en las cocinas, pero la mayoría de puestos de salud no cuentan con espirómetro, por lo que el diagnóstico llega tarde y los pacientes pierden función pulmonar que ya no se recupera.\n\nDescripción: Espirómetro portátil basado en un neumotacógrafo de tipo Venturi impreso en 3D y un sensor de presión diferencial digital, que calcula la curva flujo-volumen y los índices FEV1, FVC y FEV1/FVC. Los resultados se presentan en una aplicación web y el equipo se valida con una jeringa de calibración de 3 litros siguiendo los criterios de la ATS/ERS.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Salud - Atención primaria rural",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Mecánica de fluidos aplicada a la medición de flujo",
            "Fisiología respiratoria y pruebas de función pulmonar",
            "Integración numérica y procesamiento de señales",
            "Calibración de instrumentos biomédicos",
            "Desarrollo de interfaces web para resultados clínicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un espirómetro digital portátil de bajo costo que permita realizar pruebas de función pulmonar en puestos de salud rurales.",
            "📌 Objetivos Específicos:",
            "• Caracterizar el neumotacógrafo impreso en 3D para obtener una relación presión-flujo con error inferior al 3 % entre 0 y 12 L/s.",
            "• Verificar la medición de volumen con una jeringa de 3 L logrando el error máximo de ±3 % exigido por la norma ATS/ERS 2019.",
            "• Comparar FEV1 y FVC con un espirómetro clínico en al menos 15 voluntarios, reportando el coeficiente de correlación intraclase."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Atención primaria rural"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Sensor de presión diferencial Sensirion SDP810",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la caída de presión en el Venturi para calcular el flujo respiratorio."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Muestrea la señal de presión, integra el volumen y publica los resultados por Wi-Fi."
            },
            {
                "componente": "Neumotacógrafo Venturi impreso en PETG",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Genera la diferencia de presión proporcional al flujo de aire."
            },
            {
                "componente": "Boquillas desechables con filtro antibacterial",
                "categoria": "Consumible Médico",
                "funcion": "Garantizan la higiene entre pacientes."
            },
            {
                "componente": "Jeringa de calibración de 3 litros",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permite verificar la exactitud volumétrica del espirómetro."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de muestreo, integración y servidor web embebido."
            },
            {
                "herramienta": "Chart.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Gráficas de las curvas flujo-volumen y volumen-tiempo."
            },
            {
                "herramienta": "OpenFOAM",
                "tipo": "Simulación CFD",
                "descripcion": "Análisis del flujo en el Venturi para optimizar su geometría."
            },
            {
                "herramienta": "Python con NumPy y pandas",
                "tipo": "Análisis de Datos",
                "descripcion": "Calibración y análisis estadístico frente al equipo de referencia."
            }
        ]
    },
    {
        "id": "proj_166",
        "titulo": "🦶 Proyecto 166: Plataforma de Fuerza de Bajo Costo para Evaluación del Equilibrio y Riesgo de Caída en Adultos Mayores",
        "descripcion": "Problema: Los servicios de fisioterapia y los centros de bienestar del adulto mayor en Popayán evalúan el equilibrio con pruebas clínicas observacionales que dependen del criterio del evaluador, mientras que las plataformas de fuerza comerciales cuestan decenas de millones de pesos; por ello no se detectan a tiempo los déficits posturales que anteceden a caídas y fracturas de cadera.\n\nDescripción: Plataforma de fuerza con cuatro celdas de carga en las esquinas que calcula el centro de presiones del usuario y extrae parámetros posturográficos como área de la elipse de confianza, velocidad media y desplazamiento anteroposterior y mediolateral. Se valida con cargas conocidas y se aplica en un estudio piloto que correlaciona sus métricas con la prueba clínica Timed Up and Go.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Salud - Fisioterapia y geriatría",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Biomecánica del control postural",
            "Instrumentación con galgas extensiométricas y celdas de carga",
            "Calibración estática y análisis de incertidumbre",
            "Procesamiento de señales posturográficas",
            "Diseño de estudios piloto con sujetos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y validar una plataforma de fuerza de bajo costo que cuantifique el equilibrio estático de adultos mayores como apoyo a la valoración del riesgo de caída.",
            "📌 Objetivos Específicos:",
            "• Estimar la posición del centro de presiones con un error inferior a 5 mm frente a cargas puntuales ubicadas en posiciones conocidas.",
            "• Calcular automáticamente al menos cinco parámetros posturográficos en pruebas de 30 segundos con ojos abiertos y ojos cerrados.",
            "• Correlacionar las métricas obtenidas con la prueba Timed Up and Go en un grupo piloto de al menos 15 adultos mayores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Fisioterapia y geriatría"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Celdas de carga de 50 kg tipo viga (4 unidades)",
                "categoria": "Sensor de Fuerza",
                "funcion": "Miden la fuerza vertical en cada esquina de la plataforma."
            },
            {
                "componente": "Convertidores HX711 (4 unidades)",
                "categoria": "Convertidor Analógico-Digital",
                "funcion": "Amplifican y digitalizan la salida de cada celda de carga."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Sincroniza las lecturas y calcula el centro de presiones en tiempo real."
            },
            {
                "componente": "Placas de MDF de 18 mm y marco de acero",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forman una superficie rígida y estable sobre las celdas de carga."
            },
            {
                "componente": "Juego de pesas calibradas",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permite la calibración estática y la verificación de la plataforma."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición sincronizada de las cuatro celdas."
            },
            {
                "herramienta": "Python con NumPy y SciPy",
                "tipo": "Procesamiento de Señales",
                "descripcion": "Filtrado del centro de presiones y cálculo de parámetros posturográficos."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Interfaz para el fisioterapeuta con estatocinesigrama y reporte."
            },
            {
                "herramienta": "R o JASP",
                "tipo": "Análisis Estadístico",
                "descripcion": "Correlaciones y análisis del estudio piloto."
            }
        ]
    },
    {
        "id": "proj_169",
        "titulo": "👀 Proyecto 169: Comunicador Aumentativo Controlado por Movimientos Oculares mediante Electrooculografía",
        "descripcion": "Problema: Las personas con esclerosis lateral amiotrófica, lesión medular alta o parálisis cerebral severa pierden la capacidad de hablar y de usar las manos, y los sistemas de seguimiento ocular comerciales son demasiado costosos para las familias del Cauca, lo que las deja aisladas y dependientes de tableros de comunicación en papel.\n\nDescripción: Sistema de comunicación aumentativa que registra la electrooculografía horizontal y vertical con electrodos de superficie, detecta movimientos sacádicos y parpadeos voluntarios y los traduce en la selección de letras y frases en un teclado virtual con síntesis de voz en español. Se mide la tasa de escritura y la tasa de error con usuarios voluntarios.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Inclusión - Discapacidad motora severa",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición y filtrado de señales EOG",
            "Detección de eventos en señales fisiológicas",
            "Diseño de interfaces humano-computador accesibles",
            "Síntesis de voz y tecnologías de apoyo",
            "Evaluación de usabilidad con usuarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un comunicador aumentativo de bajo costo controlado por movimientos oculares para personas con discapacidad motora severa.",
            "📌 Objetivos Específicos:",
            "• Detectar movimientos oculares en cuatro direcciones y el parpadeo voluntario con una exactitud superior al 90 %.",
            "• Implementar un teclado virtual con predicción de palabras en español que alcance al menos cinco caracteres por minuto.",
            "• Evaluar la tasa de escritura, la tasa de error y la carga de trabajo percibida con el cuestionario NASA-TLX en al menos ocho voluntarios."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Inclusión - Discapacidad motora severa"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Módulos AD8232 configurados para EOG (2 unidades)",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Amplifican los potenciales oculares horizontal y vertical."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Digitaliza las señales EOG y las envía al computador por Bluetooth."
            },
            {
                "componente": "Electrodos Ag/AgCl pediátricos",
                "categoria": "Sensor Biomédico",
                "funcion": "Se ubican alrededor de los ojos para captar la señal EOG."
            },
            {
                "componente": "Tableta o computador portátil",
                "categoria": "Interfaz de Usuario",
                "funcion": "Presenta el teclado virtual y reproduce la voz sintetizada."
            },
            {
                "componente": "Batería LiPo con módulo de carga",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta la etapa de adquisición aislada de la red eléctrica."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de muestreo y transmisión por Bluetooth Low Energy."
            },
            {
                "herramienta": "Python con SciPy",
                "tipo": "Procesamiento de Señales",
                "descripcion": "Filtrado, corrección de deriva y detección de sacadas y parpadeos."
            },
            {
                "herramienta": "Kivy",
                "tipo": "Framework de Interfaz Gráfica",
                "descripcion": "Teclado virtual accesible con barrido y predicción de palabras."
            },
            {
                "herramienta": "eSpeak NG / Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Conversión del texto escrito a voz en español."
            }
        ]
    },
    {
        "id": "proj_170",
        "titulo": "👂 Proyecto 170: Audiómetro Portátil de Tamizaje Auditivo para Escuelas Rurales",
        "descripcion": "Problema: En las escuelas rurales del Cauca la pérdida auditiva infantil suele pasar inadvertida y se confunde con desatención o bajo rendimiento académico, porque los tamizajes auditivos requieren audiómetros y cabinas que solo existen en las ciudades, de modo que los niños pierden años de aprendizaje antes de recibir un diagnóstico.\n\nDescripción: Audiómetro portátil de tonos puros que genera estímulos de 500 Hz a 8 kHz con nivel calibrado, presenta un procedimiento automatizado de tamizaje con respuesta por pulsador y monitorea el ruido ambiente para indicar si la prueba es válida. El equipo se calibra con un sonómetro y un acoplador artificial y se compara con un audiómetro clínico.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Educación básica - Salud escolar",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Acústica y psicoacústica básica",
            "Generación de audio digital y conversión DAC",
            "Calibración acústica con sonómetro",
            "Procedimientos de audiometría de tamizaje",
            "Diseño de dispositivos para trabajo de campo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un audiómetro portátil de bajo costo para el tamizaje auditivo de niños en escuelas rurales.",
            "📌 Objetivos Específicos:",
            "• Generar tonos puros en seis frecuencias entre 500 Hz y 8 kHz con un error de nivel inferior a ±3 dB tras la calibración con sonómetro.",
            "• Implementar un procedimiento de tamizaje automatizado que finalice en menos de cinco minutos por niño y registre el ruido ambiente durante la prueba.",
            "• Comparar los resultados con un audiómetro clínico en al menos 30 niños o adultos voluntarios, calculando sensibilidad y especificidad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación básica - Salud escolar"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Genera los tonos, ejecuta el protocolo de tamizaje y almacena los resultados."
            },
            {
                "componente": "DAC I2S PCM5102A",
                "categoria": "Convertidor Digital-Analógico",
                "funcion": "Produce los tonos puros con baja distorsión."
            },
            {
                "componente": "Audífonos supraaurales con almohadillas de atenuación",
                "categoria": "Transductor Acústico",
                "funcion": "Presentan los estímulos a cada oído y reducen el ruido externo."
            },
            {
                "componente": "Micrófono MEMS INMP441",
                "categoria": "Sensor Acústico",
                "funcion": "Monitorea el nivel de ruido ambiente durante la prueba."
            },
            {
                "componente": "Pulsador de respuesta y pantalla OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten la respuesta del niño y la guía del evaluador."
            },
            {
                "componente": "Sonómetro clase 2 y acoplador artificial impreso en 3D",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar el nivel de presión sonora de los audífonos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de generación de audio por I2S y lógica del tamizaje."
            },
            {
                "herramienta": "Audacity",
                "tipo": "Análisis de Audio",
                "descripcion": "Verificación espectral y de distorsión de los tonos generados."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro local de los resultados de tamizaje por estudiante."
            },
            {
                "herramienta": "Python con pandas y scikit-learn",
                "tipo": "Análisis de Datos",
                "descripcion": "Cálculo de sensibilidad, especificidad y curvas ROC frente al audiómetro clínico."
            }
        ]
    }
];
