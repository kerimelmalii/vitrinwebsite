"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { useApp } from "@/lib/order-context";
import { pricing } from "@/lib/pricing";
import { TL } from "@/lib/config";

const STEPS = [
  { n: "01", t: "Bilgiler" },
  { n: "02", t: "Paket" },
  { n: "03", t: "Ödeme" },
  { n: "04", t: "Başlangıç" },
];

export function Stepper({ step }: { step: number }) {
  return (
    <ol className="stepper" aria-label="Sipariş adımları">
      {STEPS.map((s, i) => {
        const st = i + 1 < step ? "done" : i + 1 === step ? "cur" : "";
        return (
          <li key={s.n} className={"st " + st} aria-current={st === "cur" ? "step" : undefined}>
            <span className="bar">
              <i></i>
            </span>
            <span className="lbl">
              <em>{st === "done" ? <Icon n="check" size={12} sw={3} /> : s.n}</em>
              {s.t}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Shell({
  step,
  title,
  sub,
  aside,
  asideLeft,
  desk,
  hint,
  mini,
  children,
}: {
  step: number;
  title: ReactNode;
  sub: ReactNode;
  aside?: ReactNode;
  asideLeft?: boolean;
  desk?: boolean;
  hint?: ReactNode;
  mini?: boolean;
  children: ReactNode;
}) {
  const { order } = useApp();
  return (
    <main id="main" className="container-x co">
      <Stepper step={step} />
      <div className="co-head">
        <h1 className="h-1">{title}</h1>
        <p className="lead">{sub}</p>
      </div>
      {mini && (
        <div className="mini-sum">
          <span>Temel Web Sitesi{order.addons.length ? " + " + order.addons.length + " ek" : ""}</span>
          <b>{TL(pricing(order.addons).total)}</b>
        </div>
      )}
      <div className={"co-grid " + (asideLeft ? "al" : "")}>
        <div>
          {children}
          {hint && (
            <p className="hint">
              <Icon n="info" size={18} />
              {hint}
            </p>
          )}
        </div>
        {aside && <aside className={"co-aside " + (desk ? "desk" : "")}>{aside}</aside>}
      </div>
    </main>
  );
}
