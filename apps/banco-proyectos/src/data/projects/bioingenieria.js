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
    },
    {
        "id": "proj_257",
        "titulo": "🌡️ Proyecto 257: Banco de Termografía Infrarroja Calibrado con Cuerpo Negro y Fantoma de Inclusiones Calientes para Evaluar Algoritmos de Análisis de Asimetrías Térmicas",
        "descripcion": "Problema: Los servicios de salud del Cauca empiezan a usar cámaras térmicas para apoyar la detección de procesos inflamatorios, pero casi nunca verifican su exactitud: la temperatura medida depende de la emisividad, la distancia y el ambiente, y no existe un banco local para calibrarlas ni un fantoma para comparar algoritmos, así que los hallazgos térmicos son difíciles de reproducir.\n\nDescripción: Banco de adquisición que combina una cámara infrarroja radiométrica de 160 × 120 píxeles conectada por USB a un computador, un cuerpo negro de placa con control PID mediante celdas Peltier y sensor PT100 como referencia, y un fantoma de silicona y agar con resistencias calefactoras que simulan inclusiones inflamatorias a distintas profundidades. Un programa en Python corrige la emisividad, calcula mapas de diferencia térmica entre zonas contralaterales y compara un umbral adaptativo con una red U-Net pequeña entrenada en el computador del laboratorio con las imágenes del fantoma, usando Dice como métrica. Es un banco de caracterización y no un equipo de diagnóstico; las pruebas con voluntarios sanos, solo para verificar el protocolo, se hacen bajo consentimiento informado.",
        "area": "Bioingeniería",
        "sector": "Salud - Termografía clínica",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Termografía infrarroja y radiometría básica",
            "Calibración con una fuente de cuerpo negro",
            "Control PID de temperatura con celdas Peltier",
            "Fabricación de fantomas térmicos con inclusiones",
            "Segmentación de imágenes con U-Net en PyTorch",
            "Análisis de incertidumbre de medición"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir y validar un banco de termografía infrarroja con referencia de cuerpo negro y fantoma de inclusiones calientes que permita calibrar cámaras y comparar algoritmos de análisis de asimetrías térmicas.",
            "📌 Objetivos Específicos:",
            "• Calibrar la cámara entre 25 °C y 42 °C con un error absoluto inferior a 0,5 °C frente al sensor PT100 del cuerpo negro, corrigiendo emisividad y distancia.",
            "• Fabricar un fantoma con tres inclusiones calefactadas a 3, 6 y 10 mm de profundidad y determinar la diferencia mínima de temperatura detectable en cada una.",
            "• Entrenar una U-Net con al menos 300 imágenes del fantoma y compararla con un umbral adaptativo mediante el coeficiente de Dice, buscando un valor superior a 0,80."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Termografía clínica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Cámara infrarroja FLIR Lepton 3.5 con placa PureThermal 2",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura imágenes radiométricas de 160 × 120 píxeles y las entrega por USB al computador."
            },
            {
                "componente": "Cuerpo negro de placa de aluminio con recubrimiento de alta emisividad",
                "categoria": "Instrumento de Referencia",
                "funcion": "Ofrece una superficie isoterma de emisividad conocida para calibrar la cámara."
            },
            {
                "componente": "Celdas Peltier TEC1-12706, driver MOSFET y sensor PT100 con MAX31865",
                "categoria": "Control Térmico",
                "funcion": "Regulan la temperatura del cuerpo negro con control PID y la miden con exactitud."
            },
            {
                "componente": "Fantoma de silicona y agar con resistencias calefactoras",
                "categoria": "Material",
                "funcion": "Simula tejido con inclusiones a distintas profundidades y diferencias térmicas conocidas."
            },
            {
                "componente": "Arduino Nano y fuente de laboratorio regulada",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el lazo de control y alimenta las resistencias de las inclusiones."
            },
            {
                "componente": "Computador con tarjeta gráfica del laboratorio",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena la red de segmentación y ejecuta el análisis de las imágenes térmicas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV y NumPy",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Corrección de emisividad, registro de imágenes y mapas de asimetría térmica."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y evaluación local de la U-Net que segmenta las inclusiones."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Firmware Embebido",
                "descripcion": "Control PID de la temperatura del cuerpo negro y registro de las lecturas."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del molde del fantoma y de la carcasa del cuerpo negro."
            }
        ]
    },
    {
        "id": "proj_258",
        "titulo": "🧠 Proyecto 258: Segmentación Local de Tumores Cerebrales en Resonancia Magnética con nnU-Net y MONAI para Producir Biomodelos 3D de Planificación Neuroquirúrgica",
        "descripcion": "Problema: Los neurocirujanos y radiólogos de la región planifican la resección de tumores cerebrales sobre cortes de resonancia que deben interpretar mentalmente en tres dimensiones, y la segmentación manual de cada caso toma más de una hora; los programas comerciales de planificación y los biomodelos importados son costosos y los hospitales de baja complejidad rara vez los tienen.\n\nDescripción: Flujo de trabajo que entrena localmente una red 3D U-Net con nnU-Net y MONAI sobre la tarea de tumor cerebral del Medical Segmentation Decathlon, derivada de BraTS, que reúne 484 resonancias multiparamétricas anonimizadas de acceso público. El modelo segmenta el edema, el tumor sin realce y el tumor con realce, y se evalúa con el coeficiente de Dice y la distancia de Hausdorff al percentil 95. Las máscaras se convierten en mallas en 3D Slicer y se imprimen a escala junto con la superficie cerebral extraída de las mismas imágenes para revisar la lesión de forma táctil. La inferencia se ejecuta en el computador del laboratorio sin sacar las imágenes de él. Es un prototipo de apoyo a la docencia y la planificación, no un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Neurocirugía",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Imágenes de resonancia magnética multiparamétrica",
            "Segmentación 3D con U-Net en MONAI y nnU-Net",
            "Métricas de segmentación: Dice y distancia de Hausdorff",
            "Procesamiento de mallas y modelado para impresión 3D",
            "Formatos DICOM y NIfTI y protección de datos de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar y evaluar un flujo local de segmentación automática de tumores cerebrales en resonancia magnética que genere biomodelos impresos en 3D como apoyo a la docencia y la planificación neuroquirúrgica.",
            "📌 Objetivos Específicos:",
            "• Entrenar una red 3D U-Net con validación cruzada de cinco particiones y alcanzar un Dice medio superior a 0,80 en el núcleo tumoral y una distancia de Hausdorff al percentil 95 inferior a 8 mm.",
            "• Reducir a menos de 10 minutos por caso el tiempo desde el volumen de resonancia hasta la malla corregida, frente a la segmentación manual de referencia en 3D Slicer.",
            "• Imprimir al menos cinco biomodelos con una desviación dimensional inferior a 1,5 mm frente a la malla digital y evaluar su utilidad con profesionales mediante un cuestionario estructurado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Neurocirugía"
        ],
        "referencias": [
            "Antonelli, M., Reinke, A., Bakas, S., et al. (2022). The Medical Segmentation Decathlon. Nature Communications, 13, 4128.",
            "Isensee, F., Jaeger, P. F., Kohl, S. A. A., Petersen, J., & Maier-Hein, K. H. (2021). nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation. Nature Methods, 18(2), 203–211."
        ],
        "hardware_tabla": [
            {
                "componente": "Computador con GPU NVIDIA de 12 GB de memoria",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena la red 3D y ejecuta la inferencia local sobre los volúmenes de resonancia."
            },
            {
                "componente": "Impresora 3D FDM del laboratorio",
                "categoria": "Equipo de Fabricación",
                "funcion": "Fabrica los biomodelos del tumor y de la superficie cerebral a escala."
            },
            {
                "componente": "Filamento PETG translúcido y PLA de varios colores",
                "categoria": "Material",
                "funcion": "Permiten diferenciar el edema, el núcleo tumoral y el tumor con realce en el biomodelo."
            },
            {
                "componente": "Calibrador digital de 0,01 mm",
                "categoria": "Instrumento de Medición",
                "funcion": "Mide las dimensiones de referencia de los biomodelos para el control dimensional."
            },
            {
                "componente": "Disco externo cifrado",
                "categoria": "Almacenamiento",
                "funcion": "Guarda los volúmenes anonimizados y los modelos entrenados dentro del laboratorio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MONAI",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la red 3D, aumento de datos y cálculo de métricas de segmentación."
            },
            {
                "herramienta": "nnU-Net",
                "tipo": "Framework de Segmentación",
                "descripcion": "Configuración automática de la red de referencia y comparación con el modelo propio."
            },
            {
                "herramienta": "3D Slicer",
                "tipo": "Procesamiento de Imágenes Médicas",
                "descripcion": "Visualización, corrección manual de máscaras y exportación de mallas STL."
            },
            {
                "herramienta": "PrusaSlicer",
                "tipo": "Fabricación",
                "descripcion": "Preparación de la impresión por color y por material de cada estructura."
            }
        ]
    },
    {
        "id": "proj_259",
        "titulo": "📏 Proyecto 259: Fantoma Modular de Agarosa y Acrílico con Insertos de Densidad y Relajación para el Control de Calidad de Tomografía y Resonancia Magnética",
        "descripcion": "Problema: Los equipos de tomografía y resonancia de la región se verifican con fantomas comerciales importados, que cuestan miles de dólares y casi nunca se prestan para docencia; por eso los estudiantes de radiología y bioingeniería rara vez miden la linealidad de las unidades Hounsfield, la resolución espacial o la uniformidad, y el control de calidad depende de pocos técnicos.\n\nDescripción: Fantoma cilíndrico de acrílico relleno de agua o de agarosa con insertos intercambiables: cilindros con soluciones de fosfato dipotásico que simulan densidades de hueso en tomografía, agarosa dopada con cloruro de manganeso para obtener tiempos de relajación T1 y T2 en resonancia, y una placa impresa en 3D con patrones de pares de líneas para la resolución espacial. Los estudios se adquieren en el servicio de radiología de una institución aliada y se analizan con Python y 3D Slicer, con un detector automático de insertos basado en la transformada de Hough. Es un fantoma didáctico de verificación y no reemplaza el control de calidad certificado del equipo.",
        "area": "Bioingeniería",
        "sector": "Salud - Control de calidad en radiología",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Física de la tomografía y unidades Hounsfield",
            "Relajación T1 y T2 en resonancia magnética",
            "Preparación de materiales equivalentes a tejido",
            "Lectura y análisis de imágenes DICOM con Python",
            "Control de calidad en imagen diagnóstica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar, fabricar y caracterizar un fantoma modular de bajo costo que permita verificar la calidad de imagen en tomografía computarizada y resonancia magnética con fines docentes.",
            "📌 Objetivos Específicos:",
            "• Obtener una relación lineal entre la concentración de fosfato dipotásico y los números Hounsfield medidos, con coeficiente de determinación superior a 0,98 entre 0 y 600 HU.",
            "• Ajustar tiempos de relajación T1 entre 300 y 1 500 ms y T2 entre 40 y 200 ms con al menos cinco concentraciones de manganeso, verificados con secuencias de resonancia.",
            "• Detectar automáticamente los insertos y medir la uniformidad de la imagen con un error de posición menor de 1 mm, y comparar los resultados con la medición manual de dos observadores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Control de calidad en radiología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Cilindro de acrílico con tapas roscadas y bastidor de insertos",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Aloja el medio de relleno y mantiene los insertos en posiciones conocidas."
            },
            {
                "componente": "Soluciones de fosfato dipotásico y agarosa dopada con cloruro de manganeso",
                "categoria": "Material",
                "funcion": "Reproducen densidades y tiempos de relajación equivalentes a hueso y tejido blando."
            },
            {
                "componente": "Placa de pares de líneas impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Permite evaluar la resolución espacial en los cortes axiales."
            },
            {
                "componente": "Balanza de precisión y agitador magnético con calefacción",
                "categoria": "Equipo de Laboratorio",
                "funcion": "Garantizan concentraciones y mezclas repetibles en cada inserto."
            },
            {
                "componente": "Tomógrafo y resonador de una institución aliada",
                "categoria": "Instrumento de Referencia",
                "funcion": "Adquieren los estudios del fantoma con los protocolos de rutina del servicio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "3D Slicer",
                "tipo": "Procesamiento de Imágenes Médicas",
                "descripcion": "Visualización de los estudios y medición de regiones de interés en los insertos."
            },
            {
                "herramienta": "Python con pydicom y scikit-image",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Lectura DICOM, transformada de Hough, uniformidad y regresión de calibración."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del bastidor de insertos y de la placa de pares de líneas."
            },
            {
                "herramienta": "ImageJ (Fiji)",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Medición manual de contraste y resolución para comparar con el análisis automático."
            }
        ]
    },
    {
        "id": "proj_260",
        "titulo": "📈 Proyecto 260: Amplificador de EEG de Ocho Canales con Electrodos Secos y Eliminación de Artefactos mediante Autoencoder Convolucional en Raspberry Pi 5",
        "descripcion": "Problema: La electroencefalografía clínica en el Cauca depende de pocos equipos concentrados en Popayán, y los registros fuera del consultorio se contaminan con parpadeos, movimiento y ruido de la red eléctrica que obligan a repetir exámenes; los amplificadores comerciales con electrodos secos y procesamiento integrado son costosos y no permiten estudiar cómo se limpia la señal.\n\nDescripción: Amplificador de ocho canales con el convertidor simultáneo ADS131M08, preamplificadores INA333 y circuito de pierna derecha, conectado por SPI a una Raspberry Pi 5 con pantalla local. La señal se limpia con un autoencoder convolucional 1D entrenado en el computador del laboratorio con el conjunto público EEGdenoiseNet, que mezcla EEG limpio con artefactos oculares y musculares; el modelo exportado a ONNX se ejecuta en la Raspberry Pi sobre ventanas de dos segundos. La mejora se mide con la relación señal-ruido y la correlación con la señal limpia, y se verifica con registros de voluntarios sanos bajo consentimiento informado. Es un prototipo de investigación, no un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Neurofisiología clínica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación biomédica para señales de EEG",
            "Electrodos secos e impedancia de contacto",
            "Diseño de PCB de señal mixta de bajo ruido",
            "Redes neuronales convolucionales 1D para señales",
            "Despliegue de modelos con ONNX Runtime en Raspberry Pi"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un amplificador de EEG de ocho canales con electrodos secos y evaluar un autoencoder convolucional que elimine artefactos de forma local en una Raspberry Pi 5.",
            "📌 Objetivos Específicos:",
            "• Lograr un ruido referido a la entrada inferior a 1,5 µV RMS entre 0,5 y 45 Hz y un rechazo de modo común superior a 100 dB a 60 Hz.",
            "• Entrenar el autoencoder con EEGdenoiseNet y mejorar la relación señal-ruido en al menos 5 dB frente al filtrado clásico en artefactos oculares y musculares.",
            "• Ejecutar la inferencia en la Raspberry Pi 5 con una latencia inferior a 50 ms por ventana de dos segundos y verificarla con al menos diez voluntarios sanos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Neurofisiología clínica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Convertidor ADS131M08 con preamplificadores INA333",
                "categoria": "Convertidor Analógico-Digital",
                "funcion": "Amplifican y digitalizan de forma simultánea ocho canales de EEG."
            },
            {
                "componente": "Raspberry Pi 5 con pantalla táctil de 7 pulgadas",
                "categoria": "Computador de Placa Única",
                "funcion": "Adquiere por SPI, ejecuta el modelo de limpieza y muestra la señal en pantalla local."
            },
            {
                "componente": "Electrodos secos de pines flexibles y diadema impresa en 3D",
                "categoria": "Sensor Biomédico",
                "funcion": "Registran el EEG sin gel y se ajustan a distintas formas de cabeza."
            },
            {
                "componente": "Batería LiPo con convertidor DC-DC aislado de bajo ruido",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el amplificador sin acoplar el ruido de la red eléctrica."
            },
            {
                "componente": "Simulador de señales biológicas y generador de funciones",
                "categoria": "Instrumento de Referencia",
                "funcion": "Entregan señales conocidas para medir ruido, ganancia y rechazo de modo común."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "KiCad",
                "tipo": "Diseño de Circuitos Impresos",
                "descripcion": "Diseño de la PCB de señal mixta con planos de tierra analógico y digital separados."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del autoencoder convolucional 1D con EEGdenoiseNet."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo exportado en la Raspberry Pi 5 con baja latencia."
            },
            {
                "herramienta": "MNE-Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado clásico de referencia, análisis espectral y visualización del EEG."
            }
        ]
    },
    {
        "id": "proj_261",
        "titulo": "🫁 Proyecto 261: Banco de Pruebas para Ventiladores Mecánicos con Pulmón de Ensayo de Distensibilidad y Resistencia Ajustables y Analizador de Flujo y Presión",
        "descripcion": "Problema: Los hospitales de baja complejidad del Cauca mantienen ventiladores mecánicos y equipos de anestesia que rara vez se verifican entre mantenimientos, porque los analizadores de flujo de gas y los pulmones de prueba comerciales son costosos y están en pocas ciudades; un volumen corriente o una presión positiva fuera de tolerancia puede pasar inadvertido y afectar a pacientes críticos.\n\nDescripción: Banco de pruebas con un pulmón de ensayo de fuelle de distensibilidad ajustable entre 20 y 100 mL/cmH2O y resistencias de orificio intercambiables, un sensor de presión diferencial SDP810 sobre un tubo de Venturi impreso en 3D para medir el flujo y un sensor de presión en la vía aérea, ambos leídos por un STM32 que envía las muestras por USB a un programa en Python. El programa integra el flujo para calcular volumen corriente, frecuencia, PEEP, presión pico y relación I:E, y los compara con los valores programados en el ventilador y con una jeringa de calibración de 3 L. Se inspira en los métodos de ensayo de la norma ISO 80601-2-12, pero es un instrumento de apoyo al mantenimiento y no un analizador certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Terapia respiratoria",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Mecánica respiratoria: distensibilidad y resistencia",
            "Medición de flujo por presión diferencial",
            "Diseño de pulmones de ensayo y tubos de Venturi",
            "Calibración con jeringa de volumen conocido",
            "Adquisición de datos en tiempo real con USB"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un banco de pruebas de bajo costo que mida los parámetros de ventilación mecánica y verifique la exactitud de ventiladores mediante un pulmón de ensayo ajustable.",
            "📌 Objetivos Específicos:",
            "• Medir volúmenes corrientes entre 200 y 800 mL con un error inferior al 5 % frente a una jeringa de calibración de 3 L.",
            "• Medir presiones de 0 a 40 cmH2O con un error inferior a ±1 cmH2O frente a un manómetro de referencia y calcular la PEEP y la presión pico de cada ciclo.",
            "• Ensayar un ventilador con al menos nueve combinaciones de distensibilidad y resistencia y generar un informe de desviaciones frente a los valores programados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Terapia respiratoria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Sensor de presión diferencial SDP810 con tubo de Venturi impreso en 3D",
                "categoria": "Sensor de Flujo",
                "funcion": "Mide el flujo de gas en la vía aérea del pulmón de ensayo."
            },
            {
                "componente": "Sensor de presión manométrica MPX5010DP",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la presión en la vía aérea para obtener la PEEP y la presión pico."
            },
            {
                "componente": "STM32F411 (placa Black Pill)",
                "categoria": "Microcontrolador",
                "funcion": "Muestrea ambos sensores a 200 Hz y transmite los datos por USB."
            },
            {
                "componente": "Pulmón de fuelle con muelles ajustables y resistencias de orificio impresas en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Reproduce distintas distensibilidades y resistencias respiratorias."
            },
            {
                "componente": "Jeringa de calibración de 3 L y manómetro de referencia",
                "categoria": "Instrumento de Referencia",
                "funcion": "Verifican el volumen y la presión medidos por el banco."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de muestreo, compensación de temperatura y comunicación USB."
            },
            {
                "herramienta": "Python con SciPy y PyQtGraph",
                "tipo": "Análisis de Datos",
                "descripcion": "Integración del flujo, detección de ciclos y cálculo de volumen, PEEP y relación I:E."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del tubo de Venturi, de las resistencias y del fuelle del pulmón."
            },
            {
                "herramienta": "KiCad",
                "tipo": "Diseño de Circuitos Impresos",
                "descripcion": "Placa de acondicionamiento de los sensores y de alimentación."
            }
        ]
    },
    {
        "id": "proj_262",
        "titulo": "🔌 Proyecto 262: Analizador de Seguridad Eléctrica y Corriente de Fuga para Equipos Biomédicos con Red de Cuerpo Humano y Registro Local de Informes",
        "descripcion": "Problema: En muchos hospitales del Cauca los equipos biomédicos se usan durante años sin una medición periódica de la resistencia de tierra y de las corrientes de fuga, porque los analizadores de seguridad eléctrica comerciales son costosos y su calibración se hace fuera de la región; un fallo de aislamiento puede causar descargas a pacientes conectados a monitores, electrobisturís o bombas.\n\nDescripción: Analizador con dos módulos: una medición de la resistencia del conductor de protección con una corriente continua de 200 mA a cuatro hilos y una medición de corriente de fuga de chasis, de paciente y de tierra a través de una red de 1 kΩ en serie con el paralelo de 10 kΩ y 15 nF, que representa al cuerpo humano, seguida de un convertidor de valor eficaz. Un microcontrolador muestra los resultados en una pantalla local, los guarda en una tarjeta microSD y genera un informe por equipo. Las pruebas se hacen con un transformador de aislamiento y equipos de práctica, siempre con supervisión docente, y se comparan con un analizador comercial de un hospital aliado. Es una herramienta didáctica de apoyo al mantenimiento, no sustituye la verificación certificada.",
        "area": "Bioingeniería",
        "sector": "Ingeniería clínica - Seguridad eléctrica hospitalaria",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Seguridad eléctrica de equipos médicos (IEC 62353)",
            "Medición de corrientes de fuga con valor eficaz",
            "Mediciones a cuatro hilos de baja resistencia",
            "Aislamiento galvánico y trabajo seguro con tensión de red",
            "Gestión de mantenimiento y trazabilidad de equipos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y verificar un analizador de seguridad eléctrica de bajo costo que mida la resistencia de tierra y las corrientes de fuga de equipos biomédicos y registre los resultados por equipo.",
            "📌 Objetivos Específicos:",
            "• Medir la resistencia del conductor de protección entre 0,05 y 2 Ω con un error inferior al 5 % frente a resistencias patrón de baja tolerancia.",
            "• Medir corrientes de fuga entre 10 µA y 5 mA con un error inferior al 5 %, verificado con inyección de corriente a 50 y 60 Hz.",
            "• Evaluar al menos diez equipos de práctica y comparar los resultados con los de un analizador comercial de un hospital aliado, con diferencias menores al 10 %."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ingeniería clínica - Seguridad eléctrica hospitalaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "STM32 Nucleo-G431RB",
                "categoria": "Microcontrolador",
                "funcion": "Mide las señales acondicionadas y ejecuta la secuencia de ensayos."
            },
            {
                "componente": "Convertidor de valor eficaz AD736 con amplificador de precisión",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Convierte la tensión de la red de medición en una señal proporcional a la corriente."
            },
            {
                "componente": "Red de cuerpo humano con resistencias de película metálica al 0.1 % y capacitor de 15 nF",
                "categoria": "Instrumento de Medición",
                "funcion": "Reproduce la impedancia del cuerpo humano que fija la norma para las corrientes de fuga."
            },
            {
                "componente": "Fuente de corriente de 200 mA con medición a cuatro hilos",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Hace circular la corriente de ensayo por el conductor de protección y mide su caída."
            },
            {
                "componente": "Transformador de aislamiento de 1 kVA y toma de prueba con protección diferencial",
                "categoria": "Seguridad Eléctrica",
                "funcion": "Separan el banco de la red y reducen el riesgo para quien opera."
            },
            {
                "componente": "Pantalla TFT, tarjeta microSD y carcasa aislante impresa en 3D",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestran el resultado y guardan el informe de cada equipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Secuencia de ensayos, lectura del convertidor y escritura de registros en la tarjeta."
            },
            {
                "herramienta": "KiCad",
                "tipo": "Diseño de Circuitos Impresos",
                "descripcion": "Diseño de la placa de medición con separación de las zonas de tensión de red."
            },
            {
                "herramienta": "LTspice",
                "tipo": "Simulación de Circuitos",
                "descripcion": "Verificación de la respuesta en frecuencia de la red de cuerpo humano."
            },
            {
                "herramienta": "Python con pandas y ReportLab",
                "tipo": "Análisis de Datos",
                "descripcion": "Generación del informe por equipo y de la hoja de vida de mantenimiento."
            }
        ]
    },
    {
        "id": "proj_263",
        "titulo": "⚗️ Proyecto 263: Biorreactor de Perfusión con Control Local de Temperatura, pH y Caudal para el Cultivo Dinámico de Andamios de Ingeniería de Tejidos",
        "descripcion": "Problema: Los grupos de investigación de la región que desarrollan andamios para regenerar hueso o cartílago cultivan sus muestras en condiciones estáticas, porque los biorreactores de perfusión comerciales cuestan decenas de miles de dólares; sin flujo, el interior de los andamios porosos recibe pocos nutrientes y los resultados de los cultivos son poco reproducibles.\n\nDescripción: Biorreactor de perfusión con cámara de acrílico y soportes impresos en 3D que aloja andamios cilíndricos, una bomba peristáltica de caudal controlado y un reservorio de medio con calentamiento regulado a 37 °C. Un microcontrolador Teensy mantiene la temperatura con un lazo PID, mide el pH con una sonda y su circuito de acondicionamiento, controla el caudal entre 0,1 y 5 mL/min y registra los datos en una tarjeta microSD, con alarmas locales por desviación. Se emplea medio tamponado con HEPES, que no exige atmósfera de CO2, y se valida primero sin células con un colorante trazador. Los ensayos con células solo se harán, si procede, en un laboratorio con bioseguridad avalada.",
        "area": "Bioingeniería",
        "sector": "Investigación - Ingeniería de tejidos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Principios de cultivo celular dinámico y perfusión",
            "Control PID de temperatura y caudal",
            "Medición y calibración de pH",
            "Diseño de cámaras de cultivo con materiales biocompatibles",
            "Bioseguridad y desinfección en el laboratorio"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y validar un biorreactor de perfusión de bajo costo con control local de temperatura, pH y caudal para el cultivo dinámico de andamios de ingeniería de tejidos.",
            "📌 Objetivos Específicos:",
            "• Mantener la temperatura del medio en 37 ± 0,5 °C durante 72 horas continuas, medida con un termómetro de referencia calibrado.",
            "• Medir el pH con un error inferior a 0,1 unidades tras una calibración de dos puntos y activar una alarma local cuando se desvíe más de 0,3 unidades.",
            "• Lograr un caudal entre 0,1 y 5 mL/min con un error inferior al 5 % por gravimetría y demostrar la perfusión homogénea de andamios impresos con un colorante trazador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Ingeniería de tejidos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teensy 4.1",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta los lazos PID, las alarmas y el registro de datos de cada sesión."
            },
            {
                "componente": "Cámara de acrílico con soportes de PETG y juntas de silicona",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Aloja los andamios y se desinfecta con etanol al 70 % entre ensayos."
            },
            {
                "componente": "Bomba peristáltica con motor paso a paso y tubo de silicona",
                "categoria": "Actuador",
                "funcion": "Hace circular el medio entre el reservorio y la cámara con caudal controlado."
            },
            {
                "componente": "Sonda de pH con acondicionador de alta impedancia",
                "categoria": "Sensor Químico",
                "funcion": "Mide el pH del medio de cultivo en el circuito de perfusión."
            },
            {
                "componente": "Calefactor flexible de silicona con sensor PT100 y MAX31865",
                "categoria": "Control Térmico",
                "funcion": "Calienta el reservorio y mide su temperatura con precisión."
            },
            {
                "componente": "Termómetro de referencia y balanza analítica",
                "categoria": "Instrumento de Referencia",
                "funcion": "Verifican la temperatura y el caudal entregados por el biorreactor."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE con Teensyduino",
                "tipo": "Firmware Embebido",
                "descripcion": "Lazos PID de temperatura y caudal, lectura de pH y registro en la tarjeta microSD."
            },
            {
                "herramienta": "Python con PyQtGraph",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Visualización local de las curvas y exportación de las sesiones por USB."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño de la cámara de cultivo, los soportes de andamios y el reservorio."
            },
            {
                "herramienta": "ImageJ (Fiji)",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Cuantificación de la distribución del colorante trazador dentro de los andamios."
            }
        ]
    },
    {
        "id": "proj_264",
        "titulo": "👁️ Proyecto 264: Queratómetro de Discos de Plácido Impreso en 3D con Cámara y Calibración con Esferas de Acero para el Tamizaje de Astigmatismo Corneal",
        "descripcion": "Problema: En las zonas rurales del Cauca muchas personas con astigmatismo o con queratocono incipiente nunca reciben un diagnóstico, porque los queratómetros y topógrafos corneales están en pocos consultorios de optometría y cuestan millones de pesos; la baja visión sin corregir afecta el rendimiento escolar y laboral, y el queratocono suele detectarse cuando ya hay pérdida visual.\n\nDescripción: Queratómetro con un disco de Plácido de anillos concéntricos impreso en 3D e iluminado con LED de baja intensidad, una cámara con lente macro y un apoyo de mentón y frente. El programa en Python detecta los anillos reflejados en la córnea, ajusta elipses para obtener el radio de curvatura y el eje de los meridianos principales y calcula las queratometrías y el astigmatismo corneal. Se calibra con esferas de acero de radios conocidos y un ojo artificial tórico, y se compara con el autoqueratómetro de una clínica optométrica aliada en voluntarios que dan su consentimiento informado. Es un prototipo de apoyo al tamizaje, no un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud visual - Optometría y queratometría",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Óptica de la córnea y queratometría",
            "Diseño óptico de discos de Plácido",
            "Detección de anillos y ajuste de elipses con OpenCV",
            "Calibración con superficies esféricas de radio conocido",
            "Diseño mecánico de apoyos ergonómicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y calibrar un queratómetro de discos de Plácido de bajo costo que estime el radio de curvatura corneal y el astigmatismo como apoyo al tamizaje visual.",
            "📌 Objetivos Específicos:",
            "• Medir el radio de curvatura de esferas de acero entre 7 y 8,5 mm con un error inferior a 0,05 mm, equivalente a menos de 0,25 dioptrías.",
            "• Determinar el eje del astigmatismo con un error inferior a 10° y la potencia cilíndrica con un error inferior a 0,5 dioptrías sobre superficies tóricas de referencia.",
            "• Comparar las queratometrías de al menos 30 ojos de voluntarios con las de un autoqueratómetro comercial mediante análisis de Bland-Altman."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud visual - Optometría y queratometría"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Disco de Plácido de anillos concéntricos impreso en 3D con LED difusos",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Proyecta los anillos de referencia sobre la superficie de la córnea."
            },
            {
                "componente": "Cámara USB con lente macro de enfoque fijo",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura los anillos reflejados con resolución suficiente para medir su forma."
            },
            {
                "componente": "Apoyo de mentón y frente con ajuste micrométrico impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Posiciona la cabeza a la distancia de trabajo con buena repetibilidad."
            },
            {
                "componente": "Esferas de acero de rodamiento de radios conocidos y ojo artificial tórico",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar y verificar el radio y la potencia medidos."
            },
            {
                "componente": "Raspberry Pi 4 con pantalla local de 7 pulgadas",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el análisis de imagen y muestra las queratometrías al operador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV y SciPy",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Detección de anillos, ajuste de elipses y cálculo de queratometrías y eje."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del disco de Plácido, del apoyo de mentón y de la carcasa."
            },
            {
                "herramienta": "PyQt",
                "tipo": "Aplicación de Escritorio",
                "descripcion": "Interfaz de captura, resultados y exportación del informe de cada medición."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Análisis de Datos",
                "descripcion": "Gráficos de Bland-Altman y análisis de repetibilidad de las mediciones."
            }
        ]
    },
    {
        "id": "proj_265",
        "titulo": "🔊 Proyecto 265: Densitómetro Óseo Ultrasónico de Transmisión para Calcáneo con Medición de Velocidad del Sonido y Atenuación de Banda Ancha",
        "descripcion": "Problema: La osteoporosis en mujeres posmenopáusicas y adultos mayores del Cauca se diagnostica tarde, porque la densitometría con rayos X solo está en unos pocos centros urbanos y es costosa; la fractura de cadera por fragilidad suele ser la primera señal. Un método de tamizaje sin radiación, portátil y económico ayudaría a priorizar a quién remitir.\n\nDescripción: Equipo de ultrasonido cuantitativo de transmisión con dos transductores de 500 kHz enfrentados a ambos lados de un baño de agua termostatizado donde se coloca el talón o una muestra. Un generador de pulsos y un amplificador de recepción envían la señal a un osciloscopio USB; un programa en Python calcula la velocidad del sonido, la atenuación de banda ancha y un índice combinado de ambos parámetros, tomando como referencia la señal en agua. Se calibra con bloques de acrílico y fantomas de resina epóxica con carga mineral y se prueba con fragmentos de hueso bovino de la industria cárnica; la medición en personas queda fuera del alcance del semestre. Es un instrumento de caracterización, no un dispositivo médico certificado.",
        "area": "Bioingeniería",
        "sector": "Salud - Salud ósea y osteoporosis",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Física del ultrasonido en hueso y tejidos",
            "Electrónica de pulsadores y receptores ultrasónicos",
            "Medición de tiempo de vuelo y atenuación espectral",
            "Procesamiento de señales con la transformada de Fourier",
            "Diseño de montajes mecánicos con alineación precisa"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir y caracterizar un equipo de ultrasonido de transmisión de bajo costo que mida la velocidad del sonido y la atenuación en hueso como base para el tamizaje de la salud ósea.",
            "📌 Objetivos Específicos:",
            "• Medir la velocidad del sonido en bloques de acrílico y de resina epóxica con un error inferior al 1 % frente a valores de referencia y un coeficiente de variación menor al 1,5 %.",
            "• Obtener la pendiente de atenuación entre 200 y 800 kHz con una variabilidad menor al 5 % en diez repeticiones con reposicionamiento de la muestra.",
            "• Diferenciar al menos tres fantomas de distinta densidad mineral y muestras de hueso bovino mediante el índice combinado, con una diferencia significativa (p < 0,05)."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Salud ósea y osteoporosis"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Transductores ultrasónicos de contacto de 500 kHz",
                "categoria": "Transductor Ultrasónico",
                "funcion": "Emiten y reciben los pulsos que atraviesan la muestra dentro del baño de agua."
            },
            {
                "componente": "Generador de pulsos de alta tensión y amplificador de recepción de bajo ruido",
                "categoria": "Acondicionamiento de Señal",
                "funcion": "Excitan el transductor emisor y amplifican el eco antes de digitalizarlo."
            },
            {
                "componente": "Osciloscopio USB de 100 MS/s",
                "categoria": "Instrumento de Medición",
                "funcion": "Digitaliza los pulsos recibidos y entrega las formas de onda al computador."
            },
            {
                "componente": "Baño de agua de acrílico con calefactor y sensor de temperatura",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Acopla los transductores a la muestra y mantiene la temperatura estable a 37 °C."
            },
            {
                "componente": "Bloques de acrílico, fantomas de epóxica con carga mineral y hueso bovino",
                "categoria": "Material",
                "funcion": "Sirven como patrones de calibración y como muestras de ensayo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con NumPy y SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Tiempo de vuelo por correlación cruzada y atenuación por espectro de potencia."
            },
            {
                "herramienta": "PyQtGraph",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Visualización en vivo de la forma de onda y de los parámetros calculados."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del bastidor de los transductores con alineación coaxial."
            },
            {
                "herramienta": "GNU Octave",
                "tipo": "Análisis de Datos",
                "descripcion": "Análisis estadístico de repetibilidad y comparación entre fantomas."
            }
        ]
    },
    {
        "id": "proj_266",
        "titulo": "🖨️ Proyecto 266: Bioimpresora de Extrusión de Hidrogeles Adaptada de una Impresora 3D con Modelo Local de Aprendizaje Automático para Predecir el Ancho de Línea",
        "descripcion": "Problema: Los grupos de investigación en ingeniería de tejidos de la región no pueden explorar la bioimpresión porque las bioimpresoras comerciales cuestan decenas de miles de dólares, y ajustar la presión, la velocidad y la concentración del hidrogel por ensayo y error consume mucho material y semanas de trabajo con cada formulación nueva.\n\nDescripción: Impresora cartesiana de bajo costo modificada con un cabezal de extrusión de pistón para jeringas de 5 mL, que deposita hidrogeles de alginato y gelatina sin células, entrecruzados con cloruro de calcio. Una cámara USB fotografía cada línea impresa y un programa en Python mide el ancho del filamento y el índice de imprimibilidad. Con al menos 200 ensayos a distintas presiones, velocidades y concentraciones se entrena localmente un regresor de bosque aleatorio con scikit-learn que predice el ancho de línea y sugiere parámetros; su error se evalúa con validación cruzada y con impresiones nuevas. Es un banco de caracterización de materiales: no se imprimen células ni se usa con pacientes.",
        "area": "Bioingeniería",
        "sector": "Investigación - Bioimpresión 3D",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Reología básica y entrecruzamiento de hidrogeles",
            "Modificación de impresoras 3D con cabezales de extrusión",
            "Índice de imprimibilidad y medición de filamentos",
            "Regresión con bosques aleatorios en scikit-learn",
            "Diseño de experimentos y validación cruzada"
        ],
        "objetivos": [
            "🎯 Objetivo General: Adaptar una impresora 3D como bioimpresora de extrusión de bajo costo y entrenar un modelo local que prediga el ancho de línea de hidrogeles a partir de los parámetros de impresión.",
            "📌 Objetivos Específicos:",
            "• Imprimir líneas y rejillas de alginato-gelatina con un ancho de filamento controlado entre 300 y 800 µm y una desviación estándar menor al 15 % entre repeticiones.",
            "• Alcanzar un índice de imprimibilidad entre 0,9 y 1,1 en rejillas de poros cuadrados para al menos tres formulaciones distintas.",
            "• Entrenar un regresor con al menos 200 ensayos y predecir el ancho de línea con un error absoluto medio inferior a 50 µm en impresiones nuevas no vistas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Bioimpresión 3D"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Impresora cartesiana tipo Ender con firmware Marlin",
                "categoria": "Equipo de Fabricación",
                "funcion": "Aporta el movimiento en tres ejes y las trayectorias de la bioimpresora."
            },
            {
                "componente": "Cabezal de pistón con motor paso a paso y jeringa de 5 mL con aguja cónica",
                "categoria": "Actuador",
                "funcion": "Extruye el hidrogel con un caudal controlado."
            },
            {
                "componente": "Alginato de sodio, gelatina y cloruro de calcio",
                "categoria": "Material",
                "funcion": "Forman el hidrogel de ensayo y su solución de entrecruzamiento."
            },
            {
                "componente": "Cámara USB con soporte y fondo iluminado",
                "categoria": "Sensor de Imagen",
                "funcion": "Fotografía cada línea impresa con iluminación constante para medirla."
            },
            {
                "componente": "Lecho de impresión refrigerado con módulo Peltier y sensor de temperatura",
                "categoria": "Control Térmico",
                "funcion": "Mantiene la gelatina cerca de su temperatura de gelificación durante la impresión."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Marlin",
                "tipo": "Firmware Embebido",
                "descripcion": "Control de los ejes y de la extrusión de la jeringa con perfiles de velocidad."
            },
            {
                "herramienta": "Python con OpenCV",
                "tipo": "Análisis de Imágenes",
                "descripcion": "Medición automática del ancho de filamento y del índice de imprimibilidad."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del regresor y validación cruzada del ancho de línea."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño CAD",
                "descripcion": "Diseño del soporte del cabezal de pistón y de las rejillas de ensayo."
            }
        ]
    }
];
