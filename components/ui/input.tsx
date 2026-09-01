import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, id, className, ...props }: Props) {
  const fieldId = id ?? props.name;
  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      {hint ? <p className="muted-note" id={`${fieldId}-hint`}>{hint}</p> : null}
      <input
        id={fieldId}
        className={cn(className)}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        {...props}
      />
    </div>
  );
}
