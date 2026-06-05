/**
 * ══════════════════════════════════════════════════════════════
 *  ARTISAN & CO. — Google Sheets CMS
 *  Bi-directional sync between the website and Google Sheets.
 *
 *  SETUP STEPS (see SHEETS_SETUP_GUIDE.md for full details):
 *  1. Create a Google Cloud project & enable Sheets API
 *  2. Create a Service Account → download JSON key
 *  3. Share your spreadsheet with the service account email
 *  4. Paste your config below in SHEETS_CONFIG
 * ══════════════════════════════════════════════════════════════
 */

const SHEETS_CONFIG = {
  // ── Replace these with your actual values ──────────────────
  SPREADSHEET_ID: '1ux3Fmc2KDOwQJgzbc4dYmYqSYpUZ0pe0_01nG3ijdZA',   // from the Sheets URL
  API_BASE: 'https://sheets.googleapis.com/v4/spreadsheets',

  // Service-account credentials (keep this private / env variable in production)
  SERVICE_ACCOUNT: {
    client_email: 'furnituresam@furnituresam.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4dvXQUy8sBOij\nOT2FAcZtMqljnXzU25Kr32U/db+BSMtvVU5BShjQnucNH0yKAfZ942fxENFKZqLH\nUjTNwIizhYHQ/2msY6NOAOPH1aKoc/41PhVT6246GC2HVbTKyk90tt5oTvrHjz7O\nzWh9Pre8ezQazFQ7swzIXsKFHIdtDBvmraLmjNhddG7YR3Dp/LJxDLTp0hE4MxH5\n11HMovSpUX69ZLsnfRLUGOLnM76hiku01iwWIrSxSjSALNXy7xPEUnedkrxdB83B\nSv6VqyScFU45jQm9/+ymqvxsqjJ9u/Y5RK/CdvoZ1GV92tQvsqb54R1e7iGtdXwj\ntv0MJR//AgMBAAECggEALvCuqr2QQm5ZWLfHLOJ/wOfkbOH1kyDw2OW3GQf4nIiO\npB0cFccqO2REPXWaf3/yXqSQnap+56TohTopD7aP0scFes6T8HdGZiIZ1I9Lnfwu\nUxQiT0GYwhXG+CpaIESNJZEnVXnLnR6Zh/yDO2PLU54yayNVx/9PIGnkrATPfXLp\ndVl0YdE7NuF5RYLxZtBYOUEKFqvw4xFcl+HBGvdxDVpmhUyzLek9zxpnHQfhlJn6\nG5hx7C0x1qSYCt8lcpjv20aMrezfWusYWNpBfXdZJKXebKDL6XehL99tzSaHUnP8\nqKrTTEC4Vt+4hk5WbU0ELU3602DHupB8NLCxUdX9yQKBgQDqwD3efsFbZFXCRT5c\n35cczAhifRJXurN3/AJpRy3VA1otcbbBFsIidsoq2lzNC2WA+yjTkEXkWbSkuYTW\nnoeDUHZUoKvjODgUOSKunvvktalMGy7RpswoOe3eITie0MCSM8Evhf2Vq8FSbsse\nZVbJaXtCfU4o9aZceGdIuOs5lQKBgQDJKXZDu8iGaXWd7iMlDXx0yQ5HeA/Ql7Kp\nlXlIDTlhFy8uDjZ/JQhPRW8qooWzFlenCr/5K+gsR1Y3CwY+k991vU5EqNlxZKG+\n93w6anHuMIS8no55BOVoi15tHEwZXQQ/CD0Wuy1Cmo8tTsiIti53fmeaW5cskQ+p\nIUv1bwlWQwKBgBEW66od6i+gD0o0RkT2lganp9ibqFEwq04Jz5cgcmq2csMqKxbF\ndF6T7UXPXcAjm0EXh7JXJ29nRGpVgyEoq07Y9bRVeg3xksuOGUNDGa1duDRtKixj\nCyvGg9WO75NIOSyrjd3K0FosBcfdfvX4hKfnAO0nOCBtOa4zqbk2lRE9AoGBAL79\nZbLThITRdgFXSvjv//0lsy/59xH2JYRLTZYyMAtVps7UYbt/3o7c/rn9CnHJQblw\nRGp/3HTF2j5yciBR53TzIm+f3KuDfupAMSuJSth6KlynMeAG3QTQZfu0RTBDlzd9\nS/rcBhHZixzaUx0x05ZSZm0wjqyaocLTwTmqjbPfAoGAaP0sWx6DeU6HRjsDKa2q\n/RqKFQJfwgi0s7EsSZB5dtwP1/wx+MbNAZOdo7DZgqcLoJsnzYDbdRNvfacpEZ13\nUMjrdUdHQ7YOlmkOxbXV8VKQNqUqe0MqEzoIPFn4ZYNjY2KU9lMYan58eMacEM6m\ndZ4BdFLhyo2ae9lpp56Kb40=\n-----END PRIVATE KEY-----\n',
  },

  // Sheet / tab names — match exactly what you name them in Sheets
  TABS: {
    PRODUCTS:   'Products',
    PROJECTS:   'Projects',
    CATEGORIES: 'Categories',
    SETTINGS:   'Settings',
    USERS:      'Users',
    ENQUIRIES:  'Enquiries',
  },

  // Cache TTL in milliseconds (5 minutes default)
  CACHE_TTL_MS: 5 * 60 * 1000,
};

