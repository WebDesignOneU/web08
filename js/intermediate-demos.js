/**
 * Web08 - Demos Nivel Intermedio:
 * 7. GSAP
 * 8. AOS
 * 9. Day.js
 * 10. Lodash
 * 11. Flowbite
 */

// 7. GSAP Timeline & 3D Stage
let gsapTimeline = null;
function initGsapDemo() {
  const cards = document.querySelectorAll('.gsap-card');
  if (!cards.length) return;

  gsapTimeline = gsap.timeline({ paused: false, repeat: -1, yoyo: true });

  gsapTimeline
    .to('.gsap-card', {
      duration: 1,
      y: -25,
      rotationY: 180,
      scale: 1.1,
      stagger: 0.15,
      ease: 'power2.inOut'
    })
    .to('.gsap-card', {
      duration: 0.8,
      rotationX: 360,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });

  const scrubber = document.getElementById('gsap-scrubber');
  if (scrubber) {
    gsapTimeline.eventCallback('onUpdate', () => {
      scrubber.value = gsapTimeline.progress();
    });

    scrubber.addEventListener('input', (e) => {
      gsapTimeline.pause();
      gsapTimeline.progress(parseFloat(e.target.value));
    });
  }

  document.getElementById('btn-gsap-play')?.addEventListener('click', () => gsapTimeline.play());
  document.getElementById('btn-gsap-pause')?.addEventListener('click', () => gsapTimeline.pause());
  document.getElementById('btn-gsap-reverse')?.addEventListener('click', () => gsapTimeline.reverse());
  document.getElementById('btn-gsap-restart')?.addEventListener('click', () => gsapTimeline.restart());
}

// 8. AOS (Animate On Scroll) Playground
function initAosDemo() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false
    });
  }

  const btnReset = document.getElementById('btn-aos-reset');
  const scrollArea = document.getElementById('aos-scroll-area');

  if (btnReset && scrollArea) {
    btnReset.addEventListener('click', () => {
      scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
      }, 300);
    });
  }
}

// 9. Day.js Universal Clock & Relative Time
function initDayjsDemo() {
  if (typeof dayjs !== 'undefined') {
    // Configurar locale es y plugins
    if (dayjs.extend && window.dayjs_plugin_relativeTime) {
      dayjs.extend(window.dayjs_plugin_relativeTime);
    }
    if (window.dayjs_locale_es) {
      dayjs.locale('es');
    }
  }

  const clockEl = document.getElementById('digital-clock-val');
  function updateClock() {
    if (clockEl && typeof dayjs !== 'undefined') {
      clockEl.textContent = dayjs().format('HH:mm:ss');
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  function updateCalculations() {
    if (typeof dayjs === 'undefined') return;
    const now = dayjs();

    const elFull = document.getElementById('dayjs-full');
    if (elFull) elFull.textContent = now.format('dddd, D [de] MMMM [de] YYYY');

    const elRel1 = document.getElementById('dayjs-rel1');
    if (elRel1) elRel1.textContent = now.subtract(3, 'hour').subtract(15, 'minute').fromNow();

    const elRel2 = document.getElementById('dayjs-rel2');
    if (elRel2) elRel2.textContent = now.add(5, 'day').fromNow();

    const elDiff = document.getElementById('dayjs-diff');
    const endOfYear = dayjs().endOf('year');
    if (elDiff) elDiff.textContent = `${endOfYear.diff(now, 'day')} días restantes`;
  }
  updateCalculations();
}

// 10. Lodash Workbench
function initLodashDemo() {
  const outputEl = document.getElementById('lodash-output');
  const btnGroup = document.getElementById('btn-ld-group');
  const btnSort = document.getElementById('btn-ld-sort');
  const btnChunk = document.getElementById('btn-ld-chunk');
  const debounceInput = document.getElementById('lodash-debounce-input');
  const debounceCounter = document.getElementById('lodash-debounce-counter');
  const rawCounter = document.getElementById('lodash-raw-counter');

  let rawKeystrokes = 0;
  let debouncedExecutions = 0;

  let employees = [];
  fetch('assets/sample-data.json')
    .then(r => r.json())
    .then(d => { employees = d; })
    .catch(() => {});

  if (btnGroup) {
    btnGroup.addEventListener('click', () => {
      if (!window._ || !employees.length) return;
      const grouped = _.groupBy(employees, 'departamento');
      outputEl.textContent = JSON.stringify(grouped, null, 2);
    });
  }

  if (btnSort) {
    btnSort.addEventListener('click', () => {
      if (!window._ || !employees.length) return;
      const sorted = _.orderBy(employees, ['salario'], ['desc']);
      const simple = sorted.map(e => ({ nombre: e.nombre, salario: `$${e.salario}`, rol: e.rol }));
      outputEl.textContent = JSON.stringify(simple, null, 2);
    });
  }

  if (btnChunk) {
    btnChunk.addEventListener('click', () => {
      if (!window._ || !employees.length) return;
      const chunks = _.chunk(employees.map(e => e.nombre), 3);
      outputEl.textContent = JSON.stringify({ chunks_tamano_3: chunks }, null, 2);
    });
  }

  // Demostración de _.debounce
  if (debounceInput && window._) {
    const handleDebounced = _.debounce((text) => {
      debouncedExecutions++;
      if (debounceCounter) debounceCounter.textContent = debouncedExecutions;
    }, 400);

    debounceInput.addEventListener('input', (e) => {
      rawKeystrokes++;
      if (rawCounter) rawCounter.textContent = rawKeystrokes;
      handleDebounced(e.target.value);
    });
  }
}

// 11. Flowbite Components
function initFlowbiteDemo() {
  // Modal de demostración Flowbite
  const modalToggle = document.getElementById('btn-flowbite-modal');
  const modal = document.getElementById('flowbite-sample-modal');
  const modalClose = document.getElementById('btn-flowbite-modal-close');

  if (modalToggle && modal) {
    modalToggle.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Tabs de demostración Flowbite
  const tabBtns = document.querySelectorAll('.flowbite-tab-btn');
  const tabPanes = document.querySelectorAll('.flowbite-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      tabBtns.forEach(b => b.classList.remove('text-indigo-400', 'border-indigo-400', 'active'));
      tabPanes.forEach(p => p.classList.add('hidden'));

      btn.classList.add('text-indigo-400', 'border-indigo-400', 'active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.remove('hidden');
    });
  });
}

window.initIntermediateDemos = function() {
  initGsapDemo();
  initAosDemo();
  initDayjsDemo();
  initLodashDemo();
  initFlowbiteDemo();
};
