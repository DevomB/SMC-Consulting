import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export function FocusMatrix() {
  return (
    <Section id="focus" index="03" kicker={homeCopy.focusKicker} title={homeCopy.focusHeadline}>
      <p className="lede" style={{ marginBottom: "2rem" }}>
        {homeCopy.focusIntro}
      </p>
      <div className="focus-matrix">
        {homeCopy.focus.map((area) => (
          <article className="focus-cell" key={area.name}>
            <h3>{area.name}</h3>
            <p>{area.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
