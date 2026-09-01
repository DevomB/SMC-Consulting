import { cn } from "@/lib/cn";
import type { CSSProperties, ReactNode } from "react";
import "./motion.css";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "span";
};

export function Enter({ children, className, delayMs = 0, as: Tag = "div" }: Props) {
  const style: CSSProperties | undefined = delayMs
    ? { animationDelay: `${delayMs}ms` }
    : undefined;

  return (
    <Tag className={cn("enter", className)} style={style}>
      {children}
    </Tag>
  );
}

export function EnterGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("enter-stagger", className)}>{children}</div>;
}
