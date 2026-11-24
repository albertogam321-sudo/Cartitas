/* =========================================================
   💌  POEMAS Y RETOS PARA DAMARIS
   ---------------------------------------------------------
   Cada carta tiene:
     titulo   : el título
     texto    : el poema
     firma    : (opcional)
     papel    : "marco" (marquito con gatito y rosa),
                "cuaderno" (hoja con gatitos) o "rosa"
     stickers : imágenes de la carpeta img/ que decoran la carta
     imagen   : (opcional) foto grande arriba del poema
     cancion  : (opcional) "musica/cancion.mp3"
     reto     : el juego que hay que ganar para abrir la carta

   Tipos de reto:
     adivinanza   -> pregunta + respuestas válidas + pista
     pupiletras   -> palabras escondidas en una sopa de letras
     memoria      -> encontrar las parejas de stickers
     ordenar      -> ordenar las letras de una palabra
     atrapar      -> tocar los corazoncitos que flotan
     pregunta     -> opción múltiple (con humor)
     rompecabezas -> armar una imagen

   Stickers disponibles en img/:
     gato-corazon, gato-flor, gato-florecita, gatos-abrazo,
     corazon-rosa, gatito-ojitos, gatos-mimos, gato-feliz,
     gato-pixel, frasco-corazones, botella-amor, corazon-rojo,
     sobre, snoopy, gatos-novios, corazon-paisaje,
     fotos-gatitos, gatitos-abrazados
   ========================================================= */

