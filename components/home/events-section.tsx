import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";

export function EventsSection({ view }: { view: SiteView }) {
  return (
    <Section id="events" index="05" kicker={homeCopy.eventsKicker} title={homeCopy.eventsHeadline}>
      {view.events.length === 0 ? (
        <p className="lede">{homeCopy.eventsEmpty}</p>
      ) : (
        <div className="event-panel">
          {view.events.map(({ event, action, when, time }) => (
            <article className="event-card" key={event.id}>
              {event.status === "cancelled" ? (
                <p className="status-pill">Cancelled</p>
              ) : null}
              <h3>{event.title}</h3>
              <p>{event.outcome}</p>
              <dl className="event-meta">
                <div>
                  <dt>Date</dt>
                  <dd>{when}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{time}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{event.location}</dd>
                </div>
                <div>
                  <dt>For</dt>
                  <dd>{event.audience}</dd>
                </div>
                {event.bring ? (
                  <div>
                    <dt>Bring</dt>
                    <dd>{event.bring}</dd>
                  </div>
                ) : null}
              </dl>
              {event.accessibilityNote.trim() ? (
                <p className="muted-note">{event.accessibilityNote}</p>
              ) : null}
              {"href" in action && action.href ? (
                <Button label={action.label} href={action.href} external={action.external} />
              ) : (
                <p className="muted-note">{action.label}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
