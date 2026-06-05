# Artisan & Co. — Premium Furniture Studio

A fully static,e-commerce and portfolio site for a B2B furniture brand, powered by **Google Sheets as a live CMS**. No database, no server framework — just HTML, CSS, and vanilla JavaScript with the Google Sheets API v4 as the data layer.

---

## What This Is (and What It Isn't)

This is a **client-facing storefront + internal CMS** built as a single deployable folder. The target audience is commercial buyers — hotels, corporates, architects, hospitals — not casual online shoppers. That shapes every design and flow decision: enquiry forms matter more than a one-click checkout, and trust signals (client logos, testimonials, project case studies) carry more weight than a "Buy Now" button.

---

## Architecture

```
Browser
  │
  ├── HTML pages (static)
  ├── css/styles.css
  └── js/
       ├── sheets-cms.js   ← Core: JWT OAuth, Sheets API v4 CRUD, in-memory cache
       ├── data.js         ← 100 products, 20 projects, 14 categories (fallback + seed)
       ├── main.js         ← Shared: nav, footer, scroll animations, auth state
       ├── chatbot.js      ← Keyword-intent chatbot (fully local, no API calls)
       ├── products.js     ← Catalogue page: filter, sort, render
       ├── product-detail.js
       ├── search.js       ← Debounced full-text search across products + projects
       ├── enquiry.js      ← Enquiry form → writes to Sheets
       ├── prices.js       ← Price lookup helpers
       ├── store.js        ← Cart + wishlist (localStorage)
       └── [page].js       ← One file per page for everything else
            │
            └──► Google Sheets API v4 (authenticated via service-account JWT)
                      │
                      └── Spreadsheet (6 tabs)
                           Products · Projects · Categories · Settings · Users · Enquiries
```

### Why Google Sheets as the CMS

The brief asked how we read from Sheets and what the trade-offs are. Here's the honest breakdown:

| Approach | What I chose | Why |
|---|---|---|
| Published CSV / gviz endpoint | ❌ | Read-only, no write-back, no auth |
| Apps Script Web App | ❌ | Extra deployment step, slower, fragile URL |
| Build-time sync | ❌ | Requires a build pipeline; the brief wanted static HTML |
| **Sheets API v4 (service account JWT)** | ✅ | Full read + write, real-time, works from the browser |

The trade-off I accepted: the service-account private key lives in client-side JS (`sheets-cms.js`). For an internal demo or a client proof-of-concept this is acceptable. For a public-facing production site the right move is to proxy JWT signing through a Cloudflare Worker or Vercel Edge Function and expose only a scoped read endpoint to the browser. I've documented that in the setup guide and in the admin panel's Sheets Setup screen.

### Data model across tabs

**Products → Projects → Categories** form a hierarchy. A Product has a `categoryId` (FK to Categories.id). A Project has a `products` column (pipe-separated slugs, a denormalised FK list). This avoids JOINs — Sheets has no JOIN — while keeping relationships navigable in JS.

**Settings** is a flat key/value tab. All page copy (hero heading, contact info, social links) lives here so the client can change copy without touching code.

**Users** stores SHA-256 hashed passwords. There's no server-side session; auth state is kept in `sessionStorage` with the user object (minus hash) and validated against the sheet on login. For a real production system this would be replaced with Firebase Auth or a proper identity provider.

**Enquiries** is append-only from the frontend. The Admin panel can update `status` (new → in_progress → closed).

### Caching

All Sheets reads are cached in a module-level JS object (`_cache`) keyed by tab name, with a configurable TTL (default 5 minutes). After any write via the Admin panel, the relevant tab's cache entry is immediately deleted so the next read fetches fresh data. Cache can also be busted from the browser console:

```javascript
SheetsCMS.invalidateCache('Products');
```

### Fallback

