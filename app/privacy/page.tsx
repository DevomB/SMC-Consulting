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
    <main id="content" className="privacy-article">
      <Container>
        <h1>{legalCopy.privacyTitle}</h1>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {site.privacyUpdatedOn ? (
          <p className="privacy-updated">Last updated {site.privacyUpdatedOn}.</p>
        ) : null}
      </Container>
    </main>
  );
}
