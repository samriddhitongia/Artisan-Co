document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('products.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const grid = document.getElementById('products-grid');
  const noProducts = document.getElementById('no-products');
  const countEl = document.getElementById('products-count');
  const sidebarCats = document.getElementById('sidebar-cats');
  const sidebarSort = document.getElementById('sidebar-sort');
  const searchInput = document.getElementById('sidebar-search-input');

  let activeFilter = 'all';
  let activeSort = 'featured';
  let searchQuery = '';
  let activeFinish = 'all';
  let activePriceRange = 'all';
  let activeMaterial = 'all';

  // Build category list for sidebar
  function renderSidebarCats() {
    const allCount = PRODUCTS.length;
    let html = `<button class="cat-filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-cat="all">
      <span>All Categories</span><span class="cat-count">(${allCount})</span>
    </button>`;
    CATEGORIES.forEach(cat => {
      const count = PRODUCTS.filter(p => p.categoryId === cat.id).length;
      if (!count) return;
      html += `<button class="cat-filter-btn ${activeFilter === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.name}</span><span class="cat-count">(${count})</span>
      </button>`;
    });
    sidebarCats.innerHTML = html;
    sidebarCats.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.cat;
        renderSidebarCats();
        renderGrid();
      });
    });
  }

  // Sort buttons
  sidebarSort.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeSort = btn.dataset.sort;
      sidebarSort.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });

  // Search
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderGrid();
  });

  // Finish / colour filter
  document.getElementById('sidebar-finish').addEventListener('click', e => {
    const btn = e.target.closest('[data-finish]');
    if (!btn) return;
    activeFinish = btn.dataset.finish;
    document.querySelectorAll('[data-finish]').forEach(b => b.classList.toggle('active', b.dataset.finish === activeFinish));
    renderGrid();
  });

  // Price range filter
  document.getElementById('sidebar-price').addEventListener('click', e => {
    const btn = e.target.closest('[data-price]');
    if (!btn) return;
    activePriceRange = btn.dataset.price;
    document.querySelectorAll('[data-price]').forEach(b => b.classList.toggle('active', b.dataset.price === activePriceRange));
    renderGrid();
  });

  // Material filter
  document.getElementById('sidebar-material').addEventListener('click', e => {
    const btn = e.target.closest('[data-material]');
    if (!btn) return;
    activeMaterial = btn.dataset.material;
    document.querySelectorAll('[data-material]').forEach(b => b.classList.toggle('active', b.dataset.material === activeMaterial));
    renderGrid();
  });

  // Clear all filters button
  document.getElementById('btn-clear-filters').addEventListener('click', () => {
    activeFilter = 'all';
    activeFinish = 'all';
    activePriceRange = 'all';
    activeMaterial = 'all';
    searchQuery = '';
    searchInput.value = '';
    document.querySelectorAll('[data-finish]').forEach(b => b.classList.toggle('active', b.dataset.finish === 'all'));
    document.querySelectorAll('[data-price]').forEach(b => b.classList.toggle('active', b.dataset.price === 'all'));
    document.querySelectorAll('[data-material]').forEach(b => b.classList.toggle('active', b.dataset.material === 'all'));
    renderSidebarCats();
    renderGrid();
  });

  // ── Filter helpers ───────────────────────────────────────────────────────────
  function matchesFinish(p) {
    if (activeFinish === 'all') return true;
    const m = (p.material || '').toLowerCase();
    if (activeFinish === 'wood')        return /teak|oak|walnut|wood|timber|sheesham|mango|veneer/.test(m);
    if (activeFinish === 'metal')       return /steel|aluminium|aluminum|iron|chrome|galvanised|powder.?coat|stainless/.test(m);
    if (activeFinish === 'upholstered') return /fabric|mesh|foam|velvet|polyester|woven|upholster|jersey|linen/.test(m);
    if (activeFinish === 'leather')     return /leather/.test(m);
    if (activeFinish === 'marble')      return /marble|stone|granite|terrazzo|concrete/.test(m);
    return true;
  }

  function matchesPriceRange(p) {
    if (activePriceRange === 'all') return true;
    const price = typeof getProductPrice === 'function' ? getProductPrice(p.slug) : null;
    if (!price) return false;
    if (activePriceRange === 'under25')  return price < 25000;
    if (activePriceRange === '25to75')   return price >= 25000 && price < 75000;
    if (activePriceRange === '75to200')  return price >= 75000 && price < 200000;
    if (activePriceRange === 'above200') return price >= 200000;
    return true;
  }

  function matchesMaterial(p) {
    if (activeMaterial === 'all') return true;
    const m = (p.material || '').toLowerCase();
    if (activeMaterial === 'wood')     return /teak|oak|walnut|wood|timber|sheesham|mango|veneer/.test(m);
    if (activeMaterial === 'metal')    return /steel|aluminium|aluminum|iron|chrome|stainless/.test(m);
    if (activeMaterial === 'fabric')   return /fabric|mesh|foam|velvet|polyester|woven|upholster/.test(m);
    if (activeMaterial === 'leather')  return /leather/.test(m);
    if (activeMaterial === 'marble')   return /marble|stone|granite|terrazzo/.test(m);
    if (activeMaterial === 'plastic')  return /polypropylene|plastic|nylon|abs|resin|acrylic/.test(m);
    return true;
  }

  function getSorted(arr) {
    const copy = [...arr];
    if (activeSort === 'featured') {
      return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (activeSort === 'trending') {
      return copy.sort((a, b) => b.id - a.id);
    } else if (activeSort === 'az') {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === 'za') {
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (activeSort === 'price-asc') {
      return copy.sort((a, b) => {
        const pa = getProductPrice(a.slug) || 999999999;
        const pb = getProductPrice(b.slug) || 999999999;
        return pa - pb;
      });
    } else if (activeSort === 'price-desc') {
      return copy.sort((a, b) => {
        const pa = getProductPrice(a.slug) || 0;
        const pb = getProductPrice(b.slug) || 0;
        return pb - pa;
      });
    }
    return copy;
  }

  function renderGrid() {
    let filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.categoryId === activeFilter);
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.material.toLowerCase().includes(searchQuery) ||
        p.shortDescription.toLowerCase().includes(searchQuery) ||
        getCategoryLabel(p.categoryId).toLowerCase().includes(searchQuery)
      );
    }
    filtered = filtered.filter(matchesFinish).filter(matchesPriceRange).filter(matchesMaterial);
    filtered = getSorted(filtered);
    grid.innerHTML = '';
    const hasActiveFilter = activeFilter !== 'all' || activeFinish !== 'all' || activePriceRange !== 'all' || activeMaterial !== 'all' || searchQuery;
    document.getElementById('btn-clear-filters').style.display = hasActiveFilter ? 'inline-flex' : 'none';
    if (!filtered.length) {
      noProducts.style.display = 'block';
      countEl.innerHTML = 'Showing <strong>0</strong> products';
      return;
    }
    noProducts.style.display = 'none';
    countEl.innerHTML = `Showing <strong>${filtered.length}</strong> product${filtered.length !== 1 ? 's' : ''}`;
    filtered.forEach((p, i) => {
      const div = document.createElement('div');
      div.innerHTML = renderProductCard(p);
      const card = div.firstElementChild;
      card.classList.add(`delay-${(i % 3) + 1}`);
      grid.appendChild(card);
    });
    initScrollAnimations();
  }

  // ── Load from Sheets (falls back to local PRODUCTS/CATEGORIES if not configured) ──
  async function initWithData() {
    if (window.SheetsCMS && SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
      try {
        const [sheetProducts, sheetCats] = await Promise.all([
          SheetsCMS.getProducts(),
          SheetsCMS.getCategories(),
        ]);
        // Merge into the global arrays so all existing code works unchanged
        PRODUCTS.length = 0;  sheetProducts.forEach(p => PRODUCTS.push(p));
        CATEGORIES.length = 0; sheetCats.forEach(c => CATEGORIES.push(c));
      } catch (e) {
        console.warn('[Sheets CMS] Products page — using local data:', e.message);
      }
    }
    renderSidebarCats();
    renderGrid();
    initScrollAnimations();
  }

  initWithData();
});
