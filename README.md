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

Derleme adımı yoktur. `index.html` dosyasını bir tarayıcıda açmanız yeterlidir.

Yerel sunucuyla açmak isterseniz:

```bash
python3 -m http.server 8000
# ardından http://localhost:8000 adresini açın
```

Demo ödemede `0002` ile biten kart numaraları reddedilir, diğerleri kabul edilir. Bireysel fatura için test T.C. kimlik no: `10000000146`.

## Teknoloji

- Tek dosya: `index.html`
- React 18 ve htm (jsdelivr, sürümü sabit, SRI ile doğrulanır)
- Elle yazılmış CSS; derlenmiş Tailwind preflight ve birkaç yerleşim yardımcısı
- Manrope yazı tipi dosyanın içine gömülüdür (SIL Open Font License 1.1)

Planlanan canlı sürüm: Next.js + PostgreSQL + hosted ödeme sağlayıcısı (DEVIR-BELGESI.md, bölüm 8).

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Sitenin tamamı (sayfalar, sipariş akışı, blog, yasal metinler) |
| `DEVIR-BELGESI.md` | Projeyi devralacak geliştirici için ayrıntılı belge |
| `README.md` | Bu dosya |
