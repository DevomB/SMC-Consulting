import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";
import { isHttpUrl } from "@/lib/utils";

export const contactCopy = {
  joinEyebrow: "Join SMC",
  joinHeadline: "Start by showing up.",
  contributeEyebrow: "For alumni and practitioners",
  contributeHeadline: "A useful hour can change a student's trajectory.",
  contributePurpose:
    "SMC creates focused ways for experienced people to share technical judgment, career context, and honest feedback with ambitious SJSU students.",
  startConversation: "Start a conversation",
  attendPathTitle: "Attend",
  communityPathTitle: "Join the community",
  buildPathTitle: "Build",
  attendCta: "See the next session",
  attendSessionCta: "Attend the next session",
  sammyCta: "Join on Sammy",
  discordCta: "Enter Discord",
  openRolesCta: "View open project roles",
  expectTitle: "What to expect",
  responsibilityTitle: "How responsibility is earned",
  projectTitle: "Project selection",
  contactTitle: "A public contact path",
  timeTitle: "Example time commitments",
  handlesTitle: "What SMC handles",
  expectContributeTitle: "What this is not",
  formIntro:
    "Tell us the smallest useful way you would like to contribute.",
  unavailable:
    "A public contact path will appear here once officers publish a role-based email or an approved inquiry form.",
  options: [
    {
      title: "Lead a session",
      body: "Teach one method, problem, or lesson you know deeply. A focused 30–45 minute session plus discussion is more useful than a broad motivational talk.",
    },
    {
      title: "Hold office hours",
      body: "Meet a small group for candid questions about a role, field, hiring process, or transition you have experienced.",
    },
    {
      title: "Review work",
      body: "Give a project team direct feedback on its code, analysis, research, presentation, or technical reasoning.",
    },
    {
      title: "Mentor a team",
      body: "Join a time-bounded project cycle at a defined cadence. SMC handles scheduling, preparation, and follow-up.",
    },
    {
      title: "Bring a problem",
      body: "Share a non-confidential, well-scoped question that students could investigate and turn into a useful artifact.",
    },
  ],
  timeCommitments: [
    { title: "Focused session", body: "30–45 minutes plus 15–20 minutes of student questions." },
    { title: "Office hours", body: "one 45-minute small-group conversation." },
    { title: "Project review", body: "30 minutes after reviewing a short artifact in advance." },
    { title: "Team mentorship", body: "one agreed check-in cadence for a defined project cycle." },
  ],
  smcHandles:
    "SMC prepares the students, confirms the format, manages scheduling and the room, facilitates the conversation, gathers permissions, and follows up. A contributor should know the exact audience, time commitment, and public-attribution boundary before agreeing.",
  expectations:
    "An introduction or inquiry does not create a partnership, endorsement, recruiting relationship, or consulting engagement. SMC will agree on scope, timing, attribution, confidentiality, and publication before representing any collaboration publicly.",
  expectBody:
    "A typical session combines a focused topic with active work. You may solve a problem, critique an approach, build part of a project, or hear an honest account of a technical career. Come prepared to participate rather than collect attendance.",
  expectPrepare:
    "Bring a laptop when the event calls for one, one question you genuinely care about, and enough time to participate through the end.",
  expectConduct:
    "Debate ideas directly and treat people with respect. Harassment, discrimination, résumé shaming, confidential-material sharing, and using the community for unsolicited recruiting are not acceptable.",
  expectHelp:
    "Right now, SMC especially needs people willing to host a working session, help scope the first project cycle, document resources, or make new attendees feel included.",
  responsibility: [
    "Attend an open session.",
    "Return and contribute.",
    "Take ownership of a bounded task.",
    "Share the result and what you learned.",
    "Apply that record to limited project or operational responsibilities.",
  ],
  referralNote:
    "Referrals can introduce someone to SMC. They cannot replace contribution or bypass published criteria.",
  officerNote:
    "Officer roles are elected or appointed under the approved constitution. Participation does not bypass those rules.",
  projectSelection:
    "Project roles are limited by team capacity and the work a project requires. Selection may consider relevant readiness, demonstrated initiative, collaboration, availability, and follow-through. It does not determine who is allowed to belong to the SMC community.",
} as const;

export function cadenceLine(cadence: string | undefined): string | undefined {
  if (!cadence) return undefined;
  return `Sessions run ${cadence}. Check Sammy before attending for the current time and room.`;
}

export function nextSessionEmpty(view: SiteView): string {
  if (view.sammyUrl && view.discordUrl) {
    return "The next session is being scheduled. Join SMC on Sammy or Discord to get the announcement first.";
  }
  if (view.sammyUrl) {
    return "The next session is being scheduled. Join SMC on Sammy to get the announcement first.";
  }
  if (view.discordUrl) {
    return "The next session is being scheduled. Join SMC on Discord to get the announcement first.";
  }
  return homeCopy.eventsEmpty;
}

export function joinPrimary(view: SiteView) {
  const featured = view.featured;
  if (featured && featured.status === "scheduled" && isHttpUrl(featured.href)) {
    return { label: contactCopy.attendSessionCta, href: featured.href, external: true as const };
  }
  if (featured && featured.status === "full" && isHttpUrl(featured.waitlistHref)) {
    return { label: "Join the waitlist", href: featured.waitlistHref, external: true as const };
  }
  if (view.sammyUrl) {
    return { label: contactCopy.sammyCta, href: view.sammyUrl, external: true as const };
  }
  if (isHttpUrl(view.config.joinFormUrl)) {
    return { label: "Join the community", href: view.config.joinFormUrl, external: true as const };
  }
  return { label: contactCopy.attendCta, href: "/#events" };
}