// ── Internal cache ─────────────────────────────────────────────
const _cache = {};

function _cacheSet(key, data) {
  _cache[key] = { data, ts: Date.now() };
}
function _cacheGet(key) {
  const hit = _cache[key];
  if (!hit) return null;
  if (Date.now() - hit.ts > SHEETS_CONFIG.CACHE_TTL_MS) { delete _cache[key]; return null; }
  return hit.data;
}
function _cacheInvalidate(tab) {
  delete _cache[tab];
}

// ── JWT / OAuth helpers (browser-compatible) ───────────────────
async function _getAccessToken() {
  const cached = _cacheGet('__access_token');
  if (cached && cached.exp > Date.now()) return cached.token;

  const { client_email, private_key } = SHEETS_CONFIG.SERVICE_ACCOUNT;
  const now = Math.floor(Date.now() / 1000);
  const header  = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const b64url = s => btoa(unescape(encodeURIComponent(JSON.stringify(s))))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const signingInput = `${b64url(header)}.${b64url(payload)}`;

  // Import the RSA private key for signing
  const pemBody = private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
  const keyBin  = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyBin.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );

  const sigBuf  = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey,
    new TextEncoder().encode(signingInput)
  );
  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const jwt = `${signingInput}.${sig}`;

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Token fetch failed: ${err}`);
  }
  const { access_token, expires_in } = await resp.json();
  _cacheSet('__access_token', { token: access_token, exp: Date.now() + (expires_in - 60) * 1000 });
  return access_token;
}

// ── Low-level Sheets read/write ────────────────────────────────
async function _sheetsRead(range) {
  const token = await _getAccessToken();
  const url = `${SHEETS_CONFIG.API_BASE}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(range)}?valueRenderOption=UNFORMATTED_VALUE`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!resp.ok) throw new Error(`Sheets read error: ${resp.status} ${await resp.text()}`);
  const data = await resp.json();
  return data.values || [];
}

async function _sheetsWrite(range, values) {
  const token = await _getAccessToken();
  const url = `${SHEETS_CONFIG.API_BASE}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
  });
  if (!resp.ok) throw new Error(`Sheets write error: ${resp.status} ${await resp.text()}`);
  return await resp.json();
}

