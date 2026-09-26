"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Stepper } from "@/components/checkout/stepper";
import { QuoteNote } from "@/components/addons";
import { Icon } from "@/components/icons";
import { useApp } from "@/lib/order-context";

function accessUrl(t: string): string {
  return location.origin + "/baslangic/?t=" + t;
}

function AccessLink({ t }: { t: string }) {
  const [copied, setCopied] = useState(false);
  const url = accessUrl(t);
  const ref = useRef<HTMLElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Pano izni yoksa metni seçili bırak: kullanıcı kendisi kopyalar. */
      const el = ref.current;
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };
  return (
    <div className="acc-link">
      <b>Proje formu bağlantınız</b>
      <code ref={ref}>{url}</code>
      <div className="row">
        <button type="button" className="btn btn-line" style={{ padding: ".6rem 1.1rem", fontSize: ".88rem" }} onClick={copy}>
          {copied ? "Kopyalandı" : "Bağlantıyı kopyala"}
        </button>
        <span className="fine">
          Formu daha sonra bu bağlantıdan doldurabilirsiniz. Bu bağlantı e-postanıza da gönderilir. Bağlantı size
          özeldir, kimseyle paylaşmayın.
        </span>
      </div>
    </div>
  );
}

export function SuccessStep() {
  const { order } = useApp();
  const items: [string, string, "done" | "cur" | "up"][] = [
    ["Bilgilerinizi aldık", "Sipariş ve ödeme kaydedildi.", "done"],
    ["İçeriklerinizi bekliyoruz", "Logo, metin ve görselleri proje formundan gönderin.", "cur"],
    ["Tasarım süreci başlıyor", "İçerikleriniz bize ulaşınca tasarıma başlarız.", "up"],
    ["Web siteniz yayına hazırlanıyor", "Onayınızla yayına alırız.", "up"],
  ];
  return (
    <main id="main" className="container-x co">
      <Stepper step={4} />
      <div className="ok-wrap">
        <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" />
          <path d="M28 50l14 14 27-30" />
        </svg>
        <h1 className="h-1">Teşekkürler, siparişiniz alındı.</h1>
        <p className="lead" style={{ marginTop: "12px" }}>
          Ödemeniz onaylandı. Sipariş onayınız ve sözleşmenizin bir örneği e-posta adresinize gönderilir. Sıradaki
          adım, web siteniz için içeriklerinizi iletmek.
        </p>
        <div className="ordno">
          Sipariş No: <b>#{order.orderNo}</b>
        </div>
        <div style={{ maxWidth: "560px" }}>
          <QuoteNote quotes={order.quotes} after />
        </div>
        <ol className="tl" aria-label="Sonraki aşamalar">
          {items.map((s, i) => (
            <li key={i} className={s[2]}>
              <span className="n">{s[2] === "done" ? <Icon n="check" size={18} sw={3} /> : "0" + (i + 1)}</span>
              <div>
                <b>{s[0]}</b>
                <span>{s[1]}</span>
              </div>
            </li>
          ))}
        </ol>
        {order.accessToken && <AccessLink t={order.accessToken} />}
        <Link
          className="btn btn-primary btn-lg"
          href={order.accessToken ? "/baslangic/?t=" + order.accessToken : "/baslangic/"}
        >
          İçerik Formuna Geçin
        </Link>
      </div>
    </main>
  );
}
