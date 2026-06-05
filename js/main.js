/* ── Shared utilities, nav, footer, scroll animations ── */

function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    }
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  }));
}

function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up:not(.visible), .fade-left:not(.visible), .fade-right:not(.visible)');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

function createHeader(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'products.html', label: 'Products' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'blog.html', label: 'Journal' },
    { href: 'contact.html', label: 'Contact' },
  ];
  const navLinks = pages.map(p =>
    `<a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  const user = typeof getUser === 'function' ? getUser() : null;
  const userSection = user
    ? `<div class="user-menu-wrap">
        <button class="user-menu-btn" onclick="toggleUserMenu()">
          <span class="user-avatar">${user.name?.[0]?.toUpperCase() || 'U'}</span>
        </button>
        <div class="user-dropdown" id="user-dropdown">
          <div class="user-dropdown-name">${user.name}</div>
          <a href="wishlist.html">My Wishlist</a>
          <a href="cart.html">My Cart</a>
          <a href="enquiry-analytics.html">Enquiry Analytics</a>
          ${user.role === 'admin' ? '<a href="admin.html" style="color:#c8a96e;font-weight:600;">⚙ CMS Admin</a>' : ''}
          <button onclick="logoutUser();window.location.reload()">Sign Out</button>
        </div>
      </div>`
    : `<a href="login.html" class="btn-auth">Sign In</a>`;

  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="logo">Artisan & Co.</a>
      <nav class="main-nav">
        ${navLinks}
        <a href="search.html" class="search-nav-btn${activePage === 'search.html' ? ' active' : ''}" aria-label="Search" title="Search products &amp; projects" style="padding:0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </a>
      </nav>
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <a href="wishlist.html" class="header-icon-btn" title="Wishlist" style="position:relative;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span class="wish-badge" style="display:none;position:absolute;top:-6px;right:-6px;background:#c0392b;color:#fff;border-radius:50%;width:16px;height:16px;font-size:10px;align-items:center;justify-content:center;font-weight:600;"></span>
        </a>
        <a href="cart.html" class="header-icon-btn" title="Cart" style="position:relative;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge" style="display:none;position:absolute;top:-6px;right:-6px;background:var(--accent);color:var(--foreground);border-radius:50%;width:16px;height:16px;font-size:10px;align-items:center;justify-content:center;font-weight:600;"></span>
        </a>
        <a href="quote-builder.html" class="btn-quote" style="margin-left:0.25rem;">Quote Builder</a>
        ${userSection}
        <button class="hamburger" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav">
      ${mobileLinks}
      <a href="search.html">Search</a>
      <a href="wishlist.html">Wishlist</a>
      <a href="cart.html">Cart</a>
      <a href="quote-builder.html" class="btn-quote">Quote Builder</a>
      ${user ? `<button onclick="logoutUser();window.location.reload()" style="padding:0.5rem;background:none;border:none;cursor:pointer;color:var(--muted-foreground);text-align:left;">Sign Out (${user.name})</button>` : `<a href="login.html">Sign In / Register</a>`}
    </div>
  </header>`;
}

function toggleUserMenu() {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu-wrap')) {
    document.getElementById('user-dropdown')?.classList.remove('open');
  }
});

function createFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">Artisan & Co.</div>
          <p>Bespoke furniture crafted in Indore for architects, designers, and discerning clients across India.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="products.html">All Products</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="blog.html">Journal</a></li>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="search.html">Search</a></li>
            <li><a href="quote-builder.html">Quote Builder</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><a href="category.html?id=chair">Chairs</a></li>
            <li><a href="category.html?id=sofas">Sofas</a></li>
            <li><a href="category.html?id=workstations">Workstations</a></li>
            <li><a href="category.html?id=outdoor-furniture">Outdoor</a></li>
            <li><a href="category.html?id=hospital-furniture">Hospital</a></li>
            <li><a href="products.html">All 14 categories →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Palasia, Indore, India</li>
            <li>info@artisanco.in</li>
            <li>+91 731 234 5678</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Artisan & Co. All rights reserved.</p>
        <div class="footer-social">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Pinterest</span>
        </div>
      </div>
    </div>
  </footer>`;
}

function renderProductCard(product) {
  const label = getCategoryLabel(product.categoryId);
  const img = product.images?.[0];
  const price = typeof getProductPrice === 'function' ? getProductPrice(product.slug) : null;
  const priceStr = typeof formatPrice === 'function' ? formatPrice(price) : '';
  const wishlisted = typeof isWishlisted === 'function' ? isWishlisted(product.slug) : false;
  return `
  <div class="product-card fade-up">
    <a href="product-detail.html?slug=${product.slug}" class="product-card-img">
      ${img ? `<img src="${img}" alt="${product.name}" loading="lazy">` : `<div style="width:100%;height:100%;background:var(--secondary);display:flex;align-items:center;justify-content:center;font-style:italic;color:var(--muted-foreground);font-family:var(--font-serif)">No image</div>`}
      <span class="product-card-badge">${label}</span>
      <button class="product-wish-btn ${wishlisted ? 'wishlisted' : ''}" onclick="event.preventDefault();event.stopPropagation();handleWishlistToggle(this,'${product.slug}')" title="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </a>
    <div>
      <a href="product-detail.html?slug=${product.slug}"><h3>${product.name}</h3></a>
      <p class="material">${product.material}</p>
      <p class="short-desc">${product.shortDescription}</p>
      ${priceStr ? `<p class="product-price">${priceStr}</p>` : ''}
      <div class="product-card-meta">
        <span class="availability">${product.availability}</span>
        <a href="product-detail.html?slug=${product.slug}" class="view-details">View Details →</a>
      </div>
      <button class="btn-add-to-cart" onclick="handleAddToCart('${product.slug}')">Add to Cart</button>
    </div>
  </div>`;
}

function handleWishlistToggle(btn, slug) {
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) return;
  const added = toggleWishlist(product);
  btn.classList.toggle('wishlisted', added);
  const svg = btn.querySelector('svg');
  if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
}

function handleAddToCart(slug) {
  const product = PRODUCTS.find(p => p.slug === slug);
  if (product) addToCart(product);
}

function renderProjectCard(project) {
  return `
  <a href="project-detail.html?slug=${project.slug}" class="project-card">
    ${project.image ? `<img src="${project.image}" alt="${project.title}" loading="lazy">` : `<div style="width:100%;height:100%;background:var(--secondary)"></div>`}
    <div class="project-card-overlay"></div>
    <div class="project-card-info">
      <span class="project-card-location">${project.location}</span>
      <h3 class="project-card-title">${project.title}</h3>
    </div>
  </a>`;
}

// ── Toast notification ────────────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:0.5rem;align-items:center;pointer-events:none;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const bg = type === 'success' ? '#1a1a1a' : type === 'error' ? '#c0392b' : '#2980b9';
  toast.style.cssText = `background:${bg};color:#fff;padding:0.85rem 1.5rem;border-radius:8px;font-size:0.9rem;box-shadow:0 4px 20px rgba(0,0,0,0.25);pointer-events:auto;max-width:420px;text-align:center;line-height:1.4;opacity:0;transform:translateY(12px);transition:all 0.3s ease;`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initScrollAnimations();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  if (typeof updateWishBadge === 'function') updateWishBadge();
});
