import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug, stateNews } from "../../../lib/statenews";

type StateDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return stateNews.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: StateDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return {
      title: "State not found | EVTimes",
    };
  }

  return {
    title: `${state.state} EV Updates | EVTimes`,
    description: `Latest EV developments and city updates from ${state.state}.`,
  };
}

export default async function StateDetailPage({ params }: StateDetailPageProps) {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--wh)] text-[var(--txt)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--brd)] bg-white/95 px-5 py-4 backdrop-blur md:px-12">
        <Link href="/" className="font-['Bebas_Neue'] text-[30px] tracking-[0.06em] text-[var(--blk)]">
          EV<span className="text-[var(--grn)]">TIMES</span>
        </Link>
        <div className="flex gap-3">
          <Link
            href="/city-news"
            className="rounded border border-[var(--brd-dark)] px-4 py-2 text-xs text-[var(--grn)] hover:bg-[var(--grn-xlight)]"
          >
            All states
          </Link>
          <Link
            href="/login"
            className="rounded bg-[var(--grn)] px-5 py-2 text-xs text-white hover:bg-[var(--grn-acc)]"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <section className="border-b border-[var(--brd)] bg-[linear-gradient(180deg,var(--grn-xlight)_0%,rgba(255,255,255,0)_100%)] px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--grn)]">State Detail</p>
          <h1 className="mt-4 font-['Instrument_Serif'] text-[40px] leading-[1.05] text-[var(--blk)] md:text-[58px]">
            {state.state} EV updates
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--txt2)]">
            Deep dive into recent EV developments from key cities in {state.state}.
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[var(--grn)] px-4 py-2 text-xs text-white">
            {state.update}
          </span>
        </div>
      </section>

      <section className="px-6 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-4xl space-y-5">
          {state.cities.map((cityItem) => (
            <article
              key={cityItem.city}
              className="rounded-[24px] border border-[var(--brd)] bg-white p-6 shadow-[0_18px_40px_rgba(39,80,10,0.06)]"
            >
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--grn)]">{cityItem.city}</div>
              <h2 className="mt-2 font-['Instrument_Serif'] text-[30px] leading-[1.2] text-[var(--blk)]">
                {cityItem.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--txt2)]">{cityItem.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
