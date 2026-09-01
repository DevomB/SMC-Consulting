import { HeroPathways } from "@/components/home/hero-pathways";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { SiteView } from "@/lib/site";

export function Hero({ view }: { view: SiteView }) {
  return (
    <section className="hero surface-ink">
      <Container>
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow">{view.config.descriptor}</p>
            <h1>
              <span className="line">Ambition</span>
              <span className="line">compounds</span>
              <span className="line">here.</span>
            </h1>
            <p className="hero-body">{view.copy.body}</p>
            <div className="hero-actions">
              <Button {...view.primary} />
              <Button {...view.secondary} variant="ghost" />
            </div>
            <p className="hero-support">{view.copy.supporting}</p>
          </div>
          <HeroPathways />
        </div>
      </Container>
    </section>
  );
}
