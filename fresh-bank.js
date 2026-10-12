/* Original SOC scenarios. All claims and contrasts are supported by noteRefs.
 * IDs are explicit and never reassigned. Correct indices refer to authoring order.
 */
(() => {
const Q = SC.freshQuestion;
Q('env-246','Licencias y arquitectura',['licencias'],
 'El presupuesto ya incluye MDE P2, pero los portátiles no aparecen como Onboarded. El equipo propone comprar otra licencia para que empiece la telemetría. ¿Qué paso falta comprobar?',[
 ['Aplicar y verificar el método de incorporación elegido para esos dispositivos','Licenciamiento habilita el uso; el onboarding técnico incorpora los dispositivos y debe verificarse.'],
 ['Asignar otra vez P2 y esperar que despliegue automáticamente el paquete','La asignación de licencia no aplica por sí sola el paquete de incorporación.'],
 ['Crear una política de riesgo de Entra para incorporar los endpoints','Las políticas de riesgo de identidad no sustituyen el onboarding de MDE.'],
 ['Abrir la página del dispositivo para que la consulta instale el sensor','Una superficie de investigación no realiza el despliegue técnico del onboarding.']]);
Q('env-247','Licencias y arquitectura',['licencias','retencion-nativa'],
 'Un tenant pasa de E5 a E3. El SOC necesita seguir usando Threat Explorer y AIR de correo y supone que basta con conservar Safe Links. ¿Qué distingue el alcance de ambas necesidades?',[
 ['Safe Links corresponde a P1; Explorer y AIR de MDO requieren conservar cobertura P2','Los apuntes separan prevención P1 de investigación y automatización P2.'],
 ['Conservar Safe Links conserva automáticamente todas las funciones P2','La disponibilidad de una función P1 no prueba la cobertura de las funciones P2.'],
 ['Al cambiar de suite se borra automáticamente el histórico del workspace','Los datos ya ingeridos en Log Analytics siguen la retención de su propio almacén.'],
 ['Instalar un agente en los buzones convierte la protección base en P2','MDO se aplica en el servicio; un agente no sustituye su licencia.']]);
Q('env-248','Licencias y arquitectura',['licencias'],
 'El equipo tiene usuarios con MDE P2 y quiere cubrir servidores con las mismas licencias de usuario. ¿Qué revisión evita una cobertura asumida incorrectamente?',[
 ['Revisar una licencia o plan específico para servidores, separado de los clientes','Las licencias de usuario P1/P2 cubren clientes y no cubren servidores.'],
 ['Contar cada servidor como uno de los cinco clientes del usuario','El máximo de clientes por usuario no transforma servidores en dispositivos cliente.'],
 ['Añadir los servidores a un device group para concederles cobertura P2','El grupo administra alcance y remediación; no otorga una licencia.'],
 ['Considerar que usar el mismo tenant licencia todos los workloads','Compartir tenant no elimina los requisitos por usuario y por recurso.']]);
Q('env-249','Licencias y arquitectura',['licencias','identidad'],
 'Se deben incorporar un DC compatible con v3 y un servidor AD CS que no es DC. El diseño exige evitar componentes en preview. ¿Qué combinación respeta los apuntes?',[
 ['v3 en el DC compatible y v2 con DSA en el servidor AD CS no DC','Los apuntes reservan la incorporación estable de esos roles no DC a v2; pueden coexistir sensores.'],
 ['v3 con LocalSystem en ambos porque el rol del servidor no importa','La activación v3 en roles no DC se describe en preview y contradice la condición del diseño.'],
 ['v2 sin cuenta de servicio en ambos porque usa LocalSystem como v3','La instalación clásica v2 requiere Directory Service Account.'],
 ['Elegir una única versión para todo el tenant porque no pueden coexistir','Los sensores v2 y v3 pueden reportar al mismo servicio.']]);
Q('env-250','Licencias y arquitectura',['licencias'],
 'El equipo de cumplimiento observa actividad cloud en IRM, pero aún no incorporó los equipos. ¿Qué conclusión sobre las señales es la adecuada?',[
 ['Puede haber actividad cloud, pero faltan las señales de dispositivo que requieren onboarding','IRM puede funcionar parcialmente sin indicadores de dispositivo; Endpoint DLP sí necesita incorporación.'],
 ['La ausencia de onboarding de equipos impide toda actividad cloud de IRM','Los apuntes distinguen señales cloud y señales de dispositivo.'],
 ['Ver un case de eDiscovery demuestra que todos los endpoints están incorporados','eDiscovery cloud no requiere instalar un agente y no prueba incorporación de endpoints.'],
 ['Audit Standard incorpora automáticamente cualquier dispositivo del tenant','Licencias y servicios cloud no sustituyen el onboarding de dispositivo.']]);
Q('env-251','Licencias y arquitectura',['licencias'],
 'Entra Free muestra Additional risk detected para una señal premium. El SOC cree que falta instalar un agente en cada usuario. ¿Qué ajuste aborda el límite descrito?',[
 ['Revisar la cobertura P2 para obtener detalle completo de riesgo; Entra no requiere ese onboarding','Los datos disponibles dependen de la licencia, y las detecciones Entra se generan en el tenant.'],
 ['Instalar el agente de MDE para desenmascarar cualquier señal premium de Entra','El agente de endpoint no concede capacidades Identity Protection P2.'],
 ['Subir el umbral de riesgo para desbloquear el detalle premium','El umbral decide cuándo actúa una política; no añade derechos de licencia.'],
 ['Usar Entra P1 porque incluye siempre todo el detalle de riesgo de P2','Los apuntes mantienen información de riesgo limitada en P1.']]);
Q('env-252','Controles del endpoint en contexto',['endpoint'],
 'Los equipos usan antivirus de terceros y Defender AV está Passive. EDR in block mode está activo, pero un indicador de fichero no bloquea preventivamente. ¿Qué explica la diferencia?',[
 ['EDR in block mode remedia después de la brecha y no reactiva el enforcement que exige AV Active','Los apuntes lo describen como red de seguridad, sin reactivar ASR, indicadores o real-time.'],
 ['EDR in block mode convierte automáticamente Defender AV a Active','La función no cambia el requisito de modo Active del antivirus.'],
 ['El indicador funciona en Passive si se cambia su severidad a High','La severidad no sustituye los prerrequisitos de enforcement.'],
 ['Passive y Active ofrecen el mismo bloqueo preventivo de indicadores','Los apuntes excluyen los indicadores cuando Defender Antivirus está pasivo.']]);
Q('env-253','Controles del endpoint en contexto',['endpoint'],
 'Un registro duplicado desaparece del inventario tras activar Hide potential duplicate device records, pero sigue apareciendo en hunting. ¿Qué debería registrar el SOC?',[
 ['Es un ocultamiento limitado; hunting, alertas e incidentes pueden seguir mostrando el registro','La opción afecta a inventario, VM y API, y excluye expresamente esas superficies.'],
 ['El registro fue eliminado y cualquier fila de hunting demuestra corrupción','Ocultar un duplicado no equivale a borrar su telemetría de todas las superficies.'],
 ['Hay que cerrar sus incidentes para completar el ocultamiento en hunting','El cierre de incidentes no cambia el alcance de esta opción.'],
 ['La opción modifica la retención y hunting conservará solo treinta días','No se documenta como una política de retención.']]);
Q('env-254','Controles del endpoint en contexto',['endpoint'],
 'Un dispositivo satisface todas las propiedades de dos device groups con posiciones 2 y 5. Una de las propiedades contiene dos valores alternativos. ¿Cómo se decide su pertenencia?',[
 ['Basta un valor dentro de cada propiedad y gana el grupo con menor número','Las propiedades se combinan con AND, sus valores con OR y la posición menor tiene prioridad.'],
 ['Tiene que satisfacer ambos valores de cada propiedad y gana el grupo 5','Los valores de la misma propiedad son alternativas, y la prioridad numérica está invertida.'],
 ['Entra simultáneamente en ambos grupos y suma sus niveles de remediación','Los apuntes describen pertenencia al grupo coincidente de mayor prioridad.'],
 ['El grupo que se editó más recientemente gana aunque su posición sea mayor','La fecha de edición no sustituye el orden de prioridad.']]);
Q('env-255','Controles del endpoint en contexto',['endpoint'],
 'Una URL HTTPS se bloquea por ruta en Edge, pero la prueba en otro navegador no reproduce ese filtrado. ¿Qué dos límites revisas antes de culpar al indicador?',[
 ['La coincidencia de rutas HTTPS solo está soportada en Edge','Los apuntes delimitan expresamente el matching de rutas HTTPS a Microsoft Edge.'],
 ['Fuera de Edge se requiere Network protection en Block','Edge utiliza SmartScreen; otros navegadores y aplicaciones necesitan Network protection.'],
 ['La opción Web content filtering convierte cualquier navegador en Edge','La opción por categorías no cambia la compatibilidad de matching por ruta.'],
 ['EDR in block mode sustituye siempre los requisitos de indicadores de red','La remediación EDR no reactiva las capacidades preventivas que exigen AV Active.']],[0,1]);
Q('env-256','Controles del endpoint en contexto',['endpoint'],
 'Un equipo debe visitar un sitio permitido para su grupo, aunque una categoría web general lo bloquee. ¿Qué excepción documentada corresponde?',[
 ['Un indicador de dominio Allow acotado al device group pertinente','Los apuntes permiten exceptuar un sitio del filtrado web mediante Allow con scope de dispositivo.'],
 ['Una Automation folder exclusion con el nombre del dominio','La exclusión se refiere a carpetas de AIR, no a destinos web.'],
 ['Cambiar el indicador a Warn y considerarlo una autorización permanente','Warn ofrece bypass temporal y no equivale a Allow.'],
 ['Desactivar el filtrado web para todo el tenant porque no existen scopes','Los indicadores pueden acotarse a device groups; no hace falta esa exclusión global.']]);
Q('env-257','Controles del endpoint en contexto',['endpoint'],
 'Se quiere bloquear una red externa mediante un único indicador de IP con notación CIDR. El formulario no acepta el valor. ¿Qué restricción explica el resultado?',[
 ['El indicador admite direcciones externas concretas, no rangos ni CIDR','Los apuntes excluyen rangos, comodines, CIDR y direcciones internas.'],
 ['CIDR solo funciona al cambiar la acción a Allow','La restricción corresponde al tipo de valor, no se elimina con la acción.'],
 ['Las direcciones externas se reservan a certificados y no admiten IP indicators','IP es un tipo admitido precisamente para direcciones externas.'],
 ['Convertir la IP a una fila de watchlist activa automáticamente ese bloqueo','La watchlist aporta datos de referencia y no ejecuta enforcement de MDE.']]);
Q('env-258','Controles del endpoint en contexto',['endpoint'],
 'Un fichero firmado coincide con un hash Allow y su certificado hoja está en Block. Se cumplen los requisitos de evaluación del certificado. ¿Qué resultado explican los apuntes?',[
 ['El bloqueo del certificado prevalece sobre el Allow del hash','Los apuntes especifican esa precedencia para el fichero firmado por el certificado bloqueado.'],
 ['El hash Allow siempre prevalece sobre cualquier certificado Block','La precedencia de certificados en este caso contradice esa regla absoluta.'],
 ['El indicador de certificado evalúa solo la CA padre y nunca la hoja','La evaluación se realiza sobre el certificado hoja.'],
 ['Ambos se anulan y la decisión depende exclusivamente de su fecha de creación','La fecha de creación no define la precedencia descrita.']]);
Q('env-259','Controles del endpoint en contexto',['endpoint'],
 'El SOC importa 700 indicadores en un solo CSV y espera que incluya CertificateThumbprint. ¿Qué diseño de carga respeta los límites descritos?',[
 ['Dividir los lotes a un máximo de 500 y usar la API para los tipos adicionales de certificado','El límite de lote y los tipos admitidos por CSV y API son restricciones distintas.'],
 ['Reducir a 500 basta para que CSV admita todos los tipos de la API','Respetar el tamaño no amplía los tipos soportados por CSV.'],
 ['Mantener 700 porque el máximo de 15.000 del tenant permite ese lote','El límite total del tenant no sustituye el máximo por importación.'],
 ['Usar AlertAndBlock para evitar los límites de lote y de tipo','Las acciones legacy no solucionan restricciones de formato ni de cantidad.']]);
Q('env-260','Controles del endpoint en contexto',['endpoint','automatizacion'],
 'Una alerta ya está In progress porque la tomó un analista. Después la amenaza se remedia y está activo Automatically resolve alerts. ¿Qué comportamiento debe esperar?',[
 ['La opción no sobrescribe ese estado manual In progress','Los apuntes excluyen In progress y Resolved establecidos manualmente del cierre automático.'],
 ['La opción siempre reemplaza cualquier clasificación y estado manual','El cierre automático tiene las excepciones de estados manuales indicadas.'],
 ['Debe activar Automated Investigation como interruptor de Optional features','La investigación automatizada está habilitada por defecto y ya no usa ese interruptor.'],
 ['Debe borrar el device group para permitir que la alerta se cierre','La pertenencia a un grupo no es el mecanismo descrito de cierre de alertas.']]);
Q('env-261','Protección de identidad y SaaS',['identidad'],
 'MDI recomienda corregir delegación insegura y el equipo pretende aislar un activo automáticamente por esa recomendación. ¿Qué distingue postura y detección en este caso?',[
 ['ISPA produce recomendaciones de configuración; no demuestra un ataque ni bloquea autenticación','Los apuntes separan evaluación de postura, alerta de ataque y ejecución de contención.'],
 ['Toda recomendación ISPA es una alerta runtime de alta confianza','La evaluación busca debilidades de configuración, no ataques en curso.'],
 ['MDI ya bloqueó la autenticación y solo falta cerrar el incidente','MDI supervisa y detecta; no corta por sí mismo la autenticación.'],
 ['LMP ejecuta el aislamiento al mostrar una ruta a una cuenta sensible','LMP muestra una ruta precalculada y no ejecuta esa respuesta.']]);
Q('env-262','Protección de identidad y SaaS',['identidad','grafos'],
 'El investigador necesita estudiar una ruta precalculada de AD local entre una cuenta poco privilegiada y una sensible, sin formular consultas GQL. ¿Qué superficie encaja?',[
 ['Lateral Movement Paths de MDI','LMP es la vista precalculada sobre AD on-premises que describen los apuntes.'],
 ['Identity attack graph de Sentinel consultado mediante GQL','Ese grafo vive sobre el lake y permite preguntas GQL; es una experiencia distinta.'],
 ['Data risk graph de IRM para determinar el último logon del DC','El grafo de IRM se centra en usuario de riesgo y actividad, no en esa ruta MDI.'],
 ['Una recomendación de Secure Score que contenga una ruta ejecutable','Secure Score puntúa postura; no sustituye la vista de rutas de MDI.']]);
Q('env-263','Protección de identidad y SaaS',['mdca'],
 'Cloud Discovery etiqueta una app como Unsanctioned, pero los usuarios siguen accediendo. El SOC aún no configuró ninguna integración de bloqueo. ¿Qué diagnóstico es correcto?',[
 ['La etiqueta filtra y vigila; el bloqueo exige una integración o mecanismo de enforcement','Cloud Discovery basado en logs no bloquea por sí solo.'],
 ['La etiqueta siempre bloquea sesiones y el usuario necesariamente evadió el control','Los apuntes separan designación de app y ejecución del bloqueo.'],
 ['Un API connector corta en vivo todas las sesiones aunque no esté configurado','Los conectores API actúan fuera de banda y no interceptan sesiones en tiempo real.'],
 ['Añadir una Access policy solo al log collector habilita un reverse proxy','Access policy y reverse proxy pertenecen a Conditional Access App Control.']]);
Q('env-264','Protección de identidad y SaaS',['mdca'],
 'Una app SaaS conectada por API necesita impedir una descarga durante una sesión activa. La file policy actúa después y no satisface ese requisito temporal. ¿Qué ruta eliges?',[
 ['Conditional Access App Control con una session policy de descarga','El reverse proxy de MDCA aplica controles dentro de la sesión en tiempo real.'],
 ['Aumentar la frecuencia del log collector para que cancele la descarga','El collector descubre actividad por logs y no intercepta sesiones.'],
 ['Mantener solo el API connector porque cualquier governance action es inline','La conexión API actúa fuera de banda, después del hecho.'],
 ['Una Access policy de entrada equivale a inspeccionar cada descarga posterior','La entrada y las actividades dentro de la sesión tienen controles distintos.']]);
Q('env-265','Protección de identidad y SaaS',['mdca'],
 'Dos session policies coinciden en una descarga. Una permite monitorizar y otra impone un control más restrictivo. ¿Qué criterio se aplica?',[
 ['Se aplica la policy más restrictiva para la actividad coincidente','Los apuntes especifican la política más restrictiva cuando coinciden varias de sesión.'],
 ['Gana siempre la última policy creada aunque sea menos restrictiva','No se describe una precedencia por fecha de creación.'],
 ['Gana siempre Monitor only porque evita bloquear usuarios legítimos','Monitor only no anula el control más restrictivo de otra policy coincidente.'],
 ['Ambas se ignoran hasta que el analista resuelva una alerta','La evaluación de controles de sesión no espera al cierre de una alerta.']]);
Q('env-266','Protección de identidad y SaaS',['mdca'],
 'El objetivo es permitir una descarga aplicando una sensitivity label, en vez de bloquearla. El equipo intenta usar Protect en una policy de upload. ¿Qué limita esa elección?',[
 ['Protect está descrito para download; no es la acción equivalente para upload','El control y la acción se eligen por separado y Protect se limita a descarga.'],
 ['Protect bloquea todas las descargas y nunca aplica etiquetas','Los apuntes lo describen como aplicación de etiqueta en lugar de bloqueo.'],
 ['Control upload y Control download admiten exactamente las mismas acciones','La limitación de Protect impide asumir esa equivalencia.'],
 ['Una etiqueta Unsanctioned del catálogo equivale a una etiqueta de sensibilidad del archivo','La clasificación de apps y la protección de contenido son controles distintos.']]);
Q('env-267','Postura, contenido y riesgo',['cloud'],
 'La suscripción muestra una recomendación de CSPM y, por separado, una alerta de actividad runtime de un workload. ¿Cómo debe repartir el SOC el trabajo?',[
 ['Corregir la configuración de la recomendación e investigar el contexto de la alerta','CSPM aporta postura; CWPP genera alertas runtime y también puede aportar recomendaciones.'],
 ['Investigar ambas como ataques confirmados porque vienen del mismo producto','Una recomendación describe configuración deficiente y no confirma un ataque.'],
 ['Descartar la alerta porque CWPP solo genera recomendaciones de configuración','CWPP sí genera alertas runtime sobre workloads.'],
 ['Activar Foundational CSPM para que contenga automáticamente los dos activos','La evaluación de postura no equivale a contención automática.']]);
Q('env-268','Postura, contenido y riesgo',['cloud'],
 'El equipo compara Secure Score clásico de Azure y Cloud Secure Score de Defender. Dos recomendaciones afectan a igual cantidad de recursos pero tienen exposición distinta. ¿Qué explica valores diferentes?',[
 ['El clásico cuenta recursos sanos por control; el Cloud Secure Score pondera riesgo y criticidad','Los apuntes distinguen la fórmula por recursos del score basado en factores de riesgo.'],
 ['Ambos usan únicamente la misma fracción de recursos sanos y deben ser idénticos','La ponderación por riesgo hace incorrecta esa equivalencia.'],
 ['Cloud Secure Score cuenta incidentes cerrados, mientras el clásico cuenta alertas','Los dos se describen como métricas de postura, no de cierre de incidentes.'],
 ['El clásico incluye siempre todos los standards personalizados de KQL','El score clásico descrito mira MCSB y no todos los standards.']]);
Q('env-269','Postura, contenido y riesgo',['purview-controles'],
 'Una rule DLP en Simulation mode encuentra contenido sensible. El SOC no recibe alertas y asume un fallo, aunque no configuró la rule para alertar. ¿Qué debe distinguir?',[
 ['Coincidencia, acción y alerta son decisiones distintas; simulación evalúa sin bloquear','Una coincidencia no implica alerta y la simulación permite evaluar impacto antes del enforcement.'],
 ['Todo match DLP genera siempre una alerta y bloqueo del archivo','Los apuntes niegan la equivalencia entre policy match y alerta.'],
 ['Simulation mode significa que no se evalúa ninguna condición','Simular sí permite observar a quién habría afectado la política.'],
 ['Una rule IRM sustituye automáticamente la configuración de alertas DLP','IRM evalúa riesgo del usuario; no configura las alertas de una regla DLP.']]);
Q('env-270','Postura, contenido y riesgo',['purview-controles'],
 'La policy IRM está asignada a un usuario saliente, pero aún no ocurrió el triggering event y no se le añadió manualmente. El SOC espera que ya esté puntuando señales. ¿Qué falta revisar?',[
 ['La entrada en vigilancia mediante triggering event y las señales aplicables','Los apuntes distinguen alcance, evento de activación, señales, umbral y ventana de puntuación.'],
 ['Solo subir el umbral para activar automáticamente cualquier usuario del scope','El umbral no sustituye el evento que introduce al usuario en vigilancia.'],
 ['Solo cambiar una acción DLP a Block porque ambas policies son la misma','DLP vigila contenido y sus acciones no equivalen a activar una policy IRM.'],
 ['Cerrar un incidente XDR para que IRM comience a puntuar al usuario','El cierre del incidente no es el triggering event del escenario.']]);
Q('env-271','Postura, contenido y riesgo',['riesgo'],
 'El SOC configura una policy de sign-in risk solo para High y observa detecciones Medium sin reto MFA. ¿Qué debe comprobar antes de concluir que la policy falló?',[
 ['Si el umbral excluye esas detecciones y si se trata de riesgo de sesión o de cuenta','Umbral y tipo de riesgo determinan qué política responde; High deja fuera Low y Medium.'],
 ['Si elevar el umbral a High debería incluir automáticamente Medium','Elevar el umbral reduce las detecciones que disparan la política.'],
 ['Si la policy de registro MFA sustituye cualquier control de sign-in risk','Registrar métodos no equivale a remediar el riesgo de una autenticación concreta.'],
 ['Si cualquier red confiable cancela siempre todas las detecciones de riesgo','La red confiable puede reducir falsos positivos, no ofrece esa garantía universal.']]);
Q('env-272','Postura, contenido y riesgo',['riesgo'],
 'El analista quiere responder tanto al riesgo de la cuenta como al de una sesión concreta mediante una única condición, asumiendo que son iguales. ¿Qué separación plantean los apuntes?',[
 ['User risk y sign-in risk se configuran por separado y evalúan objetos diferentes','El primero estima compromiso de cuenta; el segundo el riesgo de la autenticación concreta.'],
 ['User risk es solo el nombre anterior de sign-in risk y no se separan','Los apuntes describen políticas y recomendaciones diferenciadas.'],
 ['MFA registration mide el compromiso de cuenta y reemplaza User risk','La policy de registro prepara métodos, no mide compromiso de cuenta.'],
 ['Un device group de MDE decide ambos riesgos y sus umbrales de Entra','El device group no sustituye las condiciones de las policies de identidad.']]);
Q('env-273','Postura, contenido y riesgo',['secure-score'],
 'El tablero de Microsoft Secure Score mejora tras registrar una mitigación alternativa. El jefe interpreta que el tenant ya no puede sufrir ataques. ¿Qué lectura debe corregir el SOC?',[
 ['El score refleja postura y estado de acciones recomendadas; no es una detección ni garantía de seguridad','Los apuntes lo definen como puntuación de configuración y admiten mitigaciones alternativas.'],
 ['Una acción Completed cierra automáticamente todos los incidentes relacionados','La gestión de acciones de postura no equivale al cierre de incidentes.'],
 ['Resolved through alternate mitigation significa necesariamente que no se aplicó protección','Los estados admiten resolución por mitigación alternativa y por terceros.'],
 ['El score solo cambia cuando se ejecuta Automatic attack disruption','La mejora descrita procede de acciones recomendadas, no de ese único mecanismo.']]);
Q('env-274','Permisos combinados y scopes',['rbac','permisos','automatizacion'],
 'Sentinel puede iniciar un playbook mediante automation rule, pero un paso Graph falla con 403. Se concedió Automation Contributor al servicio de Sentinel. ¿Qué autorización falta investigar?',[
 ['La identidad y permisos que usa la conexión o acción Graph del playbook','Autorizar al servicio para invocar la Logic App no concede permisos a sus conexiones de destino.'],
 ['Asignar Playbook Operator a todos los analistas para autorizar automáticamente Graph','La ejecución manual del usuario no sustituye la autorización de la conexión del playbook.'],
 ['Cambiar Automation Contributor por Sentinel Reader para ampliar las acciones','Reader permite lectura y no aporta los permisos de destino.'],
 ['Añadir otra analytics rule para que herede los permisos Graph del creador','Una analytics rule no concede permisos a las acciones internas de la Logic App.']]);
Q('env-275','Permisos combinados y scopes',['rbac'],
 'Un invitado puede leer incidentes pero no asignarlos a usuarios. Se exige mínimo privilegio y ya tiene Sentinel Reader. ¿Qué pareja de permisos documentada debe revisarse?',[
 ['Sentinel Responder y Directory Readers para el invitado','Responder permite administrar incidentes y el invitado necesita lectura del directorio.'],
 ['Sentinel Reader y Monitoring Metrics Publisher sobre la DCR','Ese segundo rol publica datos; no habilita la asignación de incidentes.'],
 ['Playbook Operator y File collection para buscar destinatarios del incidente','Esos permisos corresponden a ejecución de playbooks y archivos, no a la tarea descrita.'],
 ['Sentinel Contributor sin lectura de directorio en ninguna situación','Elevar el rol Sentinel no elimina el requisito de lectura de directorio del invitado.']]);
Q('env-276','Permisos combinados y scopes',['rbac'],
 'Un analista obtiene acceso al workload MDE, pero su consulta a un workspace Sentinel falla tras activar Unified RBAC. ¿Qué parte del assignment debe revisar específicamente?',[
 ['La Sentinel Data collection y Security data basics (Read) correspondientes','Data sources selecciona workloads; Data collections selecciona workspaces o Data Lake.'],
 ['Solo añadir MDE otra vez a Data sources porque cubre todos los workspaces','El workload MDE no sustituye la colección del workspace solicitado.'],
 ['Solo añadir Response (Manage) para que toda lectura esté implícita','La acción de respuesta no sustituye la autorización de lectura y alcance de datos.'],
 ['Desactivar Azure RBAC, que queda automáticamente invalidado por Unified RBAC','Azure RBAC sigue activo en paralelo; no se invalida por activar Unified RBAC.']]);
Q('env-277','Permisos combinados y scopes',['permisos'],
 'El lake necesita incorporación inicial y el equipo propone dejar Global Administrator y Owner asignados permanentemente al operador. ¿Qué diseño respeta la separación de fases?',[
 ['Usar los permisos elevados de onboarding y retirarlos o activarlos mediante PIM cuando hagan falta','Los apuntes distinguen requisitos de incorporación y privilegios de operación posteriores.'],
 ['Conservar todos los permisos iniciales porque son necesarios para cualquier consulta posterior','Los roles elevados se requieren para el proceso inicial, no para toda lectura futura.'],
 ['Asignar solo Security Reader para efectuar escritura y onboarding','Security Reader lee; no cumple las capacidades de incorporación y escritura descritas.'],
 ['Asignar Owner solo al workspace para cumplir el Owner de la suscripción de facturación','El scope y la asignación directa requeridos para facturación son distintos.']]);
Q('env-278','Permisos combinados y scopes',['permisos'],
 'Un operador ve Table insights con Sentinel Reader y ahora debe cambiar tier desde esa superficie. ¿Qué combinación distingue ver de modificar?',[
 ['Sentinel Contributor más Log Analytics Contributor para cambiarlo desde Table insights','Los apuntes dan Reader para ver y esa combinación para cambiar tier o retención desde Table insights.'],
 ['Mantener solo Sentinel Reader porque ver una tabla implica administrar su tier','La lectura de la superficie no concede modificación de almacenamiento.'],
 ['Usar solo Monitoring Metrics Publisher porque el cambio modifica ingesta','Ese rol autoriza publicación mediante DCR, no administración de tier.'],
 ['Usar Playbook Operator porque Table insights es una Logic App','Table insights no es un playbook ni utiliza ese rol de ejecución.']]);
Q('env-279','Permisos combinados y scopes',['rbac','permisos'],
 'El usuario puede leer metadatos de correo, pero no debe ver el contenido de todos los mensajes. Solo necesita revisar y liberar cuarentena. ¿Qué separación debe mantener el rol?',[
 ['Conceder el contenido de Quarantine Emails y el permiso de gestión de cuarentena dentro del alcance','Los apuntes separan metadata, contenido de cuarentena, contenido de todos los emails y gestión.'],
 ['Dar All Emails (Read) porque es la única forma de leer contenido de cuarentena','Existe el permiso específico de contenido limitado a mensajes en cuarentena.'],
 ['Dar solo Response (Manage), que engloba todas las operaciones de correo','Response por sí solo no cubre correo ni sus permisos específicos.'],
 ['Dar solo Email metadata porque incluye cuerpo y liberación de mensajes','Metadatos, contenido y acción de liberar son capacidades diferentes.']]);
Q('env-280','Rutas y transformaciones de ingesta',['ingesta'],
 'Una máquina Windows on-premises no aparece como seleccionable en la DCR. El equipo ya preparó AMA, pero todavía no existe un recurso Azure Arc para ella. ¿Qué preparación falta?',[
 ['Incorporarla con Azure Connected Machine agent y después asociar la DCR de AMA','Arc la representa como recurso; AMA es el agente de recopilación distinto.'],
 ['Cambiar el nombre de la tabla porque eso registra la máquina en Azure','El esquema de destino no crea el recurso de la máquina.'],
 ['Crear un dispositivo de MDE y considerar que eso equivale siempre a Azure Arc','La incorporación MDE no sustituye el requisito Arc de esta ruta de AMA.'],
 ['Mover físicamente la máquina a la región del workspace','La DCR sigue la región del workspace; no se exige que la máquina esté en esa región.']]);
Q('env-281','Rutas y transformaciones de ingesta',['ingesta'],
 'Una investigación necesita reconstruir inicio y cierre de sesión. La DCR usa Minimal y faltan eventos 4634. ¿Qué decisión satisface el requisito descrito?',[
 ['Usar Common para la traza de auditoría o Custom con XPath para el conjunto necesario','Minimal incluye señales de brecha pero omite el cierre 4634; Common conserva la traza.'],
 ['Mantener Minimal porque incluye todos los eventos de auditoría de usuario','La omisión de 4634 contradice esa suposición.'],
 ['Agregar 4634 a la consulta KQL para que se genere retroactivamente','Una consulta no crea ni recupera eventos que no se recopilaron.'],
 ['Activar WEF para habilitar automáticamente la auditoría en el origen','WEF reenvía lo generado y no habilita la auditoría ni los canales.']]);
Q('env-282','Rutas y transformaciones de ingesta',['ingesta'],
 'El colector Linux recibe paquetes Syslog, pero AMA no envía filas. El técnico busca una escucha directa de AMA en el puerto de entrada. ¿Qué cadena debe comprobar?',[
 ['Demonio rsyslog o syslog-ng, su entrega a AMA y la DCR que procesa el stream','El demonio escucha el puerto de entrada; AMA procesa lo recibido según la DCR.'],
 ['AMA debe escuchar directamente los paquetes y sustituir siempre al demonio','Los apuntes describen una entrega desde el demonio hacia AMA.'],
 ['Un workbook debe abrirse para que el forwarder empiece a enviar','La visualización no inicia la ruta de recopilación.'],
 ['Cambiar Syslog por CEF aunque la fuente no emita ese formato','El formato emitido por la fuente determina la ruta; no es una preferencia arbitraria.']]);
Q('env-283','Rutas y transformaciones de ingesta',['ingesta'],
 'Connect incidents & alerts está activo y el SOC ve alertas XDR, pero no encuentra DeviceEvents para hunting. ¿Qué configuración debe distinguir?',[
 ['Connect events y las tablas compatibles seleccionadas para telemetría','La sincronización de alertas e incidentes no sustituye la selección de datos crudos.'],
 ['Volver a conectar los conectores heredados porque traían todas las tablas Device','Los conectores independientes heredados traían alertas, no el dato crudo.'],
 ['Crear un incidente manual porque cada incidente materializa automáticamente DeviceEvents','Crear un objeto de gestión no configura exportación de telemetría.'],
 ['Habilitar DeviceTvm* en Connect events porque acepta cualquier tabla de hunting','Los apuntes excluyen DeviceTvm* de esa ruta y requieren una ruta personalizada.']]);
Q('env-284','Rutas y transformaciones de ingesta',['ingesta','permisos'],
 'Azure Policy con DeployIfNotExists queda asignada para exportar logs. Los recursos nuevos se configuran, pero los antiguos no. ¿Qué dos elementos revisas?',[
 ['La remediation task para los recursos existentes','Los apuntes requieren remediación de existentes; los nuevos se configuran al evaluarse.'],
 ['Los permisos de la identidad administrada para crear diagnostic settings','La identidad de la asignación necesita capacidad de desplegar los settings.'],
 ['El cierre de los incidentes antiguos para que la policy los recopile','La policy despliega configuración de recursos, no recopila según el cierre de incidentes.'],
 ['La retención nativa de Entra como sustituto de cualquier diagnostic setting de Azure','Son almacenes y ámbitos distintos; no sustituye este despliegue.']],[0,1]);
Q('env-285','Rutas y transformaciones de ingesta',['ingesta'],
 'El emisor envía JSON válido y la tabla custom existe, pero se cambió su esquema sin revisar la DCR. Después la ingesta falla. ¿Qué contrato debe verificarse?',[
 ['Stream de entrada, transformación, outputStream y esquema final de la tabla','Modificar la tabla no actualiza automáticamente las DCR que escriben en ella.'],
 ['Solo la sintaxis JSON, porque la DCR se adapta automáticamente a cada columna','La salida de transformación debe encajar explícitamente con el destino.'],
 ['Solo el título de la analytics rule que consume esa tabla','La regla consulta lo almacenado y no configura el contrato de entrada y salida.'],
 ['Eliminar TimeGenerated porque toda tabla custom lo calcula sin configuración','Los apuntes exigen asegurar TimeGenerated dentro del esquema.']]);
Q('env-286','Rutas y transformaciones de ingesta',['ingesta'],
 'Un equipo quiere eventos adicionales de endpoints MDE hacia Sentinel y supone que debe sustituir toda la telemetría Device*. ¿Qué describe Custom Data Collection?',[
 ['Una ruta adicional con reglas y tablas DeviceCustom*, sin sustituir la telemetría habitual','Los apuntes delimitan Custom Data Collection como eventos adicionales hacia un workspace elegido.'],
 ['Un reemplazo obligatorio de DeviceEvents por DeviceCustomEvents en todo el tenant','La ruta no sustituye la telemetría habitual y usa tablas por tipo de evento.'],
 ['Una opción que no requiere seleccionar ningún workspace de destino','El workspace Sentinel seleccionado es un requisito explícito.'],
 ['Una función que se activa en cualquier plan de MDE sin otros requisitos','Los apuntes exigen MDE Plan 2 y describen requisitos para alcance selectivo.']]);
Q('env-287','Rutas y transformaciones de ingesta',['ingesta'],
 'Una transformación debe convertir un campo del JSON de entrada antes de almacenarlo. El equipo intenta consultar por nombre la tabla de destino dentro del flujo. ¿Qué superficie representa la entrada?',[
 ['source, la tabla virtual del stream entrante','La transformación trabaja por registro entrante y devuelve columnas compatibles con el destino.'],
 ['La tabla _SRCH, creada automáticamente por toda transformación','_SRCH corresponde a Search job, no a la entrada de una transformación.'],
 ['La tabla ya almacenada, porque transformar siempre ocurre después de la retención','Las transformaciones de ingesta operan antes de almacenar los registros.'],
 ['El incidente que contiene la alerta, porque determina el esquema JSON','El incidente es un objeto de gestión, no el stream de ingesta.']]);
Q('env-288','Retención y costes en contexto',['retencion-nativa'],
 'Un investigador encuentra un cambio de grupo de Entra en Purview Audit cuando el registro nativo ya expiró. ¿Qué explica que un mismo hecho pueda seguir disponible?',[
 ['El registro nativo y su copia en Unified Audit Log tienen retenciones independientes','Los apuntes describen el evento desde Entra y también dentro de la auditoría unificada.'],
 ['Purview reconstruye automáticamente eventos que nunca capturó','La disponibilidad procede de su captura y retención, no de reconstrucción de datos ausentes.'],
 ['La retención más larga de Purview modifica retroactivamente la de Entra','Cada almacén conserva el dato según su propia retención.'],
 ['Un Audit search job cambia permanentemente la licencia del usuario','El job busca registros; no cambia licencias ni su retención nativa.']]);
Q('env-289','Retención y costes en contexto',['retencion-nativa'],
 'El tenant dispone de Audit Premium y asume que cualquier record de cualquier usuario dura un año. Una actividad de un invitado caduca antes. ¿Qué distinción debe revisar?',[
 ['La actividad, el usuario generador y su licencia elegible, no solo la licencia global del tenant','El año por defecto se delimita a ciertas actividades y usuarios elegibles; invitados siguen 180 días.'],
 ['Solo la fecha en que se creó la búsqueda, porque reinicia la retención del record','Crear una búsqueda no vuelve a introducir el record en el auditing pipeline.'],
 ['Solo el permiso del investigador, que fija la duración de cada record','El rol determina acceso; no sustituye los requisitos de retención del generador.'],
 ['El número de incidentes asociados, porque conservar un case retiene todo el audit log','Los almacenes y artefactos de cases tienen reglas propias y no amplían todo el audit log.']]);
Q('env-290','Retención y costes en contexto',['retencion-nativa'],
 'Se crea una custom audit retention policy prioritaria después de que entrara un record. El SOC pretende ampliar también aquel record y otros ya expirados. ¿Qué límite debe explicar?',[
 ['La retención se fija al entrar al pipeline; la nueva policy afecta a records nuevos','Las policies y cambios posteriores de licencia no recuperan ni cambian retroactivamente records.'],
 ['La prioridad 1 vuelve retroactiva la policy sobre cualquier record antiguo','La prioridad decide entre policies aplicables, no elimina el límite temporal.'],
 ['La nueva policy recupera cualquier record al repetir una búsqueda','Una búsqueda no reconstruye registros expirados.'],
 ['Toda custom policy pierde frente a la default aunque se aplique a records nuevos','Los apuntes dan precedencia a la custom sobre la default.']]);
Q('env-291','Retención y costes en contexto',['retencion-sentinel'],
 'Se propone mover una tabla de detección a Data Lake only para ahorrar, manteniendo sus alertas en tiempo real. ¿Qué dependencia debe revisarse antes?',[
 ['La detección necesita datos en Analytics; Data Lake only no alimenta alertas en tiempo real','Los apuntes exigen revisar qué reglas y consultas dejarán de funcionar al cambiar tier.'],
 ['Data Lake only mantiene automáticamente todas las analytics rules sin materialización','No ofrece las funciones de alerting en tiempo real de Analytics.'],
 ['Aumentar total retention activa por sí solo funciones de detección en todos los tiers','Retención y capacidades de consulta/detección son decisiones distintas.'],
 ['Un workbook convierte permanentemente los datos del lake en Analytics','La visualización no materializa por sí sola el dato en otro tier.']]);
Q('env-292','Retención y costes en contexto',['retencion-sentinel'],
 'El analista reduce total retention de 365 a 180 días y otro reduce solo Analytics retention de 180 a 90. ¿Cuál de los dos cambios reduce la vida máxima del dato?',[
 ['El primero; el segundo cambia la ventana caliente sin reducir por sí solo la vida total','Los apuntes distinguen reducción de total retention y salida de Analytics hacia largo plazo.'],
 ['Ambos eliminan inmediatamente cualquier dato fuera de la nueva ventana caliente','Bajar Analytics no borra el dato conservado por total retention; bajar total tiene gracia.'],
 ['Solo el segundo, porque total retention describe únicamente una caché de búsqueda','Total retention fija la vida máxima, no una caché de resultados.'],
 ['Ninguno puede afectar datos existentes porque toda retención es siempre futura','El cambio de total retention sí deja datos fuera del nuevo límite.']]);
Q('env-293','Retención y costes en contexto',['retencion-sentinel'],
 'El dashboard muestra alertas gratuitas en SecurityAlert y el presupuesto asume que toda la telemetría que las originó también se ingiere gratis. ¿Qué diferencia debe explicar?',[
 ['La exención de alertas no hace gratuitas las tablas crudas como DeviceEvents o EmailEvents','Los apuntes separan tipos sin cargo de ingesta y eventos crudos facturados aparte.'],
 ['Una alerta convierte retroactivamente en gratis todos los eventos relacionados','La exención no se extiende de esa forma a su telemetría de origen.'],
 ['SentinelAudit es gratis porque cualquier tabla de auditoría empieza por Sentinel','Los apuntes excluyen SentinelAudit de esa afirmación.'],
 ['Habilitar UEBA elimina el coste de todas sus tablas porque no requiere SKU adicional','No tener SKU adicional no implica ausencia de factura por tablas de UEBA.']]);
Q('env-294','Retención y costes en contexto',['retencion-sentinel'],
 'SOC optimization recomienda reducir ingesta de una tabla. El equipo da por aplicado el cambio y no revisa sus detecciones. ¿Qué debe hacer?',[
 ['Revisar la recomendación y sus dependencias de detección, cumplimiento e investigación antes de aplicarla','SOC optimization propone cambios, no los ejecuta; deben contrastarse con esas necesidades.'],
 ['Esperar que la recomendación modifique automáticamente la DCR y todas las reglas','La propuesta no ejecuta las modificaciones automáticamente.'],
 ['Aceptar siempre la reducción si mejora el coste, aunque elimine evidencias necesarias','Los apuntes exigen conservar las necesidades de investigación y cumplimiento.'],
 ['Usar daily cap como sustituto permanente de ese análisis de valor','La cap protege contra picos y puede perder eventos; no es el método normal de ahorro.']]);
Q('env-295','Inteligencia y detecciones aplicadas',['ti'],
 'Un indicador alcanzó ValidUntil, pero su fila sigue en ThreatIntelIndicators. El SOC lo considera aún válido solo porque puede consultarlo. ¿Qué debe distinguir?',[
 ['La validez operativa del indicador y la retención de su registro','Al vencer deja de considerarse válido, pero sus filas permanecen según retención.'],
 ['Toda fila presente implica vigencia y debe generar coincidencias indefinidamente','La presencia física no anula ValidUntil.'],
 ['ValidUntil es la fecha de borrado inmediato garantizado de la tabla','La caducidad del indicador y la eliminación por retención son conceptos distintos.'],
 ['Copiarlo a un workbook cambia automáticamente su fecha de validez','Una visualización no modifica la vigencia del objeto.']]);
Q('env-296','Inteligencia y detecciones aplicadas',['ti'],
 'La integración necesita compartir objetos STIX con otra plataforma TAXII. El técnico espera que TAXII Export convierta Sentinel en servidor. ¿Qué diseño describen los apuntes?',[
 ['Configurar el destino TAXII 2.1 externo; el conector exporta, Sentinel no actúa como servidor','STIX representa objetos y TAXII transporta colecciones; exportar no crea un servidor Sentinel.'],
 ['Publicar una tabla custom _CL como API root y tratarla como servidor TAXII','Una tabla no implementa el protocolo de transporte TAXII.'],
 ['Usar el indicador de MDE para transportar automáticamente relaciones STIX','El enforcement del endpoint no sustituye la ruta de exportación TI.'],
 ['Cambiar STIX por TAXII porque ambos son formatos equivalentes de objetos','Los apuntes diferencian formato de representación y protocolo de transporte.']]);
Q('env-297','Inteligencia y detecciones aplicadas',['ti'],
 'Una integración nueva envía actores y relaciones, pero el dashboard solo consulta ThreatIntelIndicators. ¿Qué tabla y distinción debe revisar?',[
 ['ThreatIntelObjects para objetos que no son indicator; los indicadores tienen su propia tabla','Los apuntes separan indicator y otros objetos STIX por tabla.'],
 ['ThreatIntelligenceIndicator, porque la tabla heredada recibe todos los objetos nuevos','La tabla heredada dejó de recibir datos según los apuntes.'],
 ['DeviceEvents, porque toda relación STIX es un evento de endpoint','Los objetos de inteligencia no son telemetría DeviceEvents.'],
 ['SecurityIncident, porque cualquier threat actor crea automáticamente un incidente','Un objeto de inteligencia no es por sí solo una detección o incidente.']]);
Q('env-298','Inteligencia y detecciones aplicadas',['scheduled'],
 'Durante mantenimiento se quiere detener una scheduled rule conservando su configuración. El equipo propone un threshold -1. ¿Qué control corresponde?',[
 ['Disable durante el mantenimiento y Enable al terminar','El threshold decide si el resultado alerta; los apuntes indican pausar mediante Disable.'],
 ['Threshold -1 porque significa siempre no alertar','La comparación del threshold no expresa una pausa de ejecución.'],
 ['Borrar la regla y esperar que su histórico reconstruya automáticamente la configuración','Borrarla no es el mecanismo de pausa conservando configuración.'],
 ['Cambiar entity mapping porque también desactiva la ejecución de KQL','El mapeo no es un interruptor de ejecución de la regla.']]);
Q('env-299','Inteligencia y detecciones aplicadas',['custom'],
 'Se copia a una custom detection periódica sobre SigninLogs el filtro TimeGenerated de una scheduled rule. Las filas que llegan tarde quedan excluidas. ¿Qué diferencia del motor debes respetar?',[
 ['La custom detection aplica el lookback por ingesta; no debe recortar además por tiempo del evento','Los apuntes contrastan el control temporal de scheduled con el lookback gestionado de custom detections.'],
 ['Ambos motores usan siempre TimeGenerated de la misma manera y no admiten retrasos','La custom detection considera cuándo llegó la fila.'],
 ['Cambiar el filtro a Timestamp resuelve siempre cualquier pérdida de eventos tardíos','Los apuntes también piden no filtrar por Timestamp en ese mecanismo.'],
 ['Eliminar la columna TimeGenerated entera es imprescindible para crear la regla','Evitar el filtro no equivale a eliminar la columna informativa.']]);
Q('env-300','Inteligencia y detecciones aplicadas',['custom'],
 'La custom detection devuelve AccountUpn y mapea una cuenta. Se quiere añadir Mark user as compromised. ¿Qué identificación debe conservar para esa acción?',[
 ['Un identificador de objeto como AccountObjectId, según las columnas admitidas','La acción exige identificador de objeto; el UPN puede servir al mapeo general pero no basta.'],
 ['Solo AccountUpn porque cualquier columna de entity mapping sirve a cualquier acción','Los identificadores requeridos para actuar dependen de la acción.'],
 ['Solo DeviceId porque identifica por igual cuenta y dispositivo','DeviceId corresponde al dispositivo, no al objeto de usuario requerido.'],
 ['Solo el título dinámico de la alerta con el nombre del usuario','El título descriptivo no sustituye un identificador fuerte de la entidad.']]);
Q('env-301','Inteligencia y detecciones aplicadas',['custom'],
 'Una consulta MDE se resume y elimina DeviceId y ReportId. La detección se guarda, pero el scope y el process tree pierden contexto. ¿Qué corrección se justifica?',[
 ['Conservar esos identificadores para scope de dispositivo y reconstrucción del evento','Los apuntes describen columnas recomendadas cuya omisión puede perder contexto sin impedir guardar.'],
 ['Suponer que guardar la regla demuestra que todas las columnas relevantes están presentes','Creación válida y conservación de contexto investigativo no son equivalentes.'],
 ['Reemplazar ambos por el nombre de la categoría de alerta','La categoría no identifica el dispositivo ni el evento del reporte.'],
 ['Cambiar a Continuous para que cualquier columna eliminada sea reconstruida automáticamente','La frecuencia no restaura columnas recortadas de la salida.']]);
Q('env-302','Inteligencia y detecciones aplicadas',['scheduled','custom'],
 'La fuente ingiere con quince minutos de demora. El SOC activa Continuous y promete alertar un minuto después de que ocurra el evento. ¿Qué límite temporal debe corregir?',[
 ['Ningún motor puede evaluar una fila antes de que llegue; Continuous no elimina latencia de origen','El mecanismo acelera evaluación tras la ingesta, no la generación y entrega de telemetría.'],
 ['Continuous calcula y genera por sí mismo el evento que falta en la fuente','La frecuencia de una detección no reconstruye una fila aún inexistente.'],
 ['Scheduled elimina siempre toda latencia al aumentar el lookback','Ampliar lookback permite no perder eventos tardíos, pero no adelanta su llegada.'],
 ['Usar una tabla Basic hace que la misma fuente se ingiera sin demora','El plan cambia capacidades y costes, no ofrece esa garantía de latencia.']]);
Q('env-303','Inteligencia y detecciones aplicadas',['scheduled'],
 'Una NRT de Sentinel usa alertas por evento y una ejecución encuentra cuarenta resultados. ¿Qué comportamiento evita asumir que solo existirán treinta coincidencias?',[
 ['Puede emitir 29 alertas individuales y una trigésima que resume el resto','El máximo de alertas por ejecución no equivale al máximo de resultados del conjunto.'],
 ['Descarta necesariamente todos los resultados después del trigésimo','Los apuntes describen resumen del resto, no eliminación obligatoria de esas coincidencias.'],
 ['Aumenta automáticamente a cuarenta el límite porque es NRT','La frecuencia no elimina el límite por ejecución descrito.'],
 ['Obliga a una única tabla porque comparte todos los límites de Continuous','Sentinel NRT y Continuous de custom detections tienen restricciones distintas.']]);
Q('response-203','Correlación y gestión de cases',['correlacion'],
 'Dos incidentes parecen parte del mismo ataque, pero tienen propietarios distintos y no se fusionan automáticamente. ¿Qué debe valorar el SOC?',[
 ['Verificar la relación y resolver el bloqueo de propietarios antes de una fusión manual justificada','Los apuntes enumeran propietarios distintos entre los límites de merge automático.'],
 ['Borrar uno para que el otro conserve automáticamente toda su evidencia','Borrar un incidente no es el mecanismo de absorción de contenido descrito.'],
 ['Abrir All associated incidents para ejecutar obligatoriamente el merge','Esa vista amplía contexto y no realiza una fusión.'],
 ['Cambiar solo el título porque la correlación se basa exclusivamente en él','Los títulos pueden cambiar y no constituyen ese criterio exclusivo de correlación.']]);
Q('response-204','Correlación y gestión de cases',['correlacion'],
 'Tras un merge, el incidente source queda Redirected y cerrado. Un analista cree que desapareció su evidencia y propone reabrirlo como incidente independiente. ¿Qué debe comprobar primero?',[
 ['El target que absorbió el contenido y la redirección del source','En el merge descrito, el source no desaparece y el target absorbe su contenido.'],
 ['La papelera del workspace porque Redirected equivale siempre a borrado','Los apuntes distinguen redirección y cierre de eliminación.'],
 ['Un generic case porque todos los merges crean uno automáticamente','Un generic case vincula objetos y no es el mecanismo automático de merge descrito.'],
 ['La tabla Usage porque registra necesariamente todas las evidencias del source','Usage trata consumo y no sustituye el contenido del incidente destino.']]);
Q('response-205','Correlación y gestión de cases',['correlacion'],
 'El equipo enruta incidentes a turnos usando su título. XDR cambia el nombre al correlacionar y la regla deja de identificar el trabajo. ¿Qué propiedad es más adecuada para esa clasificación?',[
 ['Etiquetas que clasifiquen y enruten sin depender del nombre mutable','Los apuntes recomiendan etiquetas para filtrar y enrutar frente a títulos que pueden cambiar.'],
 ['Mantener el título porque nunca cambia tras generar el incidente','XDR puede cambiarlo durante correlación o fusión.'],
 ['Usar el número de alertas como identificador inmutable de equipo propietario','El número de alertas puede cambiar y no expresa por sí solo ese enrutamiento.'],
 ['Cambiar la severidad de cada alerta como sustituto del propietario','Severidad expresa riesgo y no equivale a una asignación de trabajo.']]);
Q('response-206','Correlación y gestión de cases',['correlacion'],
 'La analytics rule detectó correctamente una actividad empresarial autorizada y los datos son válidos. En Sentinel clásico, ¿qué cierre evita atribuir el caso a un fallo de lógica?',[
 ['Benign Positive: actividad real pero esperada','Los apuntes lo diferencian de falso positivo por lógica incorrecta o datos inexactos.'],
 ['False Positive - Incorrect alert logic, aunque la regla funcionó como se diseñó','Ese cierre atribuye el problema a lógica defectuosa, que aquí se descarta.'],
 ['False Positive - Inaccurate data, aunque se validó el evento','Ese motivo señala datos defectuosos y contradice la validación del escenario.'],
 ['True Positive de compromiso solo porque existe una coincidencia de consulta','Una coincidencia real de actividad legítima no confirma un compromiso.']]);
Q('response-207','Investigación por entidad y evidencia',['investigacion'],
 'El incidente no explica cómo llegó el ejecutable al endpoint. El SOC tiene una cuenta, un dispositivo y el archivo. ¿Qué recorrido amplía la investigación sin limitarla a la lista de alertas?',[
 ['Pivotar por las entity pages y la timeline, correlacionando el contexto de productos pertinentes','Los apuntes describen abandonar el límite del incidente y pivotar por entidades.'],
 ['Cambiar a Resolved para que se generen automáticamente los eventos faltantes','Cambiar estado no genera telemetría adicional.'],
 ['Revisar solo el título porque contiene siempre toda la cronología y evidencia','El resumen del incidente no reemplaza las superficies investigativas del activo.'],
 ['Suprimir las alertas que no expliquen el origen antes de consultar sus entidades','Suprimir ruido no es el paso que recupera el contexto del ataque.']]);
Q('response-208','Investigación por entidad y evidencia',['investigacion','respuesta'],
 'Se necesita capturar el estado actual del equipo para analizar persistencia, conservando Autoruns, procesos y tareas, sin ejecutar remediación. ¿Qué acción encaja?',[
 ['Collect investigation package y revisión de su contenido','El paquete captura estado del dispositivo en ese momento sin modificarlo.'],
 ['Stop and quarantine file para descargar todos los Autoruns sin cambios','La cuarentena modifica procesos, archivos y persistencia; no es esa captura de estado.'],
 ['Restrict app execution como sustituto de un paquete forense','La restricción cambia ejecución permitida y no genera esa evidencia.'],
 ['Cerrar el incidente para congelar automáticamente todo el estado del endpoint','El cierre de gestión no captura la configuración y procesos del equipo.']]);
Q('response-209','Investigación por entidad y evidencia',['investigacion'],
 'El analista sabe qué alertas se generaron, pero necesita comprobar quién ejecutó acciones manuales y automáticas durante el caso. ¿Qué pestaña responde mejor?',[
 ['Activities, filtrando por performed by y estado de la actuación','La timeline de actividades documenta acciones manuales y automatizadas.'],
 ['Alerts, suponiendo que cada alerta equivale a una acción ya completada','Una alerta señala detección y no demuestra ejecución de una acción de respuesta.'],
 ['Similar incidents, porque siempre contiene el historial de operadores del caso actual','Esa superficie aporta incidentes parecidos, no sustituye la timeline de acciones.'],
 ['Assets, porque la presencia de un activo prueba que su contención terminó','La lista de activos no demuestra resultado de remediación.']]);
Q('response-210','Investigación por entidad y evidencia',['investigacion','tuning'],
 'Un archivo tiene veredicto Malicious, pero su remediación sigue Pending. El equipo interpreta el veredicto como confirmación de eliminación. ¿Qué distinción debe revisar?',[
 ['Veredicto de evidencia y estado de la remediación por separado','La investigación muestra qué es la evidencia y qué actuación se completó; no son equivalentes.'],
 ['Malicious implica siempre Success de toda acción contra el archivo','El veredicto no acredita que el agente ejecutara la respuesta.'],
 ['Pending significa que la evidencia ya es Clean y solo falta cerrar el incidente','Pendiente describe ejecución o aprobación, no cambia por sí solo el veredicto.'],
 ['Bajar severidad a Low ejecuta la remediación faltante','Severidad de alerta y resultado de actuación son aspectos diferentes.']]);
Q('response-211','Verificación de respuesta',['respuesta'],
 'Un dispositivo no administrado sospechoso comunica con endpoints MDE. El SOC quiere que los endpoints compatibles bloqueen esa comunicación, aunque no pueda aislar un agente en aquel activo. ¿Qué acción corresponde?',[
 ['Contain device mediante los equipos incorporados vecinos','Contain bloquea la comunicación hacia el no administrado; no instala agente ni lo limpia.'],
 ['Isolate device en el no administrado, como si ya tuviera un agente MDE','Isolate se describe para un dispositivo incorporado.'],
 ['Run antivirus scan desde el vecino para limpiar automáticamente el activo no administrado','La protección desde vecinos no ejecuta un análisis local sobre el activo no administrado.'],
 ['Restrict app execution en el vecino para borrar los archivos del otro equipo','Restringir ejecución no equivale a esa comunicación ni a limpiar el dispositivo remoto.']]);
Q('response-212','Verificación de respuesta',['respuesta'],
 'El aislamiento del dispositivo se levantó al cumplir siete días. El analista concluye que MDE certificó la remediación. ¿Qué comprobación falta antes de darlo por seguro?',[
 ['Confirmar fin de las acciones, tratamiento de amenaza y persistencia y aptitud para servicio','El levantamiento automático del aislamiento no certifica limpieza.'],
 ['Ninguna: el plazo de aislamiento es una prueba suficiente de remediación','Los apuntes separan caducidad de contención y verificación de seguridad.'],
 ['Solo comprobar que el incidente está Closed, sin revisar el activo','El cierre de gestión no demuestra el resultado en el dispositivo.'],
 ['Solo asignar un propietario diferente para reiniciar la protección','La asignación de trabajo no verifica ni remedia la amenaza.']]);
Q('response-213','Verificación de respuesta',['respuesta','endpoint'],
 'El SOC puso un archivo malicioso en cuarentena y espera impedir todas sus futuras ejecuciones. ¿Qué control persistente debe valorar además?',[
 ['Un indicador de bloqueo, con los prerrequisitos de enforcement correspondientes','La cuarentena puntual trata lo observado y no sustituye el control preventivo persistente.'],
 ['Solo restaurar el archivo para confirmar que la cuarentena se ejecutó','Restaurar un archivo malicioso no constituye prevención futura.'],
 ['Una Automation folder exclusion para evitar que AIR vuelva a mirarlo','La exclusión evita examen de AIR; no bloquea nuevas ejecuciones.'],
 ['Cerrar su alerta para que cualquier copia futura quede bloqueada','Resolver la alerta no impide por sí mismo ejecuciones futuras.']]);
Q('response-214','Verificación de respuesta',['respuesta'],
 'El SOC necesita impedir ejecuciones no autorizadas manteniendo archivos firmados por Microsoft. ¿Qué diferencia evita elegir aislamiento como si fuera el mismo control?',[
 ['Restrict app execution limita qué archivos se ejecutan; Isolate restringe red','Los apuntes diferencian restricción de aplicaciones y aislamiento de comunicación.'],
 ['Isolate device permite solo ejecutables firmados por Microsoft','Esa característica corresponde a la restricción de ejecución, no al aislamiento.'],
 ['Contain device desinstala cualquier aplicación no firmada del endpoint','Contain bloquea comunicación con un activo; no realiza esa desinstalación.'],
 ['Download quarantined files impide ejecutar nuevas aplicaciones','Esa opción conserva copia descargable de cuarentena y no restringe ejecución.']]);
Q('response-215','Verificación de respuesta',['respuesta'],
 'Se movió un mensaje de phishing a Deleted items y el equipo lo describe como purgado del buzón. ¿Qué explicación distingue movimiento y eliminación?',[
 ['Moverlo solo cambia su carpeta; no equivale a Soft delete ni Hard delete','Los apuntes diferencian ubicación dentro del buzón y las acciones de eliminación.'],
 ['Deleted items y Hard delete significan exactamente la misma ubicación y recuperación','Hard delete purga para el usuario y tiene un tratamiento distinto.'],
 ['Soft delete es siempre irrecuperable incluso para el administrador','Soft delete va a Recoverable Items y admite recuperación.'],
 ['Cualquier movimiento a carpeta elimina automáticamente adjuntos de todos los destinatarios','La acción de mover no ofrece ese efecto global de eliminación.']]);
Q('response-216','Verificación de respuesta',['respuesta'],
 'Se aplicó Hard delete, pero hay conservación aplicable y single-item recovery. El SOC promete que ni el administrador podrá recuperar el mensaje. ¿Qué debe corregir?',[
 ['Hard delete purga para el usuario, pero puede permitir recuperación administrativa bajo esas condiciones','Los apuntes excluyen que Hard delete signifique siempre irrecuperable.'],
 ['La existencia de conservación convierte la acción en Move to inbox','Conservación y recuperación no cambian la acción a un movimiento de carpeta.'],
 ['Hard delete hace que el mensaje vuelva a ser siempre accionable en Explorer','Los ya hard-deleted no se consideran accionables en la remediación descrita de Explorer.'],
 ['Single-item recovery elimina la necesidad de comprobar los action logs','Recuperabilidad y verificación del resultado son cuestiones independientes.']]);
Q('response-217','Verificación de respuesta',['respuesta'],
 'Un falso negativo se envía mediante Submissions y el analista asume que desapareció de todos los buzones. ¿Qué dos pasos debe separar?',[
 ['La evaluación del envío y la acción de remediación sobre mensajes accionables','Submissions solicita evaluación; retirar correo requiere la acción y su verificación.'],
 ['Submissions y Soft delete, porque son siempre dos nombres de la misma operación','Los apuntes distinguen análisis enviado a Microsoft y actuación sobre el buzón.'],
 ['El veredicto y la propiedad del case, porque cambiar owner purga automáticamente','Asignar trabajo no ejecuta eliminación de mensajes.'],
 ['La notificación y el bloqueo de futuros remitentes, porque el email de aviso elimina los actuales','Una notificación comunica, no demuestra retirada de mensajes.']]);
Q('response-218','Verificación de respuesta',['mdca','respuesta'],
 'Un archivo SaaS debe dejar de ser público, pero conservar acceso de colaboradores con nombre. ¿Qué acción satisface exactamente ese alcance?',[
 ['Remove public sharing','Los apuntes describen que mantiene los colaboradores identificados.'],
 ['Make private, asumiendo que conserva a todos los colaboradores','Make private retira las comparticiones y deja acceso solo a administradores del sitio.'],
 ['Remove external users, asumiendo que su única diferencia es quitar enlaces públicos','Esa acción limita el acceso a usuarios de la compañía, no define el mismo alcance.'],
 ['Suspend user al propietario, porque equivale a editar permisos del archivo','Suspender una cuenta no es la acción de ajuste de compartición solicitada.']]);
Q('response-219','Verificación de respuesta',['respuesta'],
 'Se suspende una cuenta SaaS sincronizada solo en la nube, y después vuelve a estar habilitada. ¿Qué comprobación del origen y del resultado corresponde?',[
 ['Revisar el origen sincronizado y el Governance log de la acción','Los apuntes advierten que el origen puede revertir la suspensión aplicada solo en la nube.'],
 ['Asumir que el Governance log no puede registrar ninguna acción sobre cuentas','El registro permite comprobar éxito o fallo y ciertas reversiones.'],
 ['Repetir únicamente el cierre de incidentes porque impide toda resincronización','El cierre no controla el origen de identidad.'],
 ['Deshabilitar una app en App governance como equivalente exacto a suspender ese usuario','Las acciones sobre aplicación y cuenta son distintas.']]);
Q('response-220','Verificación de respuesta',['respuesta','cloud'],
 'Una aplicación conocida accedió sin autorización a Key Vault. El analista la reconoce y quiere descartar la alerta sin revisar qué leyó. ¿Qué actuación exigen los apuntes?',[
 ['Comprobar permisos y origen, determinar lo accedido y rotar o deshabilitar lo comprometido','Reconocer una aplicación no acredita legitimidad; hay que remediar y verificar el recurso.'],
 ['Descartar la alerta porque una aplicación conocida no puede actuar indebidamente','Identidad conocida y acceso autorizado no son equivalentes.'],
 ['Cambiar el estado de la alerta para que se roten automáticamente todos los secretos','Cambiar estado no ejecuta remediación sobre el recurso.'],
 ['Suprimir alertas similares como sustituto de retirar permisos indebidos','La supresión reduce ruido futuro y no elimina la amenaza.']]);
Q('response-221','Verificación de respuesta',['respuesta'],
 'En Live response se necesita ejecutar un script que ya está en la library. Otro analista propone putfile como si también lo ejecutara. ¿Qué distinción evita esa confusión?',[
 ['run ejecuta el script; putfile copia un archivo desde la library al equipo','Los comandos tienen efectos diferentes sobre ejecución y transferencia.'],
 ['putfile ejecuta todo archivo copiado y run solo consulta metadatos','Los apuntes asignan ejecución a run y copia a putfile.'],
 ['remediate solo carga archivos a la library sin actuar sobre el dispositivo','remediate trata archivos, registro, tareas, procesos o servicios según el tipo.'],
 ['undo restaura siempre cualquier efecto de cualquier script ejecutado','Undo solo revierte remediaciones compatibles y depende del sistema operativo.']]);
Q('response-222','Verificación de respuesta',['respuesta'],
 'Action center muestra una acción Live response action y otra Manual live response action. El SOC atribuye ambas a una sesión interactiva del analista. ¿Qué distingue el origen?',[
 ['La primera identifica acciones mediante API; la segunda corresponde a la sesión remota','Los apuntes especifican esa diferencia en el historial de acciones.'],
 ['Ambas significan ejecución manual y no pueden proceder de API','Los orígenes tienen significados diferenciados.'],
 ['Manual significa que la acción está aún Pending y Live response que terminó','Origen de acción y estado de ejecución son campos distintos.'],
 ['Las acciones de Live response nunca aparecen en History','El historial incluye acciones de Live response y de antivirus.']]);
Q('response-223','Evidencia y permisos de investigación',['retencion-nativa','respuesta'],
 'Se envió un aviso desde un case IRM y el responsable supone que el caso ya quedó cerrado y la cuenta contenida. ¿Qué debe verificar por separado?',[
 ['La resolución del case y la respuesta sobre la cuenta o activo correspondiente','Enviar un aviso no cierra automáticamente el case ni sustituye acciones de contención.'],
 ['Solo la recepción del aviso, porque ejecuta contención en todos los workloads','La comunicación no ejecuta esas respuestas sobre los activos.'],
 ['Solo borrar el usuario del case porque IRM elimina toda su actividad histórica','Gestionar un case no equivale a ese borrado universal de actividad.'],
 ['Solo cambiar DLP a Simulation para dar por contenido al usuario','Simulación DLP evalúa impacto y no contiene una cuenta.']]);
Q('response-224','Orquestación y verificación',['automatizacion'],
 'Dos automation rules del mismo trigger comparten número de orden y una depende de la etiqueta que debería añadir la otra. ¿Qué cambio evita una dependencia no garantizada?',[
 ['Asignar órdenes distintos y ascendente de forma que la segunda vea el cambio de la primera','Las reglas ven cambios anteriores, pero un empate no garantiza cuál se ejecuta primero.'],
 ['Conservar el empate porque el nombre alfabético siempre resuelve el orden','Los apuntes no garantizan ese criterio ante números iguales.'],
 ['Cambiar ambas a Enhanced Alert Trigger para conservar la prioridad numérica','Enhanced Alert Trigger no utiliza orden de prioridad.'],
 ['Usar una fecha de expiración como prioridad de ejecución','La expiración desactiva la regla al llegar la fecha, no define ese orden.']]);
Q('response-225','Orquestación y verificación',['automatizacion'],
 'Una automation rule modifica la etiqueta del incidente y se dispara otra vez por su propio cambio. ¿Qué condición ayuda a cortar el bucle?',[
 ['Updated by para distinguir quién hizo el último cambio','Los apuntes describen esa condición para evitar que la propia actualización reentre sin control.'],
 ['Aumentar la severidad en cada vuelta para que el incidente deje de actualizarse','Cambiar severidad no identifica al actor ni garantiza detener el bucle.'],
 ['Asignar el mismo order a todas las reglas que actualizan el incidente','El empate elimina garantía de orden y no resuelve la autoactivación.'],
 ['Habilitar Connect events para que ya no existan actualizaciones de incidentes','La ingesta de telemetría no impide actualizaciones del objeto de gestión.']]);
Q('response-226','Orquestación y verificación',['automatizacion'],
 'Un playbook tarda cuatro minutos en enriquecer un incidente. La automation rule inicia después una acción que requiere ese enriquecimiento completo. ¿Dónde debe quedar la dependencia?',[
 ['Dentro del propio playbook, después del paso que debe terminar','La automation rule sigue sin esperar al playbook si tarda más de dos minutos.'],
 ['Como acción posterior de la regla, porque siempre espera cualquier ejecución','Los apuntes describen un límite de espera y no esa garantía.'],
 ['En otra regla empatada en order, porque correrá exactamente tras cuatro minutos','Un empate no garantiza orden ni tiempo de finalización.'],
 ['En una notificación de endpoint para que complete automáticamente el enriquecimiento','La notificación avisa y no ejecuta el paso dependiente.']]);
Q('response-227','Orquestación y verificación',['automatizacion'],
 'Un playbook disparado desde una entidad necesita actualizar un incidente relacionado, pero no recibe todo el contexto de un trigger de incidente. ¿Qué dato debe obtener?',[
 ['El Incident ARM ID que identifica el incidente a actualizar','El trigger de entidad se centra en el activo; para actualizar el incidente necesita su identificador ARM.'],
 ['Solo el título visible porque todos los incidentes lo conservan único e inmutable','El nombre puede cambiar y no sustituye el identificador de actualización descrito.'],
 ['Solo DeviceId porque identifica también cualquier incidente asociado','DeviceId identifica un dispositivo, no el incidente como recurso.'],
 ['Nada: todos los triggers reciben exactamente el mismo esquema de incidente','El trigger determina objeto y esquema, y entidad no ofrece el mismo contexto completo.']]);
Q('response-228','Orquestación y verificación',['automatizacion'],
 'El diseño requiere Logic App Standard por control de red y varios workflows. Se propone un workflow stateless para Sentinel. ¿Qué compatibilidad debe corregirse?',[
 ['Los workflows Standard usados por Sentinel deben ser stateful','Los apuntes exigen conservar historial de ejecución paso a paso en ese modelo.'],
 ['Sentinel exige siempre stateless para que no se guarden resultados de seguridad','La condición descrita es precisamente stateful.'],
 ['Standard y Consumption son el mismo modelo de alojamiento con nombres diferentes','Standard es single-tenant y Consumption corre en entorno compartido.'],
 ['Elegir Standard elimina toda autenticación de los conectores de Teams y Outlook','Cada conector conserva sus requisitos de autenticación.']]);
Q('response-229','Orquestación y verificación',['automatizacion'],
 'El asistente genera un playbook con Python e integration profiles. El SOC pretende usarlo sin revisión y llamar desde él otro playbook. ¿Qué dos restricciones debe atender?',[
 ['Revisarlo, validarlo y activarlo porque nace deshabilitado','Los apuntes no equiparan generación automática con uso validado y activo.'],
 ['No puede invocar a otro playbook según los límites descritos','Esa opción tiene límites distintos del playbook tradicional de Azure Logic Apps.'],
 ['Es una Logic App Consumption sin diferencias de ejecución','El playbook generado es una opción diferenciada con Python e integration profiles.'],
 ['No necesita una entrada compatible de alerta o incident case','Los apuntes delimitan esos objetos como entradas admitidas.']],[0,1]);
Q('response-230','Orquestación y verificación',['automatizacion'],
 'Se editó un playbook en el portal y el siguiente despliegue de Sentinel Repositories sobrescribió el cambio. ¿Qué diferencia debe mantener el equipo?',[
 ['El repositorio es fuente de verdad de despliegue; desplegar definición no es ejecutar el trigger','Los apuntes advierten de sobrescritura por CI/CD y separan despliegue de ejecución.'],
 ['La ejecución de cada trigger debe escribir de vuelta automáticamente toda edición del portal','No se describe esa sincronización bidireccional automática.'],
 ['Sentinel Repositories solo despliega consultas y nunca playbooks','Los apuntes incluyen automation rules y playbooks en su contenido desplegable.'],
 ['Cerrar el incidente evita permanentemente futuros despliegues del repositorio','El ciclo del incidente no controla el pipeline de despliegue.']]);
Q('response-231','Orquestación y verificación',['automatizacion','respuesta'],
 'Una acción AIR de MDE quedó pendiente en un nivel Semi y nadie decidió durante siete días. El equipo la trata como aprobación implícita. ¿Qué resultado debe comprobar?',[
 ['La acción pendiente caduca y se comporta como rechazada','Los apuntes especifican siete días de caducidad de acciones pendientes en Semi.'],
 ['La acción se aprueba automáticamente al expirar cualquier espera','La caducidad no concede aprobación.'],
 ['La caducidad desactiva todo el antivirus del device group','No automated response tampoco equivale a apagar toda protección; caducar una acción no lo hace.'],
 ['La opción Semi cambia automáticamente la configuración AIR de MDO','Las configuraciones MDE y MDO se gobiernan por mecanismos distintos.']]);
Q('response-232','Orquestación y verificación',['automatizacion','respuesta'],
 'El SOC recibe un correo de acciones de respuesta completadas, pero faltan las acciones de una custom detection. ¿Qué límite evita interpretar el aviso como inventario completo?',[
 ['Esas notificaciones no cubren las acciones de custom detections; hay que verificar su ejecución aparte','La ruta de notificación tiene límites de cobertura y no sustituye comprobar el resultado.'],
 ['Si no hubo email, ninguna acción de la custom detection pudo ejecutarse','La ausencia de aviso no demuestra ausencia de ejecución en una ruta excluida.'],
 ['Enviar un correo de prueba ejecuta todas las acciones pendientes','El correo de prueba verifica notificación, no remediación.'],
 ['El destinatario del aviso hereda automáticamente permisos para todas las acciones','Notificación y autorización de respuesta son ejes diferentes.']]);
Q('hunt-117','KQL: semántica y correlación',['kql'],
 'Se comparan los activos observados con una watchlist de autorizados. El informe debe devolver solo activos observados sin coincidencia en la referencia. ¿Qué join conserva esa semántica?',[
 ['leftanti con observados a la izquierda','Devuelve las filas de la izquierda sin coincidencia y es la búsqueda de ausencias solicitada.'],
 ['leftsemi con observados a la izquierda','Devuelve los observados que sí coinciden, el conjunto contrario.'],
 ['innerunique con observados a la izquierda','Solo devuelve coincidencias y además deduplica la clave izquierda.'],
 ['rightouter con autorizados a la derecha','Conserva el lado derecho y no expresa solo observados no autorizados.']],[0],
 'observados\n| join kind=[Target] autorizados on Clave');
Q('hunt-118','KQL: semántica y correlación',['kql'],
 'El inventario debe conservar todos los dispositivos aunque algunos no tengan eventos de alerta. El analista usa inner y pierde esos dispositivos. ¿Qué cambio mantiene el inventario completo?',[
 ['leftouter con inventario a la izquierda','Mantiene todas las filas izquierdas y deja null donde no hay coincidencia.'],
 ['innerunique con inventario a la izquierda','Sigue conservando solo coincidencias y puede deduplicar claves izquierdas.'],
 ['leftanti con inventario a la izquierda','Mantendría solo dispositivos sin coincidencia y perdería los que sí tienen alertas.'],
 ['Cambiar el orden de las entradas sin revisar kind','Intercambiar lados puede cambiar semántica; no asegura conservar el inventario.']],[0],
 'inventario\n| join kind=[Target] alertas on DeviceId');
Q('hunt-119','KQL: semántica y correlación',['kql'],
 'Se necesita añadir una columna calculada a cada evento sin perder las otras columnas. La consulta actual usa project y desaparecen campos usados después. ¿Qué corrección encaja?',[
 ['Usar extend para el cálculo o proyectar expresamente las columnas necesarias','extend conserva columnas existentes; project retira las que omite.'],
 ['Usar summarize sin by para conservar todas las filas de eventos','Un agregado global reduce el conjunto a un resultado.'],
 ['Usar project-away para añadir la columna nueva','project-away elimina columnas indicadas; no expresa ese cálculo.'],
 ['Usar render para restaurar columnas que ya se proyectaron fuera','render dibuja la salida y no reconstruye columnas eliminadas.']]);
Q('hunt-120','KQL: semántica y correlación',['kql'],
 'El tablero debe contar intentos fallidos por cuenta y devolver una fila por cuenta. La consulta omite by y devuelve un único total. ¿Qué falta?',[
 ['La agrupación por la cuenta dentro de summarize','Sin by se agrega todo el conjunto; la clave define cada grupo solicitado.'],
 ['Ordenar por cuenta después del total global','Ordenar no reconstruye grupos que ya fueron agregados juntos.'],
 ['Añadir take 10 antes del conteo para crear diez cuentas','take limita filas y no define agrupación por cuenta.'],
 ['Usar dcount para que cualquier agregado global devuelva una fila por cuenta','dcount estima valores distintos; no sustituye la clave by de agrupación.']],[0],
 'eventos\n| summarize Fallos=countif(Resultado == "Fallo") [Target]');
Q('hunt-121','KQL: semántica y correlación',['kql'],
 'El informe muestra cantidad de usuarios distintos y usa dcount. Dos ejecuciones con grandes conjuntos muestran una pequeña diferencia. ¿Qué limitación debe explicar antes de afirmar corrupción?',[
 ['dcount estima cardinalidad y puede variar ligeramente','Los apuntes describen que prioriza rendimiento y no promete un conteo exacto de distintos.'],
 ['dcount cuenta todas las filas y no distingue usuarios repetidos','dcount estima valores distintos, a diferencia de count de filas.'],
 ['Cada ejecución de dcount borra usuarios del almacén','Los agregados de consulta no eliminan registros almacenados.'],
 ['render cambia aleatoriamente los datos agregados antes de dibujar','La visualización no altera el dato calculado por la consulta.']]);
Q('hunt-122','KQL: semántica y correlación',['kql'],
 'La investigación necesita una serie horaria de eventos. Se devuelve un conteo por cada Timestamp exacto y el gráfico queda fragmentado. ¿Qué preparación organiza la ventana?',[
 ['Agrupar mediante bin(Timestamp, 1h) y terminar con render timechart','bin agrupa el tiempo por intervalo y timechart usa el eje datetime.'],
 ['Usar top 1 by Timestamp para obtener automáticamente una serie completa','top 1 reduce a una fila y no resume todas las ventanas horarias.'],
 ['Cambiar Timestamp a texto antes de usar timechart','El eje temporal debe ser datetime según los apuntes.'],
 ['Añadir render antes de summarize para que la agrupación conserve sus ejes','render debe ser el último operador sobre una salida tabular preparada.']],[0],
 'eventos\n| summarize Total=count() by [Target]\n| render timechart');
Q('hunt-123','KQL: semántica y correlación',['kql'],
 'El analista quiere los diez eventos más recientes y usa take 10. ¿Por qué el resultado no garantiza esa selección?',[
 ['take no garantiza orden; debe ordenar o usar top 10 by Timestamp desc','Los apuntes distinguen limitar filas sin orden y seleccionar las primeras tras ordenarlas.'],
 ['take ordena siempre por Timestamp asc y basta invertir el número','take no tiene ese orden temporal implícito.'],
 ['top devuelve siempre las últimas diez sin necesitar una columna','top ordena por la columna indicada y no elige automáticamente una.'],
 ['Añadir project-reorder ordena también las filas por fecha','project-reorder ordena columnas, no filas.']]);
Q('hunt-124','KQL: semántica y correlación',['kql'],
 'Una lista de dominios debe conservar cuántas veces se repitió cada valor en el array agregado. La consulta usa make_set y desaparecen repeticiones. ¿Qué función responde a esa necesidad?',[
 ['make_list, porque conserva valores repetidos','Los apuntes contrastan lista con conjunto que elimina duplicados.'],
 ['make_set con un nombre de columna distinto','Renombrar la salida no cambia la eliminación de duplicados.'],
 ['dcount, porque devuelve todos los valores y repeticiones','dcount estima cardinalidad y no construye ese array con duplicados.'],
 ['arg_max, porque conserva cada repetición de todas las filas','arg_max selecciona una fila por grupo según la expresión, no todas las repeticiones.']]);
Q('hunt-125','KQL: semántica y correlación',['kql'],
 'La consulta extrae de texto un número con regex. Con extract(...,0,...) obtiene el texto completo que coincidió, pero necesita solo el primer grupo y un valor long. ¿Qué combinación corresponde?',[
 ['Índice de grupo 1 y el argumento de conversión typeof(long)','El grupo 0 es toda la coincidencia; 1 es el primer grupo entre paréntesis.'],
 ['Grupo 0 y cambiar el nombre de la columna a NumeroLong','El nombre de columna no selecciona grupo ni convierte el tipo.'],
 ['Grupo 1 y render para realizar la conversión numérica','render visualiza y no sustituye el argumento de tipo.'],
 ['Grupo 2 porque el primer grupo siempre se cuenta desde cero','En extract, el primer grupo capturado se identifica con 1.']]);
Q('hunt-126','KQL: semántica y correlación',['kql'],
 'El analista parsea texto y debe conservar únicamente filas que coinciden con el patrón. Con parse quedan también filas no coincidentes. ¿Qué operador expresa el filtro requerido?',[
 ['parse-where','Además de extraer columnas, elimina filas que no coinciden con el patrón.'],
 ['parse kind=relaxed sin ningún filtro posterior','relaxed tolera conversión fallida con null; no expresa el filtrado solicitado.'],
 ['project-rename','Renombra columnas y no evalúa ni filtra el patrón.'],
 ['union kind=inner','Selecciona columnas compartidas al apilar tablas, no coincidencia de patrones en filas.']]);
Q('hunt-127','KQL: semántica y correlación',['kql'],
 'AdditionalFields contiene JSON y la consulta debe agrupar por una propiedad textual. Se propone comparar directamente toda la cadena JSON. ¿Qué preparación conserva la propiedad necesaria?',[
 ['parse_json, acceso a la propiedad y tostring antes de agrupar','Los apuntes indican convertir JSON a dynamic y después tipar la propiedad usada.'],
 ['mv-expand de la cadena sin convertirla ni identificar una propiedad','Expandir no sustituye interpretar JSON ni seleccionar su propiedad.'],
 ['project-away AdditionalFields antes de cualquier extracción','Eliminar el campo fuente impide extraer después su propiedad.'],
 ['render table para que la visualización parsee automáticamente el JSON','La representación no sustituye las operaciones de extracción y conversión.']],[0],
 'eventos\n| extend Datos=parse_json(AdditionalFields)\n| extend Accion=tostring(Datos.accion)\n| summarize Total=count() by Accion');
Q('hunt-128','KQL: semántica y correlación',['kql'],
 'Entities es un array y se necesita una fila por entidad manteniendo los campos del evento original. ¿Qué efecto corresponde a mv-expand?',[
 ['Expande elementos a filas y repite las otras columnas del evento','Los apuntes describen ese comportamiento para arrays y propiedades dynamic.'],
 ['Une las entidades con todas las filas de una segunda tabla por DeviceId','Eso describe una relación de join, no la expansión de un array por fila.'],
 ['Reduce siempre todo el array a un único valor distinto','No equivale a un agregado o deduplicación de valores.'],
 ['Reemplaza el array por un gráfico sin cambiar la forma tabular','La expansión modifica la cantidad de filas y no es una visualización.']]);
Q('hunt-129','KQL: semántica y correlación',['kql'],
 'La cuenta de referencia tiene mayúsculas distintas en dos tablas. El analista intenta resolverlo con un join por nombres visibles sin revisar tipo o ámbito. ¿Qué preparación está justificada?',[
 ['Comprobar esquema y ámbito, normalizar texto cuando corresponda y acotar tiempo','Los apuntes exigen validar claves, formato, mayúsculas y ventana antes de correlacionar.'],
 ['Asumir que el mismo nombre visible garantiza la misma identidad','Una coincidencia de nombre por sí sola no basta para unir tablas.'],
 ['Sustituir join por union porque así se relaciona cualquier identidad parecida','union apila filas y no establece relación por clave.'],
 ['Usar take antes del join para demostrar causalidad entre eventos','Limitar filas no verifica identidad ni causalidad.']]);
Q('hunt-130','KQL: semántica y correlación',['kql'],
 'La consulta debe distinguir un término completo de una subcadena dentro de una línea de comandos. ¿Qué diferencia evita interpretar cualquier contains como coincidencia de término?',[
 ['has busca un término completo; contains busca una subcadena','Los apuntes separan esa semántica y recomiendan has cuando encaja.'],
 ['Ambos operadores tienen exactamente la misma semántica y solo cambia la longitud','No son equivalentes para término y subcadena.'],
 ['contains solo aplica a arrays y has solo a tablas','Ambos se aplican a una columna concreta, no a esos tipos exclusivos.'],
 ['has demuestra que el proceso ejecutó la técnica encontrada en el texto','El matching de texto no prueba por sí solo ejecución exitosa de una técnica.']]);
Q('hunt-131','Tablas y evidencias relacionadas',['tablas','kql'],
 'El SOC tiene una alerta XDR y necesita todos sus archivos, cuentas e IP relacionados sin perder las evidencias múltiples. ¿Qué unión identifica esa relación?',[
 ['AlertInfo con AlertEvidence mediante AlertId','AlertInfo describe la alerta y AlertEvidence admite varias evidencias por ese identificador.'],
 ['AlertInfo con DeviceInfo mediante el título de la alerta','El título no es la clave que vincula el conjunto de evidencias de alerta.'],
 ['SecurityIncident con EmailEvents mediante IncidentNumber','Son objetos distintos y no tienen esa relación de identificación.'],
 ['union de ambas tablas y selección de filas contiguas','Apilar y observar posición no crea vínculo entre alerta y evidencia.']]);
Q('hunt-132','Tablas y evidencias relacionadas',['tablas'],
 'Una investigación debe relacionar una vulnerabilidad del endpoint con detalles de la CVE y con el dispositivo afectado. ¿Qué claves separan las dos relaciones?',[
 ['CveId para detalles de vulnerabilidad y DeviceId para el dispositivo','Los apuntes definen relaciones de vulnerabilidad a CVE y de software/vulnerabilidad a dispositivo.'],
 ['DeviceName para ambas, porque el nombre del equipo identifica cada CVE','El nombre del dispositivo no identifica la vulnerabilidad en su base de conocimiento.'],
 ['NetworkMessageId para la CVE y AlertId para el inventario','Esas claves pertenecen a mensaje y alerta, no a esas relaciones de inventario.'],
 ['Timestamp para ambas, porque compartir hora equivale a compartir objeto','La coincidencia temporal no reemplaza las claves de esos objetos.']]);
Q('hunt-133','Tablas y evidencias relacionadas',['tablas'],
 'Se necesita investigar una solicitud Graph desde el workspace y otra vista de auditoría nativa XDR. ¿Qué elección evita copiar sin más el nombre de tabla entre superficies?',[
 ['MicrosoftGraphActivityLogs en el workspace y GraphAPIAuditEvents en XDR, verificando esquema','Los apuntes distinguen las tablas por almacén y recomiendan comprobar schema al mover consultas.'],
 ['Usar AzureActivity para ambas porque toda API es plano de control Azure','AzureActivity describe operaciones del plano de control y no sustituye toda solicitud Graph.'],
 ['Usar IdentityInfo porque cualquier solicitud Graph es una fila de perfil de usuario','Un perfil de identidad no es el registro de solicitud de la API.'],
 ['Usar el mismo nombre de tabla siempre porque ambos portales muestran la misma entidad','El mismo concepto no garantiza nombres ni columnas iguales entre superficies.']]);
Q('hunt-134','Tablas y evidencias relacionadas',['tablas'],
 'La investigación pregunta si un usuario autenticó interactivamente, si una app se autenticó como service principal o si una managed identity obtuvo acceso. ¿Qué error debe evitar en el workspace?',[
 ['Tratar SigninLogs como si contuviera por sí sola todos esos tipos de autenticación','Los apuntes distinguen SigninLogs, AADServicePrincipalSignInLogs y AADManagedIdentitySignInLogs.'],
 ['Consultar tablas distintas según el tipo de identidad y revisar sus columnas','Separar por tipo y esquema es el recorrido adecuado, no el error solicitado.'],
 ['Usar las detecciones de riesgo como contexto adicional cuando correspondan','Las tablas de riesgo pueden ampliar contexto; no es esa confusión de tipos.'],
 ['Verificar si se necesitan los inicios no interactivos de usuario','Distinguir AADNonInteractiveUserSignInLogs es pertinente, no un error.']]);
Q('hunt-135','Tablas y evidencias relacionadas',['tablas','kql'],
 'El SOC quiere enriquecer conexiones con una pequeña lista de activos críticos. Otro equipo propone guardar millones de eventos en la misma watchlist. ¿Qué separación corresponde?',[
 ['Watchlist para referencia y tabla custom para telemetría de volumen','Los apuntes destinan watchlists a referencia y tablas personalizadas al volumen.'],
 ['Watchlist para todo porque su SearchKey ingiere automáticamente los eventos','SearchKey ayuda a relacionar la referencia y no convierte la lista en ruta de ingesta.'],
 ['externaldata para almacenar permanentemente ambos conjuntos en el workspace','externaldata lee una fuente durante la consulta y no la ingiere.'],
 ['Workbook como sustituto del almacén porque guarda cada fila consultada','El workbook guarda layout y lee los datos disponibles; no almacena esas filas.']]);
Q('hunt-136','Normalización y consultas reutilizables',['kql'],
 'Dos fuentes representan los mismos eventos con nombres diferentes. Se quiere reutilizar detecciones conservando los datos originales. ¿Qué vía de ASIM encaja?',[
 ['Normalización en consulta mediante parser unificador y filtros de tiempo pertinentes','La normalización al consultar conserva originales; el parser unificador reúne fuentes.'],
 ['Modificar obligatoriamente toda fila de origen antes de cualquier consulta','Los apuntes distinguen normalización en ingesta y en consulta.'],
 ['Usar un parser específico como si necesariamente reuniera todas las fuentes','El específico procesa una fuente; el unificador reúne varias.'],
 ['Guardar una función para que automáticamente copie toda la telemetría a una tabla nueva','La función guarda consulta reutilizable y no almacena datos por sí sola.']]);
Q('hunt-137','Normalización y consultas reutilizables',['kql'],
 'El SOC guarda una consulta como función y espera recuperar meses después las filas que mostró al guardarla, aunque el origen ya expiró. ¿Qué límite debe explicar?',[
 ['Se guardó la consulta reutilizable, no una copia de los datos','Los apuntes distinguen definición de función y almacenamiento de resultados.'],
 ['La función fija siempre la retención del origen de forma indefinida','Guardar la consulta no cambia la vida del dato consultado.'],
 ['Una función elimina automáticamente la necesidad de Search job para histórico','La superficie necesaria depende de disponibilidad y almacén del dato.'],
 ['Cambiar el nombre de la función restituye filas expiradas','El nombre no recupera datos eliminados por retención.']]);
Q('hunt-138','Grafos y superficies de hunting',['hunting'],
 'Una hunting query desplegada desde Content hub requiere una adaptación local. El analista no puede editarla como una Custom query. ¿Qué flujo conserva la fuente adecuada?',[
 ['Modificar en su fuente o clonar para mantener una consulta Custom editable','Los apuntes diferencian edición de Custom y contenido de Content hub o Repositories.'],
 ['Editar cualquier query directamente porque content source es solo decorativo','La procedencia determina cómo se administra la consulta.'],
 ['Cambiar Results delta para que habilite edición de la definición','El indicador compara ventanas y no modifica permisos o procedencia de contenido.'],
 ['Crear un bookmark y asumir que reemplaza automáticamente la query de Content hub','Un bookmark conserva un hallazgo; no sustituye la definición del catálogo.']]);
Q('hunt-139','Grafos y superficies de hunting',['hunting'],
 'Threat Analytics muestra endpoints expuestos, pero no todos están en Impacted assets. El SOC afirma que toda exposición equivale a detección real de ataque. ¿Qué diferencia corresponde?',[
 ['Exposición refleja vulnerabilidad o mala configuración; Impacted assets recoge detección real','Los apuntes separan activos expuestos de activos con señales detectadas.'],
 ['Endpoints exposure muestra exclusivamente ataques confirmados y remediados','La exposición puede existir aunque no haya ocurrido el ataque.'],
 ['Impacted assets contiene solo recomendaciones generales sin relación con detecciones','Esa sección sí refleja detección real por tipos de activo.'],
 ['Recommended actions incluye necesariamente todas las mitigaciones del Analyst report','Las recomendadas rastreadas se limitan a Secure Score; otras viven en el informe.']]);
Q('hunt-140','Búsquedas históricas y materialización',['hunting','busquedas'],
 'Un KQL job debe anexar resultados a una tabla existente y la consulta devuelve columnas con tipos distintos. El equipo confía en que el append corregirá el esquema. ¿Qué paso falta?',[
 ['Ajustar nombres y tipos para coincidir exactamente con la tabla antes de enviar el job','Los apuntes advierten que el append falla si la salida no coincide con el destino.'],
 ['Mantener la consulta porque anexar siempre renombra y convierte todas las columnas','No se describe esa adaptación automática del append.'],
 ['Cambiar solo el título del job porque determina los tipos de la tabla','El nombre del job no modifica el contrato de salida.'],
 ['Convertir el job en async query para garantizar la misma tabla materializada','Async guarda caché de resultados y no crea ese job o append materializado.']]);
Q('hunt-141','Búsquedas históricas y materialización',['busquedas'],
 'La investigación usa KQL solo como un paso de un análisis Python más amplio sobre el lake. ¿Qué opción respeta la experiencia de notebooks descrita?',[
 ['Notebook job del data lake con VS Code/PySpark y MicrosoftSentinelProvider','Los apuntes separan esa experiencia de los notebooks clásicos de Azure Machine Learning.'],
 ['Unir ambas experiencias asumiendo que msticpy sustituye siempre al provider del lake','No se deben mezclar como si fueran una misma ruta de notebooks.'],
 ['Un workbook porque ejecuta automáticamente cualquier código Python del analista','El workbook se describe como panel visual sobre consultas KQL.'],
 ['Un servidor MCP importado como librería dentro del notebook','MCP se agrega desde un cliente compatible y se usa mediante sus herramientas, no así.']]);
})();
