import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { INCLUDED } from "@/data/content";
import { BASE_PRICE, TL, VAT_NOTE, YEARLY, money } from "@/lib/config";

/** Fiyat paneli: ana sayfa ve ücretlendirme sayfası aynı bileşeni kullanır. */
export function OfferPanel({ heading, cta }: { heading: string; cta: ReactNode }) {
  return (
    <div className="offer">
      <div className="offer-l">
        <h2 className="h-3">{heading}</h2>
        <div className="price-num">
          {money(BASE_PRICE)}
          <span>TL</span>
        </div>
        <ul className="ledger">
          <li className="lr">
            <span>İlk yıl servis ve bakım</span>
            <span>0 TL</span>
          </li>
          <li className="lr">
            <span>2. yıldan itibaren</span>
            <span>{TL(YEARLY)} / yıl</span>
          </li>
        </ul>
        <p className="fine">Yıllık ücret enflasyona göre güncellenir. Fiyatlar {VAT_NOTE}.</p>
        <p className="cancel-s">
          <Icon n="shield" size={18} />
          <span>
            <b>Taahhüt yok.</b> Memnun kalmazsanız ilk yılın sonunda servisi ücretsiz iptal edebilirsiniz.
          </span>
        </p>
      </div>
      <div className="offer-r">
        <h3 className="h-3" style={{ marginBottom: "6px" }}>
          Fiyata dahil olanlar
        </h3>
        <ul className="checks">
          {INCLUDED.map((f) => (
            <li key={f.t}>
              <span className="ck">
                <Icon n="check" size={13} sw={3} />
              </span>
              <div>
                <b>{f.t}</b>
                <small>{f.d}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="offer-foot">{cta}</div>
    </div>
  );
}
