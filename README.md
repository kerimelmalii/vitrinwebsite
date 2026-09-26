# Vitrin

İşletmeler için 10.000 TL'ye profesyonel web sitesi satan, Türkçe tek sayfalık satış sitesinin **çalışan prototipi**.

Müşteri fiyatı görür, ek özellik seçer, siparişini verir, öder ve web sitesi için içeriklerini proje formundan gönderir. Sitede ayrıca "Neden Web Sitesi?" sayfası, blog ve yasal metinler bulunur.

## Durum

Bu bir **prototiptir**, yayına hazır değildir:

- Ödeme, sipariş kaydı ve dosya yükleme **simüle edilir**. Gerçek ödeme alınmaz; veriler yalnızca tarayıcıda tutulur.
- Yasal metinler **taslaktır**. Köşeli parantezli alanlar doldurulmalı ve metinler bir hukukçu tarafından gözden geçirilmelidir.
- Satıcı bilgileri (`COMPANY`) ve Instagram adresi (`INSTAGRAM_URL`) yer tutucudur.

Ayrıntılar, yapılacaklar ve backend planı için: [DEVIR-BELGESI.md](DEVIR-BELGESI.md). Tamamlanan siparişleri bir Google E-Tablo'da görmek için: [SIPARIS-TAKIBI.md](SIPARIS-TAKIBI.md), Supabase'de bir veritabanı tablosunda görmek için: [SUPABASE-KURULUM.md](SUPABASE-KURULUM.md).

## Çalıştırma

Node.js 20 veya üzeri ve npm gerekir.

```bash
npm install
npm run dev
# http://localhost:3000
```

Üretim derlemesi (statik dışa aktarım, `out/` klasörüne):

```bash
npm run build
npx serve out   # yerel önizleme (herhangi bir statik dosya sunucusu da olur)
```

`out/` klasörü, herhangi bir statik dosya sunucusunda (Vercel, Netlify, Cloudflare Pages, Nginx, S3, ...) doğrudan barındırılabilir; Node.js sunucusu gerekmez.

### GitHub Pages'te önizleme

Depoda `.github/workflows/deploy-pages.yml` hazır: `main`'e her push'ta siteyi derleyip GitHub Pages'e yayınlar. Devreye alması için depo ayarlarında **bir kerelik** şu adım gerekir: **Settings → Pages → Build and deployment → Source** kısmını **"GitHub Actions"** olarak değiştirin (varsayılan "Deploy from a branch" ile çalışmaz). Ardından site `https://<kullanıcı-adı>.github.io/vitrinwebsite/` adresinde yayınlanır.

