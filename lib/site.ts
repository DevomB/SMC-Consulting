import { cache } from "react";
import "server-only";
import { faqItems, homeCopy, joinMembershipCopy } from "@/content/home";
import { copyrightYear, site } from "@/content/site";
import type { Cta, NavItem, SiteConfig } from "@/lib/site-types";
import {
  announcementEvent,
  contributorActionHref,
  derivePrimaryCta,
  deriveSecondaryCta,
  eventAction,
  featuredEvent,
  finalPrimaryCta,
  isHttpUrl,
  mailtoHref,
  publicEvents,
  studentActionHref,
  timeRangePt,
  weekdayMonthDayYear,
} from "@/lib/utils";

export function navItems(_config: SiteConfig): NavItem[] {
  return [
    { href: "/", label: "Home" },
    { href: "/contribute", label: "Contribute" },
    { href: "/privacy", label: "Privacy" },
  ];
}

const requestNow = cache(() => Date.now());

export function buildView(config: SiteConfig = site, now = requestNow()) {
  const announcement = announcementEvent(config, now);
  const contributeHref = contributorActionHref(config);
  const contributeCta: Cta | undefined = contributeHref
    ? { label: "Start a conversation", href: contributeHref, external: true }
    : undefined;

  const truthItems: string[] = [];
  if (config.sessionCadence) truthItems.push(`Working sessions ${config.sessionCadence}`);
  truthItems.push("Software · AI/ML · Quant");
  if (config.mode === "production") truthItems.push(config.descriptor);

  return {
    config,
    copy: homeCopy,
    primary: derivePrimaryCta(config, now),
    secondary: deriveSecondaryCta(config, now),
    finalPrimary: finalPrimaryCta(config, now),
    contributeCta,
    joinMembership: joinMembershipCopy(config),
    faq: faqItems(config),
    events: publicEvents(config, now).map((event) => ({
      event,
      action: eventAction(event),
      when: weekdayMonthDayYear(event.startsAt),
      time: timeRangePt(event.startsAt, event.endsAt),
    })),
    featured: featuredEvent(config, now),
    announcement,
    announcementText: announcement
      ? `Next: ${announcement.title} · ${weekdayMonthDayYear(announcement.startsAt)} · ${timeRangePt(announcement.startsAt, announcement.endsAt)} · ${announcement.location}`
      : undefined,
    programs: config.programs,
    nav: navItems(config),
    sammyUrl: isHttpUrl(config.sammyUrl) ? config.sammyUrl : undefined,
    discordUrl: isHttpUrl(config.discordUrl) ? config.discordUrl : undefined,
    contact: mailtoHref(config.publicEmail),
    studentHref: studentActionHref(config, now),
    year: copyrightYear,
    noindex: config.mode !== "production",
    truthItems: config.sessionCadence || config.mode === "production" ? truthItems : ["Software · AI/ML · Quant"],
    applications: config.projectApplications,
  };
}

export type SiteView = ReturnType<typeof buildView>;
