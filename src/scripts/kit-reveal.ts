// Shared reveal for [data-animate] and [data-kit]. Final state is always in the HTML; no counting. Hide CSS applies only after this module adds html.kit-ready.

function reveal(el: Element) {
  if (el.classList.contains('is-in')) return;
  el.classList.add('is-in');
}

function init() {
  const els = document.querySelectorAll('[data-animate],[data-kit]');
  if (!('IntersectionObserver' in window)) { els.forEach(reveal); return; }
  let fired = false;
  try {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        fired = true;
        reveal(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach((e) => io.observe(e));
    // Hide CSS is gated on this class, so it only applies once the module is running.
    document.documentElement.classList.add('kit-ready');
  } catch (_) {
    els.forEach(reveal);
    return;
  }
  setTimeout(() => { if (!fired) els.forEach(reveal); }, 1500);
}

document.addEventListener('astro:page-load', init);
