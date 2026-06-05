const CATEGORIES = [
  { id: "chair", name: "Chairs", description: "Executive, task and visitor seating for every professional context." },
  { id: "sofas", name: "Sofas", description: "Modular and fixed lounge seating for lobbies and collaborative spaces." },
  { id: "workstations", name: "Workstations", description: "Open-plan and private workstation systems engineered for productivity." },
  { id: "tables-desk", name: "Tables & Desks", description: "Conference, executive and height-adjustable work surfaces." },
  { id: "lounge-chairs", name: "Lounge Chairs", description: "Statement accent chairs for reception and hospitality areas." },
  { id: "centre-table", name: "Centre Tables", description: "Coffee and side tables crafted to anchor a seating arrangement." },
  { id: "cafe-restaurant", name: "Café & Restaurant", description: "Stackable, durable and design-forward pieces for food service." },
  { id: "outdoor-furniture", name: "Outdoor", description: "Weather-resistant furniture for courtyards, terraces and public plazas." },
  { id: "recliner", name: "Recliners", description: "Ergonomic recliners for executive lounges and wellness centres." },
  { id: "garden-benches", name: "Garden Benches", description: "Cast iron and teak benches for parks, gardens and civic spaces." },
  { id: "cast-iron-lamp-post", name: "Lamp Posts", description: "Ornamental and contemporary lamp posts for civic and commercial use." },
  { id: "bollards", name: "Bollards", description: "Architectural bollards for traffic management and urban design." },
  { id: "railings", name: "Railings", description: "Custom balustrade and railing systems for staircases and balconies." },
  { id: "hospital-furniture", name: "Hospital Furniture", description: "Hygienic, durable seating and bedside units for healthcare environments." },
];

