// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_151",
        "titulo": "🫀 Proyecto 151: Clasificador de Arritmias Cardíacas en ECG de Una Derivación con TinyML sobre ESP32-S3",
        "descripcion": "Problema: En los municipios rurales del Cauca la mayoría de puestos de salud no cuentan con cardiólogo ni con equipos Holter, por lo que arritmias como la fibrilación auricular o las extrasístoles ventriculares se detectan tarde, cuando el paciente ya presenta complicaciones como accidentes cerebrovasculares.\n\nDescripción: Monitor portátil de ECG de una derivación basado en el módulo AD8232 y un ESP32-S3 que ejecuta localmente una red neuronal convolucional cuantizada (TinyML) para clasificar cada latido en las clases AAMI (normal, supraventricular, ventricular, fusión y desconocido). El dispositivo genera un resumen de eventos sin necesidad de conexión permanente a internet y lo sincroniza con un tablero web cuando hay red disponible.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Cardiología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición y filtrado de señales electrocardiográficas",
            "Detección de complejos QRS y segmentación de latidos",
            "Entrenamiento y cuantización de redes neuronales para microcontroladores",
            "Despliegue de modelos con TensorFlow Lite for Microcontrollers",
            "Evaluación de clasificadores con métricas clínicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un monitor portátil de ECG que clasifique arritmias cardíacas directamente en el microcontrolador mediante un modelo TinyML, como apoyo al tamizaje en puestos de salud sin cardiólogo.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo convolucional con la base MIT-BIH Arrhythmia que alcance una sensibilidad mayor al 85 % para latidos ventriculares bajo validación entre pacientes.",
            "• Desplegar el modelo cuantizado a 8 bits en el ESP32-S3 con un tiempo de inferencia inferior a 50 ms por latido y un consumo de memoria menor a 300 KB.",
            "• Comparar las clasificaciones del dispositivo con las de registros de referencia reproducidos por un simulador de ECG y reportar la concordancia obtenida."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Cardiología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con 8 MB de PSRAM",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el filtrado de la señal y la inferencia del modelo de clasificación de latidos."
            },
            {
                "componente": "Módulo de ECG AD8232 con electrodos desechables",
                "categoria": "Sensor Biomédico",
                "funcion": "Adquiere la señal electrocardiográfica de una derivación."
            },
            {
                "componente": "Pantalla OLED SSD1306",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la frecuencia cardíaca y los eventos detectados."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el dispositivo y aísla al paciente de la red eléctrica."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena y cuantiza el modelo antes de desplegarlo en el microcontrolador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador convolucional de latidos."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo cuantizado en el ESP32-S3."
            },
            {
                "herramienta": "WFDB para Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Lectura de los registros y anotaciones de la base MIT-BIH de PhysioNet."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición e inferencia."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de eventos sincronizados para revisión médica."
            }
        ]
    },
    {
        "id": "proj_152",
        "titulo": "🩺 Proyecto 152: Estetoscopio Digital con Clasificación de Soplos Cardíacos mediante Inteligencia Artificial en el Borde",
        "descripcion": "Problema: Las cardiopatías congénitas y valvulares en niños se sospechan principalmente por la auscultación de soplos, pero en la atención primaria del Cauca los médicos generales tienen poca experiencia en distinguir soplos patológicos de inocentes, lo que produce remisiones tardías o innecesarias a especialistas ubicados en Popayán o Cali.\n\nDescripción: Estetoscopio digital construido con una campana acústica convencional, un micrófono MEMS I2S y una Raspberry Pi que extrae espectrogramas log-Mel de los sonidos cardíacos y ejecuta un modelo de aprendizaje profundo para clasificar la presencia, ausencia o indeterminación de soplos. El sistema guarda la grabación etiquetada para que un especialista pueda revisarla a distancia.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Pediatría y atención primaria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación acústica para auscultación",
            "Procesamiento digital de audio y espectrogramas",
            "Aprendizaje profundo para clasificación de sonidos biomédicos",
            "Optimización de modelos para ejecución en el borde",
            "Manejo ético de datos clínicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un estetoscopio digital de bajo costo que clasifique automáticamente la presencia de soplos cardíacos para apoyar la decisión de remisión en atención primaria pediátrica.",
            "📌 Objetivos Específicos:",
            "• Diseñar el acople acústico entre la campana del estetoscopio y el micrófono MEMS, caracterizando su respuesta en la banda de 20 a 800 Hz.",
            "• Entrenar un clasificador con la base CirCor DigiScope de PhysioNet que supere una exactitud ponderada del 70 % en la clasificación de soplos presentes, ausentes y desconocidos.",
            "• Ejecutar la inferencia completa en la Raspberry Pi en menos de 2 segundos por grabación y evaluar la usabilidad del dispositivo con al menos 5 profesionales de la salud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Pediatría y atención primaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 Model B de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Procesa el audio y ejecuta el modelo de clasificación de soplos."
            },
            {
                "componente": "Micrófono MEMS I2S INMP441",
                "categoria": "Sensor Acústico",
                "funcion": "Captura los sonidos cardíacos transmitidos por la campana."
            },
            {
                "componente": "Campana de estetoscopio convencional con acople impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Concentra el sonido cardíaco y lo conduce hacia el micrófono."
            },
            {
                "componente": "Pantalla táctil de 3,5 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el fonocardiograma y el resultado de la clasificación."
            },
            {
                "componente": "Audífonos de monitoreo",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten al profesional escuchar la señal amplificada durante la grabación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la red convolucional sobre espectrogramas."
            },
            {
                "herramienta": "Librosa",
                "tipo": "Librería de Procesamiento de Audio",
                "descripcion": "Filtrado, segmentación y cálculo de espectrogramas log-Mel."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución optimizada del modelo exportado en la Raspberry Pi."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz local para revisar y exportar grabaciones etiquetadas."
            }
        ]
    },
    {
        "id": "proj_153",
        "titulo": "🫁 Proyecto 153: Detección de Neumonía en Radiografías de Tórax con Modelo Cuantizado en Raspberry Pi para Hospitales de Baja Complejidad",
        "descripcion": "Problema: Los hospitales de primer nivel del Cauca disponen de equipos de rayos X, pero no de radiólogo permanente; las radiografías de tórax de niños y adultos con sospecha de neumonía se leen horas o días después, lo que retrasa el inicio del tratamiento y aumenta las remisiones.\n\nDescripción: Estación de apoyo diagnóstico basada en Raspberry Pi 5 que recibe radiografías digitales o fotografías del negatoscopio tomadas con una cámara, ejecuta localmente una red convolucional ligera y cuantizada para estimar la probabilidad de neumonía y genera un mapa de calor Grad-CAM que señala las regiones que motivan la predicción, sin enviar imágenes de pacientes a servicios externos.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Radiología en hospitales de primer nivel",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Preprocesamiento de imágenes médicas",
            "Aprendizaje por transferencia con redes convolucionales",
            "Cuantización y despliegue de modelos en computadores de placa única",
            "Explicabilidad de modelos con Grad-CAM",
            "Protección de datos personales en salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una estación de inferencia local que detecte neumonía en radiografías de tórax y explique visualmente su predicción, como apoyo al médico general en hospitales sin radiólogo.",
            "📌 Objetivos Específicos:",
            "• Entrenar por aprendizaje por transferencia un modelo MobileNetV3 con el conjunto público de radiografías pediátricas de Kermany y alcanzar un AUC mayor a 0,90 en el conjunto de prueba.",
            "• Cuantizar el modelo a 8 bits y medir en la Raspberry Pi 5 una latencia menor a 1 segundo por imagen con una pérdida de AUC inferior a 0,02.",
            "• Evaluar la robustez del modelo frente a fotografías del negatoscopio tomadas con la cámara de la estación y documentar la caída de desempeño respecto a imágenes digitales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Radiología en hospitales de primer nivel"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el modelo de detección y la interfaz de la estación."
            },
            {
                "componente": "Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Fotografía radiografías impresas ubicadas sobre el negatoscopio."
            },
            {
                "componente": "Soporte de cámara impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene una distancia y un ángulo constantes durante la captura."
            },
            {
                "componente": "Monitor HDMI",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Presenta la radiografía, la probabilidad estimada y el mapa de calor."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Aprendizaje por transferencia del modelo MobileNetV3."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT)",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia del modelo cuantizado en la Raspberry Pi."
            },
            {
                "herramienta": "pydicom",
                "tipo": "Librería de Imágenes Médicas",
                "descripcion": "Lectura de radiografías en formato DICOM."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Corrección de perspectiva y normalización de las fotografías."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz local de carga de imágenes y visualización de resultados."
            }
        ]
    },
    {
        "id": "proj_154",
        "titulo": "📱 Proyecto 154: Tamizaje de Retinopatía Diabética con Imágenes de Fondo de Ojo Capturadas por Teléfono Inteligente",
        "descripcion": "Problema: La retinopatía diabética es una de las principales causas de ceguera prevenible en adultos, pero en el Cauca los pacientes diabéticos de zonas rurales rara vez acceden a un examen anual de fondo de ojo porque los retinógrafos y los oftalmólogos se concentran en Popayán.\n\nDescripción: Sistema de tamizaje compuesto por un adaptador impreso en 3D que acopla una lente condensadora de 20 dioptrías a un teléfono inteligente y una aplicación Android que evalúa la calidad de la imagen capturada y ejecuta en el propio teléfono un modelo de aprendizaje profundo para clasificar el grado de retinopatía, priorizando a los pacientes que deben ser remitidos a oftalmología.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Oftalmología y control de diabetes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño óptico básico para captura de fondo de ojo",
            "Clasificación de imágenes médicas con aprendizaje profundo",
            "Desarrollo de aplicaciones móviles con inferencia local",
            "Evaluación de calidad de imagen",
            "Análisis de sensibilidad y especificidad para tamizaje"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de tamizaje de retinopatía diabética que capture imágenes de fondo de ojo con un teléfono inteligente y las clasifique localmente para priorizar la remisión a oftalmología.",
            "📌 Objetivos Específicos:",
            "• Diseñar e imprimir un adaptador ajustable para lente de 20 dioptrías que permita capturar al menos un 60 % de imágenes con calidad gradable en un modelo ocular de práctica.",
            "• Entrenar un clasificador de retinopatía referible con los conjuntos APTOS 2019 y EyePACS que alcance una sensibilidad mayor al 85 % con una especificidad mayor al 75 %.",
            "• Integrar el modelo en una aplicación Android que entregue el resultado en menos de 3 segundos sin conexión a internet y medir su desempeño frente a imágenes tomadas con el adaptador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Oftalmología y control de diabetes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Captura las imágenes de fondo de ojo y ejecuta el modelo de clasificación."
            },
            {
                "componente": "Lente condensadora de 20 dioptrías",
                "categoria": "Componente Óptico",
                "funcion": "Forma la imagen de la retina para la cámara del teléfono."
            },
            {
                "componente": "Adaptador de lente impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Alinea la lente con la cámara y la linterna del teléfono."
            },
            {
                "componente": "Modelo ocular de práctica para oftalmoscopia",
                "categoria": "Equipo de Pruebas",
                "funcion": "Permite ensayar la captura sin exponer a pacientes durante el desarrollo."
            },
            {
                "componente": "Computador de desarrollo con GPU",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena el modelo de clasificación de retinopatía."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador de retinopatía referible."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT) para Android",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo en el teléfono sin conexión."
            },
            {
                "herramienta": "Android Studio con Kotlin",
                "tipo": "Entorno de Desarrollo Móvil",
                "descripcion": "Desarrollo de la aplicación de captura y tamizaje."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Detección del disco de la retina y evaluación de nitidez e iluminación."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Software de Diseño CAD",
                "descripcion": "Diseño paramétrico del adaptador óptico."
            }
        ]
    },
    {
        "id": "proj_155",
        "titulo": "😴 Proyecto 155: Tamizaje Domiciliario de Apnea Obstructiva del Sueño con Oximetría Nocturna y Aprendizaje Automático",
        "descripcion": "Problema: La apnea obstructiva del sueño aumenta el riesgo de hipertensión, accidentes de tránsito y eventos cardiovasculares, pero la mayoría de personas que la padecen no está diagnosticada porque la polisomnografía es costosa, tiene listas de espera de meses y en Popayán solo se realiza en pocas clínicas.\n\nDescripción: Oxímetro de dedo nocturno basado en ESP32 y sensor MAX30102 que registra la saturación de oxígeno y la frecuencia de pulso durante la noche y, mediante un modelo de aprendizaje automático entrenado con características de desaturación, estima el índice de apnea-hipopnea y clasifica la severidad del caso para orientar la remisión a un estudio de sueño completo.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Medicina del sueño",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fotopletismografía y oximetría de pulso",
            "Registro de datos fisiológicos de larga duración",
            "Extracción de características de series de tiempo",
            "Modelos de aprendizaje automático supervisado",
            "Diseño de dispositivos cómodos para uso nocturno"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un oxímetro nocturno de bajo costo que estime la severidad de la apnea obstructiva del sueño mediante aprendizaje automático, como herramienta de tamizaje domiciliario.",
            "📌 Objetivos Específicos:",
            "• Construir un oxímetro que registre SpO2 y pulso a 1 Hz durante al menos 8 horas continuas en una tarjeta microSD con pérdidas de datos menores al 1 %.",
            "• Entrenar un modelo con registros de oximetría de bases públicas de PhysioNet y del NSRR que clasifique la severidad de apnea en cuatro categorías con exactitud mayor al 70 %.",
            "• Comparar las lecturas del prototipo con un oxímetro comercial certificado en al menos 10 voluntarios despiertos y reportar el error medio absoluto de SpO2."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Medicina del sueño"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-C3 Super Mini",
                "categoria": "Microcontrolador",
                "funcion": "Controla la adquisición nocturna y el almacenamiento de los datos."
            },
            {
                "componente": "Sensor de pulso y oximetría MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la señal fotopletismográfica para calcular SpO2 y pulso."
            },
            {
                "componente": "Módulo lector de tarjeta microSD",
                "categoria": "Almacenamiento",
                "funcion": "Guarda el registro completo de la noche."
            },
            {
                "componente": "Batería LiPo de 1000 mAh con módulo TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Garantiza la autonomía durante toda la noche."
            },
            {
                "componente": "Pinza de dedo de silicona y carcasa impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija el sensor al dedo con comodidad y bloquea la luz ambiental."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y validación del clasificador de severidad."
            },
            {
                "herramienta": "pandas y NumPy",
                "tipo": "Librería de Análisis de Datos",
                "descripcion": "Cálculo de índices de desaturación y características de la señal."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Análisis",
                "descripcion": "Documentación reproducible de los experimentos."
            }
        ]
    },
    {
        "id": "proj_156",
        "titulo": "🤧 Proyecto 156: Clasificación de Sonidos de Tos con Micrófono Embebido para el Tamizaje de Enfermedades Respiratorias",
        "descripcion": "Problema: En comunidades indígenas y rurales del Cauca, enfermedades como la tuberculosis, la neumonía y el asma se consultan tarde porque la tos se considera un síntoma menor; los promotores de salud no cuentan con herramientas objetivas para decidir qué personas deben remitirse a una valoración médica.\n\nDescripción: Dispositivo de bolsillo basado en Arduino Nano 33 BLE Sense Rev2 que graba episodios de tos y ejecuta localmente un modelo TinyML que distingue tos seca, tos productiva y sonidos que no son tos, entregando a una aplicación móvil por Bluetooth un registro de frecuencia y tipo de tos que el promotor de salud usa como criterio de remisión.",
        "area": "Medicina con AIoT",
        "sector": "Salud pública - Enfermedades respiratorias",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Captura y etiquetado de datos de audio",
            "Extracción de coeficientes MFCC",
            "Entrenamiento de modelos TinyML con Edge Impulse",
            "Comunicación Bluetooth Low Energy",
            "Diseño de herramientas para promotores de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dispositivo de bolsillo que detecte y clasifique sonidos de tos mediante un modelo ejecutado en el microcontrolador, como apoyo al tamizaje de enfermedades respiratorias en comunidades rurales.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de entrenamiento combinando los datos públicos de COUGHVID y Coswara con grabaciones de ruido ambiental típico de viviendas rurales.",
            "• Entrenar y desplegar un modelo que detecte episodios de tos con una exactitud mayor al 85 % y una tasa de falsos positivos menor al 10 % frente a habla y ruido doméstico.",
            "• Medir el consumo energético del dispositivo y demostrar una autonomía de al menos 24 horas en modo de escucha continua."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Enfermedades respiratorias"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Arduino Nano 33 BLE Sense Rev2",
                "categoria": "Microcontrolador",
                "funcion": "Captura el audio con su micrófono integrado y ejecuta el modelo de clasificación."
            },
            {
                "componente": "Batería LiPo de 500 mAh con cargador",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el dispositivo de bolsillo."
            },
            {
                "componente": "Carcasa portátil impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Protege la electrónica y deja expuesto el micrófono."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe por Bluetooth el registro de episodios de tos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Extracción de MFCC, entrenamiento y exportación del modelo."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware y del servicio Bluetooth."
            },
            {
                "herramienta": "Audacity",
                "tipo": "Editor de Audio",
                "descripcion": "Revisión y etiquetado manual de grabaciones."
            },
            {
                "herramienta": "MIT App Inventor",
                "tipo": "Entorno de Desarrollo Móvil",
                "descripcion": "Aplicación sencilla para visualizar el registro de tos."
            }
        ]
    },
    {
        "id": "proj_157",
        "titulo": "👶 Proyecto 157: Estimación de Ictericia Neonatal mediante Cámara con Carta de Color Calibrada y Regresión con Aprendizaje Automático",
        "descripcion": "Problema: La ictericia neonatal afecta a la mayoría de los recién nacidos y, si la bilirrubina alcanza niveles altos sin tratamiento, puede causar daño neurológico permanente; tras el alta temprana, las familias de zonas rurales del Cauca deben viajar horas para una prueba de sangre, y la valoración visual de la coloración de la piel es poco confiable.\n\nDescripción: Sistema basado en Raspberry Pi y cámara que fotografía la piel del esternón del recién nacido junto a una carta de color impresa, corrige la iluminación con la carta como referencia y estima mediante un modelo de regresión el nivel de bilirrubina, clasificando el riesgo según el nomograma de Bhutani para orientar si se requiere una prueba de laboratorio.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Neonatología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Calibración colorimétrica de imágenes",
            "Segmentación de regiones de interés en piel",
            "Modelos de regresión con aprendizaje automático",
            "Diseño de protocolos de captura reproducibles",
            "Ética de la investigación con población neonatal"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de estimación no invasiva de bilirrubina en recién nacidos a partir de imágenes de la piel calibradas en color, como herramienta de tamizaje para familias con difícil acceso a laboratorio.",
            "📌 Objetivos Específicos:",
            "• Diseñar una carta de color de referencia y un algoritmo de corrección que reduzca la diferencia de color ΔE entre capturas bajo tres iluminaciones distintas a menos de 5 unidades.",
            "• Entrenar un modelo de regresión con un conjunto de imágenes de bilirrubina neonatal de acceso público que obtenga una correlación mayor a 0,75 con la bilirrubina sérica de referencia.",
            "• Validar el comportamiento del sistema con muestras sintéticas de piel pigmentada en tonos ictéricos y documentar un protocolo de estudio clínico para presentar a un comité de ética."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Neonatología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 Model B de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Corrige el color de la imagen y ejecuta el modelo de estimación."
            },
            {
                "componente": "Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura la imagen de la piel junto a la carta de color."
            },
            {
                "componente": "Anillo de LED de luz blanca neutra",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Proporciona una iluminación uniforme durante la captura."
            },
            {
                "componente": "Carta de color impresa y laminada",
                "categoria": "Elemento de Calibración",
                "funcion": "Sirve de referencia para corregir el balance de color."
            },
            {
                "componente": "Visor de captura impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija la distancia de la cámara y bloquea la luz ambiental."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Detección de la carta de color y segmentación de la piel."
            },
            {
                "herramienta": "colour-science",
                "tipo": "Librería de Colorimetría",
                "descripcion": "Corrección de color y cálculo de diferencias ΔE."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo de regresión de bilirrubina."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz de captura y reporte de riesgo."
            }
        ]
    },
    {
        "id": "proj_158",
        "titulo": "🔍 Proyecto 158: Triaje de Lesiones Cutáneas con Dermatoscopio de Bajo Costo y Clasificador en Dispositivo Móvil",
        "descripcion": "Problema: El cáncer de piel, incluido el melanoma, se diagnostica con frecuencia en etapas avanzadas en zonas rurales de Colombia porque los dermatólogos son escasos fuera de las capitales y los médicos generales no cuentan con dermatoscopio ni entrenamiento para diferenciar lesiones sospechosas de lesiones benignas.\n\nDescripción: Dermatoscopio de bajo costo acoplable a un teléfono inteligente, construido con una lente macro, iluminación LED polarizada y una carcasa impresa en 3D, junto con una aplicación que ejecuta en el teléfono un modelo de aprendizaje profundo que clasifica la lesión en categorías de prioridad de remisión y envía la imagen al dermatólogo solo cuando el profesional lo autoriza.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Dermatología y teledermatología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de iluminación polarizada para dermatoscopia",
            "Clasificación de imágenes con conjuntos de datos desbalanceados",
            "Despliegue de modelos en aplicaciones móviles",
            "Evaluación de sesgos por tipo de piel",
            "Teledermatología y flujos de remisión"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dermatoscopio de bajo costo acoplado a un teléfono inteligente que clasifique localmente lesiones cutáneas por prioridad de remisión para apoyar a médicos generales en zonas rurales.",
            "📌 Objetivos Específicos:",
            "• Construir el dermatoscopio con iluminación polarizada cruzada y verificar una resolución mínima de 10 pares de líneas por milímetro con una carta de resolución impresa.",
            "• Entrenar un clasificador con los conjuntos HAM10000 e ISIC 2019 que alcance una sensibilidad mayor al 85 % para lesiones malignas en la categoría de remisión prioritaria.",
            "• Analizar el desempeño del modelo por grupos de fototipo disponibles en los datos públicos y reportar las diferencias como limitación para la población colombiana."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Dermatología y teledermatología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Captura la imagen dermatoscópica y ejecuta el clasificador."
            },
            {
                "componente": "Lente macro de 10x con clip para teléfono",
                "categoria": "Componente Óptico",
                "funcion": "Amplía la lesión para observar sus estructuras."
            },
            {
                "componente": "Anillo de LED con láminas polarizadoras",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Elimina reflejos superficiales de la piel mediante polarización cruzada."
            },
            {
                "componente": "Carcasa espaciadora impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene la distancia focal fija sobre la piel."
            },
            {
                "componente": "Computador de desarrollo con GPU",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena el modelo de clasificación de lesiones."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador con balanceo de clases."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT) para Android",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia del modelo en el teléfono."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de captura, triaje y envío autorizado de imágenes."
            },
            {
                "herramienta": "Albumentations",
                "tipo": "Librería de Aumento de Datos",
                "descripcion": "Simulación de variaciones de iluminación, enfoque y tono de piel."
            }
        ]
    },
    {
        "id": "proj_159",
        "titulo": "🚶 Proyecto 159: Prueba Timed Up and Go Instrumentada con Sensores Inerciales y TinyML para Valorar el Riesgo de Caída",
        "descripcion": "Problema: En los centros de día y hogares geriátricos de Popayán el riesgo de caída de los adultos mayores se valora con la prueba Timed Up and Go medida con cronómetro, que solo entrega el tiempo total y no detecta alteraciones de la marcha como la asimetría del paso o los giros inestables, por lo que muchas personas con riesgo alto no reciben intervención preventiva.\n\nDescripción: Sensor inercial portátil basado en una placa XIAO nRF52840 Sense que se fija a la cintura durante la prueba Timed Up and Go, segmenta automáticamente sus fases (levantarse, caminar, girar, sentarse) y ejecuta un modelo TinyML que estima el nivel de riesgo de caída a partir de las características de cada fase, entregando un informe al fisioterapeuta en una aplicación móvil.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Geriatría y fisioterapia",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de datos con unidades de medición inercial",
            "Segmentación de actividades humanas",
            "Extracción de parámetros espaciotemporales de la marcha",
            "Entrenamiento y despliegue de modelos TinyML",
            "Trabajo interdisciplinario con fisioterapeutas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema portátil que instrumente la prueba Timed Up and Go y estime el riesgo de caída mediante un modelo ejecutado en el dispositivo, como apoyo a la valoración geriátrica.",
            "📌 Objetivos Específicos:",
            "• Segmentar automáticamente las cuatro fases de la prueba con un error de duración menor a 0,3 segundos frente a la anotación sobre video.",
            "• Calcular al menos 8 parámetros de marcha y giro, y entrenar un modelo que clasifique el riesgo de caída con exactitud mayor al 75 % usando la escala de Tinetti aplicada por un fisioterapeuta como referencia.",
            "• Evaluar el sistema con al menos 15 adultos mayores voluntarios bajo consentimiento informado y medir su repetibilidad mediante el coeficiente de correlación intraclase."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Geriatría y fisioterapia"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Seeed Studio XIAO nRF52840 Sense",
                "categoria": "Microcontrolador",
                "funcion": "Lee la unidad inercial integrada y ejecuta el modelo de riesgo de caída."
            },
            {
                "componente": "Cinturón elástico con estuche impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija el sensor a la altura de la vértebra L5."
            },
            {
                "componente": "Batería LiPo de 300 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el sensor durante las sesiones de evaluación."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe los resultados por Bluetooth y graba el video de referencia."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Entrenamiento y exportación del modelo de riesgo de caída."
            },
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición y segmentación."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado de la señal inercial y detección de pasos."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de reporte para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_160",
        "titulo": "🦟 Proyecto 160: Detección de Parásitos de Malaria en Frotis Sanguíneos con Microscopio Digital y Visión Artificial en el Borde",
        "descripcion": "Problema: En los municipios de la costa pacífica caucana, como Guapi, Timbiquí y López de Micay, la malaria es endémica y su diagnóstico depende de microscopistas que revisan manualmente frotis de gota gruesa; la escasez de personal capacitado y la fatiga en temporadas de brote generan demoras y errores en el diagnóstico.\n\nDescripción: Estación de apoyo diagnóstico que acopla una cámara a un microscopio óptico de laboratorio y usa una Raspberry Pi 5 para detectar y contar automáticamente glóbulos rojos parasitados en frotis teñidos con Giemsa mediante un modelo de detección de objetos ligero, calculando la parasitemia y priorizando las láminas que el microscopista debe confirmar, sin depender de conexión a internet.",
        "area": "Medicina con AIoT",
        "sector": "Salud pública - Enfermedades tropicales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Microscopía digital y captura de imágenes de laboratorio",
            "Detección de objetos con aprendizaje profundo",
            "Despliegue de modelos de visión en computadores de placa única",
            "Cuantificación automática de parasitemia",
            "Diseño de herramientas para laboratorios con conectividad limitada"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una estación de microscopía digital que detecte y cuantifique parásitos de malaria en frotis sanguíneos mediante visión artificial ejecutada localmente, como apoyo a los microscopistas de zonas endémicas.",
            "📌 Objetivos Específicos:",
            "• Diseñar el acople de la cámara al ocular del microscopio y obtener imágenes enfocadas con objetivo de 100x en al menos el 90 % de los campos capturados.",
            "• Entrenar un detector YOLO con el conjunto de imágenes de malaria del NIH y conjuntos públicos de frotis anotados que alcance un mAP@0,5 mayor a 0,80 para células parasitadas.",
            "• Ejecutar la detección en la Raspberry Pi 5 a una velocidad de al menos 1 campo por segundo y comparar la parasitemia calculada con el conteo manual de un microscopista en láminas de práctica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Enfermedades tropicales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el detector de parásitos y calcula la parasitemia."
            },
            {
                "componente": "Raspberry Pi High Quality Camera con adaptador para ocular",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura los campos del frotis a través del microscopio."
            },
            {
                "componente": "Microscopio óptico binocular del laboratorio con objetivo 100x",
                "categoria": "Equipo de Laboratorio",
                "funcion": "Amplía el frotis sanguíneo para su observación."
            },
            {
                "componente": "Láminas de práctica de frotis teñidos con Giemsa",
                "categoria": "Material de Pruebas",
                "funcion": "Permiten validar el sistema frente al conteo manual."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra las detecciones y el resultado de parasitemia."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ultralytics YOLO",
                "tipo": "Framework de Detección de Objetos",
                "descripcion": "Entrenamiento del detector de células parasitadas."
            },
            {
                "herramienta": "NCNN",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia optimizada del detector en la CPU de la Raspberry Pi."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Anotación de Datos",
                "descripcion": "Anotación de imágenes capturadas en el laboratorio."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Captura, evaluación de enfoque y unión de campos."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro local de láminas analizadas y resultados."
            }
        ]
    },
    {
        "id": "proj_247",
        "titulo": "🌡️ Proyecto 247: Tamizaje Termográfico Multicondición de Fiebre, Inflamación y Asimetría Vascular con Cámara Infrarroja y Procesamiento en el Borde sobre Jetson Orin Nano",
        "descripcion": "Problema: En los puestos de salud rurales del Cauca el tamizaje de fiebre, inflamación y mala circulación depende del termómetro puntual y de la inspección visual, que no detectan asimetrías de temperatura entre extremidades ni zonas localizadas de calor; así se pierden oportunidades de remitir a tiempo a los hospitales de Popayán casos de infección, trombosis venosa profunda o insuficiencia arterial.\n\nDescripción: Estación de tamizaje con una cámara térmica FLIR Lepton 3.5 conectada a un Jetson Orin Nano que segmenta la región de interés (rostro, pantorrillas o manos) y ejecuta localmente una red convolucional multitarea con tres salidas: temperatura corporal elevada, asimetría térmica entre extremidades y calor localizado compatible con inflamación. El modelo se entrena con termogramas de voluntarios sanos sometidos a perturbaciones térmicas controladas (compresas tibias o frías), se calibra con un cuerpo negro de referencia y entrega un informe de sospecha, nunca un diagnóstico. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con un cuerpo negro de referencia y voluntarios bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Termografía clínica y tamizaje multicondición",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Calibración radiométrica con cuerpo negro de referencia",
            "Segmentación de regiones de interés en imágenes térmicas",
            "Entrenamiento de redes multitarea con PyTorch",
            "Optimización de modelos con TensorRT en Jetson",
            "Diseño de protocolos de adquisición termográfica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación de termografía infrarroja con procesamiento en el borde que identifique de forma simultánea fiebre, asimetría térmica entre extremidades y calor localizado, como apoyo al tamizaje en puestos de salud rurales.",
            "📌 Objetivos Específicos:",
            "• Calibrar la cámara Lepton frente a un cuerpo negro de referencia y obtener un error absoluto medio inferior a 0,5 °C en el rango de 30 a 40 °C.",
            "• Entrenar el modelo multitarea con termogramas de al menos 40 voluntarios y alcanzar una sensibilidad superior al 80 % ante las perturbaciones térmicas controladas, con validación entre sujetos.",
            "• Desplegar el modelo con TensorRT en el Jetson Orin Nano con una latencia inferior a 100 ms por termograma y generar un informe de sospecha con el mapa térmico anotado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Termografía clínica y tamizaje multicondición"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Jetson Orin Nano Developer Kit de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la segmentación y la inferencia del modelo multitarea en cada termograma."
            },
            {
                "componente": "Cámara térmica FLIR Lepton 3.5 con módulo PureThermal",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura termogramas radiométricos de 160 × 120 píxeles por USB."
            },
            {
                "componente": "Cuerpo negro de referencia con termistor calibrado",
                "categoria": "Instrumento de Referencia",
                "funcion": "Entrega una temperatura conocida para calibrar y verificar la cámara."
            },
            {
                "componente": "Trípode con regla de distancia fija",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene constantes la distancia y el ángulo de captura entre voluntarios."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el mapa térmico y el informe de sospecha al personal de salud."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo multitarea con termogramas anotados."
            },
            {
                "herramienta": "TensorRT",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Optimización y ejecución del modelo en la GPU del Jetson."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Segmentación de regiones y corrección radiométrica de los termogramas."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Anotación de Datos",
                "descripcion": "Marcado de las regiones de interés y de las perturbaciones térmicas."
            }
        ]
    },
    {
        "id": "proj_248",
        "titulo": "🦶 Proyecto 248: Detección Temprana del Riesgo de Úlcera en el Pie Diabético mediante Termografía Plantar con Sensor MLX90640 y TinyML sobre ESP32-S3",
        "descripcion": "Problema: Las úlceras del pie diabético suelen detectarse cuando ya existe infección o necrosis, porque la neuropatía impide sentir el daño y los controles en los centros de salud del Cauca se limitan a la inspección visual y al monofilamento. Un aumento localizado de la temperatura plantar precede a la lesión, pero casi nunca se mide, y las amputaciones evitables siguen siendo frecuentes.\n\nDescripción: Plataforma de revisión del pie con un sensor térmico MLX90640 de 32 × 24 píxeles y un ESP32-S3 que captura el termograma plantar sobre un soporte de vidrio, compara el pie derecho con el izquierdo y ejecuta un modelo TinyML cuantizado que clasifica el riesgo (sin asimetría, vigilancia o riesgo alto) a partir de la diferencia de temperatura entre zonas homólogas, cuyo umbral clínico de 2,2 °C describe la literatura. El modelo se entrena con termogramas de voluntarios sanos y asimetrías sintéticas añadidas por aumento de datos, y los resultados se publican en un tablero para el control del paciente. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con calentamientos locales controlados en voluntarios bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Enfermedades crónicas - Pie diabético y podología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de imágenes con sensores térmicos matriciales",
            "Registro y comparación de zonas plantares homólogas",
            "Aumento de datos con asimetrías térmicas sintéticas",
            "Cuantización de modelos para microcontroladores",
            "Interpretación de umbrales térmicos en el pie diabético"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un dispositivo de termografía plantar con inferencia embebida que clasifique el riesgo de ulceración del pie diabético por asimetría térmica, como apoyo al control periódico en la atención primaria.",
            "📌 Objetivos Específicos:",
            "• Verificar el sensor MLX90640 frente a un cuerpo negro de referencia y lograr un error medio inferior a 0,7 °C entre 28 y 38 °C.",
            "• Entrenar un clasificador de tres niveles de riesgo con termogramas de al menos 30 voluntarios y alcanzar una exactitud superior al 85 % ante calentamientos locales mayores de 2,2 °C.",
            "• Cuantizar el modelo a 8 bits y ejecutarlo en el ESP32-S3 con una latencia inferior a 200 ms y un consumo de memoria menor a 250 KB."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Pie diabético y podología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con 8 MB de PSRAM",
                "categoria": "Microcontrolador",
                "funcion": "Procesa el termograma, ejecuta el modelo de riesgo y publica el resultado."
            },
            {
                "componente": "Sensor térmico MLX90640 de 32 × 24 píxeles",
                "categoria": "Sensor de Imagen",
                "funcion": "Mide la temperatura de la planta del pie sin contacto."
            },
            {
                "componente": "Soporte de vidrio con espejo a 45 grados",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Permite fotografiar la planta de ambos pies con el paciente de pie o sentado."
            },
            {
                "componente": "Pantalla TFT de 2,8 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el mapa térmico de ambos pies y el nivel de riesgo."
            },
            {
                "componente": "Cuerpo negro de referencia con termistor calibrado",
                "categoria": "Instrumento de Referencia",
                "funcion": "Verifica la exactitud del sensor antes de las sesiones de captura."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador de riesgo con termogramas aumentados."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo cuantizado en el ESP32-S3."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de lectura del sensor, preprocesamiento e inferencia."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Transporte de los resultados de cada revisión hacia el tablero."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero con la evolución de la asimetría térmica por paciente."
            }
        ]
    },
    {
        "id": "proj_249",
        "titulo": "🎀 Proyecto 249: Tamizaje Adjunto con Termografía Mamaria Infrarroja y Red Convolucional Cuantizada en Raspberry Pi 5 con Acelerador Coral, con Análisis Explícito de Limitaciones",
        "descripcion": "Problema: La mamografía llega con poca regularidad a las mujeres de las zonas rurales del Cauca por la distancia y la falta de equipos, y se ha propuesto la termografía infrarroja como técnica portátil y sin radiación. Sin embargo, su sensibilidad y especificidad son menores que las de la mamografía, por lo que solo puede considerarse un apoyo adjunto cuya utilidad debe medirse con rigor.\n\nDescripción: Se entrena en Google Colab una red convolucional ligera que clasifica termogramas mamarios como normales o sospechosos con la base pública DMR-IR de termografía mamaria, y se analiza su desempeño por subgrupos con atención a los falsos positivos y a la influencia de la temperatura ambiente. El modelo cuantizado se despliega en una Raspberry Pi 5 con acelerador Coral USB y una cámara térmica FLIR Lepton 3.5, y se prueba el protocolo de aclimatación con voluntarias sanas. La interfaz declara siempre que el resultado no reemplaza la mamografía ni la valoración clínica. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos anonimizados y voluntarias sanas bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Mastología y detección temprana de cáncer de mama",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Aprendizaje por transferencia con imágenes térmicas",
            "Evaluación con intervalos de confianza y curvas ROC",
            "Análisis de falsos positivos y factores de confusión",
            "Cuantización para aceleradores Edge TPU",
            "Comunicación responsable de las limitaciones clínicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar la viabilidad de la termografía mamaria con aprendizaje profundo en el borde como técnica adjunta de tamizaje, cuantificando sus límites de desempeño y declarándolos en la interfaz del prototipo.",
            "📌 Objetivos Específicos:",
            "• Entrenar por transferencia un modelo MobileNetV2 con DMR-IR, dividiendo por paciente, y reportar el AUC, la sensibilidad y la especificidad con intervalos de confianza del 95 %.",
            "• Medir la caída de desempeño al reducir las imágenes a 160 × 120 píxeles, la resolución de la cámara Lepton, y documentarla frente a la resolución original.",
            "• Desplegar el modelo cuantizado en la Raspberry Pi 5 con Coral con una latencia inferior a 150 ms por imagen y documentar al menos tres factores de confusión térmica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Mastología y detección temprana de cáncer de mama"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la interfaz del sistema y gestiona la captura y la inferencia."
            },
            {
                "componente": "Acelerador Coral USB Edge TPU",
                "categoria": "Acelerador de Inferencia",
                "funcion": "Acelera la inferencia del modelo cuantizado a 8 bits."
            },
            {
                "componente": "Cámara térmica FLIR Lepton 3.5 con módulo PureThermal",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura termogramas radiométricos de las voluntarias por USB."
            },
            {
                "componente": "Soporte regulable con fondo térmicamente neutro",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija la distancia de captura y reduce reflejos infrarrojos del entorno."
            },
            {
                "componente": "Termohigrómetro digital calibrado",
                "categoria": "Instrumento de Referencia",
                "funcion": "Registra la temperatura y la humedad de la sala durante la aclimatación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento por transferencia y cuantización del clasificador."
            },
            {
                "herramienta": "PyCoral y TensorFlow Lite",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo compilado para el Edge TPU en la Raspberry Pi."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Análisis de Datos",
                "descripcion": "Cálculo de curvas ROC, métricas e intervalos de confianza por remuestreo."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Preprocesamiento, recorte y normalización de los termogramas."
            }
        ]
    },
    {
        "id": "proj_250",
        "titulo": "🩹 Proyecto 250: Seguimiento de la Cicatrización de Heridas Crónicas con Cámara Térmica y RGB, Segmentación del Lecho de la Herida y Alerta de Estancamiento en Raspberry Pi 5",
        "descripcion": "Problema: Las enfermeras de atención domiciliaria y de los hospitales de primer nivel miden las úlceras por presión y las heridas crónicas con regla y descripción subjetiva, por lo que no hay un registro objetivo de si la herida cicatriza o empeora, y los signos tempranos de infección, como el aumento local de temperatura, pasan inadvertidos hasta la consulta siguiente.\n\nDescripción: Dispositivo de mano con Raspberry Pi 5, cámara RGB y sensor térmico MLX90640 que fotografía la herida junto a un marcador ArUco de escala, segmenta con una red U-Net ligera el lecho de la herida para calcular su área en cm² y estima la diferencia de temperatura entre el borde y la piel sana circundante. La red se entrena con el conjunto público de úlceras del pie FUSeg y se ajusta con imágenes propias. Cada visita se guarda en una base local y se grafica la evolución del área y la temperatura para alertar un estancamiento o un posible foco infeccioso. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con simuladores de heridas y voluntarios bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Heridas crónicas y enfermería domiciliaria",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Segmentación semántica de imágenes médicas con U-Net",
            "Calibración de escala con marcadores ArUco",
            "Fusión de información térmica y visible",
            "Exportación de modelos a ONNX Runtime",
            "Diseño de registros clínicos locales con SQLite"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un dispositivo de mano que mida el área de heridas crónicas y la diferencia térmica con la piel circundante, para que el personal de enfermería registre su evolución de forma objetiva.",
            "📌 Objetivos Específicos:",
            "• Entrenar una U-Net ligera con FUSeg y alcanzar un coeficiente de Dice superior a 0,75 en el conjunto de prueba, y reportar el error del área frente a la medida con simuladores de heridas.",
            "• Medir el área con el marcador ArUco con un error relativo inferior al 10 % en simuladores de heridas de áreas conocidas fotografiadas desde distintos ángulos.",
            "• Implementar la alerta de estancamiento con una regla documentada y verificarla con series simuladas de seguimiento, con latencia de análisis inferior a 2 segundos por visita."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Heridas crónicas y enfermería domiciliaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la segmentación, el cálculo del área y la base local."
            },
            {
                "componente": "Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura la imagen en luz visible de la herida con enfoque automático."
            },
            {
                "componente": "Sensor térmico MLX90640 de 32 × 24 píxeles",
                "categoria": "Sensor de Imagen",
                "funcion": "Mide la temperatura de la herida y de la piel circundante sin contacto."
            },
            {
                "componente": "Anillo de luz LED difusa con marcador ArUco impreso",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Estandariza la iluminación y aporta la escala métrica de la imagen."
            },
            {
                "componente": "Pantalla táctil de 5 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la segmentación y la gráfica de evolución durante la visita."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch y segmentation_models_pytorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la U-Net de segmentación del lecho de la herida."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia del modelo exportado en la Raspberry Pi."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Detección del marcador ArUco, escala y registro térmico."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos Local",
                "descripcion": "Almacenamiento de las visitas, áreas y temperaturas por paciente."
            }
        ]
    },
    {
        "id": "proj_251",
        "titulo": "🦷 Proyecto 251: Detección de Caries Interproximales en Radiografías de Aleta de Mordida con Detector YOLO Cuantizado en Orange Pi 5 para Consultorios de Baja Complejidad",
        "descripcion": "Problema: En los consultorios odontológicos públicos y rurales del Cauca las radiografías de aleta de mordida se interpretan a simple vista, con alta variabilidad entre odontólogos y sin segunda lectura, de modo que las caries interproximales incipientes pasan inadvertidas hasta que el daño es mayor y el tratamiento es más costoso y doloroso para el paciente.\n\nDescripción: Estación de apoyo con una Orange Pi 5 que recibe radiografías de aleta de mordida digitales o fotografiadas desde el negatoscopio, y ejecuta localmente un detector YOLO cuantizado con el NPU del procesador RK3588 para marcar las lesiones sospechosas con su nivel de confianza. El modelo se preentrena con conjuntos públicos de radiografías dentales anonimizadas, como DENTEX, y se ajusta con radiografías de aleta de mordida anonimizadas de una clínica aliada con aval institucional. El odontólogo ve las cajas propuestas y decide. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con imágenes anonimizadas y la lectura de odontólogos bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Odontología - Diagnóstico por imagen dental",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Anotación de lesiones en radiografías dentales",
            "Entrenamiento de detectores de objetos con YOLO",
            "Cuantización y conversión de modelos con RKNN-Toolkit2",
            "Evaluación con mAP y concordancia entre lectores",
            "Anonimización de imágenes médicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación local que detecte caries interproximales en radiografías de aleta de mordida y las señale al odontólogo, como segunda lectura en consultorios de baja complejidad.",
            "📌 Objetivos Específicos:",
            "• Entrenar un detector YOLO con imágenes públicas y de la clínica aliada y alcanzar una sensibilidad superior al 70 % por lesión con menos de 1 falso positivo por imagen en el conjunto de prueba.",
            "• Convertir el modelo a RKNN con cuantización a 8 bits y medir en la Orange Pi 5 una latencia inferior a 150 ms por imagen con una pérdida de mAP menor a 0,03.",
            "• Comparar las detecciones con la lectura de dos odontólogos sobre 50 imágenes y reportar la concordancia con el índice kappa de Cohen."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Odontología - Diagnóstico por imagen dental"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Orange Pi 5 de 8 GB con procesador RK3588",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la inferencia del detector en su NPU y sirve la interfaz."
            },
            {
                "componente": "Cámara USB de 12 MP con trípode",
                "categoria": "Sensor de Imagen",
                "funcion": "Fotografía radiografías desde el negatoscopio cuando no hay archivo digital."
            },
            {
                "componente": "Negatoscopio LED de bajo costo",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Ilumina la radiografía de manera uniforme para la fotografía."
            },
            {
                "componente": "Monitor HDMI de 15 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la radiografía con las lesiones sospechosas marcadas."
            },
            {
                "componente": "Computador con GPU del laboratorio",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena y ajusta el detector antes de convertirlo a RKNN."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ultralytics YOLO",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y evaluación del detector de caries."
            },
            {
                "herramienta": "RKNN-Toolkit2",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Conversión, cuantización y ejecución del modelo en el NPU de la Orange Pi."
            },
            {
                "herramienta": "CVAT",
                "tipo": "Anotación de Datos",
                "descripcion": "Anotación de cajas de lesión sobre las radiografías."
            },
            {
                "herramienta": "pydicom",
                "tipo": "Librería de Imágenes Médicas",
                "descripcion": "Lectura de metadatos DICOM y eliminación de datos personales."
            }
        ]
    },
    {
        "id": "proj_252",
        "titulo": "🩸 Proyecto 252: Tamizaje de Anemia con Fotografías de la Conjuntiva Palpebral Tomadas con Teléfono Inteligente y Modelo de Regresión con TensorFlow Lite sin Conexión",
        "descripcion": "Problema: La anemia por deficiencia de hierro afecta a mujeres en edad fértil y gestantes de comunidades rurales e indígenas del Cauca, pero confirmarla exige una muestra de sangre y un hemoglobinómetro o laboratorio que quedan lejos. La palidez de la conjuntiva se mira a simple vista con baja concordancia entre examinadores, y los promotores de salud no cuentan con una herramienta objetiva.\n\nDescripción: Aplicación Android que guía al promotor para fotografiar la conjuntiva palpebral inferior dentro de una cápsula impresa en 3D con luz LED difusa y una carta de color de referencia, segmenta la región con una red ligera y estima la hemoglobina mediante un modelo de regresión con TensorFlow Lite que corre sin conexión en el teléfono. El resultado se clasifica con el umbral de la OMS de 12 g/dL para mujeres adultas no embarazadas y las lecturas se sincronizan cuando hay internet. El modelo se entrena con fotografías de voluntarias y valores de un hemoglobinómetro portátil de referencia. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarias adultas bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Salud pública - Anemia y nutrición materno-infantil",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estandarización de la captura de imágenes con carta de color",
            "Segmentación de regiones de interés en fotografías",
            "Regresión con redes neuronales y validación cruzada",
            "Integración de modelos TensorFlow Lite en Android",
            "Evaluación del acuerdo con métodos de referencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una aplicación móvil que estime la hemoglobina a partir de fotografías de la conjuntiva palpebral y marque la posible anemia, como apoyo al tamizaje de promotores de salud en comunidades rurales.",
            "📌 Objetivos Específicos:",
            "• Construir una cápsula de captura con iluminación y carta de color y reunir fotografías de al menos 80 voluntarias adultas con su valor de hemoglobinómetro de referencia.",
            "• Entrenar el modelo de regresión y alcanzar un error absoluto medio inferior a 1,2 g/dL, con una sensibilidad superior al 80 % para detectar hemoglobina menor a 12 g/dL en validación por voluntaria.",
            "• Integrar el modelo en la aplicación Android con una inferencia sin conexión inferior a 1 segundo y medir el acuerdo con el método de referencia mediante un diagrama de Bland-Altman."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Anemia y nutrición materno-infantil"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Captura las fotografías y ejecuta el modelo sin conexión."
            },
            {
                "componente": "Cápsula de captura impresa en 3D con anillo LED",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Aísla la luz ambiente y entrega iluminación difusa constante."
            },
            {
                "componente": "Carta de color de referencia impresa",
                "categoria": "Instrumento de Referencia",
                "funcion": "Corrige las diferencias de color entre teléfonos y condiciones de luz."
            },
            {
                "componente": "Hemoglobinómetro portátil de referencia",
                "categoria": "Instrumento de Referencia",
                "funcion": "Entrega el valor de hemoglobina que se usa para etiquetar y validar."
            },
            {
                "componente": "Microcontrolador con control PWM del anillo LED",
                "categoria": "Microcontrolador",
                "funcion": "Regula la intensidad de la luz de la cápsula de captura."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la segmentación y de la regresión de hemoglobina."
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo cuantizado dentro de la aplicación Android."
            },
            {
                "herramienta": "Android Studio",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Desarrollo de la aplicación de captura guiada y de resultados."
            },
            {
                "herramienta": "Python con pandas",
                "tipo": "Análisis de Datos",
                "descripcion": "Preparación del conjunto de datos y análisis de acuerdo con Bland-Altman."
            }
        ]
    },
    {
        "id": "proj_253",
        "titulo": "🩻 Proyecto 253: Cribado de Nódulos Pulmonares en TAC de Tórax con Red 3D Comprimida mediante Poda, Destilación y Cuantización para Inferencia en Jetson Orin Nano",
        "descripcion": "Problema: Los tomógrafos del suroccidente colombiano se concentran en Popayán y Cali, y los nódulos pulmonares pequeños de una TAC de tórax solicitada por otro motivo pueden pasar inadvertidos a radiólogos con alta carga de lectura. Los modelos 3D que los detectan son grandes y requieren servidores con GPU costosos, lo que dificulta usarlos en el borde de un hospital regional.\n\nDescripción: Se entrena en el laboratorio con la base pública LUNA16, derivada de LIDC-IDRI, un detector de candidatos y un clasificador 3D de nódulos con MONAI, y luego se reduce el modelo en tres etapas: poda estructurada, destilación de conocimiento hacia una red estudiante más pequeña y cuantización a INT8 con TensorRT. El modelo comprimido se ejecuta en un Jetson Orin Nano que lee estudios DICOM, marca las posiciones sospechosas y las muestra en un visor local. Se mide con rigor el costo en sensibilidad de cada etapa de compresión. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos anonimizados.",
        "area": "Medicina con AIoT",
        "sector": "Oncología - Cribado de cáncer de pulmón con tomografía",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de volúmenes DICOM y remuestreo isotrópico",
            "Entrenamiento de redes convolucionales 3D con MONAI",
            "Poda estructurada y destilación de conocimiento",
            "Cuantización INT8 y calibración con TensorRT",
            "Evaluación con curvas FROC en detección de nódulos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Comprimir un modelo 3D de detección de nódulos pulmonares en TAC de tórax y desplegarlo en un computador de borde, cuantificando el compromiso entre tamaño, velocidad y sensibilidad.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo 3D base con LUNA16 y alcanzar una sensibilidad superior al 80 % con 4 falsos positivos por estudio en validación cruzada de 10 particiones.",
            "• Reducir el tamaño del modelo al menos 4 veces con poda, destilación y cuantización INT8, con una pérdida de sensibilidad inferior a 3 puntos porcentuales respecto al modelo base.",
            "• Desplegar el modelo comprimido en el Jetson Orin Nano y procesar un estudio completo en menos de 60 segundos, mostrando los hallazgos en un visor 3D Slicer."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Oncología - Cribado de cáncer de pulmón con tomografía"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Jetson Orin Nano Developer Kit de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la inferencia del modelo 3D comprimido sobre los estudios."
            },
            {
                "componente": "Computador del laboratorio con GPU NVIDIA y 32 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena el modelo base y realiza la poda y la destilación."
            },
            {
                "componente": "Disco SSD NVMe de 1 TB",
                "categoria": "Almacenamiento",
                "funcion": "Guarda los volúmenes de LUNA16 y los modelos intermedios."
            },
            {
                "componente": "Monitor de 24 pulgadas con visor DICOM",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Presenta el estudio con las posiciones sospechosas marcadas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MONAI y PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del detector y del clasificador 3D de nódulos."
            },
            {
                "herramienta": "TensorRT",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Cuantización INT8 y ejecución del modelo comprimido en el Jetson."
            },
            {
                "herramienta": "SimpleITK",
                "tipo": "Librería de Imágenes Médicas",
                "descripcion": "Lectura DICOM, remuestreo isotrópico y normalización de los volúmenes."
            },
            {
                "herramienta": "3D Slicer",
                "tipo": "Visualización de Imágenes Médicas",
                "descripcion": "Revisión de los estudios con las posiciones sospechosas."
            }
        ]
    },
    {
        "id": "proj_254",
        "titulo": "🌊 Proyecto 254: Guía de Adquisición Ecográfica en el Punto de Atención con Clasificación de Vistas Cardíacas en Video sobre un Mini PC con OpenVINO",
        "descripcion": "Problema: Los puestos de salud que reciben un ecógrafo portátil suelen tener operadores con poca práctica, y la calidad de la imagen depende de encontrar la ventana acústica y la vista correctas. Sin retroalimentación en el momento, se repiten exámenes, se obtienen imágenes inservibles para la lectura remota y el equipo se subutiliza en lugares donde no hay especialista cercano.\n\nDescripción: Sistema que toma la señal de video HDMI de un ecógrafo portátil mediante una tarjeta de captura USB y la analiza en un mini PC con procesador Intel, donde un modelo convolucional optimizado con OpenVINO clasifica en tiempo real cada fotograma como vista apical de cuatro cámaras, apical de dos cámaras o vista no adecuada. Muestra una indicación visual y sonora para que el operador reubique el transductor. El modelo se entrena con la base pública CAMUS y con fotogramas no cardíacos registrados en un fantoma. Se trata de un prototipo de apoyo a la capacitación, no dispositivo médico certificado, validado con registros anonimizados y operadores voluntarios bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Ecografía en el punto de atención",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Captura y procesamiento de video en tiempo real",
            "Entrenamiento de clasificadores de vistas ecográficas",
            "Optimización de modelos con OpenVINO",
            "Diseño de retroalimentación visual para el operador",
            "Manejo de la variabilidad de imágenes de ultrasonido"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de guía que reconozca en video la vista cardíaca que obtiene el operador de un ecógrafo portátil y lo oriente hacia una adquisición adecuada, como apoyo a la capacitación en el punto de atención.",
            "📌 Objetivos Específicos:",
            "• Entrenar un clasificador de tres clases con CAMUS y fotogramas de fantoma y alcanzar una exactitud superior al 90 % entre pacientes y un valor F1 mayor a 0,85 en la clase de vista no adecuada.",
            "• Optimizar el modelo con OpenVINO y obtener en el mini PC un procesamiento de al menos 20 fotogramas por segundo con un retardo de la indicación al operador inferior a 300 ms.",
            "• Probar el sistema con 5 operadores voluntarios sobre un fantoma y comparar el tiempo hasta lograr una vista adecuada con y sin la guía."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Ecografía en el punto de atención"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con procesador Intel N100 y 16 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta la clasificación de vistas y la interfaz de guía."
            },
            {
                "componente": "Tarjeta de captura HDMI a USB 3.0",
                "categoria": "Interfaz de Adquisición de Video",
                "funcion": "Toma la imagen del ecógrafo sin modificar el equipo."
            },
            {
                "componente": "Ecógrafo portátil de un centro aliado con salida HDMI",
                "categoria": "Equipo Biomédico",
                "funcion": "Fuente de las imágenes para pruebas con fantoma y voluntarios."
            },
            {
                "componente": "Fantoma de entrenamiento para ecografía",
                "categoria": "Material",
                "funcion": "Permite registrar vistas y practicar sin exponer a pacientes."
            },
            {
                "componente": "Parlante USB pequeño",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Emite la indicación sonora de vista adecuada o por corregir."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador de vistas con CAMUS y fantoma."
            },
            {
                "herramienta": "OpenVINO",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Optimización y ejecución del modelo en el procesador Intel."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Captura del video, recorte del área de imagen y preprocesamiento."
            },
            {
                "herramienta": "Gradio",
                "tipo": "Interfaz de Usuario",
                "descripcion": "Interfaz web local con la vista detectada y las indicaciones al operador."
            }
        ]
    },
    {
        "id": "proj_255",
        "titulo": "🔬 Proyecto 255: Tamizaje de Citología Cervicouterina con Microscopio Abierto de Bajo Costo y Clasificación de Células en Raspberry Pi 5",
        "descripcion": "Problema: En las zonas rurales del Cauca la citología cervicouterina se lee en laboratorios centralizados y sus resultados pueden tardar semanas en llegar a la usuaria, con riesgo de que no regrese a la consulta. Hay pocos citotecnólogos y la lectura manual de cientos de células por lámina es cansada y variable, lo que limita el tamizaje del cáncer de cuello uterino.\n\nDescripción: Estación que digitaliza láminas de citología con un microscopio abierto OpenFlexure impreso en 3D, con cámara y platina motorizada controladas por una Raspberry Pi 5. El software recorta células por segmentación con OpenCV y las clasifica con una red EfficientNet-Lite entrenada con SIPaKMeD, y luego prioriza los campos con células anormales para revisión del citotecnólogo. Se evalúa la caída de desempeño al pasar de las imágenes públicas a las del microscopio propio. Se trata de un prototipo de apoyo a la lectura, no dispositivo médico certificado, validado con la base pública anonimizada y láminas de un laboratorio aliado con aval y consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Oncología - Citología cervicouterina y tamizaje",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Montaje y calibración de microscopios de bajo costo",
            "Segmentación de células con técnicas clásicas de visión",
            "Clasificación de células con EfficientNet-Lite",
            "Barrido automático de láminas con platina motorizada",
            "Evaluación con F1 macro y matrices de confusión"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un sistema de bajo costo que digitalice láminas de citología cervicouterina y clasifique sus células para priorizar los campos que el citotecnólogo debe revisar primero.",
            "📌 Objetivos Específicos:",
            "• Entrenar un clasificador de cinco clases celulares con SIPaKMeD y alcanzar un valor F1 macro superior a 0,85 en el conjunto de prueba.",
            "• Montar el microscopio con barrido automático y capturar una lámina completa en menos de 15 minutos con enfoque controlado en al menos el 90 % de los campos.",
            "• Medir la pérdida de F1 macro al evaluar imágenes del microscopio propio con láminas del laboratorio aliado y ajustar el modelo para reducirla a menos de 0,10."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Oncología - Citología cervicouterina y tamizaje"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Controla la platina, captura los campos y ejecuta la clasificación."
            },
            {
                "componente": "Microscopio abierto OpenFlexure con motores paso a paso",
                "categoria": "Instrumento Óptico",
                "funcion": "Desplaza la lámina y enfoca de manera automática el barrido."
            },
            {
                "componente": "Cámara Raspberry Pi HQ con objetivo de 40 aumentos",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura imágenes de las células con resolución suficiente."
            },
            {
                "componente": "Iluminador LED con difusor",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Entrega iluminación uniforme para las imágenes de campo claro."
            },
            {
                "componente": "Monitor HDMI de 15 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra los campos priorizados y las células marcadas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador celular con SIPaKMeD."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del clasificador exportado en la Raspberry Pi."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Segmentación celular, enfoque y unión de campos del barrido."
            },
            {
                "herramienta": "OpenFlexure Software",
                "tipo": "Control de Microscopio",
                "descripcion": "Control del microscopio y de la captura automática de campos."
            }
        ]
    },
    {
        "id": "proj_256",
        "titulo": "💓 Proyecto 256: Tamizaje de Hipertensión Arterial con Fotopletismografía de Dedo y Clasificación TinyML en Raspberry Pi Pico 2 W para Jornadas Comunitarias",
        "descripcion": "Problema: La hipertensión arterial suele ser silenciosa y muchas personas de zonas rurales del Cauca la desconocen porque no acuden a controles ni tienen un tensiómetro en casa. En las jornadas comunitarias, los promotores de salud disponen de pocos equipos y filas largas, por lo que se necesita una forma rápida y económica de identificar a quienes deben ser remitidos a una medición formal.\n\nDescripción: Dispositivo de dedo con un sensor óptico MAX30102 y una Raspberry Pi Pico 2 W que registra 30 segundos de fotopletismografía, extrae características de la forma de la onda de pulso (tiempo de subida, índice de reflexión y variabilidad) y ejecuta un modelo TinyML que clasifica a la persona como normotensa, con prehipertensión o con posible hipertensión. El modelo se entrena con la base pública PPG-BP y se evalúa frente a un tensiómetro de brazo validado, y el resultado se envía por Bluetooth Low Energy a una aplicación. Se trata de un prototipo de apoyo al tamizaje, no dispositivo médico certificado ni medidor de presión, validado con datos públicos anonimizados y voluntarios bajo consentimiento informado.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Hipertensión y riesgo cardiovascular",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de señales de fotopletismografía",
            "Extracción de características de la onda de pulso",
            "Entrenamiento de clasificadores con Edge Impulse",
            "Despliegue de TinyML en microcontroladores RP2350",
            "Validación frente a tensiómetros de referencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dispositivo de dedo que clasifique con TinyML el nivel de presión arterial a partir de la onda de pulso, como apoyo al tamizaje comunitario de la hipertensión.",
            "📌 Objetivos Específicos:",
            "• Entrenar un clasificador de tres clases con PPG-BP y alcanzar un AUC superior a 0,75 para la clase de posible hipertensión, con validación por sujeto.",
            "• Desplegar el modelo en la Raspberry Pi Pico 2 W con un tiempo de inferencia inferior a 100 ms y una memoria de modelo menor a 150 KB.",
            "• Comparar la clasificación del dispositivo con las mediciones de un tensiómetro de brazo validado en al menos 30 voluntarios y reportar sensibilidad y especificidad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Hipertensión y riesgo cardiovascular"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi Pico 2 W",
                "categoria": "Microcontrolador",
                "funcion": "Adquiere la señal, extrae características y ejecuta el modelo TinyML."
            },
            {
                "componente": "Sensor óptico MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra la fotopletismografía del dedo con luz roja e infrarroja."
            },
            {
                "componente": "Pantalla OLED SSD1306",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el avance de la medición y la clasificación obtenida."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el dispositivo y lo aísla de la red eléctrica."
            },
            {
                "componente": "Tensiómetro de brazo validado",
                "categoria": "Instrumento de Referencia",
                "funcion": "Entrega la presión de referencia para evaluar al dispositivo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y cuantización del clasificador de la onda de pulso."
            },
            {
                "herramienta": "Pico SDK y TensorFlow Lite Micro",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición y ejecución del modelo en el RP2350."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado de la señal y detección de picos y puntos característicos."
            },
            {
                "herramienta": "MIT App Inventor",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación sencilla que recibe y registra el resultado por Bluetooth."
            }
        ]
    }
];
