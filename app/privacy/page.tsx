import { Container } from "@/components/ui/container";
import { legalCopy, privacyParagraphs } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import "@/components/contact/contact.css";

export const metadata = pageMetadata("privacy");
export const dynamic = "force-static";

export default function PrivacyPage() {
  const paragraphs = privacyParagraphs(site);

  return (
    <main id="content">
      <section className="hero surface-ink page-hero">
        <Container>
          <div className="hero-grid">
            <div>
              <p className="hero-eyebrow">Privacy</p>
              <h1>{legalCopy.privacyTitle}</h1>
            </div>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="privacy-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {site.privacyUpdatedOn ? (
              <p className="privacy-updated">Last updated {site.privacyUpdatedOn}.</p>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
