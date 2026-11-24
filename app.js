/* =========================================================
   Lógica de la cajita. Los poemas y retos están en poemas.js
   ========================================================= */

const EFECTOS = ["ef-latido", "ef-voltear", "ef-desdoblar", "ef-remolino", "ef-burbuja", "ef-cortina",
  "ef-caida", "ef-niebla", "ef-deslizar", "ef-pergamino", "ef-zoom"];

const NOMBRE_RETO = {
  adivinanza: "🔮 Adivinanza", pupiletras: "🔤 Pupiletras", memoria: "🃏 Memoria",
  ordenar: "🧩 Ordena las letras", atrapar: "💗 Atrapa", pregunta: "❓ Pregunta", rompecabezas: "🖼️ Rompecabezas"
};

const STICKERS = ["gato-corazon", "gato-flor", "gato-florecita", "gatos-abrazo", "corazon-rosa", "gatito-ojitos",
  "gatos-mimos", "gato-feliz", "gato-pixel", "frasco-corazones", "botella-amor", "corazon-rojo", "sobre",
  "snoopy", "gatos-novios", "corazon-paisaje", "gatitos-abrazados"];

const $ = (s) => document.querySelector(s);
const caja = $("#caja");
const contCartas = $("#cartas");
const modalCarta = $("#modal");
const papel = $("#papel");
const modalReto = $("#reto");
const retoCuerpo = $("#reto-cuerpo");
const retoMsg = $("#reto-msg");
const capaParticulas = $("#particulas");

const CLAVE = "cartas-damaris-v2";
let abiertas = new Set(leerGuardado());
let cajaAbierta = false;
let indiceSorpresa = 0;
let festejoHecho = abiertas.size === CARTAS.length;

function leerGuardado() { try { return JSON.parse(localStorage.getItem(CLAVE)) || []; } catch (e) { return []; } }
function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify([...abiertas])); } catch (e) {} }
const img = (n) => (n.includes("/") ? n : "img/" + n + (n.includes(".") ? "" : ".png"));
const azar = (a) => a[Math.floor(Math.random() * a.length)];
const mezclar = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const normal = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zñ ]/g, "").trim().replace(/\s+/g, " ");

/* ---------------- Fondo con corazones que suben ---------------- */
function crearFondo() {
  const f = $("#fondo");
  const cosas = ["💗", "🌸", "💕", "✨", "🎀", "💖", "🌷"];
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("span");
    b.className = "burbuja-fondo";
    b.textContent = azar(cosas);
    b.style.left = Math.random() * 100 + "%";
    b.style.setProperty("--t", 16 + Math.random() * 22 + "px");
    b.style.setProperty("--d", 14 + Math.random() * 14 + "s");
    b.style.setProperty("--delay", -Math.random() * 25 + "s");
    f.appendChild(b);
  }
  for (let i = 0; i < 40; i++) {
    const b = document.createElement("div");
    b.className = "brillo";
    b.style.left = Math.random() * 100 + "%";
    b.style.top = Math.random() * 100 + "%";
    b.style.setProperty("--d", 2 + Math.random() * 4 + "s");
    b.style.setProperty("--delay", Math.random() * 5 + "s");
    f.appendChild(b);
  }
}

/* ---------------- La cajita ---------------- */
function abrirCaja() {
  if (cajaAbierta) return;
  cajaAbierta = true;
  caja.classList.add("sacude");
  setTimeout(() => {
    caja.classList.remove("sacude");
    caja.classList.add("abierta");
    const r = caja.getBoundingClientRect();
    explosion(r.left + r.width / 2, r.top + r.height / 3, ["💗", "✨", "🌸", "💖", "⭐", "🎀"], 50, 300);
    $("#subtitulo").textContent = "Gana cada reto para abrir su carta 💌";
    setTimeout(() => {
      caja.classList.add("oculta");
      $("#progreso").classList.add("visible");
      repartirCartas(r);
    }, 700);
  }, 600);
}

