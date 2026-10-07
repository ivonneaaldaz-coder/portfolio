import type { Metadata } from "next";
import "./globals.css";
import MotionSystem from "@/components/MotionSystem";
import SiteFrame from "@/components/SiteFrame";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://ivonnealdaz.com"),
  title: "Ivonne Aldaz — Portfolio",
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
      </body>
    </html>
  );
}
