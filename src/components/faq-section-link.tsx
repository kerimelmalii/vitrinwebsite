"use client";

import Link from "next/link";
import { useApp } from "@/lib/order-context";

export function FaqSectionLink() {
  const { goSection } = useApp();
  return (
    <Link
      href="/#sss"
      onClick={(e) => {
        e.preventDefault();
        goSection("sss");
      }}
    >
      Sık sorulan sorular
    </Link>
  );
}
