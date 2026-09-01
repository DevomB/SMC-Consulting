"use client";

import { cn } from "@/lib/cn";
import { canUsePointerField } from "@/components/motion/prefers-reduced-motion";
import { useEffect, useRef, type ReactNode } from "react";

const SHIFT = 6;

export function PointerField({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const apply = (x: number, y: number) => {
      root.style.setProperty("--nx", `${x}px`);
      root.style.setProperty("--ny", `${y}px`);
    };
    const reset = () => apply(0, 0);

    const onMove = (event: PointerEvent) => {
      if (!canUsePointerField()) {
        reset();
        return;
      }
      const box = root.getBoundingClientRect();
      const px = (event.clientX - box.left) / Math.max(box.width, 1) - 0.5;
      const py = (event.clientY - box.top) / Math.max(box.height, 1) - 0.5;
      apply(px * SHIFT, py * SHIFT);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", reset);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", reset);
      reset();
    };
  }, []);

  return (
    <div ref={ref} className={cn("pathways", className)}>
      {children}
    </div>
  );
}
