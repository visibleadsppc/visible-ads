// Shared reveal for [data-animate] and [data-kit]. Final state is always in the HTML; no counting.

function reveal(el: Element) {
  if (el.classList.contains('is-in')) return;
  el.classList.add('is-in');
}

function init() {
  const els = document.querySelectorAll('[data-animate],[data-kit]');
  if (!('IntersectionObserver' in window)) { els.forEach(reveal); return; }
  let fired = false;
  const io = new IntersectionObserver((es) => {
    fired = true;
    es.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  els.forEach((e) => io.observe(e));
  setTimeout(() => { if (!fired) els.forEach(reveal); }, 1500);
}

document.addEventListener('astro:page-load', init);