function repartirCartas(rectCaja) {
  const cx = rectCaja.left + rectCaja.width / 2, cy = rectCaja.top + rectCaja.height / 2;
  CARTAS.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "carta";
    b.style.setProperty("--r0", Math.random() * 120 - 60 + "deg");
    b.style.setProperty("--r1", Math.random() * 6 - 3 + "deg");
    b.style.setProperty("--delay", i * 0.07 + "s");
    const sticker = c.portada || (c.stickers && c.stickers[0]) || c.imagen || azar(STICKERS);
    b.innerHTML = `
      <span class="carta-tipo"></span>
      <img class="carta-sticker" src="${img(sticker)}" alt="" />
      <span class="carta-num">Carta ${i + 1}</span>
      <span class="candado"></span>`;
    pintarCarta(b, i);
    b.addEventListener("click", () => (abiertas.has(i) ? mostrarCarta(i) : abrirReto(i)));
    b.addEventListener("animationend", () => b.classList.add("lista"), { once: true });
    contCartas.appendChild(b);
  });
  requestAnimationFrame(() => {
    contCartas.querySelectorAll(".carta").forEach((b) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--dx", cx - (r.left + r.width / 2) + "px");
      b.style.setProperty("--dy", cy - (r.top + r.height / 2) + "px");
    });
  });
  actualizarProgreso();
}

function pintarCarta(b, i) {
  const abierta = abiertas.has(i);
  b.classList.toggle("abierta", abierta);
  b.querySelector(".carta-tipo").textContent = abierta ? "💌 Leer otra vez" : NOMBRE_RETO[CARTAS[i].reto?.tipo] || "💌 Abrir";
  b.querySelector(".candado").textContent = abierta ? "💗" : "🔒";
  b.setAttribute("aria-label", (abierta ? "Leer carta " : "Reto de la carta ") + (i + 1));
}

function actualizarProgreso() {
  const n = abiertas.size, t = CARTAS.length, pct = (n / t) * 100;
  $("#barra-relleno").style.width = pct + "%";
  $("#barra-corazon").style.left = pct + "%";
  $("#contador").textContent = n === t
    ? "¡Abriste todas las cartas! 💖 Atrapa las estrellitas y regalitos que caen"
    : `${n} de ${t} cartas abiertas · toca las estrellitas que caen ⭐`;
}

/* ---------------- Retos ---------------- */
let retoActual = null;

function abrirReto(i) {
  const reto = CARTAS[i].reto;
  if (!reto) return ganar(i);
  retoActual = i;
  $("#reto-etiqueta").textContent = NOMBRE_RETO[reto.tipo] || "Reto";
  $("#reto-titulo").textContent = "Reto de la carta " + (i + 1);
  retoCuerpo.innerHTML = "";
  mensaje("");
  const caja = modalReto.querySelector(".reto-caja");
  caja.classList.remove("cierra");
  void caja.offsetWidth;
  abrirModal(modalReto);
  const juegos = { adivinanza, pupiletras, memoria, ordenar, atrapar, pregunta, rompecabezas };
  (juegos[reto.tipo] || adivinanza)(reto, () => ganar(i));
}

function mensaje(t, error) {
  retoMsg.textContent = t;
  retoMsg.classList.remove("error");
  if (error) { void retoMsg.offsetWidth; retoMsg.classList.add("error"); }
}

function ganar(i) {
  if (retoActual !== i && retoActual !== null) return;
  retoActual = null;
  const r = modalReto.querySelector(".reto-caja").getBoundingClientRect();
  explosion(r.left + r.width / 2, r.top + r.height / 2, ["💖", "✨", "🎉", "💗", "🌸"], 40, 320);
  setTimeout(() => {
    cerrarModal(modalReto, () => {
      abiertas.add(i);
      guardar();
      const b = contCartas.children[i];
      if (b) { pintarCarta(b, i); b.classList.add("desbloqueando"); setTimeout(() => b.classList.remove("desbloqueando"), 900); }
      actualizarProgreso();
      mostrarCarta(i);
    });
  }, 900);
}

