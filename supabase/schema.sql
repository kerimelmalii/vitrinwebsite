-- Vitrin: Supabase şeması ve RLS
-- Kurulum adımları: SUPABASE-KURULUM.md. Bu dosyayı Supabase Dashboard'da
-- SQL Editor'e yapıştırıp çalıştırın.
--
-- Bu tablo yalnızca sipariş VERİSİ tutar; ödeme (iyzico) ve erişim token'ı ile
-- güncelleme gibi sunucu mantığı gerektiren işler henüz burada değil
-- (bkz. DEVIR-BELGESI.md bölüm 8). RLS, anon anahtarla yalnızca satır EKLENMESİNE
-- izin verir; hiçbir satır anon anahtarla okunamaz/güncellenemez/silinemez.
-- Siparişleri görüntülemek için Supabase Dashboard'daki Table Editor'ü kullanın
-- (proje sahibi olarak giriş yaptığınızda RLS'yi atlar).

create table if not exists orders (
  id text primary key,
  order_no text not null unique,
  access_token text,
  pricing_version text not null,
  customer jsonb not null,
  business jsonb not null,
  package text not null default 'temel',
  addons jsonb not null default '[]'::jsonb,
  quote_requests jsonb not null default '[]'::jsonb,
  total integer not null,
  first_year_service integer not null default 0,
  yearly_service integer not null default 0,
  invoice jsonb not null,
  consents jsonb,
  payment_status text,
  payment_ref text,
  project_status text,
  content_form jsonb,
  created_at timestamptz,
  received_at timestamptz not null default now()
);

alter table orders enable row level security;

drop policy if exists "anon sipariş ekleyebilir" on orders;
create policy "anon sipariş ekleyebilir"
  on orders
  for insert
  to anon
  with check (true);

-- Not: anon anahtar tarayıcı paketine gömülür (herkese görünür) — bu, Google E-Tablo
-- entegrasyonundaki secret ile aynı kabul: güvenlik anahtarın gizliliğinden değil,
-- politikanın yalnızca EKLEMEYE izin vermesinden ve hiçbir satırın geri okunamamasından gelir.
