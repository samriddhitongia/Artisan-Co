# Artisan & Co. — Google Sheets CMS Setup Guide

This guide walks you through connecting the Artisan & Co. website to Google Sheets as a live CMS backend. Once set up, **every change you make in the spreadsheet reflects on the website within 5 minutes** (cache TTL), and **every edit in the Admin panel writes back to the sheet instantly**.

---

## Architecture Overview

```
Website (HTML/JS)
    │
    ├── js/sheets-cms.js        ← Core CMS engine (JWT auth, read/write, cache)
    ├── js/data.js              ← Local fallback data (100 products, 20 projects)
    ├── admin.html              ← CMS Admin panel (CRUD for all data)
    └── login.html              ← Auth → validates against Sheets Users tab
           │
           └──► Google Sheets API v4
                    │
                    └── Your Spreadsheet (6 tabs)
                         ├── Products    (100+ rows)
                         ├── Projects    (20+ rows)
                         ├── Categories  (14 rows)
                         ├── Settings    (key/value pairs)
                         ├── Users       (accounts + SHA-256 hashed passwords)
                         └── Enquiries   (contact form submissions)
```

**Fallback**: If Sheets is unreachable, the site falls back to the static `data.js` data silently — the site never breaks.

---

## Step 1 — Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **New Project** → name it `artisanco-cms`
3. In the left menu go to **APIs & Services → Library**
4. Search for **"Google Sheets API"** → click **Enable**

---

## Step 2 — Create a Service Account

1. Go to **IAM & Admin → Service Accounts**
2. Click **Create Service Account**
   - Name: `artisan-sheets-cms`
   - Role: **Editor**
3. Click **Done**
4. Click the service account email → **Keys** tab → **Add Key → Create new key → JSON**
5. A `.json` file downloads — keep it safe, you need two values from it:
   - `client_email` (looks like: `artisan-sheets-cms@your-project.iam.gserviceaccount.com`)
   - `private_key` (a long RSA key starting with `-----BEGIN RSA PRIVATE KEY-----`)

---

## Step 3 — Create the Google Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com) → **New Spreadsheet**
2. Name it: **Artisan & Co. CMS**
3. Create **6 tabs** (click the `+` at the bottom) named **exactly**:
   - `Products`
   - `Projects`
   - `Categories`
   - `Settings`
   - `Users`
   - `Enquiries`
4. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_IS_YOUR_ID`**`/edit`
5. Click **Share** → paste your service account email → give **Editor** access

---

## Step 4 — Configure `js/sheets-cms.js`

Open `js/sheets-cms.js` and fill in the `SHEETS_CONFIG` object at the top:

```javascript
const SHEETS_CONFIG = {
  SPREADSHEET_ID: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms',  // ← your ID
  API_BASE: 'https://sheets.googleapis.com/v4/spreadsheets',

  SERVICE_ACCOUNT: {
    client_email: 'artisan-sheets-cms@my-project.iam.gserviceaccount.com',
    private_key:  '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIB...\n-----END RSA PRIVATE KEY-----\n',
  },

  TABS: {
    PRODUCTS:   'Products',
    PROJECTS:   'Projects',
    CATEGORIES: 'Categories',
    SETTINGS:   'Settings',
    USERS:      'Users',
    ENQUIRIES:  'Enquiries',
  },

  CACHE_TTL_MS: 5 * 60 * 1000,  // 5 minutes — adjust as needed
};
```

> ⚠️ **Security note**: The private key is embedded in client-side JS. For a public-facing production site, route API calls through a backend proxy (Node.js/Cloudflare Worker) that holds the key server-side. For internal tools or demo purposes, this setup is fine.

---

## Step 5 — Initialise Headers & Seed Data

1. Open the website, sign in as any user
2. Navigate to `admin.html` (or append `/admin.html` to your URL)
3. Click **Sheets Setup** in the sidebar
4. Click **① Write Headers** — this writes the column header row to all 6 tabs
5. Click **② Seed All Data →** — this pushes:
   - All 100 products
   - All 20 projects
   - All 14 categories
   - Default site settings
   - Admin account: `admin@artisanco.in` / `admin123`
   - Demo account: `demo@artisanco.in` / `demo123`

The seed log will confirm each step. **Seeding is safe to run again** — it skips tabs that already have data.

---

## Sheet Structure Reference

### Products tab
| Column | Field | Notes |
|--------|-------|-------|
| A | id | Unique integer |
| B | slug | URL-safe identifier e.g. `cambridge-executive-chair` |
| C | name | Display name |
| D | categoryId | Must match a Category `id` |
| E | material | e.g. `Full-grain leather, aluminium base` |
| F | shortDescription | One-liner for product cards |
| G | description | Full HTML-safe description |
| H | images | URLs separated by ` | ` |
| I | finishes | Options separated by ` | ` |
| J | dimensions | e.g. `W68 × D72 × H115 cm` |
| K | availability | e.g. `In stock · 1–2 weeks` |
| L | featured | `true` or `false` |
| M | status | `active`, `draft`, or `archived` |
| N | price | Number (₹) |
| O | createdAt | ISO date string |

### Projects tab
| Column | Field |
|--------|-------|
| A | id | B | slug | C | title | D | location | E | industry |
| F | completionYear | G | image | H | secondImage | I | description |
| J | scope | K | challenge | L | clientTestimonial | M | clientName |
| N | furniturePieces | O | area | P | timeline |
| Q | products (slugs separated by ` | `) | R | featured | S | createdAt |

### Categories tab
| A | id | B | name | C | description | D | heroImage | E | displayOrder |

### Settings tab (key / value pairs)
| Key | Description |
|-----|-------------|
| `site_title` | Browser title |
| `hero_heading` | Homepage hero H1 |
| `hero_subheading` | Homepage hero paragraph |
| `about_text` | About page body copy |
| `contact_email` | Contact email address |
| `contact_phone` | Phone number |
| `contact_address` | Physical address |
| `instagram_url` | Social link |
| `linkedin_url` | Social link |
| `whatsapp_number` | WhatsApp number |

### Users tab
| A | id | B | email | C | passwordHash (SHA-256) | D | name | E | phone |
| F | company | G | role (`admin`/`customer`) | H | createdAt | I | lastLogin | J | active |

### Enquiries tab
| A | id | B | name | C | email | D | phone | E | company |
| F | productSlug | G | message | H | status (`new`/`in_progress`/`closed`) | I | createdAt |

---

## How Bi-Directional Sync Works

### Website → Sheets (writes)
| Action | What gets written |
|--------|------------------|
| Contact form submitted | New row in Enquiries tab |
| User registers | New row in Users tab (password hashed) |
| Admin saves product | Updates existing row or appends new row in Products |
| Admin saves project | Updates/appends in Projects tab |
| Admin saves settings | Updates key/value pairs in Settings tab |

### Sheets → Website (reads)
| Trigger | What gets read |
|---------|---------------|
| Products page loads | All rows from Products tab |
| Projects page loads | All rows from Projects tab |
| Homepage loads | Featured rows from Products + Projects |
| Product detail loads | Single product by slug |
| Login attempt | User row matched by email + hash |
| Admin dashboard | All tabs |

### Cache
All reads are cached for **5 minutes** in memory (configurable via `CACHE_TTL_MS`). After a write via the Admin panel, the cache for that tab is **immediately invalidated**, so the next page load gets fresh data. To force a site-wide refresh without editing, reduce `CACHE_TTL_MS` or call `SheetsCMS.invalidateCache('Products')` from the browser console.

---

## Admin Panel (`admin.html`)

| Section | What you can do |
|---------|----------------|
| **Dashboard** | See counts, view recent enquiries |
| **Products** | Add, edit, archive products — all saved to Sheets |
| **Projects** | Add, edit projects — all saved to Sheets |
| **Categories** | Add, edit categories |
| **Users** | View all registered users; create new users manually |
| **Enquiries** | View all form submissions; mark as In Progress / Closed |
| **Site Settings** | Edit all page copy, contact info, social links |
| **Sheets Setup** | Write headers, seed data, test connection |

**Access**: Sign in with an `admin` role account. The "⚙ CMS Admin" link appears in the user dropdown menu.

---

## Adding a Product Directly in Sheets

1. Open the spreadsheet → `Products` tab
2. Add a new row **below** the header row with all columns filled
3. Set column M (`status`) to `active` and column L (`featured`) to `true` or `false`
4. The website will pick up the new product on next page load (within 5 minutes)

**Validation tips**:
- `slug` must be unique, lowercase, hyphenated: `new-product-name`
- `categoryId` must exactly match one of the `id` values in the Categories tab
- `images`: paste full HTTPS URLs separated by ` | ` (space-pipe-space)
- Leave `id` empty and the Admin panel will auto-assign one; if editing directly in Sheets, use a unique integer
- Setting `status` to `archived` hides the product from the website without deleting the row

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Token fetch failed" | Check `client_email` and `private_key` are exactly as in the downloaded JSON key file. Ensure there are no extra spaces. |
| "Sheets read error: 403" | The spreadsheet hasn't been shared with the service account email. Share it with Editor access. |
| "Sheets read error: 404" | `SPREADSHEET_ID` is wrong. Copy it from the spreadsheet URL again. |
| Products page shows old data | Cache is active — wait 5 min or call `SheetsCMS.invalidateCache('Products')` in the browser console. |
| Login fails for new user | The Users tab may not have been seeded. Run the Seed step in admin.html → Sheets Setup. |
| Site shows local data instead of Sheets | `SPREADSHEET_ID` is still set to `'YOUR_SPREADSHEET_ID_HERE'`. Fill it in. |
| Private key line breaks | The private key must have literal `\n` in the JS string, not actual newlines. Copy it exactly from the JSON file. |

---

## Production Checklist

- [ ] Replace `YOUR_SPREADSHEET_ID_HERE` with actual ID
- [ ] Replace service account credentials
- [ ] Run "Write Headers" once
- [ ] Run "Seed All Data" once
- [ ] Change admin password (sign in as `admin@artisanco.in`, update in Users tab)
- [ ] For public sites: move API calls to a backend proxy to protect the private key
- [ ] Set `CACHE_TTL_MS` to an appropriate value for your traffic (lower = fresher data, more API calls)
- [ ] Add the Admin link to nav only for admin-role users (already done in main.js)
