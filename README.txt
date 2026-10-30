LANDININV2 — HTML, CSS Y JAVASCRIPT PUROS

Uso
Abre index.html en el navegador. Los archivos están listos para alojarse como
sitio estático. No se necesita React, Astro, Node ni compilación del frontend.
La fotografía y las tipografías Bebas Neue y DM Sans se incluyen localmente.

Subir a Railway
1. Conecta a Railway un repositorio que contenga esta carpeta.
2. Si el repositorio es landings, configura Root Directory como /landininv2
   y la ruta del archivo de configuración como /landininv2/railway.json.
   Si el contenido de esta carpeta es la raíz del repositorio, deja los valores
   predeterminados, sin subdirectorio.
3. El Dockerfile sirve los archivos con Nginx. No definas comandos adicionales
   de build ni de inicio. Usa el puerto PORT que Railway asigna (8080 por defecto).
4. Genera el dominio del servicio en Networking.
Configuración basada en https://docs.railway.com/config-as-code/reference
Esta entrega prepara los archivos; no publica en una cuenta de Railway.
No se ejecutó Docker localmente porque no está instalado en este equipo.

Archivos
index.html       Contenido y estructura.
styles.css       Estilos estáticos y animaciones CSS.
script.js        Contador, modal, formulario y avisos flotantes.
assets/          Fotografía, fuentes y sus licencias.
Dockerfile       Contenedor para servir la página.
nginx.conf       Configuración de Nginx.
railway.json     Build y comprobación de disponibilidad en la ruta /.

Formulario
El ZIP original no incluye un servidor, CRM ni un receptor de WhatsApp.
El formulario valida nombre, email, WhatsApp, país y fecha de nacimiento.
Sin un endpoint configurado, informa que los datos no se han enviado.
No guarda datos personales en el navegador.
Configura formEndpoint en LANDING_CONFIG, al principio de script.js, con tu
endpoint POST que acepte JSON: name, email, phone, country y dob.
El servidor debe responder con un estado HTTP satisfactorio al recibir los datos.
Mantén claves privadas y credenciales en el servidor.

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
