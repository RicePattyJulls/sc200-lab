/* Revision 5. Original scenarios derived only from the private SC-200.md snapshot.
 * Explicit IDs are permanent; references.js must load before this file.
 * Source coordinates/fingerprints live in notes-source.js, without source excerpts.
 */
(() => {
  'use strict';
  SC.questionVersions = {};
  SC.noteCorrections = [];
  function revise(id, refs, prompt, explanation) {
    const q = SC.bank.find(q => q.id === id);
    SC.questionVersions[id] = [{beforeRevision: 5, question: JSON.parse(JSON.stringify(q))}];
    Object.assign(q, {prompt, explanation, noteRefs: refs, sources: [], chapter: SC.noteSections[refs[0]].chapter});
    SC.noteCorrections.push(id);
  }
  function add(id, topic, refs, prompt, choices, correct, reasons, code) {
    const domain = id.split('-')[0], chapter = SC.noteSections[refs[0]].chapter;
    if (SC.bank.some(q => q.id === id)) throw Error('ID repetido: ' + id);
    if (choices.length !== reasons.length || refs.some(r => !SC.noteSections[r])) throw Error('Pregunta incompleta: ' + id);
    const q = {id, domain, topic, chapter, sources: [], noteRefs: refs, prompt, choices, correct,
      explanation: correct.map(i => reasons[i]).join(' '), optionExplanations: reasons, addedInRevision: 5};
    if (code) q.code = code;
    SC.bank.push(q);
    let group = SC.groups.find(g => g.domain === domain && g.topic === topic);
    if (!group) {group = {domain, topic, chapter, sources: [], count: 0}; SC.groups.push(group);}
    group.count++;
  }

  // These clarifications retain the answer indices and the meaning of past progress.
  revise('env-004', ['permisos'],
    'El analista ya dispone de los permisos necesarios sobre Logic Apps. ¿Qué dos roles específicos de Sentinel le permiten gestionar incidentes y ejecutar manualmente playbooks preconfigurados?',
    'Microsoft Sentinel Responder permite gestionar incidentes y Microsoft Sentinel Playbook Operator ejecutar playbooks. Los apuntes documentan además Logic App Contributor sobre el resource group de los playbooks, concedido en este escenario; autorizar a la identidad de servicio de Sentinel es un paso distinto. Reader solo lee y Monitoring Metrics Publisher sirve para ingesta, no para ejecutar playbooks.');
  revise('env-033', ['asr'],
    'Una regla ASR compatible debe bloquear inicialmente y ofrecer una omisión temporal mediante Unblock, con aprobación administrativa desde la platform 4.18.26060. ¿Qué modo corresponde?',
    'Warn permite omitir el bloqueo durante 24 horas; desde la versión indicada exige aprobación de administrador. Audit registra sin bloquear, Disabled deshabilita y Passive es un modo del antivirus, no de la regla ASR.');
  revise('env-055', ['tuning'],
    'Un script de mantenimiento dispara una alerta nativa de MDE, no una custom detection ni Custom TI. Quieres reducir el ruido solo de ese contexto. ¿Qué configuras?',
    'Una regla de tuning o supresión específica delimita el contexto benigno. Alert tuning no aplica a custom detections ni Custom TI: en esas se ajusta la consulta o condición. Excluir globalmente del antivirus o retirar la recopilación reduce protección o visibilidad más allá del caso.');
  revise('env-176', ['tuning'],
    'Un workspace de Sentinel no está incorporado a Defender y no tiene XDR incident integration. Necesita correlación multietapa administrada por Microsoft. ¿Qué motor tradicional corresponde?',
    'Fusion correlaciona señales y produce un incidente multietapa. Se deshabilita al incorporar Sentinel al portal de Defender o habilitar XDR incident integration. Una DCRA asocia recopilación, un workbook visualiza y una watchlist aporta referencias; ninguno realiza esa correlación.');
  revise('response-022', ['correlacion'],
    'Una investigación necesita vincular varios incidentes relacionados dentro de un generic case. ¿Qué ventaja aporta ese case?',
    'Un generic case coordina trabajo más amplio y admite varios incidentes como linked objects. Un incident case envuelve un único incidente (1:1). Vincular objetos no borra evidencias ni ejecuta aislamiento.');
  revise('hunt-071', ['hunting'],
    'Desde Logs abierto en el contexto de Sentinel en el portal de Azure, quieres conservar un hallazgo con consulta, intervalo y notas. ¿Qué recurso utilizas?',
    'El bookmark conserva la fila y el contexto investigativo. Se crea desde Sentinel en Azure; en Defender se consultan los existentes. Advanced Hunting utiliza Link to incident. Una DCRA, Safe Links o la retención no guardan ese contexto de hunting.');
  revise('hunt-081', ['busquedas'],
    'Una consulta histórica sobre datos que ya están en el data lake debe ejecutarse una sola vez y guardar su salida en una tabla. ¿Qué capacidad eliges?',
    'Un KQL job de una ejecución materializa la salida. La antigüedad del dato no obliga a usar un job: sin necesidad de guardar una tabla se elige interactivo o async según duración. ASR previene comportamientos, una DCRA asocia recopilación y una notificación informa; ninguno materializa la consulta.');

  add('env-211', 'Licencias y arquitectura', ['sentinel-onboarding'],
    'El SOC desconecta un workspace del portal de Defender para reorganizar su integración. Sentinel ya estaba habilitado en ese workspace. ¿Qué describe el resultado de esa operación?',
    ['Se retira la conexión al portal de Defender; Sentinel sigue habilitado sobre el workspace', 'Se elimina el workspace y todo su histórico', 'Se deshabilita Sentinel y se conserva solo Defender XDR', 'Se convierten automáticamente sus tablas en Data Lake only'], [0],
    ['El offboarding del portal es independiente del onboarding de Sentinel sobre el workspace.', 'Disconnect workspace no es una operación de borrado del workspace.', 'Los dos pasos de incorporación son independientes; desconectar el portal no deshabilita Sentinel.', 'El cambio de integración del portal no decide el tier de las tablas.']);
  add('env-212', 'Licencias y arquitectura', ['sentinel-onboarding'],
    'Un tenant tiene Sentinel habilitado en un workspace, pero todavía no lo ha conectado a Defender. Quiere habilitar el Tenant Data Lake. ¿Qué secuencia respeta las dependencias de los apuntes?',
    ['Conectar el workspace a Defender como primario y después configurar el lake con suscripción y resource group de facturación', 'Habilitar el lake primero y conectar después cualquier workspace como secundario', 'Activar Connect events y considerar terminado el onboarding del lake', 'Crear un workbook y usar su resource group como sustituto del onboarding'], [0],
    ['El lake exige un workspace Sentinel conectado a Defender como Primary y recursos de Azure para facturación.', 'El requisito previo es el workspace primario incorporado, no un secundario posterior.', 'Connect events selecciona telemetría; no sustituye el setup del lake.', 'Un workbook es una visualización y no incorpora el tenant al lake.']);
  add('env-213', 'Licencias y arquitectura', ['licencias'],
    'Una empresa usa Defender for Business y compra MDE Plan 2 solo para su pequeño equipo SOC, esperando una experiencia MDE P2 independiente para ellos. ¿Qué restricción debe considerar?',
    ['El licenciamiento mixto conserva la experiencia de Defender for Business; el paso a MDE P2 requiere licenciar a todos los usuarios y contactar con soporte', 'Cada usuario obtiene automáticamente un portal con una experiencia distinta', 'La compra parcial convierte todos los servidores en clientes cubiertos por esas licencias', 'Defender for Business ya incluye Advanced Hunting y no cambia ninguna capacidad'], [0],
    ['Los apuntes describen una experiencia de tenant común y el procedimiento para pasar a MDE P2.', 'La mezcla de licencias no mantiene dos experiencias independientes.', 'Los servidores requieren cobertura propia; las licencias de usuario para clientes no los cubren.', 'Los apuntes excluyen Advanced Hunting de Defender for Business.']);
  add('env-214', 'Licencias y arquitectura', ['sentinel-onboarding'],
    'Dos regiones requieren residencia del dato y retenciones diferentes. El SOC quiere una cola común de incidentes. ¿Qué arquitectura encaja con esas necesidades?',
    ['Workspaces por región, incorporados al portal de Defender; mantener reglas por workspace y usar workspace() para consultas cruzadas', 'Un único workspace cuya región cambie automáticamente según cada evento', 'Workspaces regionales que fusionen automáticamente sus datos al compartir cola', 'Mover la región de cada workspace existente cuando cambien las necesidades'], [0],
    ['Separar por región permite gobernanza granular; la cola común no elimina la configuración ni la consulta por workspace.', 'La región se fija al crear el workspace y no cambia por evento.', 'Compartir la cola no centraliza ni mezcla los datos de los workspaces.', 'La región no se cambia: moverla exige recrear el workspace.']);

  add('env-215', 'Permisos combinados y scopes', ['rbac'],
    'Un analista recibe un scope de Sentinel limitado a Finance, pero mantiene una asignación amplia de Azure RBAC. Sigue accediendo a más datos de los previstos. ¿Qué explica mejor el resultado?',
    ['Los permisos se acumulan y la asignación amplia puede ampliar el acceso', 'El scope más reciente revoca automáticamente todas las asignaciones anteriores', 'Unified RBAC desactiva Azure RBAC en cuanto se configura un scope', 'La licencia determina qué filas ve y hace irrelevantes los roles'], [0],
    ['El alcance efectivo exige revisar todas las asignaciones; un scope estrecho no anula permisos más amplios.', 'La fecha de la asignación no establece una revocación automática.', 'Azure RBAC sigue activo en paralelo a Unified RBAC.', 'Licencia y autorización son ejes independientes.']);
  add('env-216', 'Permisos combinados y scopes', ['rbac', 'custom'],
    'Configuras Sentinel scoping para nuevos datos y una custom detection los resume eliminando SentinelScope_CF. El analista scoped no ve la alerta. Elige las dos comprobaciones justificadas.',
    ['Conservar SentinelScope_CF en la salida de la detección', 'Comprobar el etiquetado de la ingesta nueva, sin asumir que el histórico quedó etiquetado', 'Esperar que el scope se aplique retroactivamente a todos los registros', 'Aplicar la misma etiqueta mediante scoping a cualquier tabla nativa de XDR'], [0,1],
    ['Sin SentinelScope_CF, los apuntes indican que la alerta nace sin scope y queda invisible para analistas limitados.', 'El scoping etiqueta datos nuevos; el histórico no se etiqueta retroactivamente.', 'La configuración del scope no modifica automáticamente filas antiguas.', 'Los apuntes excluyen las tablas nativas de XDR de ese scoping.']);
  add('env-217', 'Permisos combinados y scopes', ['rbac', 'permisos'],
    'Un analista tiene Response (Manage), pero necesita ejecutar scripts por Live response y descargar archivos para análisis. ¿Qué permisos específicos deben revisarse además?',
    ['Advanced live response (Manage) y File collection (Manage)', 'Solo Basic live response (Manage), porque incluye ejecución de scripts', 'Solo Data (Manage), porque controla todo tipo de descarga', 'Solo Alerts (Manage), porque cualquier alerta permite ejecutar scripts'], [0],
    ['Los scripts y la recolección tienen permisos propios; Response no los engloba por sí solo.', 'Basic live response corresponde a acciones remotas de lectura, no a la ejecución avanzada de scripts.', 'Data (Manage) gestiona datos de Sentinel, tablas, tiers y retención.', 'Alerts (Manage) administra alertas y ciertas acciones, pero no sustituye esos permisos específicos.']);
  add('env-218', 'Permisos combinados y scopes', ['rbac', 'permisos'],
    'La regla scheduled consulta solo su workspace. Su creador pierde acceso. Otra regla consulta otro tenant y las credenciales del creador caducan. ¿Qué diferencia debes tener en cuenta?',
    ['La primera conserva su token propio; la cross-tenant puede fallar y terminar deshabilitada', 'Ambas se detienen siempre al cerrar sesión el creador', 'Ambas ignoran siempre cualquier cambio de credenciales', 'La primera depende del creador y la cross-tenant usa acceso anónimo'], [0],
    ['Los apuntes distinguen el token propio de la regla y la dependencia del creador en consultas cross-subscription o cross-tenant.', 'Cerrar sesión no detiene una regla que usa su token propio.', 'Las credenciales del creador sí importan en el caso cross-tenant descrito.', 'La excepción funciona al revés y no concede acceso anónimo.']);

  add('env-219', 'Controles del endpoint en contexto', ['endpoint'],
    'Un equipo está incorporado solo a MDE, sin inscripción en Intune. Quieres aplicarle una endpoint security policy. ¿Qué preparación y asignación corresponden?',
    ['Habilitar security settings management y asignar la policy a un grupo de dispositivos de Entra', 'Asignarla únicamente a un device group de MDE y omitir Enforcement scope', 'Asignarla a un grupo de usuarios de Entra como si estuviera inscrito en Intune', 'Elegir Device control, que cubre cualquier equipo incorporado solo a MDE'], [0],
    ['Los equipos solo MDE necesitan security settings management y asignación mediante grupos de dispositivos de Entra.', 'Los device groups de MDE sirven para RBAC y automation level, no para asignar esas policies.', 'La asignación por usuarios no corresponde a los dispositivos gestionados solo por MDE.', 'La plantilla Device control exige dispositivos inscritos en Intune.']);
  add('env-220', 'Controles del endpoint en contexto', ['endpoint', 'respuesta'],
    'Se añade un archivo a Automation folder exclusions. Después Live response responde File is excluded, pero el antivirus sigue analizándolo. ¿Cómo interpretas la combinación?',
    ['Es coherente: la exclusión afecta a AIR y a esa recopilación de Live response, no a los análisis antivirus', 'La exclusión está rota porque debía desactivar también el antivirus', 'El mensaje demuestra que falta una licencia de Sentinel', 'La exclusión es una supresión de alertas y no debería afectar a Live response'], [0],
    ['Los apuntes delimitan expresamente esas tres superficies y el mensaje File is excluded.', 'Automation folder exclusions no es una exclusión de Microsoft Defender Antivirus.', 'El resultado se explica por el alcance de la exclusión, no por una licencia de Sentinel.', 'Una supresión de alertas es otro control y no equivale a esta exclusión.']);
  add('env-221', 'Controles del endpoint en contexto', ['endpoint'],
    'Standard discovery excluye una subred del sondeo activo. Aun así aparece un dispositivo de esa subred en el inventario. ¿Qué explicación es compatible con los apuntes?',
    ['Puede haberse descubierto mediante observación pasiva o multicast', 'La exclusión garantiza invisibilidad total y el registro necesariamente es falso', 'Excluir el sondeo incorpora automáticamente el dispositivo a MDE', 'Basic discovery realiza más sondeos activos y está ignorando la exclusión'], [0],
    ['Excluir una IP detiene el sondeo activo, pero no todas las vías de descubrimiento.', 'La exclusión no promete ocultar dispositivos de toda observación.', 'Descubrimiento e incorporación son operaciones diferentes.', 'Basic discovery solo observa pasivamente; no añade sondeos activos.']);
  add('env-222', 'Controles del endpoint en contexto', ['asr', 'tablas'],
    'Una prueba de ASR dejó un evento 1122 y no impidió la actividad. El SOC quiere estudiar el impacto antes de bloquear. ¿Qué lectura y siguiente búsqueda corresponden?',
    ['Fue Audit; revisar DeviceEvents y los ActionType de ASR auditados', 'Fue Block; buscar obligatoriamente un incidente High', 'Fue una anulación de Warn; el evento esperado es siempre 1122', 'Fue un cambio de configuración; solo revisar el evento 5007'], [0],
    ['1122 identifica Audit, y DeviceEvents recoge los eventos de los controles ASR.', '1121 corresponde a bloqueo; además, no todo bloqueo genera una alerta EDR.', 'Los apuntes asignan 1129 a la anulación del bloqueo en Warn.', '5007 sí se relaciona con configuración, pero no es el evento observado.']);
  add('env-223', 'Controles del endpoint en contexto', ['postura'],
    'El SOC crea una solicitud de remediación de una vulnerabilidad y, con la conexión de Intune activa, aparece un security task. ¿Qué debe verificar antes de considerar corregidos los equipos?',
    ['Que IT haya aplicado la corrección y que el estado del dispositivo la confirme', 'Solo que exista la solicitud, porque despliega el parche automáticamente', 'Solo que el task tenga un propietario, porque elimina la vulnerabilidad', 'Que se cierre el incidente, porque eso ejecuta la recomendación'], [0],
    ['La solicitud organiza la remediación; el task requiere actuación de IT y comprobación del resultado.', 'La solicitud no cambia por sí sola la configuración de los dispositivos.', 'Asignar el trabajo no equivale a ejecutar la corrección.', 'El estado del incidente no ejecuta un parche ni una recomendación.']);

  add('env-224', 'Protección de correo aplicada', ['correo'],
    'Un destinatario está incluido en Strict y en una custom policy de Safe Attachments con Monitor. Se espera recibir adjuntos detectados para analizarlos, pero los mensajes terminan en cuarentena. ¿Qué explica el resultado?',
    ['Strict tiene precedencia y utiliza Block; la custom policy posterior no se evalúa para esa función', 'Las policies suman sus acciones y Monitor siempre vence a Block', 'La custom policy con prioridad más alta puede superar siempre a Strict', 'Las políticas predeterminadas de EOP se aplican antes de los presets'], [0],
    ['Para cada función aplica la primera policy por precedencia: Strict precede a las personalizadas y usa Block.', 'Las policies no suman todas sus decisiones; la primera aplicable decide.', 'La prioridad entre custom policies no las coloca por delante de Strict.', 'Las policies predeterminadas son el último recurso, no la primera capa de precedencia.']);
  add('env-225', 'Protección de correo aplicada', ['correo'],
    'El equipo excluye una URL de la reescritura de Safe Links y supone que ya no puede bloquearse al hacer clic. ¿Qué corrección corresponde?',
    ['No reescribir no garantiza permitir el clic; todavía puede bloquearse en ese momento', 'La excepción equivale a Allow para cualquier veredicto de malware', 'Para permitir el clic debe añadirse un indicador de MDE al destinatario', 'Las excepciones de reescritura deshabilitan Safe Attachments en el mensaje'], [0],
    ['Los apuntes separan la reescritura y el escaneo durante el flujo de correo de la protección al hacer clic.', 'La excepción de reescritura no sustituye el procedimiento de permiso mediante Submissions y la lista correspondiente.', 'Un indicador de MDE no configura la excepción de correo de Safe Links.', 'Safe Attachments es una protección distinta sobre adjuntos.']);
  add('env-226', 'Protección de correo aplicada', ['correo', 'automatizacion'],
    'Un adjunto está aún pendiente de análisis, pero se necesita entregar su cuerpo de correo sin exponer el archivo. Más tarde otro mensaje ya entregado obtiene veredicto malicioso. ¿Qué pareja cubre ambos momentos?',
    ['Dynamic Delivery para el primero y ZAP para la reevaluación posterior', 'Monitor para bloquear el adjunto y una quarantine policy para reevaluar el segundo', 'ZAP antes de la entrega y Dynamic Delivery para retirar correo ya entregado', 'Safe Links para detonar el adjunto y ASR para purgar el buzón'], [0],
    ['Dynamic Delivery entrega el cuerpo y reengancha adjuntos seguros; ZAP actúa sobre correo ya entregado.', 'Monitor entrega incluso si detecta malware; una quarantine policy regula acciones del usuario, no el veredicto.', 'Se invierten las funciones de ambos mecanismos.', 'Safe Links protege vínculos y ASR es prevención del endpoint, no remediación de buzones.']);
  add('env-227', 'Protección de correo aplicada', ['correo'],
    'Una campaña autorizada usa un simulador de phishing de terceros. El administrador propone añadir permisos permanentes de archivo en Tenant Allow/Block List. ¿Qué ruta corresponde al caso?',
    ['Configurar Advanced delivery para la simulación de terceros', 'Crear directamente Allow para cualquier archivo desde la lista', 'Deshabilitar las políticas anti-phishing predeterminadas', 'Usar una exclusión de Automation folder exclusions'], [0],
    ['Los apuntes reservan Advanced delivery para las simulaciones de phishing de terceros.', 'Un archivo legítimo bloqueado se remite por Submissions; no se crea directamente ese Allow.', 'Las policies predeterminadas no se deshabilitan ni borran; además no es el mecanismo de la simulación.', 'Automation folder exclusions pertenece a la investigación de endpoints.']);

  add('env-228', 'Rutas y transformaciones de ingesta', ['ingesta', 'tablas'],
    'Sysmon genera eventos correctamente. Se reenvían por WEF a un WEC y AMA los recopila mediante Windows Forwarded Events. Una detección consulta SecurityEvent y no encuentra filas. ¿Qué ajuste debes valorar?',
    ['Revisar WindowsEvent y adaptar la consulta al esquema de esa ruta', 'Reinstalar Sysmon porque todos sus eventos deben aparecer en SecurityEvent', 'Consultar DeviceProcessEvents porque WEF siempre escribe en XDR', 'Habilitar la auditoría desde la consulta de la analytics rule'], [0],
    ['La ruta WEF → WEC → AMA termina en WindowsEvent; la detección debe corresponder a su tabla y esquema.', 'Sysmon genera el evento, pero no determina la tabla de destino.', 'WEF no escribe automáticamente en las tablas nativas de Defender.', 'Consultar registros no habilita la auditoría en el origen.']);
  add('env-229', 'Rutas y transformaciones de ingesta', ['ingesta'],
    'Un appliance usa la misma facility para CEF y Syslog ordinario y no permite cambiarla. Hay duplicados en Syslog y CommonSecurityLog. ¿Qué cambio conserva ambas clases evitando duplicar CEF?',
    ['Filtrar los mensajes CEF del stream Syslog mediante una transformación en la DCR', 'Desactivar toda la facility en ambas rutas', 'Aplicar una suppression rule a los incidentes duplicados y mantener toda la ingesta', 'Quitar CommonSecurityLog y suponer que Syslog ya tiene todas sus columnas parseadas'], [0],
    ['Los apuntes proponen separar facilities o, si no es posible, filtrar CEF del stream Syslog antes de almacenar.', 'Se perderían también los eventos que sí se necesitan.', 'Suprimir incidentes no elimina la duplicación de registros ni su ingesta.', 'Syslog conserva el cuerpo en SyslogMessage; no equivale al esquema parseado de CommonSecurityLog.']);
  add('env-230', 'Rutas y transformaciones de ingesta', ['ingesta'],
    'Una aplicación envía JSON a Logs Ingestion API por Private Link. El equipo solo creó la tabla. Elige dos elementos que faltan en el diseño.',
    ['Una DCR con stream, transformación y destino compatibles, autorizando al emisor sobre ella', 'Un DCE para la ruta con Private Link', 'Una DCRA obligatoria sobre cada registro JSON publicado', 'Una regla scheduled que cree automáticamente el esquema de entrada'], [0,1],
    ['La DCR define el contrato de entrada/salida y el emisor necesita Monitoring Metrics Publisher sobre ella.', 'Los apuntes indican un DCE con Private Link o cuando la DCR carece de endpoint propio.', 'La asociación de una DCR con recursos no se realiza sobre cada registro JSON de la API.', 'La analytics rule consulta datos ya ingeridos; no configura el flujo de entrada.']);
  add('env-231', 'Rutas y transformaciones de ingesta', ['ingesta', 'retencion-sentinel'],
    'Para ahorrar, una transformación descarta ciertos eventos antes de guardarlos. Semanas después un incidente necesita esos eventos y el analista cambia la consulta del workbook. ¿Qué resultado cabe esperar?',
    ['El workbook no recuperará filas descartadas antes de almacenarse', 'El workbook reconstruirá los datos descartados si usa extend', 'Aumentar la total retention recuperará automáticamente las filas filtradas', 'Cambiar Basic a Analytics deshará retroactivamente la transformación'], [0],
    ['El filtrado de ingesta elimina esos datos de esta ruta; una visualización posterior no los reconstruye.', 'extend calcula columnas a partir de filas disponibles, no recrea eventos ausentes.', 'La retención conserva lo almacenado, no incorpora lo que se descartó.', 'Cambiar el plan modifica capacidades, no revierte transformaciones pasadas.']);

  add('env-232', 'Retención y costes en contexto', ['retencion-sentinel'],
    'Una tabla tiene 180 días de Analytics retention y 365 de total retention. Se baja solo Analytics a 90 días. ¿Qué sucede con los registros de entre 91 y 180 días?',
    ['Pasan a retención a largo plazo sin reducir su vida total de 365 días', 'Se eliminan definitivamente en el mismo instante', 'Entran necesariamente en la gracia de 30 días por reducción de total retention', 'Permanecen en la ventana interactiva de Analytics hasta cumplir 365 días'], [0],
    ['Reducir la ventana Analytics no reduce la total retention; cambia cómo se consultan esos datos.', 'No se ha reducido la vida total del dato a 90 días.', 'La gracia descrita corresponde a bajar la total retention, que aquí sigue en 365.', 'La ventana Analytics acaba ahora a los 90 días.']);
  add('env-233', 'Retención y costes en contexto', ['retencion-sentinel', 'busquedas'],
    'El SOC incorpora hoy el workspace al Data Lake y busca eventos antiguos que siguen en la retención a largo plazo del workspace. No aparecen en el lake. ¿Qué decisión corresponde?',
    ['Usar Search job sobre los datos conservados; el onboarding no refleja retroactivamente el histórico', 'Dar por eliminados los eventos porque no aparecen en el lake', 'Repetir el onboarding hasta que copie todo el histórico', 'Crear un KQL job sobre el lake asumiendo que contiene datos anteriores al onboarding'], [0],
    ['Los apuntes distinguen el reflejo de datos nuevos y el acceso por Search job al histórico aún retenido.', 'Ausencia en el lake no demuestra eliminación del dato en el workspace.', 'Repetir el onboarding no lo convierte en un mecanismo retroactivo.', 'El job solo puede consultar los datos disponibles en su fuente.']);
  add('env-234', 'Retención y costes en contexto', ['retencion-nativa'],
    'Un tenant Entra Free acaba de pasar a P2. Se buscan sign-ins de hace veinte días que ya habían expirado antes del cambio, sin exportación previa. ¿Qué conclusión es correcta?',
    ['P2 no recupera lo ya expirado; el cambio de licencia no es retroactivo', 'P2 reconstruye automáticamente los noventa días anteriores de cualquier sign-in', 'El cambio convierte los registros ausentes en Risky users sin caducidad', 'La nueva licencia copia automáticamente todo el histórico a Sentinel'], [0],
    ['Solo se conserva el dato que todavía existía; una licencia nueva no reconstruye registros.', 'Los apuntes separan sign-ins ordinarios de risky sign-ins y niegan recuperación retroactiva.', 'Risky users es un estado de identidad, no un almacén que recupere eventos expirados.', 'La licencia no configura una exportación histórica a Sentinel.']);
  add('env-235', 'Retención y costes en contexto', ['retencion-sentinel'],
    'Se alcanza la daily cap del workspace, pero siguen llegando datos Auxiliary y aparece algo de exceso facturado. ¿Qué interpretación encaja?',
    ['La cap afecta a ingesta facturable Analytics y Basic; Auxiliary queda fuera y el exceso previo al corte se factura', 'La cap bloquea por igual todos los planes y anula cualquier exceso', 'La cap solo modifica la retención y no afecta a recopilación', 'Auxiliary se vuelve gratis mientras la cap permanece activa'], [0],
    ['Los apuntes delimitan los planes afectados y aclaran que el corte no es retroactivo.', 'No es un límite universal instantáneo aplicado a todos los planes.', 'La cap puede detener recopilación y causar pérdida de eventos hasta el reset.', 'Quedar fuera de la cap no elimina los costes del plan.']);

  add('env-236', 'Inteligencia y detecciones aplicadas', ['ti'],
    'Una ingestion rule de TI descarta objetos de un conector. Un objeto equivalente enviado por Upload API sigue entrando. ¿Qué explica ese comportamiento?',
    ['Las ingestion rules de TI no se aplican a Upload API ni a objetos creados manualmente', 'La regla está en modo de simulación, porque una regla activa trataría ambas rutas igual', 'El objeto de API queda pendiente de que la misma regla lo revise retroactivamente', 'La API convierte cualquier regla de descarte en una modificación de la fecha de validez'], [0],
    ['Su alcance es la ingesta por data connectors, y tampoco modifica lo ya ingerido.', 'El distinto alcance de las rutas explica el resultado sin suponer un modo de simulación.', 'Las reglas no se aplican retroactivamente a objetos ya ingeridos y la API queda fuera de su alcance.', 'Descartar y modificar propiedades son acciones distintas; la API no convierte una en otra.']);
  add('env-237', 'Inteligencia y detecciones aplicadas', ['ti'],
    'El SOC quiere editar el KQL de matching para cruzar sus propios indicadores del workspace con una tabla concreta. ¿Qué vía encaja mejor?',
    ['Una plantilla TI map convertida en scheduled rule personalizable', 'Editar el modelo interno de MDTI Analytics', 'Crear un indicador de MDE y asumir que consulta las tablas de Sentinel', 'Configurar TAXII Export y asumir que eso crea alertas'], [0],
    ['Las plantillas TI map cruzan indicadores del workspace con telemetría usando KQL configurable.', 'MDTI Analytics usa lógica administrada y no permite editar ese KQL.', 'Un indicador de MDE configura protección del endpoint; no es esa detección de Sentinel.', 'TAXII Export transporta inteligencia a otra plataforma, no constituye la detección.']);
  add('env-238', 'Inteligencia y detecciones aplicadas', ['scheduled'],
    'Una scheduled rule corre cada 5 minutos. La fuente tarda 15 minutos en ingerir. Para no perder eventos ni volver a contar cada llegada, elige los dos ajustes complementarios descritos en los apuntes.',
    ['Ampliar el lookback por tiempo del evento para cubrir retraso más frecuencia', 'Limitar la consulta a llegadas recientes mediante ingestion_time()', 'Mantener solo cinco minutos de TimeGenerated porque la regla corre cada cinco', 'Cambiar únicamente la severidad de la alerta a High'], [0,1],
    ['La ventana ampliada permite incluir un evento antiguo que acaba de llegar.', 'El filtro por ingesta limita qué llegadas se procesan en esta ejecución y reduce repeticiones del lookback solapado.', 'Esa ventana puede excluir el evento cuando por fin se ingiere.', 'La severidad no cambia la ventana ni la latencia.']);
  add('env-239', 'Inteligencia y detecciones aplicadas', ['scheduled', 'custom'],
    'La consulta de una custom detection une SigninLogs con otra tabla mediante join. Se quiere seleccionar Continuous (NRT) porque las reglas NRT de Sentinel permiten varias tablas. ¿Qué hay que corregir?',
    ['Son mecanismos distintos: Continuous exige una tabla compatible y no admite join', 'Ambos nombres designan el mismo motor y comparten todos los límites', 'Continuous admite join si se elimina entity mapping', 'Mover ambas tablas a Basic habilita Continuous con join'], [0],
    ['La frecuencia Continuous de custom detections tiene sus propios requisitos, distintos de Sentinel NRT.', 'Los apuntes separan explícitamente ambas experiencias.', 'Eliminar el mapeo no elimina la restricción sobre join.', 'Las detecciones requieren las tablas Sentinel en Analytics; Basic no resuelve la limitación.']);
  add('env-240', 'Inteligencia y detecciones aplicadas', ['custom', 'tuning'],
    'Una custom detection genera falsos positivos repetidos. El SOC crea una regla Alert tuning con Resolve alert, pero no consigue el ajuste esperado. ¿Qué intervención corresponde?',
    ['Afinar la condición o la consulta de la custom detection', 'Cambiar Resolve por Hide porque así sí cubre custom detections', 'Cambiar Resolve por Set as behavior porque no tiene esa limitación', 'Cerrar una alerta manualmente para impedir todas las futuras'], [0],
    ['Alert tuning no aplica a custom detections ni Custom TI; el ajuste debe hacerse en su lógica.', 'La exclusión de custom detections afecta también a la acción Hide.', 'La exclusión afecta también a Set as behavior.', 'Resolver una alerta no impide nuevas detecciones de la misma actividad.']);
  add('env-241', 'Inteligencia y detecciones aplicadas', ['custom', 'respuesta'],
    'Una custom detection sobre correo devuelve NetworkMessageId, pero elimina RecipientEmailAddress antes de configurar Delete email. ¿Qué falta para dirigir la acción?',
    ['Conservar también RecipientEmailAddress junto con NetworkMessageId', 'Sustituir ambos por el asunto, que identifica unívocamente el mensaje', 'Añadir DeviceId como identificador del buzón', 'Aumentar la severidad para que la acción deduzca el destinatario'], [0],
    ['Las acciones Move to mailbox folder y Delete email exigen identificador del mensaje y destinatario.', 'El asunto no sustituye los identificadores requeridos.', 'DeviceId identifica un dispositivo, no el mensaje en un buzón.', 'La severidad no reconstruye columnas eliminadas.']);

  add('env-242', 'Automatización aplicada', ['automatizacion'],
    'Se necesita automatizar directamente alertas de Defender/XDR. Alguien propone el trigger estándar When alert is created de Sentinel, suponiendo que cubre XDR. ¿Qué alternativa de los apuntes cubre ese caso?',
    ['Enhanced Alert Trigger, considerando que permite una acción por regla y no usa orden de prioridad', 'El trigger estándar, que admite cualquier alerta XDR sin distinción', 'Una DCR, que ejecuta playbooks cuando entra una alerta', 'Una summary rule, que transforma cada resumen en una respuesta'], [0],
    ['Enhanced Alert Trigger cubre alertas Sentinel y XDR con sus límites propios.', 'Los apuntes limitan el trigger estándar a los orígenes de reglas indicados, sin cubrir directamente alertas XDR.', 'La DCR controla recopilación y transformación, no esa orquestación.', 'Resumir datos no ejecuta por sí solo una respuesta.']);
  add('env-243', 'Automatización aplicada', ['automatizacion'],
    'MDO Plan 2 autoriza Soft delete automático para un tipo de cluster. Un cluster de ese tipo contiene 12.000 mensajes y queda pendiente. ¿Qué explica la aprobación requerida?',
    ['Los clusters de más de 10.000 mensajes quedan pendientes aunque su tipo esté seleccionado', 'MDO usa el nivel Semi del device group del destinatario', 'ZAP debe aprobar primero cada acción AIR', 'Seleccionar el tipo garantiza remediación automática sin límite de tamaño'], [0],
    ['La autorización de tipos de cluster tiene la excepción de tamaño indicada en los apuntes.', 'Las opciones de MDO se configuran aparte de los device groups de MDE.', 'ZAP no es el paso de aprobación de AIR.', 'La selección del tipo no elimina la excepción de los clusters grandes.']);
  add('env-244', 'Automatización aplicada', ['automatizacion', 'endpoint'],
    'Attack disruption necesita contener un dispositivo y MDE usa Standard discovery con nivel Semi. El SOC cree que esperará aprobación como AIR. ¿Qué comportamiento describen los apuntes?',
    ['Puede contener sin aprobación previa; No automated response sí deja al grupo fuera', 'Semi impide cualquier contención automática de attack disruption', 'Cambiar a Basic discovery conserva el requisito de Contain device', 'El nivel del device group convierte attack disruption en un playbook editable'], [0],
    ['Los apuntes separan la aprobación de AIR de la contención por attack disruption y excluyen No automated response.', 'El nivel Semi no impone esa aprobación previa a attack disruption.', 'Contain device por disrupción requiere Standard discovery en el escenario descrito.', 'La disrupción usa lógica administrada de Microsoft, no un playbook que redacta el analista.']);
  add('env-245', 'Automatización aplicada', ['automatizacion', 'correo'],
    'Dos mensajes cloud de las últimas 48 horas ya fueron leídos. Uno recibe veredicto spam y otro malware. ¿Qué distinción aplica a ZAP según los apuntes?',
    ['Para spam actúa solo sobre no leídos; para malware puede actuar sobre leídos y no leídos', 'Para ambos actúa exclusivamente sobre no leídos', 'Para spam actúa sobre leídos y para malware exige que no se hayan leído', 'Leer el mensaje impide cualquier protección posterior en todos los veredictos'], [0],
    ['El estado leído tiene un tratamiento diferente según el veredicto; también importan las políticas aplicables.', 'La restricción a no leídos corresponde al spam, no al malware.', 'Se invierte la distinción de los apuntes.', 'La protección posterior sigue siendo posible para malware y phishing.']);

  add('response-191', 'Correlación y gestión de cases', ['correlacion'],
    'Se resuelve un incident case y su incidente relacionado refleja el cambio, pero quedan alertas sin resolver. ¿Qué interpretación corresponde?',
    ['El incident case sincroniza estado con su incidente, pero no resuelve por ello las alertas', 'La sincronización está necesariamente rota porque todo case resuelve todas sus alertas', 'El case es genérico y por eso debía fusionar todos los incidentes', 'Resolver el case demuestra que las acciones de contención terminaron'], [0],
    ['Los apuntes distinguen este comportamiento del incidente clásico de Defender, que sí resuelve alertas activas vinculadas.', 'La persistencia del estado de las alertas es compatible con el incident case.', 'Incident case es 1:1; generic case vincula objetos y no implica un merge.', 'El estado de gestión no verifica la ejecución técnica de acciones.']);
  add('response-192', 'Correlación y gestión de cases', ['correlacion'],
    'El default de correlación del tenant está apagado. Una regla Sentinel del primario recibe #INC_CORR# al principio de su descripción después de generar sus primeras alertas. ¿Qué debes esperar?',
    ['Las alertas nuevas pueden participar; el cambio no modifica la elegibilidad de las ya creadas', 'Todas las alertas históricas se incorporan retroactivamente a la correlación', 'El tag solo funciona si se coloca al final del título del incidente', 'El tag elimina la necesidad de habilitar Incident creation'], [0],
    ['El estado de correlación de cada alerta queda fijado al generarse; el tag explícito prevalece sobre el default.', 'El cambio de tag no altera retroactivamente las alertas existentes.', 'El tag se escribe al principio de la descripción de la analytics rule.', 'Las alertas con Incident creation deshabilitado no aparecen en Defender en el escenario descrito.']);
  add('response-193', 'Correlación y gestión de cases', ['sentinel-onboarding', 'correlacion'],
    'El SOC ve incidentes del primario y de secundarios en una cola de Defender. Espera que una alerta del secundario se correlacione automáticamente con XDR. ¿Qué límite debe recordar?',
    ['La cola común no incorpora las alertas de secundarios a la correlación con XDR ni con otros workspaces', 'Compartir cola fusiona automáticamente las bases de datos de todos los workspaces', 'Cambiar la severidad del incidente secundario habilita su correlación global', 'Todas las consultas workspace() convierten sus resultados en incidentes correlacionados'], [0],
    ['Los apuntes separan visibilidad común y alcance del motor de correlación.', 'Los datos siguen perteneciendo a sus workspaces.', 'La severidad no convierte un secundario en primario ni cambia ese alcance.', 'workspace() sirve para consultar otros workspaces, no para activar correlación de incidentes.']);

  add('response-194', 'Evidencia y permisos de investigación', ['permisos', 'investigacion'],
    'Un investigador restringido por administrative units busca en Purview Audit un evento de Endpoint DLP y no lo encuentra. Otro administrador sin restricción sí lo ve. ¿Qué explicación está respaldada?',
    ['Hay actividades, incluidos esos file events, visibles solo para el administrador sin restringir', 'Los dos deberían ver todos los registros porque Audit Reader ignora el alcance', 'El evento solo puede existir en DeviceInfo, nunca en Audit', 'Cambiar la zona horaria concede acceso a registros fuera de la unidad'], [0],
    ['Los apuntes delimitan la visibilidad de Audit por administrative units y enumeran esa excepción.', 'El permiso para buscar no elimina el alcance de la búsqueda.', 'La ausencia puede explicarse por permisos; DeviceInfo es inventario de dispositivos.', 'La zona horaria cambia la interpretación temporal, no los permisos.']);
  add('response-195', 'Evidencia y permisos de investigación', ['permisos'],
    'Un administrador puede crear búsquedas en un case eDiscovery al que accede, pero no puede previsualizar ni exportar resultados. ¿Qué permisos revisas específicamente?',
    ['Preview y Export, que se conceden aparte de Compliance Search', 'Solo Compliance Search, que incluye siempre las otras dos acciones', 'Solo el rol Owner del workspace de Sentinel', 'Solo File collection de MDE, porque cualquier descarga pasa por él'], [0],
    ['Los apuntes separan búsqueda, preview, exportación y acceso al case.', 'Compliance Search habilita búsqueda y estimaciones, no todas las acciones sobre el resultado.', 'Un rol sobre Sentinel no sustituye los role groups de Purview.', 'File collection es un permiso de recolección de archivos en Defender, no de exportación eDiscovery.']);
  add('response-196', 'Evidencia y permisos de investigación', ['investigacion', 'tablas'],
    'La alerta DLP se ve en Defender, pero User activity summary no aparece y las tablas DataSecurityBehaviors/DataSecurityEvents están vacías. ¿Qué dos condiciones de integración revisas?',
    ['Que se haya habilitado el intercambio de riesgo interno con Defender', 'Que el usuario esté dentro del alcance de una policy IRM para el resumen de actividad', 'Que cualquier alerta DLP active automáticamente todas las tablas IRM', 'Que Connect incidents & alerts sustituya todas las políticas y el opt-in de IRM'], [0,1],
    ['El intercambio es requisito para la integración y para poblar las tablas de IRM descritas.', 'El resumen de actividad DLP exige además que el usuario esté en el alcance de una policy IRM.', 'La presencia de una alerta DLP no activa por sí sola el flujo de IRM.', 'El conector XDR no sustituye la configuración de IRM.']);

  add('response-197', 'Verificación de respuesta', ['respuesta'],
    'El SOC ha comprobado un compromiso real, deshabilitado la cuenta y revocado refresh tokens, pero el riesgo aún figura como At risk. ¿Cómo registra la conclusión sin confundirla con la contención?',
    ['Ejecutar Confirm compromised de forma explícita y verificar por separado las medidas de contención', 'Repetir la revocación hasta que por sí sola cambie el estado a Confirmed compromised', 'Usar Dismiss risk para registrar que se confirmó el compromiso', 'Considerar que deshabilitar la cuenta equivale a Remediated y omitir la comprobación del estado'], [0],
    ['Confirmed compromised requiere la acción explícita; las acciones de contención se realizan y verifican aparte.', 'Revocar refresh tokens contiene el acceso, pero no establece ese estado de riesgo.', 'Dismiss risk lleva a Dismissed, no registra Confirmed compromised ni neutraliza credenciales robadas.', 'Deshabilitar una cuenta es contención; no equivale a remediar el riesgo ni sustituye comprobar su estado.']);
  add('response-198', 'Verificación de respuesta', ['respuesta'],
    'Stop and quarantine no llega a un equipo que permanece desconectado durante más de tres días. ¿Qué significa ese plazo en los apuntes?',
    ['Es el timeout de entrega de la acción; hay que revisar el resultado por dispositivo', 'Es el tiempo tras el cual todo archivo en cuarentena se restaura automáticamente', 'Es la retención máxima del hash en el banco de indicadores', 'Es una garantía de que el equipo quedó limpio aunque nunca se conectara'], [0],
    ['Los tres días delimitan la entrega de la acción, no cuánto dura la cuarentena.', 'No describen restauración automática de un archivo.', 'No son la caducidad de un indicador de hash.', 'Solicitar una acción no demuestra que el endpoint la ejecutó.']);
  add('response-199', 'Verificación de respuesta', ['respuesta'],
    'Un analista pulsa Ctrl+C durante un comando de Live response y da por detenida la operación remota. ¿Qué debe comprobar antes de repetirla?',
    ['El Command log y el estado real del agente: cancelar en el portal no garantiza detener la operación', 'Solo que desaparezca el indicador de ejecución del portal', 'Que pueda abrir de nuevo la sesión: eso demuestra que cualquier comando anterior terminó', 'Que Pending esté vacío, porque todas las operaciones remotas usan solo esa vista'], [0],
    ['Los apuntes advierten de la diferencia entre cancelar en el portal y detener la operación en el agente.', 'La interfaz por sí sola no verifica el estado remoto.', 'Poder acceder a la sesión no sustituye comprobar el resultado del comando ni el estado del agente.', 'El seguimiento de Live response incluye el registro de comandos y no se reduce a Pending.']);
  add('response-200', 'Verificación de respuesta', ['permisos', 'cloud', 'respuesta'],
    'Un operador con Security Admin sobre la suscripción puede descartar alertas de Defender for Cloud, pero no aplicar Fix sobre un recurso. ¿Qué explica la diferencia?',
    ['Fix requiere Contributor u Owner sobre el recurso o scope aplicable; Security Admin no lo concede', 'Descartar la alerta ya ejecuta Fix y el botón es redundante', 'Security Reader sustituye el permiso de escritura requerido', 'Un rol Copilot owner concede automáticamente escritura sobre el recurso'], [0],
    ['Los apuntes separan administración de seguridad y permisos para modificar el recurso con Fix.', 'Cambiar el estado de una alerta no remedia el recurso.', 'Security Reader es lectura y no aporta esa escritura.', 'Los roles de Copilot no conceden por sí solos acceso a los datos o recursos de destino.']);

  add('response-201', 'Copilot durante la investigación', ['permisos', 'investigacion'],
    'Un Copilot contributor puede abrir sesiones, pero el plugin de Sentinel no devuelve incidentes del workspace solicitado. ¿Qué revisas antes de ampliar roles de plataforma?',
    ['El acceso al workspace y el destino elegido en el prompt o por defecto, porque el plugin actúa con los permisos del usuario', 'Convertirlo siempre en Copilot owner, que concede lectura universal de Sentinel', 'Asignarle permisos únicamente sobre un device group de MDE', 'Suponer que la capacidad SCU incluye automáticamente autorización a todos los datos'], [0],
    ['OBO conserva los permisos del producto de destino; el plugin de Sentinel requiere acceso al workspace correcto.', 'Copilot owner administra la plataforma, pero no otorga por sí solo acceso al dato.', 'Un device group de MDE no sustituye permisos sobre el workspace de Sentinel.', 'La capacidad de cómputo y la autorización a los datos son cosas distintas.']);
  add('response-202', 'Copilot durante la investigación', ['investigacion'],
    'El siguiente turno necesita saber quién gestionó el incidente y qué acciones y playbooks se ejecutaron. ¿Qué salida de Copilot se ajusta mejor a esa finalidad?',
    ['Incident report, contrastado con el historial de gestión y acciones', 'Incident summary, asumiendo que solo describe la gestión del SOC', 'Risky user summarization, porque emite el veredicto del agente de identidad', 'Un resumen de Intune, porque sustituye al historial del incidente'], [0],
    ['Incident report se centra en la gestión: analistas, clasificación, acciones y playbooks.', 'Incident summary cuenta principalmente el ataque, su cronología, activos e indicadores.', 'Risky user summarization resume y recomienda; no emite el veredicto del Identity Risk Management Agent.', 'La ayuda sobre policies de Intune no sustituye el historial del incidente.']);

  add('hunt-101', 'KQL: semántica y correlación', ['kql'],
    'Eventos contiene dos filas con la misma Clave y Contexto contiene una coincidencia. El analista omite kind= y obtiene una sola coincidencia. Necesita conservar ambos eventos. ¿Qué cambio corresponde?',
    ['Usar join kind=inner', 'Usar join kind=innerunique explícitamente', 'Usar join kind=leftanti', 'Sustituir el join por summarize count() sin by'], [0],
    ['inner conserva las combinaciones coincidentes; aquí devuelve una por cada fila de Eventos.', 'innerunique ya es el valor predeterminado y deduplica el lado izquierdo por la clave.', 'leftanti devuelve las filas sin coincidencia, no ambos eventos coincidentes.', 'Un conteo global no enriquece cada evento con Contexto.'],
    'Eventos\n| join Contexto on Clave');
  add('hunt-102', 'KQL: semántica y correlación', ['kql'],
    'Estas consultas usan la misma tabla. ¿Cuál responde a «cuentas cuya última actividad registrada fue un inicio de sesión 4624», en vez de «último inicio de sesión de cada cuenta»?',
    ['A: resumir primero y filtrar después', 'B: filtrar primero y resumir después', 'Ambas siempre devuelven las mismas cuentas', 'Ninguna, porque arg_max no puede devolver la fila completa'], [0],
    ['A escoge la última actividad de cada cuenta y después exige que sea 4624.', 'B elimina antes otros tipos de actividad y devuelve el último 4624, aunque haya actividad posterior distinta.', 'El orden importa cuando existe actividad posterior que no es 4624.', 'arg_max(TimeGenerated, *) devuelve las columnas de la fila seleccionada.'],
    '// A\nSecurityEvent\n| summarize arg_max(TimeGenerated, *) by Account\n| where EventID == 4624\n\n// B\nSecurityEvent\n| where EventID == 4624\n| summarize arg_max(TimeGenerated, *) by Account');
  add('hunt-103', 'KQL: semántica y correlación', ['patrones', 'kql'],
    'Una consulta une clics permitidos con procesos por AccountUpn y conserva los iniciados en los diez minutos posteriores. ¿Qué conclusión permite el resultado?',
    ['Una asociación temporal que debe investigarse, sin demostrar por sí sola causalidad', 'Que cada proceso devuelto fue causado por el clic', 'Que todos los clics anteriores al proceso fueron bloqueados por Safe Links', 'Que el mismo UPN garantiza el mismo dispositivo físico'], [0],
    ['El patrón de los apuntes acota tiempo y cuenta, pero no demuestra que el clic provocó el proceso.', 'Compartir identidad y ventana temporal no prueba causalidad.', 'El patrón filtra ClickAllowed, no clics bloqueados.', 'El UPN identifica una cuenta; el dispositivo requiere su propio contexto.'],
    'clics\n| join kind=inner procesos on AccountUpn\n| where ProcesoEn between (ClicEn .. ClicEn + 10m)');
  add('hunt-104', 'KQL: semántica y correlación', ['kql'],
    'Cada fila contiene un array de objetos. Debes expandirlo y ejecutar una subconsulta por fila para ordenar sus elementos y conservar los relevantes. ¿Qué operador expresa mejor esa operación?',
    ['mv-apply', 'mv-expand por sí solo, sin ninguna subconsulta', 'project-rename', 'render barchart'], [0],
    ['mv-apply permite una subconsulta sobre los elementos de cada array, incluyendo filtros, orden o resumen.', 'mv-expand expande elementos, pero por sí solo no define la subconsulta por fila solicitada.', 'project-rename cambia nombres de columnas.', 'render configura la visualización del resultado.']);
  add('hunt-105', 'KQL: semántica y correlación', ['kql'],
    'Una consulta apila eventos regionales con columnas parcialmente distintas. Se necesita conservar todas las columnas e identificar de qué tabla vino cada fila. ¿Qué variante corresponde?',
    ['union kind=outer withsource=Tabla', 'union kind=inner sin withsource', 'join kind=innerunique on DeviceId', 'summarize count() by DeviceId'], [0],
    ['outer conserva todas las columnas y withsource añade el origen de la fila.', 'inner conserva solo columnas compartidas y aquí tampoco añade el origen.', 'join relaciona por claves; no apila las filas como se pide.', 'El resumen reduce filas a conteos y no conserva el contenido de cada evento.']);
  add('hunt-106', 'KQL: semántica y correlación', ['patrones', 'tablas', 'asr'],
    'El SOC quiere estudiar únicamente eventos ASR en Audit, sin confundirlos con bloqueos. ¿Qué condición completa la consulta de los apuntes?',
    ['ActionType endswith "Audited"', 'ActionType endswith "Blocked"', 'ActionType == "LogonFailed"', 'ActionType has "Email"'], [0],
    ['El patrón selecciona nombres que comienzan por Asr y terminan en Audited.', 'Blocked seleccionaría bloqueos, no el modo Audit solicitado.', 'LogonFailed no identifica ese conjunto de eventos ASR.', 'Email no delimita los eventos ASR auditados.'],
    'DeviceEvents\n| where ActionType startswith "Asr"\n| where [Target]');

  add('hunt-107', 'Búsquedas históricas y materialización', ['busquedas'],
    'Los datos ya están en el lake. Una consulta puntual puede exceder el timeout interactivo, terminaría en menos de una hora y no necesita guardar una tabla. ¿Qué mecanismo encaja?',
    ['Async query', 'KQL job obligatorio por tratarse de datos históricos', 'Restore de Data Lake tier', 'Una custom detection Continuous para guardar el resultado'], [0],
    ['Async corre en segundo plano hasta una hora y conserva el resultado en caché 24 horas sin crear un job.', 'La necesidad de materializar o programar, no solo la antigüedad, justifica el job.', 'Restore no aplica a Data Lake tier en los apuntes.', 'Una detección no sustituye el mecanismo de búsqueda histórica y caché.']);
  add('hunt-108', 'Búsquedas históricas y materialización', ['busquedas'],
    'Hay que localizar un IOC en la retención a largo plazo del workspace y después cruzar las coincidencias con otra tabla usando KQL completo. ¿Qué secuencia encaja con Search job?',
    ['Buscar con sus operadores admitidos y después consultar y unir la tabla Analytics _SRCH resultante', 'Incluir cualquier join en la consulta inicial de Search job', 'Usar contains en la consulta inicial porque no tiene restricciones', 'Abrir un workbook y asumir que conserva el histórico fuera de retención'], [0],
    ['Search job copia coincidencias a _SRCH, donde se pueden analizar con KQL completo.', 'La consulta inicial del job tiene operadores limitados y no admite join.', 'Los apuntes indican has, no contains, para esa consulta limitada.', 'Un workbook guarda el layout y consulta datos disponibles; no conserva una copia del histórico.']);
  add('hunt-109', 'Búsquedas históricas y materialización', ['busquedas'],
    'La investigación necesita explorar todas las filas de un intervalo de tres días conservado en long-term retention de Analytics, con varias consultas completas. ¿Qué ofrece Restore?',
    ['Una vista _RST en caché activa; borrarla libera la restauración sin borrar el origen', 'Una tabla _SRCH que contiene solo coincidencias de un filtro', 'Una vista que sigue disponible aunque se elimine el dato de origen', 'Una restauración idéntica para cualquier tabla Auxiliary o Data Lake only'], [0],
    ['Restore está orientado a investigar el intervalo completo y depende de que el origen siga disponible.', '_SRCH corresponde a Search job, que copia las coincidencias.', 'La vista de restauración depende de la disponibilidad del origen.', 'Los apuntes excluyen Auxiliary y Data Lake tier de Restore.']);
  add('hunt-110', 'Búsquedas históricas y materialización', ['busquedas', 'retencion-sentinel'],
    'Un equipo quiere guardar diariamente agregados de logs Auxiliary en Analytics y comprobar la salud de ese procesamiento, conservando el raw data según su retención. ¿Qué combinación corresponde?',
    ['Summary rule y revisión de LASummaryLogs', 'Workbook y revisión de sus colores', 'Custom detection sobre Auxiliary sin materialización', 'Alert suppression y revisión de los incidentes ocultos'], [0],
    ['Summary rule materializa agregados en una tabla custom Analytics; LASummaryLogs permite revisar su ejecución.', 'El workbook visualiza datos y no realiza esa materialización periódica.', 'Las detecciones no consultan directamente ese plan como si fuera Analytics.', 'Suprimir alertas no resume los datos ni valida una tarea de agregación.']);

  add('hunt-111', 'Grafos y superficies de hunting', ['grafos', 'identidad'],
    'El analista necesita preguntar con GQL por rutas entre identidades y recursos Azure/Entra usando Microsoft Entra ID Assets y Azure Resource Graph. ¿Qué experiencia corresponde?',
    ['Identity attack graph de Sentinel Graph', 'Lateral Movement Paths de MDI', 'Hunting graph con escenarios predefinidos sin GQL', 'Data risk graph de IRM centrado en un insider'], [0],
    ['Los apuntes describen esos conectores, el alcance y GQL para identity attack graph.', 'LMP es una vista de MDI sobre AD local y no esa consulta GQL del data lake.', 'Hunting graph permite escenarios predefinidos sin necesitar GQL.', 'El data risk graph de IRM parte del usuario de riesgo y su actividad, no de ese escenario.']);
  add('hunt-112', 'Grafos y superficies de hunting', ['hunting', 'grafos'],
    'Un hallazgo de Advanced Hunting merece escalarse. El analista busca crear un bookmark como hacía desde Logs en Sentinel Azure. ¿Qué flujo corresponde en Advanced Hunting?',
    ['Link to incident para crear alertas desde los resultados y agruparlas en un incidente', 'Crear el bookmark directamente porque ambas superficies usan el mismo flujo', 'Guardar un workbook para generar automáticamente un incidente', 'Crear un custom graph para ejecutar automáticamente la contención'], [0],
    ['Los apuntes indican Link to incident como vía de conservación/escalado en Advanced Hunting.', 'El flujo de bookmarks descrito corresponde a Logs en el contexto de Sentinel Azure.', 'Guardar una visualización no crea automáticamente alertas o incidentes.', 'Publicar un grafo no ejecuta por sí mismo acciones de contención.']);
  add('hunt-113', 'Grafos y superficies de hunting', ['hunting'],
    'Una hunting query favorita muestra Results delta = N/A al abrir la página. El equipo quiere documentar «cero coincidencias». ¿Qué debe revisar antes?',
    ['Si falta una fuente de datos o la consulta no está activa', 'Solo si las dos ventanas tuvieron el mismo número de coincidencias, porque N/A significa delta cero', 'Si existe una analytics rule asociada, porque ninguna hunting query se ejecuta sin ella', 'Nada: N/A equivale siempre a cero eventos'], [0],
    ['Results delta compara ventanas; N/A indica falta de fuente o consulta inactiva, no necesariamente cero resultados.', 'Un delta nulo y un resultado no disponible no son equivalentes; N/A no confirma igualdad entre ventanas.', 'Una hunting query favorita puede ejecutarse al abrir la página; no requiere crear antes una analytics rule.', 'Los apuntes niegan expresamente esa equivalencia.']);

  add('hunt-114', 'Tablas y evidencias relacionadas', ['tablas', 'kql'],
    'SecurityIncident devuelve varios AlertIds en una columna dinámica. Debes recuperar las alertas correspondientes de SecurityAlert. ¿Qué relación usas?',
    ['Expandir AlertIds y relacionar cada valor con SystemAlertId', 'Unir directamente IncidentNumber con NetworkMessageId', 'Unir el título del incidente con cualquier DeviceName', 'Apilar ambas tablas con union y considerar relacionadas las filas consecutivas'], [0],
    ['Los apuntes definen la relación mediante los IDs expandidos de las alertas.', 'Esos identificadores pertenecen a objetos diferentes.', 'Una coincidencia de texto entre nombres no constituye la clave de relación.', 'union apila filas sin establecer vínculos por clave.']);
  add('hunt-115', 'Tablas y evidencias relacionadas', ['tablas'],
    'Una investigación sigue una URL difundida por Teams y una acción posterior sobre el mensaje. ¿Qué conjunto de tablas describe directamente esas fases?',
    ['MessageEvents, MessageUrlInfo y MessagePostDeliveryEvents', 'EmailEvents, EmailUrlInfo y EmailPostDeliveryEvents', 'MessageEvents, EmailUrlInfo y EmailPostDeliveryEvents', 'EmailEvents, MessageUrlInfo y MessagePostDeliveryEvents'], [0],
    ['Las tres tablas describen mensajes de Teams, sus URL y acciones posteriores a la entrega.', 'La familia Email describe correo, no el recorrido de mensajes de Teams planteado.', 'La tabla inicial es adecuada, pero las otras dos pertenecen a correo y no a ese mensaje de Teams.', 'Las tablas de URL y acciones son adecuadas, pero EmailEvents corresponde a correo; falta MessageEvents.']);
  add('hunt-116', 'Tablas y evidencias relacionadas', ['tablas', 'kql'],
    'Una consulta de HuntingBookmark sigue mostrando entradas de un bookmark borrado. ¿Cómo distingues historial conservado de un bookmark actualmente vigente?',
    ['Examinar su última entrada y el indicador SoftDeleted', 'Suponer que toda fila significa que el bookmark sigue activo', 'Borrar la tabla para retirar el bookmark de todos los incidentes', 'Usar únicamente el título, porque borrar elimina siempre todas sus versiones'], [0],
    ['Los apuntes indican que borrar conserva el historial y deja la última entrada con SoftDeleted == true.', 'Una fila histórica no determina por sí sola el estado actual.', 'Eliminar el historial completo no es la comprobación solicitada ni el efecto del borrado del bookmark.', 'El título no sustituye el estado de la última entrada y el historial sí se conserva.']);
})();
