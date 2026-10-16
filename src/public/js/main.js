/**
 * EDUCAN - JavaScript Vanilla Frontend
 * Interactividad para:
 * 1. Efecto Typing en el banner debajo del Hero
 * 2. Scroll-Reveal SOLO al hacer scroll en las tarjetas destacadas
 * 3. Validación de formularios Bootstrap en Login / Registro
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. EFECTO TYPING
  initTypingEffect();

  // 2. EFECTO SCROLL REVEAL (Solo al hacer scroll, no en la carga inicial)
  initScrollReveal();

  // 3. VALIDACIÓN DE FORMULARIOS BOOTSTRAP
  initFormValidation();
});

/**
 * Efecto de escritura y borrado de frases dinámicas
 */
function initTypingEffect() {
  const typingElement = document.getElementById('typingElement');
  if (!typingElement) return;

  const phrases = [
    'Educación de Cachorros desde 2 meses',
    'Modificación de Conducta y Reactividad',
    'Obediencia Urbana y Paseos sin Tirones',
    'Bienestar Emocional y Vínculo Familiar',
    'Adiestramiento en Positivo 100% Científico'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pausa al completar la frase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pausa antes de empezar la nueva
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * Scroll Reveal: Las tarjetas se revelan ÚNICAMENTE al hacer scroll.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;

  let hasUserScrolled = false;

  const revealOnScroll = () => {
    // Marcar que el usuario ya realizó interacción de scroll
    if (!hasUserScrolled && window.scrollY > 10) {
      hasUserScrolled = true;
    }

    if (!hasUserScrolled) return;

    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  };

  // Solo escuchar el evento scroll
  window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/**
 * Validación estándar de formularios Bootstrap
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });
}
