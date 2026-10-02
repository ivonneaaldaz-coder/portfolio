import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Ivonne Aldaz — Portfolio",
  description: "Strategy, systems, creative technology, art, teaching, and experiments by Ivonne Aldaz.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Sidebar />
          <MobileNav />
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
