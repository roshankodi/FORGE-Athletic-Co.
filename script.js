// =========================================================
// FORGE ATHLETIC CO. — interactivity
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky nav shadow on scroll ---- */
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    nav.classList.toggle('is-scrolled', scrolled);
    toTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Mobile menu ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
      : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  }));

  /* ---- Reveal on scroll (also activates effort meters) ---- */
  const revealTargets = document.querySelectorAll('.reveal, .effort-meter');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.add('is-active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach(el => io.observe(el));

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- Testimonial carousel ---- */
  const track = document.getElementById('testiTrack');
  const prev = document.getElementById('testiPrev');
  const next = document.getElementById('testiNext');
  const scrollAmount = () => (track.querySelector('.testi-card')?.offsetWidth || 420) + 24;
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

  /* ---- Contact form (UI-only submit handling) ---- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    success.classList.add('is-visible');
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---- Newsletter (UI-only) ---- */
  const newsletter = document.getElementById('newsletterForm');
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletter.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Joined ✓';
    newsletter.reset();
    setTimeout(() => { btn.textContent = original; }, 2400);
  });

});
