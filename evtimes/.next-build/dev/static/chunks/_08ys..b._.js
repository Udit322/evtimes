(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/homepage-html.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "homepageHtml",
    ()=>homepageHtml
]);
const homepageHtml = String.raw`<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker-inner">
    <span>Tata Motors Q3 EV sales up 34% YoY</span>
    <span>FAME III policy announcement expected this quarter</span>
    <span>BYD Seal launched in India at ₹41L</span>
    <span>Ola Electric files for IPO</span>
    <span>Ather 450X gets range update — now 146km</span>
    <span>India EV market crosses 1.5M units milestone</span>
    <span>Mahindra BE.07 bookings open at ₹1,499</span>
    <span>Maruti Suzuki EV production starts at Manesar plant</span>
    <span>Tata Motors Q3 EV sales up 34% YoY</span>
    <span>FAME III policy announcement expected this quarter</span>
    <span>BYD Seal launched in India at ₹41L</span>
    <span>Ola Electric files for IPO</span>
    <span>Ather 450X gets range update — now 146km</span>
    <span>India EV market crosses 1.5M units milestone</span>
    <span>Mahindra BE.07 bookings open at ₹1,499</span>
    <span>Maruti Suzuki EV production starts at Manesar plant</span>
  </div>
</div>

<!-- NAVBAR -->
<nav>
  <a href="#" class="logo">EV<span>TIMES</span></a>
  <ul class="nav-links">
    <li><a href="#">Vehicles</a></li>
    <li><a href="#">Charging</a></li>
    <li><a href="#">Policy</a></li>
    <li><a href="#">Battery Tech</a></li>
    <li><a href="#">Startups</a></li>
    <li><a href="#">Market</a></li>
  </ul>
  <div class="nav-right">
    <a href="/login" class="btn-ghost">Log in</a>
  </div>
</nav>

<!-- BREAKING BANNER -->
<div class="breaking-banner">
  <span class="breaking-label">⚡ Breaking</span>
  <span class="breaking-text">Cabinet approves FAME III with ₹12,000 crore outlay — <a href="#">read the full analysis →</a></span>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-main">
    <div>
      <div class="hero-tag">⚡ Policy · Analysis</div>
      <div class="hero-headline">
        India's <em>FAME III</em> subsidy scheme could reshape the EV market — here's what we know
      </div>
    </div>
    <div>
      <p class="hero-desc">
        The government is expected to announce a revised subsidy structure that extends support to private four-wheelers for the first time, potentially unlocking demand from a segment that has remained price-sensitive. We break down the policy framework, winners, and what it means for OEMs.
      </p>
      <div class="hero-meta">
        <span class="author">Priya Mehta</span>
        <span class="dot"></span>
        <span>6 min read</span>
        <span class="dot"></span>
        <span>2 hours ago</span>
      </div>
      <a href="/fame-iii-subsidy-scheme-could-reshape-the-ev-market" class="hero-read-btn">Read article →</a>
    </div>
  </div>
  <div class="hero-image-col">
    <div class="ev-graphic">EV</div>
    <div class="ev-badge">Cover Story</div>
  </div>
</section>

<!-- SECOND HERO ROW -->
<div class="second-hero">
  <a href="/march-2025-ev-report-india-crosses-200000-monthly-units" class="sh-card">
    <div class="sh-tag">Market · India</div>
    <div class="sh-title">March 2025 EV report: India crosses 200,000 monthly units for the first time — a milestone five years in the making</div>
    <div class="sh-excerpt">Passenger EVs, two-wheelers, and commercial vehicles all posted record numbers this March. We examine what drove the surge and whether it's sustainable.</div>
    <div class="sh-meta">Data Desk · 9 min · 1 day ago</div>
  </a>
  <a href="/solid-state-batteries-coming-to-india-sooner-than-expected" class="sh-card">
    <div class="sh-tag">Battery · Research</div>
    <div class="sh-title sh-title-sm">Solid-state batteries are coming to India sooner than expected — Tata's R&D chief speaks</div>
    <div class="sh-excerpt">An exclusive conversation on the 2027 timeline, cell chemistry choices, and why India's heat conditions require a unique approach.</div>
    <div class="sh-meta">Rajan Verma · 7 min · 2 days ago</div>
  </a>
  <a href="/how-charge-zone-plans-to-deploy-10000-dcfc-stations-by-2026" class="sh-card">
    <div class="sh-tag">Charging · Infra</div>
    <div class="sh-title sh-title-sm">How Charge Zone plans to deploy 10,000 DCFC stations by 2026</div>
    <div class="sh-excerpt">The startup's blueprint: highways first, then Tier 2 cities, then apartments. We map out the strategy and the funding behind it.</div>
    <div class="sh-meta">Ananya Singh · 5 min · 3 days ago</div>
  </a>
</div>

<!-- CATEGORY STRIP -->
<div class="cat-strip">
  <div class="cat-item active">All</div>
  <div class="cat-item">Passenger EVs</div>
  <div class="cat-item">Two-Wheelers</div>
  <div class="cat-item">Commercial</div>
  <div class="cat-item">Charging Infra</div>
  <div class="cat-item">Battery Tech</div>
  <div class="cat-item">Policy</div>
  <div class="cat-item">Startups & Funding</div>
  <div class="cat-item">Market Data</div>
  <div class="cat-item">India</div>
  <div class="cat-item">Global</div>
</div>

<!-- MAIN GRID -->
<div class="main-grid">

  <!-- FEED -->
  <div class="articles-feed">
    <div class="feed-header">
      <span class="section-label">Latest stories</span>
      <select class="sort-select">
        <option>Most Recent</option>
        <option>Most Read</option>
        <option>Trending</option>
      </select>
    </div>

    <a href="/lfp-vs-nmc-why-indian-oems-are-betting-on-iron-phosphate" class="article-card">
      <div>
        <div class="card-tag">Battery Tech · India</div>
        <div class="card-title">LFP vs NMC: Why Indian OEMs are betting on iron-phosphate chemistry despite the range trade-off</div>
        <div class="card-excerpt">Tata, MG, and BYD have all standardised on LFP for their Indian lineup. We break down the thermal, cost, and longevity reasons behind this shift.</div>
        <div class="card-meta">
          <span>Rajan Verma</span><span>·</span><span>8 min</span><span>·</span><span>Yesterday</span>
        </div>
      </div>
      <div class="card-img">🔋</div>
    </a>

    <a href="/indias-dc-fast-charger-rollout-is-stalling" class="article-card">
      <div>
        <div class="card-tag">Charging Infra · Analysis</div>
        <div class="card-title">India's DC fast charger rollout is stalling — and the culprit is land, not money</div>
        <div class="card-excerpt">Despite aggressive targets, DCFC deployment is running at 40% of planned pace. We investigated 6 months of tender data across 12 states.</div>
        <div class="card-meta">
          <span>Ananya Singh</span><span>·</span><span>11 min</span><span>·</span><span>2 days ago</span>
        </div>
      </div>
      <div class="card-img">⚡</div>
    </a>

    <a href="/ather-rizta-review-family-scooter-electric-practical" class="article-card">
      <div>
        <div class="card-tag">Two-Wheelers · Review</div>
        <div class="card-title">Ather Rizta review: The family scooter that finally makes electric practical for Tier 2 cities</div>
        <div class="card-excerpt">After 1,200km across Jaipur, Kota, and Ajmer — a real-world verdict on range anxiety, service access, and running costs.</div>
        <div class="card-meta">
          <span>Kavya Nair</span><span>·</span><span>14 min</span><span>·</span><span>3 days ago</span>
        </div>
      </div>
      <div class="card-img">🛵</div>
    </a>

    <a href="/march-2025-ev-sales-data-tata-dominates-mahindra-surges-ola-slips" class="article-card">
      <div>
        <div class="card-tag">Market · Data</div>
        <div class="card-title">March 2025 EV sales data: Tata dominates, Mahindra surges, Ola slips</div>
        <div class="card-excerpt">Full breakdown of monthly registration data across categories — with segment-wise growth rates and market share shifts since Q4 2024.</div>
        <div class="card-meta">
          <span>Data Desk</span><span>·</span><span>5 min</span><span>·</span><span>4 days ago</span>
        </div>
      </div>
      <div class="card-img">📊</div>
    </a>

    <a href="/pli-2-revised-targets-mean-for-battery-startups" class="article-card">
      <div>
        <div class="card-tag">Policy · Startup</div>
        <div class="card-title">PLI 2.0 for Advanced Chemistry Cells: What the revised targets mean for battery startups</div>
        <div class="card-excerpt">The government's revised PLI scheme raises the performance bar for cell manufacturers. We speak to three startups navigating the new landscape.</div>
        <div class="card-meta">
          <span>Kiran Bhat</span><span>·</span><span>10 min</span><span>·</span><span>5 days ago</span>
        </div>
      </div>
      <div class="card-img">🏭</div>
    </a>

    <a href="/mahindra-be07-first-drive-most-range-tested-in-india" class="article-card">
      <div>
        <div class="card-tag">Passenger EVs · Launch</div>
        <div class="card-title">Mahindra BE.07 first drive: Bold, brash, and the most range we've tested in India</div>
        <div class="card-excerpt">At 683km ARAI, the BE.07 rewrites the range narrative. But it's the driving dynamics and software that truly set it apart from the Nexon EV.</div>
        <div class="card-meta">
          <span>Meera Pillai</span><span>·</span><span>12 min</span><span>·</span><span>6 days ago</span>
        </div>
      </div>
      <div class="card-img">🚗</div>
    </a>

    <div class="load-more-wrap">
      <button class="btn-load">Load more stories</button>
    </div>
  </div>

  <!-- SIDEBAR -->
  <aside class="sidebar">

    <div class="sidebar-section">
      <div class="sidebar-title">Trending this week</div>
      <a href="/tata-curvv-ev-deliveries-begin-47000-bookings-pending" class="trending-item">
        <div class="trending-num">01</div>
        <div>
          <div class="trending-title">Tata Curvv EV deliveries begin — 47,000 bookings pending</div>
          <div class="trending-meta">12.4k reads · Passenger</div>
        </div>
      </a>
      <a href="/v2g-in-india-tata-power-pilots-bidirectional-charging-in-mumbai" class="trending-item">
        <div class="trending-num">02</div>
        <div>
          <div class="trending-title">V2G in India: Tata Power pilots bidirectional charging in Mumbai</div>
          <div class="trending-meta">9.1k reads · Charging</div>
        </div>
      </a>
      <a href="/what-the-new-bis-standards-mean-for-ev-charger-safety" class="trending-item">
        <div class="trending-num">03</div>
        <div>
          <div class="trending-title">Explained: What the new BIS standards mean for EV charger safety</div>
          <div class="trending-meta">7.8k reads · Policy</div>
        </div>
      </a>
      <a href="/reliance-2b-battery-gigafactory-progress-report" class="trending-item">
        <div class="trending-num">04</div>
        <div>
          <div class="trending-title">Reliance's $2B battery gigafactory — progress report</div>
          <div class="trending-meta">6.2k reads · Battery</div>
        </div>
      </a>
    </div>

    <div class="sidebar-section">
      <div class="nl-box">
        <div class="nl-headline">The EV brief, <em>every morning</em></div>
        <div class="nl-sub">One sharp summary of what moved in the EV world. No noise, no ads. 3 minutes.</div>
        <input class="nl-input" type="email" placeholder="your@email.com"/>
        <button class="btn-green-full">Get the brief →</button>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-title">Editor's picks</div>
      <a href="/why-chinas-ev-dominance-is-a-warning-for-indias-nascent-industry" class="sb-feature">
        <div class="sb-feature-img">🌏</div>
        <div class="sb-feature-tag">Global · Insight</div>
        <div class="sb-feature-title">Why China's EV dominance is a warning for India's nascent industry</div>
        <div class="sb-feature-meta">Priya Mehta · 16 min read</div>
      </a>
      <a href="/the-bms-arms-race-how-indian-startups-are-building-better-battery-management" class="sb-feature">
        <div class="sb-feature-tag">Technology · Deep Dive</div>
        <div class="sb-feature-title">The BMS arms race: How Indian startups are building better battery management</div>
        <div class="sb-feature-meta">Rajan Verma · 13 min read</div>
      </a>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-title">Share this issue</div>
      <div class="social-strip">
        <a href="#" class="social-btn">
          <span class="social-icon social-tw">𝕏</span>
          Share on X (Twitter)
          <span class="social-count">2.1k</span>
        </a>
        <a href="#" class="social-btn">
          <span class="social-icon social-li">in</span>
          Share on LinkedIn
          <span class="social-count">847</span>
        </a>
        <a href="#" class="social-btn">
          <span class="social-icon social-wa">✓</span>
          Share on WhatsApp
          <span class="social-count">5.3k</span>
        </a>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-title">Browse by topic</div>
      <div class="tags-cloud">
        <span class="tag-pill">Tata EV</span>
        <span class="tag-pill">FAME Subsidy</span>
        <span class="tag-pill">BYD India</span>
        <span class="tag-pill">LFP Battery</span>
        <span class="tag-pill">Ola Electric</span>
        <span class="tag-pill">DCFC</span>
        <span class="tag-pill">Ather</span>
        <span class="tag-pill">Tesla India</span>
        <span class="tag-pill">V2G</span>
        <span class="tag-pill">PLI Scheme</span>
        <span class="tag-pill">Charging Network</span>
        <span class="tag-pill">NMC</span>
        <span class="tag-pill">MG Motor</span>
        <span class="tag-pill">Range Anxiety</span>
        <span class="tag-pill">Mahindra EV</span>
        <span class="tag-pill">Solid State</span>
        <span class="tag-pill">Maruti EV</span>
      </div>
    </div>

  </aside>
</div>

<!-- OPINION SECTION -->
<div class="opinion-section">
  <div class="opinion-header">
    <h2>Opinion &amp; Analysis</h2>
    <span>See all columns →</span>
  </div>
  <div class="opinion-grid">
    <a href="/fame-iii-too-little-too-late-india-needs-10-year-ev-policy" class="opinion-card">
      <div class="opinion-author-row">
        <div class="opinion-avatar">PM</div>
        <div>
          <div class="opinion-author-name">Priya Mehta</div>
          <div class="opinion-author-role">Policy Editor</div>
        </div>
      </div>
      <div class="opinion-title">FAME III is too little, too late — India needs a 10-year EV industrial policy, not another subsidy patch</div>
      <div class="opinion-excerpt">The subsidy-led approach has delivered modest gains, but a structural transformation of India's auto sector demands something bolder: demand certainty, supply chain investment, and a credible carbon price.</div>
    </a>
    <a href="/real-bottleneck-isnt-batteries-its-software-engineers" class="opinion-card">
      <div class="opinion-author-row">
        <div class="opinion-avatar">RV</div>
        <div>
          <div class="opinion-author-name">Rajan Verma</div>
          <div class="opinion-author-role">Technology Correspondent</div>
        </div>
      </div>
      <div class="opinion-title">The real bottleneck isn't batteries — it's software engineers who understand both EVs and India's grid</div>
      <div class="opinion-excerpt">Hardware competitiveness is nearly solved. The next decade will be won by companies that can write firmware for the unique demands of India's electrical infrastructure.</div>
    </a>
    <a href="/indias-charging-network-needs-single-interoperability-standard" class="opinion-card">
      <div class="opinion-author-row">
        <div class="opinion-avatar">AS</div>
        <div>
          <div class="opinion-author-name">Ananya Singh</div>
          <div class="opinion-author-role">Infrastructure Analyst</div>
        </div>
      </div>
      <div class="opinion-title">Why India's charging network needs a single interoperability standard — now, before it's too late</div>
      <div class="opinion-excerpt">With five competing protocols and no regulatory mandate, India's public charging ecosystem is fragmenting fast. The window for a unified standard is closing.</div>
    </a>
  </div>
</div>

<!-- AD BANNER -->
<div class="ad-banner">
  <span class="ad-label">Sponsored</span>
  <div class="ad-content">
    <span class="ad-icon">🔌</span>
    <span>ChargeGrid Pro — India's most reliable home EV charger. Install in 2 hours, compatible with all EVs.</span>
    <span class="ad-cta">Learn more</span>
  </div>
</div>

<!-- DATA WIDGET -->
<div class="data-widget">
  <div class="data-header">
    <h2>EV Sales Tracker</h2>
    <span class="period">March 2025</span>
  </div>
  <div class="data-grid">
    <div class="data-cell">
      <div class="data-brand">Tata Motors</div>
      <div class="data-num">18,240</div>
      <div class="data-change up">▲ +12.4%</div>
    </div>
    <div class="data-cell">
      <div class="data-brand">Mahindra EV</div>
      <div class="data-num">9,870</div>
      <div class="data-change up">▲ +34.1%</div>
    </div>
    <div class="data-cell">
      <div class="data-brand">Ola Electric</div>
      <div class="data-num">7,512</div>
      <div class="data-change dn">▼ −8.2%</div>
    </div>
    <div class="data-cell">
      <div class="data-brand">Ather Energy</div>
      <div class="data-num">5,340</div>
      <div class="data-change up">▲ +22.7%</div>
    </div>
    <div class="data-cell">
      <div class="data-brand">MG Motor</div>
      <div class="data-num">3,210</div>
      <div class="data-change up">▲ +5.8%</div>
    </div>
  </div>
  <div class="data-bar-wrap">
    <div class="bar-row">
      <span class="bar-label">Tata Motors</span>
      <div class="bar-track"><div class="bar-fill" style="width:82%"></div></div>
      <span class="bar-val">41.2%</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">Mahindra</span>
      <div class="bar-track"><div class="bar-fill" style="width:44%"></div></div>
      <span class="bar-val">22.3%</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">Ola Electric</span>
      <div class="bar-track"><div class="bar-fill" style="width:34%"></div></div>
      <span class="bar-val">17.0%</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">Ather</span>
      <div class="bar-track"><div class="bar-fill" style="width:24%"></div></div>
      <span class="bar-val">12.1%</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">MG Motor</span>
      <div class="bar-track"><div class="bar-fill" style="width:15%"></div></div>
      <span class="bar-val">7.3%</span>
    </div>
  </div>
</div>

<!-- STATS BAR -->
<div class="bottom-bar">
  <div class="stat-block">
    <div class="stat-num">2,400+</div>
    <div class="stat-label">Articles published</div>
  </div>
  <div class="stat-block">
    <div class="stat-num">38K</div>
    <div class="stat-label">Newsletter readers</div>
  </div>
  <div class="stat-block">
    <div class="stat-num">14</div>
    <div class="stat-label">Staff journalists</div>
  </div>
  <div class="stat-block">
    <div class="stat-num">Daily</div>
    <div class="stat-label">EV market coverage</div>
  </div>
</div>

<!-- FOOTER -->
<div class="footer-top">
  <div class="footer-brand">
    <div class="logo-f">EV<span>TIMES</span></div>
    <p>India's most trusted independent source for electric vehicle news, analysis, and data. Covering the EV transition since 2020.</p>
    <div class="footer-social">
      <a href="#" class="fsoc">𝕏</a>
      <a href="#" class="fsoc">in</a>
      <a href="#" class="fsoc">yt</a>
      <a href="#" class="fsoc">ig</a>
    </div>
  </div>
  <div class="footer-col">
    <h4>Coverage</h4>
    <ul>
      <li><a href="#">Vehicles</a></li>
      <li><a href="#">Charging Infrastructure</a></li>
      <li><a href="#">Battery Technology</a></li>
      <li><a href="#">Policy & Regulation</a></li>
      <li><a href="#">Startups & Funding</a></li>
      <li><a href="#">Market Data</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>Company</h4>
    <ul>
      <li><a href="#">About EVTimes</a></li>
      <li><a href="#">Our Journalists</a></li>
      <li><a href="#">Editorial Standards</a></li>
      <li><a href="#">Advertise With Us</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>Resources</h4>
    <ul>
      <li><a href="#">EV Buyer's Guide</a></li>
      <li><a href="#">Charging Station Map</a></li>
      <li><a href="#">Subsidy Calculator</a></li>
      <li><a href="#">Range Database</a></li>
      <li><a href="#">RSS Feed</a></li>
      <li><a href="#">Newsletter Archive</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>State</h4>
    <ul>
      <li><a href="#">Rajasthan</a></li>
      <li><a href="#">Uttar pradesh</a></li>
      <li><a href="#">Haryana</a></li>
      <li><a href="#">Punjab</a></li>
      <li><a href="#">Maharashtra</a></li>
      <li><a href="#">Gujarat</a></li>
    </ul>
  </div>
 
   
</div>

<footer class="bottom">
  <div>© 2025 EVTimes Media Pvt. Ltd. Independent EV journalism.</div>
  <div class="footer-links">
    <a href="#">Privacy Policy</a>
    <a href="#">Terms of Use</a>
    <a href="#">Cookie Policy</a>
    <a href="#">Sitemap</a>
  </div>
</footer>`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$homepage$2d$html$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/homepage-html.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const categoryItems = Array.from(document.querySelectorAll(".cat-item"));
            const newsletterInput = document.querySelector(".nl-input");
            const newsletterButton = document.querySelector(".btn-green-full");
            const tagPills = Array.from(document.querySelectorAll(".tag-pill"));
            const bars = Array.from(document.querySelectorAll(".bar-fill"));
            const originalWidths = bars.map({
                "Home.useEffect.originalWidths": (bar)=>bar.style.width
            }["Home.useEffect.originalWidths"]);
            const categoryListeners = categoryItems.map({
                "Home.useEffect.categoryListeners": (item)=>{
                    const handler = {
                        "Home.useEffect.categoryListeners.handler": ()=>{
                            categoryItems.forEach({
                                "Home.useEffect.categoryListeners.handler": (entry)=>entry.classList.remove("active")
                            }["Home.useEffect.categoryListeners.handler"]);
                            item.classList.add("active");
                        }
                    }["Home.useEffect.categoryListeners.handler"];
                    item.addEventListener("click", handler);
                    return {
                        item,
                        handler
                    };
                }
            }["Home.useEffect.categoryListeners"]);
            const newsletterHandler = {
                "Home.useEffect.newsletterHandler": ()=>{
                    if (!newsletterInput || !newsletterButton) {
                        return;
                    }
                    if (newsletterInput.value.includes("@")) {
                        newsletterButton.textContent = "✓ You're subscribed!";
                        newsletterButton.style.background = "var(--grn-acc)";
                        newsletterInput.disabled = true;
                        newsletterInput.style.opacity = "0.5";
                    } else {
                        newsletterInput.style.borderColor = "#c0392b";
                        newsletterInput.focus();
                        window.setTimeout({
                            "Home.useEffect.newsletterHandler": ()=>{
                                newsletterInput.style.borderColor = "";
                            }
                        }["Home.useEffect.newsletterHandler"], 1500);
                    }
                }
            }["Home.useEffect.newsletterHandler"];
            if (newsletterButton) {
                newsletterButton.addEventListener("click", newsletterHandler);
            }
            const tagListeners = tagPills.map({
                "Home.useEffect.tagListeners": (pill)=>{
                    const handler = {
                        "Home.useEffect.tagListeners.handler": ()=>{
                            pill.style.background = "var(--grn-xlight)";
                            pill.style.borderColor = "var(--grn)";
                            pill.style.color = "var(--grn)";
                        }
                    }["Home.useEffect.tagListeners.handler"];
                    pill.addEventListener("click", handler);
                    return {
                        pill,
                        handler
                    };
                }
            }["Home.useEffect.tagListeners"]);
            bars.forEach({
                "Home.useEffect": (bar)=>{
                    bar.style.width = "0";
                }
            }["Home.useEffect"]);
            const dataWidget = document.querySelector(".data-widget");
            let observer;
            if (dataWidget && bars.length > 0) {
                observer = new IntersectionObserver({
                    "Home.useEffect": (entries)=>{
                        entries.forEach({
                            "Home.useEffect": (entry)=>{
                                if (!entry.isIntersecting) {
                                    return;
                                }
                                bars.forEach({
                                    "Home.useEffect": (bar, index)=>{
                                        window.setTimeout({
                                            "Home.useEffect": ()=>{
                                                bar.style.width = originalWidths[index];
                                            }
                                        }["Home.useEffect"], index * 100);
                                    }
                                }["Home.useEffect"]);
                                observer?.disconnect();
                            }
                        }["Home.useEffect"]);
                    }
                }["Home.useEffect"], {
                    threshold: 0.3
                });
                observer.observe(dataWidget);
            }
            return ({
                "Home.useEffect": ()=>{
                    categoryListeners.forEach({
                        "Home.useEffect": ({ item, handler })=>item.removeEventListener("click", handler)
                    }["Home.useEffect"]);
                    tagListeners.forEach({
                        "Home.useEffect": ({ pill, handler })=>pill.removeEventListener("click", handler)
                    }["Home.useEffect"]);
                    if (newsletterButton) {
                        newsletterButton.removeEventListener("click", newsletterHandler);
                    }
                    observer?.disconnect();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        dangerouslySetInnerHTML: {
            __html: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$homepage$2d$html$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["homepageHtml"]
        }
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
_s(Home, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_08ys..b._.js.map