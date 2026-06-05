document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('search.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const searchIconSvg = document.getElementById('search-icon-svg');
  const metaEl = document.getElementById('search-meta');
  const suggestTags = document.getElementById('suggest-tags');
  const tabsEl = document.getElementById('search-tabs');
  const idleState = document.getElementById('idle-state');
  const emptyState = document.getElementById('empty-state');
  const emptyMsg = document.getElementById('empty-msg');

  const panelProducts = document.getElementById('panel-products');
  const panelProjects = document.getElementById('panel-projects');
  const panelAll = document.getElementById('panel-all');

  const resultsProducts = document.getElementById('results-products');
  const resultsProjects = document.getElementById('results-projects');
  const resultsAllProducts = document.getElementById('results-all-products');
  const resultsAllProjects = document.getElementById('results-all-projects');

  const tabCountProducts = document.getElementById('tab-count-products');
  const tabCountProjects = document.getElementById('tab-count-projects');
  const tabCountAll = document.getElementById('tab-count-all');

  let currentTab = 'products';
  let currentQuery = '';
  let debounceTimer = null;

  /* Pre-fill from URL ?q= */
  const urlParams = new URLSearchParams(window.location.search);
  const initialQ = urlParams.get('q');
  if (initialQ) {
    input.value = initialQ;
    runSearch(initialQ);
  }

  /* Search input */
  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearBtn.style.display = q ? 'block' : 'none';
    searchIconSvg.style.display = q ? 'none' : 'block';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runSearch(q), 220);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    searchIconSvg.style.display = 'block';
    runSearch('');
    input.focus();
  });

  /* Suggest tags */
  suggestTags.addEventListener('click', e => {
    const tag = e.target.closest('[data-q]');
    if (!tag) return;
    input.value = tag.dataset.q;
    clearBtn.style.display = 'block';
    searchIconSvg.style.display = 'none';
    runSearch(tag.dataset.q);
  });

  /* Tab switching */
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    currentTab = btn.dataset.tab;
    tabsEl.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    showPanel(currentTab);
  });

  function showPanel(tab) {
    panelProducts.style.display = tab === 'products' ? 'block' : 'none';
    panelProjects.style.display = tab === 'projects' ? 'block' : 'none';
    panelAll.style.display = tab === 'all' ? 'block' : 'none';
  }

  function runSearch(q) {
    currentQuery = q;
    if (!q) {
      showIdle();
      return;
    }
    updateUrl(q);
    const { products, projects } = searchAll(q);
    const total = products.length + projects.length;

    if (!total) {
      showEmpty(q);
      return;
    }

    /* Update tab counts */
    tabCountProducts.textContent = products.length;
    tabCountProjects.textContent = projects.length;
    tabCountAll.textContent = total;
    tabsEl.style.display = 'flex';
    idleState.style.display = 'none';
    emptyState.style.display = 'none';
    suggestTags.style.display = 'none';

    /* Default tab: products if any, else projects */
    if (currentTab === 'products' && !products.length && projects.length) {
      currentTab = 'projects';
      tabsEl.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tabsEl.querySelector('[data-tab="projects"]').classList.add('active');
    }

    showPanel(currentTab);

    /* Render products panel */
    resultsProducts.innerHTML = '';
    if (products.length) {
      products.forEach(p => { resultsProducts.innerHTML += renderProductCard(p); });
    } else {
      resultsProducts.innerHTML = `<p style="color:var(--muted-foreground);padding:2rem 0;">No products matched — <a href="#" class="switch-tab" data-tab="projects" style="color:var(--accent);">see ${projects.length} project${projects.length !== 1 ? 's' : ''}</a></p>`;
    }

    /* Render projects panel */
    resultsProjects.innerHTML = projects.length
      ? projects.map(renderProjectSearchCard).join('')
      : `<p style="color:var(--muted-foreground);padding:2rem 0;">No projects matched — <a href="#" class="switch-tab" data-tab="products" style="color:var(--accent);">see ${products.length} product${products.length !== 1 ? 's' : ''}</a></p>`;

    /* Render all panel */
    if (products.length) {
      resultsAllProducts.innerHTML = `<h2 style="font-family:var(--font-serif);font-size:1.5rem;margin:0 0 1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Products <span style="font-size:1rem;color:var(--muted-foreground);font-family:var(--font-sans);">(${products.length})</span></h2><div class="products-grid">${products.slice(0, 6).map(p => renderProductCard(p)).join('')}</div>`;
    } else {
      resultsAllProducts.innerHTML = '';
    }
    if (projects.length) {
      resultsAllProjects.innerHTML = `<h2 style="font-family:var(--font-serif);font-size:1.5rem;margin:2.5rem 0 1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);">Projects <span style="font-size:1rem;color:var(--muted-foreground);font-family:var(--font-sans);">(${projects.length})</span></h2>${projects.slice(0, 5).map(renderProjectSearchCard).join('')}`;
    } else {
      resultsAllProjects.innerHTML = '';
    }

    metaEl.textContent = `${total} result${total !== 1 ? 's' : ''} for "${q}"`;
    initScrollAnimations();

    /* Inline switch-tab links */
    document.querySelectorAll('.switch-tab').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.dataset.tab;
        currentTab = tab;
        tabsEl.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        tabsEl.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        showPanel(tab);
      });
    });
  }

  function showIdle() {
    tabsEl.style.display = 'none';
    panelProducts.style.display = 'block';
    panelProjects.style.display = 'none';
    panelAll.style.display = 'none';
    resultsProducts.innerHTML = '';
    idleState.style.display = 'block';
    emptyState.style.display = 'none';
    suggestTags.style.display = 'flex';
    metaEl.textContent = `100 products across 14 categories · 20 projects`;
  }

  function showEmpty(q) {
    tabsEl.style.display = 'none';
    panelProducts.style.display = 'block';
    panelProjects.style.display = 'none';
    panelAll.style.display = 'none';
    resultsProducts.innerHTML = '';
    idleState.style.display = 'none';
    emptyState.style.display = 'block';
    emptyMsg.textContent = `No products or projects matched "${q}". Try a different term or browse by category.`;
    metaEl.textContent = `0 results for "${q}"`;
  }

  function updateUrl(q) {
    const url = new URL(window.location);
    if (q) { url.searchParams.set('q', q); } else { url.searchParams.delete('q'); }
    history.replaceState(null, '', url);
  }

  function renderProjectSearchCard(project) {
    return `
    <a href="project-detail.html?slug=${project.slug}" class="project-search-card fade-up">
      ${project.image ? `<img class="project-search-img" src="${project.image}" alt="${project.title}" loading="lazy">` : ''}
      <div class="project-search-info">
        <div class="project-search-meta">
          <span class="project-industry">${project.industry}</span>
          <span style="color:var(--muted-foreground);font-size:0.75rem;">·</span>
          <span style="font-size:0.75rem;color:var(--muted-foreground);">${project.completionYear || ''}</span>
          <span style="color:var(--muted-foreground);font-size:0.75rem;">·</span>
          <span style="font-size:0.75rem;color:var(--muted-foreground);">${project.location}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </a>`;
  }
});
