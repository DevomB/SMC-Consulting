import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export function EarlyInvitation({ founding }: { founding: boolean }) {
  return (
    <Section id="next" kicker={homeCopy.earlyKicker} title={homeCopy.earlyHeadline}>
      {founding ? <p className="lede">{homeCopy.foundingLead}</p> : null}
      {homeCopy.earlyBody.map((paragraph) => (
        <p className="lede" key={paragraph} style={{ marginBottom: "1rem" }}>
          {paragraph}
        </p>
      ))}
      <div style={{ marginTop: "1.5rem" }}>
        <Button href="/join" label={homeCopy.earlyCta} />
      </div>
    </Section>
  );
}