function el(tag, clase, html) { const e = document.createElement(tag); if (clase) e.className = clase; if (html != null) e.innerHTML = html; return e; }

/* 🔮 Adivinanza */
function adivinanza(reto, listo) {
  retoCuerpo.append(el("p", "reto-pregunta", reto.pregunta));
  const input = el("input", "entrada");
  input.placeholder = "Escribe tu respuesta…";
  const fila = el("div", "fila");
  const btn = el("button", "btn", "Responder 💌");
  const pista = el("button", "btn suave", "Pista 🤫");
  fila.append(btn, pista);
  retoCuerpo.append(input, fila);
  const validas = (reto.respuestas || []).map(normal);
  let intentos = 0;
  const comprobar = () => {
    if (validas.includes(normal(input.value))) { mensaje("¡Correcto! 💖"); btn.disabled = true; listo(); }
    else { intentos++; mensaje(intentos > 1 && reto.pista ? "Casi… pista: " + reto.pista : "Mmm, no es eso. Intenta otra vez 🙈", true); }
  };
  btn.onclick = comprobar;
  input.onkeydown = (e) => { if (e.key === "Enter") comprobar(); };
  pista.onclick = () => mensaje(reto.pista || "¡Tú puedes!");
  setTimeout(() => input.focus(), 300);
}

/* 🔤 Pupiletras */
function pupiletras(reto, listo) {
  const palabras = reto.palabras.map((p) => normal(p).toUpperCase().replace(/ /g, ""));
  const n = Math.max(8, ...palabras.map((p) => p.length + 1));
  const grid = crearSopa(palabras, n);
  const lista = el("div", "palabras");
  palabras.forEach((p) => { const s = el("span", "", p); s.dataset.p = p; lista.append(s); });
  const sopa = el("div", "sopa");
  sopa.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  const celdas = [];
  for (let f = 0; f < n; f++) for (let c = 0; c < n; c++) {
    const b = el("button", "", grid[f][c]);
    b.dataset.f = f; b.dataset.c = c;
    sopa.append(b); celdas.push(b);
  }
  retoCuerpo.append(el("p", "reto-texto", "Encuentra las palabras: toca la <b>primera</b> y la <b>última</b> letra de cada una."), lista, sopa);
  let inicio = null;
  const halladas = new Set();
  sopa.onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (!inicio) { inicio = b; b.classList.add("sel"); return; }
    const f1 = +inicio.dataset.f, c1 = +inicio.dataset.c, f2 = +b.dataset.f, c2 = +b.dataset.c;
    inicio.classList.remove("sel");
    const df = Math.sign(f2 - f1), dc = Math.sign(c2 - c1);
    const largo = Math.max(Math.abs(f2 - f1), Math.abs(c2 - c1)) + 1;
    const recta = f1 === f2 || c1 === c2 || Math.abs(f2 - f1) === Math.abs(c2 - c1);
    inicio = null;
    if (largo < 2) return; // tocó la misma letra: se deselecciona
    if (!recta) { inicio = b; b.classList.add("sel"); return; }
    let txt = "", camino = [];
    for (let k = 0; k < largo; k++) { const f = f1 + df * k, c = c1 + dc * k; txt += grid[f][c]; camino.push(celdas[f * n + c]); }
    const rev = [...txt].reverse().join("");
    const p = palabras.find((w) => (w === txt || w === rev) && !halladas.has(w));
    if (p) {
      halladas.add(p);
      camino.forEach((x) => x.classList.add("hallada"));
      lista.querySelector(`[data-p="${p}"]`).classList.add("ok");
      mensaje(`¡Encontraste ${p}! 💗`);
      if (halladas.size === palabras.length) { mensaje("¡Todas encontradas! 🎉"); listo(); }
    } else mensaje("Esa no es… sigue buscando 👀", true);
  };
}

