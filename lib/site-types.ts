export type RecognitionState = "unknown" | "pending" | "recognized" | "inactive";

export type ProjectApplications =
  | { state: "unavailable" }
  | { state: "planned"; target: string }
  | {
      state: "open";
      deadline: string;
      href: string;
      criteriaHref: string;
      responseBy: string;
    }
  | { state: "closed"; interestHref?: string };

export type EventStatus = "scheduled" | "full" | "cancelled";

export type SiteEvent = {
  id: string;
  title: string;
  shortTitle: string;
  startsAt: string;
  endsAt: string;
  location: string;
  audience: string;
  outcome: string;
  bring?: string;
  href: string;
  status: EventStatus;
  waitlistHref?: string;
  accessibilityNote: string;
  publicContact: string;
  contentOwnerRole: string;
  lastVerifiedAt: string;
};

export type Program = {
  name: string;
  description: string;
  state: "active" | "planned";
  ownerRole: string;
  timeline: string;
  nextOccurrence?: string;
  href?: string;
};

export type BaseSiteConfig = {
  displayName: string;
  expandedName?: string;
  descriptor: string;
  disclosure: string;
  recognitionState: RecognitionState;
  events: SiteEvent[];
  featuredEventId?: string;
  projectApplications: ProjectApplications;
  programs: Program[];
  sessionCadence?: string;
  foundingCommunity: boolean;
  privacyUpdatedOn: string;
  joinGovernanceConfirmed: boolean;
};

export type ScaffoldSiteConfig = BaseSiteConfig & {
  mode: "scaffold";
  publicEmail?: string;
  sammyUrl?: string;
  discordUrl?: string;
  joinFormUrl?: string;
  contributeFormUrl?: string;
};

export type ProductionSiteConfig = BaseSiteConfig & {
  mode: "production";
  affiliationLanguageApproved: true;
  publicEmail: string;
  sammyUrl: string;
  discordUrl?: string;
  joinFormUrl?: string;
  contributeFormUrl?: string;
  origin: string;
  basePath: string;
};

export type SiteConfig = ScaffoldSiteConfig | ProductionSiteConfig;

export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = { href: string; label: string };
