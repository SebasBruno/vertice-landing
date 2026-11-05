(function () {
  var form = document.getElementById('formulario-contacto');
  if (!form) return;
  var es = (document.documentElement.lang || 'es').indexOf('es') === 0;
  // Versión de los documentos legales vigentes (fecha de publicación). Actualizar al cambiarlos.
  var VERSION_LEGAL = '2026-11-05';
  var BASE = 'https://www.verticecollective.co';
  var t = es ? {
    correo: 'Escribe un correo válido.',
    terminos: 'Para enviarnos tu solicitud debes aceptar los Términos y condiciones.',
    autoriza: 'Para enviarnos tu solicitud necesitamos tu autorización de tratamiento de datos.',
    enviando: 'Enviando...',
    error: 'No pudimos enviar tu solicitud. Intenta de nuevo en un momento.',
    asunto: 'Nueva solicitud desde verticecollective.co'
  } : {
    correo: 'Please enter a valid email.',
    terminos: 'Please accept the Terms and conditions to send your enquiry.',
    autoriza: 'We need your consent to process your data to send your enquiry.',
    enviando: 'Sending...',
    error: "We couldn't send your enquiry. Please try again in a moment.",
    asunto: 'New enquiry from verticecollective.co (EN)'
  };
  var estado = form.querySelector('.estado');
  var boton = form.querySelector('button[type="submit"]');
  var textoBoton = boton.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    estado.className = 'estado';
    estado.textContent = '';
    var correo = form.elements.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
      estado.className = 'estado error'; estado.textContent = t.correo; form.elements.email.focus(); return;
    }
    if (!form.elements.acepta_terminos.checked) {
      estado.className = 'estado error'; estado.textContent = t.terminos; form.elements.acepta_terminos.focus(); return;
    }
    if (!form.elements.autorizacion.checked) {
      estado.className = 'estado error'; estado.textContent = t.autoriza; form.elements.autorizacion.focus(); return;
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
