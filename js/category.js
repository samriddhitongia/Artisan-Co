document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('products.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const params = new URLSearchParams(window.location.search);
  const catId = params.get('id');
  const main = document.getElementById('category-main');

  const category = catId ? getCategory(catId) : null;
  const products = catId ? getProducts({ categoryId: catId }) : [];

  const displayName = category?.name || (catId ? catId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Category');
  document.title = `${displayName} — Artisan & Co.`;

  let productsHTML = '';
  if (!products.length) {
    productsHTML = `<p style="text-align:center;padding:4rem 0;color:var(--muted-foreground);">No products found in this category.</p>`;
  } else {
    productsHTML = `<div class="products-grid">${products.map(p => renderProductCard(p)).join('')}</div>`;
  }

  main.innerHTML = `
    <section style="background:var(--muted);padding:6rem 0 4rem;">
      <div class="container" style="text-align:center;">
        <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);animation:fadeInUp 0.8s ease both;">${displayName}</h1>
        ${category?.description ? `<p style="font-size:1.0625rem;font-weight:300;color:var(--muted-foreground);margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto;animation:fadeInUp 0.7s 0.15s ease both;">${category.description}</p>` : ''}
      </div>
    </section>

    <section style="padding:5rem 0;">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;">
          <p style="font-size:0.875rem;color:var(--muted-foreground);">${products.length} product${products.length !== 1 ? 's' : ''}</p>
          <a href="products.html" style="font-size:0.8125rem;color:var(--accent);font-weight:600;">← All Products</a>
        </div>
        ${productsHTML}
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <p class="section-eyebrow" style="text-align:center;">Custom Orders</p>
        <h2>Need a custom specification?</h2>
        <p>All products can be customised to your exact requirements — dimensions, finishes, materials. Tell us what you need.</p>
        <a href="enquiry.html" class="btn-dark">REQUEST A CUSTOM QUOTE</a>
      </div>
    </section>
  `;

  initScrollAnimations();
});
