import type { RecognitionState, SiteConfig } from "@/lib/site-types";

export const homeCopy = {
  eyebrow: "A student-led technical collective at San José State University",
  headline: "Ambition compounds here.",
  body: "SMC brings driven students together to solve hard problems, build work worth showing, and help one another pursue careers in software, machine learning, quantitative finance, and beyond.",
  supporting: "Rooted in mathematics. Open to serious builders across disciplines.",
  howWorks: "How SMC works",
  whyKicker: "Why SMC",
  whyHeadline: "Talent is already here. Density is missing.",
  whyBody: [
    "At a university this large, ambitious students can spend years without finding one another. SMC makes those collisions deliberate. We create repeated opportunities to work together, exchange honest feedback, and become known for following through.",
    "The network is not the prize handed out at the door. It is what members build through useful work and earned trust.",
  ],
  loopKicker: "How it compounds",
  loopIntro:
    "Opportunity becomes durable when it moves through a community instead of stopping with one person.",
  loop: [
    { title: "Show up", body: "Enter through an open session, workshop, or event." },
    {
      title: "Contribute",
      body: "Solve a problem, teach a concept, review a draft, or help run the room.",
    },
    {
      title: "Build proof",
      body: "Produce code, analysis, research, demos, and technical writing that others can inspect.",
    },
    {
      title: "Earn trust",
      body: "Become known for judgment, generosity, and follow-through.",
    },
    {
      title: "Compound",
      body: "Share what you learned and create the next useful opening for someone else.",
    },
  ],
  programsKicker: "What happens here",
  programsHeadline: "Serious practice. Visible output. Useful relationships.",
  focusKicker: "Focus areas",
  focusHeadline: "Different paths. Shared rigor.",
  focusIntro:
    "Members can work across areas. Applied mathematics provides a common language for reasoning precisely about systems, data, and uncertainty.",
  focus: [
    {
      name: "Software",
      body: "Algorithms, systems, product engineering, architecture, performance, and the technical judgment behind reliable software.",
    },
    {
      name: "AI & Machine Learning",
      body: "Modeling, experimentation, data, evaluation, research literacy, and responsible applied systems.",
    },
    {
      name: "Quantitative Finance",
      body: "Probability, statistics, optimization, markets, and disciplined research under uncertainty.",
    },
    {
      name: "Applied Mathematics",
      body: "The structures and habits of thought that connect all three: abstraction, proof, modeling, and precise communication.",
    },
  ],
  earlyKicker: "Help shape what comes next",
  earlyHeadline: "Help set the standard.",
  earlyBody: [
    "SMC is building its next chapter. Students who contribute now can help establish the working rhythm, shape the first project cycle, and create systems future members inherit.",
    "This is the moment for people who would rather help build an excellent room than wait for someone else to invite them into one.",
  ],
  foundingLead: "We are building SMC's founding community now.",
  earlyCta: "Start by showing up",
  eventsKicker: "Upcoming",
  eventsHeadline: "Enter through the next session.",
  eventsEmpty:
    "The next session is being scheduled. A confirmed date, time, and room will appear here once officers publish it.",
  cultureKicker: "The standard",
  cultureHeadline: "High standards. Low ego.",
  cultureIntro:
    "SMC should feel demanding because the work matters, and welcoming because nobody arrives finished.",
  principles: [
    { title: "Arrive curious.", body: "You do not need a polished résumé to enter." },
    { title: "Follow through.", body: "Reliability is the foundation of trust." },
    { title: "Make work visible.", body: "Share code, reasoning, drafts, and lessons." },
    { title: "Give more than status.", body: "Teach, introduce, review, and document." },
    { title: "Bring others forward.", body: "A network compounds when its benefits circulate." },
  ],
  culturePull: "Curiosity gets you in the room. Contribution earns responsibility.",
  joinKicker: "Join SMC",
  joinHeadline: "Start by showing up.",
  joinOpen:
    "SMC community membership is open to SJSU students. You do not need the right major, a famous internship, or a finished portfolio. Bring curiosity, follow-through, and a willingness to make the room better.",
  joinNeutral:
    "SMC is being built for students who want to learn, contribute, and make the room better. Membership and project-role details will be published after the organization's current governance is confirmed.",
  joinAttend:
    "The fastest way to understand SMC is to enter a working session. See the format, meet members, and contribute to something concrete.",
  joinCommunity:
    "Join SMC on Sammy for official campus updates and enter Discord for discussion, resources, and working groups.",
  joinBuild:
    "When a project cycle opens, express interest in a specific role. Teams are capacity-limited and selected using published, role-relevant criteria.",
  projectRolesClosed: "Project roles are not open yet",
  contributeKicker: "Contribute",
  contributeHeadline: "Teach what you know. Review a project. Open one useful door.",
  contributeBody:
    "Alumni and practitioners can help without taking on an indefinite commitment. Lead a focused session, review a team's work, hold office hours, or bring us a well-scoped problem.",
  contributeOptions: [
    { title: "Lead a session", body: "Teach one method, problem, or lesson you know deeply." },
    { title: "Hold office hours", body: "Meet a small group for candid questions about a role or field." },
    { title: "Review work", body: "Give a project team direct feedback on code, analysis, or reasoning." },
    { title: "Mentor a team", body: "Join a time-bounded project cycle at a defined cadence." },
    { title: "Bring a problem", body: "Share a non-confidential, well-scoped question students can investigate." },
  ],
  exploreContribute: "Explore ways to contribute",
  closeHeadline: "Find your people. Raise the standard together.",
  closeBody: "Start with one session. Bring a real question and a willingness to contribute.",
  notFoundEyebrow: "404",
  notFoundHeadline: "This path does not lead anywhere yet.",
  notFoundBody:
    "The page may have moved, or the work may not exist yet. Return to SMC and use a confirmed path forward.",
  returnHome: "Return home",
  metadata: {
    title: "SMC — Ambition compounds here",
    description:
      "An SJSU student-led technical collective for building skills, projects, and lasting relationships across software, AI/ML, quantitative finance, and applied mathematics.",
  },
} as const;

