document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('about.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();
  initScrollAnimations();
});
