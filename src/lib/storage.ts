import { ADDONS, QUOTE_ADDONS } from "@/data/content";
import { Backend, recordToOrder } from "@/lib/backend";
import { DRAFT_TTL, EMPTY_INFO, EMPTY_INVOICE } from "@/lib/order-defaults";
import { LIMITS, clean } from "@/lib/security";
import type { Order, OrderInfo } from "@/lib/types";

export const LS = {
  get<T = unknown>(k: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(k) || "null");
    } catch {
      return null;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* localStorage kullanılamıyor: sessizce yok say */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* no-op */
    }
  },
};

interface Draft {
  ts: number;
  info: Partial<OrderInfo>;
  addons: string[];
  quotes: string[];
  customRequest: string;
}

export const blankOrder = (): Order => ({
  info: { ...EMPTY_INFO },
  addons: [],
  quotes: [],
  customRequest: "",
  step: 1,
  id: null,
  orderNo: null,
  accessToken: null,
  status: null,
  project: null,
  createdAt: null,
  invoice: { ...EMPTY_INVOICE },
  consents: null,
  content: null,
  paymentRef: null,
});

/** keep verilirse yeni sipariş başlatılır; verilmezse önce açık sipariş, yoksa taslak yüklenir. */
export const initOrder = (keep?: { info?: Partial<OrderInfo> }): Order => {
  const o = blankOrder();
  if (keep) {
    o.info = { ...o.info, ...(keep.info || {}) };
    return o;
  }
  /* Taslak en fazla 7 gün tutulur; süresi geçen ya da bozuk taslak silinir. */
  let d = LS.get<Draft>("vitrin:draft");
  if (d && (typeof d !== "object" || !d.ts || Date.now() - d.ts > DRAFT_TTL || !d.info || typeof d.info !== "object")) {
    LS.del("vitrin:draft");
    d = null;
  }
  if (d) {
    const inf: OrderInfo = { ...EMPTY_INFO };
    (Object.keys(EMPTY_INFO) as (keyof OrderInfo)[]).forEach((k) => {
      inf[k] = clean((d as Draft).info[k], LIMITS.text);
    });
    d = {
      ...d,
      info: inf,
      addons: (Array.isArray(d.addons) ? d.addons : []).filter((id) => ADDONS.some((x) => x.id === id)),
      quotes: (Array.isArray(d.quotes) ? d.quotes : []).filter((id) => QUOTE_ADDONS.some((x) => x.id === id)),
      customRequest: clean(d.customRequest, LIMITS.custom),
    };
  }
  const activeId = LS.get<string>("vitrin:active");
  const rec = activeId ? Backend.get(activeId) : null;
  if (rec) {
    const r = recordToOrder(rec);
    /* Ödenmemiş siparişte taslak daha güncel olabilir (adım 1-2'de yapılan düzenlemeler). */
    if (r.status !== "paid" && d) {
      return { ...r, info: { ...r.info, ...d.info }, addons: d.addons, quotes: d.quotes, customRequest: d.customRequest };
    }
    return r;
  }
  if (d) return { ...o, info: { ...o.info, ...d.info }, addons: d.addons, quotes: d.quotes, customRequest: d.customRequest };
  return o;
};