function crearSopa(palabras, n) {
  for (let intento = 0; intento < 200; intento++) {
    const g = Array.from({ length: n }, () => Array(n).fill(""));
    const dirs = [[0, 1], [1, 0], [1, 1], [0, 1], [1, 0]];
    let ok = true;
    for (const p of [...palabras].sort((a, b) => b.length - a.length)) {
      let puesto = false;
      for (let t = 0; t < 150 && !puesto; t++) {
        const [df, dc] = azar(dirs);
        const f0 = Math.floor(Math.random() * (n - df * (p.length - 1)));
        const c0 = Math.floor(Math.random() * (n - dc * (p.length - 1)));
        let cabe = true;
        for (let k = 0; k < p.length; k++) { const v = g[f0 + df * k][c0 + dc * k]; if (v && v !== p[k]) { cabe = false; break; } }
        if (cabe) { for (let k = 0; k < p.length; k++) g[f0 + df * k][c0 + dc * k] = p[k]; puesto = true; }
      }
      if (!puesto) { ok = false; break; }
    }
    if (!ok) continue;
    const abc = "ABCDEFGHIJLMNOPRSTUVZ";
    return g.map((fila) => fila.map((v) => v || abc[Math.floor(Math.random() * abc.length)]));
  }
}

/* 🃏 Memoria */
function memoria(reto, listo) {
  const elegidos = mezclar(reto.stickers || STICKERS).slice(0, 6);
  const fichas = mezclar([...elegidos, ...elegidos]);
  retoCuerpo.append(el("p", "reto-texto", "Encuentra las parejas de stickers 🐱"));
  const g = el("div", "memoria");
  let abiertas2 = [], pares = 0, bloqueo = false;
  fichas.forEach((s) => {
    const b = el("button", "ficha", `<div class="dorso">💗</div><div class="cara"><img src="${img(s)}" alt="" /></div>`);
    b.dataset.s = s;
    b.onclick = () => {
      if (bloqueo || b.classList.contains("vuelta") || b.classList.contains("par")) return;
      b.classList.add("vuelta"); abiertas2.push(b);
      if (abiertas2.length === 2) {
        const [a, c] = abiertas2; abiertas2 = [];
        if (a.dataset.s === c.dataset.s) {
          a.classList.add("par"); c.classList.add("par"); pares++;
          mensaje(pares === 6 ? "¡Memoria perfecta! 🎉" : "¡Pareja! 💗");
          if (pares === 6) listo();
        } else { bloqueo = true; setTimeout(() => { a.classList.remove("vuelta"); c.classList.remove("vuelta"); bloqueo = false; }, 750); }
      }
    };
    g.append(b);
  });
  retoCuerpo.append(g);
}

/* 🧩 Ordenar letras */
function ordenar(reto, listo) {
  const palabra = normal(reto.palabra).toUpperCase().replace(/ /g, "");
  let letras;
  do { letras = mezclar([...palabra]); } while (letras.join("") === palabra && palabra.length > 1);
  if (reto.pista) retoCuerpo.append(el("p", "reto-pregunta", "Pista: " + reto.pista));
  const resp = el("div", "respuesta-ordenar"), pool = el("div", "letras-ordenar");
  const fila = el("div", "fila"), borrar = el("button", "btn suave", "Borrar ↺");
  fila.append(borrar);
  retoCuerpo.append(el("p", "reto-texto", "Toca las letras en el orden correcto"), resp, pool, fila);
  const botones = letras.map((l) => { const b = el("button", "ficha-letra", l); pool.append(b); return b; });
  let puestas = [];
  const pintar = () => {
    resp.innerHTML = "";
    puestas.forEach((b) => resp.append(el("button", "ficha-letra puesta", b.textContent)));
    botones.forEach((b) => (b.style.visibility = puestas.includes(b) ? "hidden" : "visible"));
  };
  botones.forEach((b) => (b.onclick = () => {
    puestas.push(b); pintar();
    if (puestas.length === palabra.length) {
      if (puestas.map((x) => x.textContent).join("") === palabra) { mensaje(`¡${palabra}! Correcto 💖`); listo(); }
      else { mensaje("Casi… prueba otro orden 🙈", true); setTimeout(() => { puestas = []; pintar(); }, 700); }
    }
  }));
  resp.onclick = (e) => { const i = [...resp.children].indexOf(e.target); if (i >= 0) { puestas.splice(i, 1); pintar(); } };
  borrar.onclick = () => { puestas = []; pintar(); };
}

