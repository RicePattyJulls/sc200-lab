/* Revision 7. Independent scenarios grounded exclusively in the private notes.
 * Existing questions remain byte-for-byte compatible; IDs are append-only.
 */
(() => {
const Q = (id, topic, refs, prompt, options, correct = [0], code) =>
  SC.freshQuestion(id, topic, refs, prompt, options, correct, code, 7);
const cloud = 'Decisiones de protección cloud';
const asr = 'Diagnóstico operativo de ASR';
const mail = 'Correo: autenticación y políticas';
const engines = 'Motores, señales y cobertura';

Q('env-304',cloud,['planes-cloud'],
 'El SOC quiere evaluar un proyecto GCP y una cuenta AWS con Defender for Cloud. Ya compró licencias de usuario para los analistas. ¿Qué diseño incorpora realmente los entornos?',[
 ['Conectores multicloud y activación de los planes correspondientes por entorno','Los apuntes sitúan los conectores AWS/GCP y los planes en Environment settings; la cobertura se factura por recurso protegido.'],
 ['Asignar MDE P2 a cada analista y esperar la importación de las dos nubes','Una licencia por usuario no conecta cuentas cloud ni activa sus planes por recurso.'],
 ['Usar solo automatic provisioning, sin configurar los conectores de los entornos','El aprovisionamiento de agentes o extensiones no sustituye la conexión y activación de los entornos multicloud.'],
 ['Conectar Azure Arc y asumir que activa por sí solo todos los planes en ambas cuentas','Arc extiende cobertura a infraestructura compatible, pero no sustituye configurar los conectores y planes del entorno.']]);
Q('env-305',cloud,['planes-cloud'],
 'Solo se quiere habilitar Defender for Servers P1 en una VM concreta, sin activar el plan en toda la suscripción. ¿Qué distinción permite ese diseño?',[
 ['P1 admite activación por recurso; P2 se activa por suscripción','Los apuntes distinguen el nivel de activación de P1 y P2, aunque ambos permitan exclusiones por recurso.'],
 ['P2 es el único que se activa por VM individual','La activación individual se atribuye a P1, no a P2.'],
 ['P1 y P2 solo se activan por usuario propietario de la VM','Defender for Servers se licencia por recurso, no por el usuario propietario.'],
 ['Habilitar P2 en una sola VM mediante la misma opción individual de P1','El documento atribuye activación individual a P1 y reserva activación de P2 a la suscripción.']]);
Q('env-306',cloud,['planes-cloud'],
 'Una suscripción usa Servers P2, pero una máquina tiene que quedar fuera del plan. El administrador afirma que activar P2 por suscripción impide excluir recursos. ¿Qué procede?',[
 ['Revisar la exclusión o deshabilitación del plan para esa máquina','La activación por suscripción no impide excluir o deshabilitar P2 a nivel de recurso.'],
 ['Deshabilitar necesariamente P2 en toda la suscripción','Los apuntes permiten exclusiones por recurso en ambos planes de Servers.'],
 ['Cambiar toda la suscripción a P1 porque solo P1 admite exclusiones individuales','Los apuntes permiten excluir o deshabilitar ambos planes por recurso; no exigen degradar toda la suscripción.'],
 ['Poner la VM en un device group sin automatización para retirar la licencia','El nivel de automatización del grupo no equivale a deshabilitar el plan cloud.']]);
Q('env-307',cloud,['planes-cloud'],
 'Se conectó un servidor fuera de Azure solamente con el agente MDE. Se esperan todas las funciones extra de Servers P2, incluido JIT. ¿Qué dependencia del diseño debe revisarse?',[
 ['La conexión mediante Azure Arc para acceder al conjunto completo de funciones','Sin Arc, los apuntes describen P2 reducido a P1 más vulnerability management premium en esa ruta de onboarding.'],
 ['Que P2 se haya seleccionado aunque se haya usado la ruta MDE sin Arc','Seleccionar el plan no elimina las limitaciones de capacidades descritas para la ruta sin Arc.'],
 ['Esperar el plazo de onboarding sin revisar el método de conexión','Esperar no convierte una ruta de onboarding sin Arc en la conexión necesaria para el conjunto completo de funciones.'],
 ['Tratar P2 como idéntico en cualquier ruta de incorporación','El documento describe expresamente capacidades reducidas de P2 en la ruta MDE sin Arc.']]);
Q('env-308',cloud,['planes-cloud'],
 'El SOC detecta abuso de tokens SAS y posible malware en una cuenta de almacenamiento. ¿Qué plan corresponde a la unidad afectada?',[
 ['Defender for Storage','Los apuntes asignan malware, fuga de datos y abuso de SAS al plan de cuentas de almacenamiento.'],
 ['Defender for Resource Manager como sustituto de Storage','Resource Manager observa operaciones de gestión, no sustituye el plan del almacenamiento.'],
 ['Defender for Key Vault porque cualquier token es un secreto de Key Vault','Que se abuse de un token no cambia que el recurso protegido sea una cuenta de almacenamiento.'],
 ['Solo Defender CSPM para sustituir el plan del workload afectado','Los apuntes separan postura avanzada y planes CWPP; el plan específico del recurso es Storage.']]);
Q('env-309',cloud,['planes-cloud'],
 'Hay sospecha de actividad maliciosa en ejecución dentro de workloads Kubernetes. Se necesita protección de esos workloads, no solo ver su postura. ¿Qué elección encaja?',[
 ['Defender for Containers','El plan cubre clústeres y workloads Kubernetes, incluidas amenazas en tiempo de ejecución.'],
 ['Solo Foundational CSPM porque postura y detección runtime son equivalentes','La postura gratuita no se presenta como sustituto del plan CWPP para runtime.'],
 ['Defender for App Service para cualquier contenedor de cualquier clúster','App Service protege aplicaciones de ese servicio, no todos los workloads Kubernetes.'],
 ['Servers P2 como reemplazo completo de Containers por ejecutarse los pods en máquinas','El documento atribuye a Containers la protección de clústeres y workloads Kubernetes; proteger servidores no equivale a activar ese plan.']]);
Q('env-310',cloud,['planes-cloud'],
 'Una alerta trata de operaciones de gestión de recursos potencialmente dañinas. Otra trata de accesos anómalos a Key Vault. ¿Qué asignación distingue ambas superficies?',[
 ['Resource Manager para gestión; Key Vault para accesos a ese servicio','Los apuntes separan operaciones de administración de recursos y accesos anómalos al almacén de secretos.'],
 ['Storage para ambas porque toda operación termina almacenada','El medio de almacenamiento no sustituye el alcance de los planes específicos.'],
 ['Key Vault para gestión de toda la suscripción; Resource Manager solo para secretos','La propuesta invierte los alcances descritos en el documento.'],
 ['Resource Manager para ambos porque todo acceso a secretos es necesariamente una operación de gestión','Los apuntes reservan accesos e intentos anómalos contra Key Vault a su plan específico; no equiparan ambos alcances.']]);
Q('env-311',cloud,['planes-cloud'],
 'Se quieren priorizar rutas de ataque y explorar postura avanzada, pero también detectar amenazas runtime en servidores. ¿Qué evita confundir capacidades?',[
 ['Distinguir Defender CSPM para postura avanzada y el plan Servers para protección del workload','Los apuntes separan CSPM avanzado y los planes CWPP como Servers.'],
 ['Tratar CSPM y Servers como dos nombres de un único plan','El documento los enumera como planes diferentes con propósitos distintos.'],
 ['Habilitar Storage y asumir que incluye postura avanzada de todos los recursos','El alcance de Storage no equivale a Defender CSPM ni a Servers.'],
 ['Dar por cubierta la protección runtime al ver rutas de ataque en CSPM','Visualizar postura y rutas de ataque no sustituye activar el plan CWPP para los servidores.']]);
Q('env-312',cloud,['planes-cloud'],
 'El equipo habilita protección de APIs críticas y quiere seleccionar P1 o P2 como en Servers. ¿Qué revisión corrige el diseño?',[
 ['Comprobar el plan de APIs como on/off, sin trasladar el split P1/P2 de Servers','Los apuntes reservan la división P1/P2 a Defender for Servers.'],
 ['Aplicar P2 de Servers a la API por compartir suscripción','Compartir suscripción no convierte una API en un servidor licenciado por ese plan.'],
 ['Suponer que todos los planes CWPP tienen los mismos niveles P1/P2','El documento limita expresamente esa división de niveles a Servers.'],
 ['Buscar un nivel P2 de APIs porque el workload requiere amenazas en tiempo real','La capacidad de amenazas en tiempo real figura en el plan APIs on/off y no implica una división P1/P2.']]);
Q('env-313',cloud,['planes-cloud'],
 'El SOC quiere cerrar puertos de administración de VMs mediante JIT y revisar integridad de archivos. ¿Qué diferencia de Servers orienta la revisión del plan?',[
 ['Son capacidades adicionales descritas para Servers P2','P2 añade JIT y File Integrity Monitoring al conjunto de P1, con las dependencias de onboarding indicadas.'],
 ['P1 y P2 se distinguen únicamente por el número de analistas','El documento distingue capacidades, no puestos de analista.'],
 ['Activar una regla NRT concede JIT aunque el plan no lo incluya','Una detección no modifica la licencia ni habilita una capacidad del plan.'],
 ['JIT viene en P1; solo File Integrity Monitoring distingue P2','Los apuntes incluyen tanto JIT como File Integrity Monitoring entre las capacidades añadidas por P2.']]);

Q('env-314',asr,['asr','endpoint'],
 'Una regla ASR no impide la conducta esperada en Windows. Defender Antivirus está en Passive porque otro antivirus es el principal. ¿Qué requisito explica el resultado?',[
 ['ASR requiere Defender Antivirus como principal, Active y con protección en tiempo real','Los apuntes exigen esas condiciones para evaluar las reglas ASR en Windows.'],
 ['Basta con EDR in block mode para satisfacer todos los requisitos de ASR','EDR en modo bloqueo es una capa posterior a la brecha y no sustituye los requisitos preventivos de ASR.'],
 ['Basta con que el sensor MDE esté activo aunque Defender Antivirus siga Passive','Los requisitos ASR incluyen el antivirus principal en Active y protección en tiempo real; el sensor no los sustituye.'],
 ['La presencia del equipo en un inventario garantiza que ASR está bloqueando','Inventario y configuración efectiva del antivirus son comprobaciones diferentes.']]);
Q('env-315',asr,['asr'],
 'ASR está configurado, pero plataforma, motor e inteligencia de Defender Antivirus llevan varias versiones de retraso. ¿Qué debe añadirse a la comprobación operativa?',[
 ['Actualizar y revisar los tres componentes, además del estado Active y real-time protection','Los apuntes exigen que ninguno de los tres componentes quede más de dos versiones por detrás.'],
 ['Actualizar solo el motor y dar por irrelevantes plataforma e inteligencia','El documento incluye expresamente los tres componentes en el requisito de versión.'],
 ['Borrar todas las reglas para evitar falsos positivos','El retraso de componentes se aborda revisando actualizaciones, no retirando toda la prevención.'],
 ['Dar por suficiente real-time protection aunque los componentes estén muy desactualizados','El estado de protección en tiempo real es un requisito, pero los apuntes añaden el mantenimiento de versiones de los tres componentes.']]);
Q('env-316',asr,['asr'],
 'Se pretende bloquear scripts potencialmente ofuscados y usar protección avanzada contra ransomware, pero cloud-delivered protection está apagada. ¿Qué limita el despliegue?',[
 ['Ambas reglas figuran entre las que requieren cloud-delivered protection','Los apuntes las enumeran expresamente junto a la regla de prevalencia, antigüedad o lista confiable.'],
 ['Ese ajuste solo afecta a dashboards y nunca a las reglas','El documento lo describe como requisito explícito para estas reglas.'],
 ['Cambiar a Audit elimina la dependencia de la protección cloud','El texto no ofrece Audit como sustituto del requisito de funcionamiento.'],
 ['Dar por suficiente el modo Active para esas reglas aunque falte cloud-delivered protection','Active es necesario para ASR, pero estas reglas tienen además el requisito explícito de protección cloud.']]);
Q('env-317',asr,['asr'],
 'Antes de imponer Block sobre una aplicación de negocio, el SOC necesita medir qué actividad se habría detenido sin impedirla. ¿Qué fase y modo corresponden?',[
 ['Probar la regla en Audit y revisar los eventos antes de habilitar Block','El ciclo descrito es planificar, probar en Audit, habilitar Block y mantener.'],
 ['Usar Disabled y tratar la ausencia de eventos como compatibilidad probada','Disabled no evalúa la conducta como Audit y no permite esa conclusión.'],
 ['Poner Block y asumir que la falta de alertas demuestra ausencia de impacto','Algunas reglas dejan eventos sin producir alertas; falta revisar la actividad efectiva.'],
 ['Usar Warn como si solo registrara sin poder bloquear la aplicación','Warn sí bloquea, con posible anulación; Audit es el modo que registra sin impedir la actividad.']]);
Q('env-318',asr,['asr'],
 'Un perfil debe dejar de establecer expresamente una regla para reducir conflictos con otra política. Se propone Disabled. ¿Qué alternativa expresa mejor ese objetivo?',[
 ['Not configured','Los apuntes distinguen no configurar expresamente de Disabled, que impone un estado y puede causar conflicto.'],
 ['Disabled porque significa que cualquier otra política siempre gana','El documento no atribuye esa garantía a Disabled y advierte del conflicto.'],
 ['Audit porque equivale a no configurar','Audit configura evaluación y registro; no deja el ajuste sin configurar.'],
 ['Warn porque omite la configuración hasta que haya una alerta','Warn configura un bloqueo con posibilidad de anulación, no ausencia de configuración.']]);
Q('env-319',asr,['asr'],
 'Un equipo con platform 4.18.26060 recibe un bloqueo ASR en Warn y quiere omitirlo. ¿Qué flujo describe el documento?',[
 ['Unblock durante 24 horas con aprobación de administrador','La versión indicada añade aprobación de administrador al mecanismo de omisión de Warn.'],
 ['Unblock sin aprobación y de forma permanente','Los apuntes indican aprobación en esa versión y una duración de 24 horas.'],
 ['Unblock solo hasta el siguiente clic y sin una ventana temporal definida','Los apuntes describen una omisión de bloqueo de 24 horas, no una duración indeterminada o solo hasta el siguiente clic.'],
 ['Solo lectura del evento porque Warn nunca impide la actividad','Warn sí bloquea y ofrece un mecanismo de omisión.']]);
Q('env-320',asr,['asr'],
 'El diseño propone Warn para la regla de robo de credenciales de LSASS. ¿Qué problema detecta una revisión antes del despliegue?',[
 ['Esa regla no admite Warn','Los apuntes enumeran LSASS y Office code injection como reglas que no admiten ese modo.'],
 ['Warn se admite en todas las reglas si existe una licencia Sentinel','El documento describe excepciones por regla; Sentinel no las elimina.'],
 ['Warn solo puede usarse si se apaga la protección en tiempo real','Apagar real-time protection contradice los requisitos de evaluación de ASR.'],
 ['Desplegarla desde Intune para que Warn sea válido aunque la regla no lo admita','Elegir un método de despliegue no elimina la incompatibilidad de Warn para LSASS descrita en los apuntes.']]);
Q('env-321',asr,['asr'],
 'La regla contra drivers firmados vulnerables está en Block. Se quiere concluir que también impide cargar cualquier driver vulnerable que ya estaba guardado. ¿Qué límite importa?',[
 ['Bloquea guardar esos drivers, pero no cargar los ya guardados','Los apuntes distinguen expresamente ambas operaciones en esa regla.'],
 ['Block garantiza eliminar todos los drivers vulnerables existentes','El documento no atribuye esa eliminación ni ese alcance a la regla.'],
 ['Solo bloquea drivers no firmados y permite todos los vulnerables firmados','La regla trata precisamente del abuso de drivers firmados vulnerables.'],
 ['Dar por seguro un driver ya guardado porque la regla no impide su carga','El límite de esta regla no es un veredicto de seguridad del driver que ya estaba guardado.']]);
Q('env-322',asr,['asr'],
 'El portal muestra la regla ASR de LSASS como not applicable en un equipo con LSA protection y Credential Guard. ¿Qué interpretación evita diagnosticar una avería inexistente?',[
 ['Las protecciones nativas vuelven redundante esa regla según los apuntes','El documento explica not applicable por la protección equivalente ya habilitada.'],
 ['Not applicable demuestra que todos los controles de credenciales están apagados','En este escenario están activadas las protecciones que explican la redundancia.'],
 ['Hay que desactivar Credential Guard para aumentar necesariamente la protección','El texto no recomienda retirar esas protecciones para aparentar aplicabilidad de ASR.'],
 ['Interpretar not applicable como un resultado Audit que debe convertirse a Block','Not applicable por redundancia de protecciones no es el modo Audit de la regla.']]);
Q('env-323',asr,['asr'],
 'Después de añadir una exclusión ASR, un proceso que ya estaba en ejecución sigue generando detecciones. ¿Qué paso operativo explica el desfase?',[
 ['Reiniciar el proceso para que le aplique la exclusión','Los apuntes advierten que la exclusión no aplica en caliente a procesos que ya corrían.'],
 ['Cambiar el veredicto de los eventos pasados a Clean','Modificar un veredicto histórico no reaplica la configuración al proceso.'],
 ['Borrar la retención del workspace para activar la exclusión','La retención de datos no controla cuándo el proceso recibe la exclusión.'],
 ['Dar por demostrado que la exclusión es inválida sin revisar si el proceso se reinició','El documento ofrece un desfase por proceso ya en ejecución; hay que comprobarlo antes de descartar la exclusión.']]);
Q('env-324',asr,['asr'],
 'Una aplicación excluida deja de generar actividad ASR visible. El equipo interpreta la ausencia de eventos como prueba de que nunca realiza conductas riesgosas. ¿Qué limita esa conclusión?',[
 ['La exclusión también reduce visibilidad y puede crear un punto ciego','Los apuntes indican que lo excluido no genera evento; ausencia de registro no prueba ausencia de actividad.'],
 ['Toda exclusión mantiene exactamente el mismo registro de auditoría','El documento advierte lo contrario: también se pierde visibilidad.'],
 ['ASR convierte automáticamente lo excluido en alerta Informational','El texto no describe esa conversión para los elementos excluidos.'],
 ['Usar la caída de eventos como prueba de que la regla bloquea más actividad','La exclusión reduce protección y visibilidad; menos eventos no demuestra mayor bloqueo.']]);
Q('env-325',asr,['asr'],
 'GPO e Intune definen estados incompatibles para un ajuste compatible del Policy CSP. Se quiere que MDM gane expresamente. ¿Qué configuración describe esa inversión?',[
 ['MDMWinsOverGP = 1, comprobando que el ajuste sea compatible','Por defecto gana Group Policy; la inversión indicada solo aplica a ajustes compatibles del Policy CSP.'],
 ['MDMWinsOverGP = 1 fuerza precedencia sobre cualquier ajuste sin excepción','Los apuntes limitan expresamente la inversión a ajustes compatibles.'],
 ['Dar Sentinel Contributor al usuario que desplegó Intune','Un rol de Sentinel no define precedencia entre GPO y MDM.'],
 ['Cambiar una regla a Warn resuelve todas las políticas en conflicto','El modo de bloqueo no determina la precedencia entre métodos de configuración.']]);
Q('env-326',asr,['asr'],
 'El endpoint tiene un evento local 1121 por una regla ASR, pero el SOC no ve alerta en Incidents and alerts. ¿Qué interpretación es consistente?',[
 ['El bloqueo puede haber ocurrido sin generar una alerta EDR','Los apuntes distinguen eventos de bloqueo y alertas: solo ocho reglas alertan y algunas requieren protección cloud elevada.'],
 ['Sin alerta, el evento 1121 necesariamente significa solo Audit','1121 representa bloqueo; Audit corresponde a 1122.'],
 ['Todas las reglas bloqueadas deben generar siempre un incidente','El documento enumera once reglas que dejan eventos sin alertas EDR.'],
 ['La falta de incidente demuestra que la conducta quedó permitida por una exclusión','El evento de bloqueo ya acredita una acción; ausencia de alerta no convierte ese bloqueo en permiso.']]);
Q('env-327',asr,['asr'],
 'Adobe Reader fue bloqueado al crear un proceso hijo, pero no hay alerta EDR con cloud protection level normal. ¿Qué revisar para explicar ambas observaciones?',[
 ['Esa regla requiere High plus o Zero tolerance para generar alerta, aunque bloquee en nivel normal','El documento incluye Adobe Reader entre las tres reglas con esta condición adicional de alerta.'],
 ['El nivel normal convierte siempre Block en Audit','Los apuntes dicen que bloquea igual; cambia la emisión de alerta.'],
 ['Concluir que el sensor no funciona solo porque esa regla no alertó','Existe una condición específica de protección cloud para alertar que explica el resultado sin asumir un sensor averiado.'],
 ['La única explicación posible es una exclusión que impidió el bloqueo','El escenario ya contiene un bloqueo y una condición documentada de alerta.']]);

Q('env-328',mail,['correo'],
 'Un mensaje fue rechazado en edge protection por un bloqueo IP. Se busca después el adjunto para detonarlo en Safe Attachments. ¿Qué límite del flujo explica que no esté disponible?',[
 ['El mensaje no llegó a las fases posteriores de análisis y entrega','El esquema del documento indica que si cae en edge protection no hay mensaje que investigar en las fases siguientes.'],
 ['Safe Attachments siempre recibe y entrega los mensajes rechazados en edge','El rechazo temprano impide ese recorrido; no se promete una entrega posterior.'],
 ['Un rechazo IP equivale a una cuarentena de adjunto tras detonación','El documento distingue el rechazo en el borde y los veredictos de contenido.'],
 ['ZAP reconstruye el mensaje rechazado para analizar el archivo','ZAP reevalúa correo ya entregado; no reconstruye lo rechazado en edge.']]);
Q('env-329',mail,['correo'],
 'El responsable quiere restringir reenvío automático externo y gestionar IPs bloqueadas. Cree que habilitar Strict configura ambas cosas. ¿Qué hay que administrar?',[
 ['Outbound anti-spam y default connection filter policy por separado','Los apuntes excluyen ambas funciones de los presets Standard y Strict.'],
 ['Solo las asignaciones de Strict, que incluyen todas las políticas','Los presets no configuran outbound anti-spam ni connection filtering.'],
 ['Editar los ajustes internos de Strict para que gestione el reenvío externo','Los presets no configuran outbound anti-spam y sus policies internas no se modifican directamente.'],
 ['La política de cuarentena, que determina remitentes y reenvío externo','La cuarentena controla acciones del usuario y notificaciones, no esos dos controles.']]);
Q('env-330',mail,['correo'],
 'Para evitar mensajes sin protección, se propone borrar las policies predeterminadas de EOP y dejar solo personalizadas. ¿Qué restricción y función cumplen las predeterminadas?',[
 ['No se borran ni deshabilitan; son el último recurso para todos los destinatarios','Los apuntes permiten cambiar ajustes de las policies predeterminadas, pero no retirarlas ni filtrar sus destinatarios.'],
 ['Se pueden borrar siempre que exista al menos una licencia de MDO','Una licencia MDO no elimina las restricciones de las políticas EOP predeterminadas.'],
 ['Son equivalentes a Built-in Safe Links y tienen excepciones por grupo','Built-in y las políticas EOP predeterminadas tienen alcance y capacidades de administración diferentes.'],
 ['Tienen prioridad configurable y deben situarse por encima de Strict','El documento indica que no tienen prioridad configurable y quedan como último recurso.']]);
Q('env-331',mail,['correo'],
 'Un usuario solicita recibir avisos y poder actuar sobre correo en cuarentena. El SOC quiere mantener el veredicto original. ¿Qué capa corresponde ajustar?',[
 ['Quarantine policies','Estas políticas determinan acciones y notificaciones del usuario sin cambiar el veredicto que llevó el mensaje a cuarentena.'],
 ['Una allow de dominio para convertir todo el correo en legítimo','Permitir un dominio altera filtros de esa entidad y no es la capa para gestionar derechos en cuarentena.'],
 ['La policy anti-phishing para cambiar quién recibe avisos de cuarentena','La policy anti-phishing define protección y veredicto; las acciones y avisos de cuarentena corresponden a Quarantine policies.'],
 ['La prioridad del preset para convertir notificaciones en permisos de liberación','La precedencia de protección no sustituye configurar qué puede hacer el usuario con el mensaje en cuarentena.']]);
Q('env-332',mail,['correo'],
 'Un mensaje tiene SPF correcto, pero sin alineación con 5322.From; DKIM tampoco cumple comprobación y alineación. ¿Qué conclusión permite el criterio DMARC de los apuntes?',[
 ['DMARC falla: hace falta que al menos SPF o DKIM pase y esté alineado','El criterio exige éxito y alineación de al menos una de las dos comprobaciones.'],
 ['DMARC pasa por cualquier resultado SPF correcto aunque no esté alineado','El documento exige también alineación con el dominio de 5322.From.'],
 ['DMARC exige que SPF y DKIM siempre pasen ambos y estén alineados','Los apuntes indican que basta al menos una comprobación correcta y alineada.'],
 ['BCL sustituye la alineación cuando el mensaje no es bulk','BCL clasifica correo masivo; no sustituye el criterio de autenticación DMARC.']]);
Q('env-333',mail,['correo'],
 'Un servicio intermedio reenvía correo y puede romper la comprobación de autenticación. ¿Qué mecanismo conserva el resultado de la validación en ese recorrido?',[
 ['ARC','Authenticated Received Chain conserva el resultado de validación cuando interviene un servicio de reenvío.'],
 ['BCL','Bulk Confidence Level expresa clasificación de correo masivo, no conserva la cadena de autenticación.'],
 ['ZAP','ZAP reevalúa correo entregado por veredictos posteriores; no conserva validaciones del reenvío.'],
 ['DKIM como mecanismo que conserva por sí solo la cadena de validación del intermediario','DKIM firma el mensaje; el mecanismo descrito para conservar resultados al reenviar mediante un intermediario es ARC.']]);
Q('env-334',mail,['correo'],
 'La política valida qué servidores pueden enviar por un dominio y otra comprobación verifica que el mensaje no se alteró por el camino. ¿Qué correspondencia es correcta?',[
 ['SPF para servidores autorizados; DKIM para firma del mensaje','Los apuntes asignan a SPF la autorización de servidores y a DKIM la firma que prueba integridad en tránsito.'],
 ['DKIM para lista de servidores; SPF para firma del contenido','La propuesta invierte las funciones documentadas de ambos mecanismos.'],
 ['ZAP para servidores; Strict para firma criptográfica','ZAP y el preset no sustituyen esas comprobaciones de autenticación.'],
 ['BCL para ambos, según la cantidad de destinatarios','BCL mide correo masivo y no valida esas dos propiedades.']]);
Q('env-335',mail,['correo'],
 'EOP detecta spoofing, pero el SOC necesita proteger explícitamente usuarios y dominios frente a impersonation. ¿Qué añade MDO y qué configuración sigue siendo necesaria?',[
 ['Protección de suplantación de usuarios/dominios, configurando quiénes se protegen','Los apuntes distinguen anti-spoofing base de las protecciones añadidas por MDO y piden configurar usuarios y dominios.'],
 ['Comprar MDO protege automáticamente a todos sin configurar objetivos','El documento señala que los usuarios y dominios que se quieren proteger deben configurarse.'],
 ['EOP y MDO no tienen diferencias en anti-phishing','MDO añade impersonation y phishing thresholds sobre la protección base.'],
 ['Basta la default anti-phishing de EOP para obtener todas las protecciones de impersonation de MDO','La default base aporta anti-spoofing; los apuntes atribuyen impersonation de usuarios y dominios a MDO con sus objetivos configurados.']]);
Q('env-336',mail,['correo'],
 'Se añadió al alcance de Standard un usuario Entra sin buzón ni mail user. El administrador espera que ese usuario reciba protección de correo. ¿Qué revisar?',[
 ['La asignación debe resolver a destinatarios con buzón o mail user','Los filtros Users, Groups y Domains de los presets resuelven a destinatarios de correo, no a cualquier identidad Entra.'],
 ['Toda identidad Entra recibe un buzón al habilitar Standard','El preset no crea un buzón ni convierte cualquier identidad en destinatario cubierto.'],
 ['Asignar el dominio del usuario evita tener que comprobar que sea destinatario de correo','Los filtros por dominio también resuelven a destinatarios con buzón o mail user; no eliminan ese requisito.'],
 ['Una licencia MDO asignada basta aunque el objeto no sea un destinatario compatible','La disponibilidad de licencia no reemplaza el alcance por destinatarios de las policies descritas.']]);
Q('env-337',mail,['correo'],
 'Se creó un perfil Strict, pero todavía no se habilitó ni se asignaron destinatarios. El SOC concluye que ya protege al tenant entero. ¿Qué paso falta?',[
 ['Habilitarlo y asignarle los destinatarios previstos','Los apuntes indican que Standard y Strict no protegen a nadie hasta habilitación y asignación.'],
 ['Esperar a la primera alerta, que asignará automáticamente a todos','No se describe una asignación automática activada por alertas.'],
 ['Eliminar Built-in porque su mera existencia impide Strict','La precedencia permite coexistir; falta habilitar y asignar Strict.'],
 ['Crear una custom policy de prioridad baja vuelve activo el preset Strict no habilitado','Una policy personalizada no habilita ni asigna destinatarios al preset Strict.']]);
Q('env-338',mail,['correo'],
 'Un destinatario no está cubierto por Standard, Strict ni una policy custom de Safe Links. Se quiere revisar la protección de respaldo sin editar sus ajustes internos. ¿Qué perfil corresponde?',[
 ['Built-in protection, con prioridad fija Lowest y ajustes no modificables','Los apuntes lo describen como respaldo de Safe Links/Safe Attachments, con excepciones de destinatarios y requisito MDO en el tenant.'],
 ['La default EOP Safe Links policy','Los apuntes aclaran que no existen policies predeterminadas de Safe Links ni Safe Attachments.'],
 ['Strict aunque esté deshabilitado y sin asignaciones','Un perfil Strict no habilitado no cubre al destinatario.'],
 ['Standard no habilitado como protección automática por defecto de todos los destinatarios','Standard requiere habilitación y asignación; el respaldo descrito para estas funciones es Built-in.']]);
Q('env-339',mail,['correo'],
 'Un archivo de SharePoint necesita Safe Attachments. El administrador intenta asignarle una policy de destinatarios al propietario. ¿Qué característica cambia la configuración?',[
 ['La protección de archivos de SharePoint, OneDrive y Teams es un ajuste global del tenant','El documento separa estas protecciones globales de las policies de correo asignadas a destinatarios.'],
 ['Solo queda protegido si el propietario pertenece a Strict','El alcance de archivos indicado no depende de una policy asignada al destinatario.'],
 ['Cada archivo necesita un buzón antes de analizarse','El documento describe protección del archivo sin exigir un buzón propio.'],
 ['Safe Documents exige una policy individual para cada destinatario que abra el archivo','Los apuntes incluyen Safe Documents entre los ajustes globales del tenant, sin asignación por destinatario.']]);
Q('env-340',mail,['correo'],
 'Se estudia Safe Attachments en Monitor para observar resultados de una prueba. ¿Qué diferencia operativa debe aceptarse frente a Block?',[
 ['Monitor entrega el mensaje incluso si detecta malware y registra el resultado','Los apuntes contrastan Monitor con Block, que pone el mensaje en cuarentena.'],
 ['Monitor retiene siempre todo mensaje igual que Block','El modo de observación permite entrega aunque detecte malware.'],
 ['Monitor desactiva completamente el escaneo como Off','Off no escanea; Monitor sí produce resultado de análisis.'],
 ['Monitor vuelve benigno el veredicto para evitar cuarentena','El modo afecta a la acción, no transforma el archivo detectado en legítimo.']]);
Q('env-341',mail,['correo'],
 'Safe Attachments no puede escanear un adjunto cifrado. Se quiere poner ese tipo de mensaje en cuarentena, contemplando excepciones por tipo de fichero. ¿Qué ajuste corresponde?',[
 ['Block unscanned attachments','Los apuntes asocian ese ajuste a adjuntos cifrados no escaneables y permiten exclusiones por tipo.'],
 ['Track user clicks','El seguimiento de clics de Safe Links no decide la cuarentena de adjuntos no escaneados.'],
 ['Dynamic Delivery garantiza que todo adjunto cifrado se considera seguro','Dynamic Delivery reengancha adjuntos cuando el análisis los da por seguros; no ofrece esa garantía.'],
 ['Off porque desactivar el escaneo bloquea lo no analizado','Off no escanea y no equivale al ajuste específico de bloqueo de no escaneados.']]);
Q('env-342',mail,['correo'],
 'Se necesita registrar clics y evitar que los usuarios continúen al sitio original desde la página de aviso de Safe Links. ¿Qué dos ajustes satisfacen el objetivo? Selecciona dos.',[
 ['Activar Track user clicks','Ese ajuste registra los clics según la descripción de Click protection settings.'],
 ['Desmarcar Let users click through to the original URL','Desmarcarlo impide continuar al sitio desde la página de aviso.'],
 ['Añadir la URL a una allow para que no haya advertencia','Una excepción de confianza evita controles asociados y no satisface el objetivo de impedir continuación desde el aviso.'],
 ['Desactivar Safe Links en Email','Desactivar protección no proporciona los dos controles de seguimiento y bloqueo solicitados.']],[0,1]);
Q('env-343',mail,['correo'],
 'Se quiere que la protección de enlaces también alcance correo enviado dentro de la organización. ¿Qué configuración expresa ese alcance?',[
 ['Apply Safe Links to email messages sent within the organization','El bloque Email incluye ese ajuste para extender Safe Links al correo interno.'],
 ['Solo habilitar Teams porque cualquier correo interno es un mensaje Teams','Teams y Email son bloques distintos en la configuración descrita.'],
 ['Cambiar Outbound anti-spam para que detone todos los enlaces internos','El control de correo saliente no sustituye el ajuste de Safe Links para Email.'],
 ['Añadir todos los dominios internos a la lista de no reescritura','Una excepción de reescritura no habilita la protección solicitada.']]);
Q('env-344',mail,['correo'],
 'La organización quiere esperar el análisis de URL sospechosas o que apuntan a archivos antes de entregar el mensaje. ¿Qué combinación es coherente?',[
 ['Real-time URL scanning y su subajuste Wait for URL scanning to complete before delivering','Los apuntes describen el segundo como subajuste del análisis en tiempo real del bloque Email.'],
 ['Solo Track user clicks, que retiene siempre el correo antes de la entrega','Registrar clics es distinto de esperar análisis previo a la entrega.'],
 ['ZAP, porque garantiza analizar todo enlace antes de entregar','ZAP actúa después de la entrega; no es el ajuste de espera solicitado.'],
 ['Off en Safe Attachments para que Safe Links no necesite configuración','Apagar análisis de adjuntos no configura espera del análisis de URL.']]);
Q('env-345',mail,['correo'],
 'Un archivo legítimo está bloqueado por protección de correo. Se quiere reportarlo sin crear directamente un Allow de archivo en Tenant Allow/Block List. ¿Qué flujo corresponde?',[
 ['Submissions con I have confirmed it is clean','Los apuntes indican enviar el archivo legítimo por Submissions y no crear directamente la entrada Allow de archivo.'],
 ['Crear directamente un Allow de archivo porque todos los tipos admiten la misma operación','El documento establece expresamente la excepción para archivos legítimos bloqueados.'],
 ['Añadir un indicador MDE y asumir que modifica la lista de correo','Tenant Allow/Block List no es una lista global de excepciones para MDE.'],
 ['Crear un Allow de dominio para que todo archivo adjunto quede autorizado','Permitir una entidad solo omite sus filtros asociados; no autoriza automáticamente todos los archivos del mensaje.']]);

Q('env-346',engines,['motores-nativos','tuning'],
 'Hay resultados en Anomalies y contexto en BehaviorAnalytics, pero ningún incidente nuevo. ¿Qué explica la observación sin suponer que falló la ingesta?',[
 ['Anomaly y UEBA no generan alertas por sí solos','Los apuntes los sitúan entre los mecanismos que escriben señales o contexto, sin alertar de forma autónoma.'],
 ['Cualquier fila en Anomalies debe generar siempre una alerta','El documento dice expresamente que Anomaly nunca alerta sola.'],
 ['UEBA es un conector que reemplaza todas las fuentes originales','UEBA deriva contexto de logs y alertas existentes; no aporta telemetría propia.'],
 ['Todo InvestigationPriority elevado confirma que ya se produjo una alerta','UEBA aporta contexto y puntuación derivados, pero no alerta por sí sola.']]);
Q('env-347',engines,['motores-nativos'],
 'Una consulta manual de Advanced Hunting encuentra eventos relevantes cada mañana, pero nadie recibe alertas automáticamente. ¿Qué paso convierte esa lógica en detección?',[
 ['Guardarla como custom detection o regla analítica compatible','Advanced Hunting es una superficie de consulta; los apuntes requieren una regla para automatizar alertas.'],
 ['Guardar una captura del resultado en un workbook','Una visualización o captura no convierte la consulta manual en motor de detección.'],
 ['Guardar la consulta como función reutilizable sin crear una regla','Una función guarda lógica para reutilizarla; la automatización de alertas requiere una regla de detección.'],
 ['Añadir un bookmark y esperar que alerte por cada evento futuro','Un bookmark no sustituye una regla de detección sobre eventos futuros.']]);
Q('env-348',engines,['motores-nativos','tuning'],
 'El SOC quiere personalizar el KQL interno de Microsoft Defender Threat Intelligence Analytics para agregar una exclusión de negocio. ¿Qué límite del motor debe respetar?',[
 ['Es lógica administrada de solo lectura; no se edita su modelo con KQL propio','Los apuntes describen ese motor sin configuración de consulta; una lógica propia requiere una regla del analista.'],
 ['Basta editar el título para modificar su lógica de matching','Un título no cambia el modelo administrado ni sus criterios.'],
 ['Asignar un rol de lectura convierte el motor en editable','Los permisos no alteran la naturaleza de solo lectura del motor.'],
 ['Cambiar entity mapping de otra regla modifica también el modelo de ese motor','Configurar una regla del analista no convierte el motor administrado de solo lectura en editable.']]);
Q('env-349',engines,['motores-nativos','tuning'],
 'El SOC ajusta una anomaly rule y quiere probar la copia antes de sustituir la versión en producción. ¿Qué ciclo describe el documento?',[
 ['Duplicar: la copia nace en Flighting; al pasarla a Production, la original cae a Flighting','Los apuntes describen ese intercambio para ajustar anomaly rules sin editar un modelo arbitrario.'],
 ['Duplicar publica inmediatamente dos versiones Production equivalentes','La copia nace en Flighting, no en Production.'],
 ['Flighting significa que toda coincidencia debe crear un incidente crítico','El documento no convierte el estado de prueba en un motor de alerta autónoma.'],
 ['Promover la copia mantiene necesariamente la original también en Production','Los apuntes describen que al pasar la copia a Production, la original cae a Flighting.']]);
Q('env-350',engines,['motores-nativos','tuning'],
 'Una entidad tiene InvestigationPriority alto. Se quiere concluir que también tiene necesariamente AnomalyScore alto. ¿Qué distinción evita esa inferencia?',[
 ['Son scores diferentes y uno alto no implica el otro','InvestigationPriority mide desviación de línea base en BehaviorAnalytics; AnomalyScore mide intensidad del patrón en Anomalies.'],
 ['Son alias del mismo campo en dos tablas','Los apuntes los distinguen expresamente como dos puntuaciones.'],
 ['Ambos miden exclusivamente vulnerabilidades sin relación con comportamiento','Los criterios descritos son desviación e intensidad de patrones, no solo vulnerabilidades.'],
 ['Un score alto demuestra por sí solo compromiso confirmado','Un indicador de prioridad o anomalía no equivale a veredicto de compromiso.']]);
Q('env-351',engines,['motores-nativos'],
 'Una cuenta Honeytoken tiene actividad LDAP poco después de configurar el tag. Se espera que MDI espere aprendizaje antes de alertar. ¿Qué excepción importa?',[
 ['Honeytoken alerta ante cualquier actividad sin aprendizaje','El documento incluye autenticación, LDAP y cambios de atributos/grupo bajo esa excepción.'],
 ['Honeytoken solo produce alertas de malware en archivos','Los apuntes lo relacionan con actividad de identidad, no con análisis de archivos.'],
 ['MDI requiere UEBA para aplicar la excepción Honeytoken','El documento distingue la línea base propia de MDI de UEBA.'],
 ['El tag solo alerta cuando la actividad LDAP supera un umbral entrenado','La excepción Honeytoken alerta ante cualquier actividad y sin aprendizaje, no espera un umbral entrenado.']]);
Q('env-352',engines,['motores-nativos'],
 'MDCA acaba de habilitarse y durante sus primeros siete días aparecen algunas alertas de anomalía. Un analista cree que deberían ser cero hasta terminar aprendizaje. ¿Qué explica el documento?',[
 ['La cobertura inicial es parcial, no nula','Los apuntes indican policies de anomalía activas desde el primer día, aunque no emitan todas las alertas durante aprendizaje.'],
 ['Cualquier alerta inicial demuestra que el aprendizaje ya terminó','Emitir algunas alertas es compatible con el periodo de cobertura parcial.'],
 ['Los primeros siete días solo puede alertar Malware detection activada por defecto','El documento dice que Malware detection viene desactivada.'],
 ['Toda alerta inicial procede necesariamente de una regla Scheduled de Sentinel','MDCA tiene motores nativos que pueden emitir alertas en ese periodo.']]);
Q('env-353',engines,['motores-nativos','tuning'],
 'Tras incorporar Sentinel al portal de Defender, Fusion deja de estar disponible. Se intenta reactivarlo editando su KQL. ¿Qué explica el cambio?',[
 ['Fusion no está disponible con esa incorporación y su lógica no es KQL propio editable','Los apuntes describen la incompatibilidad y la deshabilitación automática de las reglas existentes.'],
 ['Fusion requiere mover todas las tablas a Basic para funcionar','Basic no habilita Fusion ni la lectura de reglas sobre Analytics.'],
 ['Fusion es únicamente un parser ASIM renombrado','Fusion es un motor de correlación multietapa, no un parser de normalización.'],
 ['Habilitar XDR incident integration es el requisito que permite conservar Fusion','Los apuntes describen XDR incident integration como otra condición de incompatibilidad de Fusion.']]);
Q('env-354',engines,['tuning'],
 'La matriz MITRE muestra detecciones disponibles en cobertura simulada, pero el SOC necesita demostrar cobertura activa. ¿Qué debe verificar?',[
 ['Reglas Scheduled/NRT habilitadas y con técnicas asignadas','La cobertura activa descrita exige esas condiciones; disponibilidad sin configurar es simulada.'],
 ['Que la plantilla exista en el catálogo, aunque no esté habilitada','La existencia de una detección disponible no acredita cobertura activa.'],
 ['Que todas las reglas tengan un título con la palabra MITRE','El texto del título no sustituye asignar técnicas y habilitar reglas.'],
 ['Que una regla deshabilitada conserve la severidad High','Una regla deshabilitada no satisface el criterio de cobertura activa.']]);
Q('env-355',engines,['tuning'],
 'Una regla Sentinel deja de ejecutar su consulta durante el periodo posterior a una alerta. El analista cree que solo se excluyeron los eventos del usuario alertado. ¿Qué mecanismo y alcance encajan?',[
 ['Supresión de Analytics Rules: pausa la ejecución de la consulta, hasta 24 horas','Los apuntes distinguen esa pausa de un filtro o exclusión de eventos específicos.'],
 ['Entity mapping: borra los eventos que pertenezcan al usuario','Entity mapping identifica entidades; no pausa consultas ni borra eventos.'],
 ['Resolver la alerta: impide que toda actividad futura vuelva a alertar','El documento advierte que resolver no equivale a suprimir.'],
 ['Retención: detiene la ejecución hasta que venza el dato','La retención controla conservación, no esa pausa tras generar una alerta.']]);

const investigation = 'Investigación: elegir y contrastar evidencia';
const automation = 'Automatización: alcance y diagnóstico';

Q('response-233',investigation,['investigacion'],
 'Un dispositivo tiene Exposure level elevado por vulnerabilidades pendientes. El equipo afirma que ese valor demuestra compromiso activo. ¿Qué comparación permite valorar el caso?',[
 ['Separar Exposure level de Risk level y revisar las alertas activas y la evidencia','El inventario distingue exposición por vulnerabilidades/recomendaciones y riesgo de compromiso, sobre todo por alertas activas.'],
 ['Tratar Exposure y Risk como dos nombres del mismo veredicto','Los apuntes describen criterios diferentes para esas dos columnas.'],
 ['Aislar solo por Exposure y dar el compromiso por confirmado','El nivel de exposición no prueba por sí solo el compromiso del dispositivo.'],
 ['Descartar vulnerabilidades porque solo importan los incidentes abiertos','La exposición sí aporta contexto, aunque no sea un veredicto de compromiso.']]);
Q('response-234',investigation,['investigacion'],
 'Una máquina aparece en Device inventory sin alertas y sin estar incorporada con agente. ¿Qué interpretación permite el alcance del inventario?',[
 ['Puede ser un dispositivo descubierto en la red; revisar Onboarding status y Sensor health','El inventario incluye incorporados y descubiertos; aparecer no acredita agente activo ni alertas previas.'],
 ['Aparecer demuestra que el sensor MDE está incorporado y sano','Los apuntes incluyen estados como Can be onboarded, Unsupported o Insufficient info.'],
 ['Sin alertas debe ser un registro inválido que nunca debería aparecer','No hace falta tener alertas para aparecer en Device inventory.'],
 ['Su presencia demuestra que AIR ya lo remedió','Inventariar o descubrir un equipo no acredita ejecución ni resultado de una remediación.']]);
Q('response-235',investigation,['investigacion'],
 'Una alerta MDE lista varios procesos. Se necesita saber qué proceso lanzó a otro y qué línea de comandos usó. ¿Qué vista profundiza en esa relación?',[
 ['Process tree de la alerta','Los apuntes describen relaciones padre-hijo con línea de comandos y navegación hacia entity pages.'],
 ['Solo Activities del incidente','Activities registra acciones y correlaciones del incidente; no sustituye el árbol padre-hijo de procesos.'],
 ['La matriz MITRE de cobertura simulada','La cobertura de reglas no muestra las relaciones concretas de los procesos de esa alerta.'],
 ['Una política de cuarentena de correo','Esa política no reconstruye ejecución de procesos en el endpoint.']]);
Q('response-236',investigation,['investigacion'],
 'Se debe investigar por qué se disparó una alerta y qué eventos ocurrieron antes y después. ¿Qué vista descrita responde directamente a esa pregunta?',[
 ['Alert story','Alert story explica el disparo e incluye eventos y entidades relacionados antes y después.'],
 ['Solo el número de alertas del dashboard','Un recuento no explica la secuencia ni el motivo de esa alerta.'],
 ['La definición JSON de un workbook sin ejecutar sus consultas','El layout no contiene los eventos que justificaron la alerta.'],
 ['El plan de licencia del analista','La licencia no describe el motivo ni los eventos de una detección concreta.']]);
Q('response-237',investigation,['investigacion'],
 'El SOC está reconstruyendo una brecha desde Device timeline y necesita separar eventos relevantes del ruido sin borrar la telemetría. ¿Qué operación encaja?',[
 ['Marcar Flagged events y filtrar esas marcas para construir la cronología','Los apuntes describen ese uso de marcas para una cronología limpia.'],
 ['Eliminar todos los eventos que no estén ya en una alerta','La investigación puede necesitar eventos no alertados; las marcas permiten filtrar sin esa eliminación.'],
 ['Cambiar toda la retención del workspace a cero','Retirar conservación destruye contexto y no construye la cronología solicitada.'],
 ['Cerrar el incidente para que los eventos no relevantes desaparezcan','Cerrar el incidente no filtra la telemetría del dispositivo.']]);
Q('response-238',investigation,['investigacion'],
 'Se busca si una solicitud a Microsoft Graph falló y, por separado, si hubo una operación de negocio confirmada como cambiar permisos. ¿Qué fuentes separan ambas preguntas?',[
 ['MicrosoftGraphActivityLogs para la solicitud HTTP; Purview Audit para la operación auditada','Los apuntes distinguen transporte técnico, que puede fallar, y operación de negocio confirmada.'],
 ['Purview Audit demuestra todas las solicitudes HTTP, incluso fallidas','Audit registra operaciones relevantes del servicio, no toda llamada técnica.'],
 ['MicrosoftGraphActivityLogs acredita por sí solo que el cambio de permisos se completó','Una llamada HTTP puede no lograr la operación; no equivale al registro de negocio.'],
 ['Content search indica quién cambió cada permiso','Content search busca contenido actual, no registra quién ejecutó una acción.']]);
Q('response-239',investigation,['investigacion'],
 'El equipo legal necesita localizar el cuerpo de mensajes existentes y validar el alcance antes de exportar. ¿Qué ruta responde al objetivo?',[
 ['Content search en eDiscovery, validando Statistics/Sample','La herramienta busca el contenido actual y los apuntes recomiendan validar estadísticas o muestras antes de exportar.'],
 ['Purview Audit porque almacena íntegramente el cuerpo de cada mensaje','Audit registra operaciones de negocio; no sustituye una búsqueda del contenido actual.'],
 ['Microsoft Graph activity logs porque cada llamada contiene todo el buzón','Los logs de solicitudes no se presentan como una copia del contenido completo.'],
 ['Device timeline para cualquier correo que siga en Exchange','La cronología del endpoint no sustituye la búsqueda de contenido del buzón.']]);
Q('response-240',investigation,['investigacion'],
 'Un analista quiere reutilizar directamente una consulta Kusto de Sentinel en Content search. ¿Qué distinción del lenguaje debe comprobar antes?',[
 ['El KQL de eDiscovery es Keyword Query Language, no Kusto','Los apuntes advierten que la misma sigla identifica lenguajes distintos en estas superficies.'],
 ['Todos los productos con la sigla KQL aceptan exactamente la misma sintaxis','El documento distingue explícitamente el lenguaje de búsqueda de eDiscovery.'],
 ['Content search solo acepta consultas GQL','GQL corresponde a otras experiencias de grafos, no a Content search.'],
 ['Cambiar la extensión del archivo transforma automáticamente la consulta','Una extensión no traduce entre lenguajes con semántica diferente.']]);
Q('response-241',investigation,['investigacion'],
 'Se correlacionan registros Purview Audit con eventos de un turno local. Las horas parecen desplazadas y se propone descartar coincidencias. ¿Qué comprobación debe preceder esa decisión?',[
 ['Normalizar las horas, porque los timestamps de Audit están en UTC','Los apuntes especifican UTC para Audit; comparar horas sin normalización puede interpretar mal la secuencia.'],
 ['Asumir que Audit siempre guarda la zona local del navegador','El documento indica timestamps UTC.'],
 ['Cambiar el veredicto de la alerta hasta que coincidan las horas','Un veredicto no transforma los timestamps ni resuelve su comparación.'],
 ['Ignorar toda la evidencia de Audit porque difiere del turno local','La diferencia horaria requiere comprobación, no descarte automático de evidencia.']]);
Q('response-242',investigation,['investigacion'],
 'Una alerta llega con Service source MDO y Detection source Safe Links. Se necesita investigar clics y campañas. ¿Qué dato orienta la superficie de producto?',[
 ['Service source MDO orienta a Explorer; Detection source identifica el motor dentro de MDO','Los apuntes separan el producto que entregó la alerta y el motor que la produjo.'],
 ['Safe Links exige investigar exclusivamente en Device inventory','Los clics y campañas de correo se profundizan en Explorer de MDO.'],
 ['Detection source reemplaza el producto y convierte la alerta en Sentinel','El motor de detección no cambia la fila de Service source.'],
 ['Ambos campos son títulos libres sin utilidad para investigar','El documento les asigna funciones distintas para elegir superficie e interpretar detección.']]);
Q('response-243',investigation,['investigacion'],
 'IRM muestra un caso con usuario pseudonimizado. Se quiere explicar qué señales hacen preocupante a esa persona y su tendencia de actividad. ¿Qué vistas encajan?',[
 ['All risk factors y User activity del caso IRM','Los apuntes asignan contexto de riesgo y tendencia a esas vistas; un caso IRM corresponde a un usuario.'],
 ['Un único caso IRM representa siempre a todos los usuarios de un incidente','La unidad de investigación IRM descrita es un usuario por caso.'],
 ['Process tree explica por sí solo todos los factores de IRM','El árbol de procesos no sustituye las vistas de riesgo y actividad de ese caso.'],
 ['Desactivar pseudonimización es obligatorio para ver cualquier factor','El documento describe nombres pseudonimizados por defecto y no exige retirarlo para esas vistas.']]);
Q('response-244',investigation,['investigacion'],
 'El SOC quiere identificar qué regla DLP produjo una alerta y revisar los eventos que la dispararon para marcar un falso positivo. ¿Qué combinación responde al objetivo?',[
 ['Details para policy/regla y Events para los disparadores','Los apuntes asignan esas funciones a las pestañas de la alerta DLP.'],
 ['Solo User activity summary, que reemplaza los eventos y la regla','El resumen aporta contexto de exfiltración y no sustituye las pestañas específicas solicitadas.'],
 ['Usar solo el caso IRM de la persona y omitir la alerta DLP','El caso IRM aporta contexto de usuario, pero no reemplaza Details y Events de la alerta DLP concreta.'],
 ['Tomar la severidad de la alerta como explicación completa del falso positivo','La severidad no identifica por sí sola qué regla y eventos produjeron la alerta; hay que revisar esas pestañas.']]);
Q('response-245',investigation,['investigacion'],
 'Security Copilot produce Risky user summarization y el equipo lo trata como un veredicto Compromised del agente. ¿Qué diferencia debe conservar?',[
 ['La capacidad embebida resume y recomienda; el Identity Risk Management Agent sí dictamina','Los apuntes distinguen ambas salidas, que pueden coexistir por separado en Risky users.'],
 ['Todo resumen embebido equivale a un veredicto confirmado','El documento aclara que Risky user summarization no emite veredicto.'],
 ['El agente solo dibuja gráficos y no propone acciones de riesgo','El agente investiga usuarios At risk y propone Dismiss risk o Reset password.'],
 ['La vista Risky users no puede mostrar ambas capacidades','Los apuntes indican que las dos pueden verse por separado en esa misma vista.']]);
Q('response-246',investigation,['investigacion'],
 'Un correo reportado por un usuario fue evaluado por Phishing Triage Agent como True Positive. Se espera que cierre el incidente igual que con False Positive. ¿Qué resultado describe el documento?',[
 ['True Positive deja el incidente para el analista; False Positive resuelve la alerta','Los apuntes distinguen ese tratamiento de los dos veredictos del agente.'],
 ['Ambos veredictos siempre resuelven la alerta y cierran el trabajo','El texto reserva resolución de la alerta a False Positive y mantiene intervención con True Positive.'],
 ['True Positive elimina necesariamente todo el contenido del buzón','El documento no atribuye esa acción destructiva al veredicto del agente.'],
 ['False Positive marca al usuario como Compromised automáticamente','El triage de phishing no se describe como ese cambio de estado de identidad.']]);
Q('response-247',investigation,['investigacion'],
 'Un incidente supera cien alertas. El SOC quiere usar Incident summary como relato exhaustivo de todas ellas. ¿Qué límite debe considerar?',[
 ['Incident summary tiene un límite propio de cien alertas','Los apuntes distinguen ese tope de otros límites de correlación y no garantizan exhaustividad para un incidente mayor.'],
 ['El límite depende exclusivamente del máximo de Fusion','El documento aclara que es un límite propio, sin relación con el máximo de Fusion.'],
 ['Incident report amplía automáticamente ese mismo resumen a cualquier número','Incident report describe gestión del caso; no se presenta como ampliación ilimitada del relato de ataque.'],
 ['El límite de cien se refiere a alertas de cada producto por separado y no al resumen','Los apuntes presentan cien alertas como límite propio de Incident summary, sin esa partición por producto.']]);
Q('response-248',investigation,['investigacion'],
 'Al crear una política Intune, el analista quiere saber si un setting ya existe en otras policies y entender su impacto. ¿Qué experiencia encaja sin confundirla con un motor de detección?',[
 ['Copilot embebido en Intune desde el tooltip del setting','Los apuntes describen consultas sobre configuración existente, recomendaciones e impacto, consumiendo SCUs de Security Copilot.'],
 ['Dynamic Threat Detection Agent, que edita automáticamente todos los settings','Ese agente genera alertas; no es la experiencia de asistencia de configuración en Intune.'],
 ['AIR de correo, que analiza settings de Intune','AIR de MDO investiga evidencias de correo y no sustituye la asistencia descrita.'],
 ['Una licencia independiente Copilot Intune que no consume SCUs','El documento indica que esta experiencia no tiene licencia propia y consume SCUs.']]);

Q('response-249',automation,['automatizacion'],
 'Se crea una automation rule temporal para etiquetar incidentes durante un ejercicio. Al acabar el ejercicio debe dejar de actuar sin intervención manual. ¿Qué ajuste estándar sirve?',[
 ['Configurar fecha de expiración en la automation rule','Los apuntes indican que la regla estándar se desactiva sola al llegar esa fecha.'],
 ['Dar el mismo número de orden a todas las reglas','Un empate no garantiza orden y no define la caducidad.'],
 ['Cambiar el incidente a Closed para deshabilitar la regla','El estado de un incidente no desactiva por sí solo la regla para futuros incidentes.'],
 ['Elegir Enhanced Alert Trigger porque admite la misma fecha de expiración','El documento indica que Enhanced Alert Trigger no tiene fechas de expiración.']]);
Q('response-250',automation,['automatizacion'],
 'Se necesita añadir tareas y avisar de la creación de cases mediante acciones predefinidas del asistente, sin construir una Logic App. ¿Qué opción descrita encaja?',[
 ['Simple Flows','Los apuntes describen Simple Flows en preview para esas acciones predefinidas sin construir una Logic App.'],
 ['Solo Sentinel Repositories','Repositories despliega contenido mediante CI/CD; no es ese asistente de acciones predefinidas.'],
 ['Enhanced Alert Trigger para encadenar varias acciones ordenadas dentro de cada regla','Enhanced Alert Trigger permite una acción por regla y no tiene orden de prioridad; no describe esa secuencia.'],
 ['Una automation rule estándar como si fuera siempre el mismo asistente de Simple Flows','Los apuntes distinguen Simple Flows como extensión con acciones predefinidas de las automation rules estándar.']]);
Q('response-251',automation,['automatizacion'],
 'La automation rule debe procesar las IPs de un incidente, enriquecer cada una y usar el resultado en un ticket. ¿Qué componentes del playbook tienen ese papel?',[
 ['Entities — Get IP, For each y dynamic content de los pasos anteriores','Los apuntes describen extracción de entidades por tipo, recorrido de la lista y reutilización de valores en acciones.'],
 ['Un único título estático del incidente sustituye todas las entidades','El título no entrega una lista estructurada de IPs ni los resultados de enriquecimiento.'],
 ['El orden de las reglas evita tener que iterar cualquier lista','Ordenar reglas no sustituye el recorrido de las entidades dentro del workflow.'],
 ['Usar solo el trigger sin extraer las entidades ni recorrer su lista','Recibir un incidente no ejecuta por sí solo el enriquecimiento de cada IP; el flujo necesita extracción y acciones.']]);
Q('response-252',automation,['automatizacion'],
 'Un playbook desplegado desde plantilla inicia, pero el paso Outlook falla después de salir de la empresa el dueño de la conexión. ¿Qué revisión aborda la dependencia?',[
 ['Revisar autenticación de esa conexión y usar identidad administrada cuando corresponda','Los apuntes distinguen autenticación de cada conector y recomiendan evitar depender de una cuenta personal.'],
 ['Dar por exitoso el workflow porque el trigger arrancó','El inicio no prueba que todas las acciones hayan terminado; debe revisarse el detalle de ejecución.'],
 ['Cambiar el trigger a entidad para autenticar Outlook automáticamente','El tipo de objeto inicial no concede por sí mismo autenticación al conector.'],
 ['Redesplegar la misma plantilla y asumir que sus conexiones quedan autorizadas','Una plantilla desplegada necesita sus conexiones autorizadas; el despliegue no acredita autenticación válida.']]);
Q('response-253',automation,['automatizacion'],
 'Un playbook nuevo no aparece en el selector de una automation rule de incidentes. ¿Qué comprobaciones deben preceder reconstruir toda la Logic App? Selecciona dos.',[
 ['Verificar trigger compatible y suscripción seleccionada','Los apuntes incluyen ambas condiciones en el diagnóstico de playbooks no disponibles.'],
 ['Verificar permisos de Sentinel para ejecutar el playbook','El recurso necesita autorización de ejecución además de existir y tener el trigger adecuado.'],
 ['Comprobar solo que la Logic App exista, sin revisar su trigger','La existencia del recurso no garantiza que su trigger sea compatible con la automation rule.'],
 ['Tomar una ejecución manual previa como prueba suficiente del permiso de Sentinel','Probar manualmente y conceder permiso a Sentinel son pasos distintos en el procedimiento descrito.']],[0,1]);
Q('response-254',automation,['automatizacion'],
 'El equipo cloud quiere abrir un ticket cuando cambie una evaluación de cumplimiento normativo en una suscripción. ¿Qué mecanismo ofrece ese trigger?',[
 ['Workflow automation de Defender for Cloud asociado a una Logic App Consumption','Los apuntes incluyen alertas, recomendaciones y cambios de cumplimiento entre los triggers de Workflow automation.'],
 ['Solo When alert is created de Sentinel, sin importar dónde nace el evento','La evaluación de cumplimiento es un tipo de evento específico de Workflow automation de MDC.'],
 ['Workflow automation de MDC usando una Logic App Standard como si fuera Consumption','Los apuntes especifican Logic App Consumption para esta automatización de Defender for Cloud.'],
 ['AIR de MDO porque el cambio de cumplimiento puede notificarse por correo','AIR de correo no es el trigger de cambios de evaluación de cumplimiento de recursos cloud.']]);
Q('response-255',automation,['automatizacion'],
 'Una Logic App muestra una ejecución iniciada, pero el ticket de destino no existe. ¿Qué evidencia debe revisar el SOC antes de dar la acción por completada?',[
 ['Run history, entradas/salidas del paso y resultado en el destino','Los apuntes exigen comprobar motor y destino; arrancar no significa completar todas las acciones.'],
 ['Solo el estado del trigger porque prueba todos los pasos posteriores','El inicio del trigger no demuestra el éxito de las acciones internas.'],
 ['Solo el correo de notificación, que ejecuta la remediación','Las notificaciones avisan y no realizan por sí mismas la operación de destino.'],
 ['La existencia de una plantilla CI/CD, aunque la ejecución haya fallado','Desplegar una definición no prueba el éxito de una ejecución concreta.']]);
Q('response-256',automation,['automatizacion'],
 'El SOC recibe avisos de incidentes y quiere diferenciar alertas de endpoint de acciones de respuesta completadas o fallidas. ¿Qué distinción de configuración importa?',[
 ['Alertas de endpoint se configuran en Endpoints; acciones en Email notifications de XDR con sus filtros','Los apuntes separan esas rutas y permiten filtrar acciones por origen, grupo y resultado.'],
 ['Una regla de avisos de incidentes incluye necesariamente todos los tipos de notificación','El documento ofrece rutas separadas para incidentes, acciones, amenazas y alertas de endpoint.'],
 ['Un correo de prueba ejecuta automáticamente una acción real de aislamiento','El correo de prueba verifica avisos; una notificación no es la remediación.'],
 ['Un aviso de fallo demuestra que el activo está ya contenido','Una acción fallida requiere comprobar resultado; el aviso no acredita contención exitosa.']]);

const operators = 'KQL: resultados y decisiones de consulta';
const surfaces = 'Hunting: elegir la superficie de análisis';

Q('hunt-142',operators,['kql'],
 'La izquierda tiene cuentas A y B; la derecha contiene A y C. Se necesita conservar las cuentas presentes en cualquiera de las dos fuentes, incluso sin pareja. ¿Qué resultado y operador encajan?',[
 ['fullouter: A con coincidencia, B y C sin pareja en el otro lado','Los apuntes indican que fullouter conserva ambos lados; los registros sin coincidencia no desaparecen.'],
 ['inner: A, B y C aunque no exista coincidencia','inner devuelve coincidencias y perdería B y C en este ejemplo.'],
 ['leftouter: conserva también C aunque solo esté a la derecha','leftouter conserva el lado izquierdo y sus coincidencias, no las filas exclusivas de la derecha.'],
 ['leftanti: combina A y conserva columnas completas de ambos lados','leftanti devuelve ausencias del lado izquierdo, no todas las entidades ni la combinación de A.']],[0],
 `let L = datatable(Account:string, LeftEvent:string)["A","L1", "B","L2"];
let R = datatable(Account:string, RightEvent:string)["A","R1", "C","R2"];
L | join kind=fullouter (R) on Account`);
Q('hunt-143',operators,['kql'],
 'Se necesita devolver las filas de actividad de cuentas que aparecen en una lista de referencia, conservando únicamente columnas de actividad. ¿Qué semántica corresponde?',[
 ['leftsemi con actividad a la izquierda y referencia a la derecha','Los apuntes describen leftsemi como filas izquierdas con coincidencia, con columnas del lado izquierdo.'],
 ['leftanti porque devuelve las cuentas que sí están en referencia','leftanti devuelve las filas sin coincidencia; responde a la pregunta opuesta.'],
 ['fullouter porque elimina las cuentas exclusivas de referencia','fullouter conserva ambos lados, incluidas filas sin pareja, y no expresa el objetivo.'],
 ['union porque exige coincidencia de cuenta antes de apilar','union apila filas; no exige la coincidencia por una clave.']]);
Q('hunt-144',operators,['kql'],
 'El SOC cruza dos tablas que tienen claves con nombres distintos y necesita exigir además igualdad de DeviceId. ¿Qué condición expresa las dos coincidencias?',[
 ['on $left.UserKey == $right.AccountKey and $left.DeviceId == $right.DeviceId','Los apuntes admiten nombres distintos mediante $left/$right y varias coincidencias unidas con and.'],
 ['on UserKey, aunque AccountKey sea el nombre distinto de la derecha','La forma de clave común no expresa correctamente los nombres distintos del escenario.'],
 ['union withsource=DeviceId porque aplica dos coincidencias automáticamente','withsource añade origen; union no combina por las dos claves requeridas.'],
 ['join sin on porque detecta por sí solo qué campos son equivalentes','El operador necesita la condición de coincidencia; no infiere esas equivalencias.']]);
Q('hunt-145',operators,['kql'],
 'Dos fuentes comparten Account y Timestamp, pero solo una tiene ProcessName y la otra Url. Se usa union kind=inner. ¿Qué información se pierde del esquema de salida?',[
 ['ProcessName y Url, porque inner conserva solo columnas compartidas','Los apuntes distinguen union inner de outer, que conserva todas las columnas.'],
 ['Las filas que no tengan la misma cuenta en ambas fuentes','union inner restringe columnas, no exige coincidencias de filas por Account.'],
 ['Nada: inner conserva siempre el esquema completo de ambas','La conservación de todas las columnas corresponde a kind=outer.'],
 ['Timestamp porque union solo conserva columnas de tipo texto','El documento no plantea esa restricción de tipos para union.']]);
Q('hunt-146',operators,['kql'],
 'Una consulta debe cambiar AccountName por User sin eliminar el resto de columnas. ¿Qué variante de project expresa directamente esa intención?',[
 ['project-rename User = AccountName','Los apuntes describen project-rename como cambio de nombres sin eliminar columnas.'],
 ['project User = AccountName como única columna','Ese project selecciona únicamente la columna indicada y retira las omitidas.'],
 ['project-away AccountName','project-away retira la columna; no la conserva bajo un nuevo nombre.'],
 ['summarize count() by AccountName','La agregación cambia filas y esquema; no es un simple cambio de nombre.']]);
Q('hunt-147',operators,['kql'],
 'El analista debe retirar una columna voluminosa de la salida, conservando todas las demás sin enumerarlas. ¿Qué operador corresponde?',[
 ['project-away','Los apuntes lo definen como mostrar todas las columnas salvo las indicadas.'],
 ['project-reorder','Reordena columnas; no elimina la columna voluminosa.'],
 ['extend','Añade columnas calculadas; no expresa retirar esa columna de la salida.'],
 ['take','Limita filas y no cambia por sí mismo las columnas presentes.']]);
Q('hunt-148',operators,['kql'],
 'Se necesitan, por cuenta, el total de eventos y cuántos fallaron, sin eliminar previamente los éxitos. ¿Qué interpretación tiene esta consulta?',[
 ['Total cuenta todas las filas de cada cuenta; Failed solo las que cumplen la condición','count() y countif() permiten medir ambas poblaciones dentro de la misma agrupación.'],
 ['Total y Failed serán siempre iguales porque summarize filtra los éxitos','summarize no aplica ese filtro; solo countif usa la condición indicada.'],
 ['Failed estima usuarios distintos en vez de contar eventos','countif cuenta filas; la estimación de distintos corresponde a dcount/dcountif.'],
 ['La consulta devuelve únicamente un resultado global para todas las cuentas','El by Account crea grupos por cuenta, no un único agregado global.']],[0],
 `Events
| summarize Total = count(), Failed = countif(Result != "Success") by Account`);
Q('hunt-149',operators,['kql'],
 'Se solicita una única métrica del volumen total del conjunto filtrado. La consulta usa summarize Total=count() sin by. ¿Qué unidad de agregación expresa?',[
 ['Un resultado agregado para todas las filas del conjunto de entrada','Los apuntes distinguen summarize sin by, que agrega globalmente, de agrupaciones por columnas.'],
 ['Un resultado por usuario porque el motor infiere Account','Sin by no se expresa una agrupación por cuenta.'],
 ['Una fila de salida por cada evento original','La agregación no conserva todas las filas originales como extend.'],
 ['Un listado de valores únicos de cada columna','count() cuenta filas; no crea ese listado de valores.']]);
Q('hunt-150',operators,['kql'],
 'El SOC necesita el evento con menor Timestamp de cada cuenta y las columnas de esa fila. ¿Qué diferencia entre min y arg_min orienta la consulta?',[
 ['arg_min(Timestamp, *) recupera la fila; min(Timestamp) solo el valor agregado','Los apuntes describen arg_min como la contraparte de arg_max para devolver la fila que minimiza la expresión.'],
 ['min(Timestamp) conserva automáticamente todas las columnas de la fila','Un mínimo agregado no equivale a seleccionar esa fila con sus columnas.'],
 ['arg_min devuelve siempre el evento de mayor severidad','La expresión indicada es Timestamp, no severidad.'],
 ['take 1 garantiza el evento más antiguo de cada cuenta','take no garantiza orden y tampoco expresa agrupación por cuenta.']]);
Q('hunt-151',operators,['kql'],
 'Se revisa arg_max(Severity, *) by Account. Se quiere usarlo como prueba del último evento de cada cuenta. ¿Qué conclusión es correcta?',[
 ['Selecciona la fila con mayor Severity, no necesariamente la más reciente','arg_max maximiza la expresión indicada; para último evento la expresión debe ser el timestamp adecuado.'],
 ['arg_max siempre significa último evento, sin importar su primer argumento','Los apuntes condicionan la selección a la expresión que se maximiza.'],
 ['Devuelve únicamente el número de eventos con severidad High','La consulta selecciona una fila por máximo; no hace un countif de High.'],
 ['Cambia automáticamente Severity por Timestamp al usar by Account','La agrupación no sustituye la expresión de selección.']]);
Q('hunt-152',operators,['kql'],
 'Dos eventos ocurren a las 10:04 y 10:06. Se agrupan con bin(Timestamp, 5m). ¿Qué explica que no caigan en el mismo grupo aunque estén separados por dos minutos?',[
 ['bin redondea hacia abajo a intervalos fijos; quedan en 10:00 y 10:05','Los apuntes definen bin como redondeo al intervalo; no crea una ventana móvil centrada en cada evento.'],
 ['bin agrupa siempre juntos todos los eventos separados por menos de cinco minutos','El redondeo por límites fijos no ofrece esa garantía de ventana móvil.'],
 ['bin descarta los timestamps que no sean múltiplos exactos de cinco minutos','Redondea el timestamp para agrupar; no elimina esos eventos.'],
 ['bin convierte ambos eventos en uno y borra su actividad original','La clave de agrupación no equivale a borrar telemetría original.']],[0],
 `Events
| summarize Events = count() by bin(Timestamp, 5m)`);
Q('hunt-153',operators,['kql'],
 'El SOC desea priorizar las cinco cuentas con más eventos de una tabla resumida. ¿Qué combinación expresa un ranking por volumen?',[
 ['summarize Events=count() by Account y top 5 by Events desc','Primero se calcula volumen por cuenta y después se seleccionan los mayores valores del agregado.'],
 ['take 5 antes de summarize, porque devuelve siempre las cuentas más activas','take limita filas sin garantizar cuáles; recortar eventos antes distorsiona el volumen.'],
 ['top 5 by Timestamp antes del recuento, para medir todas las cuentas','Eso selecciona eventos recientes y no mide el conjunto completo de actividad por cuenta.'],
 ['project Account, que ordena por frecuencia automáticamente','project selecciona columnas y no calcula ni ordena recuentos.']],[0],
 `Events
| summarize Events = count() by Account
| top 5 by Events desc`);
Q('hunt-154',operators,['kql'],
 'La cuenta investigada puede venir con mayúsculas distintas. Se compara con =~; otra consulta usa in con una lista. ¿Qué distinción de los apuntes afecta al resultado?',[
 ['=~ no distingue mayúsculas; in sí las distingue','Los apuntes diferencian comparación insensible de la pertenencia a lista indicada.'],
 ['Ambos operadores son siempre insensibles a mayúsculas','El documento atribuye distinción de mayúsculas a in.'],
 ['=~ es una búsqueda de subcadenas como contains','=~ compara igualdad sin distinguir mayúsculas, no pertenencia de una subcadena.'],
 ['in normaliza automáticamente todas las cuentas a minúsculas','La normalización debe expresarse cuando corresponda; no se atribuye a in.']]);
Q('hunt-155',operators,['kql'],
 'Una consulta usa parse kind=relaxed para convertir un campo de texto. Una fila coincide con el patrón pero su valor no se puede convertir al tipo. ¿Qué comportamiento describe el documento?',[
 ['La conversión fallida devuelve null','Los apuntes atribuyen ese comportamiento de conversión a relaxed.'],
 ['Siempre elimina la fila completa como parse-where','parse-where elimina las filas que no coinciden; no es la misma operación descrita para relaxed.'],
 ['Transforma todo valor inválido en cero confirmado','El documento especifica null y no garantiza ese valor sustituto.'],
 ['Detona el contenido del campo como Safe Attachments','parse es un operador de tratamiento de texto, no análisis de malware de adjuntos.']]);
Q('hunt-156',operators,['kql'],
 'Se quiere comparar volumen de eventos y número de cuentas por fuente como dos medidas numéricas, sin eje temporal. ¿Qué visualización encaja y dónde se aplica?',[
 ['scatterchart al final de una salida tabular preparada con las dos medidas','Los apuntes asignan scatterchart a relaciones entre dos medidas y render al último operador.'],
 ['timechart aunque no haya una columna datetime en el eje X','timechart se describe para evolución temporal con eje X datetime.'],
 ['render antes de summarize para que cambie los datos','render no modifica el dato; debe ir después de preparar la salida.'],
 ['piechart porque garantiza expresar cualquier relación entre dos métricas','piechart representa reparto proporcional entre categorías, no esa relación de dos medidas.']]);
Q('hunt-157',operators,['kql'],
 'El analista necesita mostrar todas las columnas conservadas, pero mover las claves al principio de la tabla para facilitar revisión. ¿Qué variante evita confundir orden y selección?',[
 ['project-reorder','Los apuntes describen esta variante para cambiar el orden de columnas.'],
 ['project-keep solo con las claves','Eso conserva únicamente las claves y elimina las demás columnas del objetivo.'],
 ['sort by Account','sort ordena filas por valores; no reordena columnas.'],
 ['summarize por las claves','summarize agrega filas y no es una operación de presentación del orden de columnas.']]);

Q('hunt-158',surfaces,['busquedas','retencion-sentinel'],
 'El IOC es antiguo, pero no se sabe si la telemetría está en Data Lake o en retención a largo plazo del workspace. ¿Qué decisión debe preceder elegir la herramienta?',[
 ['Localizar el almacén real y elegir la experiencia compatible con él','Los apuntes indican que la antigüedad sola no determina la herramienta: lake y retención del workspace tienen rutas diferentes.'],
 ['Elegir siempre Search job porque todo dato antiguo está en el mismo lugar','Search job corresponde al workspace; el documento distingue análisis del Data Lake.'],
 ['Elegir siempre Restore incluso sin comprobar tabla y plan compatibles','La restauración tiene condiciones propias y no sustituye identificar el almacén.'],
 ['Activar una regla NRT para revisar automáticamente cualquier histórico','Una detección sobre Analytics no sustituye la búsqueda histórica en cualquier almacén.']]);
Q('hunt-159',surfaces,['grafos'],
 'El SOC conserva el JSON de un workbook y espera recuperar con él la telemetría que expiró. ¿Qué límite explica por qué no funciona como respaldo de datos?',[
 ['El workbook guarda el layout y vuelve a consultar telemetría al abrirse','Los apuntes distinguen configuración visual y datos; el JSON no contiene una copia de la telemetría.'],
 ['El workbook exporta automáticamente todas las tablas cada vez que se guarda','El documento indica que guarda el layout, no los datos.'],
 ['Un workbook mantiene retención ilimitada independiente del almacén','La conservación depende de los datos consultados, no del layout del panel.'],
 ['Cambiar el tipo de gráfico reconstruye los eventos expirados','La presentación no recupera telemetría que ya no está disponible.']]);
Q('hunt-160',surfaces,['grafos'],
 'Un usuario solicita consultar Sentinel en lenguaje natural desde un cliente MCP. Cree que el servidor concede acceso adicional al no usar el portal. ¿Qué restricción persiste?',[
 ['Autenticación Entra y permisos de la identidad que lo usa','Los apuntes describen el servidor MCP limitado a esa identidad desde un cliente compatible.'],
 ['MCP permite leer todos los workspaces sin comprobar permisos','El documento conserva los permisos de la identidad, aunque cambie la superficie de consulta.'],
 ['Instalar una librería en el notebook otorga automáticamente privilegios globales','El servidor no es una librería importada en el notebook ni concede esos privilegios.'],
 ['Un prompt en lenguaje natural reemplaza la autenticación','La interfaz de lenguaje natural no elimina autenticación ni autorización.']]);
Q('hunt-161',surfaces,['grafos'],
 'Desde una entidad de un incidente, el analista quiere explorar posibles rutas hacia activos críticos. Otro analista quiere buscar relaciones generales sin escribir KQL. ¿Qué par distingue esos puntos de partida?',[
 ['Blast radius desde el nodo del incidente; hunting graph para explorar relaciones','Los apuntes distinguen continuación desde una entidad del incidente y la experiencia general de hunting graph con escenarios predefinidos.'],
 ['Data risk graph de IRM para todo movimiento lateral de dispositivos','Ese grafo de Purview parte de un usuario de riesgo y su actividad, no de esas rutas de Defender.'],
 ['Identity attack graph como sustituto del pivot Blast radius aunque el punto de partida sea un nodo del incidente','Los apuntes separan el grafo de identidades y recursos de la continuación desde una entidad del incidente con Blast radius.'],
 ['Suponer que hunting graph requiere escribir GQL para explorar sus escenarios predefinidos','El documento describe hunting graph sin necesidad de GQL, a diferencia de otras experiencias de grafos.']]);
Q('hunt-162',surfaces,['grafos'],
 'El SOC tiene datos propios no cubiertos por un grafo predefinido y necesita modelar relaciones a medida. ¿Qué ruta de autoría y publicación describen los apuntes?',[
 ['Custom graph desde notebook con extensión VS Code, publicado mediante graph job y consultado con GQL','El documento describe esa ruta para datos propios o no Microsoft sobre el data lake.'],
 ['Renombrar un workbook para que se convierta en identity attack graph','Un panel no transforma su layout en un grafo personalizado.'],
 ['Editar el modelo de Fusion para almacenar las relaciones nuevas','Fusion es lógica administrada y no es la ruta de autoría de custom graphs.'],
 ['Guardar el notebook sin ejecutar el graph job y dar el grafo por publicado','La ruta descrita requiere publicar mediante graph job; guardar el código de autoría no acredita esa publicación.']]);
Q('hunt-163',surfaces,['grafos'],
 'Dos investigaciones de Purview parten de puntos diferentes: una de un usuario de riesgo y su alerta, otra de un incidente de datos sensibles y sus rutas de salida. ¿Qué correspondencia es correcta?',[
 ['Data risk graph de IRM para el usuario; grafo de Data Security Investigations para el incidente de datos','Los apuntes distinguen ambos grafos por el punto de partida y los sitúan en Purview.'],
 ['Identity attack graph para ambos porque están en Purview','Identity attack graph trata identidades y recursos Azure/Entra en otra superficie.'],
 ['Process tree para ambos porque representa cualquier salida de datos','El árbol de procesos no sustituye esos grafos específicos de investigación de datos.'],
 ['No hay distinción: ambos son siempre el incident graph de Defender','El documento separa los dos grafos de Purview de las experiencias de hunting del SOC.']]);
Q('hunt-164',surfaces,['kql'],
 'Se reutiliza una pequeña referencia leída con externaldata durante la consulta. El equipo espera verla después como una tabla nueva del workspace. ¿Qué ocurre realmente?',[
 ['Se devuelve una tabla durante la consulta; no se ingiere ni crea una tabla del workspace','Los apuntes distinguen lectura externa en tiempo de consulta y persistencia mediante ingesta.'],
 ['externaldata ingiere permanentemente toda referencia consultada','El operador no realiza esa ingesta según el documento.'],
 ['Guardar la consulta como función convierte la referencia en datos almacenados','Una función guarda lógica reutilizable, no almacena los datos.'],
 ['render materializa la referencia cuando se dibuja un gráfico','render controla la representación y no materializa tablas.']]);
Q('hunt-165',surfaces,['kql'],
 'Se construye una consulta sobre varias fuentes normalizadas ASIM. Se quiere reunirlas mediante la abstracción adecuada y acotar tiempo desde sus parámetros. ¿Qué decisión encaja?',[
 ['Usar el parser unificador _Im_ con starttime/endtime cuando corresponda','Los apuntes distinguen unificador y específico y recomiendan _Im_ con parámetros de filtro.'],
 ['Usar siempre el parser específico de una sola fuente para reunir todas','El parser específico procesa una fuente; el unificador reúne varias.'],
 ['Copiar los logs a un workbook para normalizarlos permanentemente','El workbook guarda layout y consulta datos; no es un mecanismo de normalización en ingesta.'],
 ['Omitir todo filtro temporal porque ASIM convierte la consulta en retención','ASIM normaliza esquemas; no elimina la necesidad de acotar consultas ni controla retención.']]);

})();
