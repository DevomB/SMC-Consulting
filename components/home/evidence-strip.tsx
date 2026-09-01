import { Container } from "@/components/ui/container";

export function EvidenceStrip({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="truth-strip">
      <Container>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
