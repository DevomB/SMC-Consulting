import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export function WhySmc() {
  return (
    <Section id="about" index="01" kicker={homeCopy.whyKicker}>
      <div className="why-grid">
        <h2 className="why-pull">{homeCopy.whyHeadline}</h2>
        <div>
          {homeCopy.whyBody.map((paragraph) => (
            <p className="lede" key={paragraph} style={{ marginBottom: "1rem" }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