async function _sheetsAppend(sheetName, values) {
  const token = await _getAccessToken();
  const range = `${sheetName}!A1`;
  const url = `${SHEETS_CONFIG.API_BASE}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
  });
  if (!resp.ok) throw new Error(`Sheets append error: ${resp.status} ${await resp.text()}`);
  return await resp.json();
}

// ── Row ↔ Object mappers ───────────────────────────────────────

// Products tab columns (1-indexed in header row, 0-indexed in JS):
// id | slug | name | categoryId | material | shortDescription | description
// | images | finishes | dimensions | availability | featured | status | price | createdAt

const PRODUCT_COLS = ['id','slug','name','categoryId','material','shortDescription',
  'description','images','finishes','dimensions','availability','featured','status','price','createdAt'];

function _rowToProduct(row) {
  const p = {};
  PRODUCT_COLS.forEach((k, i) => { p[k] = row[i] !== undefined ? row[i] : ''; });
  p.id       = parseInt(p.id) || 0;
  p.images   = p.images   ? String(p.images).split('|').map(s => s.trim()).filter(Boolean)  : [];
  p.finishes = p.finishes ? String(p.finishes).split('|').map(s => s.trim()).filter(Boolean) : [];
  p.featured = String(p.featured).toLowerCase() === 'true';
  return p;
}
function _productToRow(p) {
  return PRODUCT_COLS.map(k => {
    if (k === 'images')   return (p.images   || []).join(' | ');
    if (k === 'finishes') return (p.finishes || []).join(' | ');
    if (k === 'featured') return p.featured ? 'true' : 'false';
    return p[k] !== undefined ? p[k] : '';
  });
}

// Projects tab columns:
const PROJECT_COLS = ['id','slug','title','location','industry','completionYear','image',
  'secondImage','description','scope','challenge','clientTestimonial','clientName',
  'furniturePieces','area','timeline','products','featured','createdAt'];

function _rowToProject(row) {
  const p = {};
  PROJECT_COLS.forEach((k, i) => { p[k] = row[i] !== undefined ? row[i] : ''; });
  p.id       = parseInt(p.id) || 0;
  p.products = p.products ? String(p.products).split('|').map(s => s.trim()).filter(Boolean) : [];
  p.featured = String(p.featured).toLowerCase() === 'true';
  return p;
}
function _projectToRow(p) {
  return PROJECT_COLS.map(k => {
    if (k === 'products') return (p.products || []).join(' | ');
    if (k === 'featured') return p.featured ? 'true' : 'false';
    return p[k] !== undefined ? p[k] : '';
  });
}

// Categories
const CATEGORY_COLS = ['id','name','description','heroImage','displayOrder'];
function _rowToCategory(row) {
  const c = {};
  CATEGORY_COLS.forEach((k, i) => { c[k] = row[i] !== undefined ? row[i] : ''; });
  c.displayOrder = parseInt(c.displayOrder) || 99;
  return c;
}
function _categoryToRow(c) {
  return CATEGORY_COLS.map(k => c[k] !== undefined ? c[k] : '');
}

// Settings  (key | value)
function _rowsToSettings(rows) {
  const s = {};
  rows.forEach(r => { if (r[0]) s[r[0]] = r[1] || ''; });
  return s;
}

// Users tab columns:
const USER_COLS = ['id','email','passwordHash','name','phone','company','role','createdAt','lastLogin','active'];
function _rowToUser(row) {
  const u = {};
  USER_COLS.forEach((k, i) => { u[k] = row[i] !== undefined ? row[i] : ''; });
  u.active = String(u.active).toLowerCase() !== 'false';
  return u;
}
function _userToRow(u) {
  return USER_COLS.map(k => u[k] !== undefined ? u[k] : '');
}

// Enquiries tab columns:
const ENQUIRY_COLS = ['id','name','email','phone','company','productSlug','message','status','createdAt'];
function _rowToEnquiry(row) {
  const e = {};
  ENQUIRY_COLS.forEach((k, i) => { e[k] = row[i] !== undefined ? row[i] : ''; });
  return e;
}

// ── Generic tab loader (first row = header) ────────────────────
async function _loadTab(tabName, mapper) {
  const cached = _cacheGet(tabName);
  if (cached) return cached;
  const rows = await _sheetsRead(`${tabName}!A2:ZZ`);
  const data = rows.filter(r => r[0] !== '' && r[0] !== undefined).map(mapper);
  _cacheSet(tabName, data);
  return data;
}

// ── PUBLIC API ─────────────────────────────────────────────────

/**
 * Initialize the sheet structure (writes headers to all tabs).
 * Call once from the admin panel to scaffold a new spreadsheet.
 */
async function sheetsInit() {
  const writes = [
    [SHEETS_CONFIG.TABS.PRODUCTS,   [PRODUCT_COLS]],
    [SHEETS_CONFIG.TABS.PROJECTS,   [PROJECT_COLS]],
    [SHEETS_CONFIG.TABS.CATEGORIES, [CATEGORY_COLS]],
    [SHEETS_CONFIG.TABS.SETTINGS,   [['key','value']]],
    [SHEETS_CONFIG.TABS.USERS,      [USER_COLS]],
    [SHEETS_CONFIG.TABS.ENQUIRIES,  [ENQUIRY_COLS]],
  ];
  for (const [tab, rows] of writes) {
    await _sheetsWrite(`${tab}!A1`, rows);
  }
}

// ── PRODUCTS ───────────────────────────────────────────────────
async function sheetsGetProducts({ categoryId, featured } = {}) {
  let list = await _loadTab(SHEETS_CONFIG.TABS.PRODUCTS, _rowToProduct);
  list = list.filter(p => p.status !== 'archived' && p.id > 0);
  if (categoryId) list = list.filter(p => p.categoryId === categoryId);
  if (featured === true) list = list.filter(p => p.featured);
  return list;
}
async function sheetsGetProduct(slug) {
  const list = await _loadTab(SHEETS_CONFIG.TABS.PRODUCTS, _rowToProduct);
  return list.find(p => p.slug === slug) || null;
}

/**
 * Upsert a product — updates existing row if id matches, appends if new.
 * Also updates the in-memory data.js PRODUCTS array so the website
 * reflects changes immediately without a page reload.
 */
async function sheetsUpsertProduct(product) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.PRODUCTS}!A2:ZZ`);
  let targetRow = -1;
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]) === String(product.id)) { targetRow = i + 2; break; } // +2: header + 0-index
  }
  const row = _productToRow(product);
  if (targetRow > 0) {
    await _sheetsWrite(`${SHEETS_CONFIG.TABS.PRODUCTS}!A${targetRow}`, [row]);
  } else {
    if (!product.id) product.id = Date.now();
    if (!product.createdAt) product.createdAt = new Date().toISOString();
    await _sheetsAppend(SHEETS_CONFIG.TABS.PRODUCTS, [_productToRow(product)]);
  }
  _cacheInvalidate(SHEETS_CONFIG.TABS.PRODUCTS);

  // Sync into in-memory PRODUCTS array (data.js)
  if (typeof PRODUCTS !== 'undefined') {
    const idx = PRODUCTS.findIndex(p => String(p.id) === String(product.id));
    if (idx > -1) PRODUCTS[idx] = { ...PRODUCTS[idx], ...product };
    else PRODUCTS.push(product);
  }
  return product;
}

