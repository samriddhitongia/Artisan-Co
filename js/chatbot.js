/* ── Artisan & Co. — Efficient Local Chatbot ── */
(function () {
  'use strict';
  let open = false;

  /* ═══════════════════════════════════════════════
     KNOWLEDGE BASE
  ═══════════════════════════════════════════════ */
  const KB = {
    phone: '+91 731 234 5678',
    email: 'info@artisanco.in',
    showroom: 'Palasia, Indore — Mon–Sat, 10am–7pm',
    gst: '18% GST applicable on all prices shown',
    warranty: '2 years structural · 1 year upholstery',
    deposit: '50% advance for made-to-order items',
    delivery: { stock: '1–3 weeks', custom: '4–14 weeks' },
  };

  /* ═══════════════════════════════════════════════
     INTENT MAP  — each intent has:
       keys:  array of keyword strings (OR logic, each is a word/phrase)
       reply: string | function → string
  ═══════════════════════════════════════════════ */
  const INTENTS = [
    /* ── Greetings ── */
    {
      keys: ['hi','hello','hey','namaste','good morning','good afternoon','good evening','hii','helo'],
      reply: () => `Hello! Welcome to Artisan & Co. 👋\nHow can I help you today? Ask me about products, pricing, lead times, or getting a quote.`,
      quick: ['Browse products', 'Get a quote', 'Pricing info', 'Contact us'],
    },
    {
      keys: ['thanks','thank you','thank','cheers','great','perfect','awesome'],
      reply: () => `You're most welcome! Is there anything else I can help you with? 😊`,
    },
    {
      keys: ['bye','goodbye','see you','that\'s all','done','nothing else'],
      reply: () => `Thank you for visiting Artisan & Co.! Feel free to come back anytime or call us at ${KB.phone}. Goodbye! 🙏`,
    },
    {
      keys: ['who are you','what are you','are you a bot','are you human','are you ai','are you real'],
      reply: () => `I'm the Artisan & Co. virtual assistant — your instant guide to our full catalogue of premium furniture. I know everything about our products, pricing, lead times, and customisation. What can I help you find?`,
    },

    /* ── Room-based queries ── */
    {
      keys: ['living room','lounge room','drawing room','sitting room','hall','foyer','entrance','drawing'],
      reply: () => `Great choice! For **Living Rooms & Halls** we recommend:\n\n🛋️ **Sofas** — Colaba Modular (from ₹80,200), Fort Chesterfield (₹1,35,400)\n🪑 **Lounge Chairs** — Juhu Egg Chair (₹74,600), Khar Accent Chair (₹23,200)\n☕ **Centre Tables** — Gateway Marble (₹80,200), Nariman Oval (₹54,100)\n\nWould you like to see the full living room collection?`,
    },
    {
      keys: ['bedroom','bed room','master bedroom','guest room'],
      reply: () => `For **Bedrooms**, our most popular choices are:\n\n🛏️ **Recliners** — Parel Recliner (₹63,600), Cumballa Hill Chaise (₹80,200)\n🪑 **Side Tables** — Pedder Road Side Table (₹28,700), Kemps Corner (₹10,200)\n🛋️ **Ottomans** — Cuffe Parade Ottoman (₹21,000)\n\nAll available in custom fabrics and finishes. Shall I help you choose?`,
    },
    {
      keys: ['dining room','dining','dinner table','dining chair','dining set'],
      reply: () => `For **Dining Rooms**, we have:\n\n🍽️ **Dining Chairs** — Colaba Bistro (₹5,400), Fort Banquet (₹6,600)\n🪵 **Dining Tables** — Worli Dining Table (₹9,900), Malabar Conference Table (₹1,57,500)\n🍸 **Bar Stools** — Bandra Bar Stool (₹8,000)\n\nDining sets also available as a package — ask for pricing!`,
    },
    {
      keys: ['home office','study room','study','work from home','wfh','reading room'],
      reply: () => `For a **Home Office / Study**, we recommend:\n\n💼 **Desks** — Flora Fountain Writing Desk (₹48,600), Cuffe Parade Executive Desk (₹3,01,200)\n🪑 **Task Chairs** — Oxford Task Chair (₹23,200), Prestige Ergonomic (₹43,100)\n📚 **Bookshelves** — Nariman Bookcase (₹39,800)\n\nWe can also customise dimensions to fit your room perfectly!`,
    },
    {
      keys: ['balcony','terrace','garden','outdoor home','patio','verandah'],
      reply: () => `For **Balconies & Outdoor Spaces**:\n\n🌿 **Bistro Sets** — Versova Bistro Outdoor Set (₹21,000)\n☀️ **Sun Loungers** — Marine Drive Lounger (₹24,900)\n🪑 **Garden Benches** — Fort Garden Bench (₹21,000)\n🛋️ **Outdoor Sofas** — BKC Modular Outdoor Sofa (₹92,800)\n\nAll weather-resistant and UV-stable. Great for Indian climate!`,
    },
    {
      keys: ['kitchen','pantry'],
      reply: () => `For **Kitchen & Pantry** areas, we have bar stools, café chairs, and compact dining sets that work beautifully. Our Bandra Bar Stool (₹8,000) and Andheri Café Chair (₹4,200) are best-sellers for kitchen islands.\n\nWould you like to see more options?`,
    },

    /* ── Product categories ── */
    {
      keys: ['chair','chairs','executive chair','task chair','visitor chair','conference chair','ergonomic','seating'],
      reply: () => `Our **Chairs** range — most popular:\n\n• Cambridge Executive — ₹49,500\n• Oxford Task / Mesh — ₹23,200\n• Delhi Visitor — ₹10,200\n• Mayfair Conference — ₹29,800\n• Prestige Ergonomic — ₹43,100\n\nAll available in multiple upholstery options. Which type of chair are you looking for?`,
    },
    {
      keys: ['sofa','sofas','couch','sectional','reception sofa'],
      reply: () => `Our **Sofas** — handcrafted for every space:\n\n• Dadar Two-Seater — ₹37,600\n• Colaba Modular Sofa — ₹80,200\n• Bandra Reception Sofa — ₹1,02,300\n• Fort Chesterfield — ₹1,35,400\n• Pali Hill Sectional — ₹1,63,000\n\nAll sofas available in custom fabric grades and leg finishes.`,
    },
    {
      keys: ['workstation','office desk','bench desk','pod','open plan','office furniture'],
      reply: () => `Our **Workstations** for modern offices:\n\n• Bandra Workstation — ₹21,300/seat\n• Powai Collaborative Bench — ₹17,700/seat\n• Thane L-Shaped — ₹24,900\n• Lower Parel Sit-Stand — ₹30,400\n• Churchgate Pod — ₹91,200\n\nWe supply complete office fitouts with cable management and screen accessories.`,
    },
    {
      keys: ['table','tables','conference table','boardroom table','writing desk','executive desk','side table','coffee table','centre table'],
      reply: () => `Our **Tables & Desks** range:\n\n• Venus Training Table — ₹12,200\n• Pedder Road Side Table — ₹28,700\n• Flora Fountain Writing Desk — ₹48,600\n• Malabar Conference Table — ₹1,57,500\n• Heritage Boardroom Table — ₹2,68,000\n\nAll custom sizes available. What space is this for?`,
    },
    {
      keys: ['lounge chair','accent chair','egg chair','wing chair','tub chair','pod chair','armchair'],
      reply: () => `Our **Lounge & Accent Chairs**:\n\n• Khar Accent Chair — ₹23,200\n• Versova Lounge Chair — ₹26,500\n• Breach Candy Tub Chair — ₹32,000\n• Warden Road Swivel — ₹52,500\n• Churchgate Wing Chair — ₹63,600\n• Juhu Egg Chair — ₹74,600\n\nPerfect for living rooms, hotel lobbies, and co-working spaces.`,
    },
    {
      keys: ['recliner','recliners','chaise','chaise lounge','zero gravity','lazy boy'],
      reply: () => `Our **Recliners & Chaises**:\n\n• Parel Recliner — ₹63,600\n• Sion Lounge Recliner — ₹54,100\n• Mahim Nursing Recliner — ₹47,000\n• Cumballa Hill Chaise — ₹80,200\n• Chembur Cinema Recliner — ₹70,700\n• Wadala Zero-Gravity — ₹1,07,800\n\nAll recliners available in fabric and leather options.`,
    },
    {
      keys: ['cafe','restaurant','bistro','bar stool','booth','banquet','dining chair'],
      reply: () => `Our **Café & Restaurant** range:\n\n• Andheri Café Chair — ₹4,200/chair\n• Colaba Bistro Chair — ₹5,400\n• Fort Banquet Chair — ₹6,600\n• Bandra Bar Stool — ₹8,000\n• Grant Road Booth — ₹15,500/metre\n• Café Terrace Set — ₹30,400\n\nBulk project pricing available. Shall I arrange a quote?`,
    },
    {
      keys: ['outdoor','garden bench','sun lounger','outdoor sofa','bistro set','swing','planter'],
      reply: () => `Our **Outdoor Furniture** — built for Indian climate:\n\n• Fort Garden Bench — ₹21,000\n• Versova Bistro Set — ₹21,000\n• Marine Drive Lounger — ₹24,900\n• Bandstand Swing — ₹39,800\n• Powai Planter Seat — ₹47,000\n• BKC Outdoor Sofa — ₹92,800\n\nAll UV-stable, rust-resistant, and weather-proof.`,
    },
    {
      keys: ['hospital','medical','clinic','patient chair','waiting chair','bedside','overbed','nursing'],
      reply: () => `Our **Hospital Furniture** — meets clinical standards:\n\n• Apollo Hospital Chair — ₹12,200\n• Jaslok Privacy Screen — ₹9,900\n• Kokilaben Waiting Bench — ₹15,700\n• Breach Candy Overbed Table — ₹17,700\n• Lilavati Bedside Cabinet — ₹19,400\n• Hinduja Treatment Chair — ₹80,200\n\nWe supply to hospitals, clinics, and diagnostic centres pan-India.`,
    },
    {
      keys: ['lamp post','bollard','railing','street furniture','civic','garden bench','urban'],
      reply: () => `Our **Civic & Architectural** range:\n\n🏮 Lamp Posts from ₹12,200\n🪨 Bollards from ₹6,600\n🔩 Railings from ₹2,600/metre\n🪑 Garden Benches from ₹15,500\n\nWe've supplied civic projects for municipalities in Indore, Bhopal, and Mumbai. Want a spec sheet?`,
    },

    /* ── Pricing ── */
    {
      keys: ['price','cost','how much','pricing','rates','budget','expensive','cheap','affordable','value'],
      reply: () => `Our pricing overview (all + 18% GST):\n\n• Chairs: ₹4,900 – ₹49,500\n• Sofas: ₹37,600 – ₹1,63,000\n• Workstations: ₹17,700 – ₹1,07,800\n• Tables & Desks: ₹12,200 – ₹3,01,200\n• Lounge Chairs: ₹23,200 – ₹74,600\n• Recliners: ₹47,000 – ₹1,07,800\n• Outdoor: ₹17,700 – ₹92,800\n• Café Range: ₹4,200 – ₹30,400\n\nProject and bulk discounts available. Which category interests you?`,
    },

    /* ── Lead times ── */
    {
      keys: ['lead time','delivery time','how long','when','dispatch','shipping','days','weeks'],
      reply: () => `Delivery timelines:\n\n✅ **In-stock items:** ${KB.delivery.stock}\n🔨 **Made-to-order:** ${KB.delivery.custom}\n\nWe deliver pan-India. Installation available. Delivery charges quoted separately based on location. Need an estimate for your city?`,
    },

    /* ── Customisation ── */
    {
      keys: ['custom','customise','customization','bespoke','tailor','specific size','dimension','colour','material change','different colour'],
      reply: () => `Yes — **all our products are fully customisable**:\n\n✏️ Dimensions (any width, depth, height)\n🎨 Fabric, leather, or wood finish\n🪵 Wood species and metal finishes\n🏷️ Corporate branding on select pieces\n\n50% advance · Typical lead time: 6–12 weeks\n\nFill in the Enquiry form or call ${KB.phone} to share your brief.`,
    },

    /* ── Quote / Enquiry ── */
    {
      keys: ['quote','enquiry','enquire','estimate','proposal','bulk','volume','project','fitout'],
      reply: () => `To get a quote:\n\n1️⃣ Use our **Quote Builder** → <a href="quote-builder.html" style="color:inherit;text-decoration:underline">quote-builder.html</a>\n2️⃣ Fill the **Enquiry Form** → <a href="enquiry.html" style="color:inherit;text-decoration:underline">enquiry.html</a>\n3️⃣ Call us at **${KB.phone}**\n4️⃣ Email **${KB.email}**\n\nFor bulk/project orders we offer preferential pricing + dedicated account manager.`,
    },

    /* ── Call / Contact ── */
    {
      keys: ['call','request a call','callback','call back','speak to','talk to','sales team','consultant'],
      reply: () => `We'd love to speak with you! 📞\n\nCall us directly: **${KB.phone}**\nOr fill our contact form → <a href="contact.html" style="color:inherit;text-decoration:underline">Request a Call</a>\n\nOur team is available Mon–Sat, 10am–7pm. We typically call back within 2 hours during business hours.`,
    },
    {
      keys: ['contact','phone','email','address','showroom','visit','location','where are you','find you'],
      reply: () => `📍 ${KB.showroom}\n📞 ${KB.phone}\n📧 ${KB.email}\n\nWe're happy to arrange a showroom visit, site survey, or video call. Which works best for you?`,
    },

    /* ── Warranty / Quality ── */
    {
      keys: ['warranty','guarantee','quality','durability','after sales','service','maintenance'],
      reply: () => `Our quality promise:\n\n🛡️ **${KB.warranty}**\n✅ In-house QC before every dispatch\n🔧 After-sales support from Indore service team\n📦 Grade-A materials: premium teak, 14-gauge steel, high-density foam\n\nAny specific product quality query? Happy to share test reports.`,
    },

    /* ── Payment ── */
    {
      keys: ['payment','pay','advance','deposit','upi','bank transfer','neft','rtgs','cheque'],
      reply: () => `Payment methods:\n\n🏦 RTGS / NEFT (preferred for large orders)\n📝 Cheque\n📱 UPI / Bank Transfer\n\n**${KB.deposit}** for custom items. Balance on delivery or as per agreed terms. Need our bank details?`,
    },

    /* ── GST / Tax ── */
    {
      keys: ['gst','tax','invoice','billing','hsn','itc'],
      reply: () => `All prices shown are **exclusive of GST**.\n\n${KB.gst}. We issue proper tax invoices with HSN codes. For ITC (input tax credit), provide your GSTIN at the time of order.`,
    },

    /* ── About ── */
    {
      keys: ['about','who is','company','history','founded','since','story','background'],
      reply: () => `**Artisan & Co.** was founded in **2005** in Indore, India.\n\n180 skilled craftsmen · 800+ projects · 12,000+ pieces delivered\n\nWe serve corporate offices, 5-star hotels, hospitals, restaurants, schools, and civic authorities across India — from a single chair to an entire campus fitout. <a href="about.html" style="color:inherit;text-decoration:underline">Read our story →</a>`,
    },

    /* ── Journal / Blog ── */
    {
      keys: ['journal','blog','article','news','insight','tips','inspiration','read'],
      reply: () => `Our **Journal** features design insights, material guides, project spotlights, and buying tips. <a href="blog.html" style="color:inherit;text-decoration:underline">Read the latest →</a>\n\nIs there a specific topic you'd like us to cover?`,
    },

    /* ── Quote Builder ── */
    {
      keys: ['quote builder','build quote','configure','spec furniture','build my order'],
      reply: () => `Our **Quote Builder** lets you select products, set quantities, and choose customisation options — then submit for a formal proposal. <a href="quote-builder.html" style="color:inherit;text-decoration:underline">Try it →</a>\n\nOr tell me the products and quantities here and I'll help you estimate!`,
    },

    /* ── Products / catalogue ── */
    {
      keys: ['product','catalogue','collection','range','category','categories','what do you sell','what do you have','what do you offer'],
      reply: () => `We offer **14 product categories**:\n\n1. Chairs · 2. Sofas · 3. Workstations\n4. Tables & Desks · 5. Lounge Chairs · 6. Centre Tables\n7. Café & Restaurant · 8. Outdoor · 9. Recliners\n10. Garden Benches · 11. Lamp Posts · 12. Bollards\n13. Railings · 14. Hospital Furniture\n\n<a href="products.html" style="color:inherit;text-decoration:underline">Browse the full catalogue →</a>`,
    },
  ];

  /* ═══════════════════════════════════════════════
     MATCHING ENGINE — tokenised keyword search
  ═══════════════════════════════════════════════ */
  function normalise(text) {
    return text.toLowerCase()
      .replace(/['']/g, "'")
      .replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function matchIntent(raw) {
    const text = normalise(raw);

    /* Priority: try direct intent match */
    for (const intent of INTENTS) {
      if (intent.keys.some(k => text.includes(normalise(k)))) {
        return { reply: typeof intent.reply === 'function' ? intent.reply() : intent.reply,
                 quick: intent.quick || null };
      }
    }

    /* Fallback: product name lookup */
    if (typeof PRODUCTS !== 'undefined') {
      const match = PRODUCTS.find(p =>
        text.includes(normalise(p.name)) ||
        text.includes(normalise(p.slug.replace(/-/g, ' ')))
      );
      if (match) {
        const price = typeof getProductPrice === 'function' ? getProductPrice(match.slug) : null;
        const priceStr = price ? `₹${price.toLocaleString('en-IN')}` : 'Price on Request';
        return {
          reply: `**${match.name}**\n\n${match.shortDescription || ''}\n\nMaterial: ${match.material || 'Premium'}\nPrice: ${priceStr} + 18% GST\nAvailability: ${match.availability || 'Made to Order'}\n\nWould you like to add it to your cart or request a quote?`,
          quick: null,
        };
      }
    }

    return {
      reply: `I'm not sure I caught that — let me help you find what you need!\n\nYou can ask about:\n• Products by category (chairs, sofas, workstations…)\n• Products by room (living room, bedroom, dining room…)\n• Pricing, lead times, or customisation\n• Getting a quote or requesting a call\n\nOr reach us at **${KB.email}** or **${KB.phone}**.`,
      quick: ['Living room', 'Bedroom', 'Pricing', 'Request a call'],
    };
  }

  /* ═══════════════════════════════════════════════
     UI
  ═══════════════════════════════════════════════ */
  function createChatbot() {
    const el = document.createElement('div');
    el.id = 'artisan-chatbot';
    el.innerHTML = `
      <button class="chatbot-fab" onclick="toggleChat()" title="Chat with us" aria-label="Open chat">
        <span class="chatbot-fab-icon chatbot-icon-chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </span>
        <span class="chatbot-fab-icon chatbot-icon-close" style="display:none;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </span>
        <span class="chatbot-notif" id="chatbot-notif"></span>
      </button>
      <div class="chatbot-window" id="chatbot-window" style="display:none;">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">A</div>
            <div>
              <div class="chatbot-title">Artisan Assistant</div>
              <div class="chatbot-status"><span class="status-dot"></span> Online · Instant replies</div>
            </div>
          </div>
          <button class="chatbot-close-btn" onclick="toggleChat()" aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages" role="log" aria-live="polite">
          <div class="chat-msg bot">
            <div class="chat-bubble">Hello! I'm the Artisan &amp; Co. assistant 👋<br>Ask me about products, rooms, pricing, or getting a quote. How can I help?</div>
          </div>
          <div class="chat-quick-btns" id="chat-quick">
            <button onclick="sendQuick('Living room furniture')">🛋️ Living Room</button>
            <button onclick="sendQuick('Bedroom furniture')">🛏️ Bedroom</button>
            <button onclick="sendQuick('Home office furniture')">💼 Home Office</button>
            <button onclick="sendQuick('How do I get a quote?')">📋 Get Quote</button>
          </div>
        </div>
        <div class="chatbot-typing" id="chatbot-typing" style="display:none;" aria-label="Assistant is typing">
          <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>
        <div class="chatbot-input-row">
          <input type="text" id="chatbot-input" placeholder="Ask about any room or product…" onkeydown="if(event.key==='Enter')sendMessage()" autocomplete="off" aria-label="Chat message">
          <button class="chatbot-send-btn" onclick="sendMessage()" aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>`;
    document.body.appendChild(el);

    /* Show notification dot after 4s to prompt first open */
    setTimeout(() => {
      const n = document.getElementById('chatbot-notif');
      if (n && !open) n.style.display = 'block';
    }, 4000);
  }

  window.toggleChat = function () {
    open = !open;
    const win = document.getElementById('chatbot-window');
    const iconChat = document.querySelector('.chatbot-icon-chat');
    const iconClose = document.querySelector('.chatbot-icon-close');
    const notif = document.getElementById('chatbot-notif');
    win.style.display = open ? 'flex' : 'none';
    if (iconChat) iconChat.style.display = open ? 'none' : 'flex';
    if (iconClose) iconClose.style.display = open ? 'flex' : 'none';
    if (notif) notif.style.display = 'none';
    if (open) setTimeout(() => document.getElementById('chatbot-input')?.focus(), 80);
  };

  window.sendQuick = function (text) {
    document.getElementById('chat-quick')?.remove();
    document.getElementById('chatbot-input').value = text;
    sendMessage();
  };

  window.sendMessage = function () {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendMsg('user', text);
    showTyping(true);
    const delay = 320 + Math.random() * 280;
    setTimeout(() => {
      const result = matchIntent(text);
      showTyping(false);
      appendMsg('bot', result.reply, result.quick);
    }, delay);
  };

  function appendMsg(role, text, quickReplies) {
    const msgs = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    const html = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    div.innerHTML = `<div class="chat-bubble">${html}</div>`;
    msgs.appendChild(div);

    if (quickReplies && quickReplies.length) {
      const qDiv = document.createElement('div');
      qDiv.className = 'chat-quick-btns';
      quickReplies.forEach(q => {
        const btn = document.createElement('button');
        btn.textContent = q;
        btn.onclick = () => { qDiv.remove(); window.sendQuick(q); };
        qDiv.appendChild(btn);
      });
      msgs.appendChild(qDiv);
    }
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping(show) {
    const t = document.getElementById('chatbot-typing');
    if (t) t.style.display = show ? 'flex' : 'none';
    if (show) {
      const msgs = document.getElementById('chatbot-messages');
      msgs.scrollTop = msgs.scrollHeight;
    }
  }

  /* ═══════════════════════════════════════════════
     STYLES
  ═══════════════════════════════════════════════ */
  const style = document.createElement('style');
  style.textContent = `
    #artisan-chatbot { position:fixed; bottom:2rem; right:2rem; z-index:9000; }
    .chatbot-fab { width:58px; height:58px; border-radius:50%; background:var(--foreground); color:var(--primary-foreground); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 24px rgba(0,0,0,0.22); transition:transform 0.2s, box-shadow 0.2s; position:relative; }
    .chatbot-fab:hover { transform:scale(1.08); box-shadow:0 6px 32px rgba(0,0,0,0.3); }
    .chatbot-fab-icon { display:flex; align-items:center; justify-content:center; }
    .chatbot-notif { display:none; position:absolute; top:4px; right:4px; width:12px; height:12px; background:#e74c3c; border-radius:50%; border:2px solid #fff; animation:pulse-notif 1.5s ease infinite; }
    @keyframes pulse-notif { 0%,100%{transform:scale(1)}50%{transform:scale(1.25)} }
    .chatbot-window { position:absolute; bottom:72px; right:0; width:370px; max-height:540px; flex-direction:column; background:var(--background); border:1px solid var(--border); border-radius:18px; box-shadow:0 16px 56px rgba(0,0,0,0.2); overflow:hidden; }
    @media(max-width:480px){ .chatbot-window { width:calc(100vw - 2rem); bottom:76px; right:0; } }
    .chatbot-header { padding:1rem 1.25rem; background:var(--foreground); color:var(--primary-foreground); display:flex; align-items:center; justify-content:space-between; gap:0.5rem; }
    .chatbot-header-info { display:flex; align-items:center; gap:0.75rem; }
    .chatbot-avatar { width:38px; height:38px; border-radius:50%; background:var(--accent); color:var(--foreground); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif); font-size:1.1rem; font-weight:600; flex-shrink:0; }
    .chatbot-title { font-weight:600; font-size:0.95rem; }
    .chatbot-status { font-size:0.74rem; opacity:0.8; display:flex; align-items:center; gap:0.35rem; margin-top:1px; }
    .status-dot { width:7px; height:7px; background:#2ecc71; border-radius:50%; flex-shrink:0; animation:pulse-dot 2s ease infinite; }
    @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.5} }
    .chatbot-close-btn { background:none; border:none; color:inherit; cursor:pointer; opacity:0.7; padding:6px; display:flex; align-items:center; border-radius:6px; transition:opacity 0.2s, background 0.2s; }
    .chatbot-close-btn:hover { opacity:1; background:rgba(255,255,255,0.12); }
    .chatbot-messages { flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:0.6rem; min-height:0; max-height:380px; scroll-behavior:smooth; }
    .chatbot-messages::-webkit-scrollbar { width:4px; }
    .chatbot-messages::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
    .chat-msg { display:flex; }
    .chat-msg.user { justify-content:flex-end; }
    .chat-msg.bot { justify-content:flex-start; }
    .chat-bubble { max-width:88%; padding:0.65rem 0.95rem; border-radius:14px; font-size:0.875rem; line-height:1.65; }
    .chat-msg.bot .chat-bubble { background:var(--muted); color:var(--foreground); border-bottom-left-radius:4px; }
    .chat-msg.user .chat-bubble { background:var(--foreground); color:var(--primary-foreground); border-bottom-right-radius:4px; }
    .chat-quick-btns { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.1rem; padding-left:0; }
    .chat-quick-btns button { padding:0.32rem 0.75rem; border:1.5px solid var(--border); border-radius:20px; background:var(--card); font-size:0.78rem; cursor:pointer; transition:all 0.15s; color:var(--foreground); white-space:nowrap; }
    .chat-quick-btns button:hover { background:var(--foreground); color:var(--primary-foreground); border-color:var(--foreground); }
    .chatbot-typing { padding:0.4rem 1rem; display:flex; align-items:center; }
    .typing-dots { display:flex; gap:4px; align-items:center; background:var(--muted); padding:0.5rem 0.75rem; border-radius:12px; border-bottom-left-radius:4px; }
    .typing-dots span { width:7px; height:7px; background:var(--muted-foreground); border-radius:50%; animation:typing-bounce 1.2s infinite; }
    .typing-dots span:nth-child(2) { animation-delay:0.2s; }
    .typing-dots span:nth-child(3) { animation-delay:0.4s; }
    @keyframes typing-bounce { 0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)} }
    .chatbot-input-row { display:flex; align-items:center; padding:0.75rem; border-top:1px solid var(--border); gap:0.5rem; background:var(--background); }
    #chatbot-input { flex:1; border:1.5px solid var(--border); border-radius:24px; padding:0.5rem 1rem; font-size:0.875rem; background:var(--background); color:var(--foreground); outline:none; transition:border-color 0.15s; }
    #chatbot-input:focus { border-color:var(--foreground); }
    .chatbot-send-btn { width:38px; height:38px; border-radius:50%; background:var(--foreground); color:var(--primary-foreground); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity 0.2s, transform 0.15s; }
    .chatbot-send-btn:hover { opacity:0.85; transform:scale(1.05); }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatbot);
  } else {
    createChatbot();
  }
})();
