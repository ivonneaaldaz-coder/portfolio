import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import HomeWatercolorTrace from "@/components/HomeWatercolorTrace";

export const metadata = {
  ...pageMetadata("Ivonne Aldaz — Strategist, artist, builder", "Ivonne Aldaz. Strategist, artist, builder. Explore work and play.", "/"),
  title: { absolute: "Ivonne Aldaz — Strategist, artist, builder" },
};

export default function OverviewPage() {
  return (
    <main className="overview-page home-minimal"><style>{`@media(max-width:900px){.home-minimal .home-minimal-hero{min-height:clamp(560px,75svh,720px)!important}.home-minimal .home-minimal-content{padding-top:clamp(70px,11svh,110px)!important;padding-bottom:clamp(64px,10svh,100px)!important;transform:none!important}.home-minimal .home-minimal-links{margin-top:clamp(32px,5svh,48px)!important}.home-minimal .home-proof{margin-top:clamp(48px,8svh,72px)!important;gap:12px!important;line-height:1.85!important;letter-spacing:.035em!important;font-size:10px!important;max-width:100%!important}.home-minimal .home-proof-brands{text-align:center!important;max-width:340px!important;margin:auto!important;line-height:1.85!important}.home-minimal .home-proof-label{letter-spacing:.14em!important}.home-minimal .home-proof-mobile-break{display:block!important}}@media(min-width:901px){.home-minimal .home-proof-mobile-break{display:none!important}.home-minimal .home-proof{margin-top:clamp(44px,5vw,64px)!important}}@media(max-width:900px){.home-minimal .home-minimal-content h1{font-size:clamp(35px,8.7vw,56px)!important;letter-spacing:-.065em!important;white-space:nowrap!important}.home-minimal .home-minimal-content h1 span{font-size:1em!important;letter-spacing:-.065em!important;white-space:nowrap!important;line-height:1.18!important}.home-minimal .home-proof{margin-top:clamp(82px,11svh,112px)!important}.site-main:has(>.home-minimal)>.site-footer .footer-about h2{font-size:clamp(28px,7vw,38px)!important;line-height:1.15!important;letter-spacing:-.045em!important}}`}</style>
      <section className="home-minimal-hero" aria-labelledby="home-title">
        <HomeWatercolorTrace />
        <div className="home-minimal-content">
          <h1 id="home-title">I make things — <span>brands, art, experiences.</span></h1>
          <div className="home-minimal-links">
            <Link href="/work">Explore work <span aria-hidden="true">↗</span></Link>
            <details className="home-play-disclosure"><summary>Explore play <span aria-hidden="true">+</span></summary><nav aria-label="Explore play"><Link href="/art">Art</Link><Link href="/travel">Travel</Link><Link href="/music">Music</Link><Link href="/books">Books + Quotes</Link><Link href="/visual-references">Visual References</Link></nav></details>
          </div>
          <p className="home-proof">
            <span className="home-proof-label">Selected work</span>
            <span className="home-proof-brands">Purina · ARM &amp; HAMMER · Hero Cosmetics<br className="home-proof-mobile-break"/>Nestlé · Adweek · Digiday</span>
          </p>
        </div>
      </section>
    </main>
  );
}
