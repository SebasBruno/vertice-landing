(function () {
  var form = document.getElementById('formulario-contacto');
  if (!form) return;
  var es = (document.documentElement.lang || 'es').indexOf('es') === 0;
  // Versión de los documentos legales vigentes (fecha de publicación). Actualizar al cambiarlos.
  var VERSION_LEGAL = '2026-11-04';
  var BASE = 'https://www.verticecollective.co';
  var t = es ? {
    nombre: 'Escribe tu nombre.',
    correo: 'Escribe un correo válido.',
    terminos: 'Debes aceptar los Términos y condiciones.',
    autoriza: 'Necesitamos tu autorización de tratamiento de datos.',
    resumen: 'Revisa los campos marcados.',
    enviando: 'Enviando...',
    error: 'No pudimos enviar tu solicitud. Intenta de nuevo en un momento.',
    asunto: 'Nueva solicitud desde verticecollective.co'
  } : {
    nombre: 'Please enter your name.',
    correo: 'Please enter a valid email.',
    terminos: 'Please accept the Terms and conditions.',
    autoriza: 'We need your consent to process your data.',
    resumen: 'Please check the highlighted fields.',
    enviando: 'Sending...',
    error: "We couldn't send your enquiry. Please try again in a moment.",
    asunto: 'New enquiry from verticecollective.co (EN)'
  };
  var estado = form.querySelector('.estado');
  var boton = form.querySelector('button[type="submit"]');
  var textoBoton = boton.textContent;

  // Al corregir un campo se quita su error
  ['name', 'email', 'acepta_terminos', 'autorizacion'].forEach(function (n) {
    var campo = form.elements[n];
    campo.addEventListener(campo.type === 'checkbox' ? 'change' : 'input', function () {
      if (campo.getAttribute('aria-invalid') !== 'true') return;
      var ok = campo.type === 'checkbox' ? campo.checked : campo.value.trim() !== '';
      if (ok) { campo.removeAttribute('aria-invalid'); var c = document.getElementById('error-' + n); c.hidden = true; c.textContent = ''; }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    estado.className = 'estado';
    estado.textContent = '';
    var errores = [];
    function marcar(nombre, mensaje) {
      var campo = form.elements[nombre];
      var caja = document.getElementById('error-' + nombre);
      if (mensaje) { campo.setAttribute('aria-invalid', 'true'); caja.textContent = mensaje; caja.hidden = false; errores.push(campo); }
      else { campo.removeAttribute('aria-invalid'); caja.textContent = ''; caja.hidden = true; }
    }
    marcar('name', form.elements.name.value.trim() ? '' : t.nombre);
    marcar('email', /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.elements.email.value.trim()) ? '' : t.correo);
    marcar('acepta_terminos', form.elements.acepta_terminos.checked ? '' : t.terminos);
    marcar('autorizacion', form.elements.autorizacion.checked ? '' : t.autoriza);
    if (errores.length) {
      estado.className = 'estado error'; estado.textContent = t.resumen; errores[0].focus(); return;
    }
    var datos = new FormData(form);
    datos.delete('acepta_terminos');
    datos.delete('autorizacion');
    // Registro del consentimiento: llega en el correo de cada solicitud como prueba.
    var texto = function (n) { return form.elements[n].closest('label').textContent.replace(/\s+/g, ' ').trim(); };
    var ahora = new Date();
    var bogota = new Date(ahora.getTime() - 5 * 3600000).toISOString().slice(0, 19) + '-05:00';
    var id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(ahora.getTime()) + Math.random().toString(16).slice(2);
    var rutaT = es ? '/terminos' : '/en/terms';
    var rutaP = es ? '/politica-de-datos' : '/en/privacy';
    datos.append('Consentimiento ID', id);
    datos.append('Consentimiento fecha y hora (Bogotá)', bogota);
    datos.append('Consentimiento fecha UTC', ahora.toISOString());
    datos.append('Acepta términos', 'Sí. Casilla marcada: "' + texto('acepta_terminos') + '" Versión ' + VERSION_LEGAL + ' (' + BASE + rutaT + ')');
    datos.append('Autoriza tratamiento de datos', 'Sí. Casilla marcada: "' + texto('autorizacion') + '" Versión ' + VERSION_LEGAL + ' (' + BASE + rutaP + ')');
    datos.append('Página del formulario', location.href);
    datos.append('Idioma', es ? 'Español' : 'English');
    datos.append('access_key', 'e5e1c4e6-a48c-4db2-9bee-390ccde5f990');
    datos.append('subject', t.asunto);
    datos.append('from_name', 'Web Vértice Collective');
    boton.disabled = true; boton.textContent = t.enviando;
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: datos })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.success) throw new Error('fallo');
        var ok = document.getElementById('gracias');
        form.hidden = true; ok.hidden = false; ok.focus();
      })
      .catch(function () {
        estado.className = 'estado error'; estado.textContent = t.error;
        boton.disabled = false; boton.textContent = textoBoton;
      });
  });
})();
