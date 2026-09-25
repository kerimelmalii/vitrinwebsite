# Vitrin: Devir Belgesi (v5)

Bu belge, projeyi başka bir yapay zekâ veya geliştiriciyle sürdürmek için hazırlandı. Yanında `index.html` (çalışan prototip) olmalı.

## 1. Ne yapılıyor
Türkçe bir satış sitesi: **5.000 TL'ye temel web sitesi**, ilk yıl servis ve bakım ücretsiz, 2. yıl 1.000 TL, sonraki yıllarda yıllık ücret enflasyon (TÜFE) oranında güncellenir. Taahhüt yok: müşteri ilk yılın sonunda (ve sonraki her yenilemeden önce) servisi ücretsiz iptal edebilir. Ek özellikler ayrı satılır.

Müşteri yolculuğu:
siteye girer → fiyatı görür → (isterse "Neden Web Sitesi?" sayfasında araştırmaları okur) → "Web Siteni Şimdi Başlat" veya "Kendi Paketini Oluştur" → bilgilerini girer → ek özellik seçer, gerekirse teklif ister → öder → proje başlangıç formunu doldurur (hemen ya da erişim bağlantısıyla sonra).

## 2. Mevcut durum
`index.html`: tek dosya. İçeriği:
- React 18 + htm (jsdelivr, sürümü sabit, SRI ile doğrulanır),
- Manrope yazı tipi dosyanın içine gömülü (Google Fonts'a istek yok; KVKK açısından üçüncü tarafa IP aktarımı azalır),
- elle yazılmış CSS,
- derlenmiş Tailwind preflight ve birkaç yerleşim yardımcısı (ikinci `<style>` bloğu).

Derleme adımı yok.

Sayfalar (hash yönlendirme):

| Adres | Sayfa |
|---|---|
| `#/` | Ana sayfa |
| `#/neden` | Neden Web Sitesi? |
| `#/ucretlendirme` | Ücretlendirme |
| `#/siparis` | Sipariş (4 adım) |
| `#/baslangic` | Proje formu (`?t=` erişim bağlantısıyla da açılır) |
| `#/blog`, `#/blog/<slug>` | Blog listesi ve yazılar (`BLOG` dizisi) |
| `#/yasal/<id>` | Yasal metinler: `kvkk`, `cerez`, `mesafeli`, `iade`, `kosullar`, `ileti` |
| bilinmeyen adres | "Sayfa bulunamadı" |

**Simüle edilen (gerçek değil):**
- **Ödeme (`PaymentProvider`):** 0002 ile biten kart reddedilir, diğerleri geçer. Bireysel fatura için test T.C. no: `10000000146`.
- **Backend (`Backend`):** Kayıtlar `localStorage["vitrin:orders"]` içinde. Açık sipariş kimliği `vitrin:active`, ödeme öncesi taslak `vitrin:draft` içinde tutulur. Taslak 7 gün ömürlüdür ve ödeme sonrası silinir.
- **Erişim token'ı:** İstemcide üretilir ve kayıtta düz durur. Üretimde sunucu üretmeli, yalnızca özetini saklamalı, e-postayla göndermeli.
- **Dosya yükleme:** Yalnızca ad ve boyut kaydedilir.
- **Teklif süreci:** Teklif hazırlama, onay ve ödeme bağlantısı yok. Arayüzde yalnızca talep ve açıklama var; akışın kendisi backend işi (bölüm 8).
- **Yasal metinler:** Taslak yer tutucu (`LEGAL` sabiti). Her birinde bulunması gerekenler listeli.

## 3. Kod yapısı (`index.html` içi, sırayla)
1. **`<head>`:** meta, JSON-LD (fiyat 5000), `referrer` politikası, fontlar.
2. **`<style>`:** tüm CSS. Renkler `:root` değişkenlerinde, yalnızca açık tema. Ardından derlenmiş Tailwind bloğu gelir; yeni bir Tailwind sınıfı eklenirse blok yeniden derlenmeli ya da sınıf CSS'e elle yazılmalı.
3. **Kütüphaneler:** SRI'lı `<script>` etiketleri.
4. **Uygulama çekirdeği:**
   - Yapılandırma: `BASE_PRICE`, `YEARLY`, `PRICING_VERSION`, `VAT_INCLUDED`.
   - Veri: `SECTORS`, `INCLUDED`, `ADDONS`, `QUOTE_ADDONS`, `FAQS`, `WHY`, `PROCESS`, `HERO_DEMOS`, `REFERENCES`.
   - Güvenlik yardımcıları: `LIMITS`, `FILE_RULES`, `clean`, `RX`, `phoneOk`, `rand`, `token`, `validTCKN`.
   - Veri katmanı: `Backend`, `buildRecord`, `recordToOrder`, `isRecord`, `PaymentProvider`, `LS`, `initOrder`, yönlendirme yardımcıları.
5. **Ortak arayüz:** `Modal`, `LegalModal`, `Header`, `CheckoutHeader`, `Footer`, `AnimatedNumber`, `SectionHead`, mockup bileşenleri.
6. **Ana sayfa:** `Hero`, `OfferPanel` (ana sayfa ve ücretlendirme ortak), `PriceOffer`, `WhyWebsite`, `IncludedFeatures`, `Process`, `AnnualService`, `About`, `FAQ`, `FinalCTA`, `Home`.
7. **Ücretlendirme:** `AddonPriceList` (salt okunur fiyat listesi), `PricingPage`.
8. **Neden Web Sitesi?:** `Trend`, `WHY_MAP`, `WHY_SOURCES`, `WhyPage`.
9. **Sipariş:** `AddonList`, `QuoteAddons`, `QuoteNote`, `OrderSummary`, `Stepper`, `Shell`, `Field`, `Inp`, `BusinessInfoStep`, `PackageStep`, `DemoCardForm`, `PaymentStep`, `AccessLink`, `SuccessStep`, `Checkout`.
10. **Proje formu:** `FileField`, `ProjectOnboarding`.
11. **`App`.**

## 4. Fiyatlar
| Kalem | Fiyat |
|---|---|
| Temel web sitesi | 5.000 TL |
| Blog | 2.000 TL |
| Online Randevu | 3.000 TL |
| Gelişmiş Form | 1.250 TL |
| Ürün / Hizmet Kataloğu | 2.000 TL |
| Çoklu Dil | 2.500 TL |
| Online Ödeme, Yönetim Paneli, Özel İstek | Teklif ile |
| Servis: 1. yıl / 2. yıl / sonrası | 0 TL / 1.000 TL / TÜFE oranında güncellenir |

Fiyat değişikliği yalnızca `BASE_PRICE`, `YEARLY` ve `ADDONS` üzerinden yapılır. Sitedeki tüm metinler bu sabitlerden üretilir. İstisna `<head>` içindeki başlık, meta ve JSON-LD'dir; bunlar elle güncellenmeli. Fiyat değişince `PRICING_VERSION` da artırılmalı.

## 5. Tasarım ve içerik kararları

**v4 değişiklikleri:**
- **Renk (v5):** Lacivert yalnızca logoda (`--logo:#1F2F6B`, logo noktası). Sitenin geri kalanı monokrom: butonlar, onay işaretleri ve bağlantılar siyah (`--brand:#111114`), hero'nun ilk satırı gri.
- **Ana sayfa sırası:** Hero → Neden web sitesi (6 kutu, 2×3 düzen) → Paket (fiyat + dahil olanlar tek panelde, açıklamalarıyla) → Süreç → Yıllık servis → Hakkımızda → SSS → Son çağrı. Eski "fiyat paneli" ve ayrı "Neler dahil?" bölümü tek bölümde birleşti; hero'daki butonun hemen altında ikinci bir başlatma butonu yok.
- **Mobil başlatma çubuğu** (`StickyCTA`): yalnızca 768 px altında, ilk ekran geçilince görünür, alt bilgiye gelince gizlenir.
- **Buton dili:** Birincil eylem her yerde **"Web Sitesi Edinin"**: hero, paket paneli, ücretlendirme, Neden Web Sitesi?, blog yazıları, son çağrı, üst menü, mobil menü ve mobil alt çubuk (sahibinin kararı, v5.1). İkincil: "Paket Detaylarını İnceleyin", "Paketinizi Oluşturun", "Araştırmaları İnceleyin". Sipariş içindeki adım butonları kalıplaşmış arayüz fiilleriyle kaldı ("Devam Et", "Ödemeye Geç", "… TL Öde").
- **Instagram:** başlıkta (1024 px ve üstü), mobil menüde ve alt bilgide. Adres `INSTAGRAM_URL` sabitinde; şu an Instagram ana sayfasına gidiyor, hesap adresiyle değiştirilmeli.
- **Alt bilgi:** sayfalar, altı yasal metin ve 6563 sayılı Kanun gereği "Satıcı bilgileri" (unvan, adres, e-posta, telefon, MERSİS, KEP, vergi bilgisi). Bilgiler `COMPANY` sabitinde, köşeli parantezli yer tutucular doldurulmalı.
- **Mobil uyum:** 320, 360, 390, 414, 768, 1024 ve 1280 px genişliklerde tüm sayfalar, sipariş adımları, pencere ve menü otomatik olarak yatay taşma için tarandı; bulunan taşmalar (uzun e-posta, dar ekranda pencere) düzeltildi. Başlıklarda dengeli satır kırılımı, uzun kelime ve adreslerde güvenli kırılma, çentikli telefonlar için güvenli alan boşlukları var.


**Görsel dil:** Sade ve monokrom. Tek vurgu rengi mavi ve yalnızca küçük öğelerde kullanılır. Yazı tipi Manrope. Animasyon yalnızca hero yüklenişi, toplam sayacı ve başarı işaretinde var.

**CTA'lar ve paket oluşturma:**
- Ana CTA "Web Siteni Şimdi Başlat", menüde "Web Siteni Başlat".
- "Kendi Paketini Oluştur" butonları da sipariş adım 1'e ("Önce işletmenizi tanıyalım") gider; paket adım 2'de oluşturulur.
- Ana sayfadaki hesaplayıcı kaldırıldı. Ücretlendirme sayfasında yalnızca salt okunur fiyat listesi var.

**Neden Web Sitesi?:** "Web sitesi, işletmenizin 7/24 açık vitrinidir." bölümü ana sayfada duruyor. Bölümdeki "Araştırmalarla inceleyin" butonu ve menüdeki "Neden Web Sitesi?" ayrı `#/neden` sayfasına gider.

**Neden Web Sitesi? sayfasındaki veriler.** Bir veri değiştirilirse kaynağı da güncellenmeli.

| Veri | Kaynak |
|---|---|
| İnternet kullanımı: 2024 %88,8 → 2025 %90,9 → 2026 %92,3 | TÜİK Hanehalkı BT Kullanım Araştırması (16-74 yaş) |
| İnternetten satın alma/sipariş: 2024 %51,7 → 2025 %55,7 → 2026 %60 | TÜİK, aynı araştırma |
| İnternet kullananların %90'ı WhatsApp kullanıyor | TÜİK, 2026 |
| Yakındaki bir şeyi telefondan arayanların %76'sı bir gün içinde ilgili işletmeyi ziyaret ediyor; bu aramaların %28'i satın almayla sonuçlanıyor | Google, 2016, ABD |
| 3 saniyeden uzun açılan mobil sitelerde ziyaretlerin %53'ü yarıda bırakılıyor | Google, 2016 |
| Katılımcıların %46,1'i güvenilirliği kısmen görsel tasarıma bakarak değerlendirdi | Stanford Web Credibility Project, 2002 (2.684 katılımcı) |
| Görsel ilk izlenim yaklaşık 50 ms'de oluşuyor | Lindgaard vd., 2006 |

Sayfada, yurt dışı verilerin Türkiye'ye ait birebir oranlar olmadığı açıkça yazıyor. TÜİK kaynağı veri portalına bağlanıyor; bülten yayımlandıkça doğrudan bülten bağlantısıyla değiştirilebilir.

**Sosyal kanıt:** Sahte sosyal kanıt yok. Gerçek referanslar `REFERENCES` dizisine `{name, business, text}` olarak eklenir.

## 6. Sipariş modeli

**Durumlar:**
- Ödeme: `pending` → `payment_started` → `paid` (+ `cancelled`, `refunded`).
- Proje: Yeni Sipariş → Bilgiler Bekleniyor → Tasarım → Geliştirme → Revizyon → Yayına Hazır → Yayında.

**Kimlikler:**
- `id`: `ord_` + 16 karakter, iç kimlik.
- `orderNo`: 6 hane, müşteriye gösterilir, asla erişim anahtarı olarak kullanılmaz.
- `accessToken`: 24 karakter (~120 bit), proje formuna erişim.

**Teklif talepleri** (`order.quotes`, kayıtta `quoteRequests`):
- Kapsam: Online Ödeme, Yönetim Paneli, Özel İstek.
- Özel İstek seçilince metin alanı açılır (en az 10, en fazla 1000 karakter). Metin `quoteRequests[].note` olarak kaydedilir.
- Teklifler sipariş tutarına eklenmez.
- Teklif seçiliyken özet "Şimdi ödenecek" der ve bir açıklama gösterir: bu kalemler tutara dahil değildir, teklif iletilecektir, onaylanırsa müşteri güvenli ödeme sayfasına yönlendirilir, onaylanmazsa ek ödeme yoktur.
- Başarı ekranında aynı bilgi tekrar edilir.

**Fatura:**
- Bireysel: ad soyad + T.C. no (algoritma kontrolü).
- Kurumsal: ünvan + 10 haneli vergi no + vergi dairesi.

**Onaylar:** İlk üçü zorunludur, dördüncüsü isteğe bağlıdır; hepsi zaman damgasıyla kayda yazılır (`consents.marketing` dahil):
- KVKK aydınlatma metni: "bilgilendirildim" beyanı, rıza değil.
- Ön bilgilendirme formu + mesafeli satış sözleşmesi.
- Kullanım koşulları.
- (İsteğe bağlı, işaretsiz gelir) Ticari elektronik ileti onayı. İşaretlenirse İYS'ye kaydedilmesi gerekir.

**Cayma hakkı akışı:** Sözleşme ödemeyle kurulur; 14 günlük cayma süresi işler. Tasarım çalışması, müşteri proje formunda "tasarım çalışmasının hemen başlamasını talep ediyorum" kutusunu işaretleyip içeriklerini gönderince başlar (Mesafeli Sözleşmeler Yönetmeliği md. 15/1-h istisnası). Bu onay `content.serviceStartConsentAt` olarak kaydedilir. Onay verilmeden cayma hakkı sürer ve tam iade yapılır. Adım 1'de ve proje formunda KVKK aydınlatma bağlantısı, veri toplandığı anda gösterilir.

## 7. Güvenlik

### 7a. Prototipte yapılanlar
- **Kütüphane bütünlüğü:** React, ReactDOM ve htm sürümü sabit, `integrity` (SHA-384) ve `crossorigin` ile yüklenir. CDN'deki dosya değişirse tarayıcı çalıştırmaz. Tailwind CDN yok.
- **XSS:** Tüm kullanıcı verisi React ile kaçışlanarak basılır. `dangerouslySetInnerHTML` yalnızca sabit ikon SVG'lerinde kullanılır. Kullanıcının girdiği adresler hiçbir zaman bağlantı olarak basılmaz.
- **Girdi:**
  - Her alanda uzunluk sınırı (`LIMITS`) ve kontrol karakteri temizliği (`clean`) var.
  - Biçim doğrulama `RX` (e-posta, adres, Instagram, token, sipariş kimliği), `phoneOk` ve `validTCKN` ile yapılır.
  - Sektör ve tasarım tercihi yalnızca listedeki değerlerden kabul edilir; renkler `#RRGGBB` biçiminde süzülür.
- **Depo verisi güvenilmez kabul edilir:**
  - `localStorage`'dan okunan kayıt ve taslaklar biçim kontrolünden geçer.
  - Bilinmeyen ek özellik ve teklif kimlikleri elenir, bozuk veri silinir.
  - Taslak 7 günde, ödeme sonrasında ise hemen silinir.
- **Rastgelelik:** `crypto.getRandomValues` ile reddetmeli örnekleme kullanılır (modulo yanlılığı yok). Güvensiz `Math.random` yedeği kaldırıldı.
- **Erişim bağlantısı:**
  - Token biçimi doğrulanmadan arama yapılmaz.
  - Token URL'nin `#` kısmında olduğu için sunucu günlüklerine ve `Referer` başlığına girmez.
  - Kullanıcıya "kimseyle paylaşmayın" uyarısı gösterilir.
- **Bot tuzağı:** Adım 1'de görünmeyen bir alan var; doluysa form ilerlemez.
- **Ödeme:**
  - Kart verisi yalnızca bileşen durumunda tutulur, kaydedilmez ve başarıdan sonra silinir. CVV alanı gizli.
  - Çift gönderim engelli.
  - Üst üste 3 red sonrası 30 saniye bekleme uygulanır.
- **Dosyalar:** Tür (MIME), boyut (10 MB) ve adet (20) sınırı var.
- **Diğer:** `referrer` politikası `strict-origin-when-cross-origin`; dış bağlantılar `noopener noreferrer`.

### 7b. İstemcide yapılamayan, sunucuda mutlaka yapılması gerekenler
Tarayıcıdaki hiçbir kontrol bir güvenlik sınırı değildir; kullanıcı hepsini atlayabilir. Gerçek güvenlik aşağıdakilerle sağlanır.

**HTTP güvenlik başlıkları.** Next.js `headers()` ya da sunucu yapılandırmasıyla eklenir:
```
Content-Security-Policy: default-src 'none'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' <ödeme-sağlayıcı-api>; frame-src <ödeme-sağlayıcı-iframe>; form-action 'self' <ödeme-sağlayıcı>; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self <sağlayıcı>)
Cross-Origin-Opener-Policy: same-origin
```
Next.js'e geçince satır içi betik kalmayacağı için `script-src` yalnızca `'self'` olabilir (nonce ile). `#/baslangic` sayfası için `X-Robots-Tag: noindex` eklenmeli.

**Diğer sunucu kontrolleri:**
- **Doğrulama:** Her uç nokta girdisini bir şemayla (ör. Zod) doğrular; kurallar `LIMITS`/`RX` ile aynıdır. Fazladan alanlar reddedilir.
- **Fiyat:**
  - Toplam sunucuda `ADDONS`'tan yeniden hesaplanır.
  - İstemciden gelen fiyat ve teklif tutarı kullanılmaz.
  - `pricingVersion` eskiyse müşteri güncel fiyatla onaya döner.
- **Ödeme:**
  - Hosted checkout kullanılır (iyzico, PayTR vb.).
  - `paid` durumuna yalnızca imzası doğrulanmış webhook ile geçilir.
  - Webhook idempotent çalışır; ödeme oturumu açarken idempotency anahtarı kullanılır.
- **Erişim token'ı:**
  - Sunucu üretir; veritabanında yalnızca SHA-256 özeti tutulur.
  - Karşılaştırma sabit zamanlı yapılır.
  - İsteğe bağlı bir son kullanma tarihi eklenebilir.
- **Hız sınırı:**
  - Sipariş oluşturma, ödeme oturumu, token ile erişim ve dosya yükleme uç noktalarında IP ve e-posta bazlı sınır uygulanır.
  - Bot tuzağı alanı (`company_website`) sunucuda da kontrol edilir. Gerekirse Cloudflare Turnstile eklenir.
- **CSRF:** Oturum çerezi kullanılırsa çerez `SameSite=Lax/Strict`, `HttpOnly` ve `Secure` olmalı. Durum değiştiren isteklerde CSRF koruması uygulanır.
- **Dosyalar:**
  - Yükleme önceden imzalı adresle yapılır.
  - Sunucuda içerik türü sihirli baytlarla doğrulanır, boyut sınırlanır, virüs taraması yapılır.
  - Dosyalara rastgele ad verilir ve herkese açık olmayan bir kovada tutulur.
  - SVG'ler temizlenmeden gösterilmez.
- **Yönetici paneli:** Güçlü kimlik doğrulama + iki adımlı doğrulama, rol bazlı yetki ve işlem günlüğü.
- **Veri:**
  - KVKK'ya uygun saklama süreleri, veritabanı şifreleme, yedekleme ve erişim günlükleri.
  - Gizli anahtarlar ortam değişkenlerinde tutulur.
  - Bağımlılıklar düzenli taranır (npm audit/Dependabot).

## 8. Gerçek backend planı
Önerilen yapı: Next.js (App Router) + PostgreSQL (Prisma) + S3 uyumlu depolama.

```prisma
model Order {
  id              String   @id @default(cuid())
  orderNo         String   @unique
  customerName    String
  email           String
  phone           String
  brand           String
  sector          String
  site            String?
  instagram       String?
  whatsapp        String?
  wishes          String?
  package         String   @default("temel")
  pricingVersion  String
  addons          Json     // [{id,name,price}]
  total           Int      // sunucuda hesaplanır
  invoice         Json     // {type,title,taxId,taxOffice,address}
  consents        Json     // {kvkk,distance,terms,at} + metin sürümleri
  accessTokenHash String?  @unique
  paymentStatus   PaymentStatus @default(pending)
  paymentRef      String?
  projectStatus   ProjectStatus @default(YeniSiparis)
  createdAt       DateTime @default(now())
  paidAt          DateTime?
  content         ContentForm?
  files           OrderFile[]
  quotes          Quote[]
  renewals        ServiceRenewal[]
}
model Quote {                       // Online Ödeme / Yönetim Paneli / Özel İstek
  id          String   @id @default(cuid())
  orderId     String
  kind        String   // odeme | panel | ozel
  note        String?  // özel istek metni
  amount      Int?     // yönetici girer
  status      QuoteStatus @default(requested)
  tokenHash   String?  @unique   // müşteriye giden onay bağlantısı
  paymentRef  String?
  createdAt   DateTime @default(now())
}
model ServiceRenewal { id String @id @default(cuid()) orderId String periodStart DateTime periodEnd DateTime amount Int status String paymentRef String? }
model ContentForm { id String @id @default(cuid()) orderId String @unique data Json }
model OrderFile   { id String @id @default(cuid()) orderId String kind String key String name String size Int mime String }
enum PaymentStatus { pending payment_started paid cancelled refunded }
enum ProjectStatus { YeniSiparis BilgilerBekleniyor Tasarim Gelistirme Revizyon YayinaHazir Yayinda }
enum QuoteStatus { requested sent accepted paid declined expired }
```

Uç noktalar:
- **Sipariş ve ödeme:** `POST /api/orders`, `POST /api/payments/session`, `POST /api/webhooks/payment`. `paid` durumuna yalnızca webhook uç noktasında geçilir.
- **Erişim bağlantısı:** `GET /api/orders/by-token/:token`, `POST /api/orders/by-token/:token/content`.
- **Teklif akışı** (sitedeki metin bu akışı vaat ediyor):
  1. Yönetici panelinde teklif tutarı girilir, `Quote.status=sent` olur.
  2. Müşteriye tek kullanımlık bağlantıyla e-posta gider.
  3. Müşteri teklifi görür ve onaylar; teklif tutarı için ayrı bir ödeme oturumu açılır.
  4. Webhook ile `paid` olur. Müşteri reddederse durum `declined` olur ve ücret alınmaz.
- **Yıllık servis:**
  - 1. yıl bitmeden hatırlatma e-postası ve ödeme bağlantısı gönderilir.
  - Müşteri ödemezse servis yenilenmez; iptal ücretsizdir.
  - 3. yıldan itibaren tutar TÜFE ile güncellenir ve yenilemeden önce bildirilir.

## 7c. Yasal uyum özeti (araştırma sonucu)
Sitede taslak olarak bulunanlar ve dayanakları:

| Metin / öğe | Dayanak |
|---|---|
| KVKK Aydınlatma Metni (veri sorumlusu, veriler, amaçlar, hukuki sebepler, aktarım, yurt dışı, saklama, md. 11 hakları, başvuru) | 6698 sayılı KVKK md. 10–11, Aydınlatma Tebliği, Başvuru Tebliği |
| Yurt dışı aktarım ifadesi (yeterlilik kararı / standart sözleşme) | KVKK md. 9 (7499 sayılı Kanunla değişik, 1 Haziran 2024) |
| Çerez ve Yerel Depolama Politikası (yalnızca zorunlu depolama, izin gerektirmez) | KVKK Çerez Uygulamaları Rehberi |
| Ön Bilgilendirme Formu + Mesafeli Satış Sözleşmesi (siparişe özel tutar tablosu dahil) | 6502 sayılı Kanun, Mesafeli Sözleşmeler Yönetmeliği (md. 9, 11, 15) |
| İptal ve İade Politikası | Aynı |
| Kullanım Koşulları | Genel |
| Ticari Elektronik İleti Onay Metni (isteğe bağlı, İYS, 3 iş günü içinde ret) | 6563 sayılı Kanun md. 6–8 |
| Satıcı bilgileri alt bilgide; sözleşme öncesi bilgi, veri girişini düzeltme imkânı | 6563 sayılı Kanun md. 3 |

Yayından önce yapılması gerekenler:
- Tüm metinler bir hukukçuya okutulmalı; köşeli parantezli işletme kararları doldurulmalı (saklama süreleri, revizyon ve teslim, fikri haklar ve alan adı, çalışma başladıktan sonraki iptal, yıllık servis iadesi, yenileme bildirim süresi).
- KVKK metnine kullanılan hizmet sağlayıcıların (hosting, e-posta, ödeme) adları ve ülkeleri yazılmalı; yurt dışı sağlayıcılar için standart sözleşme imzalanıp 5 iş günü içinde Kuruma bildirilmeli.
- VERBİS kaydı yükümlülüğünün (çalışan sayısı ve ciro eşiklerine göre muafiyet olabilir) ve ETBİS kaydının gerekip gerekmediği mali müşavirle teyit edilmeli.
- Pazarlama iletisi gönderilecekse İYS'ye kayıt olunmalı.
- Sipariş onayı ve sözleşme örneği e-postası (kalıcı veri saklayıcısı) backend ile gönderilmeli; sitede bu vaat ediliyor.
- Canlı sürümde React/htm dosyaları da kendi sunucudan sunulmalı; böylece CDN'e IP aktarımı kalmaz ve Çerez Politikası'ndaki ilgili cümle sadeleşir.

## 7d. Blog
- Yazılar `BLOG` dizisinde (slug, `cover`, tarih, başlık, özet, bloklar). Blog listesi, "Neden Web Sitesi?" kutularıyla aynı dilde yuvarlak köşeli kartlardan oluşur; her kartın üstünde bir kapak görseli var. Kapaklar `BlogCover` bileşeninde dosyanın içinde çizilmiş SVG'lerdir (`browser`, `map`, `search`); dış görsel yüklenmez. Yeni yazıya bu üçünden birini verin ya da yeni bir çizim ekleyin. Canlı sürümde gerçek fotoğraf kullanılacaksa sıkıştırılmış WebP/AVIF, `width`/`height` ve `loading="lazy"` ile eklenmeli. Üç yazı var: web sitesi ve Instagram karşılaştırması, Google İşletme Profili rehberi, küçük işletmeler için 7 adımda temel SEO. Yazılardaki rakamlar "Neden Web Sitesi?" sayfasındaki doğrulanmış kaynaklarla aynı; TÜİK 2026 Instagram oranı (%71,1) ek olarak kullanıldı.
- **Önemli:** Hash tabanlı adresler (`#/blog/...`) arama motorlarınca ayrı sayfa olarak dizinlenmez. Blogun SEO değeri için Next.js'e geçişte her yazı `/blog/<slug>` adresinde, sunucuda üretilmiş (SSG) bir sayfa olmalı; başlık, açıklama, `Article` yapısal verisi ve site haritası eklenmeli.

## 9. Yapılacaklar
- [ ] Backend, ödeme sağlayıcısı, teklif akışı ve yıllık servis yenilemesi
- [ ] Bölüm 7b'deki tüm sunucu güvenlik maddeleri
- [ ] Dosya yükleme, yönetici paneli, e-posta bildirimleri
- [ ] Hukuki metinler (avukatla):
  - KVKK aydınlatma metni
  - Ön bilgilendirme formu + mesafeli satış sözleşmesi (cayma hakkı ve istisnası, yıllık ücret güncelleme ve iptal koşulları dahil)
  - Kullanım koşulları
- [ ] Alan adı, OG görseli, Lighthouse ve erişilebilirlik denetimi
- [ ] Gerçek referanslar geldikçe `REFERENCES`'a ekleme

## 10. Sahibinden netleşmesi gerekenler
- **Marka adı:** "Vitrin" şu an yer tutucu.
- **Satıcı bilgileri** (`COMPANY`) ve **Instagram adresi** (`INSTAGRAM_URL`).
- **KDV:** Prototip "KDV dahil" gösteriyor (`VAT_INCLUDED=true`).
- **Yıllık ücret:**
  - 2. yıl 1.000 TL sabit mi, yoksa o da sipariş tarihinden itibaren TÜFE ile mi güncellenecek? Sitede "2. yıl 1.000 TL, sonraki yıllarda TÜFE oranında" yazıyor.
  - Bildirim süresi (ör. 30 gün) sözleşmede belirtilmeli.
- **İptal sonrası:**
  - Servis iptal edilince site ne olacak?
  - Alan adı ve barındırma kime ait? Dosyalar müşteriye teslim edilecek mi?
  - "Taahhüt yok" vaadi bu cevaplarla birlikte sözleşmeye yazılmalı.
- **Teklif:** Yanıt süresi ve teklifin geçerlilik süresi.
- **Hizmet kapsamı:** Revizyon hakkı ve teslim süresi.
- **Ödeme:** Ödeme sağlayıcısı ve fatura süreci.

## 11. Test notu
Headless Chromium ile uçtan uca test edildi; konsolda hata yok. v4'te ayrıca 320, 390 ve 1280 px'te tam sipariş akışı (menü, paket kaydırması, mobil çubuk, üç adım, sözleşme penceresi ve sipariş tablosu, başarı, onaysız gönderimin engellenmesi, gönderim) ve 7 genişlikte tüm sayfalarda taşma taraması yapıldı. Önceki senaryolar:
- Ana sayfa, `#/neden` ve ücretlendirme sayfalarının görüntülenmesi.
- "Kendi Paketini Oluştur" butonunun adım 1'e gitmesi.
- Adım 1 doğrulamaları ve düzeltilen alanda hatanın kaybolması.
- Özel İstek boşken ilerlemenin engellenmesi.
- Teklif açıklaması ve "Şimdi ödenecek" etiketi.
- Üç red sonrası bekleme ve ardından başarılı ödeme.
- Kayıtta `pricingVersion` ve `quoteRequests[].note` alanları.
- Bozuk `localStorage` verisiyle açılış ve biçimi bozuk token.
- Mobil görünüm (390 px).

SRI özetleri npm paketlerinden hesaplandı. jsdelivr `/npm/` dosyalarını birebir sunduğu için özetler eşleşir. Kütüphane sürümü değişirse özetler yeniden hesaplanmalı:

```
openssl dgst -sha384 -binary dosya.js | openssl base64 -A
```
