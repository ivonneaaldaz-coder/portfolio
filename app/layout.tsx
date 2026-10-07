import type { Metadata } from "next";
import "./globals.css";
import MotionSystem from "@/components/MotionSystem";
import SiteFrame from "@/components/SiteFrame";
import CustomCursor from "@/components/CustomCursor";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://ivonnealdaz.com"),
  title: { default: "Ivonne Aldaz — Strategy, technology, art", template: "%s" },
  description: "Strategy, systems, creative technology, art, teaching, and experiments by Ivonne Aldaz.",
};

const themeScript = `
(function() {
  try {
    if (sessionStorage.getItem('intro-seen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('intro-seen');
    else { sessionStorage.setItem('intro-seen', '1'); setTimeout(function(){ var el = document.getElementById('site-intro'); if (el) el.remove(); }, 2200); }
  } catch (e) {}
  try {
    var saved = localStorage.getItem('portfolio-theme');
    var theme = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div id="site-intro" aria-hidden="true">
          <div className="intro-inner">
            <span className="intro-name">Ivonne Aldaz</span>
            <span className="intro-line" />
            <span className="intro-sub">Strategy, technology, art.</span>
          </div>
        </div>
        <MotionSystem />
        <SiteFrame>{children}</SiteFrame>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