async function sheetsDeleteProduct(id) {
  // We "soft-delete" by setting status = archived (avoids row shifting issues)
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.PRODUCTS}!A2:ZZ`);
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      const col = PRODUCT_COLS.indexOf('status') + 1; // 1-indexed
      await _sheetsWrite(`${SHEETS_CONFIG.TABS.PRODUCTS}!${String.fromCharCode(64 + col)}${i + 2}`, [['archived']]);
      break;
    }
  }
  _cacheInvalidate(SHEETS_CONFIG.TABS.PRODUCTS);
  if (typeof PRODUCTS !== 'undefined') {
    const idx = PRODUCTS.findIndex(p => String(p.id) === String(id));
    if (idx > -1) PRODUCTS.splice(idx, 1);
  }
}

// ── PROJECTS ───────────────────────────────────────────────────
async function sheetsGetProjects({ featured } = {}) {
  let list = await _loadTab(SHEETS_CONFIG.TABS.PROJECTS, _rowToProject);
  list = list.filter(p => p.id > 0);
  if (featured === true) list = list.filter(p => p.featured);
  return list;
}
async function sheetsGetProject(slug) {
  const list = await _loadTab(SHEETS_CONFIG.TABS.PROJECTS, _rowToProject);
  return list.find(p => p.slug === slug) || null;
}
async function sheetsUpsertProject(project) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.PROJECTS}!A2:ZZ`);
  let targetRow = -1;
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]) === String(project.id)) { targetRow = i + 2; break; }
  }
  const row = _projectToRow(project);
  if (targetRow > 0) {
    await _sheetsWrite(`${SHEETS_CONFIG.TABS.PROJECTS}!A${targetRow}`, [row]);
  } else {
    if (!project.id) project.id = Date.now();
    if (!project.createdAt) project.createdAt = new Date().toISOString();
    await _sheetsAppend(SHEETS_CONFIG.TABS.PROJECTS, [_projectToRow(project)]);
  }
  _cacheInvalidate(SHEETS_CONFIG.TABS.PROJECTS);
  if (typeof PROJECTS !== 'undefined') {
    const idx = PROJECTS.findIndex(p => String(p.id) === String(project.id));
    if (idx > -1) PROJECTS[idx] = { ...PROJECTS[idx], ...project };
    else PROJECTS.push(project);
  }
  return project;
}

