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
    "A technical community being built by San José State students",
  disclosure:
    "SMC is an independent student-led initiative being developed by San José State students. Its university recognition and public naming status have not been confirmed.",
  recognitionState: "unknown",
  events: [],
  projectApplications: { state: "unavailable" },
  programs: [],
  foundingCommunity: false,
  joinGovernanceConfirmed: false,
  privacyUpdatedOn: "September 1, 2026",
};

/** Footer year. Do not derive from Date.now() during render. */
export const copyrightYear = 2026;
