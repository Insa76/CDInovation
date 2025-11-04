/* -------------------- MINI CHAT IA (CORREGIDO Y PROBADO) -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');

  // Si falta algún elemento, detenerse y avisar en consola
  if (!messagesEl || !inputEl || !sendBtn) {
    console.error('❌ Error: Faltan elementos del chat IA en el HTML.');
    return;
  }

  // Función para añadir un mensaje al chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (isUser) messageDiv.classList.add('user');
    else messageDiv.classList.add('bot');
    messageDiv.textContent = text;
    messagesEl.appendChild(messageDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight; // Auto-scroll al final
  }

  // Respuestas simuladas según palabras clave
  function getResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('e-commerce') || lower.includes('tienda') || lower.includes('shop')) {
      return '✅ ¡Perfecto! Para una tienda online, te propongo:\n- Backend con Node.js + MongoDB\n- Panel de admin\n- Sistema de recomendaciones con IA\n¿Agendamos una reunión?';
    }
    if (lower.includes('dashboard') || lower.includes('datos') || lower.includes('analytics')) {
      return '📊 ¡Genial! Para un dashboard:\n- Pipeline ETL\n- Modelo predictivo\n- Visualizaciones en tiempo real\n¿Querés ver un ejemplo?';
    }
    if (lower.includes('chat') || lower.includes('bot') || lower.includes('asistente')) {
      return '💬 ¡Excelente! Para un chatbot:\n- Integración con API de IA\n- Webhooks para contexto\n- Panel de entrenamiento\n¿Te interesa un demo?';
    }
    if (input.length < 5) {
      return '🤔 Por favor, dame más detalles. Ej: “Necesito una app para turnos médicos”.';
    }
    return `🚀 ¡Me encanta tu idea! "${input}" suena a un proyecto fascinante.\nPuedo tener un prototipo en 1-2 semanas.\n¿Agendamos una llamada para hablarlo? 📅`;
  }

  // Enviar mensaje
  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Mostrar mensaje del usuario
    addMessage(text, true);
    inputEl.value = '';

    // Simular "pensando..."
    addMessage('Analizando tu proyecto...', false);

    // Responder después de un retraso
    setTimeout(() => {
      // Eliminar el mensaje de "Analizando..."
      const lastBotMessage = messagesEl.querySelector('.message.bot:last-child');
      if (lastBotMessage) lastBotMessage.remove();

      // Mostrar respuesta real
      const response = getResponse(text);
      addMessage(response, false);
    }, 800);
  }

  // Eventos
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  // Mensaje de bienvenida automático
  setTimeout(() => {
    addMessage('¡Hola! 👋 Soy tu asistente IA.\nDime: ¿Qué tipo de proyecto tenés en mente?\n(Ej: e-commerce, app móvil, dashboard...)', false);
  }, 500);
});

/* -------------------- EFECTO SLAT (TIRAS GIRATORIAS) -------------------- */
function initSlatReveal() {
  const container = document.getElementById('slatContainer');
  if (!container) return;

  const imgSrc = 'images/header.jpeg';
  const slatHeight = 40; // Altura de cada tira en px
  const totalSlats = Math.ceil(window.innerHeight / slatHeight);

  // Establecer variable CSS para el background
  document.documentElement.style.setProperty('--total-slats', totalSlats);

  // Crear las tiras
  for (let i = 0; i < totalSlats; i++) {
    const slat = document.createElement('div');
    slat.className = 'slat';
    slat.style.top = `${i * slatHeight}px`;
    slat.style.backgroundPosition = `0 -${i * slatHeight}px`;
    slat.style.height = `${slatHeight}px`;
    container.appendChild(slat);

    // Animar con retraso progresivo
    setTimeout(() => {
      slat.classList.add('visible');
    }, i * 80 + 300); // 80ms entre tiras, empieza a los 300ms
  }
}

// Ejecutar después del preloader
window.addEventListener('load', () => {
  setTimeout(initSlatReveal, 500); // Espera a que el preloader desaparezca
});

