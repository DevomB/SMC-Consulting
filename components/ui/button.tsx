import { cn } from "@/lib/cn";
import type { Cta } from "@/lib/site-types";
import { externalRel } from "@/lib/utils";
import Link from "next/link";

type Variant = "primary" | "ghost" | "ghost-light" | "on-paper";

type Props = Cta & {
  variant?: Variant;
  className?: string;
};

const variantClass: Record<Variant, string> = {
  primary: "btn btn--primary",
  ghost: "btn btn--ghost",
  "ghost-light": "btn btn--ghost btn--ghost-light",
  "on-paper": "btn btn--on-paper",
};

export function Button({ href, label, external, variant = "primary", className }: Props) {
  const classes = cn(variantClass[variant], className);
  if (external) {
    return (
      <a className={classes} href={href} {...externalRel(true)}>
        {label}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {label}
    </Link>
  );
}
