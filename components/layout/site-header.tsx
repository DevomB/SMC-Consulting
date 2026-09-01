"use client";

import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import type { Cta, NavItem } from "@/lib/site-types";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  nav: NavItem[];
  joinCta: Cta;
  tone?: "dark" | "light";
};

export function SiteHeader({ nav, joinCta, tone = "dark" }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-header",
        tone === "dark" && "site-header--dark",
        scrolled && "is-scrolled",
      )}
    >
      <div className="header-inner">
        <Link className="wordmark" href="/">
          SMC
        </Link>
        <ul className="nav-fallback">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link href={joinCta.href}>Join SMC</Link>
          </li>
        </ul>
        <nav aria-label="Primary">
          <ul className="nav-desktop">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Button {...joinCta} label="Join SMC" variant={tone === "dark" ? "primary" : "on-paper"} />
            </li>
          </ul>
        </nav>
        <MobileMenu items={nav} joinHref={joinCta.href} />
      </div>
    </header>
  );
}
