/**
 * Web08 - Demos Nivel Básico:
 * 1. Anime.js
 * 2. Chart.js
 * 3. Axios
 * 4. Validator.js
 * 5. DataTables.js
 * 6. Leaflet
 */

// 1. Anime.js Interactive Playground
let animeInstance = null;
function initAnimeDemo() {
  const container = document.getElementById('anime-grid');
  if (!container) return;

  container.innerHTML = '';
  const totalBoxes = 28;
  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement('div');
    box.className = 'anime-box';
    box.dataset.index = i;
    container.appendChild(box);
  }

  function playStaggerAnimation(direction = 'normal') {
    if (animeInstance) animeInstance.pause();
    animeInstance = anime({
      targets: '.anime-box',
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 400 },
        { value: 1, easing: 'easeInOutQuad', duration: 800 }
      ],
      rotate: function() { return anime.random(-180, 180); },
      borderRadius: function() { return ['10%', anime.random(20, 50) + '%']; },
      backgroundColor: function(el, i) {
        const hue = (i * 12 + 190) % 360;
        return `hsl(${hue}, 85%, 60%)`;
      },
      delay: anime.stagger(60, { grid: [7, 4], from: 'center', direction }),
      loop: false
    });
  }

  playStaggerAnimation();

  document.getElementById('btn-anime-play')?.addEventListener('click', () => playStaggerAnimation('normal'));
  document.getElementById('btn-anime-reverse')?.addEventListener('click', () => playStaggerAnimation('reverse'));
  document.getElementById('btn-anime-wave')?.addEventListener('click', () => {
    animeInstance = anime({
      targets: '.anime-box',
      translateY: [
        { value: -30, duration: 400, easing: 'easeInOutSine' },
        { value: 0, duration: 400, easing: 'easeInOutSine' }
      ],
      delay: anime.stagger(50, { from: 'first' }),
      loop: false
    });
  });
}

// 2. Chart.js Interactive Dashboard
let currentChart = null;
function initChartDemo() {
  const ctx = document.getElementById('chart-canvas');
  if (!ctx) return;

  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];
  const initialData = [45, 62, 78, 55, 89, 104, 120];

  function createChart(type = 'line') {
    if (currentChart) currentChart.destroy();

    const isLight = document.body.classList.contains('light-theme');
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
    const textColor = isLight ? '#475569' : '#94a3b8';

    currentChart = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rendimiento API (ms)',
            data: initialData.slice(),
            borderColor: '#6366f1',
            backgroundColor: type === 'line' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.65)',
            borderWidth: 2.5,
            tension: 0.35,
            fill: type === 'line',
            pointBackgroundColor: '#ec4899',
            pointRadius: 4
          },
          {
            label: 'Tráfico de Usuarios (k)',
            data: [30, 48, 55, 60, 72, 85, 95],
            borderColor: '#06b6d4',
            backgroundColor: type === 'line' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.6)',
            borderWidth: 2,
            tension: 0.35,
            fill: type === 'line'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } }
          }
        },
        scales: type === 'radar' || type === 'doughnut' ? {} : {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          }
        }
      }
    });
  }

  createChart('line');

  document.getElementById('btn-chart-type')?.addEventListener('change', (e) => {
    createChart(e.target.value);
  });

  document.getElementById('btn-chart-random')?.addEventListener('click', () => {
    if (!currentChart) return;
    currentChart.data.datasets.forEach(ds => {
      ds.data = ds.data.map(() => Math.floor(Math.random() * 100) + 20);
    });
    currentChart.update();
  });
}

// 3. Axios Playground
function initAxiosDemo() {
  const consoleEl = document.getElementById('axios-response');
  const btnFetch = document.getElementById('btn-axios-fetch');
  const endpointSelect = document.getElementById('axios-endpoint');
  const latencyBadge = document.getElementById('axios-latency');

  if (!btnFetch || !consoleEl) return;

  async function executeRequest() {
    const endpoint = endpointSelect.value;
    consoleEl.textContent = 'Enviando petición HTTP con Axios...\n';
    if (latencyBadge) latencyBadge.textContent = 'Cargando...';

    const startTime = performance.now();
    try {
      let response;
      if (endpoint === 'users') {
        response = await axios.get('assets/sample-data.json');
      } else if (endpoint === 'posts') {
        response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
      } else if (endpoint === 'post_item') {
        response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: 'Nuevo recurso creado con Axios',
          body: 'Demostración de Axios POST en Web08',
          userId: 101
        });
      }

      const elapsed = Math.round(performance.now() - startTime);
      if (latencyBadge) latencyBadge.textContent = `${elapsed} ms (HTTP ${response.status})`;

      consoleEl.textContent = JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: {
          'content-type': response.headers['content-type'] || 'application/json',
        },
        data: response.data
      }, null, 2);
    } catch (err) {
      if (latencyBadge) latencyBadge.textContent = 'Error';
      consoleEl.textContent = `Error Axios: ${err.message}\n` + (err.response ? JSON.stringify(err.response.data, null, 2) : '');
    }
  }

  btnFetch.addEventListener('click', executeRequest);
}

