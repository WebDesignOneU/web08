/**
 * Web08 - Main Application Controller
 * Handles Navigation, Filtering, Search, Themes, Code Modal & Lifecycle
 */

const codeSnippets = {
  anime: `// Anime.js - Animación con Staggering en Grid
anime({
  targets: '.anime-box',
  scale: [
    { value: 0.1, easing: 'easeOutSine', duration: 400 },
    { value: 1, easing: 'easeInOutQuad', duration: 800 }
  ],
  rotate: () => anime.random(-180, 180),
  borderRadius: () => ['10%', anime.random(20, 50) + '%'],
  backgroundColor: (el, i) => \`hsl(\${(i * 12 + 190) % 360}, 85%, 60%)\`,
  delay: anime.stagger(60, { grid: [7, 4], from: 'center' })
});`,

  chart: `// Chart.js - Creación de Gráfica Reactiva
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Rendimiento API (ms)',
      data: [45, 62, 78, 55, 89, 104, 120],
      borderColor: '#6366f1',
      tension: 0.35,
      fill: true
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});`,

  axios: `// Axios - Petición HTTP con Async/Await y headers
const fetchEndpoint = async () => {
  try {
    const res = await axios.get('https://api.ejemplo.com/recursos', {
      headers: { 'Accept': 'application/json' },
      timeout: 5000
    });
    console.log('Status:', res.status);
    console.log('Data:', res.data);
  } catch (error) {
    console.error('Error Axios:', error.message);
  }
};`,

  validator: `// Validator.js - Validación y Sanitización segura
const emailValido = validator.isEmail(inputEmail);
const passSegura = validator.isStrongPassword(inputPass, {
  minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
});
const urlValida = validator.isURL(inputUrl, { protocols: ['https'] });

// Sanitizar contenido previniendo inyecciones XSS
const textoSeguro = validator.escape(userInput);`,

  datatables: `// DataTables.js - Tabla interactiva con renderers personalizados
$('#tabla-ejemplo').DataTable({
  data: dataset,
  columns: [
    { data: 'nombre' },
    { data: 'rol' },
    { 
      data: 'salario',
      render: val => \`$\${val} USD\`
    }
  ],
  pageLength: 5,
  responsive: true
});`,

  leaflet: `// Leaflet - Inicialización de mapa interactivo con OpenStreetMap / CartoDB
const map = L.map('mapa').setView([-33.4372, -70.6506], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; CARTO',
  maxZoom: 19
}).addTo(map);

const marker = L.marker([-33.4372, -70.6506]).addTo(map);
marker.bindPopup('<b>Nodo Central</b><br>Santiago de Chile').openPopup();`,

  gsap: `// GSAP - Timeline compleja con Transformaciones 3D y Stagger
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to('.gsap-card', {
  duration: 1,
  y: -25,
  rotationY: 180,
  scale: 1.1,
  stagger: 0.15,
  ease: 'power2.inOut'
}).to('.gsap-card', {
  duration: 0.8,
  rotationX: 360,
  stagger: 0.1,
  ease: 'back.out(1.7)'
});`,

  aos: `// AOS - Animate On Scroll Initialization
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: false
});

// En el markup HTML:
// <div data-aos="fade-up" data-aos-delay="200">Tarjeta</div>
// <div data-aos="flip-left">Elemento 3D</div>`,

  dayjs: `// Day.js - Manipulación y formato de fechas con i18n
dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('es');

const ahora = dayjs();
const relativo = ahora.subtract(2, 'hour').fromNow(); // "hace 2 horas"
const formato = ahora.format('dddd, D [de] MMMM [de] YYYY');
const diasFinDeAno = dayjs().endOf('year').diff(ahora, 'day');`,

  lodash: `// Lodash - Operaciones funcionales avanzadas
// 1. Agrupar por categoría:
const agrupado = _.groupBy(usuarios, 'departamento');

// 2. Ordenar descendentemente:
const ordenado = _.orderBy(usuarios, ['salario'], ['desc']);

// 3. Dividir en lotes (chunks):
const lotes = _.chunk(usuarios, 3);

// 4. Debounce para optimizar búsquedas:
const buscarOptimo = _.debounce(query => enviarApi(query), 350);`,

  flowbite: `// Flowbite - Componentes interactivos basados en Tailwind
// Apertura de modal / drawer programática
const modal = document.getElementById('mi-modal');
modal.classList.remove('hidden');
modal.classList.add('flex');

// Soporte nativo para tooltips, tabs, dropdowns y colapsables`,

  d3: `// D3.js - Simulación de Fuerzas Físicas (Force-Directed Graph)
const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(60))
  .force('charge', d3.forceManyBody().strength(-120))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .on('tick', () => {
    link
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => \`translate(\${d.x},\${d.y})\`);
  });`,

  phaser: `// Phaser.js - Escena de Arcade Mini-Game con Físicas
class GameScene extends Phaser.Scene {
  create() {
    this.player = this.physics.add.sprite(180, 195, 'playerShip');
    this.gems = this.physics.add.group();
    
    this.physics.add.overlap(this.player, this.gems, (p, gem) => {
      this.score += 10;
      gem.y = 0;
    });
  }
  update() {
    if (this.cursors.left.isDown) this.player.setVelocityX(-180);
    else if (this.cursors.right.isDown) this.player.setVelocityX(180);
  }
}`,

  konva: `// Konva.js - Canvas 2D con Transformador Interactivo (Resize & Rotate)
const stage = new Konva.Stage({ container: 'canvas-box', width: 360, height: 230 });
const layer = new Konva.Layer();
stage.add(layer);

const tr = new Konva.Transformer();
layer.add(tr);

const rect = new Konva.Rect({
  x: 50, y: 50, width: 80, height: 60,
  fill: '#6366f1', draggable: true, cornerRadius: 8
});
layer.add(rect);

stage.on('click', e => {
  if (e.target === stage) tr.nodes([]);
  else tr.nodes([e.target]);
});`
};

