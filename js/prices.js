// Price map keyed by product slug (in INR) — competitive pricing (~15% further reduction)
const PRODUCT_PRICES = {
  // Chairs
  "cambridge-executive-chair": 49500,
  "oxford-task-chair": 23200,
  "delhi-visitor-chair": 10200,
  "mayfair-conference-chair": 29800,
  "bombay-training-chair": 4900,
  "regent-high-back": 34300,
  "lotus-breakout-stool": 12200,
  "prestige-ergonomic-chair": 43100,
  // Sofas
  "colaba-modular-sofa": 80200,
  "bandra-reception-sofa": 102300,
  "worli-corner-sofa": 124400,
  "kala-ghoda-bench-sofa": 61900,
  "fort-chesterfield-sofa": 135400,
  "dadar-two-seater": 37600,
  "pali-hill-sectional": 163000,
  // Workstations
  "bandra-workstation-system": 21300,
  "andheri-private-office": 69100,
  "lower-parel-sit-stand": 30400,
  "churchgate-pod-workstation": 91200,
  "nariman-trading-desk": 39800,
  "powai-collaborative-bench": 17700,
  "thane-l-shaped-workstation": 24900,
  "santacruz-reception-desk": 107800,
  // Tables & Desks
  "malabar-conference-table": 157500,
  "heritage-boardroom-table": 268000,
  "flora-fountain-writing-desk": 48600,
  "pedder-road-side-table": 28700,
  "connect-huddle-table": 19400,
  "venus-training-table": 12200,
  "cuffe-parade-executive-desk": 301200,
  // Lounge Chairs
  "versova-lounge-chair": 26500,
  "warden-road-swivel-chair": 52500,
  "breach-candy-tub-chair": 32000,
  "juhu-egg-chair": 74600,
  "churchgate-wing-chair": 63600,
  "worli-pod-chair": 69100,
  "khar-accent-chair": 23200,
  // Centre Tables
  "gateway-marble-table": 80200,
  "nariman-oval-table": 54100,
  "cst-nesting-tables": 30400,
  "dharavi-industrial-table": 34300,
  "juhu-terrazzo-table": 41500,
  "kemps-corner-side-table": 10200,
  // Cafe & Restaurant
  "andheri-cafe-chair": 4200,
  "colaba-bistro-chair": 5400,
  "bandra-bar-stool": 8000,
  "fort-banquet-chair": 6600,
  "worli-dining-table": 9900,
  "grant-road-booth-seating": 15500,
  "cafe-terrace-set": 30400,
  // Outdoor
  "juhu-outdoor-bench": 17700,
  "marine-drive-sun-lounger": 24900,
  "powai-planter-seat": 47000,
  "chowpatty-picnic-table": 23200,
  "versova-bistro-outdoor-set": 21000,
  "bkc-modular-outdoor-sofa": 92800,
  "bandstand-swing-seat": 39800,
  // Recliners
  "parel-recliner": 63600,
  "cumballa-hill-chaise": 80200,
  "wadala-zero-gravity": 107800,
  "mahim-nursing-recliner": 47000,
  "chembur-cinema-recliner": 70700,
  "sion-lounge-recliner": 54100,
  // Garden Benches
  "fort-garden-bench": 21000,
  "bandstand-backless-bench": 30400,
  "byculla-memorial-bench": 36000,
  "shivaji-park-bench": 15500,
  "chhatrapati-tree-bench": 52500,
  "elephanta-stone-bench": 39800,
  // Lamp Posts
  "heritage-lamp-post": 26500,
  "contemporary-lamp-post": 21000,
  "bollard-lamp-post": 12200,
  "art-deco-lamp-post": 34300,
  "plaza-lamp-post": 19400,
  // Bollards
  "heritage-bollard": 10200,
  "modern-steel-bollard": 13300,
  "security-bollard": 47000,
  "solar-light-bollard": 17700,
  "cycle-stand-bollard": 6600,
  // Railings (per linear metre)
  "stainless-glass-railing": 4700,
  "cast-iron-railing": 3400,
  "wire-rope-railing": 3200,
  "teak-railing": 5100,
  "modern-steel-railing": 2600,
  // Hospital
  "apollo-hospital-chair": 12200,
  "lilavati-bedside-cabinet": 19400,
  "kokilaben-waiting-bench": 15700,
  "breach-candy-overbed-table": 17700,
  "hinduja-treatment-chair": 80200,
  "nanavati-nurses-station": 157500,
  "jaslok-privacy-screen": 9900,
  // Others
  "cuffe-parade-ottoman": 21000,
  "nariman-bookcase": 39800,
  "marine-lines-partition": 13300,
  "byculla-filing-cabinet": 17700,
  "juhu-teak-planter": 12200,
  "bandra-lockers": 30400,
  "churchgate-phone-booth": 102300,
  "santacruz-outdoor-dining": 69100,
  "sealink-umbrella-stand": 15500,
  "bandra-personal-lockers": 30400,
};

function getProductPrice(slug) {
  return PRODUCT_PRICES[slug] || null;
}

function formatPrice(amount) {
  if (!amount) return 'Price on Request';
  return '₹' + amount.toLocaleString('en-IN');
}
