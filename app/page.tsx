import { ContributeInvite } from "@/components/home/contribute-invite";
import { CultureJoin } from "@/components/home/culture-join";
import { EarlyInvitation } from "@/components/home/early-invitation";
import { EventsSection } from "@/components/home/events-section";
import { EvidenceStrip } from "@/components/home/evidence-strip";
import { FaqList } from "@/components/home/faq-list";
import { FinalCta } from "@/components/home/final-cta";
import { FocusMatrix } from "@/components/home/focus-matrix";
import { Hero } from "@/components/home/hero";
import { ProgramList } from "@/components/home/program-list";
import { ValueLoop } from "@/components/home/value-loop";
import { WhySmc } from "@/components/home/why-smc";
import { pageMetadata } from "@/lib/seo";
import { buildView } from "@/lib/site";

export const metadata = pageMetadata("home");

export default function HomePage() {
  const view = buildView();

  return (
    <main id="content">
      <Hero view={view} />
      <EvidenceStrip items={view.truthItems} />
      <WhySmc />
      <ValueLoop />
      <FocusMatrix />
      <ProgramList programs={view.programs} />
      <EarlyInvitation founding={view.config.foundingCommunity} />
      <EventsSection view={view} />
      <CultureJoin view={view} />
      <ContributeInvite view={view} />
      <FaqList items={view.faq} />
      <FinalCta view={view} />
    </main>
  );
}
