"use client";

import { Icon } from "@/components/icons";
import { ADDONS, QUOTE_ADDONS, joinTr, quoteNames } from "@/data/content";
import { money } from "@/lib/config";
import { LIMITS, clean } from "@/lib/security";
import { useApp } from "@/lib/order-context";
import { QUOTE_WHATSAPP, quoteLink } from "@/lib/pricing";
import type { Order } from "@/lib/types";

export function AddonList() {
  const { order, patch } = useApp();
  const toggle = (id: string) =>
    patch((o) => ({ addons: o.addons.includes(id) ? o.addons.filter((x) => x !== id) : [...o.addons, id] }));
  return (
    <div className="addons">
      {ADDONS.map((a) => {
        const on = order.addons.includes(a.id);
        return (
          <label key={a.id} className={"addon " + (on ? "on" : "")}>
            <input type="checkbox" checked={on} onChange={() => toggle(a.id)} />
            <span className="cbx">{on && <Icon n="check" size={14} sw={3} />}</span>
            <span className="atxt">
              <b>{a.name}</b>
              <small>{a.d}</small>
            </span>
            <span className="aprice">+{money(a.price)} TL</span>
          </label>
        );
      })}
    </div>
  );
}

/* Teklif talebi siparişe not olarak eklenir; toplam fiyatı değiştirmez ve müşteriyi akıştan çıkarmaz. */
export function QuoteAddons({ err }: { err?: string }) {
  const { order, patch } = useApp();
  const qs = order.quotes || [];
  const custom = order.customRequest || "";
  const toggle = (id: string) =>
    patch((o) => {
      const c = o.quotes || [];
      return { quotes: c.includes(id) ? c.filter((x) => x !== id) : [...c, id] };
    });
  return (
    <>
      <div className="addons quote-addons">
        {QUOTE_ADDONS.map((a) => {
          const on = qs.includes(a.id);
          return (
            <div key={a.id} className={"addon quote " + (on ? "on" : "")}>
              <span className="cbx q">
                <Icon n={on ? "check" : a.custom ? "plus" : "message"} size={14} sw={2.5} />
              </span>
              <span className="atxt">
                <b>{a.name}</b>
                <small>{a.d}</small>
              </span>
              <button type="button" className="btn btn-line quote-cta" aria-pressed={on} onClick={() => toggle(a.id)}>
                {on ? "Teklif İstendi" : "Teklif İste"}
              </button>
              {a.custom && on && (
                <div className="q-custom">
                  <label className="label" htmlFor="q-custom">
                    İsteğinizi yazın
                  </label>
                  <textarea
                    className="input"
                    id="q-custom"
                    maxLength={LIMITS.custom}
                    value={custom}
                    aria-invalid={!!err}
                    aria-describedby={err ? "q-custom-e" : "q-custom-c"}
                    placeholder="Örnek: menünün indirilebilir olması, müşteri yorumları bölümü, etkinlik takvimi"
                    onChange={(e) => patch({ customRequest: clean(e.target.value, LIMITS.custom) })}
                  ></textarea>
                  {err ? (
                    <p className="err" id="q-custom-e" role="alert">
                      {err}
                    </p>
                  ) : (
                    <p className="fhint" id="q-custom-c">
                      {custom.length} / {LIMITS.custom}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="fine" style={{ marginTop: "10px" }}>
        Teklif istediğiniz özellikler sipariş tutarına eklenmez.
      </p>
      {QUOTE_WHATSAPP && (
        <a
          className="quote-wa"
          href={quoteLink(qs.length ? joinTr(quoteNames(qs)) : "Online Ödeme / Yönetim Paneli", order)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Siparişten önce WhatsApp&apos;tan sorun
        </a>
      )}
    </>
  );
}

/** Teklif istenen özellikler seçildiğinde tutarın neyi kapsamadığını açıkça söyler. */
export function QuoteNote({ quotes, after }: { quotes: Order["quotes"]; after?: boolean }) {
  const names = quoteNames(quotes);
  if (!names.length) return null;
  const list = joinTr(names);
  const many = names.length > 1;
  return (
    <div className="qnote" role="note">
      <Icon n="info" size={18} />
      <p>
        {after ? (
          <>
            <b>{list}</b> için teklifinizi hazırlayıp e-postayla ileteceğiz. Teklifi onaylarsanız, tutarı ödemeniz için
            sizi güvenli ödeme sayfasına yönlendireceğiz; onaylamazsanız ek bir ödeme yapmazsınız.
          </>
        ) : (
          <>
            Bu tutara <b>{list}</b> dahil değildir. {many ? "Bunlar" : "Bunun"} için size ayrıca bir teklif ileteceğiz.
            Teklifi onaylarsanız, tutarı ödemeniz için sizi güvenli ödeme sayfasına yönlendireceğiz. Onaylamazsanız ek
            bir ödeme yapmazsınız.
          </>
        )}
      </p>
    </div>
  );
}
