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
    <main className="min-h-screen bg-[var(--blk)] text-white">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[rgba(15,26,6,0.96)] px-5 py-4 backdrop-blur md:px-12">
        <Link href="/" className="font-['Bebas_Neue'] text-[30px] tracking-[0.06em] text-white">
          EV<span className="text-[var(--grn)]">TIMES</span>
        </Link>
        <span className="rounded bg-[var(--grn)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white">State Edition</span>
      </nav>

      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(45,122,31,0.22)_0%,rgba(15,26,6,0)_100%)] px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--grn)]">State Wise News</p>
          <h1 className="mt-4 font-['Instrument_Serif'] text-[40px] leading-[1.05] text-white md:text-[58px]">
            {currentState.state} <em className="text-[var(--grn)]">EV coverage</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            {currentState.update}. Track city-level developments, charging updates, local policy moves, and EV market activity for {currentState.state}.
          </p>
        </div>
      </section>

      <section className="px-6 py-8 md:px-12 md:py-10">
        <article className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grn)]">State Desk</p>
              <h2 className="mt-2 font-['Instrument_Serif'] text-[30px] leading-[1.1] text-white">
                {currentState.state}
              </h2>
            </div>
            <span className="rounded-full border border-[var(--grn-mid)]/40 bg-[rgba(45,122,31,0.18)] px-4 py-2 text-xs text-[var(--grn-light)]">
              {currentState.update}
            </span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {currentState.cities.map((cityItem) => (
              <div key={cityItem.city} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] p-5">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--grn)]">{cityItem.city}</div>
                <h3 className="mt-2 font-['Instrument_Serif'] text-[22px] leading-[1.25] text-white">
                  {cityItem.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/68">{cityItem.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
