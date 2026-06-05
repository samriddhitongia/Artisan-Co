/* ── Cart & Wishlist Store (localStorage) ── */

const CART_KEY = 'artisan_cart';
const WISH_KEY = 'artisan_wishlist';
const AUTH_KEY = 'artisan_user';

/* ── AUTH ── */
function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}
function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}
function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}
function isLoggedIn() {
  return !!getUser();
}

/* ── CART ── */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.slug === product.slug);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    const price = getProductPrice(product.slug);
    cart.push({ slug: product.slug, name: product.name, image: product.images?.[0] || '', price, qty, categoryId: product.categoryId });
  }
  saveCart(cart);
  showToast(`"${product.name}" added to cart`);
}
function removeFromCart(slug) {
  saveCart(getCart().filter(i => i.slug !== slug));
}
function updateCartQty(slug, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.slug === slug);
  if (idx > -1) { if (qty <= 0) { cart.splice(idx, 1); } else { cart[idx].qty = qty; } }
  saveCart(cart);
}
function getCartTotal() {
  return getCart().reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);
}
function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

/* ── WISHLIST ── */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch { return []; }
}
function saveWishlist(list) {
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  updateWishBadge();
}
function toggleWishlist(product) {
  const list = getWishlist();
  const idx = list.findIndex(i => i.slug === product.slug);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast(`Removed from wishlist`);
  } else {
    const price = getProductPrice(product.slug);
    list.push({ slug: product.slug, name: product.name, image: product.images?.[0] || '', price, categoryId: product.categoryId });
    showToast(`"${product.name}" added to wishlist ♥`);
  }
  saveWishlist(list);
  return idx === -1;
}
function isWishlisted(slug) {
  return getWishlist().some(i => i.slug === slug);
}

/* ── BADGE UPDATES ── */
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    const count = getCartCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}
function updateWishBadge() {
  document.querySelectorAll('.wish-badge').forEach(el => {
    const count = getWishlist().length;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  let t = document.getElementById('store-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'store-toast';
    t.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(100px);background:var(--foreground);color:var(--background);padding:0.75rem 1.5rem;border-radius:6px;font-size:0.875rem;z-index:9999;transition:transform 0.35s cubic-bezier(.4,0,.2,1),opacity 0.35s;opacity:0;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.2)`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(100px)'; t.style.opacity = '0'; }, 3000);
}

/* ── AUTH GUARD ── */
function requireAuth(redirectBack = true) {
  if (!isLoggedIn()) {
    const back = redirectBack ? `?redirect=${encodeURIComponent(window.location.href)}` : '';
    window.location.href = `login.html${back}`;
    return false;
  }
  return true;
}
