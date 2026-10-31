// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_141",
        "titulo": "🔀 Proyecto 141: Banco de Pruebas de Redes Definidas por Software con Mininet y Ryu para la Enseñanza de Enrutamiento",
        "descripcion": "Problema: Los cursos de redes de las universidades regionales enseñan enrutamiento y conmutación con pocos equipos físicos y licencias costosas, por lo que los estudiantes rara vez experimentan con planos de control programables ni comparan algoritmos de enrutamiento sobre topologías realistas.\n\nDescripción: Banco de pruebas de redes definidas por software (SDN) basado en Mininet y el controlador Ryu, complementado con un switch físico OpenFlow construido sobre un router compatible con OpenWrt, que permite programar aplicaciones de control (balanceo de carga, enrutamiento por menor latencia, cortafuegos de capa 2) y medir su desempeño frente al enrutamiento tradicional mediante guías de laboratorio reproducibles.",
        "area": "Redes",
        "sector": "Educación superior - Formación en redes",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Arquitectura de redes definidas por software",
            "Programación de controladores OpenFlow en Python",
            "Emulación de topologías de red",
            "Medición de latencia, rendimiento y pérdida de paquetes",
            "Diseño de guías de laboratorio"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un banco de pruebas SDN de bajo costo que permita a los estudiantes programar y evaluar aplicaciones de control de red sobre topologías emuladas y físicas.",
            "📌 Objetivos Específicos:",
            "• Desplegar al menos cuatro topologías de referencia (lineal, árbol, anillo y malla parcial) en Mininet controladas por Ryu, con scripts de arranque reproducibles.",
            "• Desarrollar tres aplicaciones de control (balanceo de carga, enrutamiento por menor latencia y cortafuegos de capa 2) y comparar su rendimiento con iperf3 frente al reenvío tradicional.",
            "• Validar cinco guías de laboratorio con un grupo piloto de estudiantes, midiendo el tiempo de ejecución de cada práctica y el desempeño en una prueba de conceptos antes y después."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Formación en redes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con 16 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta Mininet, el controlador Ryu y las herramientas de medición."
            },
            {
                "componente": "Router compatible con OpenWrt (TP-Link Archer C7 o similar)",
                "categoria": "Equipo de Red",
                "funcion": "Actúa como switch físico OpenFlow mediante Open vSwitch."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Funciona como host físico generador y receptor de tráfico."
            },
            {
                "componente": "Cables de red Cat 6",
                "categoria": "Cableado Estructurado",
                "funcion": "Interconectan el switch físico, los hosts y el controlador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Mininet",
                "tipo": "Emulador de Redes",
                "descripcion": "Para crear topologías virtuales con hosts y switches Open vSwitch."
            },
            {
                "herramienta": "Ryu",
                "tipo": "Controlador SDN",
                "descripcion": "Para programar las aplicaciones de control OpenFlow en Python."
            },
            {
                "herramienta": "Open vSwitch",
                "tipo": "Switch Virtual",
                "descripcion": "Para el plano de datos programable en el emulador y en el router físico."
            },
            {
                "herramienta": "iperf3 y Wireshark",
                "tipo": "Medición y Análisis de Tráfico",
                "descripcion": "Para medir rendimiento e inspeccionar los mensajes OpenFlow."
            }
        ]
    },
    {
        "id": "proj_142",
        "titulo": "📡 Proyecto 142: Red Inalámbrica Mallada Comunitaria con LibreMesh para Veredas Rurales del Cauca",
        "descripcion": "Problema: Muchas veredas del Cauca están a pocos kilómetros de un punto con acceso a internet, pero no cuentan con cobertura de operadores comerciales, lo que deja a escuelas, puestos de salud y familias sin acceso a servicios educativos, trámites en línea ni comunicación en emergencias.\n\nDescripción: Diseño, despliegue piloto y evaluación de una red inalámbrica mallada comunitaria basada en routers de exteriores con firmware LibreMesh, que distribuye una conexión a internet desde un punto de acceso principal hacia varios nodos en la vereda, incluyendo un servidor local en Raspberry Pi con contenidos educativos disponibles sin conexión externa y un tablero de monitoreo del estado de los enlaces.",
        "area": "Redes",
        "sector": "Desarrollo rural - Conectividad comunitaria",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de radioenlaces y cálculo de zona de Fresnel",
            "Configuración de firmware OpenWrt y LibreMesh",
            "Protocolos de enrutamiento mallado (BATMAN-adv y BMX7)",
            "Medición de desempeño en redes inalámbricas multisalto",
            "Trabajo con comunidades y apropiación tecnológica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desplegar y evaluar una red inalámbrica mallada comunitaria de bajo costo que lleve conectividad desde un punto con acceso a internet hasta instituciones y hogares de una vereda rural del Cauca.",
            "📌 Objetivos Específicos:",
            "• Planificar los enlaces con perfiles de terreno y cálculo de presupuesto de potencia para al menos cuatro nodos, verificando la línea de vista en campo.",
            "• Desplegar la malla con LibreMesh y medir rendimiento, latencia y pérdida de paquetes por número de saltos durante al menos dos semanas continuas.",
            "• Evaluar la resiliencia de la red desconectando nodos de forma controlada y midiendo el tiempo de reconvergencia del enrutamiento."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Desarrollo rural - Conectividad comunitaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Routers de exteriores compatibles con OpenWrt (Ubiquiti NanoStation o TP-Link CPE510)",
                "categoria": "Equipo de Red Inalámbrica",
                "funcion": "Forman los nodos de la malla y los radioenlaces punto a punto."
            },
            {
                "componente": "Raspberry Pi 4 con memoria microSD de 128 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja el servidor local de contenidos y el sistema de monitoreo."
            },
            {
                "componente": "Fuentes PoE y protectores contra descargas",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimentan los nodos y los protegen de sobretensiones."
            },
            {
                "componente": "Mástiles y herrajes de montaje",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Elevan las antenas para asegurar línea de vista entre nodos."
            },
            {
                "componente": "Computador portátil",
                "categoria": "Equipo de Cómputo",
                "funcion": "Se usa para configuración en campo y mediciones de enlace."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "LibreMesh (OpenWrt)",
                "tipo": "Firmware de Red Mallada",
                "descripcion": "Para la configuración automática de los nodos de la malla."
            },
            {
                "herramienta": "Radio Mobile",
                "tipo": "Planificación de Radioenlaces",
                "descripcion": "Para perfiles de terreno y cálculo de presupuesto de enlace."
            },
            {
                "herramienta": "Kolibri",
                "tipo": "Plataforma Educativa sin Conexión",
                "descripcion": "Para ofrecer contenidos educativos desde el servidor local."
            },
            {
                "herramienta": "Prometheus y Grafana",
                "tipo": "Monitoreo y Visualización",
                "descripcion": "Para registrar y graficar el estado y desempeño de los enlaces."
            },
            {
                "herramienta": "iperf3",
                "tipo": "Medición de Rendimiento",
                "descripcion": "Para medir el rendimiento extremo a extremo por número de saltos."
            }
        ]
    },
    {
        "id": "proj_143",
        "titulo": "🌐 Proyecto 143: Plan de Transición a IPv6 con Doble Pila y NAT64/DNS64 para una Red Institucional Universitaria",
        "descripcion": "Problema: Las instituciones de educación superior de la región siguen operando solo con IPv4 y dependen de traducciones NAT múltiples, lo que dificulta la conexión directa de equipos de laboratorio, complica la trazabilidad de incidentes y las deja rezagadas frente a los requisitos de conectividad de redes académicas y proveedores que ya ofrecen IPv6.\n\nDescripción: Maqueta de laboratorio que reproduce la red de un campus (núcleo, distribución, servidores y usuarios) para diseñar, probar y documentar un plan de transición a IPv6, comparando experimentalmente la doble pila con un escenario IPv6 exclusivo con NAT64/DNS64, e incluyendo un plan de direccionamiento jerárquico, políticas de seguridad equivalentes y una guía de migración por fases.",
        "area": "Redes",
        "sector": "Educación superior - Infraestructura TI",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Direccionamiento y subredes IPv6",
            "Mecanismos de transición (doble pila, NAT64, DNS64)",
            "Autoconfiguración SLAAC y DHCPv6",
            "Enrutamiento dinámico con OSPFv3",
            "Documentación de planes de migración de infraestructura"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y validar en laboratorio un plan de transición a IPv6 para una red institucional universitaria que permita migrar de forma gradual sin interrumpir los servicios existentes.",
            "📌 Objetivos Específicos:",
            "• Elaborar un plan de direccionamiento IPv6 jerárquico para al menos seis segmentos de red (administrativo, académico, laboratorios, WiFi, servidores e invitados).",
            "• Implementar los escenarios de doble pila e IPv6 exclusivo con NAT64/DNS64 y medir latencia, tiempo de carga de servicios y compatibilidad de veinte aplicaciones de uso institucional.",
            "• Verificar que las políticas de cortafuegos y monitoreo ofrecen la misma cobertura en IPv4 e IPv6 mediante una lista de chequeo de al menos quince controles."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Infraestructura TI"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Router MikroTik hEX (RB750Gr3)",
                "categoria": "Equipo de Red",
                "funcion": "Funciona como router de borde con doble pila y túnel IPv6."
            },
            {
                "componente": "Switch administrable con soporte de VLAN",
                "categoria": "Equipo de Red",
                "funcion": "Segmenta la maqueta en los segmentos de red del campus."
            },
            {
                "componente": "Raspberry Pi 4 (dos unidades)",
                "categoria": "Computador de Placa Única",
                "funcion": "Alojan los servicios de DNS64, NAT64 y servidores de prueba."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta la emulación de la red núcleo y las pruebas de clientes."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "GNS3",
                "tipo": "Emulador de Redes",
                "descripcion": "Para emular el núcleo y la distribución de la red del campus."
            },
            {
                "herramienta": "Jool",
                "tipo": "Traductor NAT64",
                "descripcion": "Para la traducción de direcciones entre IPv6 e IPv4."
            },
            {
                "herramienta": "BIND9 o Unbound",
                "tipo": "Servidor DNS",
                "descripcion": "Para resolver nombres con síntesis de registros DNS64."
            },
            {
                "herramienta": "FRRouting",
                "tipo": "Suite de Enrutamiento",
                "descripcion": "Para el enrutamiento dinámico con OSPFv3."
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Análisis de Tráfico",
                "descripcion": "Para verificar el descubrimiento de vecinos y la traducción de paquetes."
            }
        ]
    },
    {
        "id": "proj_144",
        "titulo": "📊 Proyecto 144: Monitoreo de Disponibilidad y Análisis de Flujos de Tráfico con LibreNMS y ntopng para Alcaldías Municipales",
        "descripcion": "Problema: Las alcaldías de municipios pequeños del Cauca operan redes con decenas de equipos sin ningún sistema de monitoreo, por lo que las caídas de enlaces y la saturación del canal de internet se detectan solo cuando los funcionarios reportan que no pueden atender trámites, y no existen datos para justificar inversiones en ancho de banda.\n\nDescripción: Plataforma de monitoreo de bajo costo instalada en un mini PC que descubre automáticamente los equipos por SNMP con LibreNMS, analiza los flujos de tráfico NetFlow/IPFIX con ntopng para identificar qué aplicaciones y dependencias consumen el canal, y genera alertas por Telegram y reportes mensuales de disponibilidad y uso orientados a personal no especialista.",
        "area": "Redes",
        "sector": "Gobierno local - Infraestructura TI",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Monitoreo de redes con SNMP",
            "Análisis de flujos NetFlow e IPFIX",
            "Configuración de alertas y umbrales",
            "Elaboración de indicadores de disponibilidad",
            "Comunicación de resultados técnicos a usuarios no especialistas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una plataforma de monitoreo de disponibilidad y análisis de tráfico que permita a una alcaldía municipal detectar fallas de red y conocer el uso real de su canal de internet.",
            "📌 Objetivos Específicos:",
            "• Descubrir e incorporar al monitoreo el 100 % de los equipos administrables de la red piloto, con gráficas de interfaz, CPU y disponibilidad.",
            "• Clasificar el tráfico por aplicación y por dependencia durante al menos cuatro semanas, identificando los cinco principales consumidores del canal.",
            "• Reducir el tiempo entre la ocurrencia de una caída y su detección, comparando el tiempo medio antes y después de las alertas automáticas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gobierno local - Infraestructura TI"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con procesador Intel N100 y 16 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Aloja LibreNMS, ntopng y la base de datos de métricas."
            },
            {
                "componente": "Router MikroTik con exportación de flujos",
                "categoria": "Equipo de Red",
                "funcion": "Exporta los flujos de tráfico del canal de internet hacia el colector."
            },
            {
                "componente": "Switch administrable con puerto espejo",
                "categoria": "Equipo de Red",
                "funcion": "Replica el tráfico del enlace principal para su análisis."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "LibreNMS",
                "tipo": "Sistema de Monitoreo de Red",
                "descripcion": "Para descubrimiento SNMP, gráficas de rendimiento y alertas."
            },
            {
                "herramienta": "ntopng",
                "tipo": "Análisis de Flujos de Tráfico",
                "descripcion": "Para clasificar el tráfico por aplicación, host y dependencia."
            },
            {
                "herramienta": "MariaDB",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenar el inventario y el historial de eventos."
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Notificaciones",
                "descripcion": "Para enviar alertas de caída y saturación al personal de sistemas."
            }
        ]
    },
    {
        "id": "proj_145",
        "titulo": "📶 Proyecto 145: Planificación de Cobertura WiFi de Campus con Mapas de Calor Construidos por un Medidor Portátil de Bajo Costo",
        "descripcion": "Problema: En los campus universitarios los puntos de acceso WiFi se instalan sin estudios de cobertura, lo que genera zonas muertas en aulas y bibliotecas, interferencia entre canales y quejas constantes de estudiantes que no pueden acceder a plataformas académicas; las herramientas comerciales de site survey son costosas para las instituciones regionales.\n\nDescripción: Medidor portátil basado en ESP32 y una aplicación web que registra la intensidad de señal, la ocupación de canales y el rendimiento en puntos georreferenciados sobre el plano de cada edificio, generando mapas de calor de cobertura e interferencia y recomendaciones de ubicación y asignación de canales para los puntos de acceso, validadas con mediciones posteriores a los ajustes.",
        "area": "Redes",
        "sector": "Educación superior - Conectividad de campus",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Propagación de señales en interiores",
            "Planificación de canales WiFi en 2,4 y 5 GHz",
            "Programación de microcontroladores ESP32",
            "Interpolación espacial y mapas de calor",
            "Evaluación de calidad de experiencia de usuarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una herramienta de bajo costo para medir y visualizar la cobertura WiFi de un campus y apoyar la reubicación y configuración de los puntos de acceso.",
            "📌 Objetivos Específicos:",
            "• Construir un medidor portátil que registre RSSI, canal y rendimiento en al menos 150 puntos de medición de dos edificios del campus.",
            "• Generar mapas de calor por interpolación y comparar su error frente a mediciones de verificación en puntos no usados para construirlos.",
            "• Proponer ajustes de ubicación y canales y medir el cambio en el porcentaje de área con señal superior a -67 dBm antes y después de aplicarlos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Conectividad de campus"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con antena externa",
                "categoria": "Microcontrolador",
                "funcion": "Escanea redes y mide la intensidad de señal y la ocupación de canales."
            },
            {
                "componente": "Pantalla OLED de 0,96 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra al operador la señal medida en cada punto."
            },
            {
                "componente": "Batería LiPo con módulo de carga",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Permite recorrer los edificios sin conexión eléctrica."
            },
            {
                "componente": "Raspberry Pi 4 con adaptador WiFi de doble banda",
                "categoria": "Computador de Placa Única",
                "funcion": "Mide rendimiento real en 5 GHz y aloja el servidor de mediciones."
            },
            {
                "componente": "Teléfono inteligente o tableta",
                "categoria": "Dispositivo Móvil",
                "funcion": "Permite marcar cada punto de medición sobre el plano del edificio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE / ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Para programar el escaneo y el envío de mediciones del ESP32."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la aplicación web de registro de puntos sobre planos."
            },
            {
                "herramienta": "Python con SciPy y Matplotlib",
                "tipo": "Análisis y Visualización de Datos",
                "descripcion": "Para interpolar mediciones y generar los mapas de calor."
            },
            {
                "herramienta": "iperf3",
                "tipo": "Medición de Rendimiento",
                "descripcion": "Para medir el rendimiento real en cada zona del campus."
            }
        ]
    },
    {
        "id": "proj_146",
        "titulo": "🔒 Proyecto 146: Interconexión de Sedes de Cooperativas Cafeteras con WireGuard sobre Enlaces de Internet Inestables",
        "descripcion": "Problema: Las cooperativas cafeteras del Cauca tienen centros de acopio en municipios con internet residencial o móvil de baja calidad, por lo que la sincronización de compras, pesajes y pagos con la sede principal falla con frecuencia y se recurre a hojas de cálculo enviadas por mensajería, con riesgo de errores y pérdida de información.\n\nDescripción: Red privada virtual basada en WireGuard que interconecta la sede principal con los centros de acopio mediante routers de bajo costo con OpenWrt, incluyendo conmutación automática entre enlace fijo y módem 4G, y un estudio experimental que compara WireGuard con OpenVPN en rendimiento, consumo de CPU y tiempo de recuperación bajo condiciones controladas de pérdida y latencia.",
        "area": "Redes",
        "sector": "Agroindustria - Cooperativas cafeteras",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de redes privadas virtuales sitio a sitio",
            "Configuración de WireGuard y OpenVPN en OpenWrt",
            "Conmutación por falla entre enlaces WAN",
            "Emulación de condiciones de red con netem",
            "Diseño experimental y análisis estadístico de mediciones"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar y evaluar una red privada virtual de bajo costo que interconecte de forma confiable la sede principal de una cooperativa cafetera con sus centros de acopio rurales.",
            "📌 Objetivos Específicos:",
            "• Desplegar túneles WireGuard entre la sede y al menos dos centros de acopio, con conmutación automática a 4G cuando falle el enlace principal.",
            "• Comparar WireGuard y OpenVPN en rendimiento, uso de CPU del router y tiempo de restablecimiento del túnel bajo cinco niveles de pérdida de paquetes emulados.",
            "• Medir la disponibilidad del servicio de sincronización de la cooperativa durante cuatro semanas y compararla con el registro previo de fallas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agroindustria - Cooperativas cafeteras"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Routers GL.iNet o compatibles con OpenWrt (tres unidades)",
                "categoria": "Equipo de Red",
                "funcion": "Establecen los túneles WireGuard en la sede y los centros de acopio."
            },
            {
                "componente": "Módem USB 4G LTE",
                "categoria": "Equipo de Comunicación Móvil",
                "funcion": "Provee el enlace de respaldo cuando falla el internet fijo."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Emula el servidor de la sede y ejecuta las pruebas de rendimiento."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Aplica condiciones de red emuladas y analiza los resultados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "WireGuard",
                "tipo": "Red Privada Virtual",
                "descripcion": "Para los túneles cifrados sitio a sitio."
            },
            {
                "herramienta": "OpenVPN",
                "tipo": "Red Privada Virtual",
                "descripcion": "Para la línea base de comparación experimental."
            },
            {
                "herramienta": "OpenWrt con mwan3",
                "tipo": "Sistema Operativo de Red",
                "descripcion": "Para la conmutación automática entre enlaces WAN."
            },
            {
                "herramienta": "Linux tc/netem",
                "tipo": "Emulación de Condiciones de Red",
                "descripcion": "Para introducir pérdida, latencia y variación controladas."
            },
            {
                "herramienta": "Python con pandas",
                "tipo": "Análisis de Datos",
                "descripcion": "Para el análisis estadístico de las mediciones."
            }
        ]
    },
    {
        "id": "proj_147",
        "titulo": "☎️ Proyecto 147: Evaluación de Calidad de Servicio en Telefonía IP con Asterisk y Priorización DSCP en Redes Hospitalarias",
        "descripcion": "Problema: Los hospitales de baja y mediana complejidad migran sus centrales telefónicas a voz sobre IP compartiendo la misma red con historias clínicas, imágenes y video, por lo que en horas pico las llamadas entre urgencias, laboratorio y ambulancias sufren cortes y voz entrecortada sin que el personal de sistemas pueda medir ni explicar la causa.\n\nDescripción: Laboratorio que reproduce la red de un hospital con una central Asterisk, teléfonos IP y tráfico de fondo controlado, para medir la calidad de voz (MOS estimado, jitter, pérdida y latencia) y evaluar experimentalmente el efecto de VLAN de voz, marcado DSCP y colas de prioridad, entregando una guía de configuración y un monitor continuo de calidad de llamadas.",
        "area": "Redes",
        "sector": "Salud - Comunicaciones hospitalarias",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Configuración de centrales de voz sobre IP",
            "Calidad de servicio con DSCP y colas de prioridad",
            "Métricas de calidad de voz (modelo E y MOS)",
            "Generación controlada de tráfico de fondo",
            "Análisis de protocolos SIP y RTP"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar el efecto de las políticas de calidad de servicio sobre la calidad de las llamadas de voz sobre IP en una red hospitalaria compartida y proponer una configuración validada experimentalmente.",
            "📌 Objetivos Específicos:",
            "• Implementar una central Asterisk con al menos seis extensiones y un monitor que calcule MOS, jitter y pérdida para cada llamada.",
            "• Medir la calidad de voz bajo cuatro niveles de carga de red, con y sin VLAN de voz, marcado DSCP y colas de prioridad.",
            "• Determinar la carga máxima de tráfico de datos que mantiene un MOS superior a 4,0 con cada política y documentar la configuración recomendada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Comunicaciones hospitalarias"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja la central telefónica Asterisk."
            },
            {
                "componente": "Teléfonos IP básicos (Grandstream GXP1610 o similar)",
                "categoria": "Terminal de Voz",
                "funcion": "Realizan llamadas reales entre extensiones."
            },
            {
                "componente": "Switch administrable con soporte de QoS y PoE",
                "categoria": "Equipo de Red",
                "funcion": "Aplica VLAN de voz, marcado DSCP y colas de prioridad."
            },
            {
                "componente": "Router MikroTik",
                "categoria": "Equipo de Red",
                "funcion": "Simula el enlace entre sedes con limitación de ancho de banda."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Genera tráfico de fondo y analiza las capturas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Asterisk",
                "tipo": "Central Telefónica IP",
                "descripcion": "Para gestionar extensiones, troncales y registro de llamadas."
            },
            {
                "herramienta": "SIPp",
                "tipo": "Generador de Llamadas",
                "descripcion": "Para generar llamadas simultáneas de prueba de forma automatizada."
            },
            {
                "herramienta": "iperf3",
                "tipo": "Generador de Tráfico",
                "descripcion": "Para crear tráfico de datos de fondo controlado."
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Análisis de Protocolos",
                "descripcion": "Para analizar flujos RTP y calcular jitter y pérdida."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Monitoreo y Visualización",
                "descripcion": "Para el tablero continuo de calidad de llamadas."
            }
        ]
    },
    {
        "id": "proj_148",
        "titulo": "🤖 Proyecto 148: Automatización de la Configuración de Red con Ansible y NetBox para Proveedores de Internet Inalámbrico Regionales",
        "descripcion": "Problema: Los pequeños proveedores de internet inalámbrico del Cauca administran decenas de routers y antenas configurándolos uno a uno, sin inventario actualizado ni respaldo de configuraciones, lo que provoca errores humanos, cortes prolongados al cambiar parámetros y gran dependencia de una sola persona que conoce la red.\n\nDescripción: Sistema de automatización de red que usa NetBox como fuente única de verdad del inventario, direccionamiento y topología, y Ansible para generar y aplicar configuraciones a routers MikroTik a partir de plantillas, con respaldo automático, detección de desviaciones entre la configuración real y la documentada, y validación previa de cambios en un entorno de pruebas.",
        "area": "Redes",
        "sector": "Telecomunicaciones - Proveedores de internet regionales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Automatización de redes con Ansible",
            "Modelado de inventario y direccionamiento en NetBox",
            "Plantillas de configuración con Jinja2",
            "Control de versiones de configuraciones con Git",
            "Detección de desviaciones de configuración"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de automatización de red basado en una fuente única de verdad que reduzca los errores y el tiempo de configuración en la red de un proveedor de internet inalámbrico regional.",
            "📌 Objetivos Específicos:",
            "• Modelar en NetBox el inventario, las direcciones IP y los enlaces de una red de prueba con al menos diez equipos.",
            "• Automatizar con Ansible cinco tareas frecuentes (alta de cliente, cambio de VLAN, respaldo, actualización de usuarios y ajuste de colas) y comparar tiempos y errores frente a la configuración manual.",
            "• Detectar automáticamente desviaciones de configuración y medir el porcentaje de cambios no documentados identificados en pruebas controladas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Telecomunicaciones - Proveedores de internet regionales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Routers MikroTik hAP ac² (tres unidades)",
                "categoria": "Equipo de Red",
                "funcion": "Representan los nodos físicos de la red del proveedor."
            },
            {
                "componente": "Mini PC o Raspberry Pi 5 como servidor",
                "categoria": "Equipo de Cómputo",
                "funcion": "Aloja NetBox, Ansible y el repositorio de configuraciones."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta los routers virtuales del entorno de pruebas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "NetBox",
                "tipo": "Fuente de Verdad de Red (IPAM/DCIM)",
                "descripcion": "Para modelar inventario, direccionamiento y enlaces."
            },
            {
                "herramienta": "Ansible con la colección community.routeros",
                "tipo": "Automatización de Configuración",
                "descripcion": "Para aplicar configuraciones y respaldos a los equipos MikroTik."
            },
            {
                "herramienta": "Jinja2",
                "tipo": "Motor de Plantillas",
                "descripcion": "Para generar configuraciones a partir de los datos de NetBox."
            },
            {
                "herramienta": "Git y Gitea",
                "tipo": "Control de Versiones",
                "descripcion": "Para versionar configuraciones y revisar cambios."
            },
            {
                "herramienta": "MikroTik CHR",
                "tipo": "Router Virtual",
                "descripcion": "Para el entorno de pruebas previo a los cambios en producción."
            }
        ]
    },
    {
        "id": "proj_149",
        "titulo": "🗼 Proyecto 149: Red Celular Privada LTE de Laboratorio con Open5GS y srsRAN para Comunicaciones en Zonas Industriales",
        "descripcion": "Problema: Las plantas agroindustriales y minas de la región necesitan comunicaciones confiables para sensores, cámaras y personal en zonas amplias donde el WiFi no alcanza y la cobertura de los operadores es deficiente, pero desconocen si una red celular privada es viable, cuánto rinde y qué requiere, porque no existen laboratorios locales para evaluarla.\n\nDescripción: Red celular privada LTE de laboratorio construida con el núcleo de código abierto Open5GS y la estación base srsRAN sobre un radio definido por software, con tarjetas SIM programables, que permite caracterizar cobertura, rendimiento, latencia y capacidad de usuarios con teléfonos y módems comerciales, comparar contra WiFi en el mismo espacio y documentar un procedimiento replicable de despliegue.",
        "area": "Redes",
        "sector": "Industria - Redes privadas celulares",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Arquitectura de redes móviles 4G y 5G",
            "Despliegue de núcleos de red de código abierto",
            "Radio definido por software",
            "Aprovisionamiento de suscriptores y tarjetas SIM",
            "Medición de desempeño en redes celulares"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar y caracterizar una red celular privada LTE de laboratorio basada en software abierto para evaluar su viabilidad en comunicaciones de zonas industriales.",
            "📌 Objetivos Específicos:",
            "• Desplegar el núcleo Open5GS y la estación base srsRAN, registrando al menos tres dispositivos comerciales con tarjetas SIM programadas.",
            "• Medir rendimiento de subida y bajada, latencia y estabilidad de conexión a cuatro distancias y con distinto número de usuarios simultáneos.",
            "• Comparar los resultados con una red WiFi en el mismo espacio de prueba y elaborar una guía de despliegue verificada por un segundo equipo de estudiantes."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Redes privadas celulares"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Radio definido por software (LimeSDR Mini 2.0 o USRP B200mini)",
                "categoria": "Radio Definido por Software",
                "funcion": "Funciona como interfaz de radio de la estación base LTE."
            },
            {
                "componente": "Mini PC con procesador Intel Core i5 o superior",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el núcleo Open5GS y la estación base srsRAN."
            },
            {
                "componente": "Tarjetas SIM programables y lector USB",
                "categoria": "Identificación de Suscriptores",
                "funcion": "Permiten registrar los dispositivos en la red privada."
            },
            {
                "componente": "Teléfono Android compatible con la banda configurada",
                "categoria": "Dispositivo Móvil",
                "funcion": "Actúa como equipo de usuario para las mediciones."
            },
            {
                "componente": "Módem USB LTE",
                "categoria": "Equipo de Comunicación Móvil",
                "funcion": "Conecta una Raspberry Pi como terminal de datos industrial."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Open5GS",
                "tipo": "Núcleo de Red Móvil",
                "descripcion": "Para las funciones del núcleo EPC y la gestión de suscriptores."
            },
            {
                "herramienta": "srsRAN 4G",
                "tipo": "Estación Base por Software",
                "descripcion": "Para la estación base LTE y pruebas con radio virtual ZeroMQ."
            },
            {
                "herramienta": "pySim",
                "tipo": "Programación de Tarjetas SIM",
                "descripcion": "Para escribir las credenciales de suscriptor en las SIM."
            },
            {
                "herramienta": "iperf3",
                "tipo": "Medición de Rendimiento",
                "descripcion": "Para medir rendimiento y latencia extremo a extremo."
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Análisis de Protocolos",
                "descripcion": "Para inspeccionar la señalización S1AP y NAS durante el registro."
            }
        ]
    },
    {
        "id": "proj_150",
        "titulo": "🪞 Proyecto 150: Gemelo Digital de Red con Containerlab y Batfish para Validar Cambios antes de Aplicarlos en Producción",
        "descripcion": "Problema: En las redes de universidades, hospitales y empresas de la región los cambios de configuración se aplican directamente en producción y se prueban sobre la marcha, por lo que un error en una regla o ruta puede dejar sin servicio a cientos de usuarios y no existe forma de anticipar su impacto.\n\nDescripción: Gemelo digital de red que reconstruye automáticamente una réplica funcional de la red real a partir de sus configuraciones, usando Containerlab con routers virtuales y Batfish para análisis formal, de modo que cada cambio propuesto se verifique antes de aplicarse (alcanzabilidad, rutas, listas de acceso y redundancia) mediante un flujo de revisión que bloquea los cambios que violan las políticas definidas.",
        "area": "Redes",
        "sector": "Tecnologías de la información - Operación de redes",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Gemelos digitales de redes",
            "Emulación de redes basada en contenedores",
            "Verificación formal de configuraciones",
            "Integración continua aplicada a redes",
            "Definición de políticas de alcanzabilidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un gemelo digital de red que permita verificar el impacto de los cambios de configuración antes de aplicarlos en una red de producción.",
            "📌 Objetivos Específicos:",
            "• Generar automáticamente la réplica en Containerlab de una red de referencia con al menos ocho equipos a partir de sus archivos de configuración.",
            "• Definir al menos diez políticas de red verificables con Batfish y ejecutarlas automáticamente ante cada cambio propuesto.",
            "• Medir el porcentaje de detección sobre un conjunto de treinta cambios con errores inyectados y el tiempo total de validación por cambio."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Tecnologías de la información - Operación de redes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con 32 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta la réplica virtual de la red y los análisis de Batfish."
            },
            {
                "componente": "Routers MikroTik y switch administrable de laboratorio",
                "categoria": "Equipo de Red",
                "funcion": "Conforman la red física de referencia que se replica."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Recolecta periódicamente las configuraciones de la red física."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Containerlab",
                "tipo": "Emulación de Redes con Contenedores",
                "descripcion": "Para levantar la réplica funcional de la topología."
            },
            {
                "herramienta": "FRRouting y Nokia SR Linux",
                "tipo": "Sistemas Operativos de Red Virtuales",
                "descripcion": "Para emular los routers y switches de la red real."
            },
            {
                "herramienta": "Batfish con pybatfish",
                "tipo": "Verificación de Configuraciones",
                "descripcion": "Para analizar rutas, listas de acceso y alcanzabilidad."
            },
            {
                "herramienta": "Gitea Actions",
                "tipo": "Integración Continua",
                "descripcion": "Para ejecutar las verificaciones ante cada cambio propuesto."
            },
            {
                "herramienta": "Oxidized",
                "tipo": "Respaldo de Configuraciones",
                "descripcion": "Para obtener las configuraciones vigentes de los equipos."
            }
        ]
    }
];
