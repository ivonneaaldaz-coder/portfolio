"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Keep navigation arrows typographic rather than emoji across every route. */
export default function PlainTextArrows() {
  const pathname = usePathname();
  useEffect(() => {
    const normalize = (root: ParentNode) => {
      const elements = root.querySelectorAll("a, button");
      elements.forEach(element => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const value = node.textContent || "";
          if (/[↗➡🔗]/u.test(value)) {
            node.textContent = value.replace(/↗️?|➡️?|🔗/gu, "→");
          }
        }
      });
    };
    normalize(document);
    const observer = new MutationObserver(() => normalize(document));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
