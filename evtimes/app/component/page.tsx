import Link from "next/link";
import { newsArticles } from "../news-data";

export default function ComponentPage() {
  return (
    <main className="article-page">
      <div className="article-shell">
        <section className="article-detail">
          <div className="article-kicker">News Routes</div>
          <h1>Open any news story by slug</h1>
          <p className="article-standfirst">
            These links open as real routes like <code>/news-title</code> so the
            browser URL changes when you click a story.
          </p>

          <div className="route-list">
            {newsArticles.map((article) => (
              <Link key={article.slug} href={`/${article.slug}`} className="route-card">
                <span className="route-category">{article.category}</span>
                <strong>{article.title}</strong>
                <span>{article.excerpt}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
