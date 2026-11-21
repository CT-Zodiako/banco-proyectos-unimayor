// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_227",
        "titulo": "🦯 Proyecto 227: Bastón Inteligente con Detección de Obstáculos Aéreos y Retroalimentación Háptica para Personas Ciegas",
        "descripcion": "Problema: El bastón blanco tradicional detecta obstáculos a nivel del suelo, pero no advierte ramas, avisos, toldos o espejos de vehículos que están a la altura del pecho o de la cabeza. En las calles de Popayán, con andenes estrechos y ventas ambulantes, las personas ciegas o con baja visión sufren golpes frecuentes que reducen su autonomía y su confianza para desplazarse solas.\n\nDescripción: Módulo acoplable a un bastón blanco convencional que combina un sensor de distancia ToF y un sensor ultrasónico orientado hacia arriba con una cámara pequeña y un ESP32-S3. Un modelo ligero de detección de objetos ejecutado en el borde clasifica el tipo de obstáculo (poste, persona, vehículo, escalón) y el sistema traduce la distancia en patrones de vibración diferenciados y en mensajes de voz cortos por un audífono de conducción ósea. Una aplicación móvil accesible con lector de pantalla permite ajustar la sensibilidad y registrar zonas problemáticas que pueden compartirse con la comunidad. El diseño se realiza en co-creación con usuarios de una asociación local de personas con discapacidad visual y se presenta como prototipo de apoyo, no como dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad visual - Movilidad urbana",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración de sensores de distancia ToF y ultrasónicos",
            "Detección de objetos con modelos ligeros en el borde",
            "Diseño de patrones hápticos y mensajes de voz accesibles",
            "Desarrollo móvil compatible con lectores de pantalla",
            "Diseño centrado en el usuario y co-creación con personas ciegas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un módulo acoplable al bastón blanco que detecte obstáculos a nivel del suelo y aéreos, identifique su tipo y los comunique mediante vibración y voz a personas ciegas o con baja visión.",
            "📌 Objetivos Específicos:",
            "• Detectar obstáculos entre 0,3 m y 2 m de distancia, incluidos los ubicados a la altura de la cabeza, con una tasa de detección superior al 90 % en un recorrido de prueba controlado.",
            "• Entrenar y cuantizar un modelo de detección de objetos para al menos cuatro clases de obstáculos urbanos con un tiempo de respuesta inferior a 300 ms en el ESP32-S3.",
            "• Diseñar con al menos cinco usuarios ciegos un vocabulario de patrones de vibración y mensajes de voz, y evaluar su comprensión y comodidad con una encuesta de usabilidad SUS.",
            "• Implementar una aplicación móvil accesible con TalkBack para configurar el dispositivo y registrar zonas con obstáculos frecuentes, aplicando consentimiento informado y protección de datos según la Ley 1581 de 2012."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad visual - Movilidad urbana"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con cámara OV2640",
                "categoria": "Microcontrolador",
                "funcion": "Captura imágenes, ejecuta el modelo de detección y coordina sensores y actuadores."
            },
            {
                "componente": "Sensor de distancia ToF VL53L1X",
                "categoria": "Sensor de Distancia",
                "funcion": "Mide la distancia a obstáculos frontales con precisión centimétrica."
            },
            {
                "componente": "Sensor ultrasónico HC-SR04 orientado hacia arriba",
                "categoria": "Sensor de Distancia",
                "funcion": "Detecta obstáculos aéreos a la altura del pecho y de la cabeza."
            },
            {
                "componente": "Motor vibrador tipo moneda con driver DRV2605L",
                "categoria": "Actuador Háptico",
                "funcion": "Genera patrones de vibración diferenciados según la distancia y el tipo de obstáculo."
            },
            {
                "componente": "Audífono de conducción ósea Bluetooth",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Entrega mensajes de voz sin bloquear los sonidos del entorno."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el módulo durante una jornada de uso."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Entrenamiento y cuantización del modelo de detección de obstáculos."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición, inferencia y control háptico."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de configuración compatible con TalkBack y VoiceOver."
            },
            {
                "herramienta": "Firebase",
                "tipo": "Base de Datos en la Nube",
                "descripcion": "Registro anónimo de zonas con obstáculos frecuentes."
            }
        ]
    },
    {
        "id": "proj_228",
        "titulo": "🤟 Proyecto 228: Reconocimiento en Tiempo Real de la Lengua de Señas Colombiana con Visión por Computador en el Borde",
        "descripcion": "Problema: Las personas sordas que se comunican en Lengua de Señas Colombiana (LSC) encuentran barreras para hacer trámites en ventanillas de atención, bibliotecas o consultorios, porque casi ningún funcionario conoce la lengua y los intérpretes son escasos, especialmente fuera de las grandes ciudades.\n\nDescripción: Terminal de atención compuesto por una Raspberry Pi 5 con cámara y pantalla que extrae los puntos clave de manos, rostro y postura con MediaPipe y los clasifica con un modelo secuencial (LSTM o Transformer ligero) para reconocer un vocabulario inicial de señas aisladas propias de trámites (saludo, nombre, cita, pago, ayuda, números). La traducción se muestra en texto de alto contraste y se reproduce en voz para el funcionario, quien puede responder con frases predefinidas que se presentan en texto y en video de señas pregrabado. El conjunto de datos se graba con personas sordas de la comunidad, con consentimiento informado, y el sistema se valida con ellas como herramienta de apoyo que no reemplaza al intérprete.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad auditiva - Comunicación accesible",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estimación de puntos clave de manos y cuerpo con MediaPipe",
            "Modelos secuenciales para clasificación de gestos",
            "Construcción ética de conjuntos de datos con la comunidad sorda",
            "Despliegue de modelos en Raspberry Pi",
            "Diseño de interfaces bilingües LSC y español con alto contraste"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un terminal de atención que reconozca en tiempo real un vocabulario básico de la Lengua de Señas Colombiana y lo traduzca a texto y voz para facilitar la comunicación entre personas sordas y funcionarios oyentes.",
            "📌 Objetivos Específicos:",
            "• Grabar, con consentimiento informado y en co-creación con personas sordas usuarias de LSC, un conjunto de datos de al menos 30 señas aisladas con varias personas señantes.",
            "• Entrenar un clasificador secuencial sobre puntos clave de MediaPipe que alcance una exactitud superior al 85 % en señantes no vistos durante el entrenamiento.",
            "• Ejecutar el reconocimiento en una Raspberry Pi 5 a más de 15 cuadros por segundo con una latencia de traducción menor a un segundo por seña.",
            "• Evaluar con usuarios sordos y funcionarios la utilidad del terminal en un trámite simulado y documentar las limitaciones del vocabulario reconocido."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad auditiva - Comunicación accesible"
        ],
        "referencias": [
            "Congreso de Colombia. Ley 324 de 1996, por la cual se crean algunas normas a favor de la población sorda.",
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la extracción de puntos clave y el clasificador de señas."
            },
            {
                "componente": "Cámara USB 1080p de gran angular",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura las manos, el rostro y el torso de la persona señante."
            },
            {
                "componente": "Pantalla táctil de 10 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la traducción en texto de alto contraste y los videos de respuesta en señas."
            },
            {
                "componente": "Altavoz USB",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproduce en voz la traducción para el funcionario oyente."
            },
            {
                "componente": "Computador con GPU del laboratorio",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena los modelos secuenciales antes de desplegarlos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MediaPipe Holistic",
                "tipo": "Librería de Visión por Computador",
                "descripcion": "Extracción de puntos clave de manos, rostro y postura."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador secuencial de señas."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución optimizada del modelo en la Raspberry Pi."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Conversión local del texto traducido a voz en español."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Etiquetado",
                "descripcion": "Segmentación y etiquetado de los videos de señas grabados."
            }
        ]
    },
    {
        "id": "proj_229",
        "titulo": "💬 Proyecto 229: Subtitulado Automático en Vivo de Clases Universitarias para Estudiantes Sordos e Hipoacúsicos",
        "descripcion": "Problema: Los estudiantes sordos o con hipoacusia que no usan lengua de señas, o que no cuentan con intérprete en todas sus asignaturas, pierden buena parte de las explicaciones orales en clase. Las grabaciones posteriores no resuelven la participación en tiempo real y los servicios comerciales de subtitulado requieren conexión estable y licencias costosas.\n\nDescripción: Sistema instalado en el aula con un micrófono de solapa inalámbrico para el docente y una Raspberry Pi o un portátil que ejecuta reconocimiento automático de voz local con un modelo Whisper optimizado. La transcripción se publica por MQTT y se muestra en tiempo real en el celular o la tableta del estudiante a través de una aplicación web con tamaño de letra ajustable, alto contraste y cumplimiento de pautas WCAG 2.1. Un diccionario de términos técnicos por asignatura mejora el reconocimiento del vocabulario especializado, y al final de la clase el estudiante recibe la transcripción completa con marcas de tiempo. El proyecto se valida con estudiantes de la institución que tengan discapacidad auditiva, con su consentimiento.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Educación inclusiva - Discapacidad auditiva",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Reconocimiento automático de voz con modelos Whisper",
            "Mensajería en tiempo real con MQTT y WebSockets",
            "Desarrollo web accesible según WCAG 2.1",
            "Optimización de modelos de voz para hardware limitado",
            "Evaluación de sistemas con estudiantes con discapacidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema local de subtitulado en vivo que permita a estudiantes sordos e hipoacúsicos seguir las explicaciones orales del docente en tiempo real desde su propio dispositivo.",
            "📌 Objetivos Específicos:",
            "• Configurar un modelo de reconocimiento de voz en español que funcione sin conexión a internet con un retardo inferior a tres segundos entre el habla y el subtítulo.",
            "• Medir la tasa de error por palabra en clases reales de ingeniería y reducirla mediante un vocabulario de términos técnicos por asignatura.",
            "• Desarrollar una aplicación web progresiva con tamaño de letra ajustable, modo de alto contraste y navegación por teclado, verificada con una herramienta de auditoría de accesibilidad.",
            "• Evaluar la comprensión y satisfacción de estudiantes con discapacidad auditiva durante al menos cuatro sesiones de clase, con consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inclusiva - Discapacidad auditiva"
        ],
        "referencias": [
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018."
        ],
        "hardware_tabla": [
            {
                "componente": "Micrófono de solapa inalámbrico",
                "categoria": "Sensor de Audio",
                "funcion": "Capta la voz del docente con poco ruido del aula."
            },
            {
                "componente": "Raspberry Pi 5 de 8 GB o portátil del laboratorio",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el reconocimiento de voz y el servidor de subtítulos."
            },
            {
                "componente": "Interfaz de audio USB",
                "categoria": "Módulo de Adquisición",
                "funcion": "Digitaliza la señal del micrófono con buena calidad."
            },
            {
                "componente": "Punto de acceso Wi-Fi",
                "categoria": "Módulo de Comunicación",
                "funcion": "Crea una red local del aula para distribuir los subtítulos a los dispositivos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "faster-whisper",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Transcripción local en español con un modelo Whisper optimizado."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Distribución de los fragmentos de subtítulo en tiempo real."
            },
            {
                "herramienta": "React",
                "tipo": "Framework Frontend",
                "descripcion": "Aplicación web progresiva accesible para visualizar los subtítulos."
            },
            {
                "herramienta": "axe DevTools",
                "tipo": "Herramienta de Auditoría de Accesibilidad",
                "descripcion": "Verificación de criterios WCAG en la interfaz del estudiante."
            }
        ]
    },
    {
        "id": "proj_230",
        "titulo": "🏠 Proyecto 230: Hogar Accesible Controlado por Voz en Español para Personas con Movilidad Reducida",
        "descripcion": "Problema: Las personas con lesión medular, distrofia muscular u otras condiciones que reducen su movilidad dependen de un cuidador para tareas simples como encender la luz, abrir la puerta o activar un ventilador. Los asistentes de voz comerciales exigen conexión permanente, envían el audio a servidores externos y no siempre reconocen bien el habla de personas con voz débil o con disartria leve.\n\nDescripción: Sistema domótico de bajo costo basado en Home Assistant y nodos ESP32 con relés y sensores, controlado por un asistente de voz que funciona completamente dentro de la vivienda. Una palabra de activación personalizada, un reconocedor de voz local y un intérprete de intenciones entrenado con frases del propio usuario permiten controlar luces, cerradura, ventilador, televisor y un botón de llamada al cuidador. El sistema ofrece también un pulsador grande y un tablero táctil de alto contraste como vías alternativas, y se adapta a la voz del usuario con unas pocas grabaciones. Se diseña junto con usuarios en silla de ruedas y sus familias, priorizando la privacidad del audio.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad física - Vivienda accesible",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Domótica con Home Assistant y ESPHome",
            "Reconocimiento de voz y detección de palabra de activación locales",
            "Clasificación de intenciones con procesamiento de lenguaje natural",
            "Instalación segura de relés y cargas eléctricas",
            "Diseño de interfaces alternativas accesibles"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema domótico controlado por voz que funcione sin conexión a internet y permita a personas con movilidad reducida operar de forma autónoma los elementos básicos de su vivienda.",
            "📌 Objetivos Específicos:",
            "• Integrar al menos cinco dispositivos del hogar (luces, cerradura, ventilador, televisor y llamada al cuidador) mediante nodos ESP32 administrados por Home Assistant.",
            "• Configurar un asistente de voz local en español con palabra de activación personalizada que alcance una tasa de acierto de comandos superior al 90 % con la voz del usuario.",
            "• Ofrecer vías de control alternativas mediante un pulsador adaptado y un tablero táctil de alto contraste con iconos grandes y lenguaje sencillo.",
            "• Validar el sistema durante una semana con al menos dos personas con movilidad reducida y medir la reducción de solicitudes de ayuda al cuidador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad física - Vivienda accesible"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja Home Assistant y el asistente de voz local."
            },
            {
                "componente": "Micrófono de arreglo ReSpeaker USB",
                "categoria": "Sensor de Audio",
                "funcion": "Capta los comandos de voz a distancia dentro de la habitación."
            },
            {
                "componente": "Nodos ESP32 con módulos de relé",
                "categoria": "Microcontrolador",
                "funcion": "Accionan luces, ventilador y otras cargas del hogar."
            },
            {
                "componente": "Cerradura electromagnética de 12 V",
                "categoria": "Actuador",
                "funcion": "Permite abrir la puerta principal por voz o desde el tablero."
            },
            {
                "componente": "Emisor infrarrojo",
                "categoria": "Módulo de Comunicación",
                "funcion": "Controla el televisor y otros equipos con control remoto."
            },
            {
                "componente": "Pulsador grande adaptado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Ofrece una vía de control alternativa cuando la voz no es suficiente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Home Assistant",
                "tipo": "Plataforma de Domótica",
                "descripcion": "Orquestación de dispositivos, automatizaciones y tablero táctil."
            },
            {
                "herramienta": "ESPHome",
                "tipo": "Firmware para Dispositivos IoT",
                "descripcion": "Configuración de los nodos ESP32 de relés y sensores."
            },
            {
                "herramienta": "openWakeWord",
                "tipo": "Detección de Palabra de Activación",
                "descripcion": "Entrenamiento de una palabra de activación personalizada."
            },
            {
                "herramienta": "Vosk",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Reconocimiento local de comandos en español sin conexión."
            },
            {
                "herramienta": "Rasa NLU",
                "tipo": "Procesamiento de Lenguaje Natural",
                "descripcion": "Clasificación de intenciones y extracción de entidades de los comandos."
            }
        ]
    },
    {
        "id": "proj_231",
        "titulo": "👵 Proyecto 231: Detección de Anomalías en la Rutina Diaria de Adultos Mayores que Viven Solos con Sensores Ambientales",
        "descripcion": "Problema: Muchos adultos mayores en el Cauca viven solos mientras sus hijos trabajan en otras ciudades. Una caída, una descompensación o un cambio brusco en el comportamiento (no levantarse, no comer, levantarse muchas veces en la noche) puede pasar inadvertido durante horas. Las cámaras dentro del hogar son rechazadas por invasivas y los botones de pánico fallan cuando la persona no puede presionarlos.\n\nDescripción: Red de sensores ambientales no intrusivos (movimiento PIR, apertura de puertas y nevera, consumo eléctrico, presión en la cama) conectados por Zigbee a una Raspberry Pi que aprende el patrón habitual de actividad de la persona durante las primeras semanas. Un modelo de detección de anomalías compara cada día con ese patrón y genera alertas graduadas al familiar o cuidador por Telegram cuando detecta inactividad prolongada, ausencia de comidas o alteraciones del sueño. El adulto mayor interactúa con un altavoz que le habla con frases sencillas para confirmar que está bien antes de escalar la alerta. El sistema no usa cámaras ni micrófonos permanentes y se instala con consentimiento informado de la persona.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Adulto mayor - Vida independiente",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Redes de sensores Zigbee y Zigbee2MQTT",
            "Detección de anomalías en series de tiempo de actividad",
            "Diseño de alertas graduadas y confirmación por voz",
            "Bases de datos de series de tiempo",
            "Privacidad y ética en el monitoreo de personas mayores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema no intrusivo que aprenda la rutina diaria de un adulto mayor que vive solo y avise a su familia o cuidador cuando detecte desviaciones que puedan indicar un problema.",
            "📌 Objetivos Específicos:",
            "• Instalar una red de al menos ocho sensores ambientales Zigbee sin cámaras y almacenar los eventos de actividad en una base de datos de series de tiempo.",
            "• Comparar al menos dos métodos de detección de anomalías (Isolation Forest y un modelo estadístico por franjas horarias) usando escenarios simulados de inactividad, omisión de comidas y alteración del sueño.",
            "• Implementar un flujo de alerta graduada que primero confirme por voz con la persona y luego notifique al cuidador, con una tasa de falsas alarmas inferior a una por semana.",
            "• Validar el sistema durante dos semanas en la vivienda de un adulto mayor voluntario, con consentimiento informado y tratamiento de datos conforme a la Ley 1581 de 2012."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Adulto mayor - Vida independiente"
        ],
        "referencias": [
            "Congreso de Colombia. Ley 1251 de 2008, por la cual se dictan normas tendientes a procurar la protección, promoción y defensa de los derechos de los adultos mayores.",
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 con adaptador Zigbee USB",
                "categoria": "Computador de Placa Única",
                "funcion": "Recibe los eventos de los sensores y ejecuta el modelo de anomalías."
            },
            {
                "componente": "Sensores de movimiento PIR Zigbee",
                "categoria": "Sensor de Presencia",
                "funcion": "Registran la actividad en cada habitación."
            },
            {
                "componente": "Sensores de apertura de puerta Zigbee",
                "categoria": "Sensor de Contacto",
                "funcion": "Detectan el uso de la puerta principal, el baño y la nevera."
            },
            {
                "componente": "Enchufe inteligente con medición de consumo",
                "categoria": "Sensor de Energía",
                "funcion": "Identifica el uso de la estufa eléctrica o el hervidor."
            },
            {
                "componente": "Sensor de presión bajo el colchón con ESP32",
                "categoria": "Sensor de Presión",
                "funcion": "Detecta la ocupación de la cama y los despertares nocturnos."
            },
            {
                "componente": "Altavoz con micrófono activable por botón",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Pregunta a la persona si está bien y recibe su confirmación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Zigbee2MQTT",
                "tipo": "Puente de Comunicación IoT",
                "descripcion": "Integración de los sensores Zigbee mediante MQTT."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos de Series de Tiempo",
                "descripcion": "Almacenamiento de los eventos de actividad."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelos de detección de anomalías sobre la rutina diaria."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Orquestación de Flujos",
                "descripcion": "Lógica de alerta graduada y envío de mensajes por Telegram."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de rutina diaria para el cuidador."
            }
        ]
    },
    {
        "id": "proj_232",
        "titulo": "🩸 Proyecto 232: Asistente Conectado para Personas con Diabetes Tipo 2 con Registro de Glucosa por Voz y Estimación de Carbohidratos por Foto",
        "descripcion": "Problema: Las personas con diabetes tipo 2, muchas de ellas adultos mayores o con baja visión por retinopatía, tienen dificultad para llevar el registro diario de glucometrías, calcular los carbohidratos de sus comidas y recordar sus medicamentos. Los cuadernos de papel se pierden y las aplicaciones existentes tienen letra pequeña, menús complejos y alimentos que no corresponden a la dieta colombiana.\n\nDescripción: Aplicación móvil accesible conectada a un pequeño hub con ESP32 y pantalla de alto contraste en la cocina. La persona dicta el valor del glucómetro por voz, toma una foto de su plato y un modelo de visión por computador entrenado con platos típicos colombianos (arepa, fríjoles, arroz, papa, plátano) estima la porción y los carbohidratos aproximados. El sistema envía recordatorios de medicamentos con voz y vibración, muestra tendencias semanales con lenguaje sencillo y genera un reporte en PDF para llevar a la consulta. Todas las recomendaciones son orientativas, se aclara que es un prototipo de apoyo y no un dispositivo médico certificado, y no sustituye las indicaciones del equipo de salud.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Diabetes",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Clasificación de imágenes de alimentos con aprendizaje por transferencia",
            "Reconocimiento de voz para entrada de datos numéricos",
            "Desarrollo móvil accesible para adultos mayores y baja visión",
            "Comunicación entre aplicación móvil y dispositivos ESP32",
            "Manejo responsable de datos de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un asistente conectado que facilite a personas con diabetes tipo 2 el registro de glucosa, la estimación de carbohidratos de sus comidas y la adherencia a sus medicamentos mediante una interfaz accesible.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de imágenes de al menos 15 preparaciones típicas colombianas y entrenar un clasificador por transferencia con exactitud superior al 80 %, asociado a una tabla de carbohidratos por porción.",
            "• Implementar el registro de glucometrías y comidas por voz con confirmación hablada, evitando la necesidad de escribir en el teléfono.",
            "• Diseñar la aplicación y el hub de cocina con texto grande, alto contraste y lenguaje sencillo, y evaluarlos con personas con diabetes mediante la escala SUS.",
            "• Generar reportes semanales de glucosa y adherencia que la persona pueda compartir con su equipo de salud, almacenando los datos con cifrado y consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Diabetes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con pantalla TFT de 3,5 pulgadas",
                "categoria": "Microcontrolador",
                "funcion": "Hub de cocina que muestra recordatorios y valores en alto contraste."
            },
            {
                "componente": "Zumbador y motor vibrador",
                "categoria": "Actuador Háptico",
                "funcion": "Refuerzan los recordatorios de medicamentos."
            },
            {
                "componente": "Glucómetro convencional del paciente",
                "categoria": "Sensor Biomédico",
                "funcion": "Proporciona el valor de glucosa que la persona registra por voz."
            },
            {
                "componente": "Teléfono inteligente del usuario",
                "categoria": "Equipo de Cómputo",
                "funcion": "Toma las fotos de los platos y ejecuta la aplicación accesible."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Motor de Inferencia Móvil",
                "descripcion": "Clasificación de alimentos directamente en el teléfono."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación con texto escalable, alto contraste y soporte de lector de pantalla."
            },
            {
                "herramienta": "Speech-to-Text de Android",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Registro por voz de glucometrías y comidas."
            },
            {
                "herramienta": "Supabase",
                "tipo": "Base de Datos en la Nube",
                "descripcion": "Almacenamiento cifrado de registros y generación de reportes."
            }
        ]
    },
    {
        "id": "proj_233",
        "titulo": "🫁 Proyecto 233: Monitoreo Domiciliario de Pacientes con EPOC y Asma con Calidad del Aire y Predicción de Exacerbaciones",
        "descripcion": "Problema: Los pacientes con enfermedad pulmonar obstructiva crónica (EPOC) y asma empeoran cuando se exponen a humo de leña, polvo o cambios de humedad, condiciones frecuentes en las viviendas rurales del Cauca donde todavía se cocina con fogón. Las exacerbaciones suelen detectarse tarde, cuando el paciente ya necesita urgencias.\n\nDescripción: Estación domiciliaria con ESP32 que mide material particulado PM2.5, CO2, temperatura y humedad, junto con un oxímetro de pulso de muñeca y un cuestionario diario de síntomas por voz con preguntas cortas. Un modelo de aprendizaje automático combina la exposición ambiental, la saturación de oxígeno y los síntomas reportados para estimar el riesgo de empeoramiento en los próximos días y avisar al paciente y a su cuidador con recomendaciones sencillas (ventilar, alejarse del fogón, contactar al centro de salud). La interfaz usa colores de semáforo con iconos y mensajes hablados para personas con baja escolaridad. El sistema es un prototipo de apoyo, no un dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Salud respiratoria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación de calidad del aire con sensores de bajo costo",
            "Adquisición de saturación de oxígeno y frecuencia cardíaca",
            "Modelos de riesgo con series de tiempo multivariadas",
            "Diseño de interfaces para baja escolaridad con voz e iconos",
            "Ética en el monitoreo de pacientes crónicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una estación domiciliaria que integre calidad del aire, saturación de oxígeno y síntomas reportados para alertar tempranamente a pacientes con EPOC o asma sobre el riesgo de empeoramiento.",
            "📌 Objetivos Específicos:",
            "• Calibrar los sensores de PM2.5 y CO2 frente a un equipo de referencia del laboratorio y documentar su error en condiciones de humo de leña.",
            "• Implementar un cuestionario diario de síntomas por voz de menos de un minuto que pueda responder una persona con baja escolaridad.",
            "• Entrenar y comparar modelos de riesgo (regresión logística y gradient boosting) con datos recolectados y escenarios simulados, reportando sensibilidad y tasa de falsas alarmas.",
            "• Validar la usabilidad de la estación y sus alertas en semáforo con al menos tres pacientes y sus cuidadores, con consentimiento informado y acompañamiento de un profesional de salud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Salud respiratoria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-WROOM-32",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores ambientales y envía los datos por MQTT."
            },
            {
                "componente": "Sensor de material particulado PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide PM2.5 y PM10 asociados al humo de leña y al polvo."
            },
            {
                "componente": "Sensor de CO2, temperatura y humedad SCD40",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide la ventilación y las condiciones del ambiente interior."
            },
            {
                "componente": "Oxímetro de pulso con módulo MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Estima la saturación de oxígeno y la frecuencia cardíaca del paciente."
            },
            {
                "componente": "Anillo LED RGB y altavoz",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestran el nivel de riesgo en semáforo y reproducen mensajes hablados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición de sensores y comunicación MQTT."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Recepción de las mediciones de la estación."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Entrenamiento de los modelos de riesgo de exacerbación."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Backend",
                "descripcion": "Servicio de predicción y gestión de alertas al cuidador."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento de exposición ambiental y saturación para el equipo de salud."
            }
        ]
    },
    {
        "id": "proj_234",
        "titulo": "💊 Proyecto 234: Dispensador Inteligente de Medicamentos con Predicción de Riesgo de Omisión de Dosis",
        "descripcion": "Problema: Las personas con enfermedades crónicas como hipertensión, insuficiencia cardíaca o VIH toman varios medicamentos al día y la falta de adherencia es una causa frecuente de hospitalizaciones. Los pastilleros semanales no avisan cuando se olvida una dosis y no permiten que la familia o el programa de salud identifiquen a tiempo a quien está dejando el tratamiento.\n\nDescripción: Dispensador con carrusel de compartimentos accionado por un motor paso a paso, controlado por un ESP32 que libera la dosis a la hora programada y confirma la toma mediante un sensor de presencia en la bandeja. Los eventos de toma se envían a un servidor donde un modelo de aprendizaje automático, entrenado con el historial de horarios, días de la semana y retrasos previos, estima la probabilidad de que la persona omita las siguientes dosis y adelanta recordatorios o avisa al cuidador. La interfaz combina voz, luces y botones grandes con braille para personas con baja visión o adultos mayores. Se aclara que es un prototipo de apoyo, no un dispositivo médico certificado, y que la carga de medicamentos la supervisa un familiar o profesional.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Adherencia terapéutica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño mecánico y control de motores paso a paso",
            "Firmware IoT con sincronización horaria y reintentos",
            "Modelos de clasificación para predicción de comportamiento",
            "Diseño de interfaces multimodales con voz, luz y braille",
            "Fabricación digital con impresión 3D"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un dispensador conectado de medicamentos que libere las dosis a tiempo, confirme su toma y prediga el riesgo de omisión para reforzar la adherencia de personas con enfermedades crónicas.",
            "📌 Objetivos Específicos:",
            "• Diseñar e imprimir en 3D un carrusel de al menos 14 compartimentos accionado por motor paso a paso con detección de la toma en la bandeja.",
            "• Implementar el envío de eventos de toma por MQTT con almacenamiento local cuando no haya conexión y sincronización posterior.",
            "• Entrenar un modelo de predicción de omisión con datos de uso simulados y reales, y comparar su desempeño con una regla fija de recordatorio.",
            "• Evaluar con adultos mayores y personas con baja visión la comprensión de los avisos por voz, luz y botones en braille, con consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Adherencia terapéutica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-WROOM-32 con reloj de tiempo real DS3231",
                "categoria": "Microcontrolador",
                "funcion": "Programa las dosis, controla el motor y envía los eventos de toma."
            },
            {
                "componente": "Motor paso a paso 28BYJ-48 con driver ULN2003",
                "categoria": "Actuador",
                "funcion": "Gira el carrusel para liberar el compartimento correspondiente."
            },
            {
                "componente": "Sensor infrarrojo de presencia",
                "categoria": "Sensor de Presencia",
                "funcion": "Confirma que la persona retiró la dosis de la bandeja."
            },
            {
                "componente": "Módulo reproductor DFPlayer Mini con altavoz",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproduce recordatorios hablados en lenguaje sencillo."
            },
            {
                "componente": "Botones grandes con rotulación en braille y LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten confirmar o posponer la toma y señalan el estado del dispensador."
            },
            {
                "componente": "Carcasa y carrusel impresos en PLA",
                "categoria": "Estructura Mecánica",
                "funcion": "Contienen los compartimentos de medicamentos y los componentes electrónicos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware del dispensador con manejo de horarios y reintentos."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Software de Diseño CAD",
                "descripcion": "Diseño del carrusel y la carcasa para impresión 3D."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Orquestación de Flujos",
                "descripcion": "Recepción de eventos y avisos al cuidador."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelo de predicción del riesgo de omisión de dosis."
            }
        ]
    },
    {
        "id": "proj_235",
        "titulo": "♿ Proyecto 235: Silla de Ruedas Conectada con Mapa de Presión para la Prevención de Úlceras por Presión",
        "descripcion": "Problema: Las personas con lesión medular que usan silla de ruedas durante muchas horas tienen alto riesgo de desarrollar úlceras por presión, porque no perciben la molestia que normalmente obliga a cambiar de postura. Estas lesiones son dolorosas, costosas de tratar y pueden requerir hospitalización prolongada.\n\nDescripción: Cojín instrumentado con una matriz de sensores resistivos de presión de bajo costo conectado a un ESP32 que construye un mapa de presión del asiento cada pocos segundos. Un modelo de aprendizaje automático clasifica la postura (centrada, inclinada a un lado, deslizada hacia adelante) y estima el tiempo acumulado de carga en las zonas de riesgo, como los isquiones y el sacro. Cuando se supera un umbral, el sistema recuerda al usuario realizar un alivio de presión mediante vibración y un mensaje en una aplicación móvil accesible, y registra el cumplimiento para revisarlo con el fisioterapeuta. El cojín se co-diseña con usuarios de silla de ruedas y se presenta como prototipo de apoyo, no como dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad física - Usuarios de silla de ruedas",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fabricación de matrices de sensores de presión con Velostat",
            "Multiplexación y lectura analógica de matrices de sensores",
            "Clasificación de posturas a partir de mapas de presión",
            "Desarrollo de aplicaciones móviles accesibles con Bluetooth Low Energy",
            "Trabajo colaborativo con fisioterapeutas y usuarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un cojín instrumentado que monitoree la distribución de presión en el asiento de una silla de ruedas y recuerde al usuario los alivios de presión necesarios para prevenir úlceras.",
            "📌 Objetivos Específicos:",
            "• Fabricar y caracterizar una matriz de al menos 16 x 16 puntos de presión con Velostat, documentando su respuesta frente a pesos de referencia.",
            "• Entrenar un clasificador de al menos cuatro posturas sentadas con exactitud superior al 85 % usando datos de varios voluntarios.",
            "• Implementar recordatorios de alivio de presión por vibración y por una aplicación móvil compatible con lector de pantalla y control por voz.",
            "• Validar el sistema durante jornadas reales con al menos dos usuarios de silla de ruedas, con consentimiento informado y acompañamiento de un fisioterapeuta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad física - Usuarios de silla de ruedas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Lee la matriz de presión, clasifica la postura y se comunica por Bluetooth Low Energy."
            },
            {
                "componente": "Matriz de Velostat con electrodos de cinta de cobre",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la distribución de presión sobre el asiento."
            },
            {
                "componente": "Multiplexores analógicos CD74HC4067",
                "categoria": "Módulo de Adquisición",
                "funcion": "Permiten leer filas y columnas de la matriz con pocos pines."
            },
            {
                "componente": "Motor vibrador tipo moneda",
                "categoria": "Actuador Háptico",
                "funcion": "Avisa al usuario que debe realizar un alivio de presión."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el cojín durante la jornada."
            },
            {
                "componente": "Cojín de espuma con funda lavable",
                "categoria": "Estructura Mecánica",
                "funcion": "Aloja la matriz de sensores y protege la piel del usuario."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de lectura de la matriz y comunicación BLE."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Clasificación de la postura dentro del ESP32-S3."
            },
            {
                "herramienta": "Python con NumPy y Matplotlib",
                "tipo": "Lenguaje de Análisis de Datos",
                "descripcion": "Caracterización de los sensores y visualización de mapas de presión."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación accesible de recordatorios y registro para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_236",
        "titulo": "🧭 Proyecto 236: Navegación Accesible en el Campus Universitario con Balizas BLE para Personas con Baja Visión y Usuarios de Silla de Ruedas",
        "descripcion": "Problema: Las personas con baja visión y los usuarios de silla de ruedas tienen dificultad para orientarse dentro de los edificios universitarios: los avisos son pequeños, no existen indicaciones táctiles y las rutas más cortas a menudo incluyen escaleras o desniveles. Como resultado dependen de compañeros para llegar a salones, laboratorios o baños accesibles, lo que limita su autonomía e inclusión.\n\nDescripción: Sistema de navegación en interiores para la sede de la institución en Popayán basado en balizas Bluetooth Low Energy instaladas en pasillos, puertas y ascensores. La aplicación móvil estima la posición del usuario con un modelo de huella de señal (k vecinos más cercanos) y calcula rutas sobre un grafo del campus que distingue tramos con escaleras, rampas y ascensores según el perfil del usuario. Las indicaciones se entregan por voz, vibración y una interfaz de alto contraste compatible con lectores de pantalla, y la comunidad puede reportar obstáculos temporales como ascensores fuera de servicio. El mapa y las rutas se validan con estudiantes con discapacidad de la institución.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Educación inclusiva - Accesibilidad del campus",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Localización en interiores con balizas BLE y huella de señal",
            "Algoritmos de rutas sobre grafos con restricciones de accesibilidad",
            "Desarrollo móvil accesible con voz, vibración y lector de pantalla",
            "Levantamiento de información de accesibilidad física",
            "Evaluación de usabilidad con personas con discapacidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de navegación en interiores que guíe a personas con baja visión y usuarios de silla de ruedas por rutas accesibles dentro del campus universitario.",
            "📌 Objetivos Específicos:",
            "• Instalar y caracterizar al menos 20 balizas BLE en un edificio del campus y construir un mapa de huellas de señal para estimar la posición con un error medio inferior a 3 m.",
            "• Modelar el edificio como un grafo con atributos de accesibilidad y calcular rutas diferenciadas para personas con baja visión y para usuarios de silla de ruedas.",
            "• Desarrollar una aplicación móvil que entregue indicaciones por voz y vibración y cumpla criterios WCAG 2.1 de contraste, tamaño de texto y compatibilidad con lectores de pantalla.",
            "• Validar el sistema con al menos cinco estudiantes con discapacidad visual o física, midiendo tiempo de llegada, errores de orientación y satisfacción."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inclusiva - Accesibilidad del campus"
        ],
        "referencias": [
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018.",
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Balizas BLE basadas en nRF52832",
                "categoria": "Módulo de Comunicación",
                "funcion": "Emiten identificadores en pasillos, puertas y ascensores para la localización."
            },
            {
                "componente": "ESP32 como pasarela de monitoreo",
                "categoria": "Microcontrolador",
                "funcion": "Verifica el estado y la batería de las balizas y reporta fallas al servidor."
            },
            {
                "componente": "Teléfonos inteligentes Android y iOS",
                "categoria": "Equipo de Cómputo",
                "funcion": "Escanean las balizas, estiman la posición y guían al usuario."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de navegación accesible con voz, vibración y lector de pantalla."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelo de k vecinos más cercanos para la localización por huella de señal."
            },
            {
                "herramienta": "NetworkX",
                "tipo": "Librería de Grafos",
                "descripcion": "Modelado del campus y cálculo de rutas con restricciones de accesibilidad."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Backend",
                "descripcion": "Servicio de mapas, rutas y reportes de obstáculos temporales."
            }
        ]
    },
    {
        "id": "proj_267",
        "titulo": "🦶 Proyecto 267: Termografía Infrarroja Domiciliaria con Inteligencia en el Borde para Vigilar el Riesgo de Úlcera en el Pie Diabético",
        "descripcion": "Problema: La neuropatía diabética hace que muchas personas no sientan las lesiones de sus pies, y una zona inflamada que pasa inadvertida puede convertirse en úlcera e incluso en amputación. En el Cauca rural llegar a un control podológico implica horas de viaje, y quienes tienen baja visión por retinopatía no pueden inspeccionarse la planta del pie.\n\nDescripción: Plataforma doméstica donde la persona apoya los pies sobre una guía plana mientras una cámara térmica radiométrica FLIR Lepton 3.5, conectada a una Raspberry Pi 5, captura la planta de ambos pies. Una red de segmentación ligera (U-Net cuantizada con TensorFlow Lite), entrenada en Colab con termogramas plantares de bases públicas anonimizadas, delimita las regiones del pie y el sistema compara la temperatura de zonas homólogas: una asimetría sostenida superior a 2,2 °C genera una alerta al cuidador mediante MQTT. La guía es por voz y con botones grandes. Es un prototipo de apoyo, no dispositivo médico certificado, validado con termogramas públicos y voluntarios sanos bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Pie diabético",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de imágenes térmicas radiométricas con Lepton",
            "Segmentación de imágenes con redes U-Net ligeras",
            "Cuantización y despliegue de modelos en Raspberry Pi",
            "Diseño de interfaces por voz para baja visión",
            "Análisis de asimetría térmica y calibración con referencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema domiciliario de termografía plantar con inferencia en el borde que detecte asimetrías térmicas entre ambos pies y alerte al cuidador sobre un posible riesgo de úlcera en personas con diabetes.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo de segmentación de las regiones plantares que alcance un coeficiente de Dice superior a 0,85 sobre termogramas públicos anonimizados reservados para prueba.",
            "• Medir la repetibilidad del sistema con voluntarios sanos, con una diferencia entre capturas repetidas inferior a 0,5 °C frente a un termómetro infrarrojo de referencia.",
            "• Ejecutar la segmentación y el cálculo de asimetría en la Raspberry Pi 5 en menos de 2 segundos por captura y enviar la alerta al cuidador en menos de 10 segundos.",
            "• Diseñar con al menos cinco personas con diabetes una guía por voz y botones de alto contraste, y evaluar su facilidad de uso con la escala SUS, con un puntaje mínimo de 70 puntos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Pie diabético"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Cámara térmica FLIR Lepton 3.5 con placa PureThermal",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura termogramas radiométricos de la planta de ambos pies."
            },
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la segmentación, el cálculo de asimetría y la comunicación."
            },
            {
                "componente": "Guía plana impresa en 3D con espejo y marcas de posición",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene la distancia y la posición de los pies en cada captura."
            },
            {
                "componente": "Botones arcade grandes y parlante de 3 W",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Permiten manejar el equipo sin ver la pantalla y reciben las instrucciones de voz."
            },
            {
                "componente": "Termómetro infrarrojo clínico de referencia",
                "categoria": "Instrumento de Referencia",
                "funcion": "Sirve para verificar la exactitud de las temperaturas medidas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución de la U-Net cuantizada en la Raspberry Pi."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo de segmentación en Google Colab."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Procesamiento de Imágenes",
                "descripcion": "Registro de imágenes, máscaras y mapas de temperatura plantar."
            },
            {
                "herramienta": "Eclipse Mosquitto y ntfy",
                "tipo": "Mensajería y Notificaciones",
                "descripcion": "Transporte de resultados y alertas al teléfono del cuidador."
            }
        ]
    },
    {
        "id": "proj_268",
        "titulo": "🩺 Proyecto 268: Quiosco de Tamizaje Térmico Multicondición con Visión Artificial en el Borde para Promotores de Salud Comunitarios",
        "descripcion": "Problema: En las veredas del Cauca los promotores de salud hacen jornadas de tamizaje con pocos recursos y sin apoyo para detectar de forma temprana fiebre, inflamación articular o asimetrías de circulación en los pies. Los quioscos de tamizaje existentes suelen ser inaccesibles para personas en silla de ruedas o con baja alfabetización.\n\nDescripción: Quiosco portátil con una cámara térmica USB InfiRay P2 Pro y una Jetson Orin Nano que ejecuta con TensorRT un modelo multitarea, entrenado en Colab con termogramas de bases abiertas de Kaggle y Zenodo y con capturas de voluntarios. El sistema ofrece tres tamizajes: temperatura del canto interno del ojo para fiebre, asimetría de temperatura entre pies y asimetría entre rodillas. El resultado se presenta con semáforo, íconos y voz en español, a una altura ajustable para silla de ruedas, y genera una remisión para el promotor. Funciona sin conexión y sincroniza con MQTT. Es un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarios bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Salud comunitaria - Promotores de salud rurales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Termografía infrarroja y calibración con cuerpo negro",
            "Entrenamiento de modelos de visión multitarea",
            "Optimización de inferencia con TensorRT en Jetson",
            "Diseño de interfaces accesibles con íconos y voz",
            "Sincronización de datos sin conexión con MQTT"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un quiosco de tamizaje térmico con inferencia en el borde que apoye a promotores de salud en la detección de fiebre y asimetrías térmicas, con interfaz accesible para personas en silla de ruedas y con baja alfabetización.",
            "📌 Objetivos Específicos:",
            "• Calibrar la cámara térmica con una fuente de referencia, con un error de temperatura inferior a 0,5 °C en el intervalo de 30 °C a 40 °C.",
            "• Entrenar un modelo para localizar rostro, pies y rodillas en imágenes térmicas, con un mAP50 superior a 0,85 en un conjunto de prueba con personas no vistas en el entrenamiento.",
            "• Ejecutar el flujo completo en la Jetson Orin Nano con un tiempo de respuesta inferior a 3 segundos y almacenar los resultados sin conexión, sincronizándolos al recuperar la red.",
            "• Evaluar la usabilidad con al menos diez voluntarios, incluidas personas en silla de ruedas, y comprobar que el 90 % completa un tamizaje con íconos y voz sin ayuda."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud comunitaria - Promotores de salud rurales"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Cámara térmica USB InfiRay P2 Pro de 256 × 192",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura imágenes térmicas del rostro, los pies y las rodillas."
            },
            {
                "componente": "Jetson Orin Nano Developer Kit",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el modelo multitarea optimizado con TensorRT."
            },
            {
                "componente": "Cuerpo negro de referencia de bajo costo con termistor",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permite calibrar la lectura de temperatura de la cámara térmica."
            },
            {
                "componente": "Pantalla táctil de 10 pulgadas con soporte de altura ajustable",
                "categoria": "Interfaz de Usuario",
                "funcion": "Muestra el resultado con íconos grandes y se adapta a la silla de ruedas."
            },
            {
                "componente": "Estructura portátil de aluminio con batería de respaldo",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Permite llevar el quiosco a jornadas de salud en zonas sin red eléctrica estable."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo de detección y regresión de temperatura."
            },
            {
                "herramienta": "NVIDIA TensorRT",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Optimización y ejecución del modelo en la Jetson Orin Nano."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Procesamiento de Imágenes",
                "descripcion": "Lectura de los fotogramas térmicos y extracción de temperaturas."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Voz en español sin conexión para guiar al usuario durante el tamizaje."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Sincronización de los resultados cuando el quiosco recupera la conexión."
            }
        ]
    },
    {
        "id": "proj_269",
        "titulo": "📄 Proyecto 269: Acompañante de Seguimiento de Estudios de TAC y Resonancia que Explica los Informes en Lenguaje Sencillo y Formatos Accesibles",
        "descripcion": "Problema: Las personas que se hacen una TAC o una resonancia cerebral reciben informes llenos de términos técnicos que no comprenden, y esto aumenta la angustia y los errores en el seguimiento. Para quienes tienen baja visión, ceguera, baja escolaridad o secuelas cognitivas de un ACV, el informe en PDF es prácticamente ilegible.\n\nDescripción: Quiosco con una Raspberry Pi 5 y pantalla táctil que recibe el texto del informe aprobado por el radiólogo y genera una explicación en lenguaje sencillo usando un modelo de lenguaje pequeño local (Llama 3.2 de 3B con llama.cpp) apoyado en un glosario médico revisado. El texto se mide con el índice de legibilidad de Fernández Huerta y se entrega en letra grande, audio con Piper, archivo en Braille con liblouis y página compatible con WCAG 2.1. El sistema no analiza imágenes ni diagnostica: el radiólogo aprueba cada explicación antes de entregarla. Es un prototipo de apoyo, no dispositivo médico certificado, validado con informes sintéticos y voluntarios bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Salud digital - Comunicación accesible de resultados de imagen",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de lenguaje natural en español clínico",
            "Despliegue de modelos de lenguaje locales con llama.cpp",
            "Evaluación de legibilidad con el índice Fernández Huerta",
            "Generación de formatos accesibles: audio, Braille y WCAG",
            "Diseño de flujos con revisión humana de contenido clínico"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un acompañante que traduzca informes de TAC y resonancia magnética aprobados por el radiólogo a explicaciones en lenguaje sencillo y formatos accesibles, sin diagnosticar y con supervisión clínica.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de al menos 60 informes sintéticos de TAC y resonancia cerebral, redactados con un radiólogo, y un glosario de al menos 150 términos con definiciones validadas.",
            "• Lograr que las explicaciones generadas alcancen un índice de Fernández Huerta superior a 70 y que el radiólogo apruebe sin cambios clínicos al menos el 85 % de ellas.",
            "• Generar para cada informe una versión en letra grande, audio, archivo Braille y página compatible con WCAG 2.1 nivel AA, verificada con el lector de pantalla NVDA.",
            "• Implementar un flujo de aprobación donde ninguna explicación llegue al paciente sin revisión del radiólogo, con avisos visibles de que el texto no es un diagnóstico, y probarlo con diez voluntarios."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud digital - Comunicación accesible de resultados de imagen"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales.",
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 16 GB con refrigeración activa",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el modelo de lenguaje local y los generadores de formatos."
            },
            {
                "componente": "Pantalla táctil de 10 pulgadas con soporte inclinable",
                "categoria": "Interfaz de Usuario",
                "funcion": "Presenta la explicación con letra grande y alto contraste."
            },
            {
                "componente": "Parlante y botones físicos de gran tamaño",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproducen el audio y permiten navegar sin usar la pantalla táctil."
            },
            {
                "componente": "Lector de códigos QR USB",
                "categoria": "Sensor de Identificación",
                "funcion": "Vincula el informe aprobado con el código entregado al paciente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "llama.cpp con Llama 3.2 de 3B",
                "tipo": "Modelo de Lenguaje Local",
                "descripcion": "Reescritura de informes en lenguaje sencillo, sin enviar datos a la nube."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Genera el audio en español de cada explicación."
            },
            {
                "herramienta": "liblouis",
                "tipo": "Traducción a Braille",
                "descripcion": "Convierte el texto explicado a archivos Braille listos para imprimir."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework de Desarrollo Web",
                "descripcion": "Servicio de aprobación del radiólogo y página accesible para el paciente."
            },
            {
                "herramienta": "NVDA",
                "tipo": "Lector de Pantalla",
                "descripcion": "Verifica la accesibilidad de la página entregada al paciente."
            }
        ]
    },
    {
        "id": "proj_270",
        "titulo": "🧒 Proyecto 270: Entrenador de Marcha y Postura con Estimación de Pose y Retroalimentación Háptica para Niños con Parálisis Cerebral",
        "descripcion": "Problema: Los niños con parálisis cerebral espástica que caminan con apoyo necesitan repetir ejercicios de marcha todos los días, pero la fisioterapia presencial en Popayán es escasa y las familias rurales no pueden asistir con frecuencia. Sin retroalimentación, los niños adoptan posturas como la marcha en cuclillas que aumentan el dolor y el desgaste articular.\n\nDescripción: Sistema formado por una Raspberry Pi 5 con cámara que estima la pose del niño con MediaPipe Pose y calcula el ángulo de rodilla, la inclinación del tronco y la simetría del paso. Un clasificador entrenado con grabaciones de voluntarios, etiquetadas por una fisioterapeuta, detecta posturas de marcha en cuclillas e inclinación excesiva. Un cinturón con dos motores vibradores avisa la corrección por vibración, y un juego en una tablet recompensa con sonidos y colores la postura correcta. El fisioterapeuta recibe un resumen de cada sesión. Es un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarios con consentimiento de los padres y asentimiento del niño.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad motora - Parálisis cerebral infantil",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estimación de pose humana con MediaPipe y OpenCV",
            "Cálculo de parámetros de marcha a partir de puntos clave",
            "Clasificación de posturas con aprendizaje automático",
            "Diseño de retroalimentación háptica y juegos terapéuticos",
            "Trabajo ético con menores de edad y fisioterapeutas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un entrenador domiciliario de marcha y postura que detecte desviaciones de la postura mediante estimación de pose y las corrija con retroalimentación háptica y juegos, para niños con parálisis cerebral.",
            "📌 Objetivos Específicos:",
            "• Extraer ángulos de rodilla y tronco y la simetría del paso con un error medio inferior a 8 grados respecto de un goniómetro y de un sensor inercial de referencia.",
            "• Entrenar un clasificador de posturas que alcance una exactitud superior al 85 % con grabaciones de voluntarios etiquetadas por una fisioterapeuta.",
            "• Entregar la alerta háptica en menos de 500 ms desde que se detecta la desviación, con vibración diferenciada para rodilla y tronco.",
            "• Diseñar con la fisioterapeuta y al menos tres familias un juego accesible y un informe de sesión, y evaluar su aceptación con una encuesta de satisfacción superior a 4 sobre 5."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad motora - Parálisis cerebral infantil"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 con Camera Module 3",
                "categoria": "Computador de Placa Única",
                "funcion": "Captura el video y ejecuta la estimación de pose y el clasificador."
            },
            {
                "componente": "ESP32-C3 con sensor inercial MPU6050 en cinturón",
                "categoria": "Sensor Inercial",
                "funcion": "Mide la inclinación del tronco como referencia independiente."
            },
            {
                "componente": "Dos motores vibradores con driver DRV2605L",
                "categoria": "Actuador Háptico",
                "funcion": "Indican con vibración la corrección de rodilla o de tronco."
            },
            {
                "componente": "Tablet Android de 10 pulgadas",
                "categoria": "Dispositivo Móvil",
                "funcion": "Muestra el juego terapéutico y la retroalimentación visual."
            },
            {
                "componente": "Goniómetro clínico",
                "categoria": "Instrumento de Referencia",
                "funcion": "Sirve para verificar los ángulos articulares estimados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MediaPipe Pose",
                "tipo": "Librería de Visión por Computador",
                "descripcion": "Estimación de los puntos clave del cuerpo en cada fotograma."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y evaluación del clasificador de posturas."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Procesamiento de Imágenes",
                "descripcion": "Captura de video, cálculo de ángulos y superposición visual."
            },
            {
                "herramienta": "Godot Engine",
                "tipo": "Motor de Juegos",
                "descripcion": "Desarrollo del juego terapéutico con retroalimentación sonora y visual."
            }
        ]
    },
    {
        "id": "proj_271",
        "titulo": "🥄 Proyecto 271: Monitoreo de Sonidos de Deglución con Sensor Cervical y TinyML para Alertar Signos de Riesgo de Aspiración en Personas con Disfagia",
        "descripcion": "Problema: La disfagia afecta a muchas personas que han tenido un ACV, viven con enfermedad de Parkinson o son adultos mayores frágiles, y puede producir neumonía por aspiración. En casa, los cuidadores no tienen cómo reconocer una tos tras la deglución ni un número excesivo de degluciones por bocado, y las fonoaudiólogas en la región son muy pocas.\n\nDescripción: Collar ligero con un acelerómetro cervical de bajo ruido y un micrófono MEMS I2S conectados a un ESP32-S3 que registra la actividad de la deglución. Un modelo TinyML (CNN sobre espectrogramas) entrenado con Edge Impulse clasifica deglución, tos, voz húmeda y habla, y el sistema cuenta degluciones por bocado y detecta tos en los 10 segundos posteriores. Un semáforo luminoso, un aviso sonoro y un mensaje al cuidador por BLE advierten la señal; la fonoaudióloga recibe el resumen de la comida. Es un prototipo de apoyo, no dispositivo médico certificado ni diagnóstico de aspiración, validado con voluntarios sanos bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Rehabilitación - Disfagia orofaríngea",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Acondicionamiento de señales de acelerometría cervical",
            "Extracción de características de audio y vibración",
            "Entrenamiento y cuantización de modelos con Edge Impulse",
            "Diseño de alertas visuales y sonoras para cuidadores",
            "Protocolos de recolección con voluntarios y fonoaudiología"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un collar con inferencia en el borde que detecte degluciones y tos durante la alimentación y alerte a cuidadores sobre signos de riesgo en personas con disfagia, como apoyo a la fonoaudióloga.",
            "📌 Objetivos Específicos:",
            "• Recolectar con al menos 15 voluntarios sanos y un protocolo aprobado por la fonoaudióloga un conjunto de señales de deglución con agua, puré y sólido, y de tos y habla.",
            "• Entrenar y cuantizar un clasificador de cuatro clases que alcance una medida F1 superior a 0,85 para deglución y tos en voluntarios no vistos durante el entrenamiento.",
            "• Contar degluciones por bocado y detectar la tos posterior con un retardo de alerta inferior a 2 segundos, ejecutando el modelo en el ESP32-S3 con un consumo medio inferior a 150 mA.",
            "• Evaluar con cuidadores y fonoaudiólogos la claridad de las alertas y del resumen de comida, con una puntuación de comprensión superior al 90 %."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Rehabilitación - Disfagia orofaríngea"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Procesa las señales, ejecuta el modelo y envía las alertas."
            },
            {
                "componente": "Acelerómetro de bajo ruido ADXL355 con banda cervical",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra las vibraciones de la laringe durante la deglución."
            },
            {
                "componente": "Micrófono MEMS I2S INMP441",
                "categoria": "Sensor de Audio",
                "funcion": "Capta la tos y la voz para distinguirlas de la deglución."
            },
            {
                "componente": "LED RGB y zumbador piezoeléctrico",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestran el semáforo de riesgo y los avisos sonoros."
            },
            {
                "componente": "Batería LiPo de 1000 mAh con carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el collar durante varias comidas diarias."
            },
            {
                "componente": "Tablet Android del cuidador",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe las alertas y muestra el resumen de cada comida."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Entrenamiento y cuantización del clasificador de espectrogramas."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición, inferencia y comunicación BLE."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado y análisis de las señales de acelerometría y audio."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación del cuidador con letra grande y alertas accesibles."
            }
        ]
    },
    {
        "id": "proj_272",
        "titulo": "🚪 Proyecto 272: Alertas de Deambulación Nocturna para Personas con Demencia con Sensores de Presencia y Detección de Patrones en el Borde",
        "descripcion": "Problema: Las personas con demencia pueden levantarse de noche y salir de la vivienda sin darse cuenta del riesgo, y los cuidadores familiares, agotados, no pueden vigilar toda la noche. En barrios y veredas de Popayán, donde las casas dan directamente a la calle, una salida sin acompañante puede terminar en pérdida o accidente.\n\nDescripción: Red de nodos ESP32-C3 sin cámaras, con sensores de presencia PIR, contactos magnéticos en puertas y una estera de presión bajo la cama, que se comunican por ESP-NOW con un concentrador ESP32-S3. En el concentrador, un bosque aleatorio entrenado en scikit-learn y exportado con emlearn distingue una ida al baño de una deambulación hacia la puerta de salida a partir de secuencias nocturnas simuladas y grabadas con voluntarios. Ante una deambulación, una luz tenue guía a la persona de regreso y se alerta al cuidador con vibración y mensaje. Es un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarios que simulan rutinas, bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Adulto mayor - Cuidado de personas con demencia",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de redes de sensores con ESP-NOW",
            "Modelado de secuencias de eventos con bosques aleatorios",
            "Despliegue de clasificadores ligeros con emlearn",
            "Diseño de alertas multisensoriales para cuidadores",
            "Privacidad por diseño y ética en el cuidado de personas con demencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de sensores sin cámaras y con inferencia local que detecte la deambulación nocturna hacia la salida de la vivienda de personas con demencia y alerte a su cuidador de forma oportuna.",
            "📌 Objetivos Específicos:",
            "• Instalar al menos cuatro nodos de sensores en una vivienda de prueba y registrar con voluntarios al menos 30 noches simuladas con rutinas de baño, cocina y salida.",
            "• Entrenar un clasificador que detecte las deambulaciones hacia la puerta con sensibilidad superior al 90 % y menos de una falsa alarma por noche, y ejecutarlo en el concentrador ESP32-S3.",
            "• Emitir la alerta al cuidador en menos de 10 segundos tras la apertura de la puerta o el patrón detectado, con luz guía, vibración y mensaje.",
            "• Evaluar con cuidadores familiares la utilidad de las alertas y garantizar que no se almacenen imágenes ni audio, aplicando consentimiento informado y la Ley 1581 de 2012."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Adulto mayor - Cuidado de personas con demencia"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Nodos ESP32-C3 con sensor PIR HC-SR501",
                "categoria": "Microcontrolador",
                "funcion": "Detectan presencia en pasillos, baño y habitación."
            },
            {
                "componente": "Contactos magnéticos tipo reed para puertas",
                "categoria": "Sensor de Contacto",
                "funcion": "Registran la apertura de las puertas de salida de la vivienda."
            },
            {
                "componente": "Estera de presión con sensor de fuerza resistivo",
                "categoria": "Sensor de Fuerza",
                "funcion": "Detecta cuándo la persona se levanta de la cama."
            },
            {
                "componente": "Concentrador ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Recibe los eventos y ejecuta el clasificador de deambulación."
            },
            {
                "componente": "Tira LED de luz cálida y motor vibrador de pulsera",
                "categoria": "Actuador",
                "funcion": "Guía a la persona de regreso y avisa al cuidador con vibración."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "scikit-learn y emlearn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del bosque aleatorio y exportación a C para el ESP32-S3."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de los nodos, de la red ESP-NOW y del concentrador."
            },
            {
                "herramienta": "Eclipse Mosquitto y ntfy",
                "tipo": "Mensajería y Notificaciones",
                "descripcion": "Envío de las alertas al teléfono del cuidador."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Panel de noches registradas y alertas para ajustar el sistema."
            }
        ]
    },
    {
        "id": "proj_273",
        "titulo": "🪑 Proyecto 273: Entrenador de Movilidad en Casa con Prueba de Sentarse y Pararse en 30 Segundos y Estimación de Pose para Adultos Mayores con Riesgo de Caídas",
        "descripcion": "Problema: La debilidad de las piernas es una de las principales causas de caídas en adultos mayores, pero casi nunca se mide ni se entrena en el hogar. En Popayán y municipios cercanos, quienes viven lejos de un centro de fisioterapia no tienen seguimiento, y muchos no pueden usar aplicaciones con textos pequeños o instrucciones rápidas.\n\nDescripción: Sistema en una Raspberry Pi 5 con cámara que se conecta a un televisor. La estimación de pose con MoveNet Lightning en TensorFlow Lite cuenta las repeticiones de la prueba de sentarse y pararse en 30 segundos mediante una máquina de estados sobre los ángulos de cadera y rodilla, y un clasificador pequeño señala el apoyo de brazos o la inclinación excesiva del tronco. El resultado se compara con valores de referencia del programa STEADI de los CDC y se acompaña de rutinas de fortalecimiento guiadas por voz lenta, letra grande y un control de botones grandes. El fisioterapeuta ve el progreso en un panel. Es un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarios mayores bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Geriatría - Sarcopenia y movilidad",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estimación de pose con MoveNet y TensorFlow Lite",
            "Conteo de repeticiones con máquinas de estados",
            "Diseño de interfaces para adultos mayores con letra grande",
            "Guía por voz en español con ritmo adaptable",
            "Visualización de progreso con paneles de Grafana"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un entrenador domiciliario que aplique y cuente la prueba de sentarse y pararse en 30 segundos con estimación de pose y guíe rutinas de fortalecimiento accesibles para adultos mayores con riesgo de caídas.",
            "📌 Objetivos Específicos:",
            "• Contar las repeticiones de la prueba con un error absoluto de a lo sumo una repetición respecto del conteo manual en al menos 30 pruebas con voluntarios mayores de 60 años.",
            "• Detectar con un clasificador ligero el apoyo de los brazos y la inclinación del tronco con una exactitud superior al 85 % sobre grabaciones etiquetadas por un fisioterapeuta.",
            "• Ejecutar la estimación de pose a más de 15 fotogramas por segundo en la Raspberry Pi 5 y entregar instrucciones de voz con un retardo inferior a 1 segundo.",
            "• Diseñar con al menos ocho adultos mayores una interfaz de letra grande y alto contraste, y verificar que el 80 % complete una sesión sin ayuda de un acompañante."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Geriatría - Sarcopenia y movilidad"
        ],
        "referencias": [
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB con Camera Module 3 Wide",
                "categoria": "Computador de Placa Única",
                "funcion": "Captura el cuerpo completo y ejecuta la estimación de pose."
            },
            {
                "componente": "Televisor o monitor HDMI de 32 pulgadas",
                "categoria": "Interfaz de Usuario",
                "funcion": "Muestra al usuario las instrucciones y el avatar de seguimiento."
            },
            {
                "componente": "Control de tres botones grandes de alto contraste",
                "categoria": "Interfaz de Usuario",
                "funcion": "Permite iniciar, pausar y repetir sin manipular menús."
            },
            {
                "componente": "Silla firme sin brazos con trípode de cámara",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Estandariza la altura del asiento y la posición de la cámara."
            },
            {
                "componente": "Parlante USB",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproduce la guía por voz y los ánimos durante los ejercicios."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MoveNet Lightning (TensorFlow Lite)",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Estimación de la pose del usuario en tiempo real."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Clasificación del apoyo de brazos y de la postura del tronco."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Guía por voz en español a un ritmo ajustable."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Panel de evolución de las repeticiones para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_274",
        "titulo": "🔔 Proyecto 274: Alertas Visuales y Vibratorias de Sonidos Domésticos Críticos con Clasificación de Audio en el Borde para Personas Sordas e Hipoacúsicas",
        "descripcion": "Problema: Una persona sorda que vive sola no oye el timbre, la alarma de humo, el llanto de un bebé ni el pito de una olla a presión, lo que la expone a riesgos domésticos y la hace depender de otras personas. Las alarmas luminosas comerciales son costosas, no distinguen entre sonidos y casi no se consiguen en el Cauca.\n\nDescripción: Nodos con ESP32-S3 y micrófono MEMS I2S distribuidos en las habitaciones que clasifican el audio localmente con una CNN sobre coeficientes MFCC, entrenada con Edge Impulse a partir de los conjuntos públicos ESC-50 y UrbanSound8K y de grabaciones en viviendas de Popayán. Las clases son timbre, alarma de humo, llanto de bebé, pito de olla, teléfono y ruido de fondo. Solo se transmite la etiqueta, nunca el audio; una pulsera con motor vibrador y luces estroboscópicas distinguen cada sonido con patrones propios. Es un prototipo de apoyo, no dispositivo médico certificado ni sustituto de un detector de humo homologado, validado con voluntarios sordos bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad auditiva - Seguridad en el hogar",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Extracción de características MFCC para clasificación de audio",
            "Entrenamiento y cuantización de modelos con Edge Impulse",
            "Diseño de patrones vibratorios y luminosos distinguibles",
            "Comunicación inalámbrica entre nodos y pulsera con BLE",
            "Evaluación de robustez de clasificadores frente al ruido"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de nodos con clasificación de audio en el borde que reconozca sonidos domésticos críticos y los comunique con vibración y luz a personas sordas e hipoacúsicas, sin transmitir audio.",
            "📌 Objetivos Específicos:",
            "• Entrenar un clasificador de seis clases de sonidos con ESC-50, UrbanSound8K y grabaciones propias, con una exactitud superior al 90 % y una sensibilidad superior al 95 % para la alarma de humo.",
            "• Ejecutar el modelo cuantizado en un ESP32-S3 con un retardo desde el sonido hasta la vibración de la pulsera inferior a 2 segundos.",
            "• Medir la robustez con ruido de televisión, conversación y tráfico, con una tasa de falsas alarmas inferior a una por día en una semana de prueba en una vivienda.",
            "• Diseñar con al menos cinco personas sordas patrones de vibración y luz distinguibles, y comprobar que identifican correctamente al menos el 90 % de las alertas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad auditiva - Seguridad en el hogar"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Nodos ESP32-S3 con micrófono MEMS INMP441",
                "categoria": "Microcontrolador",
                "funcion": "Capturan el audio de cada habitación y ejecutan el clasificador."
            },
            {
                "componente": "Pulsera con ESP32-C3 y motor vibrador con driver DRV2605L",
                "categoria": "Actuador Háptico",
                "funcion": "Entrega patrones de vibración diferentes según el sonido detectado."
            },
            {
                "componente": "Luces estroboscópicas LED de alta intensidad",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Complementan la vibración en las habitaciones con destellos."
            },
            {
                "componente": "Baterías LiPo con carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimentan los nodos y la pulsera durante al menos un día."
            },
            {
                "componente": "Sonómetro de referencia de bajo costo",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permite medir el nivel sonoro de las pruebas y calibrar los nodos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Diseño, entrenamiento y cuantización del clasificador de audio."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de captura, inferencia y comunicación entre nodos."
            },
            {
                "herramienta": "librosa",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Análisis de audio y aumento de datos con ruido y reverberación."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación para configurar los sonidos y revisar el historial de alertas."
            }
        ]
    },
    {
        "id": "proj_275",
        "titulo": "🔍 Proyecto 275: Localizador de Objetos Cotidianos con Cámara Portátil y Audio Espacial para Personas Ciegas y con Baja Visión en el Hogar",
        "descripcion": "Problema: Para una persona ciega o con baja visión, perder las llaves, el celular o la caja de medicamentos puede significar horas de búsqueda y dependencia de familiares. Las ayudas existentes dependen de etiquetas pegadas a cada objeto o de aplicaciones que exigen conexión permanente a internet y envían imágenes del hogar a servidores externos.\n\nDescripción: Cámara OAK-D Lite con profundidad y capacidad de inferencia en la propia cámara, conectada a una Raspberry Pi 5 y llevada al pecho o en una gafa. Un modelo YOLOv8n, ajustado en Colab con imágenes de objetos propios de los voluntarios (llaves, celular, vaso, control remoto, caja de medicamentos, gafas), detecta los objetos y estima su distancia. La persona pregunta por voz, con reconocimiento offline Vosk, y el sistema guía con tonos estéreo cuya frecuencia y ritmo indican dirección y cercanía, y recuerda dónde vio cada objeto por última vez. Las imágenes no salen del dispositivo. Es un prototipo de apoyo, validado con voluntarios con discapacidad visual, bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad visual - Autonomía en el hogar",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Ajuste fino de detectores de objetos con YOLOv8",
            "Visión estéreo y profundidad con DepthAI y OAK-D",
            "Reconocimiento de voz offline en español con Vosk",
            "Diseño de audio espacial y guía sonora accesible",
            "Pruebas de usabilidad con personas ciegas y con baja visión"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un localizador de objetos cotidianos con inferencia en el borde que guíe mediante voz y audio espacial a personas ciegas y con baja visión hasta objetos de uso diario dentro de su hogar.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de al menos 1500 imágenes anotadas de ocho objetos cotidianos en viviendas de voluntarios, con consentimiento informado y almacenamiento exclusivamente local.",
            "• Ajustar un detector que alcance un mAP50 superior a 0,80 en viviendas no vistas en el entrenamiento y estime la distancia con un error inferior a 15 cm entre 0,5 m y 3 m.",
            "• Reconocer comandos de voz en español con una tasa de acierto superior al 90 % y guiar al usuario con tonos estéreo con un retardo inferior a 500 ms.",
            "• Evaluar con al menos cinco personas con discapacidad visual el tiempo para encontrar un objeto y comprobar que se reduce al menos un 40 % frente a la búsqueda táctil sin ayuda."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad visual - Autonomía en el hogar"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales.",
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Cámara OAK-D Lite de Luxonis",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura imagen y profundidad y ejecuta el detector en la propia cámara."
            },
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Coordina la voz, la memoria de objetos y la guía sonora."
            },
            {
                "componente": "Audífonos de conducción ósea con micrófono",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Entregan los tonos y la voz sin tapar los sonidos del entorno."
            },
            {
                "componente": "Arnés de pecho con soporte impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene la cámara estable y orientada hacia delante."
            },
            {
                "componente": "Batería externa USB de 10 000 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el equipo durante una tarde de uso."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ultralytics YOLOv8",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Ajuste fino del detector de objetos cotidianos en Colab."
            },
            {
                "herramienta": "DepthAI",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo y obtención de la distancia en la OAK-D Lite."
            },
            {
                "herramienta": "Vosk",
                "tipo": "Reconocimiento de Voz",
                "descripcion": "Comandos de voz en español sin conexión a internet."
            },
            {
                "herramienta": "SoundDevice y NumPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Generación de tonos estéreo según la dirección y la distancia."
            }
        ]
    },
    {
        "id": "proj_276",
        "titulo": "🫀 Proyecto 276: Monitoreo Domiciliario de Pacientes con Insuficiencia Cardíaca con Peso, Oximetría y Predicción de Descompensación mediante Aprendizaje Automático",
        "descripcion": "Problema: La insuficiencia cardíaca produce reingresos hospitalarios frecuentes cuando la retención de líquidos no se detecta a tiempo. Las personas que viven lejos de Popayán o que tienen baja visión o poca escolaridad no registran su peso ni sus síntomas a diario, y la enfermera del programa crónico no puede visitarlas con la frecuencia necesaria.\n\nDescripción: Estación domiciliaria con un ESP32-S3, una báscula con cuatro celdas de carga y HX711, un oxímetro MAX30102 y tres botones con íconos para declarar disnea, edema y dificultad para dormir. Un modelo de gradiente por árboles y una GRU pequeña, entrenados con trayectorias simuladas a partir de reglas clínicas (como el aumento de más de 2 kg en tres días) y validadas con la enfermera, estiman el riesgo de descompensación y se comparan con una regla fija. Un panel de Grafana y una alerta al equipo de salud por MQTT priorizan a los pacientes. Es un prototipo de apoyo, no dispositivo médico certificado, validado con trayectorias simuladas y voluntarios sanos bajo consentimiento informado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Insuficiencia cardíaca",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición con celdas de carga y acondicionamiento HX711",
            "Modelado de series temporales con GRU y árboles de gradiente",
            "Generación de datos sintéticos a partir de reglas clínicas",
            "Diseño de interfaces con íconos, voz y alto contraste",
            "Alertas y paneles de pacientes con Grafana y MQTT"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación domiciliaria que registre peso, saturación de oxígeno y síntomas y estime el riesgo de descompensación en personas con insuficiencia cardíaca, con una interfaz accesible y alertas priorizadas para el equipo de salud.",
            "📌 Objetivos Específicos:",
            "• Calibrar la báscula con pesas patrón con un error inferior a 0,2 kg y medir la saturación de oxígeno con una diferencia inferior a 2 puntos porcentuales frente a un oxímetro comercial.",
            "• Generar al menos 500 trayectorias simuladas de 60 días con la enfermera y entrenar un modelo cuya sensibilidad supere el 85 % frente a la regla fija con una especificidad no menor.",
            "• Ejecutar la estimación de riesgo cada día en la estación, o en un computador local, y enviar la alerta priorizada al equipo de salud en menos de 1 minuto.",
            "• Evaluar con al menos ocho voluntarios mayores, incluidos algunos con baja visión, que el 85 % pueda registrar peso y síntomas con íconos y voz sin ayuda durante dos semanas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Insuficiencia cardíaca"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Gestiona los sensores, los botones, la voz y la comunicación."
            },
            {
                "componente": "Báscula con cuatro celdas de carga y amplificador HX711",
                "categoria": "Sensor de Fuerza",
                "funcion": "Mide el peso corporal diario con la resolución necesaria."
            },
            {
                "componente": "Oxímetro de pulso MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la saturación de oxígeno y la frecuencia del pulso."
            },
            {
                "componente": "Tres botones grandes con íconos y parlante",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Permiten declarar síntomas y escuchar las instrucciones."
            },
            {
                "componente": "Pesas patrón y oxímetro comercial de referencia",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar y verificar la exactitud de las mediciones."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch y XGBoost",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la GRU y del modelo de árboles de gradiente."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición, voz y envío de datos."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Transporte de las mediciones y alertas al equipo de salud."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Panel de pacientes priorizados por riesgo estimado."
            }
        ]
    }
];
