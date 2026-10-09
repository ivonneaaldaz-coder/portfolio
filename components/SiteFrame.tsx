"use client";

import { usePathname } from "next/navigation";
import EditorialShell from "./EditorialShell";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/SiteFooter";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneApp = pathname.startsWith("/experiments/moodboard-agent");

  if (["/about", "/books", "/music"].includes(pathname)) return <EditorialShell>{children}</EditorialShell>;

  if (pathname === "/") return <>{children}</>;

  if (isStandaloneApp) {
    return <main className="standalone-app-main">{children}</main>;
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
