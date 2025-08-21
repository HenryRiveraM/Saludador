// --- Utilidades ---
function titleCase(str) {
  return (str || "")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getHourGreeting(lang) {
  const h = new Date().getHours();
  if (lang === "en") {
    if (h < 12) return "Good morning";
    if (h < 19) return "Good afternoon";
    return "Good evening";
  } else {
    if (h < 12) return "Buenos días";
    if (h < 19) return "Buenas tardes";
    return "Buenas noches";
  }
}

function getCourtesy(lang, genero, edad) {
  if (lang === "en") {
    if (genero === "H") return "Mr.";
    if (genero === "M") return "Ms.";
    if (Number(edad) > 30) return "Mr./Ms.";
    return "";
  } else {
    if (genero === "H") return "Sr.";
    if (genero === "M") return "Sra.";
    if (Number(edad) > 30) return "Sr./Sra.";
    return "";
  }
}

function buildGreeting({ nombre, edad, genero, lang }) {
  const saludoHora = getHourGreeting(lang);
  const cortesía = getCourtesy(lang, genero, edad);
  const nombreFinal = titleCase(nombre || (lang === "en" ? "guest" : "visitante"));
  const coma = ",";
  return `${saludoHora}${coma} ${cortesía ? (cortesía + " ") : ""}${nombreFinal}`;
}

// --- Interfaz ---
const $ = sel => document.querySelector(sel);
const nombreEl = $("#nombre");
const edadEl = $("#edad");
const idiomaEl = $("#idioma");
const mensajeEl = $("#mensaje");
const hintHoraEl = $("#hintHora");
const btn = $("#btnSaludar");

function updateHint() {
  const lang = idiomaEl.value;
  hintHoraEl.textContent = getHourGreeting(lang);
}

function getGeneroSeleccionado() {
  const r = document.querySelector('input[name="genero"]:checked');
  return r ? r.value : "";
}

function saludar() {
  const datos = {
    nombre: nombreEl.value,
    edad: edadEl.value,
    genero: getGeneroSeleccionado(),
    lang: idiomaEl.value
  };
  const saludo = buildGreeting(datos);
  mensajeEl.textContent = saludo;
}

// Eventos
btn.addEventListener("click", saludar);
idiomaEl.addEventListener("change", updateHint);

// Inicialización
updateHint();
mensajeEl.textContent = "";