const PRODUCTS = [

  /* ── CHAIRS (8) ── */
  {
    id: 1, slug: "cambridge-executive-chair", name: "Cambridge Executive Chair",
    categoryId: "chair", material: "Full-grain leather, polished aluminium base",
    shortDescription: "A commanding executive chair engineered for marathon work sessions without sacrificing form.",
    description: "The Cambridge Executive Chair is the product of two years of ergonomic research and traditional upholstery craft. Available in 12 leather finishes with a polished or powder-coated aluminium base. The lumbar system is independently adjustable, the armrests articulate in three planes, and the seat depth can be extended by 60mm. Designed for the corner office but at home in any serious workspace.",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800","https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Cognac Leather","Midnight Black","Ivory Cream","Forest Green"],
    dimensions: "W68 × D72 × H115–125 cm", availability: "Made to order · 6–8 weeks", featured: true
  },
  {
    id: 2, slug: "oxford-task-chair", name: "Oxford Task Chair",
    categoryId: "chair", material: "Mesh back, upholstered seat, nylon base",
    shortDescription: "A precision-engineered task chair for open-plan environments demanding all-day comfort.",
    description: "The Oxford Task Chair was designed in response to client feedback from our largest corporate installations. A high-performance mesh back paired with a contoured foam seat delivers eight hours of support without fatigue. Synchronised recline mechanism, adjustable lumbar and 3D armrests. Tested to 100,000 sit cycles.",
    images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Graphite Mesh","Black Mesh","Navy Mesh"],
    dimensions: "W65 × D68 × H105–118 cm", availability: "In stock · 1–2 weeks", featured: true
  },
  {
    id: 3, slug: "delhi-visitor-chair", name: "Delhi Visitor Chair",
    categoryId: "chair", material: "Upholstered seat & back, brushed steel legs",
    shortDescription: "A refined visitor chair that bridges the gap between comfort and minimal footprint.",
    description: "The Delhi Visitor Chair has been specified on over 200 projects. Its compact footprint makes it ideal for waiting areas and meeting rooms. Available in 40 fabric options including anti-bacterial performance fabrics suited to healthcare environments.",
    images: ["https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Sand Fabric","Slate Blue","Burgundy","Pebble Grey","Terracotta"],
    dimensions: "W55 × D58 × H83 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 4, slug: "mayfair-conference-chair", name: "Mayfair Conference Chair",
    categoryId: "chair", material: "Semi-aniline leather, polished chrome base",
    shortDescription: "Boardroom-grade seating with swivel, height-adjust and an understated silhouette.",
    description: "The Mayfair Conference Chair is our most specified chair for boardroom and conference room environments. Semi-aniline leather seat and back on a five-star polished chrome base. Waterfall seat edge reduces leg fatigue during long meetings. Available with or without armrests.",
    images: ["https://images.unsplash.com/photo-1519461412436-a9113ae83e8d?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Warm White","Cognac Tan","Espresso"],
    dimensions: "W60 × D62 × H95–105 cm", availability: "In stock · 2–3 weeks", featured: false
  },
  {
    id: 5, slug: "bombay-training-chair", name: "Bombay Training Chair",
    categoryId: "chair", material: "Polypropylene shell, chrome cantilever frame",
    shortDescription: "Stackable and linkable — the ideal chair for training rooms, auditoriums and seminar halls.",
    description: "The Bombay Training Chair stacks 12-high and links laterally for row configurations. Polypropylene shell in 18 colours. Optional tablet arm and under-seat bag hook. Certified to EN 16139:2013 for commercial and public use.",
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Black","Lime Green","Cobalt Blue","Red"],
    dimensions: "W52 × D54 × H83 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 6, slug: "regent-high-back", name: "Regent High-Back Chair",
    categoryId: "chair", material: "Velvet upholstery, solid walnut legs",
    shortDescription: "A high-back accent chair that brings warmth and authority to any executive interior.",
    description: "The Regent High-Back is our answer to the demand for a statement chair that is still functional. Luxurious velvet upholstery over a solid walnut frame. Wing profile provides acoustic privacy in open spaces. Available in 16 velvet colours.",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Midnight Blue Velvet","Olive Green","Dusty Rose","Charcoal","Burnt Orange"],
    dimensions: "W72 × D78 × H118 cm", availability: "Made to order · 4–6 weeks", featured: true
  },
  {
    id: 7, slug: "lotus-breakout-stool", name: "Lotus Breakout Stool",
    categoryId: "chair", material: "Upholstered seat, powder-coated steel base",
    shortDescription: "A versatile bar-height stool for breakout zones, reception counters and casual dining.",
    description: "The Lotus Breakout Stool has a footrest ring, height-adjustable gas lift and a 360° swivel. Available in the same 40-fabric range as the Delhi Visitor Chair for project coordination. Suitable for counter heights 90–110 cm.",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Warm Tan","Slate","Ivory","Sage Green"],
    dimensions: "W46 × D46 × H65–85 cm (adj)", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 8, slug: "prestige-ergonomic-chair", name: "Prestige Ergonomic Chair",
    categoryId: "chair", material: "Advanced mesh, die-cast aluminium frame",
    shortDescription: "Our most advanced ergonomic chair — 12 independent adjustment points for total postural support.",
    description: "The Prestige Ergonomic Chair features an adaptive mesh back that automatically maps to the user's spine, a patented PostureGlide seat-tilt mechanism, and adjustable lumbar, headrest and armrests. Rated for continuous use by users up to 135 kg. Ideal for technology and trading floor environments.",
    images: ["https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black/Chrome","Graphite/Matte Black","White/Silver"],
    dimensions: "W70 × D68 × H107–120 cm", availability: "In stock · 2 weeks", featured: false
  },

  /* ── SOFAS (7) ── */
  {
    id: 9, slug: "colaba-modular-sofa", name: "Colaba Modular Sofa",
    categoryId: "sofas", material: "Belgian linen, solid sheesham wood frame",
    shortDescription: "A generous modular sofa that anchors any lobby or executive lounge with quiet confidence.",
    description: "Named after one of Indore's most storied neighbourhoods, the Colaba Modular Sofa is built around a solid sheesham wood frame wrapped in high-resilience foam and finished in Belgian linen. Modular configurations from 2-seat to 7-seat L-shape. Custom leg finishes available.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Linen","Slate Grey","Terracotta","Deep Navy"],
    dimensions: "Per module: W90 × D95 × H80 cm", availability: "In stock · 2–3 weeks", featured: true
  },
  {
    id: 10, slug: "bandra-reception-sofa", name: "Bandra Reception Sofa",
    categoryId: "sofas", material: "Leather-touch fabric, brushed brass legs",
    shortDescription: "A three-seat reception sofa with a brass-legged plinth that announces arrival in style.",
    description: "The Bandra Reception Sofa is the most photographed piece in our catalogue. Its low, wide profile with hand-stitched piping and brushed brass legs makes an immediate impression in any lobby. Available as 2-seat and 3-seat. Pair with the Bandra Ottoman for a complete seating cluster.",
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Caramel Leather","Off-White","Forest Green","Charcoal"],
    dimensions: "W220 × D90 × H75 cm (3-seat)", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 11, slug: "worli-corner-sofa", name: "Worli Corner Sofa",
    categoryId: "sofas", material: "Performance velvet, solid oak frame",
    shortDescription: "An L-shaped corner sofa with deep seats — built for executive lounges and hospitality breakout zones.",
    description: "The Worli Corner Sofa provides generous seating depth (62 cm) for maximum comfort in lounge environments. Solid oak legs are available in natural, black-stained or walnut finishes. Performance velvet is rated 100,000 Martindale rubs for commercial use.",
    images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Sage Velvet","Ink Blue","Warm Terracotta","Stone","Rust"],
    dimensions: "W280 × D200 × H82 cm (corner)", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 12, slug: "kala-ghoda-bench-sofa", name: "Kala Ghoda Bench Sofa",
    categoryId: "sofas", material: "Boucle fabric, blackened oak legs",
    shortDescription: "A tight-back bench sofa for co-working breakout zones and informal meeting areas.",
    description: "The Kala Ghoda Bench Sofa takes its cues from the gallery district it's named after. A slim, linear profile in boucle fabric on blackened oak legs. Its low-profile silhouette makes it ideal under windows and in architectural niches. Available in 2 and 3-seat configurations.",
    images: ["https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Ivory Boucle","Warm Grey","Sand"],
    dimensions: "W180 × D78 × H72 cm (2-seat)", availability: "Made to order · 6 weeks", featured: false
  },
  {
    id: 13, slug: "fort-chesterfield-sofa", name: "Fort Chesterfield Sofa",
    categoryId: "sofas", material: "Full-grain leather, solid mahogany frame",
    shortDescription: "A hand-tufted Chesterfield for heritage interiors — boardrooms, law firms and private clubs.",
    description: "The Fort Chesterfield is our most labour-intensive piece: 18 hours of hand-tufting per seat on full-grain leather over a solid mahogany frame. Available as 2-seat, 3-seat or corner configuration. A statement piece for boardrooms, law firm offices and private clubs.",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Cognac","Aged Brown","Midnight Black","Forest Green"],
    dimensions: "W210 × D92 × H78 cm (3-seat)", availability: "Made to order · 10–12 weeks", featured: false
  },
  {
    id: 14, slug: "dadar-two-seater", name: "Dadar Two-Seater",
    categoryId: "sofas", material: "Microfibre fabric, powder-coated steel legs",
    shortDescription: "A compact two-seater for small office waiting areas and co-working breakouts.",
    description: "The Dadar Two-Seater is our most versatile compact sofa. Its slim arms and straight lines maximise seating in small footprints. Microfibre fabric is stain-resistant and easy to clean. Powder-coated steel legs in black or white. Ideal for healthcare waiting areas and co-working lounges.",
    images: ["https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Charcoal","Light Grey","Navy","Beige"],
    dimensions: "W140 × D80 × H78 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 15, slug: "pali-hill-sectional", name: "Pali Hill Sectional",
    categoryId: "sofas", material: "Herringbone wool, walnut frame",
    shortDescription: "A premium sectional sofa with a distinctive herringbone weave for luxury hospitality settings.",
    description: "The Pali Hill Sectional is our flagship soft seating piece for luxury hotel lobbies and five-star hospitality environments. Upholstered in a custom herringbone wool fabric over a solid walnut frame. Available in 4-, 5- and 6-seat sectional configurations. Customised cushion firmness on request.",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Warm Herringbone","Grey/Ivory","Charcoal Weave"],
    dimensions: "L360 × D95 × H80 cm (5-seat sectional)", availability: "Made to order · 10–14 weeks", featured: true
  },

  /* ── WORKSTATIONS (8) ── */
  {
    id: 16, slug: "bandra-workstation-system", name: "Bandra Workstation System",
    categoryId: "workstations", material: "18mm MDF, powder-coated steel frame",
    shortDescription: "An open-plan workstation system that scales from 4 to 400 seats without compromising on precision.",
    description: "The Bandra Workstation System was developed in response to the demands of India's largest technology campuses. Modular panels in 12mm acoustic fabric, integrated cable management, and a steel frame that tolerates 200kg live load per desk. Available in benching and pod configurations.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Arctic White","Graphite","Walnut Veneer","Light Oak"],
    dimensions: "Per seat: W160 × D80 × H75 cm", availability: "Project basis · 10–14 weeks", featured: true
  },
  {
    id: 17, slug: "andheri-private-office", name: "Andheri Private Office Suite",
    categoryId: "workstations", material: "Solid walnut veneer, steel frame",
    shortDescription: "A complete private office system — desk, return, pedestal and credenza in solid walnut veneer.",
    description: "The Andheri Private Office Suite provides a complete furniture solution for senior management offices. 30mm walnut veneer top on a powder-coated steel frame. Integrated two-drawer pedestal and matching credenza. All cable management is fully concealed. Available in 5 veneer finishes.",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Walnut","Dark Walnut","White Oak","Wenge","Maple"],
    dimensions: "Desk: W180 × D90 × H75 cm", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 18, slug: "lower-parel-sit-stand", name: "Lower Parel Sit-Stand Desk",
    categoryId: "workstations", material: "Solid Oak top, electric height-adjustable frame",
    shortDescription: "An electric sit-stand desk with programmable presets and a solid oak top.",
    description: "The Lower Parel Sit-Stand Desk features a dual-motor electric height-adjustment system with four programmable presets. Solid oak top (choice of 3 finishes) on a powder-coated steel frame. Anti-collision safety system. Quiet motor rated <45 dB. Cable management tray included.",
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Oak","Dark Oak","Walnut Stain"],
    dimensions: "W160 × D80 × H62–128 cm (adj)", availability: "In stock · 3–4 weeks", featured: false
  },
  {
    id: 19, slug: "churchgate-pod-workstation", name: "Churchgate Pod Workstation",
    categoryId: "workstations", material: "Acoustic fabric panels, steel frame, MDF top",
    shortDescription: "A four-person pod workstation with acoustic privacy screens for open-plan offices.",
    description: "The Churchgate Pod Workstation groups four desks with 1200mm acoustic screens on three sides, reducing ambient noise by up to 18 dB. Integrated power and data spine. Central storage pedestal. Available as 4-pod and 6-pod configurations.",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Graphite","White/Walnut","All-Black","Warm White/Oak"],
    dimensions: "4-pod: W320 × D320 × H120 cm (screens)", availability: "Project basis · 10–12 weeks", featured: false
  },
  {
    id: 20, slug: "nariman-trading-desk", name: "Nariman Trading Desk",
    categoryId: "workstations", material: "25mm MDF laminate, triple-monitor steel arm frame",
    shortDescription: "A high-density trading desk built to BIFMA standards for financial services environments.",
    description: "The Nariman Trading Desk was developed with three major financial institutions for their Indore trading floors. 25mm moisture-resistant laminate top. Integrated triple-monitor steel arms, power panel with 6 UK sockets + 2 USB-C, and below-desk CPU holder. BIFMA X5.5 certified.",
    images: ["https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Light Grey","Dark Grey","Black"],
    dimensions: "W160 × D90 × H75 cm", availability: "Project basis · 12–16 weeks", featured: false
  },
  {
    id: 21, slug: "powai-collaborative-bench", name: "Powai Collaborative Bench",
    categoryId: "workstations", material: "Solid oak top, white powder-coated steel legs",
    shortDescription: "A clean Scandinavian-influenced bench desk for collaborative and agile working zones.",
    description: "The Powai Collaborative Bench features solid oak tops on a slender powder-coated steel frame. No modesty panels, maximum visual openness. Integrated power spine on request. Available in 4, 6 and 8-seat configurations. Ideal for creative and technology campuses.",
    images: ["https://images.unsplash.com/photo-1550153832-9eed7ec6e8cf?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Oak/White","Dark Oak/Black","Smoked Oak/Brass"],
    dimensions: "Per seat: W140 × D70 × H73 cm", availability: "In stock · 2–3 weeks", featured: false
  },
  {
    id: 22, slug: "thane-l-shaped-workstation", name: "Thane L-Shaped Workstation",
    categoryId: "workstations", material: "18mm MFC laminate, steel frame",
    shortDescription: "An L-shaped manager workstation with integrated return and modesty panel.",
    description: "The Thane L-Shaped Workstation provides a generous working surface (2.0 m² total) with a full-height modesty panel and matching return desk. Wire management grommet on main desk. Three-drawer pedestal included. Popular for department manager positions in open-plan layouts.",
    images: ["https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Light Oak","Walnut"],
    dimensions: "Main: W160 × D80 cm, Return: W120 × D60 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 23, slug: "santacruz-reception-desk", name: "Santacruz Reception Desk",
    categoryId: "workstations", material: "Solid surface top, backlit acrylic fascia, steel frame",
    shortDescription: "A statement reception desk with backlit fascia — the first impression that matters.",
    description: "The Santacruz Reception Desk features a premium solid surface worktop and a backlit acrylic fascia panel that can be configured with the client's logo. Under-counter filing and guest-side modesty panel. Available in straight, curved and radius configurations. Electrical included.",
    images: ["https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Chrome","Dark/Brass","Stone Grey/Matte Black"],
    dimensions: "W240 × D80 × H110 cm (standard straight)", availability: "Made to order · 8–10 weeks", featured: true
  },

  /* ── TABLES & DESKS (7) ── */
  {
    id: 24, slug: "malabar-conference-table", name: "Malabar Conference Table",
    categoryId: "tables-desk", material: "Solid walnut top, blackened steel base",
    shortDescription: "A 12-seat conference table with a walnut top that only grows more beautiful with age.",
    description: "Constructed from a single-slab bookmatched walnut top — each piece is unique. The blackened steel base is precision-welded and cable-managed. Available in 8, 10 and 12-seat configurations. Custom lengths available on request.",
    images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Walnut","Ebonised Walnut","White Oak"],
    dimensions: "L360 × W120 × H75 cm (12-seat)", availability: "Made to order · 8–10 weeks", featured: true
  },
  {
    id: 25, slug: "heritage-boardroom-table", name: "Heritage Boardroom Table",
    categoryId: "tables-desk", material: "Solid mahogany, inlaid leather top, chrome legs",
    shortDescription: "An imposing oval boardroom table with inlaid leather top — built for decisive moments.",
    description: "The Heritage Boardroom Table features a solid mahogany frame with an inlaid full-grain leather writing surface, stainless steel power modules, and a polished chrome base. Available in 14, 18 and 22-seat oval configurations. The definitive boardroom table for law firms and financial institutions.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Dark Mahogany/Tan Leather","Light Ash/Black Leather","Walnut/Ivory Leather"],
    dimensions: "L500 × W180 × H75 cm (18-seat oval)", availability: "Made to order · 10–14 weeks", featured: false
  },
  {
    id: 26, slug: "flora-fountain-writing-desk", name: "Flora Fountain Writing Desk",
    categoryId: "tables-desk", material: "Solid oak, hand-forged iron legs",
    shortDescription: "A freestanding writing desk with hand-forged iron legs — for private offices with a story to tell.",
    description: "The Flora Fountain Writing Desk takes its name from Indore's most beloved landmark. A solid oak top on hand-forged iron legs with a raw, slightly textured finish. A single drawer with a brass handle. Ideal for senior executive private offices, boutique law firms and design studios.",
    images: ["https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Oak","Smoked Oak","White-Washed Oak"],
    dimensions: "W150 × D70 × H75 cm", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 27, slug: "pedder-road-side-table", name: "Pedder Road Side Table",
    categoryId: "tables-desk", material: "Marble top, solid brass frame",
    shortDescription: "A marble-topped side table on a solid brass frame — a luxury punctuation mark.",
    description: "The Pedder Road Side Table is a luxury accent piece for high-end hospitality and residential projects. Marble top (choice of 4 stones) on a hand-finished solid brass frame. Also available as a set of two nesting tables.",
    images: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White Carrara/Polished Brass","Verde/Antique Brass","Black Nero/Matte Brass"],
    dimensions: "W50 × D50 × H55 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 28, slug: "connect-huddle-table", name: "Connect Huddle Table",
    categoryId: "tables-desk", material: "HPL laminate top, powder-coated steel base",
    shortDescription: "A height-adjustable huddle table for informal stand-up meetings and agile collaboration.",
    description: "The Connect Huddle Table adjusts from seated (75 cm) to standing (110 cm) height with a single gas-lift handle. HPL laminate top is whiteboard-writable on request. Available with or without integrated power and data access. Ideal for co-working environments and agile tech offices.",
    images: ["https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Light Grey","Black"],
    dimensions: "Ø90 cm, H75–110 cm (adj)", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 29, slug: "venus-training-table", name: "Venus Training Table",
    categoryId: "tables-desk", material: "18mm MDF laminate, folding mechanism, castors",
    shortDescription: "A lightweight folding training table that nests for storage and assembles in seconds.",
    description: "The Venus Training Table folds flat in 3 seconds and nests 8 tables together on its castor base. A 25mm anti-scratch HPL top with integrated cable channel. Ideal for training rooms, flexible conference spaces and event venues.",
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Grey","White/Black"],
    dimensions: "W160 × D60 × H75 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 30, slug: "cuffe-parade-executive-desk", name: "Cuffe Parade Executive Desk",
    categoryId: "tables-desk", material: "Book-matched stone veneer top, solid brass legs",
    shortDescription: "An ultra-premium executive desk with a stone-veneered top and solid brass hairpin legs.",
    description: "The Cuffe Parade Executive Desk is our most exclusive freestanding desk — a book-matched Pietra Grey stone-veneer top on four solid brass hairpin legs. Matching credenza available. Limited production of 20 units per year. Suited to C-suite offices and luxury private residences.",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Pietra Grey/Polished Brass","White Onyx/Satin Brass","Nero Marquina/Antique Brass"],
    dimensions: "W200 × D90 × H75 cm", availability: "Made to order · 12 weeks", featured: true
  },

  /* ── LOUNGE CHAIRS (7) ── */
  {
    id: 31, slug: "versova-lounge-chair", name: "Versova Lounge Chair",
    categoryId: "lounge-chairs", material: "Boucle fabric, solid oak legs",
    shortDescription: "A cocoon-shaped lounge chair that invites you to stop, sit, and stay.",
    description: "Inspired by traditional Indian weaving techniques, the Versova Lounge Chair wraps you in boucle fabric stretched over a high-resilience foam shell. The solid oak legs are available in natural or stained finishes. A perfect pairing with the Versova Ottoman.",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Ivory Boucle","Warm Terracotta","Sage Green","Charcoal"],
    dimensions: "W80 × D85 × H95 cm", availability: "In stock · 2–3 weeks", featured: true
  },
  {
    id: 32, slug: "warden-road-swivel-chair", name: "Warden Road Swivel Chair",
    categoryId: "lounge-chairs", material: "Full-grain leather, polished brass swivel base",
    shortDescription: "A 360° swivel lounge chair in full-grain leather — authoritative yet relaxed.",
    description: "The Warden Road Swivel Chair is a statement lounge piece for executive waiting rooms and private offices. Full-grain leather over high-density foam on a polished brass swivel base. Available in 6 leather colours. Optional matching footstool.",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Tan Leather","Black Leather","Cognac","Ivory","Racing Green"],
    dimensions: "W78 × D80 × H85 cm", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 33, slug: "breach-candy-tub-chair", name: "Breach Candy Tub Chair",
    categoryId: "lounge-chairs", material: "Velvet upholstery, gold-tipped solid oak legs",
    shortDescription: "A classic tub chair profile reinterpreted with gold-tipped legs and deep velvet upholstery.",
    description: "The Breach Candy Tub Chair is a five-star hotel favourite. Its rounded shell profile provides both visual comfort and a degree of acoustic privacy. Gold-tipped solid oak legs. Available in 20 velvet colours. Stackable version available for event venues.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Emerald Green","Royal Blue","Blush Pink","Champagne","Midnight"],
    dimensions: "W72 × D75 × H80 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 34, slug: "juhu-egg-chair", name: "Juhu Egg Chair",
    categoryId: "lounge-chairs", material: "Fibreglass shell, fabric upholstery, swivel base",
    shortDescription: "An egg-shaped shell chair that creates a private sanctuary in busy open spaces.",
    description: "The Juhu Egg Chair provides visual and acoustic privacy through its all-enveloping fibreglass shell upholstered in fabric. 360° swivel base. Optional integrated speaker and USB charging on the premium model. A signature piece for hotel lobbies and premium co-working spaces.",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Warm White","Graphite","Sage","Mustard","Blush"],
    dimensions: "W110 × D100 × H130 cm", availability: "Made to order · 6 weeks", featured: true
  },
  {
    id: 35, slug: "churchgate-wing-chair", name: "Churchgate Wing Chair",
    categoryId: "lounge-chairs", material: "Harris Tweed upholstery, solid mahogany legs",
    shortDescription: "A traditional wing chair in imported Harris Tweed — for heritage interiors and private clubs.",
    description: "The Churchgate Wing Chair is handcrafted in our Thane atelier using imported Harris Tweed fabric over a solid mahogany frame. Eight-way hand-tied spring suspension. A timeless piece for private clubs, library rooms, and senior partner offices.",
    images: ["https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Navy/Green Tweed","Brown Herringbone","Grey/Blue Check"],
    dimensions: "W80 × D85 × H108 cm", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 36, slug: "worli-pod-chair", name: "Worli Pod Chair",
    categoryId: "lounge-chairs", material: "Steel shell, upholstered interior, powder-coated base",
    shortDescription: "A semi-enclosed pod chair for focused work in open-plan environments.",
    description: "The Worli Pod Chair features a partially enclosed steel shell with an upholstered interior that reduces ambient noise by 12 dB. Optional integrated power point. Designed specifically for co-working and campus environments where acoustic privacy is a premium.",
    images: ["https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White Shell/Grey Interior","Black Shell/Tan Interior","Green Shell/Ivory Interior"],
    dimensions: "W85 × D90 × H140 cm", availability: "Made to order · 6 weeks", featured: false
  },
  {
    id: 37, slug: "khar-accent-chair", name: "Khar Accent Chair",
    categoryId: "lounge-chairs", material: "Rope weave back, solid teak frame, cushioned seat",
    shortDescription: "A natural-material accent chair that brings warmth and texture to any interior.",
    description: "The Khar Accent Chair combines rope weaving — a traditional Indian craft — with a solid teak frame and a generous cushioned seat. Suited to both indoor and covered outdoor settings. Pairs with the Khar Side Table.",
    images: ["https://images.unsplash.com/photo-1519461412436-a9113ae83e8d?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak/Natural Rope","Whitewash/White Rope","Dark Teak/Black Rope"],
    dimensions: "W70 × D75 × H85 cm", availability: "In stock · 2 weeks", featured: false
  },

  /* ── CENTRE TABLES (6) ── */
  {
    id: 38, slug: "gateway-marble-table", name: "Gateway Marble Coffee Table",
    categoryId: "centre-table", material: "Marble top, solid brass base",
    shortDescription: "A statement marble coffee table with a sculptural solid brass base — a room's focal point.",
    description: "The Gateway Marble Coffee Table uses a 20mm honed Calacatta marble top on a sculptural solid brass base. Available in three marble choices and three brass finishes. A signature piece for luxury hotel lobbies and executive reception areas.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Calacatta/Polished Brass","Nero/Matte Brass","Verde/Antique Brass"],
    dimensions: "W120 × D60 × H40 cm", availability: "Made to order · 6 weeks", featured: true
  },
  {
    id: 39, slug: "nariman-oval-table", name: "Nariman Oval Coffee Table",
    categoryId: "centre-table", material: "Solid walnut, bronze hairpin legs",
    shortDescription: "An oval walnut table with bronze hairpin legs — warmth and precision in one piece.",
    description: "The Nariman Oval Coffee Table features a solid live-edge walnut slab on four hand-formed bronze hairpin legs. Each table is unique due to the natural variation of the live-edge slab. Available in two size options.",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Walnut/Bronze","Ebonised/Antique Bronze"],
    dimensions: "W130 × D65 × H38 cm", availability: "Made to order · 5–6 weeks", featured: false
  },
  {
    id: 40, slug: "cst-nesting-tables", name: "CST Nesting Tables",
    categoryId: "centre-table", material: "Powder-coated steel, tempered glass tops",
    shortDescription: "A set of three nesting tables in powder-coated steel and tempered glass — space-efficient elegance.",
    description: "The CST Nesting Tables are a practical luxury: three tables that stack compactly but create a generous display surface when extended. Powder-coated steel frames in three colours with 8mm tempered glass tops.",
    images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Matte Black/Smoked Glass","Polished Brass/Clear","Rose Gold/Blush Glass"],
    dimensions: "W60/50/40 × D40/35/30 × H45/40/35 cm (set)", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 41, slug: "dharavi-industrial-table", name: "Dharavi Industrial Table",
    categoryId: "centre-table", material: "Reclaimed timber top, blackened iron legs",
    shortDescription: "A robust industrial coffee table crafted from reclaimed timber on handmade iron legs.",
    description: "The Dharavi Industrial Table celebrates material honesty. Reclaimed railway sleeper timber is cleaned, planed and sealed — preserving all the character of its previous life. Blackened hand-forged iron legs. A standout piece for creative studios, boutique hospitality and design-forward offices.",
    images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Reclaimed/Black Iron"],
    dimensions: "W110 × D55 × H42 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 42, slug: "juhu-terrazzo-table", name: "Juhu Terrazzo Table",
    categoryId: "centre-table", material: "Poured terrazzo top, powder-coated cylinder base",
    shortDescription: "A round terrazzo coffee table — a nod to India's Modernist architectural tradition.",
    description: "Terrazzo was ubiquitous in mid-century Indian public buildings. The Juhu Terrazzo Table brings this material into the contemporary interior. Poured on-site in our Thane workshop, each top is unique. Available in round (Ø90 cm) and oval formats.",
    images: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Grey Chips","Black/Multi","Sage/White"],
    dimensions: "Ø90 × H38 cm", availability: "Made to order · 4 weeks", featured: false
  },
  {
    id: 43, slug: "kemps-corner-side-table", name: "Kemps Corner Side Table",
    categoryId: "centre-table", material: "Cane top, solid rattan frame",
    shortDescription: "A light and airy side table in natural cane and rattan — perfect for resort and hospitality settings.",
    description: "The Kemps Corner Side Table uses traditional cane-weaving over a solid rattan frame — made by craftswomen in our partner workshop in Kerala. Suited to indoor and covered outdoor settings. Available as a single table or set of two.",
    images: ["https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Cane","Whitewashed","Honey Lacquer"],
    dimensions: "W45 × D45 × H50 cm", availability: "In stock · 1 week", featured: false
  },

  /* ── CAFÉ & RESTAURANT (7) ── */
  {
    id: 44, slug: "andheri-cafe-chair", name: "Andheri Café Chair",
    categoryId: "cafe-restaurant", material: "Powder-coated steel, polypropylene seat",
    shortDescription: "Lightweight, stackable, and available in 24 colours — the workhorse of food service.",
    description: "The Andheri Café Chair was designed for food service environments: 100% powder-coated tubular steel, UV-stable polypropylene seat, and a design that stacks 8-high. Tested to EN 16139 commercial furniture standards.",
    images: ["https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Signal White","Jet Black","Coral Red","Sage","Sand","Cobalt","Lime"],
    dimensions: "W46 × D52 × H80 cm", availability: "In stock · 1 week", featured: true
  },
  {
    id: 45, slug: "colaba-bistro-chair", name: "Colaba Bistro Chair",
    categoryId: "cafe-restaurant", material: "Bentwood seat & back, chrome tubular frame",
    shortDescription: "A classic European bistro chair adapted for the Indian climate — stackable and enduring.",
    description: "The Colaba Bistro Chair takes the timeless bentwood bistro aesthetic and adds a chrome tubular base for additional stability. Beech wood seat and backrest in a satin lacquer finish. Stacks 6-high. Suitable for indoor and covered outdoor dining.",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Beech","Dark Walnut Stain","White Lacquer"],
    dimensions: "W42 × D48 × H85 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 46, slug: "bandra-bar-stool", name: "Bandra Bar Stool",
    categoryId: "cafe-restaurant", material: "Solid oak seat, powder-coated footring, steel frame",
    shortDescription: "A solid oak counter stool for bars, café counters and kitchen islands.",
    description: "The Bandra Bar Stool has a solid oak saddle seat on a powder-coated tubular steel frame with a welded footring. Height options: 65 cm (counter) and 75 cm (bar). Swivel version available. Stacks 4-high.",
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Oak/Black","Smoked Oak/Brass","White-Washed/Chrome"],
    dimensions: "W38 × D38 × H65 cm (counter)", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 47, slug: "fort-banquet-chair", name: "Fort Banquet Chair",
    categoryId: "cafe-restaurant", material: "Upholstered seat & back, gold-tipped frame",
    shortDescription: "A premium stacking banquet chair for hotel ballrooms and event venues — 30 fabric options.",
    description: "The Fort Banquet Chair is our most ordered piece for five-star hotel event venues. An upholstered seat and back on a gold or chrome stacking frame. Available in 30 fabrics and 4 frame finishes. Stacks 10-high on a trolley. Linking clips included.",
    images: ["https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gold Frame · Various Fabrics","Chrome Frame · Various Fabrics","Rose Gold Frame"],
    dimensions: "W46 × D52 × H93 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 48, slug: "worli-dining-table", name: "Worli Dining Table",
    categoryId: "cafe-restaurant", material: "Compact laminate top, stainless steel base",
    shortDescription: "A compact laminate café table rated for outdoor and indoor food service environments.",
    description: "The Worli Dining Table uses 12mm Formica Compact laminate — scratch, heat and moisture resistant — on a stainless steel or powder-coated pedestal base. Available in square (70×70) and round (Ø70) tops. Outdoor and indoor versions.",
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Chrome","Black/Black","Oak Effect/Brass"],
    dimensions: "W70 × D70 × H75 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 49, slug: "grant-road-booth-seating", name: "Grant Road Booth Seating",
    categoryId: "cafe-restaurant", material: "Faux leather upholstery, plywood frame, steel legs",
    shortDescription: "Fixed or free-standing booth seating for restaurant and café dining configurations.",
    description: "The Grant Road Booth Seating system is available in wall-mounted and free-standing configurations. Faux leather upholstery in 12 colours over a structurally welded plywood frame. Back-to-back or single-sided configurations. Sold per linear metre with table bracket option.",
    images: ["https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Tan","Black","Burgundy","Forest Green","Dusty Pink"],
    dimensions: "H90 × D60 cm (per linear metre)", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 50, slug: "cafe-terrace-set", name: "Terrace Café Set",
    categoryId: "cafe-restaurant", material: "Powder-coated aluminium, PE rattan weave, tempered glass",
    shortDescription: "A complete outdoor café set — table and 4 rattan-weave chairs for terraces and roof decks.",
    description: "The Terrace Café Set is a complete package for outdoor dining: a tempered glass-topped aluminium table and four PE rattan-weave chairs. UV-resistant powder coating. Suitable for Indore climate conditions. Stackable chairs. Set includes 4 chairs + 1 table.",
    images: ["https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Natural Rattan","Black/Dark Rattan","Taupe/Honey Rattan"],
    dimensions: "Table: Ø90 × H75 cm, Chair: W55 × D60 × H85 cm", availability: "In stock · 2 weeks", featured: false
  },

  /* ── OUTDOOR FURNITURE (7) ── */
  {
    id: 51, slug: "juhu-outdoor-bench", name: "Juhu Outdoor Bench",
    categoryId: "outdoor-furniture", material: "Grade A teak, stainless steel bolts",
    shortDescription: "A weather-proof teak bench built for India's outdoor conditions.",
    description: "The Juhu Outdoor Bench is crafted from kiln-dried Grade A plantation teak — dense enough to resist warping and cupping in Indore's monsoons. Stainless steel hardware throughout. Available in 3 and 5-seat lengths.",
    images: ["https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak","Weathered Grey","Dark Teak Oil"],
    dimensions: "L180 × D55 × H45 cm", availability: "In stock · 1–2 weeks", featured: true
  },
  {
    id: 52, slug: "marine-drive-sun-lounger", name: "Marine Drive Sun Lounger",
    categoryId: "outdoor-furniture", material: "Teak slatted frame, quick-dry foam cushion",
    shortDescription: "A classic adjustable sun lounger in solid teak with a quick-dry cushion.",
    description: "The Marine Drive Sun Lounger has an adjustable back (5 positions) on a solid teak frame with stainless steel hinges. Quick-dry foam cushion in UV-resistant Sunbrella fabric. Designed for hotel pools, resort terraces and corporate rooftop gardens.",
    images: ["https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak · White Cushion","Grey-Washed · Charcoal Cushion","Teak · Stripe Cushion"],
    dimensions: "W65 × L195 × H35 cm", availability: "In stock · 2–3 weeks", featured: false
  },
  {
    id: 53, slug: "powai-planter-seat", name: "Powai Planter Seat",
    categoryId: "outdoor-furniture", material: "Corten steel, cedar wood seat slats",
    shortDescription: "A combined planter and bench in Corten steel — a civic-scale landscape piece.",
    description: "The Powai Planter Seat integrates a large-capacity planter (60-litre pot fits within) with a cedar-wood bench seat on either side. Corten steel develops a rich rust patina over 12–18 months, requiring no maintenance. Anchors to concrete with hidden bolts. Suitable for plazas, campuses and parks.",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Corten Steel / Cedar","Powder-coated Black / Cedar"],
    dimensions: "L180 × D60 × H80 cm (overall)", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 54, slug: "chowpatty-picnic-table", name: "Chowpatty Picnic Table",
    categoryId: "outdoor-furniture", material: "HDPE recycled plastic, stainless steel frame",
    shortDescription: "A fully recyclable picnic table in HDPE for parks, campuses and civic spaces.",
    description: "The Chowpatty Picnic Table is built to outlast concrete. HDPE recycled plastic boards (never need painting, never rot) on a stainless steel frame. Integral seat and table surface. Suitable for playgrounds, campus lawns and beachside promenades.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Green","Charcoal","Brown","Yellow"],
    dimensions: "L180 × D130 × H76 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 55, slug: "versova-bistro-outdoor-set", name: "Versova Bistro Outdoor Set",
    categoryId: "outdoor-furniture", material: "Powder-coated cast aluminium, teak table top",
    shortDescription: "A two-chair café bistro set in cast aluminium with a teak table — for boutique hotel terraces.",
    description: "The Versova Bistro Outdoor Set includes two Versova Bistro Chairs and one round teak-topped café table. Cast aluminium chairs are stackable and weigh just 3 kg each. All hardware is stainless steel. Available as chair-only or full set.",
    images: ["https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White/Natural Teak","Charcoal/Dark Teak","Sage/Natural Teak"],
    dimensions: "Table: Ø70 cm, Chair: W45 × D52 × H80 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 56, slug: "bkc-modular-outdoor-sofa", name: "BKC Modular Outdoor Sofa",
    categoryId: "outdoor-furniture", material: "PE rattan weave, aluminium frame, Sunbrella cushions",
    shortDescription: "A luxury modular outdoor sofa for terraces, pool decks and rooftop lounges.",
    description: "The BKC Modular Outdoor Sofa uses a powder-coated aluminium frame with hand-woven PE rattan and high-density Sunbrella-covered cushions. Fully weatherproof. Available in 2-, 3-seat and L-shape configurations. Corner module included.",
    images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Grey Rattan/Light Cushions","Black Rattan/White Cushions","Natural/Beige"],
    dimensions: "Per module: W90 × D90 × H70 cm", availability: "In stock · 2–3 weeks", featured: true
  },
  {
    id: 57, slug: "bandstand-swing-seat", name: "Bandstand Swing Seat",
    categoryId: "outdoor-furniture", material: "Teak seat, stainless steel chains and frame",
    shortDescription: "A garden swing seat in teak and stainless steel — for resort lawns and private terraces.",
    description: "The Bandstand Swing Seat suspends from a freestanding A-frame in stainless steel. Solid teak seat (no cushion required — teak is naturally comfortable). Adjustable chain length. Suitable for pools, lawns and covered terraces.",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak/Brushed Steel","Dark Teak/Matte Black Frame"],
    dimensions: "Frame: W160 × D120 × H200 cm, Seat: W90 cm", availability: "Made to order · 4 weeks", featured: false
  },

  /* ── RECLINERS (6) ── */
  {
    id: 58, slug: "parel-recliner", name: "Parel Executive Recliner",
    categoryId: "recliner", material: "Semi-aniline leather, aluminium base",
    shortDescription: "A recliner that belongs in the boardroom as much as the executive lounge.",
    description: "The Parel Recliner features a manual recline mechanism with 135° range, independent headrest adjustment, and a footrest that deploys in a single motion. Available in 8 semi-aniline leather colours. Contract-grade foam rated for 50,000+ sit cycles.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Cognac","Midnight Navy","Ivory","Tobacco Brown","Forest"],
    dimensions: "W80 × D90–145 × H105 cm", availability: "Made to order · 6–8 weeks", featured: true
  },
  {
    id: 59, slug: "cumballa-hill-chaise", name: "Cumballa Hill Chaise",
    categoryId: "recliner", material: "Performance linen, solid walnut base",
    shortDescription: "A full-length chaise longue for executive wellness spaces and private suites.",
    description: "The Cumballa Hill Chaise is an elongated recline piece — part chaise, part recliner. Solid walnut base with an adjustable back (3 positions). Performance linen upholstery rated 80,000 Martindale rubs. Ideal for executive wellness suites, private medical rooms and luxury hospitality.",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Linen","Charcoal","Warm Terracotta"],
    dimensions: "W80 × L195 × H80 cm", availability: "Made to order · 8 weeks", featured: false
  },
  {
    id: 60, slug: "wadala-zero-gravity", name: "Wadala Zero-Gravity Recliner",
    categoryId: "recliner", material: "Full-grain leather, motorised frame, stainless steel base",
    shortDescription: "An electric zero-gravity recliner for executive health suites and wellness lounges.",
    description: "The Wadala Zero-Gravity Recliner reclines to the zero-gravity position at the press of a button — equalising pressure across the spine and reducing heart rate. Full-grain leather. Integrated heating (lumbar and seat). USB charging port on the side panel.",
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black Leather","Cognac","Dark Brown"],
    dimensions: "W85 × D95–170 × H105 cm", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 61, slug: "mahim-nursing-recliner", name: "Mahim Nursing Recliner",
    categoryId: "recliner", material: "Vinyl upholstery, steel frame with braked castors",
    shortDescription: "A clinical recliner for nursing homes, oncology wards and dialysis centres.",
    description: "The Mahim Nursing Recliner is specifically designed for healthcare environments. PVC vinyl upholstery is fully waterproof and compatible with hospital-grade disinfectants. Braked castors, locking recline mechanism, removable armrests for clinical access. Rated for users up to 160 kg.",
    images: ["https://images.unsplash.com/photo-1519461412436-a9113ae83e8d?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Clinical White","Navy Blue","Slate Grey"],
    dimensions: "W75 × D85–145 × H110 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 62, slug: "chembur-cinema-recliner", name: "Chembur Cinema Recliner",
    categoryId: "recliner", material: "Velour upholstery, motorised recline, cup-holder",
    shortDescription: "A luxury cinema recliner for private screening rooms and premium multiplex formats.",
    description: "The Chembur Cinema Recliner offers electric recline to 150°, a retractable tray table, integrated cup holder and USB-C charging. Velour upholstery in 8 colours. Available as individual, loveseat and row-of-three. Linking brackets included.",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Charcoal Velour","Midnight Blue","Burgundy Red","Warm Grey"],
    dimensions: "W70 × D90–165 × H105 cm per seat", availability: "Made to order · 10–12 weeks", featured: false
  },
  {
    id: 63, slug: "sion-lounge-recliner", name: "Sion Lounge Recliner",
    categoryId: "recliner", material: "Boucle fabric, oak frame, manual mechanism",
    shortDescription: "A soft-modern lounge recliner that hides its mechanism beneath clean, upholstered lines.",
    description: "The Sion Lounge Recliner conceals its recline mechanism within a fully upholstered boucle shell — no exposed metal, no visible mechanism. Three-position lock. Solid oak legs. Ideal for executive lounges, private offices and hospitality suites that prioritise design integrity.",
    images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Ivory Boucle","Warm Grey Boucle","Sage Green"],
    dimensions: "W80 × D90–140 × H95 cm", availability: "Made to order · 6 weeks", featured: false
  },

  /* ── GARDEN BENCHES (6) ── */
  {
    id: 64, slug: "fort-garden-bench", name: "Fort Cast Iron Garden Bench",
    categoryId: "garden-benches", material: "Ductile cast iron, kiln-dried teak slats",
    shortDescription: "A classic Victorian-profile bench built for civic and private gardens.",
    description: "Cast from ductile iron in our Thane foundry and finished in an epoxy-polyurethane paint system rated for coastal environments. The teak slats are recessed into the cast iron frame for a seamless profile.",
    images: ["https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Forest Green","Burgundy"],
    dimensions: "L180 × D60 × H85 cm", availability: "In stock · 2–3 weeks", featured: true
  },
  {
    id: 65, slug: "bandstand-backless-bench", name: "Bandstand Backless Bench",
    categoryId: "garden-benches", material: "Solid granite, stainless steel dowels",
    shortDescription: "A minimalist solid granite bench — zero maintenance for civic plazas and modern landscapes.",
    description: "The Bandstand Backless Bench is carved from a single piece of Indian granite — Absolute Black or Silver Grey. Polished seat surface, hammer-faced sides. Stainless steel dowels for ground anchoring. Zero maintenance — stone never rusts, rots or needs repainting.",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Absolute Black Granite","Silver Grey Granite","Kashmir White"],
    dimensions: "L180 × D40 × H45 cm", availability: "Made to order · 4–6 weeks", featured: false
  },
  {
    id: 66, slug: "byculla-memorial-bench", name: "Byculla Commemorative Bench",
    categoryId: "garden-benches", material: "Cast iron scrollwork, teak slats, bronze plaque",
    shortDescription: "A commemorative bench with ornamental cast iron ends and space for a dedication plaque.",
    description: "The Byculla Commemorative Bench features cast iron scrollwork end panels with provision for a bronze dedication plaque. Available in 2-seat and 3-seat (180 cm) sizes. A popular choice for corporate gardens, hospitals, parks and educational campuses.",
    images: ["https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Verdigris Green","Dark Brown"],
    dimensions: "L150 × D60 × H88 cm (2-seat)", availability: "Made to order · 6–8 weeks", featured: false
  },
  {
    id: 67, slug: "shivaji-park-bench", name: "Shivaji Park Modern Bench",
    categoryId: "garden-benches", material: "Powder-coated steel frame, FSC hardwood slats",
    shortDescription: "A contemporary park bench in steel and FSC-certified hardwood for modern landscape projects.",
    description: "The Shivaji Park Modern Bench has a sleek powder-coated steel frame with FSC-certified tropical hardwood slats. Available in armrest and armrest-free configurations. Anchor bolts included. Designed for parks, campuses and urban plazas.",
    images: ["https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Graphite/Natural Wood","Matte Black/Ebonised","Racing Green/Natural"],
    dimensions: "L180 × D60 × H87 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 68, slug: "chhatrapati-tree-bench", name: "Chhatrapati Tree Bench",
    categoryId: "garden-benches", material: "Corten steel, solid teak seat",
    shortDescription: "A hexagonal tree-surround bench that wraps any landscape tree in seating.",
    description: "The Chhatrapati Tree Bench is a six-section hexagonal bench that surrounds a tree trunk of any diameter. Solid teak seat slats on a Corten steel frame. Each section ships separately for easy installation. Available in full-circle or half-circle configurations.",
    images: ["https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Corten/Natural Teak","Powder Black/Dark Teak"],
    dimensions: "Full circle: Ø240 × H45 cm", availability: "Made to order · 6 weeks", featured: false
  },
  {
    id: 69, slug: "elephanta-stone-bench", name: "Elephanta Island Stone Bench",
    categoryId: "garden-benches", material: "Natural basalt stone, bronze brackets",
    shortDescription: "A natural basalt stone bench — zero maintenance and dramatically beautiful.",
    description: "The Elephanta Island Stone Bench is hand-dressed from natural basalt — Indore's indigenous volcanic stone. Rough-finished sides, smooth top. Bronze brackets support each slab. Extremely durable; suitable for the harshest coastal environments. Anchor-bolted to any surface.",
    images: ["https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black Basalt/Bronze Brackets"],
    dimensions: "L180 × D40 × H45 cm", availability: "Made to order · 8 weeks", featured: false
  },

  /* ── LAMP POSTS (5) ── */
  {
    id: 70, slug: "heritage-lamp-post", name: "Heritage Column Lamp Post",
    categoryId: "cast-iron-lamp-post", material: "Cast iron, powder-coated finish, LED ready",
    shortDescription: "A classic Victorian column lamp post in cast iron — for heritage districts and civic boulevards.",
    description: "The Heritage Column Lamp Post is cast in ductile iron in our Thane foundry and coated in a 4-layer epoxy-polyurethane system rated for 15 years in coastal environments. Available in single and double-bracket configurations. Pre-wired for LED lanterns (lantern sold separately).",
    images: ["https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Forest Green","Burgundy","Ivory"],
    dimensions: "H400 cm, Base Ø25 cm", availability: "Made to order · 8–10 weeks", featured: true
  },
  {
    id: 71, slug: "contemporary-lamp-post", name: "Contemporary Taper Lamp Post",
    categoryId: "cast-iron-lamp-post", material: "Spun aluminium shaft, cast iron base",
    shortDescription: "A sleek tapered lamp post for contemporary streetscapes and corporate campuses.",
    description: "The Contemporary Taper Lamp Post combines a spun aluminium shaft with a cast iron decorative base. Available in three heights. Compatible with all standard LED lanterns. Ideal for campus roads, hotel driveways and contemporary civic projects.",
    images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Graphite","Matte Black","Silver"],
    dimensions: "H300/400/500 cm", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 72, slug: "bollard-lamp-post", name: "Bollard Lamp Post",
    categoryId: "cast-iron-lamp-post", material: "Cast iron, stainless steel hardware, LED ready",
    shortDescription: "A low-level bollard lamp post for pedestrian paths and garden lighting.",
    description: "The Bollard Lamp Post provides pathway lighting at 1.0 m height. Cast iron body, stainless steel hardware. Integrated LED module (10W warm white, 3000K). IP65 rated. Surface-mount and core-drill installation options.",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black","Bronze","Antique Green"],
    dimensions: "H100 cm, Ø20 cm base", availability: "In stock · 2–3 weeks", featured: false
  },
  {
    id: 73, slug: "art-deco-lamp-post", name: "Art Deco Fluted Lamp Post",
    categoryId: "cast-iron-lamp-post", material: "Cast iron with fluted column, brass-effect finial",
    shortDescription: "A fluted Art Deco lamp post with brass finial — for period interiors and hotel driveways.",
    description: "The Art Deco Fluted Lamp Post references the lamp standards of the Gateway of India era. Deep fluting on the column, brass-effect finial and scroll brackets. Available in single and twin-arm configurations. A popular choice for five-star hotel driveways and colonial-era building restorations.",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black/Brass Finial","Ivory/Gold Finial"],
    dimensions: "H380 cm", availability: "Made to order · 10 weeks", featured: false
  },
  {
    id: 74, slug: "plaza-lamp-post", name: "Plaza Square Lamp Post",
    categoryId: "cast-iron-lamp-post", material: "Cast iron square-section shaft, cast iron base",
    shortDescription: "A square-section lamp post for plazas, promenades and institutional campuses.",
    description: "The Plaza Square Lamp Post has a square-section shaft — a modern alternative to the traditional round column. Available in four heights with single or double cross-arm fittings. Suitable for campus roads, car parks and public plazas. Anchor-bolt base.",
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Matte Black","Dark Grey","Olive Green"],
    dimensions: "H300/400/500/600 cm", availability: "Made to order · 8 weeks", featured: false
  },

  /* ── BOLLARDS (5) ── */
  {
    id: 75, slug: "heritage-bollard", name: "Heritage Cast Iron Bollard",
    categoryId: "bollards", material: "Ductile cast iron, powder-coated, stainless hardware",
    shortDescription: "A classic faceted bollard in ductile cast iron — for heritage streetscapes and hotel driveways.",
    description: "The Heritage Cast Iron Bollard features a traditional faceted profile with a domed top. Available with or without chain-ring sockets. Surface-mount and core-drill installation. Epoxy-polyurethane finish rated for coastal environments.",
    images: ["https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Forest Green","Burgundy"],
    dimensions: "H100 × Ø20 cm", availability: "In stock · 2 weeks", featured: true
  },
  {
    id: 76, slug: "modern-steel-bollard", name: "Modern Steel Bollard",
    categoryId: "bollards", material: "316 stainless steel, satin finish",
    shortDescription: "A minimal cylindrical stainless steel bollard for contemporary urban environments.",
    description: "The Modern Steel Bollard is machined from 316-grade stainless steel — the marine-grade alloy used in the most demanding coastal environments. Available in fixed and removable (key-operated) versions. Optional integrated LED top lighting (IP68).",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Satin Stainless","Mirror Polish","Powder-Coated Black"],
    dimensions: "H100 × Ø15 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 77, slug: "security-bollard", name: "Security-Rated Impact Bollard",
    categoryId: "bollards", material: "Galvanised steel core, concrete fill, cast iron sleeve",
    shortDescription: "An IWA-14 rated impact bollard for high-security perimeter protection.",
    description: "The Security-Rated Impact Bollard is certified to IWA 14-1 Vehicle Security Barrier standard — tested to stop a 7,500 kg vehicle at 48 km/h. Galvanised steel core with concrete fill and a decorative cast iron sleeve. Available in fixed and retractable (motorised) configurations.",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black Sleeve","Stainless Sleeve","Yellow Safety"],
    dimensions: "H100 × Ø25 cm (above grade)", availability: "Project basis · 12 weeks", featured: false
  },
  {
    id: 78, slug: "solar-light-bollard", name: "Solar-Lit Path Bollard",
    categoryId: "bollards", material: "Cast aluminium, integrated solar panel, LED",
    shortDescription: "A self-powered path bollard with integrated solar panel — no trenching required.",
    description: "The Solar-Lit Path Bollard requires no mains connection — an integrated solar panel charges an internal battery that powers a 5W warm white LED for 10+ hours per night. Cast aluminium body, IP66 rated, suitable for lawns, pathways and garden borders.",
    images: ["https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Black","Graphite","Warm Silver"],
    dimensions: "H60 × Ø15 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 79, slug: "cycle-stand-bollard", name: "Cycle Stand Bollard",
    categoryId: "bollards", material: "Powder-coated steel, rubber foot pads",
    shortDescription: "A Sheffield-style cycle stand bollard for campuses, transit hubs and commercial developments.",
    description: "The Cycle Stand Bollard is a Sheffield-type inverted U-bar — the most secure cycle parking format per the Cyclists' Touring Club specification. Powder-coated steel, rubber foot pad. Surface-mount with anchor bolt. Available in single and multi-stand configurations.",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Graphite","Racing Green","Yellow"],
    dimensions: "H90 × W45 cm", availability: "In stock · 1 week", featured: false
  },

  /* ── RAILINGS (5) ── */
  {
    id: 80, slug: "stainless-glass-railing", name: "Stainless Steel & Glass Balustrade",
    categoryId: "railings", material: "316 stainless steel posts, 12mm toughened glass infill",
    shortDescription: "A frameless glass balustrade on stainless steel standoffs — elegant and unobstructed.",
    description: "The Stainless Steel & Glass Balustrade uses 12mm toughened-laminated safety glass panels on 316 stainless steel top rails and channel-base or standoff-mount posts. Compliant with NBC 2016 balustrade code. Ideal for corporate atriums, hotel staircases and rooftop terraces.",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Satin Stainless/Clear Glass","Mirror Polish/Tinted Glass","Matte Black/Clear Glass"],
    dimensions: "H110 cm (top rail height, per NBC), custom lengths", availability: "Project basis · 8–10 weeks", featured: true
  },
  {
    id: 81, slug: "cast-iron-railing", name: "Heritage Cast Iron Railing",
    categoryId: "railings", material: "Cast iron panels, wrought iron top rail",
    shortDescription: "Ornamental cast iron railings for heritage buildings, verandas and period gardens.",
    description: "Manufactured from the original pattern books of Bombay's Victorian-era railing suppliers. Available in three panel patterns — Fleur-de-Lis, Spearhead and Scrollwork. Wrought iron top rail. Hot-dip galvanised and powder-coated. Per-metre pricing with standard 1.0 m and 1.2 m heights.",
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Gloss Black","Forest Green","White"],
    dimensions: "H100/120 cm, sold per linear metre", availability: "Made to order · 8 weeks", featured: false
  },
  {
    id: 82, slug: "wire-rope-railing", name: "Marine-Grade Wire Rope Railing",
    categoryId: "railings", material: "316 stainless steel posts and wire rope infill",
    shortDescription: "A tensioned wire rope balustrade for contemporary homes, offices and rooftop terraces.",
    description: "The Wire Rope Railing system uses 316 stainless steel Ø10 mm horizontal wire ropes on machined steel posts. Horizontal or angled configurations. Tensioning hardware concealed within the posts. Popular for seaside properties, rooftop terraces and contemporary corporate atriums.",
    images: ["https://images.unsplash.com/photo-1550153832-9eed7ec6e8cf?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Satin Stainless Posts","Black Powder-Coated Posts","Brass Posts"],
    dimensions: "H110 cm, sold per linear metre", availability: "Project basis · 6–8 weeks", featured: false
  },
  {
    id: 83, slug: "teak-railing", name: "Solid Teak Balustrade",
    categoryId: "railings", material: "Solid teak posts, rails and balusters",
    shortDescription: "A solid teak balustrade for yacht-grade finishes in luxury residential and hospitality projects.",
    description: "The Solid Teak Balustrade is milled from Grade A teak in two profiles — round balusters (traditional) and flat-bar (contemporary). Fully exposed joinery — mortise and tenon joints, no screws visible. Teak requires annual oiling in outdoor settings. Suitable for covered walkways, resort decks and luxury residential staircases.",
    images: ["https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak (oiled)","Teak + Black Steel Posts"],
    dimensions: "H100 cm, sold per linear metre", availability: "Made to order · 8–10 weeks", featured: false
  },
  {
    id: 84, slug: "modern-steel-railing", name: "Flat-Bar Steel Railing",
    categoryId: "railings", material: "Mild steel flat bars, welded construction",
    shortDescription: "An industrial-aesthetic flat-bar steel railing for contemporary commercial interiors.",
    description: "The Flat-Bar Steel Railing is welded mild steel with a regular flat-bar infill pattern. Available in powder-coated (matte black, white, bronze) or raw-steel finishes. Popular for creative studios, loft offices, technology campuses and contemporary retail. Supplied in panels (per 2 m).",
    images: ["https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Matte Black","White","Raw Steel","Bronze"],
    dimensions: "H100 cm, sold per 2 m panel", availability: "Made to order · 6 weeks", featured: false
  },

  /* ── HOSPITAL FURNITURE (7) ── */
  {
    id: 85, slug: "apollo-hospital-chair", name: "Apollo Visitor Chair",
    categoryId: "hospital-furniture", material: "Vinyl upholstery, chrome steel frame, braked castors",
    shortDescription: "A healthcare visitor chair rated for hospital environments — wipeable, durable and considerate.",
    description: "The Apollo Visitor Chair uses antibacterial vinyl upholstery on a chrome steel frame. Waterfall seat edge and contoured back reduce fatigue during extended visiting hours. Braked castors, linking capability for waiting areas. Tested to EN 12521 and NHS PASA specifications.",
    images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Sky Blue","Coral","Sage Green","Warm Grey","White"],
    dimensions: "W56 × D58 × H85 cm", availability: "In stock · 1 week", featured: true
  },
  {
    id: 86, slug: "lilavati-bedside-cabinet", name: "Lilavati Bedside Cabinet",
    categoryId: "hospital-furniture", material: "Laminate finish, ABS edging, braked castors",
    shortDescription: "A height-adjustable hospital bedside cabinet with lockable storage and tilting top.",
    description: "The Lilavati Bedside Cabinet has a tiltable top surface (for patient meals), two shelves, a lockable valuables drawer and four braked castors. Laminate finish is compatible with hospital disinfectants including hypochlorite and quaternary ammonium compounds.",
    images: ["https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Beige","Light Blue"],
    dimensions: "W52 × D45 × H72–88 cm (adj)", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 87, slug: "kokilaben-waiting-bench", name: "Kokilaben Waiting Bench",
    categoryId: "hospital-furniture", material: "Upholstered seat, chrome steel frame, linking ends",
    shortDescription: "A modular hospital waiting bench in 2, 3 and 4-seat configurations.",
    description: "The Kokilaben Waiting Bench is our most specified piece for hospital waiting areas. Upholstered seat panels (antibacterial vinyl) on a chrome steel continuous beam. Individual beam-mounted seats allow patient access without disturbing others. Anti-ligature version available.",
    images: ["https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Light Blue","Grey","Teal","White"],
    dimensions: "Per seat: W52 cm, Beam H45 cm", availability: "In stock · 1–2 weeks", featured: false
  },
  {
    id: 88, slug: "breach-candy-overbed-table", name: "Breach Candy Overbed Table",
    categoryId: "hospital-furniture", material: "Laminate top, ABS edging, height-adjustable steel column",
    shortDescription: "A fully adjustable overbed table for patient comfort and clinical workflow.",
    description: "The Breach Candy Overbed Table cantilevers over any hospital bed with its on-entry castor lock system. Height adjusts from 75–115 cm. Tilting top surface (0–45°) for reading and eating. Removable and sterilisable top. Steel column, ABS base.",
    images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Beige"],
    dimensions: "W55 × D40 × H75–115 cm (adj)", availability: "In stock · 1 week", featured: false
  },
  {
    id: 89, slug: "hinduja-treatment-chair", name: "Hinduja Treatment Chair",
    categoryId: "hospital-furniture", material: "Medical vinyl, motorised frame, stainless steel base",
    shortDescription: "An electrically adjustable treatment chair for dermatology, oncology and general clinical use.",
    description: "The Hinduja Treatment Chair offers full motorised adjustment: height (47–85 cm), backrest (0–80°) and leg rest (0–45°). Medical vinyl upholstery, stainless steel frame. Three-section configuration supports procedures from GP consultations to IV infusions.",
    images: ["https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Clinical White","Silver Blue","Charcoal"],
    dimensions: "W72 × D170 (reclined) × H47–85 cm", availability: "Made to order · 6 weeks", featured: false
  },
  {
    id: 90, slug: "nanavati-nurses-station", name: "Nanavati Nurses Station",
    categoryId: "hospital-furniture", material: "Compact laminate, corian top, modular steel frame",
    shortDescription: "A modular nurses station in compact laminate and Corian — the command centre of every ward.",
    description: "The Nanavati Nurses Station is a fully modular system: reception bay, charting bay, medication preparation bay and handwash bay. Corian top surface is non-porous and seamless. All edges are antibacterial-coated ABS. Available in straight, L-shape and curved configurations. Custom sizes available.",
    images: ["https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White Corian/White Laminate","White/Light Grey","Custom per project"],
    dimensions: "Reception bay: W160 × D80 × H110 cm", availability: "Made to order · 10–12 weeks", featured: false
  },
  {
    id: 91, slug: "jaslok-privacy-screen", name: "Jaslok Ward Privacy Screen",
    categoryId: "hospital-furniture", material: "Aluminium frame, antibacterial privacy curtain, braked castors",
    shortDescription: "A mobile privacy screen for ward bays, treatment areas and dignified clinical examination.",
    description: "The Jaslok Ward Privacy Screen has an anodised aluminium frame on four braked castors. The antibacterial privacy curtain is machine-washable and compliant with NHS HTM 01-01 decontamination guidance. Available in 3-panel (H200 × W300 cm) and 4-panel configurations.",
    images: ["https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Sky Blue Curtain","White Curtain","Sage Green"],
    dimensions: "H200 × W300 cm (3-panel)", availability: "In stock · 1 week", featured: false
  },

  /* ── 9 MORE PRODUCTS to reach ~100 ── */
  {
    id: 92, slug: "cuffe-parade-ottoman", name: "Cuffe Parade Ottoman",
    categoryId: "lounge-chairs", material: "Velvet upholstery, solid oak base",
    shortDescription: "A generous round ottoman that serves as footstool, extra seat or accent centrepiece.",
    description: "The Cuffe Parade Ottoman pairs with the Cuffe Parade Executive Desk and Versova Lounge Chair, but stands alone beautifully as a statement piece. Available in all 20 velvet colours. Solid oak base.",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Ivory","Sage","Dusty Rose","Charcoal","Midnight Blue"],
    dimensions: "Ø80 × H40 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 93, slug: "nariman-bookcase", name: "Nariman Open Bookcase",
    categoryId: "tables-desk", material: "Solid oak shelves, blackened steel frame",
    shortDescription: "A freestanding open bookcase in solid oak and blackened steel — functional and architectural.",
    description: "The Nariman Open Bookcase has 5 shelves in varying heights to accommodate books, files and display objects. Adjustable shelf heights. Solid oak, blackened steel frame. Available in 80 cm wide single and 160 cm wide double configurations.",
    images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Oak/Black Steel","Smoked Oak/Bronze","White/Chrome"],
    dimensions: "W80 × D35 × H200 cm", availability: "In stock · 2–3 weeks", featured: false
  },
  {
    id: 94, slug: "marine-lines-partition", name: "Marine Lines Acoustic Partition",
    categoryId: "workstations", material: "Acoustic fabric panels, aluminium connectors",
    shortDescription: "A freestanding acoustic partition system for open-plan office space division.",
    description: "The Marine Lines Acoustic Partition system connects with aluminium T- and L-bar connectors to create any plan configuration. 50mm acoustic foam core reduces sound transfer by up to 22 dB (Rw). Fabric in 30 colours. No fixing to floor or ceiling — fully freestanding.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["60+ colour options","Anti-bacterial Fabric range"],
    dimensions: "W100/120/160 cm × H150/180 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 95, slug: "byculla-filing-cabinet", name: "Byculla Lateral Filing Cabinet",
    categoryId: "workstations", material: "18mm MFC, central-lock steel mechanism",
    shortDescription: "A 4-drawer lateral filing cabinet for A4 and foolscap files — sturdy and quiet-closing.",
    description: "The Byculla Lateral Filing Cabinet has 4 drawers with a single-key central-lock. Soft-close drawer slides, anti-tilt mechanism (only one drawer opens at a time). 18mm moisture-resistant MFC. Compatible in finish with the Bandra Workstation System and Andheri Private Office Suite.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Light Oak","Graphite","Walnut"],
    dimensions: "W80 × D45 × H132 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 96, slug: "juhu-teak-planter", name: "Juhu Teak Planter",
    categoryId: "outdoor-furniture", material: "Grade A teak, stainless steel liner",
    shortDescription: "A solid teak planter box with stainless steel liner for terraces and lobby entrances.",
    description: "The Juhu Teak Planter is milled from Grade A teak with a welded stainless steel liner (with drainage holes). No rot, no paint required. Available in three sizes: small (W40), medium (W60) and large (W90 cm). Suitable for all outdoor environments.",
    images: ["https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Natural Teak","Grey-Washed Teak"],
    dimensions: "W40/60/90 × D40 × H45 cm", availability: "In stock · 1 week", featured: false
  },
  {
    id: 97, slug: "bandra-lockers", name: "Bandra Personal Locker Unit",
    categoryId: "workstations", material: "Powder-coated steel, digital keypad lock",
    shortDescription: "A 9-compartment personal locker unit with digital keypad — for hot-desk and agile offices.",
    description: "The Bandra Personal Locker Unit provides secure personal storage for hot-desk and agile working environments. Each of the 9 compartments has an individual digital keypad lock (pin or RFID). Available in freestanding and wall-mounted configurations. Stackable (up to 2 high).",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Graphite","Black"],
    dimensions: "W90 × D45 × H180 cm (9-compartment, freestanding)", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 98, slug: "churchgate-phone-booth", name: "Churchgate Acoustic Phone Booth",
    categoryId: "workstations", material: "MDF frame, acoustic panels, tempered glass door",
    shortDescription: "A freestanding office phone booth for private calls in open-plan environments.",
    description: "The Churchgate Acoustic Phone Booth provides a sound-reduced (Rw 30 dB) private space for calls and focused work. Tempered glass door, integrated ventilation fan, LED lighting, power strip and USB-A/C outlets. Available in 1-person and 2-person configurations. No installation required — plug-in ready.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White","Graphite","Oak"],
    dimensions: "W90 × D90 × H220 cm (1-person)", availability: "In stock · 2–3 weeks", featured: true
  },
  {
    id: 99, slug: "santacruz-outdoor-dining", name: "Santacruz Outdoor Dining Set",
    categoryId: "outdoor-furniture", material: "Powder-coated aluminium table, stackable aluminium chairs",
    shortDescription: "A 6-seat outdoor dining set in powder-coated aluminium — for hotel terraces and rooftop restaurants.",
    description: "The Santacruz Outdoor Dining Set includes a rectangular table (180×90 cm) and 6 stackable aluminium chairs. All powder-coated in weather-resistant finishes. No maintenance required. Chairs stack 10-high. Matching parasol base available.",
    images: ["https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=800"],
    finishes: ["White Set","Charcoal Set","Taupe/Natural"],
    dimensions: "Table: W180 × D90 × H75 cm, Chair: W50 × D55 × H88 cm", availability: "In stock · 2 weeks", featured: false
  },
  {
    id: 100, slug: "sealink-umbrella-stand", name: "Sealink Patio Umbrella",
    categoryId: "outdoor-furniture", material: "Aluminium pole, Olefin canopy, weighted base",
    shortDescription: "A commercial-grade 3m parasol for outdoor dining and pool-deck shade.",
    description: "The Sealink Patio Umbrella uses a 50mm powder-coated aluminium pole and an Olefin fabric canopy (UPF 50+). A crank and tilt mechanism enables single-handed operation. Weighted cast iron base (55 kg) is included. Available in octagonal (3m Ø) and rectangular (2×3m) formats.",
    images: ["https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=800"],
    finishes: ["Ecru","Charcoal","Terracotta","Forest Green","Navy"],
    dimensions: "Ø300 cm (octagonal)", availability: "In stock · 1 week", featured: false
  },
];

