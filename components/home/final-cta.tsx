import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";

export function FinalCta({ view }: { view: SiteView }) {
  return (
    <section className="section final-cta surface-ink">
      <Container>
        <h2 className="section-title">{homeCopy.closeHeadline}</h2>
        <p className="lede">{homeCopy.closeBody}</p>
        <div className="hero-actions" style={{ marginTop: "1.75rem" }}>
          <Button {...view.finalPrimary} />
          <Button href="/contribute" label="Contribute as an alum or practitioner" variant="ghost" />
        </div>
      </Container>
    </section>
  );
}
