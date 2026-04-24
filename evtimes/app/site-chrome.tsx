import Link from "next/link";

export function SiteHeader() {
  return (
    <nav>
      <Link href="/" className="logo">
        EV<span>TIMES</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#">Vehicles</Link>
        </li>
        <li>
          <Link href="#">Charging</Link>
        </li>
        <li>
          <Link href="#">Policy</Link>
        </li>
        <li>
          <Link href="#">Battery Tech</Link>
        </li>
        <li>
          <Link href="#">Startups</Link>
        </li>
        <li>
          <Link href="#">Market</Link>
        </li>
      </ul>
      <div className="nav-right">
        <Link href="/login" className="btn-ghost">
          login
        </Link>
        
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-f">
            EV<span>TIMES</span>
          </div>
          <p>
            India&apos;s most trusted independent source for electric vehicle
            news, analysis, and data. Covering the EV transition since 2020.
          </p>
          <div className="footer-social">
            <Link href="#" className="fsoc">
              X
            </Link>
            <Link href="#" className="fsoc">
              in
            </Link>
            <Link href="#" className="fsoc">
              yt
            </Link>
            <Link href="#" className="fsoc">
              ig
            </Link>
          </div>
        </div>
        <div className="footer-col">
          <h4>Coverage</h4>
          <ul>
            <li><Link href="#">Vehicles</Link></li>
            <li><Link href="#">Charging Infrastructure</Link></li>
            <li><Link href="#">Battery Technology</Link></li>
            <li><Link href="#">Policy & Regulation</Link></li>
            <li><Link href="#">Startups & Funding</Link></li>
            <li><Link href="#">Market Data</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About EVTimes</Link></li>
            <li><Link href="#">Our Journalists</Link></li>
            <li><Link href="#">Editorial Standards</Link></li>
            <li><Link href="#">Advertise With Us</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="#">EV Buyer&apos;s Guide</Link></li>
            <li><Link href="#">Charging Station Map</Link></li>
            <li><Link href="#">Subsidy Calculator</Link></li>
            <li><Link href="#">Range Database</Link></li>
            <li><Link href="#">RSS Feed</Link></li>
            <li><Link href="#">Newsletter Archive</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>State</h4>
         <ul>
      <li><a href="#">Rajasthan</a></li>
      <li><a href="#">Uttar pradesh</a></li>
      <li><a href="#">Haryana</a></li>
      <li><a href="#">Punjab</a></li>
      <li><a href="#">Maharashtra</a></li>
      <li><a href="#">Gujarat</a></li>
      </ul>
       </div>
      </div>

      <footer className="bottom">
        <div>© 2025 EVTimes Media Pvt. Ltd. Independent EV journalism.</div>
        <div className="footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Cookie Policy</Link>
          <Link href="#">Sitemap</Link>
        </div>
      </footer>
    </>
  );
}