/* 💗 Atrapar */
function atrapar(reto, listo) {
  const total = reto.cantidad || 8;
  retoCuerpo.append(el("p", "reto-texto", reto.texto || `Atrapa ${total} corazones`));
  const zona = el("div", "zona-atrapar");
  retoCuerpo.append(zona);
  let n = 0;
  mensaje(`0 / ${total}`);
  for (let k = 0; k < total; k++) {
    const b = el("button", "atrapable", reto.simbolo || "💗");
    b.style.left = 5 + Math.random() * 75 + "%";
    b.style.top = 5 + Math.random() * 70 + "%";
    b.style.setProperty("--x", Math.random() * 160 - 80 + "px");
    b.style.setProperty("--y", Math.random() * 160 - 80 + "px");
    b.style.setProperty("--d", 0.9 + Math.random() * 1.2 + "s");
    b.onclick = () => {
      b.classList.add("pum"); n++;
      const r = b.getBoundingClientRect();
      explosion(r.left + r.width / 2, r.top + r.height / 2, ["✨", reto.simbolo || "💗"], 8, 70);
      mensaje(`${n} / ${total}`);
      if (n === total) { mensaje("¡Los atrapaste todos! 🎉"); listo(); }
    };
    zona.append(b);
  }
}

/* ❓ Pregunta */
function pregunta(reto, listo) {
  retoCuerpo.append(el("p", "reto-pregunta", reto.pregunta));
  const ops = el("div", "opciones");
  let hecho = false;
  reto.opciones.forEach((o, k) => {
    const b = el("button", "opcion", o);
    b.onclick = () => {
      if (hecho) return;
      if (!reto.correctas || reto.correctas.includes(k)) {
        hecho = true; b.classList.add("bien"); mensaje(reto.mensaje || "¡Correcto! 💖"); listo();
      } else { b.classList.remove("mal"); void b.offsetWidth; b.classList.add("mal"); mensaje(reto.error || "Mmm… no 🙈", true); }
    };
    ops.append(b);
  });
  retoCuerpo.append(ops);
}

/* 🖼️ Rompecabezas */
function rompecabezas(reto, listo) {
  retoCuerpo.append(el("p", "reto-texto", (reto.texto || "Arma la imagen") + ": toca dos piezas para cambiarlas de lugar."));
  const p = el("div", "puzzle");
  let orden;
  do { orden = mezclar([0, 1, 2, 3, 4, 5, 6, 7, 8]); } while (orden.every((v, k) => v === k));
  let sel = null, terminado = false;
  const pintar = () => {
    p.innerHTML = "";
    orden.forEach((v, pos) => {
      const b = el("button", "pieza");
      b.style.backgroundImage = `url("${reto.imagen}")`;
      b.style.backgroundPosition = `${(v % 3) * 50}% ${Math.floor(v / 3) * 50}%`;
      if (sel === pos) b.classList.add("sel");
      b.onclick = () => {
        if (terminado) return;
        if (sel === null) { sel = pos; pintar(); return; }
        [orden[sel], orden[pos]] = [orden[pos], orden[sel]]; sel = null; pintar();
        if (orden.every((x, k) => x === k)) { terminado = true; p.classList.add("listo"); mensaje("¡Imagen completa! 💖"); listo(); }
      };
      p.append(b);
    });
  };
  pintar();
  const ayuda = el("img", "ayuda-img"); ayuda.src = reto.imagen; ayuda.alt = "";
  retoCuerpo.append(p, el("p", "reto-texto", "<small>Así debe quedar:</small>"), ayuda);
}

