# Vitrin

İşletmeler için 5.000 TL'ye profesyonel web sitesi satan, Türkçe tek sayfalık satış sitesinin **çalışan prototipi**.

Müşteri fiyatı görür, ek özellik seçer, siparişini verir, öder ve web sitesi için içeriklerini proje formundan gönderir. Sitede ayrıca "Neden Web Sitesi?" sayfası, blog ve yasal metinler bulunur.

## Durum

Bu bir **prototiptir**, yayına hazır değildir:

- Ödeme, sipariş kaydı ve dosya yükleme **simüle edilir**. Gerçek ödeme alınmaz; veriler yalnızca tarayıcıda tutulur.
- Yasal metinler **taslaktır**. Köşeli parantezli alanlar doldurulmalı ve metinler bir hukukçu tarafından gözden geçirilmelidir.
- Satıcı bilgileri (`COMPANY`) ve Instagram adresi (`INSTAGRAM_URL`) yer tutucudur.

Ayrıntılar, yapılacaklar ve backend planı için: [DEVIR-BELGESI.md](DEVIR-BELGESI.md)

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

## Proje yapısı

| Yol | İçerik |
|---|---|
| `src/app/` | Sayfa rotaları (App Router): ana sayfa, `neden`, `ucretlendirme`, `blog`, `siparis`, `baslangic`, `yasal/[id]`, `sitemap.ts`, `robots.ts` |
| `src/components/` | UI bileşenleri (başlık, altbilgi, sipariş adımları, blog, yasal metin gösterimi, ...) |
| `src/lib/` | Yapılandırma, güvenlik/doğrulama yardımcıları, fiyatlandırma, sipariş depolama ve ödeme simülasyonu, tipler |
| `src/data/` | İçerik: sektörler, ek özellikler, SSS, yasal metinler, blog yazıları, satıcı bilgileri |
| `src/app/fonts/` | Manrope `woff2` dosyaları |
| `DEVIR-BELGESI.md` | Projeyi devralacak geliştirici için ayrıntılı belge |

Planlanan canlı sürüm: bu statik önyüz + PostgreSQL tabanlı bir API + hosted ödeme sağlayıcısı (DEVIR-BELGESI.md, bölüm 8).
