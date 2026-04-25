export type HomepageArticle = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  meta: string;
  author: string;
  readTime: string;
  publishedAt: string;
  content: string[];
  icon?: string;
  large?: boolean;
};

export const coverStoryArticle: HomepageArticle = {
  slug: "fame-iii-subsidy-scheme-could-reshape-ev-market",
  tag: "Policy - Analysis",
  title:
    "India's FAME III subsidy scheme could reshape the EV market - here's what we know",
  excerpt:
    "The government is expected to announce a revised subsidy structure that extends support to private four-wheelers for the first time, potentially unlocking demand from a segment that has remained price-sensitive. We break down the policy framework, winners, and what it means for OEMs.",
  meta: "Priya Mehta - 6 min read - 2 hours ago",
  author: "Priya Mehta",
  readTime: "6 min read",
  publishedAt: "2 hours ago",
  content: [
    "Officials tracking the next EV incentive package say the broad direction of FAME III is becoming clearer: keep support tied to localization, improve charging outcomes, and widen the market beyond two-wheelers and commercial fleets.",
    "What makes this version especially important is the discussion around private passenger EVs. If four-wheelers get targeted support for the first time under the new design, mainstream buyers who were waiting on pricing clarity could finally move.",
    "Automakers and charging operators would both benefit from that shift. Higher private adoption creates stronger charger utilization, more confidence for station rollouts, and better scale for battery suppliers already preparing for the next demand cycle.",
    "The final shape of the policy will matter more than the headline budget. Eligibility rules, localization thresholds, and city-level charging priorities are likely to determine who captures the upside first.",
  ],
};

export const homepageHeroCards: HomepageArticle[] = [
  {
    slug: "march-2025-ev-report-india-crosses-200000-monthly-units",
    tag: "Market - India",
    title:
      "March 2025 EV report: India crosses 200,000 monthly units for the first time - a milestone five years in the making",
    excerpt:
      "Passenger EVs, two-wheelers, and commercial vehicles all posted record numbers this March. We examine what drove the surge and whether it's sustainable.",
    meta: "Data Desk - 9 min - 1 day ago",
    author: "Data Desk",
    readTime: "9 min read",
    publishedAt: "1 day ago",
    large: true,
    content: [
      "India's EV market delivered its strongest monthly result yet, crossing 200,000 units on the back of broad-based gains across passenger vehicles, scooters, and fleet-led commercial segments.",
      "The milestone did not come from a single launch or one-off incentive push. Instead, it reflects a more mature market where product choice, financing, and charging access have improved together over several quarters.",
      "Passenger EV momentum remains concentrated in a handful of strong nameplates, but the bigger story is how two-wheelers and commercial operators continue to add durable volume underneath the headline number.",
      "The next question is sustainability. Analysts are now watching whether this pace can hold through the next subsidy cycle and into a period where buyers become more sensitive to total ownership value than launch excitement.",
    ],
  },
  {
    slug: "solid-state-batteries-coming-to-india-sooner-than-expected",
    tag: "Battery - Research",
    title:
      "Solid-state batteries are coming to India sooner than expected - Tata's R&D chief speaks",
    excerpt:
      "An exclusive conversation on the 2027 timeline, cell chemistry choices, and why India's heat conditions require a unique approach.",
    meta: "Rajan Verma - 7 min - 2 days ago",
    author: "Rajan Verma",
    readTime: "7 min read",
    publishedAt: "2 days ago",
    large: false,
    content: [
      "Solid-state battery timelines are tightening, and Indian research teams now believe the first meaningful automotive deployments could arrive sooner than earlier industry estimates suggested.",
      "Engineers say thermal stability and packaging gains remain the main attraction, but India-specific conditions are shaping development priorities in ways that differ from Europe, China, and the US.",
      "High ambient temperatures, long urban dwell times, and aggressive fast-charging expectations mean cell chemistry choices cannot simply be copied from overseas prototypes.",
      "If the current development path holds, the first commercial uses may appear in premium applications before the technology filters down to mass-market EV programs.",
    ],
  },
  {
    slug: "how-charge-zone-plans-to-deploy-10000-dcfc-stations-by-2026",
    tag: "Charging - Infra",
    title: "How Charge Zone plans to deploy 10,000 DCFC stations by 2026",
    excerpt:
      "The startup's blueprint: highways first, then Tier 2 cities, then apartments. We map out the strategy and the funding behind it.",
    meta: "Ananya Singh - 5 min - 3 days ago",
    author: "Ananya Singh",
    readTime: "5 min read",
    publishedAt: "3 days ago",
    large: false,
    content: [
      "Charge Zone's next expansion plan is built around a simple sequence: lock in reliable highway demand, extend density into growth corridors, and only then take the model into deeper urban residential use cases.",
      "That approach helps solve the utilization problem that has slowed many charging rollouts. Highway assets offer clearer fleet and intercity demand, making it easier to justify capital before urban expansion scales up.",
      "The company is also leaning on partnerships rather than pure owned deployment, which allows faster coverage without forcing every new location onto the balance sheet.",
      "Execution will still depend on land access, local power readiness, and uptime discipline, but the company believes those problems are now more manageable than demand uncertainty itself.",
    ],
  },
];

