import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
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
        <div className="site-shell">
          <Sidebar />
          <MobileNav />
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
