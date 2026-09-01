import type { RecognitionState } from "@/lib/site-types";

export type SeoRoute = "home" | "join" | "contribute" | "privacy" | "notFound";

export type RouteSeo = {
  title: string;
  description: string;
};

const recognizedHomeDescription =
  "An SJSU student-led technical collective for building skills, projects, and lasting relationships across software, AI/ML, quantitative finance, and applied mathematics.";

const previewHomeDescription =
  "A technical community being built by San José State students around serious work in software, AI/ML, quantitative finance, and applied mathematics.";

export function homeDescription(state: RecognitionState): string {
  return state === "recognized" ? recognizedHomeDescription : previewHomeDescription;
}

export function routeSeo(state: RecognitionState): Record<SeoRoute, RouteSeo> {
  return {
    home: {
      title: "SMC — Ambition compounds here",
      description: homeDescription(state),
    },
    join: {
      title: "Join SMC — Start by showing up",
      description:
        "See the next confirmed way to enter SMC, understand how community membership differs from project roles, and choose a concrete first step.",
    },
    contribute: {
      title: "Contribute to SMC — Share useful experience",
      description:
        "Lead a focused session, review student work, hold office hours, or propose a scoped problem for SMC students.",
    },
    privacy: {
      title: "Privacy — SMC",
      description:
        "What the SMC website collects, why, who can access it, and how to request deletion.",
    },
    notFound: {
      title: "Page not found — SMC",
      description:
        "The page may have moved, or the work may not exist yet. Return to SMC and use a confirmed path forward.",
    },
  };
}
