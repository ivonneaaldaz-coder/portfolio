"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/SiteFooter";
import { MusicProvider } from "@/components/MusicProvider";
import GlobalMusicControls from "@/components/GlobalMusicControls";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneApp = pathname.startsWith("/experiments/moodboard-agent");

  return (
    <MusicProvider>
      {isStandaloneApp ? (
        <main className="standalone-app-main">{children}</main>
      ) : (
        <>
          <div className="global-theme-control">
            <ThemeToggle />
          </div>
          <div className="site-shell">
            <Sidebar />
            <MobileNav />
            <main className="site-main">{children}<SiteFooter /></main>
          </div>
          <GlobalMusicControls />
        </>
      )}
    </MusicProvider>
  );
}
