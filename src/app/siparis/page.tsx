import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/checkout";

export const metadata: Metadata = { title: "Sipariş", robots: { index: false } };

export default function Page() {
  return <Checkout />;
}
