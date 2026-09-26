/** JSON-LD, bir <script type="application/ld+json"> içine gömülür. JSON.stringify "</" dizisini
    kaçışlamaz; bir alan bunu içerirse script etiketinden erken çıkış (XSS) riski oluşur. Şu an tüm
    alanlar sitenin kendi sabit içeriğinden geliyor, ama ileride bir CMS/kullanıcı girdisinden
    beslenirse bu koruma olmadan savunmasız kalır. */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
