document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('contact.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();
  initScrollAnimations();

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const successBox = document.getElementById('contact-success');

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    ['err-name', 'err-email', 'err-message'].forEach(id => showError(id, ''));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) { showError('err-name', 'Please enter your name.'); valid = false; }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showError('err-email', 'Please enter a valid email.'); valid = false; }
    if (!message) { showError('err-message', 'Please enter a message.'); valid = false; }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    setTimeout(() => {
      form.style.display = 'none';
      successBox.style.display = 'block';
    }, 1200);
  });
});