export const homepageStories: HomepageArticle[] = [
  {
    slug: "lfp-vs-nmc-why-indian-oems-are-betting-on-iron-phosphate",
    tag: "Battery Tech - India",
    title:
      "LFP vs NMC: Why Indian OEMs are betting on iron-phosphate chemistry despite the range trade-off",
    excerpt:
      "Tata, MG, and BYD have all standardised on LFP for their Indian lineup. We break down the thermal, cost, and longevity reasons behind this shift.",
    meta: "Rajan Verma - 8 min - Yesterday",
    author: "Rajan Verma",
    readTime: "8 min read",
    publishedAt: "Yesterday",
    icon: "B",
    content: [
      "Range still dominates consumer marketing, but battery strategy inside India is increasingly moving toward durability, safety, and cost discipline.",
      "That is where LFP continues to win. Even with a density penalty versus NMC, Indian OEMs see better fit for heat, charging behavior, and warranty management across mainstream use cases.",
      "Procurement teams also value the pricing stability and supply-chain flexibility that LFP offers as local manufacturing ambitions expand.",
      "For many brands, the trade-off is no longer whether LFP gives up some headline range. It is whether customers care enough about that difference once ownership costs and reliability enter the picture.",
    ],
  },
  {
    slug: "india-dc-fast-charger-rollout-is-stalling-land-not-money",
    tag: "Charging Infra - Analysis",
    title:
      "India's DC fast charger rollout is stalling - and the culprit is land, not money",
    excerpt:
      "Despite aggressive targets, DCFC deployment is running at 40% of planned pace. We investigated 6 months of tender data across 12 states.",
    meta: "Ananya Singh - 11 min - 2 days ago",
    author: "Ananya Singh",
    readTime: "11 min read",
    publishedAt: "2 days ago",
    icon: "C",
    content: [
      "Capital is not the main bottleneck for fast charger growth anymore. Site readiness, frontage access, and utility coordination are proving to be much harder constraints.",
      "Across multiple states, tender interest remains healthy, yet awarded locations often fail to convert into live assets on schedule because the land problem emerges after the headline commitments are made.",
      "Operators say the issue is especially acute in dense corridors where demand is strongest but approvals and grid work are slowest.",
      "Unless deployment models start earlier with land diligence and power coordination, national targets will keep looking impressive on paper while rollout lags on the ground.",
    ],
  },
  {
    slug: "ather-rizta-review-family-scooter-for-tier-2-cities",
    tag: "Two-Wheelers - Review",
    title:
      "Ather Rizta review: The family scooter that finally makes electric practical for Tier 2 cities",
    excerpt:
      "After 1,200km across Jaipur, Kota, and Ajmer - a real-world verdict on range anxiety, service access, and running costs.",
    meta: "Kavya Nair - 14 min - 3 days ago",
    author: "Kavya Nair",
    readTime: "14 min read",
    publishedAt: "3 days ago",
    icon: "S",
    content: [
      "The Rizta is less about performance theater and more about utility: family seating, realistic range, and ownership simplicity in cities where convenience matters more than acceleration numbers.",
      "That focus makes it a better benchmark for mass adoption than many enthusiast-led electric scooters that dominate online conversation.",
      "Service reach and charging flexibility remain part of the purchase decision, but Ather's latest platform feels far more prepared for practical daily use outside metro bubbles.",
      "For buyers in Tier 2 markets, that could matter more than headline spec-sheet drama.",
    ],
  },
  {
    slug: "march-2025-ev-sales-data-tata-dominates-mahindra-surges-ola-slips",
    tag: "Market - Data",
    title: "March 2025 EV sales data: Tata dominates, Mahindra surges, Ola slips",
    excerpt:
      "Full breakdown of monthly registration data across categories - with segment-wise growth rates and market share shifts since Q4 2024.",
    meta: "Data Desk - 5 min - 4 days ago",
    author: "Data Desk",
    readTime: "5 min read",
    publishedAt: "4 days ago",
    icon: "D",
    content: [
      "March registration data shows leadership remains stable at the top, but the underlying competitive picture is changing faster than broad market-share charts suggest.",
      "Tata continues to lead, though Mahindra's momentum is becoming harder to ignore as newer products convert attention into actual volume.",
      "In two-wheelers, the conversation is now less about category growth alone and more about which brands can protect share as the market becomes less forgiving.",
      "The next quarter should reveal whether March was a breakout month or simply the first sign of a more durable reshuffle.",
    ],
  },
  {
    slug: "pli-2-for-advanced-chemistry-cells-what-it-means-for-startups",
    tag: "Policy - Startup",
    title:
      "PLI 2.0 for Advanced Chemistry Cells: What the revised targets mean for battery startups",
    excerpt:
      "The government's revised PLI scheme raises the performance bar for cell manufacturers. We speak to three startups navigating the new landscape.",
    meta: "Kiran Bhat - 10 min - 5 days ago",
    author: "Kiran Bhat",
    readTime: "10 min read",
    publishedAt: "5 days ago",
    icon: "P",
    content: [
      "Battery startups welcomed the clarity in the revised PLI framework, but the tougher targets also sharpen the distinction between serious manufacturing plans and slide-deck ambition.",
      "Performance-linked support now rewards execution depth more aggressively, which benefits teams already investing in process quality, sourcing resilience, and customer validation.",
      "For earlier-stage players, that means partnerships and phased deployment strategies may matter more than rushing to claim scale before the fundamentals are ready.",
      "The winners are likely to be companies that can translate policy support into bankable commercial confidence.",
    ],
  },
  {
    slug: "mahindra-be07-first-drive-bold-brash-most-range-tested",
    tag: "Passenger EVs - Launch",
    title:
      "Mahindra BE.07 first drive: Bold, brash, and the most range we've tested in India",
    excerpt:
      "At 683km ARAI, the BE.07 rewrites the range narrative. But it's the driving dynamics and software that truly set it apart from the Nexon EV.",
    meta: "Meera Pillai - 12 min - 6 days ago",
    author: "Meera Pillai",
    readTime: "12 min read",
    publishedAt: "6 days ago",
    icon: "E",
    content: [
      "Mahindra's latest EV does not feel like an incremental step. It feels like a deliberate attempt to reset expectations around design, performance, and software quality in the Indian market.",
      "Range will grab the headlines, but the stronger story is how complete the package feels when compared with older domestic EV launches.",
      "Ride confidence, cabin execution, and interface polish all suggest Mahindra is aiming for buyers who would otherwise cross-shop premium international alternatives.",
      "If production consistency matches the promise of the first drive, this could become one of the category's most important launches.",
    ],
  },
  {
    slug: "delhi-apartment-charging-rules-are-finally-getting-clearer",
    tag: "Charging - City Policy",
    title:
      "Delhi apartment charging rules are finally getting clearer for EV owners",
    excerpt:
      "RWAs and discoms are moving toward simpler home-charging approvals. Here's what residents can expect and where friction still remains.",
    meta: "Ananya Singh - 6 min - 1 week ago",
    author: "Ananya Singh",
    readTime: "6 min read",
    publishedAt: "1 week ago",
    icon: "H",
    content: [
      "Home charging remains the biggest comfort factor for urban EV buyers, and Delhi's newer approval flow is beginning to reduce the confusion residents faced with society permissions.",
      "Discom coordination and wiring standards are becoming more standardized, which helps apartment residents move from intent to actual installation faster.",
      "The challenge is that implementation still depends on each society's internal process, so buyer experience can vary sharply building to building.",
      "Even so, clearer rules are helping shift the market conversation from whether home charging is possible to how quickly it can be deployed.",
    ],
  },
  {
    slug: "used-ev-market-is-starting-to-build-trust-with-battery-health-reports",
    tag: "Market - Used EVs",
    title:
      "The used EV market is starting to build trust with battery health reports",
    excerpt:
      "Resale platforms and dealers are learning that battery transparency matters more than cosmetic refurbishment in second-hand EV sales.",
    meta: "Data Desk - 7 min - 1 week ago",
    author: "Data Desk",
    readTime: "7 min read",
    publishedAt: "1 week ago",
    icon: "U",
    content: [
      "The used EV market has struggled with one major question from buyers: what is the battery condition really like after years of ownership?",
      "Dealers are now experimenting with standardized health reports, warranty carry-forward policies, and clearer charging histories to rebuild confidence.",
      "Those tools do more than support resale prices. They also reduce fear for first-time EV buyers entering through the second-hand market.",
      "If battery reporting becomes widely normalized, used EVs may become one of the biggest adoption bridges in the next phase of the market.",
    ],
  },
  {
    slug: "battery-recycling-startups-are-moving-from-pilot-to-commercial-scale",
    tag: "Battery Tech - Recycling",
    title:
      "Battery recycling startups are moving from pilot mode to commercial scale",
    excerpt:
      "Recovery economics are improving as more EV and electronics waste becomes available. Startups are now chasing long-term supply contracts.",
    meta: "Rajan Verma - 9 min - 8 days ago",
    author: "Rajan Verma",
    readTime: "9 min read",
    publishedAt: "8 days ago",
    icon: "R",
    content: [
      "Recycling has long been treated like a future problem for India's EV ecosystem, but operators now say feedstock visibility is improving faster than expected.",
      "That has shifted the conversation from pilot processing to commercial partnerships with OEMs, fleet operators, and electronics waste handlers.",
      "Margins still depend on recovery efficiency and logistics discipline, yet the category looks more tangible now than it did even a year ago.",
      "As supply grows, the strongest players are likely to be those that combine chemistry expertise with dependable collection networks.",
    ],
  },
  {
    slug: "tier-2-cities-are-driving-the-next-wave-of-electric-scooter-adoption",
    tag: "Two-Wheelers - Market",
    title:
      "Tier-2 cities are driving the next wave of electric scooter adoption",
    excerpt:
      "After early metro-led growth, demand is broadening into smaller cities where running cost savings and family practicality are winning buyers.",
    meta: "Kavya Nair - 8 min - 9 days ago",
    author: "Kavya Nair",
    readTime: "8 min read",
    publishedAt: "9 days ago",
    icon: "T",
    content: [
      "Electric scooter demand is no longer limited to early-adopter metro pockets. Tier-2 cities are becoming a stronger volume engine as products and service networks mature.",
      "For these buyers, monthly fuel savings and family utility often matter more than app features or headline acceleration figures.",
      "That shift is also rewarding brands that invested early in dealer support and practical ownership service rather than only performance positioning.",
      "The next chapter of two-wheeler EV growth may depend less on hype and more on consistency in smaller urban markets.",
    ],
  },
  {
    slug: "public-fast-charger-uptime-is-becoming-the-new-competitive-battle",
    tag: "Charging - Network Data",
    title:
      "Public fast-charger uptime is becoming the new competitive battle",
    excerpt:
      "Station count alone no longer impresses EV users. Reliability, payments and queue visibility are now shaping network preference.",
    meta: "Ananya Singh - 6 min - 10 days ago",
    author: "Ananya Singh",
    readTime: "6 min read",
    publishedAt: "10 days ago",
    icon: "Q",
    content: [
      "As charging networks expand, users are becoming less interested in raw station count and more focused on whether the chargers actually work when needed.",
      "Apps with live availability, dependable payments, and stronger service turnaround are earning more trust than larger but less consistent footprints.",
      "This is pushing operators toward uptime targets that look more like service benchmarks than simple infrastructure milestones.",
      "In a more mature market, reliability may become the strongest moat a charging brand can build.",
    ],
  },
  {
    slug: "ev-fleet-operators-are-rethinking-nighttime-depot-charging-strategy",
    tag: "Commercial EVs - Fleet",
    title:
      "EV fleet operators are rethinking their nighttime depot charging strategy",
    excerpt:
      "Fleet managers say timing, tariff windows and charger sharing matter more than simply installing more hardware at depots.",
    meta: "Kiran Bhat - 9 min - 11 days ago",
    author: "Kiran Bhat",
    readTime: "9 min read",
    publishedAt: "11 days ago",
    icon: "F",
    content: [
      "Fleet charging economics are becoming more nuanced as utilization rises. Operators now care as much about charging orchestration as the hardware itself.",
      "Nighttime depot strategy is increasingly shaped by tariff windows, route return patterns, and how many vehicles can realistically share each charger without delays.",
      "Software-led charging management is therefore becoming central to fleet profitability, especially for operators scaling across multiple depots.",
      "The result is a market where smarter scheduling may deliver better returns than another round of hurried hardware expansion.",
    ],
  },
];

export const homepageArticles: HomepageArticle[] = [
  coverStoryArticle,
  ...homepageHeroCards,
  ...homepageStories,
];

export function getHomepageArticleBySlug(slug: string) {
  return homepageArticles.find((item) => item.slug === slug);
}