const CARTAS = [
  {
    titulo: "Qué bonita coincidencia",
    papel: "marco", stickers: ["gatos-novios"],
    reto: {
      tipo: "adivinanza",
      pregunta: "No la planeas, no la buscas, simplemente sucede… y gracias a ella, tú y yo nos encontramos. ¿Qué es?",
      respuestas: ["casualidad", "coincidencia", "destino", "la casualidad", "una casualidad", "una coincidencia", "el destino"],
      pista: "Es el título de esta carta 😉 (empieza con C)"
    },
    texto: `Despertaste en mí algo que creí perdido,
una ilusión que daba por dormida,
y sin buscarlo, sin siquiera esperarlo,
llegaste a darle un nuevo sentido a mis días.

Al principio pensé que serías algo pasajero,
una bonita historia de esas que llegan y se van,
pero qué curioso es el corazón,
que termina encontrando hogar donde menos lo espera.

Y qué bonita coincidencia la nuestra,
que entre tantas personas nos hayamos encontrado,
que aquello que comenzó como una simple ilusión
terminara siendo un sentimiento compartido.

No sé qué nos depare el destino,
pero hoy agradezco haberte conocido.
Porque de todas las casualidades de mi vida,
tú eres una de mis favoritas.`
  },
  {
    titulo: "Si tiene nombre, que sea amor",
    papel: "rosa", stickers: ["frasco-corazones", "corazon-rosa"],
    reto: { tipo: "pupiletras", palabras: ["AMOR", "DAMARIS", "BESO", "RISA"] },
    texto: `Damaris, he intentado encontrarle un nombre
a todo eso que provocas en mí,
pero ninguna palabra parece suficiente
cuando se trata de hablar de ti.

Quizás sea pronto para decir que te amo,
quizás el tiempo tenga algo que opinar,
pero ¿cómo explicarle al corazón
que debe esperar cuando no deja de sentir?

No sé si sea tu risa, tus historias,
o esa manera tan tuya de hacerme sonreír,
pero hay algo en cada pequeña cosa que compartes
que me hace querer seguir descubriéndote.

Y si algún día me preguntas qué siento,
no buscaré palabras demasiado elaboradas:
te quiero en mis días buenos,
en mis días difíciles y en mis mañanas inesperadas.

Y si todo esto tiene un nombre,
si existe una palabra que lo pueda describir,
entonces que sea amor,
porque es lo más parecido a lo que siento por ti.`
  },
  {
    titulo: "Sus ojos, mi lugar favorito",
    papel: "rosa", imagen: "sus-ojos.jpg", stickers: ["gatito-ojitos"],
    reto: { tipo: "memoria" },
    texto: `No sé qué tienen tus ojos,
que cada vez que los miro me pierdo,
y aunque conozca el camino de regreso,
siempre encuentro una razón para volver a ellos.

Hay miradas que simplemente se cruzan,
y otras que parecen detener el tiempo.
La tuya tiene algo que no comprendo,
pero que me hace querer mirarte de nuevo.

A veces quisiera saber qué ves cuando me miras,
si encuentras en mis ojos lo que yo encuentro en los tuyos,
si notas que por unos pequeños segundos
olvido todo lo que sucede a nuestro alrededor.

Y si algún día me preguntas qué es lo que más me gusta de ti,
quizás te hable de tu sonrisa, de tus ocurrencias o de tu voz,
pero en el fondo sabrás que hay algo que no puedo ocultar:
que mis ojos siempre terminan buscándote.`
  },
  {
    titulo: "Advertencia oficial",
    papel: "cuaderno", stickers: ["gato-feliz"],
    reto: {
      tipo: "pregunta",
      pregunta: "Antes de abrir esta carta, responde con sinceridad: ¿qué vas a hacer cuando la leas?",
      opciones: ["Sonreír", "Sonrojarme", "Reírme sola", "Todas las anteriores"],
      correctas: [0, 1, 2, 3],
      mensaje: "¡Todas eran correctas! Ya te conozco, señorita 😏"
    },
    texto: `Aviso importante, señorita Damaris:
esta carta no trae instrucciones,
pero si sonríes al leerla
me debes un abrazo y dos razones.

Una, por quitarme el sueño
pensando en tu forma de reír;
la otra, por andar tan tranquila
como si no supieras lo que causas en mí.

Y si dices que no sonreíste,
no te creo, no insistas, no;
ya sé que te estás riendo ahorita…
y eso, señorita, lo gané yo.`
  },
  {
    titulo: "Mi admiración tiene tu nombre",
    papel: "cuaderno", stickers: ["snoopy"],
    reto: { tipo: "ordenar", palabra: "ADMIRACION", pista: "Lo que siento cuando te escucho hablar" },
    texto: `Hay algo que me encanta de escucharte hablar,
esa manera tan tuya de explicar,
de contar las cosas con tanta emoción,
que termino prestándote hasta mi atención.

A veces me pregunto cómo sabes tanto,
cómo puedes hablar de tantas cosas
y hacer que hasta lo más sencillo
se convierta en algo interesante.

Y mientras tú me cuentas lo que has aprendido,
yo me quedo admirando a quien tengo enfrente.
Qué bonita es tu inteligencia,
pero más bonito es descubrir la persona que hay detrás de ella.

Y no voy a mentirte,
a veces me distraigo de lo que estás explicando,
porque entre tanta cosa interesante que dices,
termino pensando en lo afortunado que soy
de tenerte frente a mí.`
  },
  {
    titulo: "Si pudieras verte como yo te veo",
    papel: "marco", stickers: ["gato-flor"],
    reto: { tipo: "atrapar", cantidad: 8, simbolo: "💗", texto: "Atrapa los 8 corazones que se escaparon" },
    texto: `Ojalá pudieras verte por un momento
a través de mis ojos,
para que entiendas por qué sonrío
cada vez que apareces frente a mí.

Verías lo bonita que eres cuando te emocionas,
cuando cuentas algo y no puedes dejar de hablar,
cuando te ríes de tus propias ocurrencias
y cuando ni siquiera intentas impresionar.

Quizás entonces comprenderías
por qué encuentro belleza en tus pequeños detalles,
por qué hasta tus gestos más sencillos
se convierten en recuerdos inolvidables.

Y si pudieras verte como yo te veo,
entenderías que no hace falta que seas perfecta,
porque hay algo en tu manera de ser
que te hace extraordinaria sin siquiera intentarlo.`
  },
  {
    titulo: "Denuncia formal",
    papel: "cuaderno", stickers: ["gato-pixel"],
    reto: {
      tipo: "adivinanza",
      pregunta: "Me lo robaste sin pedir permiso, late más rápido cuando apareces y ahora es tuyo. ¿Qué es?",
      respuestas: ["corazon", "el corazon", "tu corazon", "mi corazon"],
      pista: "Tiene forma de 💗"
    },
    texto: `Quiero poner una denuncia
contra una tal Damaris, sin piedad:
me robó la calma, la concentración
y unas cuantas horas de sueño de verdad.

Se llevó también mis buenas excusas,
mi seriedad y mi forma de pensar,
y ahora ando sonriéndole al celular
como si no tuviera nada más que hacer.

El juez me miró muy serio:
"¿Y qué castigo quiere pedir?"
—Cadena perpetua, señor juez…
pero de besos, y cerquita de mí.`
  },
  {
    titulo: "Hay algo en tu mirada",
    papel: "rosa", imagen: "sus-ojos.jpg", stickers: ["corazon-rosa"],
    reto: { tipo: "rompecabezas", imagen: "img/sus-ojos.jpg", texto: "Arma la imagen para descubrir la carta" },
    texto: `Hay algo en tu mirada que me intriga,
una mezcla de ternura y alegría,
un pequeño universo que quisiera conocer
y en el que, si me lo permites, me gustaría permanecer.

No sé qué esconden tus ojos,
ni qué historias guardan detrás de ellos,
pero hay ocasiones en las que quisiera detenerme
y descubrir todo aquello que no dices con palabras.

Porque puedes contarme mil historias,
hacerme reír hasta perder la razón,
pero hay algo que me gusta todavía más:
cuando nuestras miradas conversan sin explicación.

Y qué bonito sería que, al mirarme,
alguna vez encontraras lo mismo que yo encuentro en ti:
a alguien que, sin buscar demasiado,
encontró en tus ojos un motivo para sonreír.`
  },
  {
    titulo: "Donde las miradas hablan",
    papel: "marco", stickers: ["gatos-mimos"],
    reto: { tipo: "memoria" },
    texto: `Hay momentos en los que no necesitamos hablar,
basta una mirada para empezar a conectar.
Y no sé si te sucede lo mismo que a mí,
pero hay algo especial cuando te miro y me miras así.

Es curioso cómo dos personas pueden entenderse
sin tener que explicar demasiado,
como si por un pequeño instante
nuestros pensamientos se hubieran encontrado.

Me gustan esas pequeñas coincidencias,
las sonrisas que aparecen sin explicación,
las miradas que duran un poquito más
y esa complicidad que nace entre los dos.

No sé cómo llamarlo,
ni pretendo encontrarle una explicación,
solo sé que cuando conectamos de esa manera,
me siento exactamente donde quiero estar.`
  },
  {
    titulo: "Matemáticas del corazón",
    papel: "cuaderno", stickers: ["botella-amor"],
    reto: {
      tipo: "pregunta",
      pregunta: "Problema de matemáticas: Tú + Yo = ?",
      opciones: ["2", "Un equipo", "Un montón de besos", "Nosotros 💗"],
      correctas: [1, 2, 3],
      error: "Mmm… en mis cuentas nunca da 2. Intenta otra vez 😌",
      mensaje: "¡Correcto! Ya puedes ver la demostración 🤓"
    },
    texto: `Nunca fui bueno con los números,
pero contigo hice una excepción:
sumé tus risas, resté mis miedos
y dividí mis días entre tú y yo.

Lo revisé una y otra vez,
por si me había equivocado en algo,
pero siempre me daba lo mismo:
un montón de ganas de tenerte a mi lado.

Y si me pides que lo demuestre,
no tengo fórmula ni pizarrón,
pero tengo unos cuantos besos pendientes
que explican mejor la ecuación.`
  },
  {
    titulo: "No eres solamente bonita",
    papel: "marco", stickers: ["gato-corazon"],
    reto: { tipo: "pupiletras", palabras: ["BONITA", "ESENCIA", "ALEGRIA", "OJOS"] },
    texto: `Eres bonita, sí,
pero sería injusto quedarme solamente con eso.

Porque eres bonita cuando te emocionas,
cuando explicas algo con entusiasmo,
cuando haces bromas sin previo aviso
y cuando conviertes cualquier conversación en un buen rato.

Eres bonita en tus ocurrencias,
en tus pequeñas manías,
en esa manera tan tuya de hacer las cosas
que termina alegrándome los días.

Y es que mientras muchos podrían quedarse admirando tu apariencia,
yo tengo la suerte de ir descubriendo tu esencia.

Qué bonito es que alguien te parezca hermoso por fuera,
pero que cada día encuentres nuevas razones
para admirarlo todavía más por dentro.`
  },
  {
    titulo: "No cambiaría tus locuras",
    papel: "rosa", stickers: ["gatos-abrazo", "gato-florecita"],
    reto: { tipo: "ordenar", palabra: "LOCURAS", pista: "Esas que nunca cambiaría de ti" },
    texto: `Me gusta tu forma de ser,
esa que no se puede explicar ni aprender.
Tus ocurrencias, tus cambios repentinos,
esa manera de convertir cualquier momento en algo divertido.

Me gusta cuando te ríes sin motivo,
cuando dices algo que no esperaba,
cuando sacas de la nada una idea
y terminas contagiándome tu alegría.

No quiero que cambies tus locuras,
ni que escondas esas pequeñas travesuras.
Porque entre tantas cosas que podría admirar,
es tu esencia lo que me hace quedar.

Y si alguna vez te preguntas qué me gusta tanto de ti,
no sabría por dónde empezar,
pero hay algo que puedo asegurarte:
no me enamoré de una versión perfecta,
me enamoré de tu manera tan bonita de ser tú.`
  },
  {
    titulo: "Las flores que viven en el corazón",
    papel: "marco", imagen: "img/corazon-paisaje.png", stickers: [],
    reto: { tipo: "atrapar", cantidad: 8, simbolo: "🌷", texto: "Recoge las 8 florecitas para armar el ramo" },
    texto: `Dicen que algunas flores nacen para adornar jardines,
otras para perfumar los rincones de algún hogar,
y hay algunas que, sin saberlo,
nacen para quedarse en el corazón de alguien más.

Quizás tú seas una de esas flores,
de las que no necesitan primavera para florecer,
de las que iluminan hasta los días grises
sin siquiera darse cuenta de lo que pueden hacer.

Y allí estás tú, con esa mirada tan bonita,
sin imaginar todo lo que puedes provocar,
mientras alguien, desde el otro lado,
no encuentra otra cosa que hacer que admirar.

Porque hay miradas que buscan belleza
y otras que la encuentran sin tener que buscar.
Y si alguna vez te preguntas por qué te miro así,
es porque hay flores que no nacen para adornar jardines,
sino que, sin darte cuenta,
terminan floreciendo dentro del corazón de alguien.`
  },
  {
    titulo: "La chica que no sabe lo bonita que es",
    papel: "rosa", stickers: ["gatitos-abrazados", "corazon-rojo"],
    reto: { tipo: "rompecabezas", imagen: "img/puzzle-gatitos.jpg", texto: "Arma la foto de los gatitos enamorados" },
    texto: `Hay una chica que se mira al espejo
y solo encuentra lo que quisiera cambiar:
un detalle aquí, un "no me gusta" allá,
sin saber todo lo que yo veo al mirar.

No sabe que su risa ordena mis días,
que le brillan los ojos cuando habla de lo que ama,
que hasta distraída, despeinada o cansada
sigue siendo lo más bonito de mi semana.

Ella cuenta sus defectos como quien cuenta estrellas,
y yo, que la miro desde aquí,
quisiera prestarle mis ojos un ratito
para que se viera como yo la vi.

No sé si algún día llegarás a comprender
lo bonita que eres, Damaris,
pero mientras tú sigas viendo tus pequeños defectos,
yo seguiré encontrando razones para admirarte.`
  },
  {
    titulo: "Mil maneras",
    papel: "marco", stickers: ["sobre"],
    reto: {
      tipo: "adivinanza",
      pregunta: "Última carta. Lo encontraste en un frasco, en una botella y en cada sticker de esta página. Se escribe con 4 letras. ¿Qué es?",
      respuestas: ["amor", "el amor", "mi amor"],
      pista: "Es lo que siento por ti 💗"
    },
    texto: `No voy a decirte otra vez que eres hermosa,
eso ya lo sabe tu espejo, y lo sabe el sol;
prefiero contarte las cosas pequeñas
que nadie ve y que veo yo.

Cómo te emocionas cuando explicas algo,
cómo tu risa llega antes que el chiste,
cómo haces que un día cualquiera
se vuelva el más bonito que existe.

Me encanta tu manera de mirar,
tu forma de cuidar a los que quieres,
y esa ternura que escondes
detrás de todas tus ocurrencias.

Y esto es solo el comienzo,
la primera de mil maneras
de explicarte por qué me encantas,
una por cada día que me quieras.`
  }
];

