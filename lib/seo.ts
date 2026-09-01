import { routeSeo, type SeoRoute } from "@/content/seo";
import { site } from "@/content/site";
import type { SiteConfig, SiteEvent } from "@/lib/site-types";
import { isEmail, isHttpUrl, publicEvents } from "@/lib/utils";
import type { Metadata, MetadataRoute } from "next";

/** Page owners: `export const metadata = pageMetadata("join" | "privacy" | "contribute")`. */

/** Required public routes from IMPLEMENTATION.md. 404 is never listed. */
export const INDEXABLE_PATHS = ["/", "/join", "/contribute", "/privacy"] as const;

export type PublicUrlContext = {
  origin: string;
  basePath: string;
};

export function joinPublicUrl(origin: string, basePath: string, path: string): string {
  const root = origin.replace(/\/$/, "");
  const base = !basePath || basePath === "/" ? "" : `/${basePath.replace(/^\/|\/$/g, "")}`;
  if (path === "/" || path === "") return `${root}${base}`;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${root}${base}${suffix}`;
}

function envUrlContext(): PublicUrlContext | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    const https = url.protocol === "https:";
    const localHttp = url.protocol === "http:" && local;
    if (!https && !localHttp) return undefined;
    const origin = url.origin;
    const basePath = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    return { origin, basePath };
  } catch {
    return undefined;
  }
}

export function urlContext(config: SiteConfig = site): PublicUrlContext | undefined {
  if (config.mode === "production") {
    return { origin: config.origin, basePath: config.basePath };
  }
  return envUrlContext();
}

function routePath(route: SeoRoute): string {
  if (route === "home") return "/";
  if (route === "notFound") return "/";
  return `/${route}`;
}

const shareCard = {
  url: "/share-card.png",
  width: 1200,
  height: 630,
  alt: "SMC — Ambition compounds here",
} as const;

export function metadataBaseUrl(config: SiteConfig = site): URL {
  const ctx = urlContext(config);
  if (ctx) return new URL(`${joinPublicUrl(ctx.origin, ctx.basePath, "/")}/`);
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

export function pageMetadata(route: SeoRoute, config: SiteConfig = site): Metadata {
  const copy = routeSeo(config.recognitionState)[route];
  const ctx = urlContext(config);
  const canonical =
    route === "notFound" || !ctx ? undefined : joinPublicUrl(ctx.origin, ctx.basePath, routePath(route));
  const indexable = config.mode === "production" && route !== "notFound";

  return {
    title: copy.title,
    description: copy.description,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: copy.title,
      description: copy.description,
      siteName: config.displayName,
      type: "website",
      locale: "en_US",
      url: canonical,
      images: [shareCard],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [shareCard.url],
    },
  };
}

export function rootMetadata(config: SiteConfig = site): Metadata {
  const home = pageMetadata("home", config);
  return {
    ...home,
    metadataBase: metadataBaseUrl(config),
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export function sitemapEntries(config: SiteConfig = site): MetadataRoute.Sitemap {
  if (config.mode !== "production") return [];
  return INDEXABLE_PATHS.map((path) => ({
    url: joinPublicUrl(config.origin, config.basePath, path),
    changeFrequency: path === "/privacy" ? "yearly" : "weekly",
    priority: path === "/" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));
}

export function robotsSpec(config: SiteConfig = site): MetadataRoute.Robots {
  if (config.mode !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: joinPublicUrl(config.origin, config.basePath, "/sitemap.xml"),
  };
}

function eventStatusIri(status: SiteEvent["status"]): string {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  return "https://schema.org/EventScheduled";
}

export function organizationJsonLd(config: SiteConfig = site): Record<string, unknown> {
  const ctx = urlContext(config);
  const node: Record<string, unknown> = {
    "@type": "Organization",
    name: config.displayName,
    description: config.descriptor,
  };
  if (ctx) {
    node.url = joinPublicUrl(ctx.origin, ctx.basePath, "/");
    node.logo = joinPublicUrl(ctx.origin, ctx.basePath, "/mark.svg");
  }
  if (config.mode === "production" && isEmail(config.publicEmail)) {
    node.email = config.publicEmail;
  }
  const sameAs = [config.sammyUrl, config.discordUrl].filter(isHttpUrl);
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

export function eventJsonLd(
  event: SiteEvent,
  config: SiteConfig = site,
): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "Event",
    name: event.title,
    description: event.outcome,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventStatus: eventStatusIri(event.status),
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: config.displayName,
    },
  };
  if (isHttpUrl(event.href)) node.url = event.href;
  return node;
}

export function jsonLdDocument(
  config: SiteConfig = site,
  now = Date.now(),
): Record<string, unknown> {
  const organization = organizationJsonLd(config);
  const events = publicEvents(config, now).map((event) => eventJsonLd(event, config));
  if (!events.length) {
    return { "@context": "https://schema.org", ...organization };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [organization, ...events],
  };
}

export function assertPublicUrlJoin(): void {
  const cases: Array<[string, string, string, string]> = [
    ["https://smc.test", "/", "/", "https://smc.test"],
    ["https://smc.test", "/", "/join", "https://smc.test/join"],
    ["https://smc.test/", "/", "/privacy", "https://smc.test/privacy"],
    ["https://org.github.io", "/smc-website", "/", "https://org.github.io/smc-website"],
    ["https://org.github.io", "/smc-website", "/join", "https://org.github.io/smc-website/join"],
    ["https://org.github.io/", "/smc-website/", "/privacy", "https://org.github.io/smc-website/privacy"],
    ["https://org.github.io", "/smc-website", "/sitemap.xml", "https://org.github.io/smc-website/sitemap.xml"],
  ];
  for (const [origin, basePath, path, expected] of cases) {
    const got = joinPublicUrl(origin, basePath, path);
    if (got !== expected) {
      throw new Error(`joinPublicUrl(${origin}, ${basePath}, ${path}) => ${got}; expected ${expected}`);
    }
  }
}
