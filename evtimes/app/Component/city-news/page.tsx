import Link from "next/link";
import { stateNews } from "./stateNews";

export default function CityNewsPage() {
  return (
    <main className="min-h-screen bg-[var(--wh)] text-[var(--txt)]">
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--brd)] bg-white/95 px-4 py-4 backdrop-blur sm:px-5 md:px-12">
        <Link href="/" className="font-['Bebas_Neue'] text-[28px] tracking-[0.06em] text-[var(--blk)] sm:text-[30px]">
          EV<span className="text-[var(--grn)]">TIMES</span>
        </Link>
        <Link
          href="/login"
          className="rounded bg-[var(--grn)] px-5 py-2 text-xs text-white hover:bg-[var(--grn-acc)]"
        >
          Login
        </Link>
      </nav>
      <section className="border-b border-[var(--brd)] bg-[linear-gradient(180deg,var(--grn-xlight)_0%,rgba(255,255,255,0)_100%)] px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--grn)]">City Wise News</p>
          <h1 className="mt-4 font-['Instrument_Serif'] text-[34px] leading-[1.08] text-[var(--blk)] sm:text-[40px] md:text-[58px]">
            EV coverage across <em className="text-[var(--grn)]">India</em> and major cities
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--txt2)] sm:text-base sm:leading-8">
            Browse state-by-state EV updates, city developments, charging projects, and local market movement from across India.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--brd)] px-4 py-5 sm:px-6 md:px-12">
        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--txt3)]">Browse by state</p>
        <div className="flex flex-wrap gap-3">
          {stateNews.map((item) => (
            <Link
              key={item.state}
              href={`/state-news/${item.slug}`}
              className="rounded-full border border-[var(--brd)] px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--txt2)] hover:bg-[var(--grn-xlight)] hover:text-[var(--grn)]"
            >
              {item.state}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:px-12 md:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {stateNews.map((item) => (
            <Link
              key={item.state}
              href={`/state-news/${item.slug}`}
              className="block rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_18px_40px_rgba(39,80,10,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--brd-dark)] hover:shadow-[0_24px_48px_rgba(39,80,10,0.1)] sm:rounded-[28px] sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--brd)] pb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grn)]">State Desk</p>
                  <h2 className="mt-2 font-['Instrument_Serif'] text-[26px] leading-[1.1] text-[var(--blk)] sm:text-[30px]">
                    {item.state}
                  </h2>
                </div>
                <span className="rounded-full bg-[var(--grn-xlight)] px-4 py-2 text-xs text-[var(--grn-acc)]">
                  {item.update}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {item.cities.map((cityItem) => (
                  <div key={cityItem.city} className="rounded-2xl border border-[var(--brd)] bg-[var(--gry)] p-4 sm:p-5">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--grn)]">{cityItem.city}</div>
                    <h3 className="mt-2 font-['Instrument_Serif'] text-[20px] leading-[1.25] text-[var(--blk)] sm:text-[22px]">
                      {cityItem.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--txt2)]">{cityItem.summary}</p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
