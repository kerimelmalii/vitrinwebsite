/* ================= BACKEND (demo) =================
   Üretimde bu nesnenin her metodu bir API çağrısıdır:
   upsert -> POST/PATCH /api/orders   |  get -> GET /api/orders/:id
   Şu an tarayıcıda localStorage'a yazar (yalnızca demo). Kart verisi ASLA buraya girmez.
   (bkz. DEVIR-BELGESI.md bölüm 8 için gerçek backend planı) */
import { ADDONS, QUOTE_ADDONS, SECTORS } from "@/data/content";
import { PRICING_VERSION, YEARLY, sleep } from "@/lib/config";
import { EMPTY_INFO, EMPTY_INVOICE } from "@/lib/order-defaults";
import { pricing } from "@/lib/pricing";
import { RX, LIMITS, clean, rand } from "@/lib/security";
import { PROJECT_STATUSES } from "@/lib/types";
import type { Order, OrderRecord } from "@/lib/types";

const mem: { orders: OrderRecord[] } = { orders: [] };

export const isRecord = (r: unknown): r is OrderRecord => {
  if (!r || typeof r !== "object") return false;
  const rec = r as Record<string, unknown>;
  return (
    typeof rec.id === "string" &&
    RX.orderId.test(rec.id) &&
    typeof rec.orderNo === "string" &&
    !!rec.customer &&
    !!rec.business
  );
};

export const Backend = {
  /** Depodan gelen veri güvenilmez kabul edilir: biçimi bozuk kayıtlar elenir. */
  read(): OrderRecord[] {
    let v: unknown = null;
    try {
      v = JSON.parse(localStorage.getItem("vitrin:orders") || "null");
    } catch {
      /* bozuk veri: mem yedeğine düş */
    }
    const l = Array.isArray(v) ? v : mem.orders;
    return l.filter(isRecord);
  },
  write(l: OrderRecord[]) {
    mem.orders = l;
    try {
      localStorage.setItem("vitrin:orders", JSON.stringify(l));
    } catch {
      /* localStorage kullanılamıyor (gizli mod vb.): yalnızca bellekte tut */
    }
  },
  /** Müşteriye gösterilen 6 haneli numara. Çakışma kontrol edilir; bu numara hiçbir zaman erişim anahtarı değildir. */
  newOrderNo(): string {
    const used = new Set(this.read().map((o) => o.orderNo));
    let n: string;
    do {
      n = String(100000 + rand(900000));
    } while (used.has(n));
    return n;
  },
  get(id: string): OrderRecord | null {
    return this.read().find((o) => o.id === id) || null;
  },
  /** Üretimde: GET /api/orders/by-token/:token (sunucu token'ın özetini karşılaştırır). */
  findByToken(t: unknown): OrderRecord | null {
    return typeof t === "string" && RX.token.test(t) ? this.read().find((o) => o.accessToken === t) || null : null;
  },
  async upsert(rec: OrderRecord): Promise<OrderRecord> {
    await sleep(80);
    const l = this.read().filter((o) => o.id !== rec.id);
    l.unshift(rec);
    this.write(l);
    return rec;
  },
};

export const buildRecord = (o: Order): OrderRecord => {
  const p = pricing(o.addons);
  const i = o.info;
  const c = (k: keyof typeof i, m?: number) => clean(i[k], m);
  return {
    id: o.id as string,
    orderNo: o.orderNo as string,
    accessToken: o.accessToken || null,
    pricingVersion: PRICING_VERSION,
    customer: { name: c("name", LIMITS.name), email: c("email", LIMITS.email), phone: c("phone", LIMITS.phone) },
    business: {
      brand: c("brand", LIMITS.brand),
      sector: SECTORS.includes(i.sector) ? i.sector : "",
      site: c("site", LIMITS.url),
      instagram: c("instagram", LIMITS.handle),
      whatsapp: c("whatsapp", LIMITS.phone),
      wishes: c("wishes", LIMITS.wishes),
    },
    package: "temel",
    addons: p.list.map((a) => ({ id: a.id, name: a.name, price: a.price })),
    quoteRequests: QUOTE_ADDONS.filter((q) => (o.quotes || []).includes(q.id)).map((q) =>
      q.custom ? { id: q.id, name: q.name, note: clean(o.customRequest, LIMITS.custom).trim() } : { id: q.id, name: q.name }
    ),
    total: p.total,
    firstYearService: 0,
    yearlyService: YEARLY,
    invoice: o.invoice,
    consents: o.consents || null,
    paymentStatus: o.status,
    paymentRef: o.paymentRef || null,
    projectStatus: o.project,
    createdAt: o.createdAt,
    contentForm: o.content || null,
  };
};

/** Kayıttan sipariş durumunu geri kurar (sayfa yenilemesi ve erişim bağlantısı için). */
export const recordToOrder = (r: OrderRecord): Order => {
  const paid = r.paymentStatus === "paid";
  const src: Record<string, unknown> = { ...r.customer, ...r.business };
  const info = { ...EMPTY_INFO };
  (Object.keys(EMPTY_INFO) as (keyof typeof EMPTY_INFO)[]).forEach((k) => {
    info[k] = clean(src[k], LIMITS.text);
  });
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const qr = arr<OrderRecord["quoteRequests"][number]>(r.quoteRequests);
  const custom = qr.find((q) => q && q.id === "ozel");
  return {
    info,
    addons: arr<OrderRecord["addons"][number]>(r.addons)
      .map((a) => a && a.id)
      .filter((id): id is string => ADDONS.some((x) => x.id === id)),
    quotes: qr.map((q) => q && q.id).filter((id): id is string => QUOTE_ADDONS.some((x) => x.id === id)),
    customRequest: custom ? clean(custom.note, LIMITS.custom) : "",
    step: paid ? 4 : 3,
    id: r.id,
    orderNo: r.orderNo,
    accessToken: r.accessToken || null,
    /* Ödeme ortasında kapanan sekme: sonuç webhook ile netleşir; demoda tekrar denenebilir durumda açılır. */
    status: paid ? "paid" : "pending",
    project: PROJECT_STATUSES.includes(r.projectStatus as (typeof PROJECT_STATUSES)[number]) ? r.projectStatus : null,
    createdAt: r.createdAt,
    invoice: { ...EMPTY_INVOICE, ...(r.invoice || {}) },
    consents: r.consents || null,
    content: r.contentForm || null,
    paymentRef: r.paymentRef || null,
  };
};
