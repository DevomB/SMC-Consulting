import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";
import { cn } from "@/lib/cn";
import type { Program } from "@/lib/site-types";
import { isHttpUrl } from "@/lib/utils";

export function ProgramList({ programs }: { programs: Program[] }) {
  if (!programs.length) return null;
  return (
    <Section id="programs" index="04" kicker={homeCopy.programsKicker} title={homeCopy.programsHeadline}>
      <div className="program-list">
        {programs.map((program) => (
          <article className="program-card" key={program.name}>
            <span
              className={cn(
                "status-pill",
                program.state === "active" && "status-pill--active",
              )}
            >
              {program.state === "active" ? "Active" : "In development"}
            </span>
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <p className="muted-note">{program.timeline}</p>
            {program.state === "active" && isHttpUrl(program.href) ? (
              <Button href={program.href} label="See the next session" external variant="ghost-light" />
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