/* ── 20 PROJECTS ── */
const PROJECTS = [
  {
    id: 1, slug: "axis-bank-hq", title: "Axis Bank Headquarters",
    location: "Vijay Nagar, Indore", industry: "Finance", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    secondImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    description: "A 14-floor corporate headquarters for one of India's largest private banks. The brief called for furniture that communicated stability and precision while remaining welcoming to clients and staff alike.",
    scope: "Supplied and installed 2,800 workstations across open-plan floors, executive suites on floors 12–14, seven boardrooms, a 200-seat cafeteria, and all lobby furniture across 3 entrance lobbies.",
    challenge: "Coordinating installation across 14 floors while the building remained operational for 6,000 employees required a night-shift delivery schedule and prefabricated modular systems.",
    clientTestimonial: "Artisan & Co. delivered on time, on spec, and with a level of site management we haven't seen from any other furniture supplier in 20 years of commercial real estate.",
    clientName: "Head of Real Estate, Axis Bank",
    furniturePieces: "2,800 workstations · 340 executive chairs · 42 boardroom chairs · 200 café seats",
    area: "4,20,000 sq ft", timeline: "14 months",
    products: ["bandra-workstation-system","cambridge-executive-chair","malabar-conference-table"],
    featured: true
  },
  {
    id: 2, slug: "taj-lands-end", title: "Taj Lands End Hotel",
    location: "Palasia, Indore", industry: "Hospitality", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    secondImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
    description: "A complete furniture refit of the hotel's public areas, including the lobby, three restaurants, poolside and rooftop terrace, and all executive meeting rooms.",
    scope: "Complete public area furniture including lobby seating clusters, restaurant furniture for La Brasserie (80 covers), Wasabi (60 covers), and Harbour Bar (40 covers), plus poolside and rooftop terrace furniture.",
    challenge: "All furniture in the three restaurants had to be delivered and installed during a 72-hour window between restaurant closures to minimise revenue impact.",
    clientTestimonial: "The quality of the pieces is exceptional — guests comment on the lobby furniture regularly. The team understood our brand standards without us having to explain them twice.",
    clientName: "General Manager, Taj Lands End",
    furniturePieces: "180 restaurant chairs · 40 bar stools · 22 sofa clusters · 80 outdoor pieces",
    area: "28,000 sq ft (public areas)", timeline: "8 months",
    products: ["colaba-modular-sofa","andheri-cafe-chair","juhu-outdoor-bench"],
    featured: true
  },
  {
    id: 3, slug: "jpmorgan-powai", title: "JP Morgan India Campus",
    location: "Rau, Indore", industry: "Finance", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1200",
    secondImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
    description: "A new 8-floor technology and operations campus for 4,000 employees, designed to global JP Morgan workspace standards while incorporating Indian craft sensibilities.",
    scope: "4,000 workstations across 6 open-plan floors; 2 trading floors with specialist seating; 24 meeting rooms; 3 town hall spaces; 2 rooftop terraces.",
    challenge: "The trading floor seating required compliance with JP Morgan's global ergonomics standard — we obtained certification within 6 weeks.",
    clientTestimonial: "Artisan & Co. are the only supplier in India who could meet our global specifications at the price point and quality our Indore campus required.",
    clientName: "Asia Pacific Workplace Director, JP Morgan",
    furniturePieces: "4,000 workstations · 600 task chairs · 24 conference tables · 380 meeting chairs",
    area: "6,40,000 sq ft", timeline: "18 months",
    products: ["bandra-workstation-system","cambridge-executive-chair","nariman-trading-desk"],
    featured: true
  },
  {
    id: 4, slug: "imax-worli", title: "IMAX Worli Executive Suites",
    location: "Bhawarkuan, Indore", industry: "Technology", completionYear: "2024",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    description: "Bespoke furniture for the executive floor of IMAX's India headquarters, including a custom 20-seat boardroom table and private dining suite.",
    scope: "20-seat boardroom table in bookmatched walnut, 20 boardroom chairs, private dining suite for 12, CEO office suite, 3 executive meeting rooms.",
    area: "8,500 sq ft", timeline: "5 months",
    products: ["malabar-conference-table","cambridge-executive-chair","cuffe-parade-executive-desk"],
    featured: false
  },
  {
    id: 5, slug: "oberoi-nariman-point", title: "Oberoi Nariman Point — Lobby Refresh",
    location: "Rajwada, Indore", industry: "Hospitality", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    description: "A refresh of the iconic Oberoi Nariman Point lobby, replacing the existing furniture while respecting the building's heritage aesthetic.",
    scope: "Lobby seating for 120 guests, concierge counter furniture, all-day dining furniture for 80 covers.",
    clientTestimonial: "The new lobby furniture transformed the arrival experience. Multiple guests have specifically commented on it.",
    clientName: "Director of Operations, Oberoi Nariman Point",
    furniturePieces: "120 lobby seats · 80 dining seats · 4 concierge units",
    area: "12,000 sq ft", timeline: "4 months",
    products: ["colaba-modular-sofa","versova-lounge-chair","gateway-marble-table"],
    featured: false
  },
  {
    id: 6, slug: "kokilaben-hospital", title: "Kokilaben Dhirubhai Ambani Hospital",
    location: "MG Road, Indore", industry: "Healthcare", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    secondImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    description: "Complete furniture supply for the 750-bed expansion of one of Indore's premier private hospitals — waiting areas, patient rooms, clinical areas and staff zones.",
    scope: "750 bedside cabinets, 800 visitor chairs, 1,200 waiting seats, 22 nurses stations, 40 treatment chairs, privacy screens for 200 bays, and full staff lounge furniture.",
    challenge: "All healthcare furniture had to comply with NABH accreditation requirements and be compatible with specified hospital disinfectant protocols.",
    clientTestimonial: "The attention to clinical detail — anti-ligature fittings, disinfectant compatibility — showed that Artisan & Co. truly understood the healthcare environment.",
    clientName: "Chief Facilities Officer, KD Hospital",
    furniturePieces: "750 bedside cabinets · 800 visitor chairs · 22 nurses stations · 40 treatment chairs",
    area: "3,80,000 sq ft", timeline: "20 months",
    products: ["apollo-hospital-chair","lilavati-bedside-cabinet","kokilaben-waiting-bench","nanavati-nurses-station"],
    featured: true
  },
  {
    id: 7, slug: "navi-indore-smart-city", title: "Indore Smart City Plaza",
    location: "Indore", industry: "Civic", completionYear: "2024",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200",
    description: "Street furniture for a 2.4 km smart city pedestrian boulevard — benches, lamp posts, bollards, cycle stands and planters — designed as a unified system.",
    scope: "180 park benches, 90 cast iron lamp posts, 240 heritage bollards, 60 cycle stand bollards, 120 teak planters, and all railings along the boulevard.",
    challenge: "All pieces had to be designed as a single coherent family yet serve very different functional roles — from high-impact vehicle bollards to delicate ornamental lamp posts.",
    furniturePieces: "180 benches · 90 lamp posts · 240 bollards · 60 cycle stands · 120 planters",
    area: "2.4 km boulevard", timeline: "16 months",
    products: ["shivaji-park-bench","heritage-lamp-post","heritage-bollard","juhu-teak-planter"],
    featured: true
  },
  {
    id: 8, slug: "godrej-bhc", title: "Godrej One, Bhandup",
    location: "Lasudia, Indore", industry: "Technology", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
    description: "A 12-floor technology campus for Godrej Properties' flagship commercial tower — 3,600 workstations with a strong emphasis on collaborative and wellness zones.",
    scope: "3,600 sit-stand workstations, 400 collaboration tables, 200-seat cafeteria, rooftop garden furniture, 8 town hall spaces.",
    challenge: "Client specified 100% height-adjustable desks — the largest sit-stand installation in Western India at the time of completion.",
    furniturePieces: "3,600 sit-stand desks · 480 ergonomic chairs · 200 cafeteria sets · 80 collaborative tables",
    area: "5,50,000 sq ft", timeline: "16 months",
    products: ["lower-parel-sit-stand","prestige-ergonomic-chair","andheri-cafe-chair"],
    featured: false
  },
  {
    id: 9, slug: "tcs-banyan-park", title: "TCS Banyan Park Campus",
    location: "Thane", industry: "Technology", completionYear: "2021",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "Furniture for the amenities wing of the TCS Banyan Park campus — an 800-seat food court, 3 large recreation rooms, and all outdoor civic furniture across 12 acres of landscape.",
    scope: "800-seat food court, 3 recreation lounges, outdoor furniture for 12-acre campus including benches, planters, bollards and lamp posts.",
    furniturePieces: "800 food court seats · 120 lounge chairs · 400 outdoor pieces",
    area: "12 acres campus", timeline: "12 months",
    products: ["andheri-cafe-chair","bkc-modular-outdoor-sofa","fort-garden-bench","heritage-lamp-post"],
    featured: false
  },
  {
    id: 10, slug: "indore-international-airport", title: "CSIA Terminal 2 — VIP Lounge",
    location: "Aerodrome Road, Indore", industry: "Civic", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&q=80&w=1200",
    description: "The complete furniture package for the redesigned VIP and Business Class lounges at Chhatrapati Shivaji Maharaj International Airport Terminal 2.",
    scope: "VIP lounge (48 seats), Business lounge (220 seats), premium dining (60 covers), all recliners, sofas, side tables and privacy screens.",
    challenge: "All furniture had to be DGCA and AAI compliant — aviation-grade fire-rating documentation was required for every upholstered piece.",
    clientTestimonial: "The recliners in the VIP lounge have been specifically mentioned in multiple traveller reviews as a highlight of the airport experience.",
    clientName: "Senior Manager, MIAL",
    furniturePieces: "268 lounge seats · 60 dining seats · 48 recliners · 22 privacy screens",
    area: "18,000 sq ft", timeline: "10 months",
    products: ["parel-recliner","pali-hill-sectional","colaba-bistro-chair"],
    featured: true
  },
  {
    id: 11, slug: "deloitte-lower-parel", title: "Deloitte India Headquarters",
    location: "AB Road, Indore", industry: "Finance", completionYear: "2024",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    description: "A complete fit-out of Deloitte's new India headquarters across 10 floors — an agile working environment with no fixed desks for 2,400 staff.",
    scope: "2,400 hot-desk workstations, 180 phone booths, 60 collaborative tables, 24 formal meeting rooms, 6 town halls, 3 client suites.",
    furniturePieces: "2,400 workstations · 180 phone booths · 600 ergonomic chairs",
    area: "3,20,000 sq ft", timeline: "14 months",
    products: ["powai-collaborative-bench","churchgate-phone-booth","prestige-ergonomic-chair","bandra-personal-lockers"],
    featured: false
  },
  {
    id: 12, slug: "leela-palace-pune", title: "The Leela Palace, Pune",
    location: "Pune", industry: "Hospitality", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1540541338537-61cce3c4a5f4?auto=format&fit=crop&q=80&w=1200",
    description: "A new five-star palace hotel in Pune — complete furniture supply for all 243 rooms, public areas, spa, restaurants and arrival forecourt landscape.",
    scope: "243 room furniture sets, lobby furniture, 3 restaurants (320 total covers), spa reception and treatment furniture, arrival forecourt lamp posts and bollards.",
    challenge: "Palace-style furniture required hand-crafted detailing — gold-leaf application, hand-tufting, custom brass hardware — at volumes that would normally preclude such techniques.",
    clientTestimonial: "Every piece was specified to our brief without compromise. The quality speaks for itself — our guests consistently rate the room furniture as exceptional.",
    clientName: "Project Director, Leela Palaces",
    furniturePieces: "243 room sets · 320 restaurant covers · 60 spa pieces · 80 forecourt units",
    area: "6,20,000 sq ft", timeline: "22 months",
    products: ["fort-chesterfield-sofa","mayfair-conference-chair","heritage-bollard","art-deco-lamp-post"],
    featured: true
  },
  {
    id: 13, slug: "iit-bombay-library", title: "IIT Bombay — Central Library",
    location: "Rau, Indore", industry: "Education", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    description: "A complete furniture refurbishment of IIT Bombay's 1.2 million-book Central Library — new seating, carrels, group tables and lounge areas.",
    scope: "800 individual study carrels, 200 group-study tables, 400 lounge seats, reference desk furniture, 12 seminar rooms.",
    furniturePieces: "800 study carrels · 200 tables · 400 lounge seats · 12 seminar rooms",
    area: "85,000 sq ft", timeline: "10 months",
    products: ["thane-l-shaped-workstation","oxford-task-chair","versova-lounge-chair"],
    featured: false
  },
  {
    id: 14, slug: "lodha-altamount", title: "Lodha Altamount — Penthouse Collection",
    location: "South Tukoganj, Indore", industry: "Residential", completionYear: "2024",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    description: "Bespoke furniture for 12 penthouses in Lodha's ultra-luxury Altamount Road development — each unit individually specified to the owner's brief.",
    scope: "12 individual penthouse furniture packages including living, dining, study, master suite and terrace furniture. No two units identical.",
    challenge: "Each of the 12 penthouse owners had a different brief — from Japanese minimalism to Maharaja opulence — requiring 12 separate design teams to work in parallel.",
    furniturePieces: "12 complete penthouse packages · 85 bespoke pieces total",
    area: "Per unit: 8,000–12,000 sq ft", timeline: "18 months",
    products: ["gateway-marble-table","warden-road-swivel-chair","cuffe-parade-executive-desk","pali-hill-sectional"],
    featured: false
  },
  {
    id: 15, slug: "hdfc-life-goregaon", title: "HDFC Life Insurance — Campus",
    location: "Scheme 54, Indore", industry: "Finance", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200",
    description: "A 5-floor operational campus for 2,000 HDFC Life Insurance employees — contact centre fit-out and back-office environment.",
    scope: "2,000 high-density workstations, team leader pods, 18 meeting rooms, 150-seat cafeteria, manager's offices.",
    furniturePieces: "2,000 workstations · 280 task chairs · 18 meeting rooms · 150 cafeteria seats",
    area: "2,40,000 sq ft", timeline: "10 months",
    products: ["churchgate-pod-workstation","oxford-task-chair","mayfair-conference-chair"],
    featured: false
  },
  {
    id: 16, slug: "bmc-ward-offices", title: "BMC Ward Offices Modernisation",
    location: "Multiple Indore Wards", industry: "Civic", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200",
    description: "Furniture modernisation for 24 BMC ward offices across Indore — a Government of Maharashtra initiative to improve civic service environments for citizens.",
    scope: "24 ward offices, each receiving: reception desk, waiting chairs, officer workstations, visitor chairs and signage.",
    challenge: "Government procurement rules required a single consolidated tender for all 24 offices — we won with the only responsive bid.",
    furniturePieces: "24 reception desks · 480 visitor chairs · 240 officer workstations",
    area: "Per ward: 3,000–6,000 sq ft", timeline: "12 months",
    products: ["santacruz-reception-desk","delhi-visitor-chair","andheri-private-office"],
    featured: false
  },
  {
    id: 17, slug: "jw-marriott-sahar", title: "JW Marriott, Sahar",
    location: "Dewas Naka, Indore", industry: "Hospitality", completionYear: "2021",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    description: "Poolside and terrace furniture refresh for the JW Marriott adjacent to the international airport — outdoor dining, sun loungers and garden seating.",
    scope: "Pool deck: 80 sun loungers, 40 daybeds; terrace restaurant: 120 outdoor dining seats; garden: 30 benches.",
    furniturePieces: "80 sun loungers · 40 daybeds · 120 dining seats · 30 garden benches",
    area: "22,000 sq ft (outdoor)", timeline: "5 months",
    products: ["marine-drive-sun-lounger","santacruz-outdoor-dining","juhu-outdoor-bench","bkc-modular-outdoor-sofa"],
    featured: false
  },
  {
    id: 18, slug: "cipla-goregaon-campus", title: "Cipla Limited — Global Campus",
    location: "Vijay Nagar, Indore", industry: "Healthcare", completionYear: "2024",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    description: "The complete fit-out of Cipla's new global headquarters campus — laboratories, offices, training facility and auditorium across 8 floors.",
    scope: "Offices: 1,800 workstations and 200 executive offices; Training: 12 training rooms; Auditorium: 400-seat theatre; Campus landscape: benches, lamp posts and bollards.",
    furniturePieces: "1,800 workstations · 200 executive offices · 400 auditorium seats",
    area: "4,80,000 sq ft", timeline: "18 months",
    products: ["bandra-workstation-system","andheri-private-office","bombay-training-chair"],
    featured: false
  },
  {
    id: 19, slug: "mahindra-kandivali", title: "Mahindra Tech Park, Kandivali",
    location: "Scheme 78, Indore", industry: "Technology", completionYear: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "A new technology park campus for 5,000 employees of Mahindra Group subsidiaries — a flexible, activity-based working environment.",
    scope: "5,000 activity-based workstations, 240 phone booths, 48 large collaboration tables, 4 food courts totalling 1,200 seats, full campus outdoor furniture.",
    furniturePieces: "5,000 workstations · 240 phone booths · 1,200 food court seats",
    area: "9,20,000 sq ft", timeline: "24 months",
    products: ["powai-collaborative-bench","churchgate-phone-booth","andheri-cafe-chair","shivaji-park-bench"],
    featured: true
  },
  {
    id: 20, slug: "bandra-kurla-plaza", title: "BKC Financial Plaza — Streetscape",
    location: "Super Corridor, Indore", industry: "Civic", completionYear: "2022",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200",
    description: "The complete streetscape furniture package for the BKC Financial Plaza — India's premier financial district. A landmark project for Artisan & Co., visible to 50,000 commuters daily.",
    scope: "1.2 km of streetscape: 96 heritage bollards, 48 contemporary lamp posts, 120 park benches, 60 cycle stands, 30 ornamental railings, 80 planters.",
    challenge: "All pieces had to be installed without disrupting the 50,000 daily pedestrians using the BKC promenade — installation was phased over 9 weekends.",
    furniturePieces: "96 bollards · 48 lamp posts · 120 benches · 60 cycle stands · 80 planters",
    area: "1.2 km promenade", timeline: "11 months",
    products: ["heritage-bollard","heritage-lamp-post","shivaji-park-bench","cycle-stand-bollard"],
    featured: false
  },
];

