import { SiteFooter, SiteHeader } from "../site-chrome";

export default function SignInPage() {
  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <div className="article-shell">
          <section className="article-detail">
            <div className="article-kicker">Account Access</div>
            <h1>Sign in to EVTimes</h1>
            <p className="article-standfirst">
              Access saved stories, newsletters, and premium EV market analysis.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
