LANDININV2 — HTML, CSS Y JAVASCRIPT PUROS

Uso
La página conserva su diseño original y sus recursos locales. Para que el
formulario funcione, usa el servidor Node incluido: node --env-file=.env server.mjs
Requiere Node 24. No necesita dependencias ni compilación del frontend.
Abrir index.html directamente sirve para revisar el diseño, sin envío de datos.

Subir a Railway
1. Conecta el repositorio que contiene esta carpeta a un servicio de Railway.
2. Si el repositorio es landings, configura Root Directory como /landininv2
   y el archivo de configuración como /landininv2/railway.json.
3. Railway construye el Dockerfile; no agregues comandos de build o inicio.
4. En Variables configura GOOGLE_SHEETS_WEBAPP_URL y GOOGLE_SHEETS_TOKEN.
   Son los mismos valores privados para las seis landings.
5. Genera el dominio en Networking. El servidor escucha en PORT (8080 por defecto).
La integración necesita que el receptor Apps Script esté desplegado y autorizado
en la cuenta de Zaira. Preparar archivos no publica automáticamente en Railway.

Archivos
index.html / styles.css / script.js  Página original y sus interacciones.
leads-client.js                     Envío y reintentos sin duplicados.
server.mjs                         Archivos públicos y endpoint /api/leads.
landing.config.json                Identidad de esta landing en el servidor.
assets/                            Imágenes, fuentes y licencias.
Dockerfile / railway.json          Despliegue sin dependencias adicionales.
.env.example                       Variables de ejemplo, sin claves reales.
nginx.conf                         Configuración anterior; ya no se utiliza.

Formulario
Valida nombre, correo, WhatsApp, país y fecha de nacimiento. El servidor añade
landininv2 — Nexus como origen; no acepta una identidad elegida por el cliente.
La hoja recibe fecha y hora, landing, los cinco campos, página e ID de registro.
No se guardan datos personales en localStorage ni se publican claves privadas.
El ID se conserva en memoria si falla un envío y permite reintentar sin duplicar.
Solo muestra confirmación cuando Google Sheets devuelve el ID guardado. Si falta
configuración o falla Google, conserva el formulario y permite volver a intentarlo.
Nunca pongas el token en script.js, index.html o un repositorio. Para uso local,
copia .env.example a .env y completa las variables; .env está excluido de Git.

Comportamiento conservado
El modal aparece al entrar y vuelve a ofrecerse cada tres minutos, siempre que
no se esté rellenando el formulario. Se cierra con el botón, Escape o al pulsar
el fondo. Su botón principal lleva al formulario.
El contador del diseño original comienza con un tiempo aleatorio entre uno y
480 segundos. Los tres relojes comparten la misma fecha de vencimiento,
guardada en localStorage, y permanecen en cero al terminar, incluso al recargar.
Los avisos flotantes son los ejemplos del ZIP; no representan actividad en vivo.
Las barras de progreso y las animaciones se reproducen con CSS.

Referencia visual
Se conservaron contenido, colores, composición y breakpoints de App.tsx.
No se añadieron los logos, imágenes o video que no se utilizan en ese componente.
El ZIP no trae un archivo .fig ni una captura independiente para comparar contra
el lienzo de Figma. Se compara con la página que genera su código original.
Se mantuvo noindex, nofollow del original; cámbialo cuando corresponda indexar.

Recursos
Fotografía original: Unsplash, photo-1689732888407-310424e3a372.
https://unsplash.com/license
Bebas Neue y DM Sans: Google Fonts, SIL Open Font License.
Iconos SVG: Lucide, licencia ISC.
CSS compilado con Tailwind CSS, licencia MIT; no necesita Tailwind en ejecución.
Licencias incluidas en assets/licenses/.
