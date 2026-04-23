import Link from "next/link";
import { notFound } from "next/navigation";
import { stateNews } from "../../lib/stateNews";

export function generateStaticParams() {
  return stateNews.map((item) => ({ state: item.slug }));
}

export default async function StateNewsPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const currentState = stateNews.find((item) => item.slug === state);

  if (!currentState) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fdfefb_0%,#f4f8ee_56%,#edf4e3_100%)] text-[var(--txt)]">
      <nav className="sticky top-0 z-50 border-b border-[var(--brd)] bg-white/92 px-4 py-4 backdrop-blur sm:px-5 md:px-12">
        <Link href="/" className="font-['Bebas_Neue'] text-[28px] tracking-[0.06em] text-[var(--blk)] sm:text-[30px]">
          EV<span className="text-[var(--grn)]">TIMES</span>
        </Link>
      </nav>
      <section className="relative overflow-hidden border-b border-[var(--brd)] px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,122,31,0.15),transparent_44%),linear-gradient(180deg,rgba(234,243,222,0.92)_0%,rgba(255,255,255,0.78)_58%,rgba(255,255,255,0.96)_100%)]" />
        <div className="relative max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--grn)]">State Wise News</p>
          <h1 className="mt-4 font-['Instrument_Serif'] text-[34px] leading-[1.08] text-[var(--blk)] sm:text-[40px] md:text-[58px]">
            {currentState.state} <em className="text-[var(--grn)]">EV coverage</em>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--txt2)] sm:text-base sm:leading-8">
            {currentState.update}. Track city-level developments, charging updates, local policy moves, and EV market activity for {currentState.state}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-[var(--brd)] bg-white px-4 py-2 text-xs text-[var(--grn-acc)] shadow-[0_8px_18px_rgba(39,80,10,0.06)]">
              {currentState.update}
            </span>
            <span className="rounded-full bg-[var(--grn-xlight)] px-4 py-2 text-xs text-[var(--grn)]">
              {currentState.cities.length} live city highlights
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:px-12 md:py-10">
        <article className="rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_20px_44px_rgba(39,80,10,0.08)] sm:rounded-[28px] sm:p-6">
          <div className="flex flex-wrap items-start gap-4 border-b border-[var(--brd)] pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grn)]">State Desk</p>
              <h2 className="mt-2 font-['Instrument_Serif'] text-[26px] leading-[1.1] text-[var(--blk)] sm:text-[30px]">
                {currentState.state}
              </h2>
            </div>
            <span className="rounded-full bg-[var(--grn-xlight)] px-4 py-2 text-xs text-[var(--grn-acc)]">
              {currentState.update}
            </span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {currentState.cities.map((cityItem) => (
              <div
                key={cityItem.city}
                className="rounded-2xl border border-[var(--brd)] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ef_100%)] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(39,80,10,0.08)]"
              >
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--grn)]">{cityItem.city}</div>
                <h3 className="mt-2 font-['Instrument_Serif'] text-[20px] leading-[1.25] text-[var(--blk)] sm:text-[22px]">
                  {cityItem.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--txt2)]">{cityItem.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
