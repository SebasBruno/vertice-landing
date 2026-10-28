(function () {
  var form = document.getElementById('formulario-contacto');
  if (!form) return;
  var es = (document.documentElement.lang || 'es').indexOf('es') === 0;
  var t = es ? {
    correo: 'Escribe un correo válido.',
    autoriza: 'Para enviarnos tu solicitud necesitamos tu autorización.',
    enviando: 'Enviando...',
    error: 'No pudimos enviar tu solicitud. Intenta de nuevo en un momento.',
    asunto: 'Nueva solicitud desde verticecollective.co'
  } : {
    correo: 'Please enter a valid email.',
    autoriza: 'We need your consent to send your enquiry.',
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
    if (!form.elements.autorizacion.checked) {
      estado.className = 'estado error'; estado.textContent = t.autoriza; form.elements.autorizacion.focus(); return;
    }
    var datos = new FormData(form);
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