// 4. Validator.js Playground
function initValidatorDemo() {
  const emailInput = document.getElementById('val-email');
  const passInput = document.getElementById('val-pass');
  const urlInput = document.getElementById('val-url');
  const sanitizeInput = document.getElementById('val-sanitize');

  function checkEmail() {
    const val = emailInput.value.trim();
    const badge = document.getElementById('badge-email');
    if (!badge) return;
    const isValid = validator.isEmail(val);
    badge.className = `validator-badge ${isValid ? 'val-valid' : 'val-invalid'}`;
    badge.innerHTML = isValid ? '<i class="ri-checkbox-circle-fill"></i> Email válido' : '<i class="ri-close-circle-fill"></i> Email no válido';
  }

  function checkPass() {
    const val = passInput.value;
    const badge = document.getElementById('badge-pass');
    if (!badge) return;
    const isStrong = validator.isStrongPassword(val, {
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    });
    badge.className = `validator-badge ${isStrong ? 'val-valid' : 'val-invalid'}`;
    badge.innerHTML = isStrong ? '<i class="ri-shield-check-fill"></i> Contraseña segura' : '<i class="ri-alert-fill"></i> Min. 8 carácteres, mayús, núm y símbolo';
  }

  function checkUrl() {
    const val = urlInput.value.trim();
    const badge = document.getElementById('badge-url');
    if (!badge) return;
    const isValid = validator.isURL(val, { protocols: ['http','https'] });
    badge.className = `validator-badge ${isValid ? 'val-valid' : 'val-invalid'}`;
    badge.innerHTML = isValid ? '<i class="ri-checkbox-circle-fill"></i> URL HTTP/HTTPS válida' : '<i class="ri-close-circle-fill"></i> Requiere protocolo https:// o http://';
  }

  function checkSanitize() {
    const val = sanitizeInput.value;
    const out = document.getElementById('out-sanitize');
    if (!out) return;
    // Escapar etiquetas HTML maliciosas
    const clean = validator.escape(val);
    out.textContent = clean;
  }

  emailInput?.addEventListener('input', checkEmail);
  passInput?.addEventListener('input', checkPass);
  urlInput?.addEventListener('input', checkUrl);
  sanitizeInput?.addEventListener('input', checkSanitize);

  checkEmail();
  checkPass();
  checkUrl();
  checkSanitize();
}

// 5. DataTables.js Interactive Table
let dataTableInstance = null;
async function initDataTablesDemo() {
  const tableEl = $('#sample-datatable');
  if (!tableEl.length) return;

  try {
    const resp = await fetch('assets/sample-data.json');
    const data = await resp.json();

    if ($.fn.DataTable.isDataTable('#sample-datatable')) {
      tableEl.DataTable().destroy();
    }

    dataTableInstance = tableEl.DataTable({
      data: data,
      columns: [
        { 
          data: 'nombre',
          render: function(data, type, row) {
            return `<div style="display:flex;align-items:center;gap:8px;">
                      <img src="${row.avatar}" width="24" height="24" style="border-radius:50%;" />
                      <strong>${data}</strong>
                    </div>`;
          }
        },
        { data: 'rol' },
        { data: 'ciudad' },
        { 
          data: 'salario',
          render: function(data) {
            return `<span style="color:#38bdf8;font-weight:600;">$${data} USD</span>`;
          }
        },
        { 
          data: 'estado',
          render: function(data) {
            const color = data === 'Activo' ? '#10b981' : data === 'Remoto' ? '#06b6d4' : '#f59e0b';
            return `<span style="background:${color}22;color:${color};border:1px solid ${color}44;padding:2px 8px;border-radius:12px;font-size:0.75rem;font-weight:600;">${data}</span>`;
          }
        }
      ],
      pageLength: 4,
      lengthMenu: [4, 8, 12],
      responsive: true,
      language: {
        search: "Buscar:",
        lengthMenu: "Ver _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_",
        paginate: {
          first: "«",
          previous: "‹",
          next: "›",
          last: "»"
        },
        emptyTable: "No hay registros disponibles"
      }
    });
  } catch (err) {
    console.error('Error inicializando DataTables:', err);
  }
}

// 6. Leaflet Interactive Map
let leafletMap = null;
async function initLeafletDemo() {
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer || leafletMap) return;

  try {
    leafletMap = L.map('leaflet-map').setView([-33.4372, -70.6506], 5);

    // TileLayer con estética moderna oscura (CartoDB DarkMatter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(leafletMap);

    const resp = await fetch('assets/sample-locations.json');
    const locations = await resp.json();

    locations.forEach(loc => {
      const customIcon = L.divIcon({
        className: 'leaflet-custom-pulse',
        html: `<div style="background-color:${loc.color};width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 12px ${loc.color};"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(leafletMap);
      marker.bindPopup(`
        <div style="font-family:'Inter', sans-serif;min-width:180px;">
          <h4 style="margin:0 0 4px 0;font-size:14px;color:#0f172a;">${loc.nombre}</h4>
          <span style="font-size:11px;background:#6366f1;color:#fff;padding:2px 6px;border-radius:8px;">${loc.tipo}</span>
          <p style="margin:8px 0 0 0;font-size:12px;color:#475569;">${loc.descripcion}</p>
        </div>
      `);
    });

    document.getElementById('btn-map-santiago')?.addEventListener('click', () => {
      leafletMap.flyTo([-33.4372, -70.6506], 11, { duration: 1.5 });
    });

    document.getElementById('btn-map-all')?.addEventListener('click', () => {
      leafletMap.flyTo([-33.4372, -70.6506], 5, { duration: 1.5 });
    });

  } catch (e) {
    console.error('Error cargando Leaflet demo:', e);
  }
}

window.initBasicDemos = function() {
  initAnimeDemo();
  initChartDemo();
  initAxiosDemo();
  initValidatorDemo();
  initDataTablesDemo();
  initLeafletDemo();
};
