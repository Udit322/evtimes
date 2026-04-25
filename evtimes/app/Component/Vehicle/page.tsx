import Link from "next/link";

const leadStory = {
  eyebrow: "Vehicle Desk",
  title: "India's next wave of EV launches is shifting from hype to real-world practicality",
  summary:
    "From city hatchbacks to highway-ready SUVs, automakers are now selling range confidence, charging speed, and software reliability instead of just headline battery numbers.",
  author: "Aarav Sethi",
  readTime: "8 min read",
  publishedAt: "April 25, 2026",
};

const spotlightStories = [
  {
    title: "Best electric cars for urban commuters in 2026",
    excerpt:
      "Compact dimensions, low running cost, and easy home charging are becoming more important than outright top speed in crowded metro cities.",
    meta: "Buying Guide",
  },
  {
    title: "Electric SUVs are finally getting fast-charging right",
    excerpt:
      "New thermal systems and updated pack architecture are cutting long-stop frustration on highway routes for family buyers.",
    meta: "Road Test",
  },
  {
    title: "Why two-wheelers still dominate EV volume in India",
    excerpt:
      "Scooters remain the strongest entry point for mass electrification thanks to pricing, daily usage patterns, and charging convenience.",
    meta: "Market View",
  },
];
const latestVehicleStories = [
  {
    category: "Launch Watch",
    title: "7 upcoming EVs expected to shape festive-season demand",
    excerpt:
      "A mix of affordable city EVs and premium family vehicles could define showroom momentum in the second half of the year.",
    author: "Nisha Menon",
    meta: "5 min read",
    badge: "01",
  },
  {
    category: "Ownership",
    title: "What buyers should check before booking their first electric vehicle",
    excerpt:
      "Charging access, after-sales support, and battery warranty terms matter more than brochure claims when the car reaches everyday use.",
    author: "Kabir Anand",
    meta: "6 min read",
    badge: "02",
  },
  {
    category: "Comparison",
    title: "Range vs charging speed: what matters more for Indian drivers?",
    excerpt:
      "The answer changes sharply depending on whether the car is used for city loops, office commutes, or intercity weekends.",
    author: "Ritika Sharma",
    meta: "7 min read",
    badge: "03",
  },
  {
    category: "Fleet",
    title: "Commercial EV buyers are demanding uptime, not just lower cost per km",
    excerpt:
      "Fleet operators now rate service turnaround and charger compatibility as high as purchase incentives in procurement decisions.",
    author: "Dev Malhotra",
    meta: "4 min read",
    badge: "04",
  },
];

const stats = [
  { label: "Top Story Focus", value: "Passenger EVs" },
  { label: "Launches Tracked", value: "24 Models" },
  { label: "Road Tests This Quarter", value: "18 Reviews" },
  { label: "Desk Update", value: "Every Morning" },
];

const editorNotes = [
  "Affordable EVs are winning attention because ownership math is clearer now.",
  "Charging speed has become a stronger sales line than pure claimed range.",
  "Buyers increasingly expect connected features, OTA updates, and strong service coverage.",
];

