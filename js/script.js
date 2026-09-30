document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  /* ---- Header shrink + active link on scroll ---- */
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const onScroll = () => {
    if (header) header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px rgba(0,0,0,.35)' : 'none';

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Animated stat counters ---- */
  const statEls = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && statEls.length) {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statIo.observe(el));
  }

  /* ---- Contact form (demo only — no backend wired up) ---- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'تم استلام الطلب في هذا القالب التجريبي. اربط النموذج بخدمة بريد أو API قبل النشر الفعلي.';
      formNote.style.color = '#e9e9ed';
      form.reset();
    });
  }

});
