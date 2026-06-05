document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('index.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  /* Categories grid */
  const catGrid = document.getElementById('cat-grid');
  CATEGORIES.forEach((cat, i) => {
    const delay = i < 6 ? `delay-${(i % 6) + 1}` : '';
    catGrid.innerHTML += `
      <div class="fade-up ${delay}">
        <a href="category.html?id=${cat.id}" class="cat-card">
          <div class="cat-line"></div>
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
          <div class="cat-browse">Browse</div>
        </a>
      </div>`;
  });

  /* ── Load from Sheets then render ── */
  async function initHome() {
    if (window.SheetsCMS && SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
      try {
        const [sp, sj] = await Promise.all([SheetsCMS.getProducts(), SheetsCMS.getProjects()]);
        PRODUCTS.length = 0; sp.forEach(p => PRODUCTS.push(p));
        PROJECTS.length = 0; sj.forEach(p => PROJECTS.push(p));
      } catch (e) { console.warn('[Sheets CMS] Home — using local data:', e.message); }
    }

    /* Featured products */
    const featuredGrid = document.getElementById('featured-products');
    getProducts({ featured: true }).slice(0, 6).forEach((p, i) => {
      const div = document.createElement('div');
      div.innerHTML = renderProductCard(p);
      const card = div.firstElementChild;
      card.classList.add(`delay-${(i % 3) + 1}`);
      featuredGrid.appendChild(card);
    });

    /* Featured projects */
    const projGrid = document.getElementById('featured-projects');
    getProjects({ featured: true }).slice(0, 3).forEach(p => {
      projGrid.innerHTML += renderProjectCard(p);
    });

    initScrollAnimations();
  }

  initHome();

  /* ── Performance: lazy loading + WebP for all non-hero images ── */
  const heroImg = document.querySelector('.hero-bg img');
  document.querySelectorAll('img').forEach(img => {
    if (img === heroImg) {
      img.setAttribute('fetchpriority', 'high');
      img.removeAttribute('loading');
    } else {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    }
    /* Upgrade Unsplash URLs to WebP if not already */
    if (img.src && img.src.includes('unsplash.com') && !img.src.includes('fm=webp')) {
      img.src = img.src + '&fm=webp';
    }
  });
});

/* ── Buying Guide tabs ── */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.bg-tab');
  const panels = document.querySelectorAll('.bg-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('bg-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});
