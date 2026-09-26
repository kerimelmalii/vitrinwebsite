"use client";

import type { ReactNode } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import { Icon } from "@/components/icons";
import { QuoteNote } from "@/components/addons";
import { QUOTE_ADDONS } from "@/data/content";
import { BASE_PRICE, TL, VAT_NOTE, YEARLY, money } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { pricing } from "@/lib/pricing";

export function OrderSummary({
  cta,
  sticky,
  title = "Sipariş Özeti",
}: {
  cta?: ReactNode;
  sticky?: boolean;
  title?: string;
}) {
  const { order } = useApp();
  const p = pricing(order.addons);
  const qs = order.quotes || [];
  const hasQ = qs.length > 0;
  return (
    <div className={"sum " + (sticky ? "sticky" : "")}>
      <h3>{title}</h3>
      <dl className="sum-rows">
        <div className="row">
          <dt>Temel Web Sitesi</dt>
          <dd>{TL(BASE_PRICE)}</dd>
        </div>
        <div className="row">
          <dt>Ek özellikler</dt>
          <dd>{p.extra ? TL(p.extra) : "Seçilmedi"}</dd>
        </div>
        {p.list.map((a) => (
          <div className="row sub" key={a.id}>
            <dt>{a.name}</dt>
            <dd>+{money(a.price)}</dd>
          </div>
        ))}
        {QUOTE_ADDONS.filter((q) => qs.includes(q.id)).map((q) => (
          <div className="row sub q" key={q.id}>
            <dt>{q.name}</dt>
            <dd>Teklif istendi</dd>
          </div>
        ))}
      </dl>
      <div className="sum-total">
        <span>
          {hasQ ? "Şimdi ödenecek" : "Toplam"} ({VAT_NOTE})
        </span>
        <b aria-live="polite">
          <AnimatedNumber value={p.total} /> TL
        </b>
      </div>
      <div className="sum-free">
        <Icon n="check" size={16} sw={2.5} /> İlk yıl servis: 0 TL
      </div>
      <p className="fine">2. yıldan itibaren {TL(YEARLY)} / yıl, enflasyona göre güncellenir. Taahhüt yok.</p>
      {hasQ ? (
        <QuoteNote quotes={qs} />
      ) : (
        <p className="fine">Online Ödeme, Yönetim Paneli ve özel istekler ayrıca tekliflendirilir.</p>
      )}
      {cta}
    </div>
  );
}
