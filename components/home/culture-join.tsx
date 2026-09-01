import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";
import { isHttpUrl } from "@/lib/utils";

export function CultureJoin({ view }: { view: SiteView }) {
  return (
    <section className="section" id="culture">
      <Container>
        <div className="culture-join">
          <div>
            <p className="section-kicker">
              <span className="section-index">06 /</span>
              {homeCopy.cultureKicker}
            </p>
            <h2 className="section-title">{homeCopy.cultureHeadline}</h2>
            <p className="lede">{homeCopy.cultureIntro}</p>
            <ul className="principles">
              {homeCopy.principles.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  {item.body}
                </li>
              ))}
            </ul>
            <blockquote className="pull-quote">{homeCopy.culturePull}</blockquote>
          </div>
          <div id="join">
            <p className="section-kicker">
              <span className="section-index">07 /</span>
              {homeCopy.joinKicker}
            </p>
            <h2 className="section-title">{homeCopy.joinHeadline}</h2>
            <p className="lede">{view.joinMembership}</p>
            <div className="join-paths">
              <article>
                <h3>Attend</h3>
                <p>{homeCopy.joinAttend}</p>
              </article>
              <article>
                <h3>Join the community</h3>
                <p>{homeCopy.joinCommunity}</p>
              </article>
              <article>
                <h3>Build</h3>
                <p>{homeCopy.joinBuild}</p>
                {view.applications.state === "open" && isHttpUrl(view.applications.href) ? (
                  <Button href={view.applications.href} label="View open project roles" external variant="ghost-light" />
                ) : (
                  <p className="muted-note">{homeCopy.projectRolesClosed}</p>
                )}
              </article>
            </div>
            <Button {...view.primary} />
          </div>
        </div>
      </Container>
    </section>
  );
}