/* Versitos que salen de las estrellitas y regalitos que caen */
const SORPRESAS = [
  { titulo: "Casualidad", texto: `No sé si fue el destino o una casualidad,
pero qué bonito fue encontrarte
y qué suerte que te pudiera gustar.` },
  { titulo: "Si tus ojos fueran un lugar", texto: `Si tus ojos fueran un lugar,
no buscaría otro destino,
me bastaría con mirarlos
para perderme en el camino.` },
  { titulo: "Tu sonrisa", texto: `No necesito un día soleado,
si tengo la suerte de ver tu sonrisa
iluminando cualquier día nublado.` },
  { titulo: "Una queja", texto: `Señorita, tengo una queja
que quisiera presentar:
no es justo que sea tan bonita
y encima me haga suspirar.` },
  { titulo: "Tus ojos", texto: `Qué tendrán tus ojos,
que cuando se encuentran con los míos,
hasta mis palabras pierden el sentido.` },
  { titulo: "Arte", texto: `No sé si eres arte o casualidad,
pero qué bonita obra
se tomó el tiempo de crear la naturaleza.` },
  { titulo: "Mi distracción favorita", texto: `Dicen que debo prestar atención,
pero ¿cómo hacerlo, señorita,
si usted se ha convertido en mi distracción?` },
  { titulo: "Entre la gente", texto: `Qué culpa tienen mis ojos
de buscarte entre la gente,
si hasta cuando no estás presente
te encuentran en mi mente.` },
  { titulo: "Conexión", texto: `No sé si eres WiFi, señorita,
pero desde que te conocí
siento una conexión tan fuerte
que ya no me quiero desconectar de ti.` },
  { titulo: "Tu esencia", texto: `No sé qué tienen tus ocurrencias,
pero entre risas y conversaciones
te has vuelto una de mis más bonitas razones.` },
  { titulo: "Motivos", texto: `Si supieras cuántas veces
me has alegrado sin saberlo,
entenderías por qué me gusta tanto
ser uno de los motivos de tu sonrisa.` },
  { titulo: "Un pensamiento", texto: `No te pienso todo el día,
pero qué curioso resulta
que siempre termines apareciendo en mi alegría.` },
  { titulo: "Solo Damaris", texto: `No quiero que seas una estrella,
ni tampoco mi luna entera,
me basta con que seas Damaris,
esa chica que tanto quisiera.` },
  { titulo: "La señorita", texto: `Qué inteligente la señorita,
me enseña tantas cosas sin saber
que la lección más bonita
es que cada día la quiero conocer.` },
  { titulo: "Tarea pendiente", texto: `Si fueras tarea, señorita,
no te dejaría para mañana:
te haría con calma, letra por letra,
y con muchas ganas, toda la semana.` },
  { titulo: "Qué bonita equivocación", texto: `Si encontrarte fue casualidad,
qué bonita equivocación,
porque sin buscarte demasiado
terminaste en mi corazón.` },
  { titulo: "Un deseo", texto: `Si pudiera pedir algo al tiempo,
no le pediría que se detuviera,
solo que me regalara más momentos
en los que tú estuvieras cerca.` },
  { titulo: "Sin explicación", texto: `No sé cómo lo haces,
ni qué tienes de especial,
solo sé que entre millones de personas
tú consigues hacerme sonreír de verdad.` },
  { titulo: "Las flores", texto: `Algunas flores nacen para adornar jardines,
otras para perfumar habitaciones,
pero hay algunas que, sin darte cuenta,
terminan floreciendo dentro de nuestros corazones.` }
];

/* Aparece al final, cuando ella ya abrió todas las cartas */
const FRASE_FINAL = {
  titulo: "Para Damaris",
  texto: `«No quiero escribirte mil veces que eres hermosa;
quiero encontrar mil maneras distintas
de explicarte por qué me encantas».`,
  firma: "💗"
};

/* =========================================================
   🎵  CANCIONES
   1. Pon tus .mp3 en la carpeta "musica"
   2. Escribe aquí sus nombres, por ejemplo:
        "musica/cancion1.mp3",
   Suenan una tras otra con el botón ♫ de la esquina.
   ========================================================= */
const CANCIONES = [
  "musica/mezcla.mp3", // "Yo pienso en ti" + "love." (wave to earth), mezcladas
];
