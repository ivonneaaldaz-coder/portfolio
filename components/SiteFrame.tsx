"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/SiteFooter";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <main className="landing-main">{children}</main>;
  }

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
