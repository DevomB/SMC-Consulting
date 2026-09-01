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
      <Button href="/contribute" label={homeCopy.exploreContribute} variant="on-paper" />
      {view.contributeCta ? (
        <span style={{ marginLeft: "0.75rem" }}>
          <Button {...view.contributeCta} variant="ghost-light" />
        </span>
      ) : null}
    </Section>
  );
}
