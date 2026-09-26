import type { Metadata, Viewport } from "next";
import { OrderProvider } from "@/lib/order-context";
import { AppShell } from "@/components/app-shell";
import { BASE_PRICE, money } from "@/lib/config";
import "./globals.css";

const SITE_TITLE = `${money(BASE_PRICE)} TL'ye profesyonel web sitesi`;
const SITE_DESCRIPTION =
  "İşletmenizin dijital vitrini. 5.000 TL'ye modern, hızlı ve mobil uyumlu web sitesi. İlk yıl servis ve bakım ücretsiz, taahhüt yok. Siparişinizi dakikalar içinde oluşturun.";

export const metadata: Metadata = {
  title: { default: `Vitrin | ${SITE_TITLE}`, template: "%s | Vitrin" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: "Modern, hızlı ve mobil uyumlu web siteniz. İlk yıl servis ve bakım ücreti yok.",
    type: "website",
  },
  other: {
    referrer: "strict-origin-when-cross-origin",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Profesyonel web sitesi",
  description: "Modern, hızlı ve mobil uyumlu web sitesi. İlk yıl servis ve bakım ücretsiz.",
  offers: { "@type": "Offer", price: String(BASE_PRICE), priceCurrency: "TRY" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          İçeriğe geç
        </a>
        <noscript>Bu sitenin çalışması için JavaScript gereklidir.</noscript>
        <OrderProvider>
          <AppShell>{children}</AppShell>
        </OrderProvider>
      </body>
    </html>
  );
}
