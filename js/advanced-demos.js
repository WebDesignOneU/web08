/**
 * Web08 - Demos Nivel Avanzado:
 * 12. D3.js (Force-Directed Graph)
 * 13. Phaser.js (Playable Arcade Mini-Game)
 * 14. Konva.js (Interactive Canvas Studio with Transformer)
 */

// 12. D3.js Force Simulation Network
let d3Simulation = null;
function initD3Demo() {
  const container = document.getElementById('d3-stage');
  if (!container || !window.d3) return;

  container.innerHTML = '';
  const width = container.clientWidth || 360;
  const height = 240;

  const svg = d3.select('#d3-stage')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`);

  const nodes = [
    { id: 'Web08', group: 1, r: 18, color: '#ec4899' },
    { id: 'D3.js', group: 2, r: 14, color: '#6366f1' },
    { id: 'Phaser', group: 2, r: 14, color: '#06b6d4' },
    { id: 'Konva', group: 2, r: 14, color: '#10b981' },
    { id: 'GSAP', group: 3, r: 12, color: '#8b5cf6' },
    { id: 'Leaflet', group: 3, r: 12, color: '#f59e0b' },
    { id: 'Anime', group: 3, r: 12, color: '#38bdf8' }
  ];

  const links = [
    { source: 'Web08', target: 'D3.js' },
    { source: 'Web08', target: 'Phaser' },
    { source: 'Web08', target: 'Konva' },
    { source: 'D3.js', target: 'GSAP' },
    { source: 'Phaser', target: 'Konva' },
    { source: 'Leaflet', target: 'D3.js' },
    { source: 'Anime', target: 'GSAP' }
  ];

  const link = svg.append('g')
    .attr('stroke', 'rgba(255,255,255,0.15)')
    .attr('stroke-width', 1.5)
    .selectAll('line')
    .data(links)
    .join('line');

  const node = svg.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  node.append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => d.color)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1.5)
    .style('filter', 'drop-shadow(0 0 6px rgba(255,255,255,0.3))');

  node.append('text')
    .text(d => d.id)
    .attr('x', 0)
    .attr('y', 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', '9px')
    .attr('font-family', "'Inter', sans-serif")
    .attr('font-weight', '700')
    .attr('fill', '#ffffff')
    .attr('pointer-events', 'none');

  d3Simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(60))
    .force('charge', d3.forceManyBody().strength(-120))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

  function dragstarted(event, d) {
    if (!event.active) d3Simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) d3Simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  document.getElementById('btn-d3-add')?.addEventListener('click', () => {
    const id = `Node_${nodes.length + 1}`;
    const newNode = { id, group: 4, r: 11, color: '#f43f5e' };
    nodes.push(newNode);
    links.push({ source: 'Web08', target: id });
    initD3Demo();
  });

  document.getElementById('btn-d3-reset')?.addEventListener('click', () => {
    initD3Demo();
  });
}

// 13. Phaser.js Playable Mini Arcade Game: "Cyber Gem Collector"
let phaserGame = null;
function initPhaserDemo() {
  const container = document.getElementById('phaser-game-container');
  if (!container || !window.Phaser || phaserGame) return;

  // Web Audio Synth FX para feedback sonoro sin depender de archivos de audio
  function playCoinTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {}
  }

  let score = 0;
  let scoreText;
  let player;
  let gems;
  let cursors;

  class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }

    preload() {
      // Generar gráficos procedimentales como texturas en Phaser
      const g = this.make.graphics({ x: 0, y: 0, add: false });

      // Nave/Jugador
      g.fillStyle(0x06b6d4, 1);
      g.beginPath();
      g.moveTo(15, 0);
      g.lineTo(30, 26);
      g.lineTo(15, 20);
      g.lineTo(0, 26);
      g.closePath();
      g.fillPath();
      g.generateTexture('playerShip', 30, 26);

      // Gema/Estrella
      g.clear();
      g.fillStyle(0xfacc15, 1);
      g.fillCircle(10, 10, 8);
      g.fillStyle(0xffffff, 0.8);
      g.fillCircle(8, 7, 3);
      g.generateTexture('gemItem', 20, 20);
    }

    create() {
      score = 0;
      this.cameras.main.setBackgroundColor('#070b14');

      // Texto de puntuación
      scoreText = this.add.text(12, 10, 'Gemas: 0', {
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#38bdf8'
      });

      this.add.text(220, 10, 'Mueve: ◄ ► o Ratón', {
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        color: '#64748b'
      });

      // Jugador
      player = this.physics.add.sprite(180, 195, 'playerShip');
      player.setCollideWorldBounds(true);

      // Gemas que caen
      gems = this.physics.add.group({
        key: 'gemItem',
        repeat: 3,
        setXY: { x: 40, y: 15, stepX: 85 }
      });

      gems.children.iterate((gem) => {
        gem.setVelocityY(Phaser.Math.Between(50, 110));
      });

      cursors = this.input.keyboard.createCursorKeys();

      // Control por puntero de ratón/pantalla táctil
      this.input.on('pointermove', (pointer) => {
        player.x = Phaser.Math.Clamp(pointer.x, 20, 340);
      });

      // Detección de colisión
      this.physics.add.overlap(player, gems, (p, gem) => {
        playCoinTone();
        score += 10;
        scoreText.setText('Gemas: ' + score);

        // Efecto flotante
        gem.x = Phaser.Math.Between(25, 335);
        gem.y = 0;
        gem.setVelocityY(Phaser.Math.Between(60, 120));

        // Actualizar contador exterior
        const scoreBadge = document.getElementById('phaser-score-badge');
        if (scoreBadge) scoreBadge.textContent = score;
      }, null, this);
    }

    update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-180);
      } else if (cursors.right.isDown) {
        player.setVelocityX(180);
      } else {
        player.setVelocityX(0);
      }

      // Reiniciar gemas que caen al fondo
      gems.children.iterate((gem) => {
        if (gem.y > 230) {
          gem.x = Phaser.Math.Between(25, 335);
          gem.y = 0;
          gem.setVelocityY(Phaser.Math.Between(60, 120));
        }
      });
    }
  }

  const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 220,
    parent: 'phaser-game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [GameScene]
  };

  phaserGame = new Phaser.Game(config);

  document.getElementById('btn-phaser-reset')?.addEventListener('click', () => {
    if (phaserGame && phaserGame.scene) {
      phaserGame.scene.scenes[0].scene.restart();
      const scoreBadge = document.getElementById('phaser-score-badge');
      if (scoreBadge) scoreBadge.textContent = 0;
    }
  });
}

// 14. Konva.js Interactive Canvas Studio with Transformer
let konvaStage = null;
let konvaLayer = null;
let konvaTransformer = null;

function initKonvaDemo() {
  const container = document.getElementById('konva-container');
  if (!container || !window.Konva) return;

  container.innerHTML = '';
  const width = container.clientWidth || 360;
  const height = 230;

  konvaStage = new Konva.Stage({
    container: 'konva-container',
    width: width,
    height: height
  });

  konvaLayer = new Konva.Layer();
  konvaStage.add(konvaLayer);

  // Transformador para redimensionar y rotar
  konvaTransformer = new Konva.Transformer({
    nodes: [],
    anchorStroke: '#6366f1',
    anchorFill: '#ffffff',
    anchorSize: 8,
    borderStroke: '#6366f1',
    borderDash: [3, 3]
  });
  konvaLayer.add(konvaTransformer);

  // Rectángulo interactivo
  const rect = new Konva.Rect({
    x: 40,
    y: 40,
    width: 80,
    height: 70,
    fill: '#6366f1',
    cornerRadius: 8,
    draggable: true,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 0.4
  });
  konvaLayer.add(rect);

  // Círculo interactivo
  const circle = new Konva.Circle({
    x: 200,
    y: 80,
    radius: 40,
    fill: '#06b6d4',
    draggable: true,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 0.4
  });
  konvaLayer.add(circle);

  // Estrella interactiva
  const star = new Konva.Star({
    x: 290,
    y: 140,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 38,
    fill: '#ec4899',
    draggable: true,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 0.4
  });
  konvaLayer.add(star);

  // Texto guía
  const text = new Konva.Text({
    x: 20,
    y: 190,
    text: 'Haz clic para seleccionar, rotar, escalar o arrastrar',
    fontSize: 11,
    fontFamily: 'Inter',
    fill: '#94a3b8'
  });
  konvaLayer.add(text);

  // Selección de figuras con transformer
  konvaStage.on('click tap', (e) => {
    if (e.target === konvaStage || e.target === text) {
      konvaTransformer.nodes([]);
      return;
    }
    konvaTransformer.nodes([e.target]);
  });

  konvaLayer.draw();

  // Botón para añadir figura aleatoria
  document.getElementById('btn-konva-add')?.addEventListener('click', () => {
    const colors = ['#f59e0b', '#10b981', '#a855f7', '#3b82f6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newCircle = new Konva.Circle({
      x: Math.random() * (width - 80) + 40,
      y: Math.random() * (height - 80) + 40,
      radius: 25,
      fill: randomColor,
      draggable: true,
      shadowColor: 'black',
      shadowBlur: 8,
      shadowOpacity: 0.3
    });
    konvaLayer.add(newCircle);
    konvaTransformer.nodes([newCircle]);
    konvaLayer.draw();
  });

  // Botón para cambiar color del nodo activo
  document.getElementById('btn-konva-color')?.addEventListener('click', () => {
    const selected = konvaTransformer.nodes()[0];
    if (selected) {
      const palette = ['#e11d48', '#2563eb', '#16a34a', '#d97706', '#9333ea'];
      const nextColor = palette[Math.floor(Math.random() * palette.length)];
      selected.fill(nextColor);
      konvaLayer.draw();
    }
  });

  // Botón exportar imagen PNG
  document.getElementById('btn-konva-export')?.addEventListener('click', () => {
    konvaTransformer.nodes([]); // Desactivar marco para la foto
    konvaLayer.draw();
    const dataURL = konvaStage.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'konva-canvas-showcase.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

window.initAdvancedDemos = function() {
  initD3Demo();
  initPhaserDemo();
  initKonvaDemo();
};
