# SC-200 Lab

Simulacro independiente con 500 preguntas originales en español, basado en los objetivos SC-200 y en los conceptos pertinentes de los apuntes del usuario. No contiene preguntas oficiales ni reproduce un examen real.

## Usarlo

Abre `index.html` en un navegador moderno. No necesitas instalar dependencias, iniciar sesión ni subir apuntes. También funciona publicado como sitio estático.

- Simulacro: 50 preguntas aleatorias; 21 de entorno, 19 de respuesta y 10 de hunting. Cronómetro de práctica de 90 minutos.
- Estudio: sesiones de hasta 10, 25 o 50 preguntas, filtradas por dominio y tema; corrección inmediata al confirmar.
- Repaso: última respuesta incorrecta, preguntas guardadas y resultados de las últimas 50 sesiones.
- Banco: búsqueda de conceptos, respuestas explicadas y referencias oficiales.
- Progreso: guardado local, exportación e importación JSON validadas. El reloj de examen sigue corriendo al cerrar la página.

El progreso no se sincroniza entre dispositivos ni entre la copia local y el sitio publicado. Usa **Mi progreso → Exportar / Importar** para trasladarlo. No se envían respuestas a un servidor. Abrir referencias de Learn sí contacta con Microsoft; usar el sitio publicado contacta con su proveedor de alojamiento.

## Alcance y revisión

Consulta [REVIEW.md](REVIEW.md). La distribución del banco es 210 / 190 / 100. Incluye 50 temas, selección única y múltiple, y 20 ejercicios con consultas KQL visibles. El 80% es un objetivo de entrenamiento, no una conversión de la puntuación oficial ni una garantía de aprobar.

## Desarrollo y pruebas

Sin compilación. HTML, CSS y JavaScript sin dependencias de ejecución.

```sh
npm test
npm run coverage
npm run serve
```

Las pruebas de navegador están en `tests/browser.py` y requieren Python Playwright y Chromium. El puerto utilizado es `4173`. `tests/check_sources.py` consulta los enlaces oficiales y deja la caché fuera del proyecto, en `/tmp/sc200-learn-cache`.

`core.js` implementa selección, puntuación y validación. Los bancos están en `environment.js`, `response.js` y `hunting.js`. `sources.js` mantiene las referencias. No reordenar ni insertar preguntas antes de IDs existentes sin una migración de progreso; editar una pregunta conservando su ID preserva referencias guardadas.

No se publica el archivo privado `SC-200.md` ni `practiceSC200.txt`.
