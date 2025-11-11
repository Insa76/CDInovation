// SCROLL SUAVE Y ANIMACIONES AL HACER SCROLL
document.addEventListener('DOMContentLoaded', () => {
  
  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animaciones al hacer scroll (fade-in)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, { threshold: 0.1 });

  // Observar todas las secciones
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
});

  // Flip Chat IA
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
        const space = document.createElement('div');
        space.className = 'flip-char';
        space.innerHTML = `<div class="flip-inner"><div class="flip-front"> </div><div class="flip-back"> </div></div>`;
        flipDisplay.appendChild(space);
      }
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
      }, i * 60);
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