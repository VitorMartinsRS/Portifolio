(() => {
  'use strict';
  const dialog = document.getElementById('feedback-dialog');
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('feedback-status');
  const submit = document.getElementById('feedback-submit');
  document.querySelectorAll('[data-open-feedback]').forEach(button => {
    button.addEventListener('click', () => dialog.showModal());
  });
  document.getElementById('feedback-back').addEventListener('click', () => dialog.close());
  let sending = false;
  dialog.addEventListener('cancel', event => { if (sending) event.preventDefault(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    const nome = form.elements.nome.value.trim();
    const comentario = form.elements.comentario.value.trim();
    if (!nome || !comentario) {
      status.textContent = 'Preencha seu nome e seu comentário.';
      return;
    }
    sending = true;
    submit.disabled = true;
    document.getElementById('feedback-back').disabled = true;
    status.textContent = 'Enviando seu feedback…';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      // Chave pública: o acesso aos registros é controlado pelas políticas RLS.
      const response = await fetch('https://queaynljbcfxsicxyssi.supabase.co/rest/v1/feedbacks', {
        method: 'POST',
        headers: {
          apikey: 'sb_publishable_85062lvu2MUtimZtoUYTbQ_FUqoSwWu',
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ nome, comentario }),
        signal: controller.signal
      });
      if (!response.ok) {
        status.textContent = response.status === 401 || response.status === 403
          ? 'O envio ainda não foi liberado. Tente novamente mais tarde.'
          : 'Não foi possível enviar agora. Seu texto foi mantido para tentar novamente.';
        return;
      }
      form.reset();
      status.textContent = 'Obrigado! Seu feedback foi enviado ao Vitor.';
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'A conexão demorou e não foi possível confirmar o envio. Aguarde antes de tentar novamente.'
        : 'Não foi possível confirmar o envio. Verifique sua conexão antes de tentar novamente.';
    } finally {
      clearTimeout(timer);
      sending = false;
      submit.disabled = false;
      document.getElementById('feedback-back').disabled = false;
    }
  });
})();