export function VehiclePageContent() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f3f9eb_48%,#eef6e3_100%)] text-[var(--txt)]">
      <nav className="sticky top-0 z-50 border-b border-[var(--brd)] bg-white/95 px-4 py-4 backdrop-blur sm:px-6 md:px-12">
        <div className="flex w-full items-center justify-between gap-4">
          <Link
            href="/"
            className="font-['Bebas_Neue'] text-[28px] tracking-[0.06em] text-[var(--blk)]"
          >
            EV<span className="text-[var(--grn)]">TIMES</span>
          </Link>
          {/* <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.08em]">
            <span className="rounded-full border border-[var(--brd-dark)] bg-[var(--grn-xlight)] px-3 py-1 text-[var(--grn-dark)]">
              Vehicle Special
            </span> */}
            <Link href="/" className="text-[var(--grn)] transition hover:underline">
              Back to home
            </Link>
          {/* </div> */}
        </div>
      </nav>

      <section className="border-b border-[var(--brd)] px-4 py-10 sm:px-6 md:px-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--grn)]">
              {leadStory.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-['Instrument_Serif'] text-[36px] font-normal leading-[1.02] text-[var(--blk)] sm:text-[48px] md:text-[62px]">
              {leadStory.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--txt2)] sm:text-lg">
              {leadStory.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--txt3)]">
              <span className="font-medium text-[var(--blk)]">{leadStory.author}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--grn-mid)]" />
              <span>{leadStory.readTime}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--grn-mid)]" />
              <span>{leadStory.publishedAt}</span>
            </div>
          </div>

          {/* <div className="rounded-[28px] border border-[var(--brd)] bg-white/90 p-5 shadow-[0_20px_40px_rgba(39,80,10,0.08)]"> */}
            {/* <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--grn)]">
              Editor&apos;s Notes
            </p> */}
            {/* <div className="mt-4 space-y-3">
              {editorNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-[var(--brd)] bg-[var(--grn-xlight)] px-4 py-3 text-sm leading-6 text-[var(--txt2)]"
                >
                  {note}
                </div>
              ))}
            </div> */}
          {/* </div> */}
        </div>
      </section>

      <section className="border-b border-[var(--brd)] px-4 py-8 sm:px-6 md:px-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[22px] border border-[var(--brd)] bg-white px-5 py-5"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--txt3)]">
                {item.label}
              </p>
              <p className="mt-3 font-['Bebas_Neue'] text-[34px] leading-none tracking-[0.03em] text-[var(--blk)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-b border-[var(--brd)] px-4 py-10 sm:px-6 md:px-12">
        {/* <div className="flex items-center justify-between gap-4 border-b border-[var(--brd)] pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--grn)]">
              Spotlight
            </p>
            <h2 className="mt-2 font-['Bebas_Neue'] text-[32px] tracking-[0.04em] text-[var(--blk)]">
              Vehicle Stories
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--txt3)]">
            Sharp reads for buyers, enthusiasts, and anyone tracking how EV products are evolving.
          </p>
        </div> */}
{/* 
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {spotlightStories.map((story, index) => (
            <article
              key={story.title}
              className="group rounded-[28px] border border-[var(--brd)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(39,80,10,0.08)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--grn)]">
                  {story.meta}
                </span>
                <span className="font-['Bebas_Neue'] text-[28px] leading-none text-[var(--grn-light)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-['Instrument_Serif'] text-[28px] leading-[1.08] text-[var(--blk)]">
                {story.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--txt2)]">
                {story.excerpt}
              </p>
            </article>
          ))}
        </div> */}
      </section>

      <section className="px-4 py-10 sm:px-6 md:px-12 md:pb-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_340px]">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-[var(--brd)] pb-4">
              <h2 className="font-['Bebas_Neue'] text-[32px] tracking-[0.04em] text-[var(--blk)]">
                Latest From Vehicle Desk
              </h2>
              <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--txt3)]">
                Updated Daily
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {latestVehicleStories.map((story) => (
                <article
                  key={story.title}
                  className="grid gap-4 rounded-[26px] border border-[var(--brd)] bg-white px-5 py-5 sm:grid-cols-[72px_minmax(0,1fr)] sm:items-start"
                >
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[var(--grn-xlight)] font-['Bebas_Neue'] text-[34px] text-[var(--grn-dark)]">
                    {story.badge}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--grn)]">
                      {story.category}
                    </p>
                    <h3 className="mt-2 font-['Instrument_Serif'] text-[28px] leading-[1.1] text-[var(--blk)]">
                      {story.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--txt2)]">
                      {story.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--txt3)]">
                      <span className="font-medium text-[var(--blk)]">{story.author}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--grn-mid)]" />
                      <span>{story.meta}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* <aside className="space-y-5"> */}
            
            {/* <div className="rounded-[28px] border border-[var(--brd)] bg-white p-5"> */}
             
              {/* <div className="mt-4 grid gap-3">
                <Link
                  href="/"
                  className="rounded-2xl border border-[var(--brd)] bg-[var(--grn-xlight)] px-4 py-3 text-sm text-[var(--grn-dark)] transition hover:border-[var(--brd-dark)]"
                >
                  Home page
                </Link>
                <Link
                  href="/state-news/maharashtra"
                  className="rounded-2xl border border-[var(--brd)] px-4 py-3 text-sm text-[var(--txt2)] transition hover:bg-[var(--grn-xlight)]"
                >
                  State EV coverage
                </Link>
              </div> */}
            {/* </div> */}
          {/* </aside> */}
        </div>
      </section>
    </main>
  );
}

export default function VehicleComponentPage() {
  return <VehiclePageContent />;
}
