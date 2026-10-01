# Web08 - Showcase Interactivo de Librerías JavaScript

Este proyecto es un laboratorio interactivo y catálogo visual desarrollado para **Tecnologías Web I**, compuesto por **14 librerías esenciales de JavaScript** organizadas por niveles de complejidad: **Básico**, **Intermedio** y **Avanzado**.

---

## 📁 Estructura del Proyecto

```text
web08/
├── assets/                  # Recursos gráficos y fuentes de datos
│   ├── avatar1.svg          # Avatares vectoriales
│   ├── avatar2.svg
│   ├── avatar3.svg
│   ├── coin.svg             # Sprites y gemas interactivas
│   ├── star.svg
│   ├── logo.svg             # Identidad gráfica
│   ├── sample-data.json     # Dataset para DataTables, Lodash y Chart.js
│   └── sample-locations.json# Datos georreferenciados para Leaflet
├── css/                     # Estilos y diseño visual
│   ├── fonts.css            # Declaraciones @font-face locales y web
│   └── styles.css           # Glassmorphism, variables CSS, temas claro/oscuro
├── fonts/                   # Tipografías locales
│   ├── DS-DIGI.TTF          # Fuentes digitales para relojes y telemetría
│   ├── DS-DIGIB.TTF
│   ├── DS-DIGII.TTF
│   └── DS-DIGIT.TTF
├── js/                      # Lógica interactiva modular
│   ├── basic-demos.js       # Playgrounds de nivel básico (6 librerías)
│   ├── intermediate-demos.js# Playgrounds de nivel intermedio (5 librerías)
│   ├── advanced-demos.js    # Playgrounds de nivel avanzado (3 librerías)
│   └── main.js              # Controlador global, temas, filtros, modales
├── index.html               # Aplicación interactiva principal
└── README.md                # Documentación del laboratorio
```

---

## 🚀 Librerías Incluidas y Funcionalidades

### 🟢 Nivel Básico
1. **Anime.js**: Animación basada en cuadrícula (grid 7x4) con *staggering* concéntrico, rotaciones polimórficas y cambio dinámico de paleta HSL.
2. **Chart.js**: Gráfico interactivo con selector de tipo en caliente (Línea, Barra, Radar, Dona) y actualización reactiva de datasets con animación suave.
3. **Axios**: Cliente HTTP para consultas asíncronas (`async/await`) contra APIs reales y datos locales, con medidor de latencia en milisegundos y consola formateada.
4. **Validator.js**: Motor de validación en vivo para correos electrónicos, contraseñas robustas (reglas NIST), URLs con protocolo seguro y saneamiento contra inyecciones XSS.
5. **DataTables.js**: Tabla de alto rendimiento conectada a `sample-data.json` con renderers personalizados de avatares, salarios en USD, badges de estado, ordenamiento multicampo y paginación.
6. **Leaflet**: Mapa interactivo georreferenciado con mosaicos oscuros de alta resolución (*CartoDB DarkMatter*), marcadores luminiscentes y tooltips descriptivos.

---

### 🔵 Nivel Intermedio
7. **GSAP (GreenSock)**: Línea de tiempo tridimensional con rotaciones `rotationX` y `rotationY`, escala elástica, controles de reproducción (`play`, `pause`, `reverse`) y *scrubber slider* para desplazarse manualmente por el progreso.
8. **AOS (Animate On Scroll)**: Contenedor con tarjetas activadas por visibilidad en el viewport (`fade-up`, `flip-left`, `zoom-in`, `slide-right`) con botón de reinicio.
9. **Day.js**: Reloj digital en tiempo real con tipografía local `DS-Digital`, cálculo de tiempos relativos en español (`fromNow`), formateo extendido y diferencia de días para fin de año.
10. **Lodash**: Laboratorio de programación funcional demostrando `_.groupBy()`, `_.orderBy()`, `_.chunk()` y un banco de prueba en vivo de `_.debounce(400ms)` que contabiliza la reducción de llamadas.
11. **Flowbite**: Componentes de interfaz modernos que incluyen modales emergentes y sistemas de pestañas (*tabs*) accesibles con estética Tailwind.

---

### 🔴 Nivel Avanzado
12. **D3.js**: Simulación física de fuerzas (*Force-Directed Graph*) con detección de colisiones, enlaces elásticos, arrastre de nodos con el cursor (*drag & drop*) y adición dinámica de nuevos nodos.
13. **Phaser.js**: Mini-videojuego arcade interactivo (*Cyber Gem Collector*) ejecutado directamente en Canvas con físicas arcade, detección de teclado/ratón/touch, generador de sonido sintetizado proceduralmente (Web Audio API) y marcador de gemas.
14. **Konva.js**: Estudio de dibujo vectorial 2D interactivo con figuras geométricas arrastrables, transformador con anclas de rotación y escalado, cambio dinámico de color y exportación directa a imagen PNG de alta resolución.

---

## 💻 Características Adicionales
- **Inspector de Código Fuente**: Cada librería dispone de un botón `Código` que despliega un modal con la sintaxis exacta y opción de copiar al portapapeles con un clic.
- **Filtro Rápido por Nivel y Buscador**: Filtra instantáneamente entre *Todas*, *Básico*, *Intermedio* o *Avanzado*, o busca por nombre de librería o palabra clave.
- **Modo Oscuro / Claro**: Alternador persistente en el encabezado que adapta todas las tarjetas, fondos y contrastes.
