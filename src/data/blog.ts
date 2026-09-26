import type { BlogPost } from "@/lib/types";

/* ================= BLOG =================
   Yeni yazı eklemek için diziye aynı biçimde bir nesne ekleyin. slug yalnızca küçük harf, rakam ve tire içermelidir.
   Blok biçimi: ["p", metin] | ["h2", başlık] | ["ul", [maddeler]] | ["ol", [maddeler]]. */
export const BLOG: BlogPost[] = [
  {
    slug: "web-sitesi-mi-instagram-mi",
    cover: "browser",
    date: "25 Eylül 2026",
    title: "İşletmeniz için web sitesi mi, yalnızca Instagram mı?",
    excerpt:
      "Instagram ilgi uyandırır, web sitesi kararı kolaylaştırır. İkisinin farkını ve birlikte nasıl daha iyi çalıştıklarını anlatıyoruz.",
    body: [
      [
        "p",
        "Birçok küçük işletme ilk dijital adımını Instagram ile atıyor. Bu doğru bir başlangıç: TÜİK'in 2026 verilerine göre internet kullananların %71,1'i Instagram kullanıyor. Ancak sosyal medya hesabı ile web sitesi aynı işi yapmaz; birbirini tamamlar.",
      ],
      ["h2", "Instagram'ın güçlü olduğu yerler"],
      [
        "ul",
        [
          "Takipçilerinizle hızlı ve samimi iletişim kurmak,",
          "ürün ve hizmetlerinizi görsellerle, günlük olarak göstermek,",
          "kampanyaları ve yenilikleri anında duyurmak.",
        ],
      ],
      ["h2", "Web sitesinin farkı"],
      [
        "p",
        "Sahiplik: Instagram hesabınız platformun kurallarına bağlıdır. Algoritma değiştiğinde erişiminiz düşebilir, hesabınıza erişimde sorun yaşayabilirsiniz. Web siteniz ve alan adınız ise size aittir.",
      ],
      [
        "p",
        "Aramada görünürlük: Birisi Google'da hizmetinizi aradığında karşısına çoğunlukla web siteleri ve Google İşletme Profilleri çıkar. Instagram gönderileri bu aramalarda sınırlı görünür.",
      ],
      [
        "p",
        "Güven: Adresi, çalışma saatleri, hizmetleri ve iletişim bilgileri düzenli sunulan bir site, sizi ilk kez duyan müşteri için güçlü bir güven işaretidir.",
      ],
      ["p", "Kalıcı bilgi: Sık sorulan sorular, hizmet ayrıntıları ve fiyatlar akışta kaybolmaz; müşteri aradığını tek yerde bulur."],
      ["h2", "En iyi sonuç: ikisi birlikte"],
      [
        "p",
        "Instagram biyografinizdeki bağlantıyı web sitenize yönlendirin; sitenizden de Instagram hesabınıza ve WhatsApp'a tek dokunuşla ulaşılabilsin. Böylece takipçiniz müşteriye, müşteriniz takipçiye dönüşür.",
      ],
      ["h2", "Kısa kontrol listesi"],
      [
        "ul",
        [
          "Instagram biyografinizde web sitenizin adresi var mı?",
          "Sitenizde çalışma saatleri, adres ve telefon güncel mi?",
          "WhatsApp butonu telefonda tek dokunuşla çalışıyor mu?",
          "Hizmetleriniz ve fiyatlarınız sitede açıkça yazıyor mu?",
        ],
      ],
    ],
  },
  {
    slug: "google-isletme-profili-rehberi",
    cover: "map",
    date: "22 Eylül 2026",
    title: "Google İşletme Profili nedir, nasıl oluşturulur?",
    excerpt:
      "Google'da ve Haritalar'da görünmenin ücretsiz ve en önemli adımlarından biri. Profilinizi adım adım nasıl oluşturacağınızı anlatıyoruz.",
    body: [
      [
        "p",
        "Google'da veya Google Haritalar'da bir işletme aradığınızda gördüğünüz adres, çalışma saatleri, fotoğraflar ve yorumlardan oluşan bilgi kartı, Google İşletme Profili'dir. Ücretsizdir ve yerel aramalarda görünmenin en önemli adımlarından biridir.",
      ],
      ["h2", "Neden önemli?"],
      [
        "p",
        "Google'ın 2016 verilerine göre, telefonundan yakınındaki bir şeyi arayanların %76'sı bir gün içinde ilgili bir işletmeyi ziyaret ediyor. Bu aramalarda öne çıkan bilgilerin büyük kısmı İşletme Profili'nden gelir.",
      ],
      ["h2", "Adım adım oluşturma"],
      [
        "ol",
        [
          "business.google.com adresine Google hesabınızla girin ve işletmenizin adını yazın.",
          "İşletmenize en uygun ana kategoriyi seçin (ör. güzellik salonu, diş kliniği). Kategori, hangi aramalarda görüneceğinizi doğrudan etkiler.",
          "Müşterilerin sizi ziyaret ettiği bir adresiniz varsa adresinizi girin; yalnızca müşterinin yanına giderek hizmet veriyorsanız hizmet bölgelerinizi belirleyin.",
          "Telefon numaranızı ve web sitenizin adresini ekleyin.",
          "İşletmenizi doğrulayın. Google, doğrulama yöntemini işletmeye göre belirler; telefon, e-posta veya kısa bir video kaydı istenebilir.",
          "Çalışma saatlerinizi, hizmetlerinizi ve birkaç kaliteli fotoğraf ekleyin.",
        ],
      ],
      ["h2", "Profilinizi güçlü tutmanın yolları"],
      [
        "ul",
        [
          "İşletme adınız, adresiniz ve telefonunuz sitenizde ve profilinizde birebir aynı yazılsın.",
          "Resmî tatillerde ve özel günlerde çalışma saatlerinizi güncelleyin.",
          "Memnun müşterilerinizden yorum isteyin ve olumsuz olanlar dahil tüm yorumlara nazikçe yanıt verin.",
          "Yeni fotoğrafları ve duyuruları düzenli olarak paylaşın.",
        ],
      ],
      ["h2", "Sıralamayı ne belirler?"],
      [
        "p",
        "Google, yerel sonuçları başlıca üç etkene göre sıralar: aramayla ilgililik, aranan konuma uzaklık ve işletmenin bilinirliği. Yorumlar, profilin doluluğu ve web siteniz bu etkenleri güçlendirir; ancak hiçbir hizmet belirli bir sırada çıkmayı garanti edemez.",
      ],
      ["h2", "Web sitenizle birlikte çalışır"],
      [
        "p",
        "İşletme Profili kısa ve hızlı bilgi verir; web siteniz ise ayrıntıyı, güveni ve iletişimi tamamlar. Profildeki web sitesi bağlantısı, karar vermek üzere olan müşteriyi doğrudan size getirir.",
      ],
    ],
  },
  {
    slug: "kucuk-isletmeler-icin-temel-seo",
    cover: "search",
    date: "18 Eylül 2026",
    title: "Küçük işletmeler için temel SEO: 7 adım",
    excerpt:
      "Arama motorlarında doğru aramalarda görünmek için karmaşık çalışmalara gerek yok. Küçük bir işletmenin atması gereken temel adımlar.",
    body: [
      [
        "p",
        "SEO (arama motoru optimizasyonu), sitenizin Google gibi arama motorlarında doğru aramalarda görünmesi için yapılan çalışmaların bütünüdür. Küçük bir işletme için temel adımlar sanıldığı kadar karmaşık değildir.",
      ],
      ["h2", "1. Her hizmete ayrı bir sayfa"],
      ["p", "Saç boyama ve cilt bakımı gibi farklı hizmetleri ayrı sayfalarda anlatmak, her birinin kendi aramasında görünmesini kolaylaştırır."],
      ["h2", "2. Başlık ve açıklamaları özenle yazın"],
      [
        "p",
        'Her sayfanın başlığında hizmetinizi ve bulunduğunuz yeri belirtin (ör. "Kadıköy\'de cilt bakımı | Nova Güzellik"). Arama sonuçlarında görünen kısa açıklama, kullanıcının tıklama kararını etkiler.',
      ],
      ["h2", "3. İşletme bilgileriniz her yerde aynı olsun"],
      [
        "p",
        "İşletme adınız, adresiniz ve telefonunuz sitenizde, Google İşletme Profili'nizde ve sosyal medya hesaplarınızda birebir aynı yazılmalıdır.",
      ],
      ["h2", "4. Mobil uyum ve hız"],
      [
        "p",
        "Ziyaretçilerin çoğu telefondan gelir. Google'ın verilerine göre mobil ziyaretlerin %53'ü, sayfa 3 saniyede açılmazsa yarıda bırakılıyor. Görselleri sıkıştırın ve gereksiz eklentilerden kaçının.",
      ],
      ["h2", "5. Müşterilerinizin sorularını yanıtlayın"],
      ["p", "Sık sorulan sorular bölümü ve blog yazıları, insanların aradığı sorulara yanıt vererek sitenizin daha çok aramada görünmesini sağlar."],
      ["h2", "6. Google Search Console'a kaydolun"],
      ["p", "Ücretsiz olan bu araç, sitenizin hangi aramalarda göründüğünü ve teknik bir sorun olup olmadığını gösterir. Site haritanızı da buradan gönderebilirsiniz."],
      ["h2", "7. Sabırlı olun, düzenli güncelleyin"],
      ["p", "SEO çalışmalarının etkisi genellikle birkaç hafta ile birkaç ay arasında görülür. Düzenli güncellenen ve doğru bilgi veren siteler zamanla daha iyi sonuç alır."],
      ["h2", "Vitrin sitelerinde neler hazır gelir?"],
      ["p", "Her sitede sayfa başlıkları, açıklamalar, site haritası ve işletme bilgileri için yapısal veri başlangıçta kurulur. İçeriklerinizi güncel tutmak ise sizin elinizdeki en güçlü SEO aracıdır."],
    ],
  },
];

export const readMin = (p: BlogPost): number =>
  Math.max(2, Math.round(JSON.stringify(p.body).split(/\s+/).length / 180));

const TR_MONTHS: Record<string, string> = {
  Ocak: "01",
  Şubat: "02",
  Mart: "03",
  Nisan: "04",
  Mayıs: "05",
  Haziran: "06",
  Temmuz: "07",
  Ağustos: "08",
  Eylül: "09",
  Ekim: "10",
  Kasım: "11",
  Aralık: "12",
};

/** "25 Eylül 2026" -> "2026-09-25" (yapısal veri / meta etiketleri için). */
export const dateToISO = (trDate: string): string | undefined => {
  const m = /^(\d{1,2})\s+(\S+)\s+(\d{4})$/.exec(trDate.trim());
  if (!m) return undefined;
  const month = TR_MONTHS[m[2]];
  if (!month) return undefined;
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
};
