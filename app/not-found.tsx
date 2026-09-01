import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { homeCopy } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("notFound");

export default function NotFound() {
  return (
    <main id="content" className="utility-404">
      <Container>
        <p className="section-kicker">{homeCopy.notFoundEyebrow}</p>
        <h1>{homeCopy.notFoundHeadline}</h1>
        <p className="lede" style={{ margin: "1.25rem 0 1.75rem" }}>
          {homeCopy.notFoundBody}
        </p>
        <Button href="/" label={homeCopy.returnHome} />
      </Container>
    </main>
  );
}
