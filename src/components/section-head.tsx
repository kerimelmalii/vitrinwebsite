import type { ReactNode } from "react";

export function SectionHead({
  title,
  sub,
  right,
}: {
  title: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <h2 className="h-2">{title}</h2>
        {sub && <p className="lead">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
