/* SNACKS POINT — INTERACCIONES
   Este archivo conserva la lógica del HTML que compartiste.
   Busca los títulos numerados para encontrar cada función.
   Los comentarios explican qué puedes ajustar; consulta también LEEME.md.
*/

// 01. UTILIDAD: limita un número entre un mínimo y un máximo.
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

// 02. ELEMENTOS DE LA EXPERIENCIA DE INICIO
// Estos nombres corresponden a clases e identificadores de index.html.
const story = document.querySelector('.scroll-story'),
  isoEl = document.getElementById('iso'),
  frontEl = document.getElementById('front'),
  copy = document.getElementById('storyCopy'),
  consoleWrap = document.getElementById('consoleWrap'),
  quick = document.getElementById('quick');

// 03. TRANSICIÓN Y ZOOM CON EL DESPLAZAMIENTO DE LA PÁGINA
function updateStory() {
  const r = story.getBoundingClientRect();
  const max = story.offsetHeight - innerHeight;
  // p representa el recorrido: 0 = inicio; 1 = final de la experiencia.
  const p = clamp(-r.top / max, 0, 1);

  // Cambio gradual entre las imágenes: empieza al 16% y dura un 26%.
  // En el archivo original, ambas imágenes de la máquina son idénticas.
  const fade = clamp((p - .16) / .26, 0, 1);
  isoEl.style.opacity = 1 - fade;
  frontEl.style.opacity = fade;

  // Perspectiva de la primera imagen.
  const isoScale = 1 + p * .16;
  isoEl.style.transform = `translate(-50%,-50%) rotateY(${-16+16*p}deg) rotateX(${3-3*p}deg) scale(${isoScale})`;

  // Zoom frontal: empieza al 42% y dura otro 42% del recorrido.
  let z = clamp((p - .42) / .42, 0, 1);
  // Escala final = 1 + 3.35 = 4.35 veces el tamaño inicial.
  let s = 1 + z * 3.35;
  // Desplazamientos horizontal (vw) y vertical (vh).
  let tx = -z * 33;
  let ty = z * 24;
  frontEl.style.transform = `translate(calc(-50% + ${tx}vw),calc(-50% + ${ty}vh)) scale(${s})`;

  // Desvanecimiento del texto de bienvenida.
  copy.style.opacity = String(clamp(1 - (p - .22) / .22, 0, 1));
  copy.style.transform = `translateY(${-p*30}px)`;

  // El menú aparece desde el 78% del recorrido y tarda un 15% en mostrarse.
  const c = clamp((p - .78) / .15, 0, 1);
  consoleWrap.style.opacity = c;
  consoleWrap.style.transform = `translate(-50%,-50%) scale(${.88+.12*c})`;
  consoleWrap.style.pointerEvents = c > .75 ? 'auto' : 'none';
  consoleWrap.setAttribute('aria-hidden', c > .75 ? 'false' : 'true');
  quick.style.opacity = c > .8 ? 1 : 0;
  quick.style.pointerEvents = c > .8 ? 'auto' : 'none';
}

addEventListener('scroll', updateStory, { passive: true });
addEventListener('resize', updateStory);
updateStory();

// 04. BOTONES DEL PANEL
// data-go en el botón debe coincidir con el id de la sección de destino.
document.querySelectorAll('.key').forEach(btn =>
  btn.addEventListener('click', () =>
    document.getElementById(btn.dataset.go)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  )
);

// 05. BUSCADOR DEL CATÁLOGO
// El texto que se busca viene del atributo data-name de cada producto.
const q = document.getElementById('productSearch'),
  products = [...document.querySelectorAll('.product')],
  count = document.getElementById('productCount');

q.addEventListener('input', () => {
  const s = q.value.trim().toLowerCase();
  let n = 0;
  products.forEach(p => {
    const hit = p.dataset.name.includes(s);
    p.classList.toggle('hidden', !hit);
    if (hit) n++
  });
  count.textContent = `${n} producto${n===1?'':'s'}`;
});

// 06. SIMULADOR COMERCIAL — PRIMER AÑO
const range = document.getElementById('salesRange'),
  salesLabel = document.getElementById('salesLabel'),
  commissionResult = document.getElementById('commissionResult'),
  mixedResult = document.getElementById('mixedResult');

const money = n => new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0
}).format(n);

function calc() {
  const v = +range.value;
  salesLabel.textContent = money(v);
  // .20 significa 20% de las ventas mensuales estimadas.
  commissionResult.textContent = money(v * .20);
  // Modelo mixto: 3,000 pesos de renta base más 10% de las ventas.
  mixedResult.textContent = money(3000 + v * .10)
}

range.addEventListener('input', calc);
calc();

// 07. APARICIÓN DE LAS SECCIONES AL ENTRAR EN PANTALLA
const io = new IntersectionObserver(
  es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)),
  { threshold: .12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