// ── CATEGORIES ─────────────────────────────────────────────────
async function sheetsGetCategories() {
  const list = await _loadTab(SHEETS_CONFIG.TABS.CATEGORIES, _rowToCategory);
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}
async function sheetsUpsertCategory(cat) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.CATEGORIES}!A2:ZZ`);
  let targetRow = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === cat.id) { targetRow = i + 2; break; }
  }
  const row = _categoryToRow(cat);
  if (targetRow > 0) await _sheetsWrite(`${SHEETS_CONFIG.TABS.CATEGORIES}!A${targetRow}`, [row]);
  else await _sheetsAppend(SHEETS_CONFIG.TABS.CATEGORIES, [row]);
  _cacheInvalidate(SHEETS_CONFIG.TABS.CATEGORIES);
}

// ── SETTINGS ───────────────────────────────────────────────────
async function sheetsGetSettings() {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.SETTINGS}!A2:B200`);
  return _rowsToSettings(rows);
}
async function sheetsSetSetting(key, value) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.SETTINGS}!A2:B200`);
  let targetRow = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === key) { targetRow = i + 2; break; }
  }
  if (targetRow > 0) await _sheetsWrite(`${SHEETS_CONFIG.TABS.SETTINGS}!A${targetRow}`, [[key, value]]);
  else await _sheetsAppend(SHEETS_CONFIG.TABS.SETTINGS, [[key, value]]);
}

// ── USERS (Auth) ───────────────────────────────────────────────
async function _sheetsGetAllUsers() {
  return await _loadTab(SHEETS_CONFIG.TABS.USERS, _rowToUser);
}

/** Simple SHA-256 hash for passwords (stored in Sheets) */
async function _hashPassword(password) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Register a new user — writes to Sheets Users tab.
 * Returns { ok: true, user } or { ok: false, error }
 */
async function sheetsRegisterUser({ name, email, password, phone = '', company = '' }) {
  if (!name || !email || !password) return { ok: false, error: 'Name, email, and password are required.' };
  email = email.toLowerCase().trim();

  const users = await _sheetsGetAllUsers();
  if (users.find(u => u.email === email)) return { ok: false, error: 'An account with this email already exists.' };

  const passwordHash = await _hashPassword(password);
  const user = {
    id:           Date.now().toString(),
    email,
    passwordHash,
    name:         name.trim(),
    phone,
    company,
    role:         'customer',
    createdAt:    new Date().toISOString(),
    lastLogin:    '',
    active:       'true',
  };
  await _sheetsAppend(SHEETS_CONFIG.TABS.USERS, [_userToRow(user)]);
  _cacheInvalidate(SHEETS_CONFIG.TABS.USERS);

  // Strip hash before returning
  const safeUser = { ...user }; delete safeUser.passwordHash;
  return { ok: true, user: safeUser };
}

/**
 * Sign in — validates credentials against Sheets.
 * Returns { ok: true, user } or { ok: false, error }
 */
async function sheetsLoginUser({ email, password }) {
  if (!email || !password) return { ok: false, error: 'Email and password are required.' };
  email = email.toLowerCase().trim();

  const users = await _sheetsGetAllUsers();
  const user  = users.find(u => u.email === email);
  if (!user)              return { ok: false, error: 'No account found with this email.' };
  if (!user.active)       return { ok: false, error: 'This account has been deactivated.' };

  const hash = await _hashPassword(password);
  if (hash !== user.passwordHash) return { ok: false, error: 'Incorrect password.' };

  // Update lastLogin in Sheets (non-blocking)
  _updateUserLastLogin(email).catch(() => {});

  const safeUser = { ...user }; delete safeUser.passwordHash;
  return { ok: true, user: safeUser };
}

async function _updateUserLastLogin(email) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.USERS}!A2:ZZ`);
  const emailCol = USER_COLS.indexOf('email');
  const loginCol = USER_COLS.indexOf('lastLogin') + 1; // 1-indexed
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][emailCol] === email) {
      const cell = `${String.fromCharCode(64 + loginCol)}${i + 2}`;
      await _sheetsWrite(`${SHEETS_CONFIG.TABS.USERS}!${cell}`, [[new Date().toISOString()]]);
      break;
    }
  }
  _cacheInvalidate(SHEETS_CONFIG.TABS.USERS);
}

