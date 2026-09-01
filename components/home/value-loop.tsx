import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export function ValueLoop() {
  return (
    <Section id="how" index="02" kicker={homeCopy.loopKicker}>
      <p className="lede" style={{ marginBottom: "2rem" }}>
        {homeCopy.loopIntro}
      </p>
      <ol className="value-loop">
        {homeCopy.loop.map((step) => (
          <li className="loop-step" key={step.title}>
            <strong>{step.title}</strong>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
