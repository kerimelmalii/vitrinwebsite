"use client";

import { joinTr, quoteNames } from "@/data/content";
import { TL, VAT_NOTE } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { pricing } from "@/lib/pricing";

export function OrderBoxClient() {
  const { order } = useApp();
  const p = pricing(order.addons);
  const qs = quoteNames(order.quotes);
  if (!order.info || !order.info.name) {
    return <p className="fine">Siparişinize ait hizmet ve toplam tutar, ödeme adımında burada gösterilir.</p>;
  }
  return (
    <div className="lg-order">
      <dl>
        <div>
          <dt>Alıcı</dt>
          <dd>
            {order.info.name}
            {order.info.email ? ", " + order.info.email : ""}
          </dd>
        </div>
        <div>
          <dt>Hizmet</dt>
          <dd>Temel web sitesi{p.list.length ? " + " + p.list.map((a) => a.name).join(", ") : ""}</dd>
        </div>
        {qs.length > 0 && (
          <div>
            <dt>Teklif istenen</dt>
            <dd>{joinTr(qs)} (tutara dahil değildir)</dd>
          </div>
        )}
        <div>
          <dt>Toplam</dt>
          <dd>
            <b>{TL(p.total)}</b> ({VAT_NOTE})
          </dd>
        </div>
      </dl>
    </div>
  );
}
