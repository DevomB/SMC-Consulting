import { Container } from "@/components/ui/container";
import type { SiteView } from "@/lib/site";

export function SiteFooter({ view }: { view: SiteView }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <p className="footer-brand">
              {view.config.displayName} · {view.config.descriptor}
            </p>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/join">Join</a>
              <a href="/contribute">Contribute</a>
              {view.sammyUrl ? (
                <a href={view.sammyUrl} target="_blank" rel="noopener noreferrer">
                  SJSU / Sammy
                </a>
              ) : null}
              {view.discordUrl ? (
                <a href={view.discordUrl} target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              ) : null}
              {view.contact ? <a href={view.contact}>Contact</a> : null}
              <a href="/privacy">Privacy</a>
            </div>
          </div>
          <p className="disclosure">{view.config.disclosure}</p>
        </div>
        <p style={{ margin: "1.5rem 0 0" }}>
          © {view.year} SMC · <a href="/privacy">Privacy</a>
          {view.contact ? (
            <>
              {" · "}
              <a href={view.contact}>Contact</a>
            </>
          ) : null}
        </p>
      </Container>
    </footer>
  );
}
