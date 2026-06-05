document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header-placeholder').innerHTML = createHeader('projects.html');
  document.getElementById('footer-placeholder').innerHTML = createFooter();
  initHamburger();

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const main = document.getElementById('project-main');

  if (window.SheetsCMS && SheetsCMS.config.SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
    try {
      const sheetProjects = await SheetsCMS.getProjects();
      PROJECTS.length = 0; sheetProjects.forEach(p => PROJECTS.push(p));
    } catch (e) { console.warn('[Sheets CMS] project-detail — using local data:', e.message); }
  }

  const project = slug ? getProject(slug) : null;

  if (!project) {
    main.innerHTML = `
      <section style="padding:6rem 0;text-align:center;">
        <div class="container">
          <h1 style="font-family:var(--font-serif);font-size:2.5rem;margin-bottom:1.5rem;">Project Not Found</h1>
          <a href="projects.html" style="color:var(--accent);">Back to Projects</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${project.title} — Artisan & Co.`;

  const statsItems = [
    { icon: briefcaseIcon(), label: 'Industry', value: project.industry },
    { icon: pinIcon(), label: 'Location', value: project.location },
    { icon: calendarIcon(), label: 'Completed', value: project.completionYear },
    project.area ? { icon: layersIcon(), label: 'Area', value: project.area } : null,
    project.timeline ? { icon: clockIcon(), label: 'Timeline', value: project.timeline } : null,
  ].filter(Boolean);

  const usedProducts = project.products
    ? PRODUCTS.filter(p => project.products.includes(p.slug))
    : [];

  main.innerHTML = `
    <!-- Hero -->
    <section class="project-hero">
      <img src="${project.image}" alt="${project.title}">
      <div class="project-hero-overlay"></div>
      <div class="project-hero-content">
        <div class="container">
          <div style="margin-bottom:0.75rem;">
            <span class="project-industry-badge">${project.industry}</span>
            ${project.completionYear ? `<span class="project-year-badge">${project.completionYear}</span>` : ''}
          </div>
          <h1>${project.title}</h1>
          <p class="project-hero-loc">${project.location}</p>
        </div>
      </div>
    </section>

    <section style="padding:4rem 0 5rem;">
      <div class="container" style="max-width:1100px;">
        <a href="projects.html" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Projects
        </a>

        <!-- Stats bar -->
        <div class="stats-bar" style="grid-template-columns:repeat(${statsItems.length},1fr);">
          ${statsItems.map(item => `
          <div class="stat-cell">
            <div class="stat-icon-label">${item.icon}<span>${item.label}</span></div>
            <div class="stat-val">${item.value}</div>
          </div>`).join('')}
        </div>

        <div class="project-detail-grid">
          <!-- Main content -->
          <div class="project-content">
            <div class="fade-up">
              <h2>Project Overview</h2>
              <p>${project.description}</p>
            </div>

            ${project.scope ? `
            <div class="fade-up delay-1">
              <h2>Scope of Work</h2>
              <p>${project.scope}</p>
            </div>` : ''}

            ${project.challenge ? `
            <div class="challenge-box fade-up delay-2">
              <p class="challenge-label">Key Challenge</p>
              <p>${project.challenge}</p>
            </div>` : ''}

            ${project.secondImage ? `
            <div class="second-img fade-up">
              <img src="${project.secondImage}" alt="${project.title} detail">
            </div>` : ''}

            ${project.clientTestimonial ? `
            <div class="testimonial-box fade-up">
              <div class="quote-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
              </div>
              <p class="testimonial-text">"${project.clientTestimonial}"</p>
              ${project.clientName ? `<p class="testimonial-author">— ${project.clientName}</p>` : ''}
            </div>` : ''}
          </div>

          <!-- Sidebar -->
          <div class="project-sidebar">
            <div class="sidebar-details">
              <h3>Project Details</h3>
              ${project.clientName ? `<div class="detail-item"><dt>Client</dt><dd>${project.clientName}</dd></div>` : ''}
              ${project.furniturePieces ? `<div class="detail-item"><dt>Furniture Supplied</dt><dd>${project.furniturePieces}</dd></div>` : ''}
              ${project.timeline ? `<div class="detail-item"><dt>Project Timeline</dt><dd>${project.timeline}</dd></div>` : ''}
              ${project.area ? `<div class="detail-item"><dt>Total Area</dt><dd>${project.area}</dd></div>` : ''}
            </div>
            <div>
              <a href="enquiry.html" class="btn-enquiry" style="display:block;text-align:center;">REQUEST A SIMILAR PROJECT</a>
              <a href="projects.html" class="btn-back-products" style="display:block;text-align:center;margin-top:0.75rem;">View All Projects</a>
            </div>
          </div>
        </div>

        ${usedProducts.length ? `
        <div style="margin-top:4rem;padding-top:3rem;border-top:1px solid var(--border);">
          <h2 style="font-size:1.75rem;margin-bottom:0.5rem;" class="fade-up">Products Used in This Project</h2>
          <p style="font-size:0.875rem;color:var(--muted-foreground);margin-bottom:2rem;" class="fade-up delay-1">Furniture pieces specified and supplied by Artisan & Co. for this commission.</p>
          <div class="products-grid" id="used-products-grid"></div>
          <div style="text-align:center;margin-top:2.5rem;">
            <a href="products.html" class="btn-dark fade-up">Browse Full Catalogue</a>
          </div>
        </div>` : ''}
      </div>
    </section>
  `;

  /* Render used products */
  if (usedProducts.length) {
    const grid = document.getElementById('used-products-grid');
    usedProducts.forEach(p => { grid.innerHTML += renderProductCard(p); });
  }

  initScrollAnimations();
});

function briefcaseIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`;
}
function pinIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
}
function calendarIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
}
function layersIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
}
function clockIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
}