// ── ENQUIRIES ──────────────────────────────────────────────────
async function sheetsSubmitEnquiry({ name, email, phone, company, productSlug, message }) {
  const row = [
    Date.now().toString(), name, email, phone || '', company || '',
    productSlug || '', message || '', 'new', new Date().toISOString(),
  ];
  await _sheetsAppend(SHEETS_CONFIG.TABS.ENQUIRIES, [row]);
}
async function sheetsGetEnquiries() {
  return await _loadTab(SHEETS_CONFIG.TABS.ENQUIRIES, _rowToEnquiry);
}
async function sheetsUpdateEnquiryStatus(id, status) {
  const rows = await _sheetsRead(`${SHEETS_CONFIG.TABS.ENQUIRIES}!A2:ZZ`);
  const statusCol = ENQUIRY_COLS.indexOf('status') + 1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === id) {
      const cell = `${String.fromCharCode(64 + statusCol)}${i + 2}`;
      await _sheetsWrite(`${SHEETS_CONFIG.TABS.ENQUIRIES}!${cell}`, [[status]]);
      break;
    }
  }
  _cacheInvalidate(SHEETS_CONFIG.TABS.ENQUIRIES);
}

// ── BULK SEED — push all in-memory data into Sheets ────────────
/**
 * sheetsSeeder() — call once from the admin panel to populate
 * all tabs with the existing PRODUCTS, PROJECTS, CATEGORIES data.
 * Safe to call again — it checks if data already exists.
 */
