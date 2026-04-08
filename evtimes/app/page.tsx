"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stateNews } from "./lib/stateNews";

const tickerItems = [
  "Tata Motors Q3 EV sales up 34% YoY",
  "FAME III policy announcement expected this quarter",
  "BYD Seal launched in India at Rs 41L",
  "Ola Electric files for IPO",
  "Ather 450X gets range update - now 146km",
  "India EV market crosses 1.5M units milestone",
  "Mahindra BE.07 bookings open at Rs 1,499",
  "Maruti Suzuki EV production starts at Manesar plant",
];

const categories = [
  "All",
  "Passenger EVs",
  "Two-Wheelers",
  "Commercial",
  "Charging Infra",
  "Battery Tech",
  "Policy",
  "Startups & Funding",
  "Market Data",
  "India",
  "Global",
];

const heroCards = [
  {
    tag: "Market - India",
    title:
      "March 2025 EV report: India crosses 200,000 monthly units for the first time - a milestone five years in the making",
    excerpt:
      "Passenger EVs, two-wheelers, and commercial vehicles all posted record numbers this March. We examine what drove the surge and whether it's sustainable.",
    meta: "Data Desk - 9 min - 1 day ago",
    large: true,
  },
  {
    tag: "Battery - Research",
    title:
      "Solid-state batteries are coming to India sooner than expected - Tata's R&D chief speaks",
    excerpt:
      "An exclusive conversation on the 2027 timeline, cell chemistry choices, and why India's heat conditions require a unique approach.",
    meta: "Rajan Verma - 7 min - 2 days ago",
    large: false,
  },
  {
    tag: "Charging - Infra",
    title: "How Charge Zone plans to deploy 10,000 DCFC stations by 2026",
    excerpt:
      "The startup's blueprint: highways first, then Tier 2 cities, then apartments. We map out the strategy and the funding behind it.",
    meta: "Ananya Singh - 5 min - 3 days ago",
    large: false,
  },
];

const stories = [
  {
    tag: "Battery Tech - India",
    title:
      "LFP vs NMC: Why Indian OEMs are betting on iron-phosphate chemistry despite the range trade-off",
    excerpt:
      "Tata, MG, and BYD have all standardised on LFP for their Indian lineup. We break down the thermal, cost, and longevity reasons behind this shift.",
    meta: "Rajan Verma - 8 min - Yesterday",
    icon: "B",
  },
  {
    tag: "Charging Infra - Analysis",
    title:
      "India's DC fast charger rollout is stalling - and the culprit is land, not money",
    excerpt:
      "Despite aggressive targets, DCFC deployment is running at 40% of planned pace. We investigated 6 months of tender data across 12 states.",
    meta: "Ananya Singh - 11 min - 2 days ago",
    icon: "C",
  },
  {
    tag: "Two-Wheelers - Review",
    title:
      "Ather Rizta review: The family scooter that finally makes electric practical for Tier 2 cities",
    excerpt:
      "After 1,200km across Jaipur, Kota, and Ajmer - a real-world verdict on range anxiety, service access, and running costs.",
    meta: "Kavya Nair - 14 min - 3 days ago",
    icon: "S",
  },
  {
    tag: "Market - Data",
    title: "March 2025 EV sales data: Tata dominates, Mahindra surges, Ola slips",
    excerpt:
      "Full breakdown of monthly registration data across categories - with segment-wise growth rates and market share shifts since Q4 2024.",
    meta: "Data Desk - 5 min - 4 days ago",
    icon: "D",
  },
  {
    tag: "Policy - Startup",
    title:
      "PLI 2.0 for Advanced Chemistry Cells: What the revised targets mean for battery startups",
    excerpt:
      "The government's revised PLI scheme raises the performance bar for cell manufacturers. We speak to three startups navigating the new landscape.",
    meta: "Kiran Bhat - 10 min - 5 days ago",
    icon: "P",
  },
  {
    tag: "Passenger EVs - Launch",
    title:
      "Mahindra BE.07 first drive: Bold, brash, and the most range we've tested in India",
    excerpt:
      "At 683km ARAI, the BE.07 rewrites the range narrative. But it's the driving dynamics and software that truly set it apart from the Nexon EV.",
    meta: "Meera Pillai - 12 min - 6 days ago",
    icon: "E",
  },
];

