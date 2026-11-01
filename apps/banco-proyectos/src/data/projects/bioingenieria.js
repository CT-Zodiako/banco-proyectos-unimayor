// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_163",
        "titulo": "⚡ Proyecto 163: Analizador de Bioimpedancia Multifrecuencia para Estimación de Composición Corporal",
        "descripcion": "Problema: Los programas de nutrición y control de enfermedades crónicas en centros de salud de primer nivel del Cauca estiman la composición corporal solo con peso y talla, porque los analizadores de bioimpedancia clínicos son costosos; así se pierde información sobre masa grasa, masa libre de grasa y estado de hidratación que orienta el tratamiento de pacientes con obesidad, desnutrición o enfermedad renal.\n\nDescripción: Analizador tetrapolar de bioimpedancia que inyecta una corriente alterna segura en un rango de 5 kHz a 200 kHz y mide magnitud y fase de la impedancia del cuerpo. El sistema se calibra con redes RC de referencia, ajusta el modelo de Cole para separar agua intra y extracelular y compara sus estimaciones con un equipo comercial de referencia.",
        "area": "Bioingeniería",
        "sector": "Salud - Nutrición clínica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Bioimpedancia eléctrica y modelos de tejido",
            "Diseño de fuentes de corriente y circuitos analógicos de precisión",
            "Seguridad eléctrica en dispositivos médicos (IEC 60601-1)",
            "Calibración y caracterización metrológica",
            "Ajuste de modelos no lineales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir y validar un analizador de bioimpedancia multifrecuencia de bajo costo para la estimación de la composición corporal en atención primaria.",
            "📌 Objetivos Específicos:",
            "• Medir la impedancia en al menos ocho frecuencias entre 5 kHz y 200 kHz con un error inferior al 2 % en magnitud frente a redes RC de referencia.",
            "• Mantener la corriente de excitación por debajo de 500 µA RMS de acuerdo con los límites de corriente auxiliar de paciente de la norma IEC 60601-1.",
            "• Comparar la masa libre de grasa estimada con la de un analizador comercial en al menos 20 voluntarios mediante análisis de Bland-Altman."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Nutrición clínica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Analizador de impedancia AD5933",
                "categoria": "Circuito Integrado de Medición",
                "funcion": "Genera la excitación senoidal y calcula la parte real e imaginaria de la impedancia."
            },
            {
                "componente": "Fuente de corriente Howland con amplificador OPA2277",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Convierte la excitación en una corriente controlada e independiente de la carga."
            },
            {
                "componente": "Amplificador de instrumentación AD8421",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Mide la tensión diferencial entre los electrodos de detección."
            },
            {
                "componente": "Raspberry Pi Pico",
                "categoria": "Microcontrolador",
                "funcion": "Controla el barrido de frecuencias y transmite los resultados al computador."
            },
            {
                "componente": "Electrodos de superficie Ag/AgCl y cables blindados",
                "categoria": "Sensor Biomédico",
                "funcion": "Implementan la configuración tetrapolar mano-pie."
            },
            {
                "componente": "Redes RC de calibración con componentes de tolerancia 0.1 %",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar y verificar la exactitud del analizador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "KiCad",
                "tipo": "Diseño de Circuitos Impresos",
                "descripcion": "Diseño del esquemático y de la PCB analógica con aislamiento."
            },
            {
                "herramienta": "LTspice",
                "tipo": "Simulación de Circuitos",
                "descripcion": "Verificación de la fuente de corriente y de la respuesta en frecuencia."
            },
            {
                "herramienta": "MicroPython",
                "tipo": "Firmware Embebido",
                "descripcion": "Control del barrido de frecuencias y comunicación serial."
            },
            {
                "herramienta": "Python con lmfit y Matplotlib",
                "tipo": "Análisis de Datos",
                "descripcion": "Ajuste del modelo de Cole y gráficos de Bland-Altman."
            }
        ]
    },
    {
        "id": "proj_165",
        "titulo": "🫀 Proyecto 165: Tarjeta Abierta de Adquisición de Biopotenciales ECG, EMG y EOG para Docencia e Investigación",
        "descripcion": "Problema: Los cursos de instrumentación biomédica y los semilleros de investigación de la región dependen de módulos didácticos importados que cuestan millones de pesos, tienen esquemas cerrados y canales limitados, lo que restringe las prácticas de laboratorio y obliga a los estudiantes a trabajar con datos públicos en lugar de registrar sus propias señales.\n\nDescripción: Tarjeta de hardware abierto de cuatro canales basada en el front-end analógico ADS1299, con aislamiento galvánico, alimentación por batería y filtros configurables para registrar ECG, EMG y EOG. Se acompaña de una aplicación de escritorio para visualización y exportación de datos, y se caracteriza con un generador de señales fisiológicas y mediciones de ruido referido a la entrada y rechazo de modo común.",
        "area": "Bioingeniería",
        "sector": "Educación superior - Instrumentación biomédica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de front-ends analógicos para biopotenciales",
            "Diseño de PCB de señal mixta con aislamiento",
            "Comunicación SPI y firmware de adquisición",
            "Caracterización de ruido y rechazo de modo común",
            "Desarrollo de software de visualización en tiempo real"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar, fabricar y caracterizar una tarjeta de hardware abierto para la adquisición multicanal de biopotenciales orientada a la docencia y la investigación.",
            "📌 Objetivos Específicos:",
            "• Lograr un ruido referido a la entrada inferior a 2 µV pico a pico en la banda de 0.5 a 100 Hz en los cuatro canales.",
            "• Obtener un rechazo de modo común superior a 100 dB a 60 Hz utilizando el circuito de pierna derecha activa.",
            "• Validar el registro simultáneo de ECG, EMG y EOG en al menos diez voluntarios y publicar esquemáticos, firmware y software en un repositorio abierto."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Instrumentación biomédica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Front-end analógico ADS1299",
                "categoria": "Convertidor Analógico-Digital",
                "funcion": "Amplifica y digitaliza con 24 bits los biopotenciales de cada canal."
            },
            {
                "componente": "STM32F411 (placa Black Pill)",
                "categoria": "Microcontrolador",
                "funcion": "Configura el ADS1299, recibe las muestras por SPI y las transmite al computador."
            },
            {
                "componente": "Aislador digital ISO7741 y convertidor DC-DC aislado",
                "categoria": "Seguridad Eléctrica",
                "funcion": "Separan galvánicamente al paciente del computador."
            },
            {
                "componente": "Electrodos Ag/AgCl y cables blindados",
                "categoria": "Sensor Biomédico",
                "funcion": "Captan las señales eléctricas de corazón, músculos y ojos."
            },
            {
                "componente": "Simulador de paciente ECG de bajo costo",
                "categoria": "Instrumento de Referencia",
                "funcion": "Genera señales conocidas para la caracterización de la tarjeta."
            },
            {
                "componente": "PCB de cuatro capas fabricada por encargo",
                "categoria": "Estructura / Componente Electrónico",
                "funcion": "Soporta los circuitos con planos de tierra separados analógico y digital."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "KiCad",
                "tipo": "Diseño de Circuitos Impresos",
                "descripcion": "Esquemático y PCB de señal mixta publicados como hardware abierto."
            },
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición con DMA y transmisión por USB."
            },
            {
                "herramienta": "Python con PyQtGraph",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Aplicación de visualización, filtrado y exportación en tiempo real."
            },
            {
                "herramienta": "Lab Streaming Layer (LSL)",
                "tipo": "Protocolo de Comunicación",
                "descripcion": "Sincronización de los datos con otras herramientas de investigación."
            }
        ]
    },
    {
        "id": "proj_167",
        "titulo": "💉 Proyecto 167: Prototipo de Bomba de Infusión Peristáltica con Detección de Oclusión y Aire en Línea",
        "descripcion": "Problema: Los hospitales de baja complejidad del Cauca disponen de pocas bombas de infusión y administran muchos medicamentos por goteo por gravedad regulado manualmente, una práctica con errores de dosificación de hasta el 30 % que pone en riesgo a pacientes pediátricos y a quienes reciben fármacos de margen terapéutico estrecho.\n\nDescripción: Prototipo de bomba de infusión peristáltica con motor paso a paso y control en lazo cerrado, que permite programar volumen y velocidad de infusión e incorpora alarmas de oclusión mediante sensor de fuerza y de aire en línea mediante sensor ultrasónico. Su exactitud se evalúa por gravimetría con balanza analítica siguiendo el método de ensayo de la norma IEC 60601-2-24.",
        "area": "Bioingeniería",
        "sector": "Salud - Equipos hospitalarios",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control de motores paso a paso en lazo cerrado",
            "Diseño de sistemas de alarma críticos para la seguridad",
            "Ensayos gravimétricos y análisis de exactitud de flujo",
            "Normatividad de equipos de infusión (IEC 60601-2-24)",
            "Diseño de interfaces de usuario para equipos médicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un prototipo de bomba de infusión peristáltica de bajo costo con alarmas de seguridad, evaluado con los métodos de ensayo de la norma IEC 60601-2-24.",
            "📌 Objetivos Específicos:",
            "• Lograr una exactitud de flujo de ±5 % en el rango de 1 a 500 mL/h medida por gravimetría durante dos horas de infusión continua.",
            "• Detectar oclusiones aguas abajo en menos de 60 segundos a 25 mL/h y burbujas de aire mayores a 50 µL en la línea.",
            "• Evaluar la usabilidad de la interfaz de programación con al menos diez profesionales de enfermería mediante la escala SUS."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Equipos hospitalarios"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "STM32F103 (placa Blue Pill)",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el control de flujo, la lógica de alarmas y la interfaz de usuario."
            },
            {
                "componente": "Motor paso a paso NEMA 17 con driver TMC2209",
                "categoria": "Actuador",
                "funcion": "Acciona el cabezal peristáltico con movimiento suave y silencioso."
            },
            {
                "componente": "Cabezal peristáltico de rodillos impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Desplaza el fluido comprimiendo el tubo de silicona de grado médico."
            },
            {
                "componente": "Sensor de fuerza FSR402 en la línea",
                "categoria": "Sensor de Fuerza",
                "funcion": "Detecta el aumento de presión causado por una oclusión."
            },
            {
                "componente": "Sensor ultrasónico de burbujas de abrazadera",
                "categoria": "Sensor de Seguridad",
                "funcion": "Detecta aire en el tubo de infusión."
            },
            {
                "componente": "Pantalla TFT de 2.8 pulgadas, teclado y zumbador",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten programar la infusión y emitir alarmas audiovisuales."
            },
            {
                "componente": "Balanza analítica del laboratorio",
                "categoria": "Instrumento de Referencia",
                "funcion": "Mide la masa infundida para el ensayo gravimétrico de exactitud."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "STM32CubeIDE con FreeRTOS",
                "tipo": "Sistema Operativo de Tiempo Real",
                "descripcion": "Tareas concurrentes de control, monitoreo de alarmas e interfaz."
            },
            {
                "herramienta": "LVGL",
                "tipo": "Biblioteca de Interfaz Gráfica",
                "descripcion": "Pantallas de programación y estado de la infusión."
            },
            {
                "herramienta": "Python con pandas y Matplotlib",
                "tipo": "Análisis de Datos",
                "descripcion": "Curvas de trompeta y análisis de exactitud de flujo."
            },
            {
                "herramienta": "Fusion 360",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del cabezal peristáltico y la carcasa."
            }
        ]
    },
    {
        "id": "proj_168",
        "titulo": "🦴 Proyecto 168: Órtesis de Muñeca Personalizada Impresa en 3D a partir de Escaneo Fotogramétrico",
        "descripcion": "Problema: Los pacientes con fracturas distales de radio o síndrome del túnel carpiano en Popayán reciben férulas de yeso o termoplásticas genéricas, pesadas y poco ventiladas, que provocan maceración de la piel, baja adherencia al tratamiento y visitas adicionales para ajustes, mientras que una órtesis a medida fabricada por un taller ortopédico es costosa y tarda semanas.\n\nDescripción: Flujo de trabajo de bajo costo que captura la geometría del antebrazo del paciente con fotogrametría desde un teléfono celular, genera de forma paramétrica una órtesis ventilada y la fabrica en impresión 3D. El proyecto compara el ajuste, el peso, la resistencia mecánica y la comodidad percibida frente a una férula termoplástica convencional.",
        "area": "Bioingeniería",
        "sector": "Salud - Ortopedia y órtesis",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fotogrametría y reconstrucción de mallas 3D",
            "Diseño paramétrico de dispositivos ortopédicos",
            "Impresión 3D con materiales técnicos",
            "Ensayos mecánicos de flexión",
            "Evaluación de comodidad y satisfacción de usuarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un proceso de bajo costo para diseñar y fabricar órtesis de muñeca personalizadas mediante fotogrametría e impresión 3D.",
            "📌 Objetivos Específicos:",
            "• Reconstruir la geometría del antebrazo con una desviación inferior a 2 mm respecto a mediciones antropométricas manuales.",
            "• Reducir en al menos 40 % el peso de la órtesis frente a una férula termoplástica, soportando sin falla una carga de flexión de 100 N.",
            "• Evaluar la comodidad y el ajuste en al menos diez voluntarios sanos durante ocho horas de uso con el cuestionario QUEST 2.0."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Ortopedia y órtesis"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono celular con cámara de al menos 12 MP",
                "categoria": "Dispositivo de Captura",
                "funcion": "Toma las fotografías del antebrazo para la reconstrucción 3D."
            },
            {
                "componente": "Impresora 3D FDM del laboratorio",
                "categoria": "Equipo de Fabricación",
                "funcion": "Fabrica la órtesis a partir del modelo personalizado."
            },
            {
                "componente": "Filamentos PETG y TPU",
                "categoria": "Material",
                "funcion": "Proporcionan rigidez en la estructura y suavidad en las zonas de contacto."
            },
            {
                "componente": "Correas de velcro y remaches",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Permiten cerrar y ajustar la órtesis sobre el antebrazo."
            },
            {
                "componente": "Celda de carga con estructura de ensayo de flexión",
                "categoria": "Instrumento de Medición",
                "funcion": "Evalúa la resistencia mecánica de las órtesis impresas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Meshroom (AliceVision)",
                "tipo": "Fotogrametría",
                "descripcion": "Reconstrucción de la malla 3D del antebrazo a partir de fotografías."
            },
            {
                "herramienta": "Blender",
                "tipo": "Modelado 3D",
                "descripcion": "Limpieza de la malla y generación de la superficie de la órtesis."
            },
            {
                "herramienta": "OpenSCAD",
                "tipo": "Diseño CAD Paramétrico",
                "descripcion": "Generación del patrón de ventilación y el espesor de la órtesis."
            },
            {
                "herramienta": "PrusaSlicer",
                "tipo": "Fabricación",
                "descripcion": "Preparación de la impresión con parámetros por material."
            }
        ]
    },
    {
        "id": "proj_211",
        "titulo": "👣 Proyecto 211: Plantillas Instrumentadas de Presión Plantar con Registro Local para el Análisis Biomecánico de la Marcha",
        "descripcion": "Problema: Los programas de fisioterapia y podología de Popayán evalúan la marcha de forma visual o con huellas en papel, porque las plataformas de presión y los sistemas de baropodometría comerciales cuestan decenas de millones de pesos; así es difícil cuantificar la distribución de cargas, la simetría entre ambos pies y la evolución de un paciente durante su tratamiento.\n\nDescripción: Par de plantillas impresas en 3D con ocho sensores de fuerza resistivos por pie y una unidad inercial en el talón, conectadas a un microcontrolador Teensy que guarda las señales en una tarjeta microSD a 100 Hz. Un programa en Python calcula el centro de presión, las fases de apoyo y balanceo, los tiempos de contacto y los índices de simetría, y genera un informe para el profesional. Las plantillas se calibran con pesas patrón y se comparan con una plataforma de fuerza o una balanza digital de referencia. Las pruebas con voluntarios requieren consentimiento informado; se trata de un prototipo de apoyo, no de un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Fisioterapia y biomecánica",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Biomecánica de la marcha humana",
            "Acondicionamiento de sensores de fuerza resistivos",
            "Programación de microcontroladores y registro en tarjeta SD",
            "Procesamiento de señales en Python",
            "Calibración y análisis de incertidumbre"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y validar un par de plantillas instrumentadas de bajo costo para medir la distribución de presión plantar y los parámetros temporales de la marcha.",
            "📌 Objetivos Específicos:",
            "• Calibrar cada sensor con pesas patrón entre 0 y 50 kg y obtener un error de fuerza total inferior al 10 % frente a una balanza digital de referencia.",
            "• Detectar los eventos de contacto inicial y despegue con un error menor de 20 ms respecto a video de alta velocidad grabado con un teléfono celular.",
            "• Registrar la marcha de al menos 15 voluntarios sanos con consentimiento informado y calcular índices de simetría y trayectoria del centro de presión."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Fisioterapia y biomecánica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Sensores de fuerza resistivos FSR402 (ocho por plantilla)",
                "categoria": "Sensor de Fuerza",
                "funcion": "Miden la presión bajo el talón, el mediopié, las cabezas metatarsianas y el hallux."
            },
            {
                "componente": "Teensy 4.0",
                "categoria": "Microcontrolador",
                "funcion": "Muestrea los sensores a 100 Hz y escribe los registros en la tarjeta de memoria."
            },
            {
                "componente": "Unidad inercial MPU-6050",
                "categoria": "Sensor Inercial",
                "funcion": "Complementa la detección de eventos de la marcha con aceleración y velocidad angular del pie."
            },
            {
                "componente": "Módulo lector de tarjetas microSD",
                "categoria": "Almacenamiento",
                "funcion": "Guarda los registros de cada sesión para su análisis posterior en el computador."
            },
            {
                "componente": "Divisores de tensión con amplificador MCP6004 y batería LiPo con cargador TP4056",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Linealizan la respuesta de los sensores y alimentan el sistema de forma portátil."
            },
            {
                "componente": "Plantillas de TPU impresas en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Alojan los sensores en posiciones anatómicas repetibles para cada talla de calzado."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con Teensyduino",
                "tipo": "Firmware Embebido",
                "descripcion": "Adquisición sincronizada de los sensores y escritura en la tarjeta microSD."
            },
            {
                "herramienta": "Python con NumPy, SciPy y Matplotlib",
                "tipo": "Análisis de Datos",
                "descripcion": "Detección de eventos de la marcha, centro de presión, índices de simetría e informe gráfico."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño paramétrico de las plantillas por talla y de la carcasa de la electrónica."
            },
            {
                "herramienta": "Kinovea",
                "tipo": "Análisis de Video",
                "descripcion": "Marcado de eventos de la marcha en video para validar la detección automática."
            }
        ]
    },
    {
        "id": "proj_212",
        "titulo": "🧫 Proyecto 212: Fantomas de Tejido Blando en Hidrogel para Entrenamiento en Ecografía y Punción Guiada",
        "descripcion": "Problema: Los estudiantes de medicina, enfermería y tecnología en radiología del Cauca practican la ecografía y las punciones guiadas casi exclusivamente con pacientes, porque los simuladores comerciales importados son costosos y se deterioran con el uso; esto limita las horas de entrenamiento y aumenta el riesgo en los primeros procedimientos reales.\n\nDescripción: Desarrollo de fantomas de tejido blando a base de agar, gelatina y alcohol polivinílico con inclusiones que simulan vasos, quistes y masas sólidas. Se ajustan la velocidad del sonido, la atenuación y la ecogenicidad variando la concentración de los componentes y de partículas dispersoras como grafito o celulosa, y se fabrican moldes impresos en 3D para obtener geometrías repetibles. Las propiedades acústicas se miden con un montaje de transmisión ultrasónica y los fantomas se evalúan con un ecógrafo del área de salud.",
        "area": "Bioingeniería",
        "sector": "Educación en salud - Simulación clínica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Física del ultrasonido y propiedades acústicas de tejidos",
            "Formulación y preparación de hidrogeles",
            "Diseño de moldes e impresión 3D",
            "Medición experimental de velocidad del sonido y atenuación",
            "Diseño de experimentos y análisis estadístico"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y caracterizar fantomas de tejido blando de bajo costo que reproduzcan las propiedades acústicas de los tejidos para el entrenamiento en ecografía y punción guiada.",
            "📌 Objetivos Específicos:",
            "• Obtener formulaciones con velocidad del sonido entre 1 500 y 1 600 m/s y atenuación entre 0,3 y 0,7 dB/cm/MHz medidas por transmisión ultrasónica.",
            "• Fabricar tres modelos con inclusiones vasculares, quísticas y sólidas a partir de moldes impresos en 3D, que soporten al menos 50 punciones sin perder su utilidad.",
            "• Evaluar el realismo de los fantomas con al menos diez docentes y estudiantes del área de salud mediante una encuesta con escala de Likert."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación en salud - Simulación clínica"
        ],
        "referencias": [
            "Culjat, M. O., Goldenberg, D., Tewari, P., & Singh, R. S. (2010). A review of tissue substitutes for ultrasound imaging. Ultrasound in Medicine & Biology, 36(6), 861–873."
        ],
        "hardware_tabla": [
            {
                "componente": "Agar, gelatina sin sabor, alcohol polivinílico, glicerina y polvo de grafito",
                "categoria": "Material",
                "funcion": "Forman la matriz del fantoma y ajustan su velocidad del sonido, atenuación y ecogenicidad."
            },
            {
                "componente": "Moldes impresos en 3D en PETG",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Definen la geometría del fantoma y la posición de las inclusiones."
            },
            {
                "componente": "Par de transductores ultrasónicos de 1 MHz con generador de pulsos",
                "categoria": "Instrumento de Medición",
                "funcion": "Miden el tiempo de vuelo y la amplitud transmitida a través de las muestras."
            },
            {
                "componente": "Osciloscopio digital del laboratorio",
                "categoria": "Instrumento de Medición",
                "funcion": "Registra las señales ultrasónicas para calcular velocidad del sonido y atenuación."
            },
            {
                "componente": "Ecógrafo del programa de salud",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permite evaluar la apariencia de los fantomas en imágenes clínicas."
            },
            {
                "componente": "Balanza de precisión, plancha de calentamiento y termómetro digital",
                "categoria": "Equipo de Laboratorio",
                "funcion": "Garantizan la preparación repetible de las formulaciones."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño de los moldes y de los soportes de las inclusiones."
            },
            {
                "herramienta": "GNU Octave",
                "tipo": "Procesamiento de Señales",
                "descripcion": "Cálculo del tiempo de vuelo, la velocidad del sonido y la atenuación espectral."
            },
            {
                "herramienta": "ImageJ (Fiji)",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Medición del contraste y la ecogenicidad en las imágenes de ecografía."
            },
            {
                "herramienta": "Cura",
                "tipo": "Fabricación",
                "descripcion": "Preparación de la impresión 3D de los moldes."
            }
        ]
    },
    {
        "id": "proj_213",
        "titulo": "🩻 Proyecto 213: Biomodelos Anatómicos Impresos en 3D a partir de Tomografía Computarizada para Planificación Quirúrgica Ortopédica",
        "descripcion": "Problema: En los hospitales de Popayán la planificación de cirugías de fracturas complejas de pelvis, tibia o columna se hace sobre imágenes de tomografía en pantalla, lo que dificulta comprender la geometría tridimensional de la lesión, elegir y premoldear placas de osteosíntesis y explicar el procedimiento al paciente; los biomodelos comerciales son costosos y llegan tarde.\n\nDescripción: Flujo de trabajo abierto que segmenta estructuras óseas a partir de estudios de tomografía anonimizados en formato DICOM, genera mallas corregidas y las imprime en 3D a escala real. El proyecto mide la exactitud dimensional del biomodelo frente a la imagen original, documenta el tiempo y el costo del proceso y evalúa su utilidad percibida con cirujanos y residentes. Solo se usan estudios anonimizados con aval del comité de ética de la institución; el biomodelo es un apoyo de planificación y docencia, no un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Cirugía ortopédica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Imágenes médicas y formato DICOM",
            "Segmentación de imágenes por umbral y crecimiento de regiones",
            "Procesamiento y reparación de mallas 3D",
            "Impresión 3D y control dimensional",
            "Protección de datos personales en salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un flujo de trabajo abierto y de bajo costo para producir biomodelos óseos impresos en 3D a partir de tomografía computarizada como apoyo a la planificación quirúrgica.",
            "📌 Objetivos Específicos:",
            "• Documentar un protocolo reproducible de anonimización, segmentación, reparación de malla e impresión con tiempos y costos por caso.",
            "• Obtener biomodelos con una desviación media inferior a 1 mm frente a la superficie segmentada, medida con calibrador y comparación de mallas.",
            "• Evaluar la utilidad percibida de al menos cinco biomodelos con cirujanos y residentes de ortopedia mediante un cuestionario estructurado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Cirugía ortopédica"
        ],
        "referencias": [
            "Fedorov, A., Beichel, R., Kalpathy-Cramer, J., et al. (2012). 3D Slicer as an image computing platform for the Quantitative Imaging Network. Magnetic Resonance Imaging, 30(9), 1323–1341."
        ],
        "hardware_tabla": [
            {
                "componente": "Computador con tarjeta gráfica dedicada",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta la segmentación y el procesamiento de mallas de alta resolución."
            },
            {
                "componente": "Impresora 3D FDM del laboratorio",
                "categoria": "Equipo de Fabricación",
                "funcion": "Fabrica los biomodelos óseos a escala real."
            },
            {
                "componente": "Filamentos PLA y material de soporte soluble PVA",
                "categoria": "Material",
                "funcion": "Permiten reproducir cavidades y fragmentos óseos con soportes removibles."
            },
            {
                "componente": "Calibrador digital de 0,01 mm",
                "categoria": "Instrumento de Medición",
                "funcion": "Mide distancias anatómicas de referencia en los biomodelos impresos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "3D Slicer",
                "tipo": "Procesamiento de Imágenes Médicas",
                "descripcion": "Anonimización, segmentación de hueso y exportación de mallas STL."
            },
            {
                "herramienta": "Meshmixer",
                "tipo": "Modelado 3D",
                "descripcion": "Reparación, suavizado y separación de fragmentos de las mallas."
            },
            {
                "herramienta": "MeshLab",
                "tipo": "Análisis de Mallas",
                "descripcion": "Comparación de distancias entre la malla segmentada y el biomodelo digitalizado."
            },
            {
                "herramienta": "PrusaSlicer",
                "tipo": "Fabricación",
                "descripcion": "Preparación de la impresión con soportes solubles y orientación óptima."
            }
        ]
    },
    {
        "id": "proj_214",
        "titulo": "🧪 Proyecto 214: Plataforma Microfluídica de Bajo Costo con Bombas de Jeringa Impresas en 3D para Pruebas Colorimétricas",
        "descripcion": "Problema: Los laboratorios de docencia e investigación de la región no cuentan con equipos para trabajar en microfluídica, porque los chips de vidrio o PDMS fabricados en sala limpia y las bombas de jeringa comerciales son costosos; esto impide que estudiantes e investigadores exploren dispositivos de laboratorio en un chip para análisis químicos y biológicos con volúmenes mínimos de muestra.\n\nDescripción: Plataforma compuesta por chips microfluídicos fabricados por corte láser de láminas de PMMA y cinta adhesiva de doble faz, bombas de jeringa impresas en 3D con motores paso a paso controladas por Arduino y una cámara con iluminación LED para medir el color de las reacciones. Se caracteriza la exactitud del caudal por gravimetría, se verifica el régimen laminar y se demuestra una prueba colorimétrica de glucosa o de pH con curvas de calibración analizadas en Python.",
        "area": "Bioingeniería",
        "sector": "Investigación - Laboratorio en un chip",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Mecánica de fluidos a microescala",
            "Fabricación de chips por corte láser y laminado",
            "Control de motores paso a paso",
            "Colorimetría y procesamiento de imágenes",
            "Diseño mecánico e impresión 3D"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una plataforma microfluídica abierta y de bajo costo para el desarrollo de pruebas colorimétricas en laboratorio en un chip.",
            "📌 Objetivos Específicos:",
            "• Fabricar chips con canales de 300 a 500 µm de ancho sin fugas a caudales de hasta 100 µL/min.",
            "• Lograr una exactitud de caudal de ±5 % entre 5 y 100 µL/min en las bombas de jeringa, medida por gravimetría.",
            "• Obtener una curva de calibración colorimétrica con coeficiente de determinación superior a 0,95 en una prueba de glucosa o de pH."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Laboratorio en un chip"
        ],
        "referencias": [
            "Whitesides, G. M. (2006). The origins and the future of microfluidics. Nature, 442(7101), 368–373."
        ],
        "hardware_tabla": [
            {
                "componente": "Láminas de PMMA y cinta adhesiva de doble faz de grado laboratorio",
                "categoria": "Material",
                "funcion": "Forman las capas del chip con los canales microfluídicos."
            },
            {
                "componente": "Cortadora láser de CO2 del laboratorio",
                "categoria": "Equipo de Fabricación",
                "funcion": "Corta los canales y las cámaras de reacción en las láminas."
            },
            {
                "componente": "Arduino Uno con CNC Shield y drivers A4988",
                "categoria": "Microcontrolador",
                "funcion": "Controla de forma independiente dos bombas de jeringa."
            },
            {
                "componente": "Motores paso a paso NEMA 17 con husillo y cuerpo impreso en 3D",
                "categoria": "Actuador",
                "funcion": "Desplazan el émbolo de las jeringas para generar caudales controlados."
            },
            {
                "componente": "Cámara USB con anillo de LED blancos y cámara oscura impresa",
                "categoria": "Sensor Óptico",
                "funcion": "Captura imágenes con iluminación constante para la medición colorimétrica."
            },
            {
                "componente": "Balanza analítica del laboratorio",
                "categoria": "Instrumento de Referencia",
                "funcion": "Verifica el caudal entregado por las bombas mediante gravimetría."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Inkscape",
                "tipo": "Diseño Vectorial",
                "descripcion": "Dibujo de las capas del chip para el corte láser."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Firmware Embebido",
                "descripcion": "Control de caudal y volumen de las bombas por comandos seriales."
            },
            {
                "herramienta": "Python con OpenCV y SciPy",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Extracción de color en las cámaras de reacción y ajuste de curvas de calibración."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño de las bombas de jeringa y de la cámara oscura."
            }
        ]
    },
    {
        "id": "proj_215",
        "titulo": "🧬 Proyecto 215: Máquina de Ensayos de Tracción y Compresión de Bajo Costo para la Caracterización de Biomateriales y Andamios Impresos en 3D",
        "descripcion": "Problema: Los grupos de investigación en biomateriales de la región envían sus muestras de andamios porosos, hidrogeles y polímeros biodegradables a laboratorios externos para ensayos mecánicos, porque las máquinas universales comerciales son costosas y sus rangos de fuerza son demasiado altos para materiales blandos; esto retrasa los proyectos y limita el número de ensayos.\n\nDescripción: Máquina de ensayos de mesa con husillo de bolas, motor paso a paso y celda de carga intercambiable, controlada por un STM32 que adquiere fuerza y desplazamiento y los envía por USB a una aplicación de escritorio. Se implementan ensayos de tracción y compresión a velocidad constante, se calculan módulo elástico, resistencia y deformación a la falla, y se validan los resultados con materiales de referencia y probetas de PLA y PCL impresas en 3D con distintas porosidades.",
        "area": "Bioingeniería",
        "sector": "Investigación - Biomateriales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Mecánica de materiales y ensayos normalizados",
            "Diseño de máquinas y transmisiones de husillo",
            "Acondicionamiento de celdas de carga",
            "Control de posición y velocidad de motores",
            "Análisis de curvas esfuerzo-deformación"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y validar una máquina de ensayos de tracción y compresión de bajo costo para caracterizar biomateriales blandos y andamios impresos en 3D.",
            "📌 Objetivos Específicos:",
            "• Medir fuerzas de 0,1 a 500 N con un error inferior al 1 % de la escala, verificado con pesas patrón.",
            "• Controlar la velocidad del travesaño entre 0,5 y 50 mm/min con un error menor del 2 % medido con un comparador de carátula.",
            "• Comparar el módulo elástico de probetas de PLA y PCL con distintas porosidades frente a los valores obtenidos en un laboratorio externo o reportados en la literatura."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Biomateriales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "STM32F411 (placa Black Pill)",
                "categoria": "Microcontrolador",
                "funcion": "Controla el motor, adquiere fuerza y desplazamiento y transmite los datos por USB."
            },
            {
                "componente": "Celdas de carga de 5 kg y 50 kg con convertidor HX711",
                "categoria": "Sensor de Fuerza",
                "funcion": "Miden la fuerza aplicada en rangos adecuados para materiales blandos y rígidos."
            },
            {
                "componente": "Motor paso a paso NEMA 23 con driver TB6600 y husillo de bolas",
                "categoria": "Actuador",
                "funcion": "Desplaza el travesaño a velocidad constante con alta rigidez."
            },
            {
                "componente": "Perfiles de aluminio, guías lineales y mordazas mecanizadas",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forman el marco de carga y sujetan las probetas."
            },
            {
                "componente": "Encoder óptico lineal y finales de carrera",
                "categoria": "Sensor de Posición",
                "funcion": "Miden el desplazamiento del travesaño y protegen los límites del recorrido."
            },
            {
                "componente": "Pesas patrón y comparador de carátula",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar la fuerza y verificar el desplazamiento."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de control de velocidad, adquisición y comunicación USB."
            },
            {
                "herramienta": "Python con PyQt y pandas",
                "tipo": "Aplicación de Escritorio",
                "descripcion": "Configuración del ensayo, gráfica en tiempo real y exportación de resultados."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del marco de carga, las mordazas y las probetas."
            },
            {
                "herramienta": "GNU Octave",
                "tipo": "Análisis de Datos",
                "descripcion": "Cálculo de módulo elástico, resistencia y deformación a la falla."
            }
        ]
    },
    {
        "id": "proj_216",
        "titulo": "🦵 Proyecto 216: Dispositivo de Movimiento Pasivo Continuo para Rehabilitación de Rodilla con Control Local de Rango y Velocidad",
        "descripcion": "Problema: Después de una reconstrucción de ligamento cruzado o de una artroplastia de rodilla, muchos pacientes de Popayán y de municipios del Cauca no acceden a equipos de movimiento pasivo continuo porque su alquiler es costoso y hay pocas unidades en las clínicas, lo que favorece la rigidez articular y prolonga la recuperación.\n\nDescripción: Dispositivo de movimiento pasivo continuo para rodilla con estructura de aluminio y piezas impresas en 3D, accionado por un motor con reductor y controlado por un Arduino Mega. El fisioterapeuta programa en una pantalla táctil local el rango de flexión, la velocidad y la duración de la sesión; el equipo mide el ángulo con un encoder, detecta resistencia anormal mediante la corriente del motor, se detiene con un pulsador de emergencia y guarda cada sesión en una tarjeta microSD. La validación se hace primero con una pierna mecánica instrumentada y después con voluntarios sanos con consentimiento informado; se trata de un prototipo de apoyo, no de un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Rehabilitación física",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Biomecánica de la articulación de la rodilla",
            "Diseño de mecanismos y cálculo de pares",
            "Control de motores en lazo cerrado",
            "Diseño de funciones de seguridad en equipos de rehabilitación",
            "Diseño de interfaces para profesionales de la salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un prototipo de dispositivo de movimiento pasivo continuo de bajo costo para la rehabilitación de rodilla con control local de rango, velocidad y duración.",
            "📌 Objetivos Específicos:",
            "• Ofrecer un rango de flexión programable de 0° a 110° con un error de posición inferior a 3° medido con goniómetro.",
            "• Detener el movimiento en menos de 200 ms ante el pulsador de emergencia o ante un par resistente superior al umbral configurado.",
            "• Evaluar la comodidad y la usabilidad con al menos cinco fisioterapeutas y diez voluntarios sanos mediante la escala SUS y un cuestionario de comodidad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Rehabilitación física"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Arduino Mega 2560",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el control de posición y velocidad, las funciones de seguridad y la interfaz."
            },
            {
                "componente": "Motor DC de 24 V con reductor sinfín-corona y driver BTS7960",
                "categoria": "Actuador",
                "funcion": "Mueve el carro de la pierna con par suficiente y bloqueo mecánico ante falta de energía."
            },
            {
                "componente": "Encoder rotativo incremental y sensor de corriente ACS712",
                "categoria": "Sensor de Posición",
                "funcion": "Miden el ángulo de la rodilla y detectan resistencia anormal al movimiento."
            },
            {
                "componente": "Pantalla táctil Nextion de 3,5 pulgadas y pulsador de emergencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten programar la sesión y detener el equipo de forma inmediata."
            },
            {
                "componente": "Módulo lector de tarjetas microSD",
                "categoria": "Almacenamiento",
                "funcion": "Registra el ángulo, la velocidad y los eventos de cada sesión."
            },
            {
                "componente": "Perfiles de aluminio, rieles lineales y soportes acolchados impresos en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forman el bastidor ajustable a la longitud del muslo y de la pierna."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Firmware Embebido",
                "descripcion": "Control PID de posición, rampas de velocidad y lógica de seguridad."
            },
            {
                "herramienta": "Nextion Editor",
                "tipo": "Diseño de Interfaz Gráfica",
                "descripcion": "Pantallas de programación de la sesión y de estado del equipo."
            },
            {
                "herramienta": "OpenSim",
                "tipo": "Simulación Biomecánica",
                "descripcion": "Estimación de los pares articulares y de la cinemática de la rodilla durante el movimiento."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del bastidor ajustable y de los soportes de la pierna."
            }
        ]
    }
];
