import { FaqList } from "@/components/home/faq-list";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  cadenceLine,
  contactCopy,
  joinPrimary,
  nextSessionEmpty,
} from "@/content/contact";
import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";
import { eventAction, isHttpUrl, timeRangePt, weekdayMonthDayYear } from "@/lib/utils";
import "./contact.css";

export function JoinView({ view }: { view: SiteView }) {
  const primary = joinPrimary(view);
  const featured = view.featured;
  const cadence = cadenceLine(view.config.sessionCadence);
  const attendHref =
    featured && featured.status === "scheduled" && isHttpUrl(featured.href)
      ? { href: featured.href, external: true as const }
      : featured && featured.status === "full" && isHttpUrl(featured.waitlistHref)
        ? { href: featured.waitlistHref, external: true as const }
        : { href: "/#events" as const, external: false as const };

  return (
    <main id="content">
      <section className="hero surface-ink page-hero">
        <Container>
          <div className="hero-grid">
            <div>
              <p className="hero-eyebrow">{contactCopy.joinEyebrow}</p>
              <h1>{contactCopy.joinHeadline}</h1>
              <p className="hero-body">{view.joinMembership}</p>
              <div className="hero-actions">
                <Button {...primary} />
                {view.sammyUrl && primary.href !== view.sammyUrl ? (
                  <Button href={view.sammyUrl} label={contactCopy.sammyCta} external variant="ghost" />
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section kicker="Choose a first step" title="Attend, join, or wait for a project role.">
        <div className="join-paths">
          <article>
            <h3>{contactCopy.attendPathTitle}</h3>
            <p>{homeCopy.joinAttend}</p>
            <div className="path-actions">
              <Button
                href={attendHref.href}
                label={contactCopy.attendCta}
                external={attendHref.external}
                variant="ghost-light"
              />
            </div>
          </article>
          <article>
            <h3>{contactCopy.communityPathTitle}</h3>
            <p>{homeCopy.joinCommunity}</p>
            <div className="path-actions">
              {view.sammyUrl ? (
                <Button href={view.sammyUrl} label={contactCopy.sammyCta} external variant="ghost-light" />
              ) : null}
              {view.discordUrl ? (
                <Button href={view.discordUrl} label={contactCopy.discordCta} external variant="ghost-light" />
              ) : null}
              {!view.sammyUrl && !view.discordUrl ? (
                <p className="muted-note">Sammy and Discord links will appear here once officers publish them.</p>
              ) : null}
            </div>
          </article>
          <article>
            <h3>{contactCopy.buildPathTitle}</h3>
            <p>{homeCopy.joinBuild}</p>
            {view.applications.state === "open" && isHttpUrl(view.applications.href) ? (
              <div className="path-actions">
                <Button href={view.applications.href} label={contactCopy.openRolesCta} external variant="ghost-light" />
                {isHttpUrl(view.applications.criteriaHref) ? (
                  <Button href={view.applications.criteriaHref} label="See selection criteria" external variant="ghost-light" />
                ) : null}
              </div>
            ) : (
              <p className="muted-note">{homeCopy.projectRolesClosed}</p>
            )}
          </article>
        </div>
      </Section>

      <Section id="next-session" kicker="Current session" title={homeCopy.eventsHeadline}>
        {featured ? (
          <article className="event-card">
            {featured.status === "cancelled" ? <p className="status-pill">Cancelled</p> : null}
            <h3>{featured.title}</h3>
            <p>{featured.outcome}</p>
            <dl className="event-meta">
              <div>
                <dt>Date</dt>
                <dd>{weekdayMonthDayYear(featured.startsAt)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{timeRangePt(featured.startsAt, featured.endsAt)}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{featured.location}</dd>
              </div>
              <div>
                <dt>For</dt>
                <dd>{featured.audience}</dd>
              </div>
              {featured.bring ? (
                <div>
                  <dt>Bring</dt>
                  <dd>{featured.bring}</dd>
                </div>
              ) : null}
            </dl>
            <p className="muted-note">{featured.accessibilityNote}</p>
            {(() => {
              const action = eventAction(featured);
              return "href" in action && action.href ? (
                <Button label={action.label} href={action.href} external={action.external} />
              ) : (
                <p className="muted-note">{action.label}</p>
              );
            })()}
          </article>
        ) : (
          <p className="lede">{nextSessionEmpty(view)}</p>
        )}
      </Section>

      <Section kicker={contactCopy.expectTitle}>
        <div className="page-block">
          <p className="lede">{contactCopy.expectBody}</p>
          {cadence ? <p className="lede">{cadence}</p> : null}
          <p className="lede">{contactCopy.expectPrepare}</p>
          <p className="lede">{contactCopy.expectConduct}</p>
          <p className="lede">{contactCopy.expectHelp}</p>
        </div>
      </Section>

      <Section kicker={contactCopy.responsibilityTitle}>
        <ol className="step-list">
          {contactCopy.responsibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <div className="page-block" style={{ marginTop: "1.5rem" }}>
          <p className="lede">{contactCopy.referralNote}</p>
          <p className="lede">{contactCopy.officerNote}</p>
        </div>
      </Section>

      <Section kicker={contactCopy.projectTitle}>
        <p className="lede page-block">{contactCopy.projectSelection}</p>
      </Section>

      <FaqList items={view.faq} />
    </main>
  );
}
