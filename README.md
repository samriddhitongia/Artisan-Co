# Artisan & Co. — Google Sheets CMS

A static e-commerce / portfolio website for a bespoke furniture brand. Content is managed entirely through Google Sheets — no database or backend required.

## Live Site

Deployed on [Vercel](https://vercel.com).

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no build step)
- **CMS Backend:** Google Sheets API v4 (service account auth)
- **Hosting:** Vercel (static)

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Products | `products.html` |
| Product Detail | `product-detail.html?slug=<slug>` |
| Projects | `projects.html` |
| Project Detail | `project-detail.html?slug=<slug>` |
| Blog | `blog.html` |
| Cart | `cart.html` |
| Wishlist | `wishlist.html` |
| Quote Builder | `quote-builder.html` |
| Enquiry | `enquiry.html` |
| Enquiry Analytics | `enquiry-analytics.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Search | `search.html` |
| Payment | `payment.html` |
| Login | `login.html` |
| Admin | `admin.html` |

## Setup

See **[QUICKSTART.md](QUICKSTART.md)** for a 4-step setup guide.  
See **[SHEETS_SETUP_GUIDE.md](SHEETS_SETUP_GUIDE.md)** for the full Google Sheets API walkthrough.

### Key files

```
js/sheets-cms.js   ← CMS engine (JWT auth, read/write, 5-min cache)
js/data.js         ← Local fallback data (100 products, 20 projects)
js/main.js         ← Shared header/footer, nav, cart helpers
admin.html         ← Admin panel — CRUD for all sheet data
```

## Deploy to Vercel

```bash
# One-time
npm i -g vercel
vercel login

# Deploy
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for automatic deployments on every push.

## Local Development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No build step needed — edit HTML/CSS/JS and refresh.

## Google Sheets Schema

Six tabs, exact names required:

- **Products** — `id | slug | name | categoryId | material | shortDescription | description | images | finishes | dimensions | availability | featured | status | price | createdAt`
- **Projects** — `id | slug | title | location | industry | completionYear | image | secondImage | description | scope | challenge | clientTestimonial | clientName | furniturePieces | area | timeline | products | featured | createdAt`
- **Categories** — `id | name | description`
- **Settings** — `key | value`
- **Users** — `email | name | phone | passwordHash | createdAt`
- **Enquiries** — `id | createdAt | firstName | lastName | email | phone | projectType | message | status`

## Security Note

The service-account private key is embedded in `js/sheets-cms.js`. This is acceptable for internal demos. For production, move JWT signing to a Vercel serverless function and expose only a read-only proxy to the browser.

## License

MIT