/* -------------------- REINICIAR ANIMACIÓN CADA 30 SEGUNDOS -------------------- */
function setupSlatAnimation() {
  const container = document.getElementById('slatContainer');
  if (!container) return;

  const slatHeight = 40;
  const totalSlats = Math.ceil(container.offsetHeight / slatHeight);
  container.innerHTML = '';

  for (let i = 0; i < totalSlats; i++) {
    const slat = document.createElement('div');
    slat.className = 'slat';
    slat.style.top = `${i * slatHeight}px`;
    slat.style.backgroundPosition = `0 -${i * slatHeight}px`;
    container.appendChild(slat);
  }

  function triggerSpin() {
    const slats = container.querySelectorAll('.slat');
    slats.forEach(slat => {
      slat.style.animation = 'none';
      void slat.offsetWidth;
      slat.style.animation = 'slatSpinOnce 8.5s cubic-bezier(0.24, 0.36, 0.34, 1) forwards';
    });
  }

  setTimeout(triggerSpin, 1000);
  setInterval(triggerSpin, 30000);
}

window.addEventListener('load', () => {
  setTimeout(setupSlatAnimation, 600);
});

/* -------------------- CHAT IA CON EFECTO FLIP (CARTEL DE AEROPUERTO) -------------------- */
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const flipDisplay = document.getElementById('flipDisplay');

function getResponse(input) {
  const p = input.toLowerCase();
  if (p.includes('e-commerce') || p.includes('tienda')) 
    return "Puedo crear un backend escalable, panel de admin y recomendaciones con IA.";
  if (p.includes('datos') || p.includes('dashboard')) 
    return "Propondría un pipeline ETL + modelo de análisis y un dashboard en tiempo real.";
  if (p.includes('chat') || p.includes('bot')) 
    return "Recomendado: integrar un modelo conversacional via API + webhooks.";
  if (p.length < 10) 
    return "Contame más del proyecto: objetivo, usuarios y qué querés automatizar.";
  return "Interesante. Puedo prototipar una solución en 1-2 semanas: API, front y pipeline de IA.";
}

function createFlipDisplay(text) {
  flipDisplay.innerHTML = '';
  const words = text.split(' ');
  
  words.forEach((word, wordIndex) => {
    if (wordIndex > 0) {
      // Añadir espacio como carácter fijo
      const space = document.createElement('div');
      space.className = 'flip-char';
      space.innerHTML = `<div class="flip-inner"><div class="flip-front"> </div><div class="flip-back"> </div></div>`;
      flipDisplay.appendChild(space);
    }

    // Cada letra de la palabra
    for (let char of word) {
      const charEl = document.createElement('div');
      charEl.className = 'flip-char';
      charEl.innerHTML = `
        <div class="flip-inner">
          <div class="flip-front">?</div>
          <div class="flip-back">${char}</div>
        </div>
      `;
      flipDisplay.appendChild(charEl);
    }
  });
}

function animateFlip() {
  const chars = flipDisplay.querySelectorAll('.flip-char');
  chars.forEach((char, i) => {
    setTimeout(() => {
      char.classList.add('flipped');
    }, i * 60); // 60ms entre letras
  });
}

function handleSend() {
  const input = userInput?.value.trim();
  if (!input) return;
  
  const response = getResponse(input);
  createFlipDisplay(response);
  setTimeout(animateFlip, 300);
  userInput.value = '';
}

if (sendBtn) sendBtn.addEventListener('click', handleSend);
if (userInput) userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSend();
  }
});

/* -------------------- EFECTO FLIP EN HERO -------------------- */
function initHeroFlipText() {
  const container = document.getElementById('flipHeroText');
  if (!container) return;

  const text = "Soluciones Inteligentes, productos que funcionan";
  container.innerHTML = '';

  // Crear un "slot" para cada carácter
  for (let char of text) {
    const charEl = document.createElement('div');
    charEl.className = 'flip-char-hero';
    charEl.innerHTML = `
      <div class="flip-inner-hero">
        <div class="flip-front-hero">${char === ' ' ? ' ' : '?'}</div>
        <div class="flip-back-hero">${char}</div>
      </div>
    `;
    container.appendChild(charEl);
  }

  // Animar cada letra con un retraso progresivo
  setTimeout(() => {
    const chars = container.querySelectorAll('.flip-char-hero');
    chars.forEach((char, i) => {
      setTimeout(() => {
        char.classList.add('flipped');
      }, i * 80); // 80ms entre letras
    });
  }, 1000); // Inicia 1s después del preloader
}

// Ejecutar después de cargar todo
window.addEventListener('load', () => {
  setTimeout(initHeroFlipText, 600);
});

const canvas = document.getElementById('servicesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const container = canvas.parentElement;
  canvas.width = Math.min(container.clientWidth, 1000); // respetar max-width
  canvas.height = canvas.width * 0.6; // ajustá la proporción (ej: 5:3)
}

// Llamar al cargar y al redimensionar
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Tu animación aquí
function animate() {
  // ... tu código ...
  requestAnimationFrame(animate);
}
animate();