If `SPREADSHEET_ID` is still the placeholder string, or if the Sheets API returns an error, every page falls back silently to `data.js`. The site never breaks; it just serves stale bundled data. This was a deliberate choice — a broken API call shouldn't take down the whole storefront.

---

## Visual Language — How We Signal "Premium Furniture Brand"

The brief asked specifically about this, so here's the rationale:

**Type**: Two-family pairing — a serif (`Playfair Display`-style via CSS custom property `--font-serif`) for headings and a clean sans-serif for body. Serifs read as craft and permanence; the combination is standard for luxury goods.

**Colour**: Near-monochrome palette (off-white background, near-black foreground, warm stone accents). No loud brand colour. Colour is used sparingly as an accent only — this pushes attention to photography.

**Photography**: All images are served from Unsplash with `?auto=format&fm=webp&fit=crop` parameters so the CDN handles format negotiation and cropping. `loading="lazy"` on everything below the fold. Explicit `width` and `height` attributes to prevent layout shift.

**Spacing**: Generous whitespace (`clamp()`-based section padding that scales with viewport). Products breathe — they're not crammed into a grid.

**Motion**: Scroll-driven fade-in animations (`IntersectionObserver` with `fade-up`, `fade-left`, `fade-right` CSS classes). Animations are subtle and one-directional; they add perceived quality without feeling gimmicky.

**Trust signals baked into the homepage**: 4.8★ Google rating badge in the hero area, a trust bar with client segment pills, a scrolling marquee of named enterprise clients (HDFC Bank, ITC Hotels, Infosys, IIM Indore), and three named testimonials with Google Review attribution.

---

## Product Catalogue — Staying Scannable at Scale

With ~100 products across 14 categories, the catalogue page (`products.html` + `js/products.js`) needed to stay usable:

- **Sticky filter sidebar** — filter by category, material, price range. Filters are applied client-side on the in-memory product array; no round-trip to Sheets.
- **Sort controls** — by name, price (asc/desc), newest.
- **Grid layout** — 3-column desktop, 2-column tablet, 1-column mobile. Cards show image, name, category tag, short description, and price. Overflow is hidden; card height is fixed so the grid is visually consistent regardless of text length.
- **Lazy images** on all product cards.
- **Category pages** (`category.html`) pre-filter the grid to a single category, with a hero image and category description pulled from the Categories sheet.

---

## User Flow — Homepage to Enquiry

This is the primary conversion path. The site is not a self-serve checkout; it's a considered-purchase journey that ends in a sales conversation.