const CATEGORY_LABELS = {
  chair: "Chair", recliner: "Recliner", "cast-iron-lamp-post": "Lamp Post",
  "garden-benches": "Garden Bench", bollards: "Bollard", railings: "Railing",
  workstations: "Workstation", "tables-desk": "Table & Desk", sofas: "Sofa",
  "lounge-chairs": "Lounge Chair", "centre-table": "Centre Table",
  "cafe-restaurant": "Café & Restaurant", "outdoor-furniture": "Outdoor",
  "hospital-furniture": "Hospital",
};

function getCategoryLabel(id) {
  return CATEGORY_LABELS[id] || id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function getProducts({ categoryId, featured } = {}) {
  let list = [...PRODUCTS];
  if (categoryId) list = list.filter(p => p.categoryId === categoryId);
  if (featured === true) list = list.filter(p => p.featured);
  return list;
}

function getProduct(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

function getProjects({ featured } = {}) {
  let list = [...PROJECTS];
  if (featured === true) list = list.filter(p => p.featured);
  return list;
}

function getProject(slug) {
  return PROJECTS.find(p => p.slug === slug) || null;
}

function getCategory(id) {
  return CATEGORIES.find(c => c.id === id) || null;
}

function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { products: [], projects: [] };
  const products = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.material.toLowerCase().includes(q) ||
    getCategoryLabel(p.categoryId).toLowerCase().includes(q)
  );
  const projects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.location.toLowerCase().includes(q) ||
    p.industry.toLowerCase().includes(q) ||
    (p.description && p.description.toLowerCase().includes(q))
  );
  return { products, projects };
}
