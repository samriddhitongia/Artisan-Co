document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('enquiry.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();
  initScrollAnimations();

  const form = document.getElementById('enquiry-form');
  const submitBtn = document.getElementById('enquiry-submit');
  const successBox = document.getElementById('enquiry-success');

  /* Pre-fill product if coming from product page */
  const params = new URLSearchParams(window.location.search);
  const productSlug = params.get('product');
  if (productSlug) {
    const product = getProduct(productSlug);
    if (product) {
      const msgEl = document.getElementById('message');
      if (msgEl) msgEl.value = `I am interested in the ${product.name} and would like a quote. `;
    }
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    ['err-firstName', 'err-lastName', 'err-email', 'err-projectType', 'err-message'].forEach(id => showError(id, ''));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const projectType = form.projectType.value;
    const message = form.message.value.trim();

    if (!firstName) { showError('err-firstName', 'Required.'); valid = false; }
    if (!lastName) { showError('err-lastName', 'Required.'); valid = false; }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showError('err-email', 'Please enter a valid email address.'); valid = false; }
    if (!projectType) { showError('err-projectType', 'Please select a project type.'); valid = false; }
    if (!message) { showError('err-message', 'Please describe your project.'); valid = false; }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';

    const enquiryData = {
      name:        document.getElementById('enquiry-name')?.value?.trim() || '',
      email:       document.getElementById('enquiry-email')?.value?.trim() || '',
      phone:       document.getElementById('enquiry-phone')?.value?.trim() || '',
      company:     document.getElementById('enquiry-company')?.value?.trim() || '',
      productSlug: document.getElementById('enquiry-product')?.value?.trim() || '',
      message:     document.getElementById('enquiry-message')?.value?.trim() || '',
    };

    // Write to Sheets if configured, else store locally
    (async () => {
      try {
        const sheetsReady = window.SheetsCMS &&
          SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE';
        if (sheetsReady) {
          await SheetsCMS.submitEnquiry(enquiryData);
        } else {
          const enqs = JSON.parse(localStorage.getItem('artisan_enquiries') || '[]');
          enqs.push({ ...enquiryData, id: Date.now().toString(), status: 'new', createdAt: new Date().toISOString() });
          localStorage.setItem('artisan_enquiries', JSON.stringify(enqs));
        }
      } catch (err) {
        console.warn('Enquiry sheet write failed, saved locally:', err.message);
        const enqs = JSON.parse(localStorage.getItem('artisan_enquiries') || '[]');
        enqs.push({ ...enquiryData, id: Date.now().toString(), status: 'new', createdAt: new Date().toISOString() });
        localStorage.setItem('artisan_enquiries', JSON.stringify(enqs));
      }
      form.style.display = 'none';
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })();
  });
});
