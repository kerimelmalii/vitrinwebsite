"use client";

import { BusinessInfoStep } from "@/components/checkout/business-info-step";
import { PackageStep } from "@/components/checkout/package-step";
import { PaymentStep } from "@/components/checkout/payment-step";
import { SuccessStep } from "@/components/checkout/success-step";
import { useApp } from "@/lib/order-context";

export function Checkout() {
  const { order } = useApp();
  if (order.step === 4 && order.status === "paid") return <SuccessStep />;
  if (order.step === 3 && order.id) return <PaymentStep />;
  if (order.step === 2) return <PackageStep />;
  return <BusinessInfoStep />;
}