export function joinMembershipCopy(config: SiteConfig): string {
  return config.joinGovernanceConfirmed ? homeCopy.joinOpen : homeCopy.joinNeutral;
}

export function affiliationAnswer(state: RecognitionState): string {
  switch (state) {
    case "recognized":
      return "SMC is a student-led Recognized Student Organization at San José State University. Recognition does not imply university endorsement of every statement or activity on this site.";
    case "pending":
      return "SMC is a student-led initiative created by San José State students, with recognition details under review. It is not represented here as a currently recognized university organization.";
    case "inactive":
      return "SMC is not currently represented as an active Recognized Student Organization. Public campus-affiliation claims and activities remain paused pending guidance.";
    default:
      return "SMC is being developed by San José State students. Its current recognition and approved public naming status have not yet been confirmed.";
  }
}

export function faqItems(config: SiteConfig) {
  const who = config.joinGovernanceConfirmed
    ? "SMC community membership is open to SJSU students. Our work is designed for people who are curious, willing to participate, and serious about following through. Some project roles have limited capacity and use published, role-relevant criteria. Officer roles follow the approved constitution."
    : "SMC's current membership and governance details are being confirmed. No general-membership application or rejection process will be published until that work is complete.";

  const when = config.sessionCadence
    ? `Sessions run ${config.sessionCadence}. Check Sammy before attending for the current time and room.`
    : "The next schedule is being confirmed. Join SMC on Sammy or Discord for the verified announcement.";

  return [
    { question: "Who can join?", answer: who },
    {
      question: "Do I need to be a math major?",
      answer:
        "No. SMC is rooted in mathematics, but the community is interdisciplinary. Students interested in software, AI/ML, statistics, engineering, economics, finance, research, and adjacent fields are welcome.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "Not to attend or join the community. Beginners should arrive ready to learn and contribute. Advanced project roles may require specific skills, but each opening should explain what is required and how to demonstrate readiness.",
    },
    {
      question: "Is SMC a consulting club?",
      answer:
        "Not currently. SMC is a technical community and project environment. We may eventually operate a supervised project studio for external partners, but we will not call outreach, workshops, or networking “consulting.”",
    },
    {
      question: "How do project teams work?",
      answer:
        "SMC Lab is a proposed series of small, time-bounded teams working toward public artifacts such as code, models, research, demos, or technical writing. Team places are limited by project scope and selected with transparent criteria. Active cycles and requirements will be published when confirmed.",
    },
    {
      question: "Does joining guarantee referrals, interviews, or jobs?",
      answer:
        "No. SMC cannot guarantee an outcome or access to any employer. It helps members improve their skills, produce credible evidence, understand career paths, and earn relationships through useful work.",
    },
    { question: "When does SMC meet?", answer: when },
    {
      question: "How can alumni or professionals participate?",
      answer:
        "Lead a focused session, hold office hours, review a project, mentor a small team, or share a scoped non-confidential problem. Use the Contribute section to propose the smallest useful contribution.",
    },
    {
      question: "Is SMC officially affiliated with SJSU?",
      answer: affiliationAnswer(config.recognitionState),
    },
  ];
}
