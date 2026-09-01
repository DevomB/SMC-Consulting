import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";
import type { SiteView } from "@/lib/site";

export function ContributeInvite({ view }: { view: SiteView }) {
  return (
    <Section id="contribute" kicker={homeCopy.contributeKicker} title={homeCopy.contributeHeadline}>
      <p className="lede">{homeCopy.contributeBody}</p>
      <ul className="contribute-options">
        {homeCopy.contributeOptions.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="hero-actions">
        <Button href="/contribute" label={homeCopy.exploreContribute} variant="on-paper" />
        {view.contributeCta ? <Button {...view.contributeCta} variant="ghost-light" /> : null}
      </div>
    </Section>
  );
}