// Toast notification helper
function showToast(message, icon = 'ri-check-line') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${icon}" style="color:#10b981;font-size:1.1rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Code Modal Controller
function setupCodeModal() {
  const modal = document.getElementById('code-modal');
  const modalCode = document.getElementById('modal-code-snippet');
  const modalTitle = document.getElementById('modal-code-title');
  const btnClose = document.getElementById('modal-close-btn');
  const btnCopy = document.getElementById('modal-copy-btn');

  let activeSnippet = '';

  document.querySelectorAll('.btn-inspect-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const libKey = btn.dataset.lib;
      const libName = btn.dataset.name || libKey;
      activeSnippet = codeSnippets[libKey] || '// Código no disponible';
      
      if (modalTitle) modalTitle.innerHTML = `<i class="ri-code-s-slash-line" style="color:var(--primary)"></i> Código: ${libName}`;
      if (modalCode) modalCode.textContent = activeSnippet;
      
      if (modal) modal.classList.add('open');
    });
  });

  if (btnClose && modal) {
    btnClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(activeSnippet).then(() => {
        showToast('¡Código copiado al portapapeles!');
      }).catch(() => {
        showToast('Error al copiar el código', 'ri-error-warning-line');
      });
    });
  }
}

// Filter and Search System
function setupFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card-lib');
  const searchInput = document.getElementById('search-input');

  let currentLevel = 'all';
  let searchQuery = '';

  function applyFilter() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cardLevel = card.dataset.level;
      const cardText = card.textContent.toLowerCase();

      const matchesLevel = (currentLevel === 'all') || (cardLevel === currentLevel);
      const matchesSearch = !searchQuery || cardText.includes(searchQuery);

      if (matchesLevel && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const activeCountEl = document.getElementById('active-count');
    if (activeCountEl) activeCountEl.textContent = visibleCount;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.dataset.level;
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilter();
    });
  }
}

// Theme Switcher (Dark / Light)
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentSaved = localStorage.getItem('web08-theme') || 'dark';
  if (currentSaved === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('web08-theme', isLight ? 'light' : 'dark');
    toggleBtn.innerHTML = isLight ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
    showToast(`Modo ${isLight ? 'Claro' : 'Oscuro'} activado`);
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupFilterAndSearch();
  setupCodeModal();

  if (window.initBasicDemos) window.initBasicDemos();
  if (window.initIntermediateDemos) window.initIntermediateDemos();
  if (window.initAdvancedDemos) window.initAdvancedDemos();

  console.log('⚡ Web08 Showcase Inicializado con éxito con las 14 librerías');
});
