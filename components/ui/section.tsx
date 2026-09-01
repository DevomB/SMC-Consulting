import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  kicker?: string;
  index?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, kicker, index, title, className, children }: Props) {
  return (
    <section id={id} className={cn("section", className)}>
      <div className="container">
        {kicker ? (
          <p className="section-kicker">
            {index ? <span className="section-index">{index} /</span> : null}
            {kicker}
          </p>
        ) : null}
        {title ? <h2 className="section-title">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}
