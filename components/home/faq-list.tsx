import { Section } from "@/components/ui/section";

export function FaqList({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <Section id="faq" kicker="FAQ">
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
