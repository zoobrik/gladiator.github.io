// ═══════════════════════════════════════════════════════════════
// GLADIATOR GYM & FITNESS — script.js
// ═══════════════════════════════════════════════════════════════

// ── NAVBAR: scroll darken + active link highlighting ──────────
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightActiveSection();
}, { passive: true });

function highlightActiveSection() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// ── MOBILE HAMBURGER ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, i) => {
        if (el === entry.target) return;
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ─────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const fps      = 60;
  const steps    = duration / (1000 / fps);
  const increment = target / steps;
  let current = 0;

  const tick = () => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── PRICING → PRE-FILL CONTACT FORM ──────────────────────────
document.querySelectorAll('.choose-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.closest('.pricing-card').dataset.plan || '';
    const planSelect = document.getElementById('fplan');
    const msgField   = document.getElementById('fmessage');

    // Match option value
    if (planSelect) {
      const option = [...planSelect.options].find(o => o.value === plan);
      if (option) planSelect.value = plan;
    }

    if (msgField && !msgField.value) {
      msgField.value = `გამარჯობა! I am interested in the "${plan}" membership plan. Please contact me with more details.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Brief gold flash on the select
      if (planSelect) {
        planSelect.style.borderColor = 'var(--gold)';
        setTimeout(() => { planSelect.style.borderColor = ''; }, 1500);
      }
    }
  });
});

// ── CONTACT FORM SUBMIT ───────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  if (!name || !email) {
    shakeField(!name ? 'fname' : 'femail');
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  btnText.textContent = 'გაგზავნა... / Sending...';
  submitBtn.style.opacity = '0.7';

  // Simulate async submit
  await new Promise(r => setTimeout(r, 1200));

  // Success
  formSuccess.style.display = 'block';
  contactForm.reset();
  submitBtn.disabled = false;
  btnText.textContent = 'გაგზავნა / Send Message';
  submitBtn.style.opacity = '';

  // Auto-hide success after 5s
  setTimeout(() => {
    formSuccess.style.display = 'none';
  }, 5000);
});

function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none';
  el.style.borderColor = '#ff4444';
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; }, 2000);
}

// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── GALLERY CARD — subtle parallax on mouse move ─────────────
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `scale(1.02) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── NAVBAR: hide on scroll down, show on scroll up (mobile) ──
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (window.innerWidth <= 768) {
    if (currentY > lastScrollY + 5 && currentY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else if (currentY < lastScrollY - 5) {
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollY = currentY;
}, { passive: true });

// Add transition to navbar for hide/show
navbar.style.transition = 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease, transform 0.35s ease';