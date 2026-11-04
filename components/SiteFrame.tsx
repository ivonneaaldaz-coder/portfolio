"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import PlainTextArrows from "@/components/PlainTextArrows";
import SiteFooter from "@/components/SiteFooter";
import { MusicProvider } from "@/components/MusicProvider";
import GlobalMusicControls from "@/components/GlobalMusicControls";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (window.location.hash) return;
    window.scrollTo({top:0,left:0,behavior:"instant"});
    const frame = requestAnimationFrame(() => window.scrollTo({top:0,left:0,behavior:"instant"}));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  const isStandaloneApp = pathname.startsWith("/experiments/moodboard-agent");

  return (
    <MusicProvider>
      <PlainTextArrows />
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