Bu yalnızca geçici bir önizlemedir; gerçek domain bağlandığında Vercel/Netlify gibi bir servise geçilmesi önerilir (bkz. `next.config.ts`'teki `GITHUB_PAGES` ortam değişkenine bağlı `basePath` ayarı — yalnızca GitHub Pages alt yolu için gereklidir, başka bir barındırmada devre dışıdır).

Demo ödemede `0002` ile biten kart numaraları reddedilir, diğerleri kabul edilir. Bireysel fatura için test T.C. kimlik no: `10000000146`.

## Teknoloji

- **Next.js 16** (App Router) + **React 19**, tamamı **TypeScript**
- Statik dışa aktarım (`output: "export"`): derleme sonucu, sunucu gerektirmeyen saf HTML/CSS/JS dosyalarıdır
- Her sayfa kendi adresinde (`/blog/<slug>`, `/yasal/<id>`) gerçek, önceden üretilmiş (SSG) bir HTML dosyasıdır — arama motorları için doğrudan dizinlenebilir
- Elle yazılmış CSS (`src/app/globals.css`); derlenmiş Tailwind preflight ve birkaç yerleşim yardımcısı korunmuştur
- Manrope yazı tipi dosyanın kendi sunucusundan `woff2` olarak yüklenir (`src/app/fonts`), üçüncü tarafa istek gitmez
- Sipariş durumu React Context ile yönetilir (`src/lib/order-context.tsx`), `localStorage` üzerinde kalıcıdır
- SEO: her sayfa için canonical URL, dinamik Open Graph/Twitter Card görselleri (`next/og`), JSON-LD (`Service`, `FAQPage`, `Article`, `BreadcrumbList`), `sitemap.xml`'de `lastModified`

## Proje yapısı

| Yol | İçerik |
|---|---|
| `src/app/` | Sayfa rotaları (App Router): ana sayfa, `neden`, `ucretlendirme`, `blog`, `siparis`, `baslangic`, `yasal/[id]`, `sitemap.ts`, `robots.ts` |
| `src/components/` | UI bileşenleri (başlık, altbilgi, sipariş adımları, blog, yasal metin gösterimi, ...) |
| `src/lib/` | Yapılandırma, güvenlik/doğrulama yardımcıları, fiyatlandırma, sipariş depolama ve ödeme simülasyonu, tipler |
| `src/data/` | İçerik: sektörler, ek özellikler, SSS, yasal metinler, blog yazıları, satıcı bilgileri |
| `src/app/fonts/` | Manrope `woff2` dosyaları |
| `src/app/og-fonts/` | Manrope `ttf` dosyaları (yalnızca derleme sırasında Open Graph görselleri için, `next/og` woff2 desteklemez) |
| `src/lib/order-webhook.ts` | Ödeme tamamlanınca sipariş özetini Google E-Tablo'ya bildiren yardımcı (bkz. SIPARIS-TAKIBI.md) |
| `src/lib/supabase-order.ts` | Ödeme tamamlanınca sipariş kaydını Supabase'e yazan yardımcı (bkz. SUPABASE-KURULUM.md) |
| `supabase/schema.sql` | Supabase `orders` tablosu ve RLS politikası |
| `DEVIR-BELGESI.md` | Projeyi devralacak geliştirici için ayrıntılı belge |
| `SIPARIS-TAKIBI.md` | Sipariş bildirimi (Google E-Tablo) kurulum rehberi |
| `SUPABASE-KURULUM.md` | Sipariş verisi (Supabase) kurulum rehberi |

Planlanan canlı sürüm: bu statik önyüz + Supabase (veri) + iyzico (ödeme), sunucu tarafı mantık Supabase Edge Functions'ta (DEVIR-BELGESI.md, bölüm 8).

## Güvenlik

- `npm audit` temiz (0 bilinen açık), `package-lock.json` tüm sürümleri kilitler.
- Üretim derlemesinde bir **Content-Security-Policy** uygulanır (`src/app/layout.tsx`); dış ağ isteklerini yalnızca kendi origin'ine, SIPARIS-TAKIBI.md'deki Google Apps Script adresine ve SUPABASE-KURULUM.md'deki Supabase projesine izin verecek şekilde kısıtlar.
- Tüm kullanıcı girdisi uzunluk/biçim doğrulamasından geçer (`src/lib/security.ts`); T.C. kimlik no algoritma kontrolü, bot tuzağı, dosya türü/boyut/adet sınırı dahil. Bunlar yalnızca istemci tarafı kolaylıktır — gerçek bir backend eklenince sunucu tarafında da uygulanmalıdır (bkz. DEVIR-BELGESI.md bölüm 7b).
- `vercel.json`, gerçek bir sunucuya (Vercel) geçilince otomatik uygulanacak tam HTTP güvenlik başlığı setini (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`) içerir. **GitHub Pages bu başlıkları hiçbir şekilde desteklemez** — bu yüzden GitHub Pages yalnızca geçici bir önizleme olarak düşünülmelidir, nihai barındırma olarak değil.
- Ayrıntılı tehdit modeli ve sunucu tarafında yapılması gerekenler için DEVIR-BELGESI.md bölüm 7.
