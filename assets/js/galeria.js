(function () {
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Carruseles
  document.querySelectorAll('[data-carrusel]').forEach(function (c) {
    var pista = c.querySelector('.pista');
    var diapos = Array.prototype.slice.call(pista.children);
    var ant = c.querySelector('[data-anterior]');
    var sig = c.querySelector('[data-siguiente]');
    var actual = c.querySelector('[data-actual]');
    function indice() {
      var x = pista.scrollLeft, mejor = 0, dist = Infinity;
      diapos.forEach(function (d, i) { var dd = Math.abs(d.offsetLeft - pista.offsetLeft - x); if (dd < dist) { dist = dd; mejor = i; } });
      return mejor;
    }
    function actualizar() {
      var i = indice();
      actual.textContent = i + 1;
      ant.disabled = pista.scrollLeft <= 2;
      sig.disabled = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 2;
    }
    function ir(paso) {
      var i = Math.min(diapos.length - 1, Math.max(0, indice() + paso));
      pista.scrollTo({ left: diapos[i].offsetLeft - pista.offsetLeft, behavior: reducir ? 'auto' : 'smooth' });
    }
    ant.addEventListener('click', function () { ir(-1); });
    sig.addEventListener('click', function () { ir(1); });
    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1); }
    });
    var t; pista.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(actualizar, 60); }, { passive: true });
    window.addEventListener('resize', actualizar);
    actualizar();
  });

  // Videos: se reproducen solo cuando están a la vista
  var videos = document.querySelectorAll('.diapo video');
  if (videos.length && 'IntersectionObserver' in window && !reducir) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.play().catch(function () {}); } else { e.target.pause(); } });
    }, { threshold: 0.5 });
    videos.forEach(function (v) { io.observe(v); });
  } else {
    videos.forEach(function (v) { v.controls = true; });
  }

  // Marcas que rotan de a 3
  document.querySelectorAll('[data-rotador]').forEach(function (r) {
    var items = Array.prototype.slice.call(r.children);
    if (reducir || items.length <= 3) return;
    r.classList.add('activo');
    r.setAttribute('aria-live', 'off');
    var inicio = 0, pausa = false;
    function mostrar() {
      items.forEach(function (li) { li.classList.remove('visible'); });
      for (var k = 0; k < 3; k++) items[(inicio + k) % items.length].classList.add('visible');
    }
    mostrar();
    setInterval(function () { if (pausa || document.hidden) return; inicio = (inicio + 3) % items.length; mostrar(); }, 2800);
    r.addEventListener('mouseenter', function () { pausa = true; });
    r.addEventListener('mouseleave', function () { pausa = false; });
  });
})();
