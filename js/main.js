(function () {
  // Sticky nav shadow on scroll
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveal via IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // Lightbox
  const lightbox  = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg     = document.getElementById('lb-img');
  const lbTitle   = document.getElementById('lb-title');
  const lbMeta    = document.getElementById('lb-meta');
  const items     = Array.from(document.querySelectorAll('[data-lightbox]'));
  let current     = 0;

  function openLb(index) {
    current = index;
    const el  = items[index];
    const img = el.querySelector('img');
    lbImg.src          = img.src;
    lbImg.alt          = img.alt;
    lbTitle.textContent = el.dataset.title || '';
    lbMeta.textContent  = el.dataset.meta  || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prevLb() { openLb((current - 1 + items.length) % items.length); }
  function nextLb() { openLb((current + 1) % items.length); }

  items.forEach((el, i) => el.addEventListener('click', () => openLb(i)));

  document.getElementById('lb-close').addEventListener('click', closeLb);
  document.getElementById('lb-prev').addEventListener('click', prevLb);
  document.getElementById('lb-next').addEventListener('click', nextLb);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft')   prevLb();
    if (e.key === 'ArrowRight')  nextLb();
  });
})();
