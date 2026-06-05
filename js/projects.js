document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('projects.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const gridEl = document.getElementById('projects-grid');
  const listEl = document.getElementById('projects-list');
  const viewGrid = document.getElementById('view-grid');
  const viewList = document.getElementById('view-list');
  const filterEl = document.getElementById('industry-filter');

  let currentView = 'grid';
  let activeIndustry = 'all';

  const industries = ['all', ...new Set(PROJECTS.map(p => p.industry))];

  function renderFilters() {
    filterEl.innerHTML = industries.map(ind =>
      `<button class="filter-btn ${activeIndustry === ind ? 'active' : ''}" data-industry="${ind}">
        ${ind === 'all' ? 'All Industries' : ind}
      </button>`
    ).join('');
  }

  function filteredProjects() {
    return activeIndustry === 'all' ? PROJECTS : PROJECTS.filter(p => p.industry === activeIndustry);
  }

  function renderGrid() {
    gridEl.innerHTML = filteredProjects().map(p => renderProjectCard(p)).join('');
    listEl.innerHTML = '';
    initScrollAnimations();
  }

  function renderList() {
    listEl.innerHTML = filteredProjects().map(p => `
      <a href="project-detail.html?slug=${p.slug}" class="project-list-item fade-up">
        ${p.image ? `<img class="project-list-img" src="${p.image}" alt="${p.title}">` : ''}
        <div class="project-list-info">
          <div class="project-list-meta">
            <span class="project-industry">${p.industry}</span>
            <span style="color:var(--muted-foreground);font-size:0.75rem;">·</span>
            <span class="project-year">${p.completionYear}</span>
          </div>
          <h3>${p.title}</h3>
          <p class="project-list-location">${p.location}</p>
          ${p.scope ? `<p class="project-list-scope">${p.scope}</p>` : ''}
          ${p.furniturePieces ? `<p class="project-pieces">${p.furniturePieces}</p>` : ''}
        </div>
      </a>`).join('');
    gridEl.innerHTML = '';
    initScrollAnimations();
  }

  filterEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-industry]');
    if (!btn) return;
    activeIndustry = btn.dataset.industry;
    renderFilters();
    currentView === 'grid' ? renderGrid() : renderList();
  });

  viewGrid.addEventListener('click', () => {
    currentView = 'grid';
    viewGrid.classList.add('active');
    viewList.classList.remove('active');
    gridEl.style.display = 'grid';
    listEl.style.display = 'none';
    renderGrid();
  });

  viewList.addEventListener('click', () => {
    currentView = 'list';
    viewList.classList.add('active');
    viewGrid.classList.remove('active');
    listEl.style.display = 'flex';
    gridEl.style.display = 'none';
    renderList();
  });

  async function initWithData() {
    if (window.SheetsCMS && SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
      try {
        const sheetProjects = await SheetsCMS.getProjects();
        PROJECTS.length = 0; sheetProjects.forEach(p => PROJECTS.push(p));
      } catch (e) {
        console.warn('[Sheets CMS] Projects page — using local data:', e.message);
      }
    }
    renderFilters();
    renderGrid();
    initScrollAnimations();
  }

  initWithData();
});