/* ---------------- Mostrar una carta ---------------- */
function mostrarCarta(i) {
  const c = CARTAS[i];
  pintarPapel(c, EFECTOS[i % EFECTOS.length]);
  if (c.cancion) tocarCancion(c.cancion);
}

function pintarPapel(c, efecto, extra) {
  const tipo = c.papel || "rosa";
  papel.className = "papel";
  void papel.offsetWidth;
  papel.classList.add(tipo, efecto);
  if (extra) papel.classList.add(extra);
  modalCarta.scrollTop = 0;

  const deco = $("#papel-stickers");
  deco.innerHTML = "";
  if (tipo === "marco") deco.innerHTML = `<img class="marco-burbuja" src="img/marco-burbuja.png" alt=""><img class="marco-gato" src="img/marco-gato-rosa.png" alt="">`;
  if (tipo === "cuaderno") deco.innerHTML = `<img class="cuaderno-estrellas" src="img/estrellas-rojas.png" alt=""><img class="cuaderno-estrellas abajo" src="img/estrellas-rojas.png" alt=""><img class="cuaderno-gatitos" src="img/cuaderno-gatitos.png" alt="">`;
  (c.stickers || []).slice(0, 2).forEach((s, k) => {
    const im = el("img", "st st-" + k); im.src = img(s); im.alt = ""; deco.append(im);
  });

  const foto = $("#papel-imagen");
  foto.className = "papel-imagen";
  if (c.imagen) {
    foto.src = img(c.imagen);
    foto.classList.add("visible", /\.jpe?g$/i.test(c.imagen) ? "foto" : "dibujo");
  } else foto.removeAttribute("src");

  $("#papel-titulo").textContent = c.titulo || "";
  $("#papel-firma").textContent = c.firma || "";
  const texto = $("#papel-texto");
  texto.innerHTML = "";
  (c.texto || "").trim().split("\n").forEach((l, n) => {
    const s = el("span", "linea" + (l.trim() ? "" : " vacia"));
    s.textContent = l;
    s.style.animationDelay = 0.6 + n * 0.12 + "s";
    texto.append(s);
  });

  abrirModal(modalCarta);
  setTimeout(() => {
    const r = papel.getBoundingClientRect();
    explosion(r.left + r.width / 2, r.top + Math.min(r.height, innerHeight) / 2, ["💗", "✨", "🌸", "💕"], 30, 340);
  }, 500);
}

/* ---------------- Modales ---------------- */
function abrirModal(m) { m.classList.add("visible"); m.setAttribute("aria-hidden", "false"); }
function cerrarModal(m, despues) {
  if (!m.classList.contains("visible")) return;
  const caja = m.querySelector(".papel, .reto-caja");
  caja.classList.add("cierra");
  setTimeout(() => {
    m.classList.remove("visible"); m.setAttribute("aria-hidden", "true");
    caja.classList.remove("cierra");
    if (m === modalReto) retoActual = null;
    if (despues) despues();
    else if (m === modalCarta && abiertas.size === CARTAS.length && !festejoHecho) { festejoHecho = true; festejo(); }
  }, 300);
}
document.querySelectorAll("[data-cerrar]").forEach((b) => (b.onclick = () => cerrarModal(b.closest(".modal"))));
document.querySelectorAll(".modal-fondo").forEach((f) => (f.onclick = () => cerrarModal(f.closest(".modal"))));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".modal.visible").forEach((m) => cerrarModal(m)); });

function festejo() {
  for (let k = 0; k < 7; k++) setTimeout(() => explosion(Math.random() * innerWidth, Math.random() * innerHeight * 0.7, ["💖", "💗", "✨", "🌸", "🎀", "🎉"], 28, 320), k * 260);
  if (typeof FRASE_FINAL !== "undefined") setTimeout(() => pintarPapel({ ...FRASE_FINAL, papel: "marco", stickers: ["gatos-novios"] }, "ef-zoom", "final"), 1800);
}

