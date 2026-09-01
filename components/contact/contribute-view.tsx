import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { contactCopy } from "@/content/contact";
import type { SiteView } from "@/lib/site";
import { isHttpUrl } from "@/lib/utils";
import "./contact.css";

export function ContributeView({ view }: { view: SiteView }) {
  const externalForm = isHttpUrl(view.config.contributeFormUrl)
    ? view.config.contributeFormUrl
    : undefined;

  return (
    <main id="content">
      <section className="hero surface-ink page-hero">
        <Container>
          <div className="hero-grid">
            <div>
              <p className="hero-eyebrow">{contactCopy.contributeEyebrow}</p>
              <h1>{contactCopy.contributeHeadline}</h1>
              <p className="hero-body">{contactCopy.contributePurpose}</p>
              <div className="hero-actions">
                {externalForm ? (
                  <Button href={externalForm} label={contactCopy.startConversation} external />
                ) : view.contact ? (
                  <Button href={view.contact} label={contactCopy.startConversation} />
                ) : (
                  <Button href="/join" label="See how students enter" variant="ghost" />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section kicker="Ways to help">
        <ul className="contribute-options contribute-stack">
          {contactCopy.options.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section kicker={contactCopy.timeTitle}>
        <ul className="time-list">
          {contactCopy.timeCommitments.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              {item.body}
            </li>
          ))}
        </ul>
      </Section>

      <Section kicker={contactCopy.handlesTitle}>
        <p className="lede page-block">{contactCopy.smcHandles}</p>
      </Section>

      <Section kicker={contactCopy.expectContributeTitle}>
        <p className="lede page-block">{contactCopy.expectations}</p>
      </Section>

      <Section id="contact" kicker={contactCopy.contactTitle}>
        {externalForm ? (
          <>
            <p className="lede page-block">{contactCopy.formIntro}</p>
            <div style={{ marginTop: "1.25rem" }}>
              <Button href={externalForm} label={contactCopy.startConversation} external />
            </div>
          </>
        ) : view.contact ? (
          <>
            <p className="lede page-block">{contactCopy.formIntro}</p>
            <div style={{ marginTop: "1.25rem" }}>
              <Button href={view.contact} label={contactCopy.startConversation} />
            </div>
          </>
        ) : (
          <p className="lede">{contactCopy.unavailable}</p>
        )}
      </Section>
    </main>
  );
}
