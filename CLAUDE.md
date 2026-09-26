# Vitrin

Türkçe, tek paket (5.000 TL) satan bir web sitesi ajansı satış sitesi. Next.js 16 (App Router) +
TypeScript, statik dışa aktarım (`output: "export"`) — sunucu yok, `out/` klasörü herhangi bir
statik host'ta çalışır. Detaylı iş/hukuk/backend planı: `DEVIR-BELGESI.md`. Genel bakış: `README.md`.

## Durum ve kısıtlar (unutma)

- **Prototip:** ödeme simüle edilir (`0002` ile biten kart reddedilir), siparişler yalnızca
  müşterinin `localStorage`'ında durur. Gerçek backend yok — planlanan: Supabase.
- **Yasal metinler taslak**, köşeli parantezli alanlar dolduruluncaya ve bir hukukçu onaylayana kadar
  gerçek müşteriden veri toplamak için kullanılmamalı.
- Şu an **GitHub Pages**'te yayında (`https://kerimelmalii.github.io/vitrinwebsite/`) — bu geçici bir
  önizleme, GitHub Pages özel HTTP başlığı desteklemez. Gerçek domain + Vercel'e geçilecek
  (`vercel.json` zaten hazır).
- Tamamlanan siparişler isteğe bağlı olarak bir Google E-Tablo'ya bildirilir (`src/lib/order-webhook.ts`,
  kurulum: `SIPARIS-TAKIBI.md`).

## Kod yapısı

- `src/app/` — sayfa rotaları (App Router): `/`, `neden`, `ucretlendirme`, `blog`, `blog/[slug]`,
  `siparis`, `baslangic`, `yasal/[id]`, artı `sitemap.ts`/`robots.ts`.
- `src/components/` — UI; `src/components/checkout/` — sipariş adımları.
- `src/lib/` — yapılandırma, güvenlik/doğrulama (`security.ts`), sipariş durumu (`order-context.tsx`,
  React Context + `localStorage`), sahte backend (`backend.ts`), ödeme simülasyonu (`payment.ts`).
- `src/data/` — statik içerik (fiyatlar, SSS, yasal metinler, blog yazıları, satıcı bilgisi).

## Kurallar

- Kullanıcıya görünen tüm metin **Türkçe**. Yorum yazma alışkanlığı: yalnızca "neden" açık değilse
  kısa bir satır; ne yaptığını anlatan yorum yazma (isimler zaten anlatıyor).
- `next.config.ts`'teki `basePath`/`assetPrefix`, yalnızca `GITHUB_PAGES=true` ortam değişkeniyle
  derlenince devreye girer (repo secrets üzerinden GitHub Actions'ta ayarlanır).
- CSS tek dosyada elle yazılı (`src/app/globals.css`); yeni bir sınıf gerekiyorsa oraya elle eklenir
  (derlenmiş bir Tailwind aracı yok).

## Değişiklik yaptıktan sonra her seferinde

```bash
npx tsc --noEmit -p tsconfig.json
npx eslint src --max-warnings=0
rm -rf .next out && npm run build          # normal mod
rm -rf .next out && GITHUB_PAGES=true npm run build   # GitHub Pages modu (en azından build başarısı yeterli)
```

Görsel/davranış doğrulaması için `out/`'u `python3 -m http.server` ile servis edip Playwright ile
gez (checkout akışı, konsol/CSP ihlali kontrolü dahil) — bu oturumdaki önceki denetimlerde kullanılan
betikler `/tmp` altında kalıcı değil, gerektiğinde yeniden yazılır.

## Git akışı

Her özellik: `claude/convert-project-typescript-3jy59p` dalını `origin/main`'den yeniden başlat →
değişiklik → commit → push (`--force-with-lease`, dal zaten squash-merge edildiği için) → PR aç →
squash-merge et. Kullanıcı onayı zaten bu şekilde çalışmaya devam et diye verildi; her PR için tekrar
sorma.
