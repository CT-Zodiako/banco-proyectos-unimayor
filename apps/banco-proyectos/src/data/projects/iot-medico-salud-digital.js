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
    },
    {
        "id": "proj_277",
        "titulo": "🩻 Proyecto 277: Red de Teleradiología de Bajo Costo para Hospitales Rurales con Pasarela DICOM, Anonimización y Compresión Adaptativa al Ancho de Banda",
        "descripcion": "Problema: Los hospitales de primer nivel de zonas rurales del Cauca realizan tomografías y resonancias de forma esporádica, pero casi nunca cuentan con un radiólogo en sitio y envían los estudios en discos o por mensajería, de modo que el informe llega tarde. Los enlaces de internet son lentos e inestables y el envío de estudios completos sin protección expone datos sensibles de los pacientes.\n\nDescripción: Red de teleradiología con una pasarela DICOM basada en Orthanc sobre un computador de placa única instalado en el hospital rural, que recibe estudios del equipo de imagen, elimina los datos identificables y los envía por un canal cifrado a un servidor central con visor web para el especialista remoto. Un módulo ajusta la compresión según el ancho de banda medido. Se prueba con estudios públicos anonimizados y un simulador de red. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con estudios públicos anonimizados y especialistas voluntarios bajo consentimiento informado.",
        "sector": "Salud - Teleradiología rural",
        "nivel": "Avanzado",
        "habilidades": [
            "Protocolo DICOM y servidores PACS de código abierto",
            "Anonimización de metadatos según perfiles de confidencialidad",
            "Transferencia segura con VPN y TLS entre sedes",
            "Compresión de imágenes médicas con y sin pérdida",
            "Emulación de enlaces de baja capacidad con herramientas de red",
            "Visores web DICOM para lectura remota"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una red de teleradiología de bajo costo que capture, anonimice, comprima y transmita estudios de tomografía y resonancia desde un hospital rural hasta un especialista remoto con visor web.",
            "📌 Objetivos Específicos:",
            "• Implementar una pasarela DICOM con Orthanc que reciba estudios por C-STORE y elimine o sustituya el 100 % de las etiquetas identificables definidas en el perfil de confidencialidad básico de DICOM.",
            "• Diseñar una compresión adaptativa que reduzca el tamaño de las series al menos un 35 % sin pérdida y permita enviar una serie de 300 cortes en menos de 10 minutos con un enlace emulado de 2 Mbit/s.",
            "• Entregar un visor web para el especialista remoto con desplazamiento de cortes, ventana y nivel, y evaluar su usabilidad con al menos cinco usuarios voluntarios."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB con disco SSD NVMe",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja la pasarela DICOM local y almacena los estudios en cola de envío."
            },
            {
                "componente": "Servidor de laboratorio o PC con Ubuntu Server",
                "categoria": "Equipo de Cómputo",
                "funcion": "Hace de PACS central y de servidor del visor del especialista remoto."
            },
            {
                "componente": "Router con módem 4G y puerto Ethernet",
                "categoria": "Equipo de Red",
                "funcion": "Provee el enlace de datos móvil limitado entre el hospital rural y la sede central."
            },
            {
                "componente": "Interruptor Ethernet gestionable",
                "categoria": "Equipo de Red",
                "funcion": "Permite conectar el simulador de modalidad y emular condiciones de red."
            },
            {
                "componente": "UPS de línea interactiva de 600 VA",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Mantiene operativa la pasarela durante los cortes eléctricos frecuentes."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Orthanc con plugin DICOMweb",
                "tipo": "Servidor PACS / DICOM",
                "descripcion": "Recibe, almacena y reenvía estudios con interfaz REST y DICOMweb."
            },
            {
                "herramienta": "pydicom y dcmtk",
                "tipo": "Librería de Procesamiento de Imágenes Médicas",
                "descripcion": "Anonimizan etiquetas y comprimen las series con JPEG 2000 sin pérdida."
            },
            {
                "herramienta": "WireGuard y OHIF Viewer",
                "tipo": "Seguridad de Red / Visualización",
                "descripcion": "Cifra el túnel entre sedes y muestra los estudios en el navegador."
            },
            {
                "herramienta": "Linux tc netem y Grafana",
                "tipo": "Emulación de Red / Visualización / Dashboard",
                "descripcion": "Simulan ancho de banda limitado y grafican tiempos de transferencia."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Teleradiología rural"
        ]
    },
    {
        "id": "proj_278",
        "titulo": "🌡️ Proyecto 278: Red de Telemonitoreo Termográfico para Puestos de Salud con Panel de Seguimiento y Flujo de Remisión de Pacientes",
        "descripcion": "Problema: En los puestos de salud dispersos del Cauca, el seguimiento de pacientes con riesgo de úlceras en el pie diabético depende de revisiones visuales poco frecuentes y de traslados costosos al hospital. Las cámaras termográficas clínicas son caras y sus imágenes se guardan en equipos aislados, sin una vía organizada para que un médico las revise y decida una remisión.\n\nDescripción: Estación de captura con un módulo térmico radiométrico FLIR Lepton 3.5 en una placa PureThermal conectada a una Raspberry Pi, con guía de posicionamiento impresa en 3D. Calcula mapas de temperatura del pie, la asimetría entre ambos lados y los envía con almacenamiento y reenvío a un servidor con panel de seguimiento y flujo de remisión. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con un termómetro de referencia y voluntarios sanos bajo consentimiento informado.",
        "sector": "Salud - Termografía comunitaria y pie diabético",
        "nivel": "Intermedio-Avanzado",
        "habilidades": [
            "Termografía radiométrica y calibración de sensores",
            "Diseño de protocolos de captura estandarizados",
            "Almacenamiento y reenvío con colas persistentes",
            "Desarrollo de APIs y bases de datos relacionales",
            "Paneles de seguimiento con alertas clínicas",
            "Diseño de flujos de remisión de pacientes"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una red de telemonitoreo termográfico para puestos de salud que capture mapas de temperatura del pie, los transmita con tolerancia a fallos de conexión y apoye al médico en el seguimiento y la remisión.",
            "📌 Objetivos Específicos:",
            "• Calibrar la estación térmica con un termómetro de referencia hasta lograr un error inferior a 1 °C entre 30 °C y 40 °C en al menos 30 mediciones repetidas.",
            "• Entregar mapas con segmentación manual de regiones y cálculo automático de la asimetría de temperatura entre pies, con repetibilidad inferior a 0,5 °C en voluntarios sanos.",
            "• Desarrollar un panel con alertas por umbral y un flujo de remisión con estados pendiente, revisado y remitido que sincronice sin pérdida de datos tras cortes de conexión de hasta 24 horas."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Módulo FLIR Lepton 3.5 con placa PureThermal 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura imágenes térmicas radiométricas de 160 x 120 píxeles por USB."
            },
            {
                "componente": "Raspberry Pi 4 de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Controla la captura, calcula las asimetrías y gestiona la cola de envío."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Guía al personal de salud durante el registro y la revisión de la captura."
            },
            {
                "componente": "Soporte de captura impreso en 3D con distancia fija",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija el ángulo y la distancia para que las capturas sean comparables."
            },
            {
                "componente": "Termómetro de contacto de referencia con sonda",
                "categoria": "Instrumento de Referencia",
                "funcion": "Sirve para calibrar y verificar la exactitud de las lecturas térmicas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV y NumPy",
                "tipo": "Análisis de Datos",
                "descripcion": "Convierte los fotogramas radiométricos en mapas de temperatura por región."
            },
            {
                "herramienta": "FastAPI y PostgreSQL",
                "tipo": "Servicio Web / Base de Datos",
                "descripcion": "Almacenan las capturas, los pacientes y el estado de cada remisión."
            },
            {
                "herramienta": "Mosquitto MQTT",
                "tipo": "Broker MQTT",
                "descripcion": "Transporta las capturas desde los puestos de salud con reintentos."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Muestra la evolución térmica por paciente y las alertas pendientes."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Termografía comunitaria y pie diabético"
        ]
    },
    {
        "id": "proj_279",
        "titulo": "🔗 Proyecto 279: Pasarela de Signos Vitales con Interoperabilidad HL7 FHIR y Perfiles Bluetooth Estándar para Instituciones de Salud de Baja Complejidad",
        "descripcion": "Problema: Los puestos y centros de salud de baja complejidad usan tensiómetros, oxímetros y termómetros que muestran el dato en una pantalla y obligan a transcribirlo a mano a la historia clínica, con errores y demoras. Cada fabricante usa formatos propios y los sistemas de información no pueden intercambiar datos entre instituciones.\n\nDescripción: Pasarela en una Raspberry Pi que se conecta por Bluetooth Low Energy a dispositivos con perfiles GATT estándar de presión arterial, oximetría y temperatura, valida las lecturas y las convierte en recursos FHIR R4 Observation con códigos LOINC. Los recursos se publican en un servidor HAPI FHIR y se consultan en un panel. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos sintéticos, un banco de pruebas de simulación y voluntarios bajo consentimiento informado.",
        "sector": "Salud - Interoperabilidad de datos clínicos",
        "nivel": "Avanzado",
        "habilidades": [
            "Estándar HL7 FHIR R4 y terminologías LOINC y UCUM",
            "Perfiles GATT de Bluetooth Low Energy para salud",
            "Programación asíncrona en Python con Bleak",
            "Despliegue de servidores FHIR con contenedores",
            "Validación de recursos clínicos con herramientas oficiales",
            "Pruebas de latencia y pérdida de datos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una pasarela de signos vitales que capture lecturas de dispositivos Bluetooth estándar y las publique como recursos HL7 FHIR para que cualquier sistema clínico compatible pueda consultarlas.",
            "📌 Objetivos Específicos:",
            "• Conectar al menos tres tipos de dispositivo con perfiles estándar y capturar sus lecturas con una pérdida inferior al 2 % en 200 mediciones de prueba.",
            "• Generar recursos FHIR Observation con códigos LOINC y unidades UCUM, de los cuales el 100 % supere la validación del validador oficial de HL7 FHIR.",
            "• Lograr un retardo menor a 5 segundos entre la medición y su consulta en el servidor, y recuperar los datos sin duplicados tras una caída de red de 10 minutos."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la pasarela, convierte las lecturas y gestiona el reenvío de datos."
            },
            {
                "componente": "Tensiómetro de brazo con Bluetooth y perfil de presión arterial",
                "categoria": "Dispositivo Biomédico Comercial",
                "funcion": "Entrega lecturas de presión sistólica, diastólica y pulso con perfil estándar."
            },
            {
                "componente": "Oxímetro de pulso con Bluetooth y perfil PLX",
                "categoria": "Dispositivo Biomédico Comercial",
                "funcion": "Aporta lecturas de saturación de oxígeno y frecuencia del pulso."
            },
            {
                "componente": "ESP32-C3 con sensor MAX30205",
                "categoria": "Microcontrolador",
                "funcion": "Emula un termómetro clínico con perfil estándar de temperatura corporal."
            },
            {
                "componente": "Pantalla de 7 pulgadas con carcasa",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el estado de conexión y confirma el envío de cada lectura."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Bleak",
                "tipo": "Librería de Comunicación Inalámbrica",
                "descripcion": "Gestiona la conexión BLE y la lectura de características GATT."
            },
            {
                "herramienta": "HAPI FHIR en Docker",
                "tipo": "Servidor FHIR",
                "descripcion": "Almacena los recursos Observation y atiende consultas REST estándar."
            },
            {
                "herramienta": "Validador oficial HL7 FHIR",
                "tipo": "Validación de Interoperabilidad",
                "descripcion": "Comprueba que cada recurso cumpla el perfil base de FHIR R4."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta las series de signos vitales consultadas desde el servidor FHIR."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Interoperabilidad de datos clínicos"
        ]
    },
    {
        "id": "proj_280",
        "titulo": "💊 Proyecto 280: Control de Inventario, Vencimientos y Temperatura de Medicamentos en Botiquines de Puestos de Salud Rurales con Etiquetas NFC",
        "descripcion": "Problema: Los botiquines y farmacias de puestos de salud rurales del Cauca registran los medicamentos en cuadernos y los inventarios se revisan solo cuando llega el supervisor. Se producen desabastecimientos de insumos esenciales, pérdida de medicamentos vencidos y exposición a temperaturas altas sin que nadie lo advierta a tiempo.\n\nDescripción: Estante inteligente con lector NFC PN532 conectado a un ESP32, que lee etiquetas NTAG adheridas a cada caja con lote y vencimiento, y registra entradas y salidas. Sensores de temperatura y humedad vigilan el armario. Los datos viajan por MQTT a un servidor local con panel de existencias y alertas de bajo inventario, vencimiento próximo y temperatura fuera de rango. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con medicamentos de muestra no clínicos y personal de salud voluntario bajo consentimiento informado.",
        "sector": "Salud - Farmacia y logística de botiquines rurales",
        "nivel": "Intermedio",
        "habilidades": [
            "Lectura y escritura de etiquetas NFC con microcontroladores",
            "Diseño de esquemas de datos para inventarios",
            "Sensado de temperatura y humedad en almacenamiento",
            "Mensajería MQTT con reconexión automática",
            "Alertas por umbral con Node-RED",
            "Pruebas de confiabilidad de lectura en campo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de control de inventario de medicamentos con etiquetas NFC y vigilancia de temperatura que reduzca los desabastecimientos y las pérdidas por vencimiento en botiquines rurales.",
            "📌 Objetivos Específicos:",
            "• Leer correctamente al menos el 98 % de 200 etiquetas NFC adheridas a cajas de distinto tamaño en un estante de pruebas, con un tiempo de lectura inferior a 1 segundo.",
            "• Registrar entradas y salidas con lote y fecha de vencimiento, y generar alertas a 30 y 60 días del vencimiento y cuando las existencias bajen del mínimo configurado.",
            "• Medir temperatura y humedad con un error inferior a 0,5 °C y avisar en menos de 2 minutos cuando el armario salga del rango de 15 °C a 30 °C."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-DevKitC",
                "categoria": "Microcontrolador",
                "funcion": "Gestiona el lector NFC, los sensores y la comunicación con el servidor."
            },
            {
                "componente": "Lector NFC PN532 con antena",
                "categoria": "Lector RFID / NFC",
                "funcion": "Lee y escribe las etiquetas pegadas en cada caja de medicamento."
            },
            {
                "componente": "Etiquetas NFC NTAG213 adhesivas",
                "categoria": "Etiqueta de Identificación",
                "funcion": "Almacenan lote, vencimiento y código de cada presentación."
            },
            {
                "componente": "Sensor SHT31 de temperatura y humedad",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide las condiciones de almacenamiento dentro del armario."
            },
            {
                "componente": "Pantalla OLED y zumbador",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Confirma cada lectura y avisa localmente de vencimientos próximos."
            },
            {
                "componente": "Fuente de 5 V con batería de respaldo",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Mantiene el registro de temperatura durante los cortes de energía."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con librería Adafruit PN532",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programa el firmware de lectura NFC y de lectura de sensores."
            },
            {
                "herramienta": "Mosquitto MQTT",
                "tipo": "Broker MQTT",
                "descripcion": "Recibe los eventos de inventario y las lecturas ambientales."
            },
            {
                "herramienta": "Node-RED con SQLite",
                "tipo": "Orquestación de Flujos / Base de Datos",
                "descripcion": "Procesa los eventos, guarda las existencias y dispara las alertas."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Muestra existencias, vencimientos y curvas de temperatura del botiquín."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Farmacia y logística de botiquines rurales"
        ]
    },
    {
        "id": "proj_281",
        "titulo": "🫀 Proyecto 281: Electrocardiógrafo Remoto de Almacenamiento y Reenvío para Telecardiología en Centros de Salud sin Cobertura Continua",
        "descripcion": "Problema: En municipios apartados del Cauca los pacientes con dolor torácico o palpitaciones deben viajar horas para obtener un electrocardiograma interpretado por un médico. El internet de los centros de salud se interrumpe con frecuencia, por lo que un equipo que requiere conexión permanente para enviar el trazado resulta poco práctico.\n\nDescripción: Electrocardiógrafo de dos derivaciones con un ADS1292R y un ESP32-S3 que guarda en tarjeta SD trazados de hasta cinco minutos en formato abierto WFDB y los envía cuando hay conexión. Un visor web permite al médico remoto medir intervalos y descargar el registro. Se verifica la fidelidad reproduciendo registros de PhysioNet con un generador de señales. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con registros públicos anonimizados y voluntarios sanos bajo consentimiento informado.",
        "sector": "Medicina - Telecardiología rural",
        "nivel": "Intermedio-Avanzado",
        "habilidades": [
            "Adquisición de biopotenciales con convertidores de 24 bits",
            "Diseño de circuitos de pierna derecha y filtrado de red",
            "Formatos abiertos de señales fisiológicas como WFDB",
            "Almacenamiento en tarjeta SD y colas de reenvío",
            "Visualización web de señales con herramientas de medición",
            "Verificación con señales de referencia de PhysioNet"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un electrocardiógrafo de bajo costo con almacenamiento y reenvío que registre trazados fieles y los entregue a un médico remoto aunque la conexión se interrumpa durante horas.",
            "📌 Objetivos Específicos:",
            "• Registrar dos derivaciones a 500 Hz con ruido de red inferior a 50 µV pico a pico y una correlación mayor a 0,95 frente a registros de referencia de PhysioNet reproducidos con un generador.",
            "• Almacenar al menos 100 trazados de cinco minutos en formato WFDB y reenviarlos sin pérdida ni duplicados tras interrupciones de conexión de más de 6 horas.",
            "• Implementar un visor web que mida la frecuencia cardiaca, con un error inferior a 2 latidos por minuto frente al valor de referencia, y permita exportar el registro."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3-DevKitC-1",
                "categoria": "Microcontrolador",
                "funcion": "Controla la adquisición, el almacenamiento local y el envío de los trazados."
            },
            {
                "componente": "ADS1292R con módulo de evaluación",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Digitaliza dos derivaciones de ECG con amplificador y circuito de pierna derecha."
            },
            {
                "componente": "Electrodos Ag/AgCl y cable de pacientes de 3 derivaciones",
                "categoria": "Sensor Biomédico",
                "funcion": "Capturan la actividad eléctrica del corazón en la piel del paciente."
            },
            {
                "componente": "Módulo de tarjeta microSD",
                "categoria": "Almacenamiento",
                "funcion": "Guarda los trazados mientras no haya conexión disponible."
            },
            {
                "componente": "Batería LiPo de 3,7 V con cargador TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el equipo de forma aislada de la red eléctrica."
            },
            {
                "componente": "Generador de funciones de laboratorio",
                "categoria": "Instrumento de Referencia",
                "funcion": "Reproduce registros de PhysioNet atenuados para verificar la fidelidad."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE / ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programa la adquisición, el filtrado y la cola de reenvío."
            },
            {
                "herramienta": "Python con wfdb y SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Convierte formatos, filtra y calcula la frecuencia cardiaca."
            },
            {
                "herramienta": "FastAPI con PostgreSQL",
                "tipo": "Servicio Web / Base de Datos",
                "descripcion": "Recibe los trazados y organiza los estudios para el médico."
            },
            {
                "herramienta": "Plotly Dash",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Muestra el trazado con calibre de amplitud y herramientas de medición."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Telecardiología rural"
        ]
    },
    {
        "id": "proj_282",
        "titulo": "🫧 Proyecto 282: Telemetría de Oxígeno Medicinal con Sensores y Radio LoRa para Concentradores y Cilindros en Clínicas Rurales",
        "descripcion": "Problema: Las clínicas rurales dependen de concentradores y cilindros de oxígeno cuyo estado casi nunca se vigila. Un concentrador desgastado entrega una pureza menor a la esperada, un cilindro puede agotarse sin aviso y un corte eléctrico pasa inadvertido, lo que pone en riesgo a pacientes con insuficiencia respiratoria lejos de un hospital.\n\nDescripción: Nodo de telemetría que mide pureza con un sensor electroquímico de oxígeno, flujo con un tubo Venturi y un sensor de presión diferencial, presión del cilindro con un transductor y presencia de red eléctrica. Transmite por LoRaWAN a una pasarela en el centro de salud, con alarmas locales y un panel en Grafana. El nodo solo observa y no controla ningún equipo médico. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con bancos de prueba con aire ambiente y gas de referencia, y personal voluntario bajo consentimiento informado.",
        "sector": "Salud - Oxigenoterapia en clínicas rurales",
        "nivel": "Intermedio-Avanzado",
        "habilidades": [
            "Calibración de sensores electroquímicos de oxígeno",
            "Medición de flujo con tubos Venturi",
            "Redes LoRaWAN con pasarela y servidor de red",
            "Diseño de alarmas con histéresis y reconocimiento",
            "Eficiencia energética en nodos con batería",
            "Seguridad básica en la manipulación de gases"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de telemetría que vigile la pureza, el flujo y la reserva de oxígeno medicinal y la energía de una clínica rural, y alerte oportunamente al personal ante condiciones de riesgo.",
            "📌 Objetivos Específicos:",
            "• Calibrar el sensor de oxígeno con aire ambiente y una mezcla de referencia hasta un error absoluto inferior a 2 % de concentración frente a un analizador de referencia.",
            "• Estimar el flujo entre 1 y 10 L/min con un error menor al 10 % frente a un rotámetro y medir la presión del cilindro con una resolución mínima de 1 bar.",
            "• Alcanzar un retardo de alarma inferior a 60 segundos por LoRaWAN y una autonomía de al menos 48 horas del nodo ante un corte de red eléctrica."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Heltec WiFi LoRa 32 V3",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores y transmite los datos por radio LoRaWAN."
            },
            {
                "componente": "Sensor electroquímico de oxígeno ME2-O2",
                "categoria": "Sensor de Gas",
                "funcion": "Mide la concentración de oxígeno entregada por el concentrador."
            },
            {
                "componente": "Sensor de presión diferencial con tubo Venturi impreso",
                "categoria": "Sensor de Flujo",
                "funcion": "Estima el caudal de gas a partir de la caída de presión."
            },
            {
                "componente": "Transductor de presión de 0 a 250 bar",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la reserva de oxígeno disponible en el cilindro."
            },
            {
                "componente": "Pasarela LoRaWAN de 8 canales",
                "categoria": "Equipo de Red",
                "funcion": "Recibe los paquetes del nodo y los reenvía al servidor del centro de salud."
            },
            {
                "componente": "Batería de respaldo con cargador solar",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Mantiene el nodo funcionando durante los cortes eléctricos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con librería RadioLib",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programa la lectura de sensores y el enlace LoRaWAN."
            },
            {
                "herramienta": "ChirpStack",
                "tipo": "Servidor de Red LoRaWAN",
                "descripcion": "Gestiona los dispositivos y entrega los datos del nodo al servidor."
            },
            {
                "herramienta": "InfluxDB y Grafana",
                "tipo": "Base de Datos de Series / Dashboard",
                "descripcion": "Guardan y grafican pureza, flujo, presión y estado de la red eléctrica."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Orquestación de Flujos",
                "descripcion": "Genera las alarmas y las notificaciones al personal de la clínica."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Oxigenoterapia en clínicas rurales"
        ]
    },
    {
        "id": "proj_283",
        "titulo": "⌚ Proyecto 283: Concentrador de Sensores Vestibles para Vigilancia del Estrés Térmico de Corteros de Caña de Azúcar del Norte del Cauca",
        "descripcion": "Problema: Los corteros de caña del norte del Cauca trabajan a pleno sol con alta carga física, y el golpe de calor y la deshidratación son riesgos reales de su labor. Los supervisores evalúan el esfuerzo a simple vista y no existen datos individuales de temperatura, humedad ni frecuencia cardiaca que permitan ordenar pausas de descanso oportunas.\n\nDescripción: Cada trabajador usa una banda de pecho con Bluetooth para la frecuencia cardiaca y un módulo de cinturón con sensores de temperatura de piel, temperatura de globo y humedad ambiente. Una aplicación móvil actúa como concentrador, calcula el índice de estrés térmico WBGT y la carga cardiaca, sugiere pausas y sincroniza con un panel del supervisor. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con pruebas en un invernadero de la universidad y voluntarios bajo consentimiento informado.",
        "sector": "Agroindustria - Estrés térmico y salud ocupacional",
        "nivel": "Intermedio",
        "habilidades": [
            "Integración de sensores vestibles con Bluetooth Low Energy",
            "Cálculo del índice WBGT con termómetro de globo",
            "Desarrollo móvil multiplataforma con Flutter",
            "Almacenamiento local y sincronización diferida",
            "Diseño de alertas de pausa configurables",
            "Diseño de pruebas de campo con voluntarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un concentrador de sensores vestibles que estime el estrés térmico individual de trabajadores al aire libre y apoye a los supervisores en la programación de pausas y la hidratación.",
            "📌 Objetivos Específicos:",
            "• Medir temperatura de piel y ambiente con un error inferior a 0,5 °C y estimar el WBGT con una diferencia menor a 1 °C frente a un monitor de estrés térmico de referencia.",
            "• Recibir la frecuencia cardiaca de la banda de pecho y las lecturas del módulo de cinturón con una pérdida inferior al 3 % durante jornadas simuladas de 4 horas.",
            "• Mostrar en un panel el estado de al menos diez trabajadores con alertas de pausa configurables, que lleguen al supervisor en menos de 15 segundos."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-C3 con carcasa de cinturón",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores del módulo y transmite los datos por Bluetooth Low Energy."
            },
            {
                "componente": "Banda de pecho de frecuencia cardiaca con Bluetooth",
                "categoria": "Sensor Biomédico",
                "funcion": "Entrega la frecuencia cardiaca con el perfil estándar de ritmo cardiaco."
            },
            {
                "componente": "Sensor MAX30205 de temperatura de piel",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la temperatura cutánea con resolución de 0,1 °C."
            },
            {
                "componente": "Globo de cobre negro con sensor DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide la temperatura de globo que integra la radiación solar."
            },
            {
                "componente": "Sensor BME280 de temperatura y humedad",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide temperatura del aire, humedad y presión en el entorno de trabajo."
            },
            {
                "componente": "Batería LiPo de 1000 mAh con cargador USB-C",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el módulo de cinturón durante una jornada completa de trabajo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con NimBLE-Arduino",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programa el módulo de cinturón como servidor BLE de sensores."
            },
            {
                "herramienta": "Flutter con flutter_blue_plus",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Crea la aplicación concentradora que recibe y muestra los datos."
            },
            {
                "herramienta": "Mosquitto MQTT",
                "tipo": "Broker MQTT",
                "descripcion": "Envía los datos del concentrador al panel del supervisor al recuperar la red."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta el estado térmico y cardiaco de la cuadrilla en tiempo casi real."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agroindustria - Estrés térmico y salud ocupacional"
        ]
    },
    {
        "id": "proj_284",
        "titulo": "🤰 Proyecto 284: Kit de Telemonitoreo Materno para el Control Prenatal Rural con Alertas de Hipertensión Gestacional y Respaldo por SMS",
        "descripcion": "Problema: Muchas gestantes de veredas del Cauca asisten a pocos controles prenatales por la distancia y el costo del transporte, y los trastornos hipertensivos del embarazo pueden agravarse entre una consulta y otra sin que nadie lo detecte. Las zonas con cobertura celular débil impiden usar aplicaciones que dependen de internet continuo.\n\nDescripción: Kit para el auxiliar de enfermería con un tensiómetro Bluetooth, un oxímetro, un termómetro y una báscula con celdas de carga, conectados a un ESP32 con pantalla. Registra los signos de alarma mediante un cuestionario guiado y aplica reglas clínicas simples, como presión de 140/90 mmHg o más en dos lecturas, para notificar a la enfermera jefe por MQTT o por SMS con un módulo celular. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarias no gestantes y personal de salud bajo consentimiento informado.",
        "sector": "Salud materna - Control prenatal rural",
        "nivel": "Intermedio-Avanzado",
        "habilidades": [
            "Integración de dispositivos de signos vitales con Bluetooth",
            "Mediciones de peso con celdas de carga y amplificador HX711",
            "Comunicación celular con módulos AT para envío de SMS",
            "Diseño de interfaces para personal de salud con poca capacitación",
            "Reglas clínicas de alerta con umbrales parametrizables",
            "Pruebas de usabilidad con la escala SUS"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un kit de telemonitoreo materno que registre signos vitales y señales de alarma en el control prenatal rural y envíe alertas confiables a la enfermera jefe aun con cobertura limitada.",
            "📌 Objetivos Específicos:",
            "• Integrar tensiómetro, oxímetro, termómetro y báscula en un solo equipo y registrar cada sesión completa en menos de 5 minutos con un error de peso menor a 0,5 kg.",
            "• Aplicar las reglas de alerta por presión arterial y signos de alarma configurables, con 100 % de coincidencia frente a 50 casos ficticios definidos con un profesional de enfermería.",
            "• Entregar las alertas por MQTT en menos de 10 segundos con conexión y por SMS en menos de 2 minutos sin ella, y lograr una puntuación SUS de al menos 70 con ocho usuarios."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con pantalla táctil de 3,5 pulgadas",
                "categoria": "Microcontrolador",
                "funcion": "Concentra los datos del kit y guía al usuario en cada paso del control."
            },
            {
                "componente": "Tensiómetro de brazo con Bluetooth y perfil de presión arterial",
                "categoria": "Dispositivo Biomédico Comercial",
                "funcion": "Mide la presión arterial y el pulso con un equipo de uso clínico."
            },
            {
                "componente": "Sensor MAX30102 de oximetría",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la saturación de oxígeno y la frecuencia del pulso."
            },
            {
                "componente": "Termómetro infrarrojo MLX90614",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la temperatura corporal sin contacto para detectar fiebre."
            },
            {
                "componente": "Báscula de 4 celdas de carga con amplificador HX711",
                "categoria": "Sensor de Fuerza",
                "funcion": "Mide el peso corporal para vigilar la ganancia durante el embarazo."
            },
            {
                "componente": "Módulo celular SIM7600 para datos y SMS",
                "categoria": "Módulo de Comunicación",
                "funcion": "Envía alertas por SMS cuando no hay conexión de datos disponible."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con LVGL",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programa el firmware y la interfaz táctil del kit."
            },
            {
                "herramienta": "Mosquitto MQTT",
                "tipo": "Broker MQTT",
                "descripcion": "Transporta las sesiones y alertas hacia el servidor del centro de salud."
            },
            {
                "herramienta": "Node-RED con PostgreSQL",
                "tipo": "Orquestación de Flujos / Base de Datos",
                "descripcion": "Evalúa las reglas de alerta y guarda el historial de cada gestante."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Muestra las tendencias de presión, peso y alertas para la enfermera jefe."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud materna - Control prenatal rural"
        ]
    },
    {
        "id": "proj_285",
        "titulo": "🔐 Proyecto 285: Capa de Protección de Datos para Dispositivos de Salud Conectados con Seudonimización, Consentimiento y Auditoría según la Ley 1581 de 2012",
        "descripcion": "Problema: Las plataformas de telemonitoreo y los dispositivos de salud conectados manejan datos sensibles, pero en proyectos pequeños suelen transmitirlos sin cifrar, con identificadores directos y sin registrar quién los consulta ni con qué autorización. Eso incumple el espíritu de la Ley 1581 de 2012 y expone a los pacientes a filtraciones y usos indebidos.\n\nDescripción: Capa de seguridad entre los dispositivos y la plataforma, en una Raspberry Pi, que usa TLS con certificados de cliente almacenados en un elemento seguro ATECC608, seudonimiza identificadores con HMAC, cifra campos con AES-GCM y gestiona consentimientos con propósito y revocación. Un registro de auditoría encadenado por hash y el control de acceso con Keycloak se prueban con datos sintéticos de Synthea. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos sintéticos y revisión de un asesor jurídico, sin certificación de cumplimiento legal.",
        "sector": "Salud - Protección de datos personales sensibles",
        "nivel": "Avanzado",
        "habilidades": [
            "Criptografía aplicada con TLS mutuo y AES-GCM",
            "Gestión de claves con elementos seguros ATECC608",
            "Control de acceso por roles con OpenID Connect",
            "Registros de auditoría con cadenas de hash",
            "Pruebas de seguridad con OWASP ZAP y Wireshark",
            "Principios de la Ley 1581 de 2012 y habeas data"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y validar una capa de protección de datos para dispositivos de salud conectados que aplique cifrado, seudonimización, consentimiento y auditoría alineados con los principios de la Ley 1581 de 2012.",
            "📌 Objetivos Específicos:",
            "• Establecer comunicación TLS con autenticación mutua para al menos tres dispositivos y comprobar con Wireshark que el 100 % de los datos clínicos viaja cifrado.",
            "• Registrar consentimientos con propósito, fecha y revocación, y atender solicitudes de acceso, rectificación y supresión sobre 50 pacientes sintéticos en menos de 5 segundos.",
            "• Auditar todas las consultas en un registro verificable por hash, con sobrecarga de latencia menor a 200 ms y sin hallazgos críticos en un escaneo con OWASP ZAP."
        ],
        "referencias": [
            "Congreso de la República de Colombia. (2012). Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la capa de seguridad, el servidor de consentimientos y la auditoría."
            },
            {
                "componente": "Elemento seguro ATECC608 en módulo de desarrollo",
                "categoria": "Seguridad de Hardware",
                "funcion": "Guarda las claves privadas y firma las conexiones de cada dispositivo."
            },
            {
                "componente": "ESP32-S3 (3 unidades)",
                "categoria": "Microcontrolador",
                "funcion": "Simulan dispositivos de salud que envían lecturas con TLS de cliente."
            },
            {
                "componente": "Interruptor Ethernet gestionable",
                "categoria": "Equipo de Red",
                "funcion": "Permite capturar el tráfico en un puerto espejo para su análisis."
            },
            {
                "componente": "Equipo portátil para pruebas de seguridad",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta las herramientas de escaneo y el análisis de tráfico."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Mosquitto con TLS y step-ca",
                "tipo": "Seguridad de Red / Broker MQTT",
                "descripcion": "Emite certificados y exige autenticación mutua a los dispositivos."
            },
            {
                "herramienta": "Keycloak",
                "tipo": "Gestión de Identidad y Acceso",
                "descripcion": "Controla el acceso por roles de médicos, enfermeras y administradores."
            },
            {
                "herramienta": "Python con cryptography y PostgreSQL",
                "tipo": "Librería de Criptografía / Base de Datos",
                "descripcion": "Aplica HMAC, cifra campos y guarda consentimientos y auditoría."
            },
            {
                "herramienta": "Synthea, OWASP ZAP y Wireshark",
                "tipo": "Datos Sintéticos / Pruebas de Seguridad",
                "descripcion": "Generan pacientes ficticios y verifican la seguridad del sistema."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Protección de datos personales sensibles"
        ]
    },
    {
        "id": "proj_286",
        "titulo": "📱 Proyecto 286: Historia Clínica Comunitaria Offline-First para Promotores de Salud con Sincronización Diferida en Zonas sin Conectividad",
        "descripcion": "Problema: Los promotores y auxiliares de salud que visitan viviendas en veredas del Cauca registran en papel el estado de gestantes, niños y crónicos, y luego digitan los datos en el puesto de salud, con retrasos y errores de transcripción. Las aplicaciones que requieren conexión permanente fallan donde no hay cobertura, que es justamente donde más se necesitan.\n\nDescripción: Aplicación Android para teléfonos de gama baja con base de datos local PouchDB que funciona sin conexión, con formularios de visita, signos vitales capturados desde un oxímetro Bluetooth y datos de vacunación. Al llegar al puesto de salud sincroniza con un servidor CouchDB en una Raspberry Pi y resuelve conflictos de edición. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con registros ficticios de visitas y promotores voluntarios bajo consentimiento informado.",
        "sector": "Salud pública - Promotores de salud en zonas dispersas",
        "nivel": "Intermedio",
        "habilidades": [
            "Arquitecturas offline-first con replicación de bases de datos",
            "Desarrollo móvil con interfaces de bajo consumo",
            "Resolución de conflictos de edición en sincronización",
            "Integración de oxímetros con Bluetooth Low Energy",
            "Diseño de formularios clínicos con validación",
            "Evaluación de usabilidad con la escala SUS"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una aplicación de historia clínica comunitaria offline-first que permita a promotores de salud registrar visitas domiciliarias sin conexión y sincronizarlas sin pérdida de datos en el puesto de salud.",
            "📌 Objetivos Específicos:",
            "• Registrar visitas completas durante siete días en modo avión y sincronizar 500 registros con un servidor local en menos de 60 segundos con un enlace emulado de 256 kbit/s.",
            "• Resolver correctamente los conflictos de edición concurrente en 50 casos de prueba, sin pérdida ni duplicación de registros, y conservar el historial de cambios.",
            "• Capturar signos vitales desde un oxímetro Bluetooth y lograr una puntuación SUS de al menos 70 con ocho promotores voluntarios en un teléfono de gama baja."
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono Android de gama baja con 2 GB de RAM",
                "categoria": "Dispositivo Móvil",
                "funcion": "Ejecuta la aplicación de visitas y almacena los registros sin conexión."
            },
            {
                "componente": "Raspberry Pi 4 de 4 GB con disco SSD",
                "categoria": "Computador de Placa Única",
                "funcion": "Funciona como servidor local de sincronización en el puesto de salud."
            },
            {
                "componente": "Oxímetro de pulso con Bluetooth",
                "categoria": "Dispositivo Biomédico Comercial",
                "funcion": "Entrega saturación de oxígeno y pulso a la aplicación en cada visita."
            },
            {
                "componente": "Punto de acceso Wi-Fi de bajo consumo",
                "categoria": "Equipo de Red",
                "funcion": "Crea la red local donde los teléfonos sincronizan sus registros."
            },
            {
                "componente": "Banco de baterías de 20000 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Mantiene los teléfonos cargados durante jornadas largas de visitas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Flutter o Ionic con PouchDB",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Construye la aplicación con base de datos local y replicación."
            },
            {
                "herramienta": "Apache CouchDB",
                "tipo": "Base de Datos Documental",
                "descripcion": "Recibe la replicación y conserva las revisiones de cada documento."
            },
            {
                "herramienta": "Linux tc netem",
                "tipo": "Emulación de Red",
                "descripcion": "Simula enlaces lentos y cortes para probar la sincronización diferida."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Resume visitas, alertas y cobertura de seguimiento por vereda."
            }
        ],
        "area": "IoT Médico y Salud Digital",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Promotores de salud en zonas dispersas"
        ]
    }
];
