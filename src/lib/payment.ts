import { sleep } from "@/lib/config";

/* ================= ÖDEME SAĞLAYICI SOYUTLAMASI =================
   Üretimde: createSession -> POST /api/payments/session (sunucu, sağlayıcı API'sini çağırır)
   ve sağlayıcının barındırılan ödeme formu (hosted checkout / iframe) gösterilir.
   Kart bilgisi kendi sunucumuza veya state'imize ASLA yazılmaz. Sipariş "paid" durumuna
   yalnızca sağlayıcının webhook'u ile geçer.
   Buradaki confirm() sadece demo içindir: sağlayıcı formunu taklit eder. */

interface PaymentSession {
  sessionId: string;
}

interface PaymentCard {
  name: string;
  number: string;
  exp: string;
  cvv: string;
}

type PaymentResult = { ok: true; ref: string } | { ok: false; reason: string };

export const PaymentProvider = {
  id: "demo",
  async createSession(order: { id: string | null; amount: number }): Promise<PaymentSession> {
    await sleep(450);
    return { sessionId: "sess_" + order.id };
  },
  async confirm(session: PaymentSession, card: PaymentCard): Promise<PaymentResult> {
    await sleep(1400);
    if (card.number.replace(/\s/g, "").endsWith("0002")) {
      return { ok: false, reason: "Kartınız banka tarafından reddedildi. Başka bir kart deneyin." };
    }
    return { ok: true, ref: "demo_" + session.sessionId };
  },
};
