"use client";

import { useEffect, useRef, useState } from "react";
import { money } from "@/lib/config";

export function AnimatedNumber({ value }: { value: number }) {
  const [v, setV] = useState(value);
  const shown = useRef(value);
  useEffect(() => {
    const a = shown.current;
    const b = value;
    if (a === b) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = b;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- kullanıcı tercihine göre animasyonu atlar
      setV(b);
      return;
    }
    const t0 = performance.now();
    const D = 380;
    let raf: number;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / D);
      const e = 1 - Math.pow(1 - k, 3);
      shown.current = Math.round(a + (b - a) * e);
      setV(shown.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{money(v)}</>;
}
