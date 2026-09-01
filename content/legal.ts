import { isEmail } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-types";

export const legalCopy = {
  privacyTitle: "Privacy, plainly.",
  metaTitle: "Privacy — SMC",
  metaDescription:
    "What the SMC website collects, why, who can access it, and how to request deletion.",
  records:
    "Private executive assignments, access records, applications, and outreach contacts are not published through this website.",
} as const;

function mailParagraph(config: SiteConfig): string {
  if (isEmail(config.publicEmail)) {
    return `If you email SMC at ${config.publicEmail}, the message and information you choose to include are received by the officers who manage the public organization inbox. Do not send sensitive personal information. To ask about or delete a message, contact ${config.publicEmail}.`;
  }
  return "A public organization email is not listed on this preview. Do not send sensitive personal information to unofficial addresses.";
}

export function privacyParagraphs(config: SiteConfig): string[] {
  const mail = mailParagraph(config);
  const noCollection =
    config.mode === "production"
      ? "This website does not accept on-site form submissions, set advertising cookies, run analytics, or create member accounts. It contains links to external services such as Sammy or Discord only when those links are approved; those services apply their own privacy practices after you leave this site."
      : "This preview does not accept form submissions, set advertising cookies, run analytics, or create member accounts. It contains links to external services such as Sammy or Discord only when those links are approved; those services apply their own privacy practices after you leave this site.";

  return [noCollection, mail, legalCopy.records];
}
