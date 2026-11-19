// Shared reveal for [data-animate] and [data-kit]. Final state is always in the HTML.
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function count(tw: HTMLElement) {
  const real = tw.parentElement?.querySelector('.count-real');
  const to = parseFloat(tw.dataset.to || '0');
  const dec = parseInt(tw.dataset.decimals || '0');
  const pre = tw.dataset.prefix || '';
  const suf = tw.dataset.suffix || '';
  const fmt = (n: number) => pre + (dec ? n.toFixed(dec) : Math.round(n).toLocaleString('en-GB')) + suf;
  const wrap = tw.parentElement as HTMLElement;
  wrap.classList.add('counting');
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min((now - t0) / 600, 1);
    tw.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
    else { wrap.classList.remove('counting'); tw.textContent = ''; }
  };
  if (real) requestAnimationFrame(step);
}

function reveal(el: Element) {
  if (el.classList.contains('is-in')) return;
  el.classList.add('is-in');
  if (!reduced()) el.querySelectorAll<HTMLElement>('[data-count-twin]').forEach(count);
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
