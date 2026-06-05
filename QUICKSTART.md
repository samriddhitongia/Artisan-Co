# Artisan & Co. — Quick Start

Sheets credentials are already wired in `js/sheets-cms.js`:
- **Spreadsheet ID:** `1ux3Fmc2KDOwQJgzbc4dYmYqSYpUZ0pe0_01nG3ijdZA`
- **Service account:** `furnituresam@furnituresam.iam.gserviceaccount.com`

## 1. Share the sheet with the service account
Open the spreadsheet → **Share** → add `furnituresam@furnituresam.iam.gserviceaccount.com` as **Editor**. Without this, every read/write returns 403.

## 2. Create the 6 tabs (exact names)
`Products`, `Projects`, `Categories`, `Settings`, `Users`, `Enquiries`

Header rows (row 1 of each tab) — paste these as the first row:

**Products:** `id | slug | name | categoryId | material | shortDescription | description | images | finishes | dimensions | availability | featured | status | price | createdAt`

**Projects:** `id | slug | title | location | industry | completionYear | image | secondImage | description | scope | challenge | clientTestimonial | clientName | furniturePieces | area | timeline | products | featured | createdAt`

**Categories:** `id | name | description`

**Settings:** `key | value`

**Users:** `email | name | phone | passwordHash | createdAt`

**Enquiries:** `id | createdAt | firstName | lastName | email | phone | projectType | message | status`

(Use one column per field. The `images`, `finishes`, and `products` columns store multiple values separated by ` | `.)

## 3. Seed the sheet (one click)
Open `admin.html` in a browser → click **Seed Sheet from local data**. This uploads all 100 products, 20 projects, and 14 categories from `js/data.js`.

## 4. Run the site
It's static HTML — open any file directly, or serve the folder:

```bash
cd artisan-sheets-cms
python3 -m http.server 8000
# visit http://localhost:8000
```

(Opening `index.html` via `file://` also works, but a local server is recommended so `fetch` to Google APIs uses a proper origin.)

## How sync works
- **Sheet → Site:** pages read from Sheets on load (5-min cache, see `CACHE_TTL_MS` in `sheets-cms.js`). Edits in the sheet appear within 5 minutes, or instantly after a hard refresh.
- **Site → Sheet:** the Admin panel (`admin.html`) writes back via `PUT`. Signups (`login.html`) append a row to `Users`. Enquiry form (`enquiry.html`) appends to `Enquiries`.
- **Graceful fallback:** if Sheets is unreachable or empty, the site silently falls back to `js/data.js`.

## Security note
The service-account private key is embedded in client JS, which means anyone who opens the site can read/write your spreadsheet. This is fine for an internal demo, but for production move the JWT signing to a tiny backend (Cloudflare Worker / Vercel function) and only expose a read-only proxy to the browser.
