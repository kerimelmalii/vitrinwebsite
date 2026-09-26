import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing-page";

export const metadata: Metadata = {
  title: "Ücretlendirme",
  description: "Temel web sitesi 5.000 TL. Ek özellik fiyatları ve yıllık servis ücretleri.",
  alternates: { canonical: "/ucretlendirme" },
};

export default function Page() {
  return <PricingPage />;
}
