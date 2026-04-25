import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getHomepageArticleBySlug,
  homepageArticles,
} from "@/app/lib/homepageArticles";

export function generateStaticParams() {
  return homepageArticles.map((article) => ({ slug: article.slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getHomepageArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ec_100%)] text-[var(--txt)]">
      <nav className="bg-white/95 px-4 py-4 backdrop-blur sm:px-6 md:px-12">
        <div className="flex w-full items-center justify-between gap-4">
          <Link
            href="/"
            className="font-['Bebas_Neue'] text-[28px] tracking-[0.06em] text-[var(--blk)]"
          >
            EV<span className="text-[var(--grn)]">TIMES</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--grn)] transition hover:underline"
          >
            Back to home
          </Link>
        </div>
      </nav>

      <section className="px-4 py-10 sm:px-6 md:px-12">
        <div className="mx-auto max-w-8xl px-2 py-2 sm:px-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grn)]">
            {article.tag}
          </p>
          <h1 className="mt-4 font-['Instrument_Serif'] text-[34px] font-normal leading-[1.1] text-[var(--blk)] sm:text-[42px] md:text-[52px]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-9 text-[var(--txt2)] sm:text-[19px]">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--txt3)]">
            <span className="font-medium text-[var(--blk)]">{article.author}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--grn-mid)]" />
            <span>{article.readTime}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--grn-mid)]" />
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 md:px-12">
        <article className="mx-auto w-full space-y-6 rounded-[28px] bg-[#f9fcf4] px-4 py-5 sm:px-6 sm:py-6">
          {article.content.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[17px] leading-9 text-[var(--txt2)] sm:text-[19px]"
            >
              {paragraph}
            </p>
          ))}
        </article>
      </section>
    </main>
  );
}
