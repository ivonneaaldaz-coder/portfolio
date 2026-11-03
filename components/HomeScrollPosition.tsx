"use client";

import { useLayoutEffect } from "react";

/** Reset retained scroll when navigating back to the homepage. */
export default function HomeScrollPosition() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
