import type { Cta, SiteConfig, SiteEvent } from "@/lib/site-types";

export function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isEmail(value: string | undefined): value is string {
  return Boolean(
    value &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
      !value.toLowerCase().endsWith("@example.com"),
  );
}

export function mailtoHref(email: string | undefined): string | undefined {
  return isEmail(email) ? `mailto:${email}` : undefined;
}

export function eventIsPast(event: SiteEvent, now: number): boolean {
  return Date.parse(event.endsAt) < now;
}

export function eventStartsWithinDays(
  event: SiteEvent,
  now: number,
  days: number,
): boolean {
  const start = Date.parse(event.startsAt);
  if (Number.isNaN(start) || start < now) return false;
  return start - now <= days * 24 * 60 * 60 * 1000;
}

export function publicEvents(config: SiteConfig, now = Date.now()): SiteEvent[] {
  return config.events.filter((event) => !eventIsPast(event, now)).slice(0, 3);
}

export function featuredEvent(
  config: SiteConfig,
  now = Date.now(),
): SiteEvent | undefined {
  const live = publicEvents(config, now);
  if (config.featuredEventId) {
    const match = live.find((event) => event.id === config.featuredEventId);
    if (match) return match;
  }
  return live[0];
}

export function announcementEvent(
  config: SiteConfig,
  now = Date.now(),
): SiteEvent | undefined {
  const featured = featuredEvent(config, now);
  if (!featured) return undefined;
  if (featured.status === "cancelled") return undefined;
  if (!eventStartsWithinDays(featured, now, 14)) return undefined;
  if (!featured.title || !featured.location) return undefined;
  return featured;
}

export function studentActionHref(
  config: SiteConfig,
  now = Date.now(),
): string | undefined {
  const featured = featuredEvent(config, now);
  if (
    featured &&
    featured.status === "scheduled" &&
    eventStartsWithinDays(featured, now, 14) &&
    isHttpUrl(featured.href)
  ) {
    return featured.href;
  }
  if (
    featured &&
    featured.status === "full" &&
    eventStartsWithinDays(featured, now, 14) &&
    isHttpUrl(featured.waitlistHref)
  ) {
    return featured.waitlistHref;
  }
  if (isHttpUrl(config.sammyUrl)) return config.sammyUrl;
  if (isHttpUrl(config.joinFormUrl)) return config.joinFormUrl;
  return undefined;
}

export function contributorActionHref(config: SiteConfig): string | undefined {
  if (isHttpUrl(config.contributeFormUrl)) return config.contributeFormUrl;
  if (isEmail(config.publicEmail)) return `mailto:${config.publicEmail}`;
  return undefined;
}

const TIME_ZONE = "America/Los_Angeles";

export function weekdayMonthDayYear(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function timeRangePt(startsAt: string, endsAt: string): string {
  const clock = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    }).format(new Date(iso));
  return `${clock(startsAt)}–${clock(endsAt)} PT`;
}

export function derivePrimaryCta(config: SiteConfig, now = Date.now()): Cta {
  const featured = featuredEvent(config, now);

  if (
    featured &&
    featured.status === "scheduled" &&
    eventStartsWithinDays(featured, now, 14) &&
    isHttpUrl(featured.href)
  ) {
    return {
      label: `Attend ${featured.shortTitle}`,
      href: featured.href,
      external: true,
    };
  }

  if (
    featured &&
    featured.status === "full" &&
    eventStartsWithinDays(featured, now, 14) &&
    isHttpUrl(featured.waitlistHref)
  ) {
    return {
      label: "Join the waitlist",
      href: featured.waitlistHref,
      external: true,
    };
  }

  if (config.projectApplications.state === "open" && isHttpUrl(config.projectApplications.href)) {
    const eventTakesPrecedence = Boolean(
      featured &&
        featured.status === "scheduled" &&
        eventStartsWithinDays(featured, now, 14) &&
        isHttpUrl(featured.href),
    );
    if (!eventTakesPrecedence) {
      return {
        label: "Apply to the project cohort",
        href: config.projectApplications.href,
        external: true,
      };
    }
  }

  if (isHttpUrl(config.sammyUrl)) {
    return { label: "Join the community", href: config.sammyUrl, external: true };
  }
  if (isHttpUrl(config.joinFormUrl)) {
    return { label: "Join the community", href: config.joinFormUrl, external: true };
  }
  return { label: "Join the community", href: "/join" };
}

export function deriveSecondaryCta(config: SiteConfig, now = Date.now()): Cta {
  const featured = featuredEvent(config, now);
  const eventEligible = Boolean(
    featured &&
      featured.status === "scheduled" &&
      eventStartsWithinDays(featured, now, 14) &&
      isHttpUrl(featured.href),
  );

  if (config.projectApplications.state === "open" && eventEligible) {
    return {
      label: "Apply to the project cohort",
      href: config.projectApplications.href,
      external: true,
    };
  }

  return { label: "How SMC works", href: "/#how" };
}

export function eventAction(event: SiteEvent): Cta | { label: string; href?: undefined } {
  if (event.status === "cancelled") return { label: "Cancelled" };
  if (event.status === "full") {
    if (isHttpUrl(event.waitlistHref)) {
      return { label: "Join the waitlist", href: event.waitlistHref, external: true };
    }
    return { label: "Full" };
  }
  if (isHttpUrl(event.href)) {
    return { label: "View and RSVP on Sammy", href: event.href, external: true };
  }
  return { label: "Confirmed" };
}

export function finalPrimaryCta(config: SiteConfig, now = Date.now()): Cta {
  const primary = derivePrimaryCta(config, now);
  const featured = featuredEvent(config, now);
  if (
    featured &&
    featured.status === "scheduled" &&
    eventStartsWithinDays(featured, now, 14) &&
    isHttpUrl(featured.href)
  ) {
    return { ...primary, label: "Attend the next session" };
  }
  return { label: "Join SMC", href: "/join" };
}

export function validateSite(config: SiteConfig): void {
  if (config.mode === "scaffold") {
    if (!isHttpUrl(config.sammyUrl)) {
      console.warn("[SMC scaffold] Sammy URL unset; Sammy controls are omitted.");
    }
    if (!isEmail(config.publicEmail)) {
      console.warn("[SMC scaffold] Public email unset; contributor contact omitted.");
    }
    return;
  }

  const errors: string[] = [];
  if (!config.affiliationLanguageApproved) {
    errors.push("Affiliation language is not marked approved.");
  }
  if (!isEmail(config.publicEmail)) errors.push("Role-based public email is required.");
  if (!isHttpUrl(config.sammyUrl)) errors.push("Verified Sammy URL is required.");
  if (!isHttpUrl(config.origin)) errors.push("Production origin is required.");
  if (!studentActionHref(config)) {
    errors.push("Need a student action: event RSVP, Sammy join, or interest form.");
  }
  if (!contributorActionHref(config)) {
    errors.push("Need a contributor path: public email or inquiry form.");
  }
  if (errors.length) {
    throw new Error(
      `Production launch blocked until LAUNCH_INPUTS.md gates pass:\n${errors
        .map((item) => `  - ${item}`)
        .join("\n")}`,
    );
  }
}

export function externalRel(external?: boolean) {
  return external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}
