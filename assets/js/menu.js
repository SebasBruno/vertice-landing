(function () {
  // Menú compacto en celular: sin JavaScript el menú se ve completo.
  var cab = document.querySelector('.encabezado');
  var boton = cab && cab.querySelector('.menu-boton');
  if (!boton) return;
  var nav = document.getElementById(boton.getAttribute('aria-controls'));
  cab.classList.add('menu-listo');
  function cerrar(enfocar) {
    cab.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    if (enfocar) boton.focus();
  }
  boton.addEventListener('click', function () {
    var abrir = boton.getAttribute('aria-expanded') !== 'true';
    cab.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    if (abrir) { var a = nav.querySelector('a'); if (a) a.focus(); }
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) cerrar(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cab.classList.contains('abierto')) cerrar(true);
  });
  document.addEventListener('click', function (e) {
    if (cab.classList.contains('abierto') && !cab.contains(e.target)) cerrar(false);
  });
})();
