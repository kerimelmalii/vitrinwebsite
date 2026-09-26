import { ADDONS } from "@/data/content";
import { BASE_PRICE } from "@/lib/config";
import type { Order } from "@/lib/types";

/** İsteğe bağlı ikinci kanal: gerçek işletme numarası girilirse "WhatsApp'tan sorun" bağlantısı görünür
    (ülke koduyla, boşluksuz, ör. "905321234567"). Boş kalırsa yalnızca siparişe not düşen teklif talebi kullanılır. */
export const QUOTE_WHATSAPP = "";

export const quoteLink = (addonName: string, order: Order | null | undefined): string => {
  const brand = order?.info?.brand ? order.info.brand : "";
  const msg = `Merhaba, "${brand || "işletmem"}" için ${addonName} özelliğine teklif almak istiyorum.`;
  return "https://wa.me/" + QUOTE_WHATSAPP + "?text=" + encodeURIComponent(msg);
};

export const pricing = (ids: string[]) => {
  const list = ADDONS.filter((a) => ids.includes(a.id));
  const extra = list.reduce((s, a) => s + a.price, 0);
  return { list, extra, total: BASE_PRICE + extra };
};