const sales = [
  { brand: "Tata Motors", value: "18,240", change: "+12.4%", up: true, share: "41.2%", width: 82 },
  { brand: "Mahindra EV", value: "9,870", change: "+34.1%", up: true, share: "22.3%", width: 44 },
  { brand: "Ola Electric", value: "7,512", change: "-8.2%", up: false, share: "17.0%", width: 34 },
  { brand: "Ather Energy", value: "5,340", change: "+22.7%", up: true, share: "12.1%", width: 24 },
  { brand: "MG Motor", value: "3,210", change: "+5.8%", up: true, share: "7.3%", width: 15 },
];

const footerColumns = [
  {
    title: "Sections",
    links: ["Vehicles", "Charging", "Policy", "Battery Tech"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Advertise", "Careers"],
  },
  {
    title: "Resources",
    links: ["Newsletter", "Market Data", "Privacy Policy", "Terms"],
  },
];

const stateLinks = stateNews.map((item) => ({
  label: item.state,
  href: `/state-news/${item.slug}`,
}));
function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "error" | "subscribed">("idle");
  const [animateBars, setAnimateBars] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const newsletterRef = useRef<HTMLDivElement | null>(null);

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const node = widgetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setAnimateBars(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[var(--wh)] text-[var(--txt)]">
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--brd)] bg-white/95 px-5 py-4 backdrop-blur md:px-12">
          <Link href="/" className="font-['Bebas_Neue'] text-[30px] tracking-[0.06em] text-[var(--blk)]">
            EV<span className="text-[var(--grn)]">TIMES</span>
          </Link>
          <ul className="hidden gap-8 md:flex">
            {["Vehicles", "Charging", "Policy", "Battery Tech", "Startups", "Market"].map((item) => (
              <li key={item}>
                <a href="#" className="text-xs font-medium uppercase tracking-[0.05em] text-[var(--txt2)] hover:text-[var(--grn)]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded border border-[var(--brd-dark)] px-4 py-2 text-xs text-[var(--grn)] hover:bg-[var(--grn-xlight)]"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={scrollToNewsletter}
              className="rounded bg-[var(--grn)] px-5 py-2 text-xs text-white hover:bg-[var(--grn-acc)]"
            >
              Subscribe
            </button>
          </div>
        </nav>

        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--brd)] bg-[var(--grn-xlight)] px-5 py-3 text-sm md:px-12">
          <span className="rounded bg-[var(--grn)] px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-white">
            Breaking
          </span>
          <span>
            Cabinet approves FAME III with Rs 12,000 crore outlay -{" "}
            <a href="#" className="font-medium text-[var(--grn)] hover:underline">
              read the full analysis -&gt;
            </a>
          </span>
        </div>

        <div className="ticker-shell border-b border-[var(--brd-dark)] bg-[var(--blk)] text-white">
          <div className="flex items-center">
            <div className="shrink-0 bg-[var(--grn)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white md:px-5">
              News Flash
            </div>
            <div className="ticker-window min-w-0 flex-1 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/90">
              <div className="ticker-track whitespace-nowrap">
                {[0, 1].map((group) => (
                  <div key={group} aria-hidden={group === 1} className="ticker-group">
                    {tickerItems.map((item, index) => (
                      <span
                        key={`${group}-${index}-${item}`}
                        className="inline-flex items-center pr-12"
                      >
                        <span className="mr-4 text-[var(--grn-mid)]">/</span>
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="grid border-b border-[var(--brd)] lg:grid-cols-2">
          <div className="relative overflow-hidden border-b border-[var(--brd)] bg-white px-6 py-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(45,122,31,0.05)_0%,transparent_60%)]" />
            <div className="relative">
              <div className="inline-flex rounded border border-[var(--brd-dark)] bg-[var(--grn-xlight)] px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--grn-acc)]">
                Policy - Analysis
              </div>
              <h1 className="mt-6 font-['Instrument_Serif'] text-[34px] leading-[1.08] text-[var(--blk)] md:text-[50px]">
                India&apos;s <em className="text-[var(--grn)]">FAME III</em> subsidy scheme could reshape the EV market - here&apos;s what we know
              </h1>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--txt2)]">
                The government is expected to announce a revised subsidy structure that extends support to private four-wheelers for the first time, potentially unlocking demand from a segment that has remained price-sensitive. We break down the policy framework, winners, and what it means for OEMs.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--txt3)]">
                <span className="font-medium text-[var(--blk)]">Priya Mehta</span>
                <span className="h-1 w-1 rounded-full bg-[var(--grn-mid)]" />
                <span>6 min read</span>
                <span className="h-1 w-1 rounded-full bg-[var(--grn-mid)]" />
                <span>2 hours ago</span>
              </div>
              <Link
                href="/signup"
                className="mt-6 inline-block rounded bg-[var(--grn)] px-6 py-3 text-sm text-white hover:bg-[var(--grn-acc)]"
              >
                Read article -&gt;
              </Link>
            </div>
          </div>
          <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[var(--grn-xlight)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_39px,rgba(45,122,31,0.06)_40px),linear-gradient(to_bottom,transparent_39px,rgba(45,122,31,0.06)_40px)] bg-[size:40px_40px]" />
            <div className="relative z-10 font-['Bebas_Neue'] text-[160px] tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgba(45,122,31,0.25)]">
              EV
            </div>
            <div className="absolute bottom-6 right-6 rounded bg-[var(--grn)] px-4 py-2 text-[11px] uppercase tracking-[0.05em] text-white">
              Cover Story
            </div>
          </div>
        </section>

        <section className="grid border-b border-[var(--brd)] lg:grid-cols-[2fr_1fr_1fr]">
          {heroCards.map((item) => (
            <a key={item.title} href="#" className="border-r border-[var(--brd)] px-6 py-8 transition hover:bg-[var(--grn-xlight)] last:border-r-0 md:px-9">
              <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--grn)]">{item.tag}</div>
              <h2 className={`mt-3 font-['Instrument_Serif'] text-[var(--blk)] ${item.large ? "text-[28px] leading-[1.2]" : "text-[20px] leading-[1.3]"}`}>
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--txt2)]">{item.excerpt}</p>
              <p className="mt-3 text-xs text-[var(--txt3)]">{item.meta}</p>
            </a>
          ))}
        </section>

        <div className="flex overflow-x-auto border-b border-[var(--brd)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveCategory(item)}
              className={`shrink-0 border-r border-[var(--brd)] px-6 py-3 text-[11px] uppercase tracking-[0.06em] ${activeCategory === item ? "bg-[var(--grn-xlight)] text-[var(--grn)]" : "text-[var(--txt2)] hover:bg-[var(--gry)]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="border-r border-[var(--brd)]">
            <div className="flex items-center justify-between border-b border-[var(--brd)] px-6 py-5 md:px-12">
              <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--txt2)]">Latest stories</span>
              <select className="rounded border border-[var(--brd)] bg-transparent px-3 py-1 text-[11px] text-[var(--txt2)]">
                <option>Most Recent</option>
                <option>Most Read</option>
                <option>Trending</option>
              </select>
            </div>
            {stories.map((story) => (
              <a
                key={story.title}
                href="#"
                className="grid gap-5 border-b border-[var(--brd)] px-6 py-7 transition hover:bg-[var(--grn-xlight)] md:grid-cols-[minmax(0,1fr)_120px] md:px-12"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--grn)]">{story.tag}</div>
                  <h3 className="mt-2 font-['Instrument_Serif'] text-[22px] leading-[1.3] text-[var(--blk)]">{story.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--txt2)]">{story.excerpt}</p>
                  <div className="mt-4 text-xs text-[var(--txt3)]">{story.meta}</div>
                </div>
                <div className="flex h-[90px] w-[120px] items-center justify-center rounded border border-[var(--brd)] bg-[var(--grn-xlight)] font-['Bebas_Neue'] text-4xl text-[var(--grn-dark)]">
                  {story.icon}
                </div>
              </a>
            ))}
            <div className="border-b border-[var(--brd)] px-6 py-7 text-center md:px-12">
              <button className="rounded border border-[var(--brd-dark)] px-8 py-3 text-xs text-[var(--grn)] hover:bg-[var(--grn-xlight)]">
                Load more stories
              </button>
            </div>
          </section>

          <aside>
            <div ref={newsletterRef} className="border-b border-[var(--brd)] px-5 py-6">
              <h3 className="border-b border-[var(--brd)] pb-3 text-[10px] uppercase tracking-[0.12em] text-[var(--txt2)]">
                Trending this week
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  ["Tata Curvv EV deliveries begin - 47,000 bookings pending", "12.4k reads - Passenger"],
                  ["V2G in India: Tata Power pilots bidirectional charging in Mumbai", "9.1k reads - Charging"],
                  ["Explained: What the new BIS standards mean for EV charger safety", "7.8k reads - Policy"],
                  ["Reliance's $2B battery gigafactory - progress report", "6.2k reads - Battery"],
                ].map((item, index) => (
                  <div key={item[0]} className="flex gap-3 rounded p-2 hover:bg-[var(--grn-xlight)]">
                    <div className="w-8 font-['Bebas_Neue'] text-[32px] leading-none text-[var(--grn-light)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="font-['Instrument_Serif'] text-[15px] leading-[1.35] text-[var(--blk)]">{item[0]}</div>
                      <div className="mt-1 text-xs text-[var(--txt3)]">{item[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-[var(--brd)] px-5 py-6">
              <div className="rounded-md border border-[var(--brd)] bg-[var(--grn-xlight)] p-5">
                <h3 className="font-['Instrument_Serif'] text-[22px] leading-[1.25] text-[var(--blk)]">
                  The EV brief, <em className="text-[var(--grn)]">every morning</em>
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--txt2)]">
                  One sharp summary of what moved in the EV world. No noise, no ads. 3 minutes.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (newsletterState !== "idle") setNewsletterState("idle");
                  }}
                  placeholder="your@email.com"
                  disabled={newsletterState === "subscribed"}
                  className={`mt-4 w-full rounded border bg-white px-4 py-2.5 text-sm outline-none ${newsletterState === "error" ? "border-red-500" : "border-[var(--brd-dark)]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setNewsletterState(email.includes("@") ? "subscribed" : "error")}
                  className="mt-3 w-full rounded bg-[var(--grn)] px-4 py-2.5 text-sm text-white hover:bg-[var(--grn-acc)]"
                >
                  {newsletterState === "subscribed" ? "You&apos;re subscribed!" : "Get the brief -&gt;"}
                </button>
              </div>
            </div>

            <div className="border-b border-[var(--brd)] px-5 py-6">
              <h3 className="border-b border-[var(--brd)] pb-3 text-[10px] uppercase tracking-[0.12em] text-[var(--txt2)]">
                Editor&apos;s picks
              </h3>
              <div className="space-y-3 pt-4">
                {[
                  ["Global - Insight", "Why China's EV dominance is a warning for India's nascent industry", "Priya Mehta - 16 min read", "G"],
                  ["Technology - Deep Dive", "The BMS arms race: How Indian startups are building better battery management", "Rajan Verma - 13 min read", "T"],
                ].map((item) => (
                  <a key={item[1]} href="#" className="block rounded p-2 hover:bg-[var(--grn-xlight)]">
                    <div className="mb-3 flex h-28 items-center justify-center rounded border border-[var(--brd)] bg-[var(--grn-xlight)] font-['Bebas_Neue'] text-5xl text-[var(--grn-dark)]">
                      {item[3]}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.07em] text-[var(--grn)]">{item[0]}</div>
                    <div className="mt-1 font-['Instrument_Serif'] text-[17px] leading-[1.3] text-[var(--blk)]">{item[1]}</div>
                    <div className="mt-1 text-xs text-[var(--txt3)]">{item[2]}</div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section ref={widgetRef} className="border-b border-[var(--brd)]">
          <div className="flex items-center gap-3 border-b border-[var(--brd)] px-5 py-5 md:px-12">
            <h2 className="font-['Bebas_Neue'] text-[24px] tracking-[0.04em] text-[var(--blk)]">EV Sales Tracker</h2>
            <span className="rounded border border-[var(--brd)] bg-[var(--grn-xlight)] px-3 py-1 text-xs text-[var(--grn-acc)]">
              March 2025
            </span>
          </div>
          <div className="grid border-b border-[var(--brd)] sm:grid-cols-2 lg:grid-cols-5">
            {sales.map((item) => (
              <div key={item.brand} className="border-r border-[var(--brd)] px-7 py-5 last:border-r-0">
                <p className="text-xs uppercase tracking-[0.05em] text-[var(--txt2)]">{item.brand}</p>
                <p className="mt-2 font-['Bebas_Neue'] text-[34px] leading-none text-[var(--blk)]">{item.value}</p>
                <p className={`mt-1 text-xs ${item.up ? "text-[var(--grn)]" : "text-[#c0392b]"}`}>{item.change}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 px-5 py-5 md:px-12">
            {sales.map((item, index) => (
              <div key={item.brand} className="flex items-center gap-4 text-sm">
                <span className="w-24 shrink-0 text-[var(--txt2)]">{item.brand}</span>
                <div className="h-2 flex-1 overflow-hidden rounded bg-[var(--gry2)]">
                  <div
                    className="h-full rounded bg-[var(--grn)] transition-all duration-1000 ease-out"
                    style={{ width: animateBars ? `${item.width}%` : "0%", transitionDelay: `${index * 100}ms` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right font-medium text-[var(--txt)]">{item.share}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="bg-[var(--blk)] text-white">
          <div className="grid gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:px-12">
            <div>
              <Link href="/" className="font-['Bebas_Neue'] text-[34px] tracking-[0.06em]">
                EV<span className="text-[var(--grn-mid)]">TIMES</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
                India&apos;s independent source for EV news, sharp analysis, and market tracking across vehicles, policy, batteries, and charging.
              </p>
              <div className="mt-5 flex gap-3">
                {["X", "in", "yt"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-white/70 transition hover:border-[var(--grn-mid)] hover:text-[var(--grn-mid)]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] uppercase tracking-[0.12em] text-[var(--grn-light)]">
                  {column.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm text-white/65 transition hover:text-[var(--grn-mid)]"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.12em] text-[var(--grn-light)]">
                States
              </h3>
              <div className="mt-4 space-y-3">
                {stateLinks.map((state) => (
                  <Link
                    key={state.label}
                    href={state.href}
                    className="block text-sm text-white/65 transition hover:text-[var(--grn-mid)]"
                  >
                    {state.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 text-xs text-white/45 md:flex-row md:items-center md:justify-between lg:px-12">
            <p>&copy; 2026 EVTimes. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="transition hover:text-[var(--grn-mid)]">
                Privacy
              </a>
              <a href="#" className="transition hover:text-[var(--grn-mid)]">
                Terms
              </a>
              <a href="#" className="transition hover:text-[var(--grn-mid)]">
                Sitemap
              </a>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .ticker-shell {
          position: relative;
        }

        .ticker-window {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
        }

        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ticker 28s linear infinite;
        }

        .ticker-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding-right: 1rem;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}

export default Home;
