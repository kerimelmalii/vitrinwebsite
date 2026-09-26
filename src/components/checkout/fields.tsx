"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { LIMITS, clean } from "@/lib/security";

export function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="fld">
      <label className="label" htmlFor={id}>
        {label}
        {optional && <span className="opt"> (isteğe bağlı)</span>}
      </label>
      {children}
      {error ? (
        <p className="err" id={id + "-e"} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="fhint">{hint}</p>
      ) : null}
    </div>
  );
}

type InpProps = {
  id: string;
  value: string;
  onValue: (v: string) => void;
  error?: string;
  maxLength?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "maxLength">;

export function Inp({ id, value, onValue, error, maxLength = LIMITS.short, ...rest }: InpProps) {
  return (
    <input
      className="input"
      id={id}
      name={id}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onValue(clean(e.target.value, maxLength))}
      aria-invalid={!!error}
      aria-describedby={error ? id + "-e" : undefined}
      {...rest}
    />
  );
}
