import { AnnouncementBar } from "@/components/home/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { StructuredData } from "@/components/seo/structured-data";
import { site } from "@/content/site";
import { ibmPlexMono, manrope } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo";
import { buildView } from "@/lib/site";
import { validateSite } from "@/lib/utils";
import type { ReactNode } from "react";
import "./globals.css";

validateSite(site);

const view = buildView();

export const metadata = rootMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexMono.variable} js`}
      suppressHydrationWarning
    >
      <body>
        <StructuredData />
        <SkipLink />
        {view.announcement && view.announcementText ? (
          <AnnouncementBar
            text={view.announcementText}
            href={view.announcement.href}
          />
        ) : null}
        <SiteHeader nav={view.nav} joinCta={{ label: "Join SMC", href: "/join" }} />
        {children}
        <SiteFooter view={view} />
      </body>
    </html>
  );
}
