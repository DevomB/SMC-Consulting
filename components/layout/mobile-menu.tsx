"use client";

import type { NavItem } from "@/lib/site-types";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function MobileMenu({ items, joinHref }: { items: NavItem[]; joinHref: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") el.open = false;
    };
    const onToggle = () => {
      document.body.style.overflow = el.open ? "hidden" : "";
    };

    el.addEventListener("toggle", onToggle);
    document.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("toggle", onToggle);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <details ref={detailsRef} className="mobile-nav">
      <summary>
        <span className="menu-closed">Menu</span>
        <span className="menu-open">Close</span>
      </summary>
      <div className="mobile-nav-sheet">
        <nav aria-label="Mobile">
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => { detailsRef.current && (detailsRef.current.open = false); }}>
              {item.label}
            </Link>
          ))}
          <Link href={joinHref} onClick={() => { detailsRef.current && (detailsRef.current.open = false); }}>
            Join SMC
          </Link>
        </nav>
      </div>
    </details>
  );
}
