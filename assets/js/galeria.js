(function () {
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Carruseles
  var esp = (document.documentElement.lang || 'es').indexOf('es') === 0;
  document.querySelectorAll('[data-carrusel]').forEach(function (c, n) {
    var titulo = c.querySelector('h3');
    if (titulo) { titulo.id = titulo.id || 'carrusel-' + (n + 1); c.setAttribute('aria-labelledby', titulo.id); }
    c.setAttribute('role', 'region');
    c.setAttribute('aria-roledescription', esp ? 'carrusel' : 'carousel');
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

  // Anillo de marcas: botón para pausar o reanudar
  var pausa = document.querySelector('.pausa-marcas');
  if (pausa) {
    var marcas = pausa.closest('.marcas');
    pausa.addEventListener('click', function () {
      var pausado = pausa.getAttribute('aria-pressed') !== 'true';
      pausa.setAttribute('aria-pressed', String(pausado));
      pausa.textContent = pausado ? pausa.dataset.reanudar : pausa.dataset.pausar;
      marcas.classList.toggle('pausado', pausado);
    });
  }

  // Videos: se reproducen solo cuando están a la vista
  var videos = document.querySelectorAll('.diapo video[loop]');

  // Videos con sonido: solo uno a la vez, y se pausa al salir de pantalla
  var conSonido = Array.prototype.slice.call(document.querySelectorAll('.diapo video[controls]'));
  conSonido.forEach(function (v) {
    v.addEventListener('play', function () { conSonido.forEach(function (o) { if (o !== v) o.pause(); }); });
  });
  if (conSonido.length && 'IntersectionObserver' in window) {
    var ioSonido = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) e.target.pause(); });
    }, { threshold: 0.2 });
    conSonido.forEach(function (v) { ioSonido.observe(v); });
  }
  if (videos.length && 'IntersectionObserver' in window && !reducir) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.play().catch(function () {}); } else { e.target.pause(); } });
    }, { threshold: 0.5 });
    videos.forEach(function (v) { io.observe(v); });
  } else {
    videos.forEach(function (v) { v.controls = true; });
  }

})();
