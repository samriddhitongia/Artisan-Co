document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('products.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const main = document.getElementById('product-main');

  // Try Sheets first
  if (window.SheetsCMS && SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
    try {
      const sheetProducts = await SheetsCMS.getProducts();
      PRODUCTS.length = 0; sheetProducts.forEach(p => PRODUCTS.push(p));
    } catch (e) { console.warn('[Sheets CMS] product-detail — using local data:', e.message); }
  }

  const product = slug ? getProduct(slug) : null;

  if (!product) {
    main.innerHTML = `
      <section style="padding:6rem 0;text-align:center;">
        <div class="container">
          <h1 style="font-family:var(--font-serif);font-size:2.5rem;margin-bottom:1.5rem;">Product Not Found</h1>
          <a href="products.html" style="color:var(--accent);">Back to Products</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${product.name} — Artisan & Co.`;
  const label = getCategoryLabel(product.categoryId);
  const price = getProductPrice(product.slug);
  const priceStr = formatPrice(price);
  const wishlisted = isWishlisted(product.slug);

  main.innerHTML = `
    <section class="product-detail-hero">
      <div class="container">
        <div class="product-detail-grid">
          <div class="product-gallery">
            <div class="product-main-img">
              <img id="main-img" src="${product.images?.[0] || ''}" alt="${product.name}">
            </div>
            ${product.images?.length > 1 ? `
            <div class="product-thumbs" id="thumbs">
              ${product.images.map((img, i) => `
                <div class="product-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
                  <img src="${img}" alt="${product.name} view ${i + 1}">
                </div>`).join('')}
            </div>` : ''}
          </div>

          <div class="product-info fade-up">
            <p class="product-category-tag">${label}</p>
            <h1>${product.name}</h1>
            <p class="product-material">${product.material}</p>
            <p class="product-short-desc">${product.shortDescription}</p>

            ${priceStr ? `<div class="pd-price">${priceStr} <span class="pd-price-note">+ 18% GST</span></div>` : ''}

            <div class="product-specs">
              ${product.dimensions ? `
              <div class="spec-row">
                <span class="spec-label">Dimensions</span>
                <span class="spec-value">${product.dimensions}</span>
              </div>` : ''}
              <div class="spec-row">
                <span class="spec-label">Material</span>
                <span class="spec-value">${product.material}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Category</span>
                <span class="spec-value">${label}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Availability</span>
                <span class="spec-value">${product.availability}</span>
              </div>
            </div>

            ${product.finishes?.length ? `
            <div class="product-finishes">
              <h4>Available Finishes</h4>
              <div class="finish-tags">
                ${product.finishes.map(f => `<span class="finish-tag">${f}</span>`).join('')}
              </div>
            </div>` : ''}

            <div class="pd-actions">
              <button class="pd-add-cart" onclick="handleAddToCartDetail()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Cart
              </button>
              <button class="pd-wish-btn ${wishlisted ? 'wishlisted' : ''}" id="pd-wish" onclick="handleWishDetail()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span id="pd-wish-label">${wishlisted ? 'Saved' : 'Save'}</span>
              </button>
            </div>
            <div class="pd-enquiry-row">
              <a href="enquiry.html?product=${product.slug}" class="btn-enquiry">REQUEST A QUOTE</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="product-description-section">
      <div class="container" style="max-width:860px;">
        <a href="products.html" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Products
        </a>
        <h2 style="font-size:1.75rem;margin-bottom:1.5rem;" class="fade-up">About This Piece</h2>
        <p style="font-size:1.0625rem;font-weight:300;line-height:1.85;color:rgba(38,38,38,0.8);" class="fade-up delay-1">${product.description}</p>
        <div style="margin-top:4rem;padding:2rem;background:var(--muted);border-left:4px solid var(--accent);" class="fade-up delay-2">
          <p style="font-size:0.875rem;color:var(--muted-foreground);line-height:1.7;margin-bottom:1.5rem;">Ready to specify this piece for your project? Our team will confirm dimensions, lead times and pricing.</p>
          <a href="enquiry.html?product=${product.slug}" class="btn-dark">REQUEST A QUOTE FOR THIS PIECE</a>
        </div>
      </div>
    </section>

    <section style="padding:5rem 0;background:var(--muted);">
      <div class="container">
        <h2 style="font-size:2rem;margin-bottom:3rem;">More in ${label}</h2>
        <div class="products-grid" id="related-grid"></div>
        <div style="text-align:center;margin-top:3rem;">
          <a href="products.html" class="btn-dark">Browse Full Catalogue</a>
        </div>
      </div>
    </section>
  `;

  window.handleAddToCartDetail = function() { addToCart(product); };
  window.handleWishDetail = function() {
    const added = toggleWishlist(product);
    const btn = document.getElementById('pd-wish');
    const lbl = document.getElementById('pd-wish-label');
    if (btn) { btn.classList.toggle('wishlisted', added); btn.querySelector('svg').setAttribute('fill', added ? 'currentColor' : 'none'); }
    if (lbl) lbl.textContent = added ? 'Saved' : 'Save';
  };

  const thumbsEl = document.getElementById('thumbs');
  if (thumbsEl) {
    thumbsEl.addEventListener('click', e => {
      const thumb = e.target.closest('[data-idx]');
      if (!thumb) return;
      const idx = parseInt(thumb.dataset.idx);
      document.getElementById('main-img').src = product.images[idx];
      thumbsEl.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  }

  const relatedGrid = document.getElementById('related-grid');
  const related = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.slug !== product.slug).slice(0, 3);
  related.forEach(p => { relatedGrid.innerHTML += renderProductCard(p); });
  if (!related.length) { PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 3).forEach(p => { relatedGrid.innerHTML += renderProductCard(p); }); }

  initScrollAnimations();
  updateCartBadge(); updateWishBadge();
});
