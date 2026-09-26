# Supabase kurulumu (sipariş verisi)

Bu belge, tamamlanan siparişlerin `localStorage`'ın yanında **Supabase**'deki gerçek bir
veritabanı tablosuna da yazılmasını sağlayan kurulumu anlatır. Şu an yalnızca **veri**
katmanı içindir — ödeme hâlâ `src/lib/payment.ts`'teki simülasyondur (planlanan sağlayıcı:
**iyzico**, bkz. DEVIR-BELGESI.md bölüm 8). Bu bölüm, iyzico entegre edilene kadar
Google E-Tablo bildirimiyle (`SIPARIS-TAKIBI.md`) birlikte paralel çalışır; ikisi de
isteğe bağlıdır ve birbirini etkilemez.

## 1. Proje oluştur

1. [supabase.com](https://supabase.com) hesabınızla giriş yapın, **New project** deyin.
2. Bölge olarak Avrupa'ya yakın birini seçin (ör. `eu-central-1`), güçlü bir veritabanı
   şifresi belirleyin (bu şifreyi saklamanız gerekmiyor, panelden yönetiyorsunuz).
3. Proje oluşunca **Project Settings → Data API** kısmından **Project URL**'i,
   **Project Settings → API Keys** kısmından **anon (public) key**'i kopyalayın.

## 2. Şemayı çalıştır

1. Sol menüden **SQL Editor** açın, **New query** deyin.
2. Bu depodaki `supabase/schema.sql` dosyasının tam içeriğini yapıştırıp **Run** deyin.
3. Bu, `orders` tablosunu ve satır düzeyi güvenlik (RLS) kuralını oluşturur: anon anahtarla
   yalnızca **yeni satır eklenebilir**, hiçbir satır **okunamaz/güncellenemez/silinemez**.

## 3. Ortam değişkenlerini ekle

Vercel projesinde (**Settings → Environment Variables**) veya yerel `.env.local`'de:

| Ad | Değer |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | 1. adımdaki Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 1. adımdaki anon (public) key |

Kaydettikten sonra bir sonraki derleme (Vercel'de otomatik, yerelde `npm run build`)
bu değerlerle çalışır. Tanımlı değillerse `sendOrderToSupabase()` sessizce hiçbir şey
yapmaz — site bu adım atlanmış olsa da normal çalışır.

## 4. Siparişleri görüntüleme

Supabase Dashboard'da **Table Editor → orders**. Proje sahibi olarak giriş yaptığınızda
RLS'yi atlarsınız, tüm satırları görürsünüz. Tabloyu kimseyle paylaşmayın (T.C. kimlik no
gibi hassas veriler `invoice` sütununda bulunabilir).

## Kapsam ve sınırlamalar (bilerek kabul edilen)

- Yalnızca **INSERT**: sipariş tamamlandığında bir satır eklenir. Ödeme durumu güncellemesi,
  erişim token'ıyla sipariş sorgulama, teklif akışı ve yıllık servis yenilemesi henüz burada
  değil — bunlar sunucu tarafı doğrulama (imza kontrolü, fiyat yeniden hesaplama) gerektirir
  ve Supabase Edge Functions ile (iyzico webhook'u dahil) ayrı bir adımda eklenecek
  (bkz. DEVIR-BELGESI.md bölüm 8).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` tarayıcı paketine gömülür (herkese görünür) — bu normaldir,
  Supabase anon anahtarları zaten istemci tarafı kullanım için tasarlanmıştır. Güvenlik,
  anahtarın gizliliğinden değil, RLS politikasının yalnızca eklemeye izin vermesinden gelir.
- Şemada değişiklik gerektiğinde `supabase/schema.sql`'i güncelleyip SQL Editor'de tekrar
  çalıştırın (`create table if not exists` / `drop policy if exists` sayesinde güvenle
  tekrar çalıştırılabilir).