```
index.html
  │
  ├── Hero: "Crafted for Discerning Spaces"
  │     CTAs: [Explore Collection] → products.html
  │            [View Projects]     → projects.html
  │
  ├── Trust bar (4.8★ · client segment pills)
  │
  ├── 14 Category cards (dynamically rendered from Sheets)
  │     → category.html?id=<slug>
  │
  ├── Featured Products grid (featured=true rows from Sheets)
  │     → product-detail.html?slug=<slug>
  │
  ├── Shop by Room (6 image cards)
  │     → category.html?id=<slug>
  │
  ├── Furniture Buying Guide (8-tab interactive section)
  │     Each tab: hero image, expert tips, product-type chips with photos
  │     CTA per tab → category.html
  │
  ├── "Still Deciding?" section
  │     CTAs: [Request a Call] → contact.html
  │            [Send an Enquiry] → enquiry.html
  │
  ├── Testimonials (3 named Google Reviews)
  │
  ├── Client logo marquee (12 enterprise names, auto-scrolling)
  │
  ├── Brand Story section
  │     CTA: [Read Our Story] → about.html
  │
  ├── Featured Projects grid
  │     → project-detail.html?slug=<slug>
  │
  └── CTA Banner: "Have a project in mind?"
        CTA: [Request a Quote] → enquiry.html


product-detail.html?slug=<slug>
  │
  ├── Image gallery (main image + thumbnail strip)
  ├── Product name, material, short description
  ├── Price (+ "18% GST" note)
  ├── Spec table: dimensions, material, category, availability
  ├── Finish selector (swatches from pipe-separated finishes field)
  │
  ├── Action row:
  │     [Add to Cart]        → cart.html (localStorage)
  │     [♡ Save / Saved]     → wishlist.html (localStorage)
  │     [Request a Quote]    → enquiry.html?product=<slug>
  │
  ├── Full product description (HTML-safe rich text)
  ├── Related products (same category, rendered from local array)
  └── Bottom CTA: [Request a Quote for This Piece] + [Browse Full Catalogue]


enquiry.html?product=<slug>
  │
  ├── Pre-filled product field (from URL param)
  ├── Contact fields: name, email, phone, company
  ├── Message / requirements textarea
  └── Submit → SheetsCMS.appendRow('Enquiries', ...) → row in Enquiries tab
                Confirmation screen shown inline


cart.html
  │
  ├── Cart items (from localStorage via store.js)
  ├── Quantity controls, remove, subtotal
  ├── "Proceed to Payment" → payment.html
  └── Empty state: [Browse Products]


payment.html
  │
  ├── Breadcrumb: Payment Details → Order Confirmed
  ├── Contact information form
  ├── Delivery address form (with pincode)
  ├── Payment method selector:
  │     • RTGS / NEFT / Bank Transfer (default, preferred for >₹50k)
  │     • UPI
  │     • Credit / Debit Card (card fields shown conditionally)
  │     • Pay on Delivery
  └── [Place Order] → success screen ("Order Confirmed!")
```

### Other flows

**Search**: `search.html` debounces input at 220ms, searches the in-memory product and project arrays simultaneously, and renders results in two tabs (Products / Projects / All). URL params (`?q=`) allow deep-linking to a search result.

**Quote Builder** (`quote-builder.html`): A 3-step form — (1) add products with quantities, (2) customisation notes per item, (3) project + contact details. Live summary sidebar updates as items are added. Can export/print a quote PDF or submit to the Enquiries sheet.

**Chatbot** (`js/chatbot.js`): A keyword-intent chatbot that lives in the bottom-right corner on every page. Fully local — no API calls. The knowledge base (`KB` object) contains phone, email, showroom hours, warranty terms, lead times, and deposit policy. The intent map covers room-based queries (living room, bedroom, dining, home office), material questions, pricing, lead times, delivery, and common objections. Quick-reply chips appear for common follow-up actions.

**Admin panel** (`admin.html`): Full CRUD for all 6 Sheets tabs. Protected behind admin-role login. Includes a "Sheets Setup" section that can write column headers and seed all data in one click.

**Enquiry Analytics** (`enquiry-analytics.html`): Dashboard showing enquiry volume, status breakdown, and product interest from the Enquiries tab.

---

## Where AI Was Used

I used AI (Claude) for:

1. **Seed data generation** — `data.js` contains 100 products with realistic Indian pricing, material specs, dimensions, availability notes, and Unsplash image URLs. Generating this by hand would have taken hours; AI produced a complete, internally consistent dataset in minutes.
2. **Chatbot knowledge base and intent map** — the `INTENTS` array in `chatbot.js` covers ~30 intents with natural-language key phrases. AI helped expand the keyword lists and write the reply strings in a consistent brand voice.
3. **Buying Guide copy** — the 8-tab buying guide on the homepage contains 4 expert tips per tab (32 tip cards total). AI drafted the copy; I edited for accuracy and tone.
4. **`sheets-cms.js` JWT implementation** — browser-compatible JWT signing using the Web Crypto API (RSASSA-PKCS1-v1_5 + SHA-256) is non-trivial. AI provided a working implementation that I validated and integrated.

AI was **not** used for: the overall architecture decision, the data model design, the CSS design system, or the UX flow decisions — those came from understanding the brief and the target audience.

---

## What I'd Do With More Time

**Honest list, roughly prioritised:**

