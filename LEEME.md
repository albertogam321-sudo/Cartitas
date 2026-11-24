# Cajita de cartas para Damaris 💌

## Cómo abrirla en VS Code
1. Usa la carpeta `cartas-poemas` completa (con la carpeta `img` adentro).
2. En VS Code: **Archivo → Abrir carpeta…** y elige `cartas-poemas`.
3. Instala la extensión **Live Server** (de Ritwick Dey) si no la tienes.
4. Clic derecho en `index.html` → **Open with Live Server**. Se abre en el navegador.
   (También funciona dando doble clic a `index.html`.)

Necesita internet para cargar los tipos de letra bonitos.

## Qué archivo cambiar
- `poemas.js` → los poemas, los retos de cada carta (adivinanzas, pupiletras, etc.), los versitos de las estrellas, la frase final y las canciones.
- `img/` → los stickers y fondos.
- `styles.css` → colores y animaciones.
- `app.js` → la lógica (no hace falta tocarlo).

La página recuerda qué cartas ya se abrieron. Para empezar de cero, abre la consola del navegador (F12) y escribe `localStorage.clear()`, o ábrela en una ventana de incógnito.

## Canciones
Ya suena `musica/mezcla.mp3` ("Yo pienso en ti" que pasa suavecito a "love." de wave to earth). Empieza al abrir la cajita y se repite; el botón ♫ la pausa.

Para agregar más:
1. Pon tus .mp3 en la carpeta `musica`.
2. En `poemas.js`, al final, escribe sus nombres en `CANCIONES`, por ejemplo `"musica/cancion1.mp3",`.
3. Si quieres que una carta tenga su propia canción, agrégale `cancion: "musica/esa.mp3",`.