async function sheetsSeeder() {
  const log = [];

  // Seed categories
  const existingCats = await _loadTab(SHEETS_CONFIG.TABS.CATEGORIES, _rowToCategory);
  if (existingCats.length === 0 && typeof CATEGORIES !== 'undefined') {
    const rows = CATEGORIES.map(_categoryToRow);
    await _sheetsAppend(SHEETS_CONFIG.TABS.CATEGORIES, rows);
    log.push(`✓ Seeded ${rows.length} categories`);
    _cacheInvalidate(SHEETS_CONFIG.TABS.CATEGORIES);
  } else {
    log.push(`↷ Categories: ${existingCats.length} rows already present, skipped`);
  }

  // Seed products
  const existingProds = await _loadTab(SHEETS_CONFIG.TABS.PRODUCTS, _rowToProduct);
  if (existingProds.length === 0 && typeof PRODUCTS !== 'undefined') {
    const rows = PRODUCTS.map(p => {
      if (!p.status) p.status = 'active';
      if (!p.createdAt) p.createdAt = new Date().toISOString();
      return _productToRow(p);
    });
    await _sheetsAppend(SHEETS_CONFIG.TABS.PRODUCTS, rows);
    log.push(`✓ Seeded ${rows.length} products`);
    _cacheInvalidate(SHEETS_CONFIG.TABS.PRODUCTS);
  } else {
    log.push(`↷ Products: ${existingProds.length} rows already present, skipped`);
  }

  // Seed projects
  const existingProjs = await _loadTab(SHEETS_CONFIG.TABS.PROJECTS, _rowToProject);
  if (existingProjs.length === 0 && typeof PROJECTS !== 'undefined') {
    const rows = PROJECTS.map(p => {
      if (!p.createdAt) p.createdAt = new Date().toISOString();
      return _projectToRow(p);
    });
    await _sheetsAppend(SHEETS_CONFIG.TABS.PROJECTS, rows);
    log.push(`✓ Seeded ${rows.length} projects`);
    _cacheInvalidate(SHEETS_CONFIG.TABS.PROJECTS);
  } else {
    log.push(`↷ Projects: ${existingProjs.length} rows already present, skipped`);
  }

  // Seed default settings
  const settings = await sheetsGetSettings();
  const defaultSettings = [
    ['site_title',       'Artisan & Co.'],
    ['hero_heading',     'Furniture that endures.'],
    ['hero_subheading',  'Contract furniture crafted for the most demanding commercial environments in India.'],
    ['about_text',       'Artisan & Co. is Indore\'s leading contract furniture manufacturer.'],
    ['contact_email',    'enquiries@artisanco.in'],
    ['contact_phone',    '+91 22 6600 0000'],
    ['contact_address',  'Studio 4, Ballard Estate, Indore – 400 001'],
    ['instagram_url',    ''],
    ['linkedin_url',     ''],
    ['whatsapp_number',  ''],
  ];
  let newSettings = 0;
  for (const [k, v] of defaultSettings) {
    if (!(k in settings)) { await sheetsSetSetting(k, v); newSettings++; }
  }
  if (newSettings) log.push(`✓ Seeded ${newSettings} default settings`);
  else log.push('↷ Settings: already present, skipped');

  // Seed demo admin user
  const existingUsers = await _sheetsGetAllUsers();
  if (existingUsers.length === 0) {
    await sheetsRegisterUser({
      name:     'Admin',
      email:    'admin@artisanco.in',
      password: 'admin123',
      company:  'Artisan & Co.',
    });
    // Override role to admin
    const users = await _sheetsGetAllUsers();
    const rows  = await _sheetsRead(`${SHEETS_CONFIG.TABS.USERS}!A2:ZZ`);
    const roleCol = USER_COLS.indexOf('role') + 1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][USER_COLS.indexOf('email')] === 'admin@artisanco.in') {
        await _sheetsWrite(
          `${SHEETS_CONFIG.TABS.USERS}!${String.fromCharCode(64+roleCol)}${i+2}`,
          [['admin']]
        );
        break;
      }
    }
    await sheetsRegisterUser({ name: 'Demo User', email: 'demo@artisanco.in', password: 'demo123' });
    log.push('✓ Created admin@artisanco.in (admin123) and demo@artisanco.in (demo123)');
    _cacheInvalidate(SHEETS_CONFIG.TABS.USERS);
  } else {
    log.push(`↷ Users: ${existingUsers.length} accounts already present`);
  }

  return log;
}

// ── Graceful fallback wrapper ───────────────────────────────────
/**
 * wrapWithFallback(sheetsFunc, localFunc)
 * Tries sheetsFunc first; on failure returns localFunc result and
 * shows a non-intrusive console warning so the site never breaks.
 */
async function wrapWithFallback(sheetsFunc, localFunc) {
  if (!SHEETS_CONFIG.SPREADSHEET_ID || SHEETS_CONFIG.SPREADSHEET_ID === '1ux3Fmc2KDOwQJgzbc4dYmYqSYpUZ0pe0_01nG3ijdZA') {
    return localFunc();
  }
  try {
    return await sheetsFunc();
  } catch (err) {
    console.warn('[Sheets CMS] Falling back to local data:', err.message);
    return localFunc();
  }
}

// ── Expose all public functions globally ───────────────────────
window.SheetsCMS = {
  init:              sheetsInit,
  seed:              sheetsSeeder,
  config:            SHEETS_CONFIG,

  // Products
  getProducts:       sheetsGetProducts,
  getProduct:        sheetsGetProduct,
  upsertProduct:     sheetsUpsertProduct,
  deleteProduct:     sheetsDeleteProduct,

  // Projects
  getProjects:       sheetsGetProjects,
  getProject:        sheetsGetProject,
  upsertProject:     sheetsUpsertProject,

  // Categories
  getCategories:     sheetsGetCategories,
  upsertCategory:    sheetsUpsertCategory,

  // Settings
  getSettings:       sheetsGetSettings,
  setSetting:        sheetsSetSetting,

  // Auth
  register:          sheetsRegisterUser,
  login:             sheetsLoginUser,

  // Enquiries
  submitEnquiry:     sheetsSubmitEnquiry,
  getEnquiries:      sheetsGetEnquiries,
  updateEnquiryStatus: sheetsUpdateEnquiryStatus,

  // Utilities
  wrapWithFallback,
  invalidateCache:   _cacheInvalidate,
};
