/** Temel paket fiyatı ve yıllık servis ücreti. */
export const BASE_PRICE = 5000;
export const YEARLY = 1000;

/** Fiyat listesi sürümü: sunucu, siparişteki sürüm güncel değilse toplamı yeniden hesaplar ve müşteriyi uyarır. */
export const PRICING_VERSION = "2026-09";

/** Tüketiciye gösterilen fiyatlar vergiler dahil olmalıdır. Sahibi KDV durumunu teyit etmeli (bkz. DEVIR-BELGESI.md bölüm 9). */
export const VAT_INCLUDED = true;
export const VAT_NOTE = VAT_INCLUDED ? "KDV dahil" : "KDV hariç";

export const money = (n: number): string =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const TL = (n: number): string => money(n) + " TL";

export const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));
