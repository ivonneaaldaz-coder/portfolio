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
        <MotionSystem />
        <SiteFrame>{children}</SiteFrame>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
