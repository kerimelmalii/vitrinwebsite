/** Alan adı bağlandığında ortam değişkeni olarak ayarlanmalı (ör. https://vitrin.com).
    Ayarlanmazsa site haritası ve robots.txt yer tutucu bir adres kullanır. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