/* ---------------- Cosas que caen del cielo ---------------- */
const CAEN = ["img:corazon-rosa", "img:sobre", "⭐", "img:frasco-corazones", "🎁", "img:corazon-rojo", "🌟", "img:botella-amor", "⭐"];

function soltarAlgo() {
  if (document.hidden) return;
  const tipo = azar(CAEN);
  const d = el("div", "cae");
  const t = 42 + Math.random() * 22;
  d.innerHTML = tipo.startsWith("img:") ? `<img src="${img(tipo.slice(4))}" alt="" draggable="false">` : `<span class="emoji">${tipo}</span>`;
  d.style.left = 3 + Math.random() * 88 + "vw";
  d.style.setProperty("--t", t + "px");
  d.style.setProperty("--dur", 9 + Math.random() * 6 + "s");
  d.addEventListener("animationend", (e) => { if (e.target === d) d.remove(); });
  d.addEventListener("pointerdown", (e) => { e.preventDefault(); atraparSorpresa(d); });
  $("#cielo").appendChild(d);
}

function atraparSorpresa(d) {
  const r = d.getBoundingClientRect();
  d.remove();
  explosion(r.left + r.width / 2, r.top + r.height / 2, ["✨", "⭐", "💗", "🌸"], 22, 170);
  if (!SORPRESAS.length || modalCarta.classList.contains("visible") || modalReto.classList.contains("visible")) return;
  const s = SORPRESAS[indiceSorpresa % SORPRESAS.length];
  indiceSorpresa++;
  setTimeout(() => pintarPapel({ papel: "rosa", stickers: [azar(STICKERS)], ...s }, azar(EFECTOS)), 250);
}

/* ---------------- Partículas ---------------- */
function explosion(x, y, simbolos, cantidad = 24, alcance = 220) {
  for (let k = 0; k < cantidad; k++) {
    const p = el("span", "particula", azar(simbolos));
    const ang = Math.random() * Math.PI * 2, dist = alcance * (0.35 + Math.random() * 0.65);
    p.style.left = x + "px"; p.style.top = y + "px";
    p.style.setProperty("--x", Math.cos(ang) * dist + "px");
    p.style.setProperty("--y", Math.sin(ang) * dist + "px");
    p.style.setProperty("--rot", Math.random() * 360 - 180 + "deg");
    p.style.setProperty("--t", 14 + Math.random() * 18 + "px");
    p.style.setProperty("--dur", 1 + Math.random() * 0.9 + "s");
    p.addEventListener("animationend", () => p.remove());
    capaParticulas.appendChild(p);
  }
}

/* ---------------- Música ---------------- */
const audio = new Audio();
const botonMusica = $("#musica");
let pista = 0;
function tocarCancion(src) { audio.src = src; audio.play().catch(() => {}); botonMusica.classList.add("sonando"); }
audio.addEventListener("ended", () => { if (CANCIONES.length) { pista = (pista + 1) % CANCIONES.length; tocarCancion(CANCIONES[pista]); } });
if (typeof CANCIONES === "undefined" || !CANCIONES.length) botonMusica.style.display = "none";
else {
  botonMusica.onclick = () => {
    if (audio.paused) { if (!audio.src) audio.src = CANCIONES[0]; audio.play().catch(() => {}); botonMusica.classList.add("sonando"); }
    else { audio.pause(); botonMusica.classList.remove("sonando"); }
  };
  caja.addEventListener("click", () => { if (!audio.src) tocarCancion(CANCIONES[0]); }, { once: true });
}

/* ---------------- Inicio ---------------- */
caja.addEventListener("click", abrirCaja);
caja.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirCaja(); } });
crearFondo();
soltarAlgo();
setInterval(soltarAlgo, 1400);