1. **Move the private key server-side.** A Cloudflare Worker (~30 lines) that signs JWTs and proxies Sheets reads/writes would eliminate the key exposure. This is the most important production gap.

2. **Replace SHA-256 password hashing with a real auth system.** Firebase Auth (free tier) or Supabase Auth would give proper password hashing (bcrypt/argon2), session management, and password reset flows without much extra complexity.

3. **Image optimisation pipeline.** Right now all product images point to Unsplash URLs. For real product photos, a Cloudinary or similar transform pipeline would handle WebP conversion, responsive srcsets, and lazy-load placeholders automatically.

4. **Proper pagination on the catalogue.** The current implementation loads all products into memory and filters client-side. At 100 products this is fine (~50KB of JSON). At 500+ products, server-side pagination with cursor-based Sheets reads would be necessary.

5. **Malformed-row handling in the CMS.** Currently if a Sheets row has a missing `categoryId` or a bad slug, it renders with empty fields. A row validation layer in `sheets-cms.js` (with a warning log for the admin) would make the editor experience more forgiving.

6. **Real payment integration.** The payment page is a UI mock. Razorpay or Cashfree would be the right integration for an Indian B2B context — both have lightweight JS SDKs and support NEFT references, UPI, and cards.

7. **Enquiry → CRM handoff.** The enquiry form writes to Sheets, but a real workflow would also trigger a WhatsApp message to the sales team (via the WhatsApp Business API or Wati) and an auto-reply email to the customer (via EmailJS or a Worker).

8. **Accessibility pass.** Focus management, ARIA roles on the custom tabs and chatbot, and keyboard navigation for the gallery thumbnail strip need attention.

---

## Running Locally

```bash
cd artisan-sheets-cms
python3 -m http.server 8000
# open http://localhost:8000
```

The site works without Sheets configured — it falls back to `data.js`. To connect a live sheet, follow `SHEETS_SETUP_GUIDE.md`.

Default admin credentials (after seeding): `admin@artisanco.in` / `admin123`

---

## File Index

| Path | What it does |
|---|---|
| `index.html` | Homepage (hero, categories, products, projects, testimonials, CTAs) |
| `products.html` | Full catalogue with filters and sort |
| `product-detail.html` | Single product: gallery, specs, finishes, actions |
| `category.html` | Category landing with filtered product grid |
| `projects.html` | Portfolio / case studies grid |
| `project-detail.html` | Single project: scope, challenge, testimonial, linked products |
| `about.html` | Brand story, team, values |
| `blog.html` | Journal / editorial content |
| `search.html` | Debounced full-text search: products + projects |
| `contact.html` | Contact form (writes to Enquiries) |
| `enquiry.html` | Product enquiry / quote request form |
| `quote-builder.html` | 3-step bulk quote builder with PDF export |
| `cart.html` | Shopping cart (localStorage) |
| `payment.html` | Checkout with NEFT / UPI / Card / COD |
| `wishlist.html` | Saved products (localStorage) |
| `login.html` | Sign in / register (authenticates against Users tab) |
| `admin.html` | Full CMS admin: CRUD for all 6 tabs + Sheets Setup |
| `enquiry-analytics.html` | Enquiry volume and status dashboard |
| `js/sheets-cms.js` | Sheets API client: JWT signing, CRUD, cache |
| `js/data.js` | Bundled seed data: 100 products, 20 projects, 14 categories |
| `js/chatbot.js` | Keyword-intent chatbot (fully local) |
| `js/main.js` | Shared utilities: nav, footer, animations, auth state |
| `js/store.js` | Cart + wishlist helpers (localStorage) |
| `js/prices.js` | Price lookup and formatting |
| `css/styles.css` | Complete design system and all page styles |
| `SHEETS_SETUP_GUIDE.md` | Step-by-step Sheets integration guide |
| `QUICKSTART.md` | 5-minute setup for the pre-configured demo sheet |
