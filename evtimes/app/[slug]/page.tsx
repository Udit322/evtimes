import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, newsArticles } from "../news-data";
import { SiteFooter, SiteHeader } from "../site-chrome";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | EVTimes",
    };
  }

  return {
    title: `${article.title} | EVTimes`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <div className="article-shell">
          <Link href="/" className="article-back">
            ← Back to homepage
          </Link>

          <article className="article-detail">
            <div className="article-kicker">{article.category}</div>
            <h1>{article.title}</h1>
            <p className="article-standfirst">{article.excerpt}</p>

            <div className="article-byline">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.published}</span>
            </div>

            <div className="article-body">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
