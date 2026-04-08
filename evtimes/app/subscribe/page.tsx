import { SiteFooter, SiteHeader } from "../site-chrome";

export default function SubscribePage() {
  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <div className="article-shell">
          <section className="article-detail">
            <div className="article-kicker">Membership</div>
            <h1>Subscribe to EVTimes</h1>
            <p className="article-standfirst">
              Get daily EV news, sharp market analysis, and premium stories in
              one place.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
