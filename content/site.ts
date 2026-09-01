import type { SiteConfig } from "@/lib/site-types";

/**
 * Single public content source. Officers update this file after
 * LAUNCH_INPUTS.md gates pass. Do not invent URLs, events, programs,
 * or recognition language.
 */
export const site: SiteConfig = {
  mode: "scaffold",
  displayName: "SMC",
  descriptor:
    "A student-led technical collective at San José State University",
  disclosure:
    "SMC is a student-led Recognized Student Organization at San José State University. Recognition does not imply university endorsement of every statement or activity on this site.",
  recognitionState: "recognized",
  events: [],
  projectApplications: { state: "unavailable" },
  programs: [],
  foundingCommunity: false,
  joinGovernanceConfirmed: false,
  privacyUpdatedOn: "September 1, 2026",
};

/** Footer year. Do not derive from Date.now() during render. */
export const copyrightYear = 2026;
