"use client";

import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/SiteFooter";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="global-theme-control">
        <ThemeToggle />
      </div>
      <div className="site-shell">
        <Sidebar />
        <MobileNav />
        <main className="site-main">{children}<SiteFooter /></main>
      </div>
    </>
  );
}
