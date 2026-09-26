"use client";

import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { Shell } from "@/components/checkout/stepper";
import { OrderSummary } from "@/components/order-summary";
import { SECTORS } from "@/data/content";
import { useApp } from "@/lib/order-context";
import { LIMITS, RX, phoneOk } from "@/lib/security";
import type { OrderInfo } from "@/lib/types";

type Errors = Partial<Record<keyof OrderInfo, string>>;

export function BusinessInfoStep() {
  const { order, patch, openLegal } = useApp();
  const info = order.info;
  const [err, setErr] = useState<Errors>({});
  const [hp, setHp] = useState("");
  const set = (k: keyof OrderInfo, v: string) => {
    patch((o) => ({ info: { ...o.info, [k]: v } }));
    setErr((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };
  const validate = (): Errors => {
    const e: Errors = {};
    if (info.name.trim().length < 2) e.name = "Ad ve soyadınızı girin.";
    if (info.brand.trim().length < 2) e.brand = "İşletme veya marka adını girin.";
    if (!phoneOk(info.phone)) e.phone = "Telefon numaranızı alan koduyla girin (ör. 0532 123 45 67).";
    if (!RX.email.test(info.email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    if (!SECTORS.includes(info.sector)) e.sector = "Bir sektör seçin.";
    if (info.site.trim() && !RX.url.test(info.site.trim())) e.site = "Web adresini ornek.com biçiminde girin.";
    if (info.instagram.trim() && !RX.ig.test(info.instagram.trim()))
      e.instagram = "Instagram kullanıcı adını @hesapadi biçiminde girin.";
    if (info.whatsapp.trim() && !phoneOk(info.whatsapp)) e.whatsapp = "WhatsApp numarasını alan koduyla girin.";
    return e;
  };
  const next = () => {
    /* Bot tuzağı: insanlar bu gizli alanı görmez. Doluysa sessizce durulur (sunucu da aynı kontrolü yapar). */
    if (hp) return;
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      const f =
        (document.querySelector('[aria-invalid="true"]') as HTMLElement | null) || document.getElementById("sector-e");
      if (f && f.focus) f.focus();
      if (f && f.scrollIntoView) f.scrollIntoView({ block: "center" });
      return;
    }
    patch({ step: 2 });
    window.scrollTo({ top: 0 });
  };
  return (
    <Shell
      step={1}
      mini
      title="Önce işletmenizi tanıyalım."
      sub="Bu bilgilerle sizinle iletişim kurar ve tasarımı sektörünüze göre hazırlarız. Bu adımda ödeme yapılmaz."
      aside={<OrderSummary sticky />}
      desk
      hint="Sıradaki adım: paketinizi seçeceksiniz. Ek özellik istemiyorsanız olduğu gibi devam edebilirsiniz."
    >
      <div className="panel">
        <div className="grid sm:grid-cols-2 gap-x-4">
          <Field id="f-name" label="Ad Soyad" error={err.name}>
            <Inp id="f-name" maxLength={LIMITS.name} value={info.name} onValue={(v) => set("name", v)} error={err.name} autoComplete="name" />
          </Field>
          <Field id="f-brand" label="İşletme / Marka Adı" error={err.brand}>
            <Inp
              id="f-brand"
              maxLength={LIMITS.brand}
              value={info.brand}
              onValue={(v) => set("brand", v)}
              error={err.brand}
              autoComplete="organization"
            />
          </Field>
          <Field id="f-phone" label="Telefon" error={err.phone}>
            <Inp
              id="f-phone"
              maxLength={LIMITS.phone}
              type="tel"
              inputMode="tel"
              value={info.phone}
              onValue={(v) => set("phone", v)}
              error={err.phone}
              autoComplete="tel"
              placeholder="05xx xxx xx xx"
            />
          </Field>
          <Field id="f-email" label="E-posta" error={err.email}>
            <Inp
              id="f-email"
              maxLength={LIMITS.email}
              type="email"
              value={info.email}
              onValue={(v) => set("email", v)}
              error={err.email}
              autoComplete="email"
            />
          </Field>
        </div>
        <div className="fld">
          <span className="label" id="sector-l">
            İşletme sektörü
          </span>
          <div className="chips" role="group" aria-labelledby="sector-l">
            {SECTORS.map((s) => (
              <button
                type="button"
                key={s}
                className={"chipb " + (info.sector === s ? "on" : "")}
                aria-pressed={info.sector === s}
                onClick={() => set("sector", s)}
              >
                {s}
              </button>
            ))}
          </div>
          {err.sector && (
            <p className="err" id="sector-e" role="alert" tabIndex={-1}>
              {err.sector}
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-x-4">
          <Field id="f-site" label="Mevcut web sitesi" optional error={err.site}>
            <Inp
              id="f-site"
              maxLength={LIMITS.url}
              value={info.site}
              onValue={(v) => set("site", v)}
              error={err.site}
              placeholder="www.ornek.com"
              inputMode="url"
              autoComplete="url"
            />
          </Field>
          <Field id="f-ig" label="Instagram hesabı" optional error={err.instagram}>
            <Inp
              id="f-ig"
              maxLength={LIMITS.handle}
              value={info.instagram}
              onValue={(v) => set("instagram", v)}
              error={err.instagram}
              placeholder="@hesapadi"
            />
          </Field>
          <Field id="f-wa" label="WhatsApp numarası" optional error={err.whatsapp} hint="Boş bırakırsanız telefon numaranız kullanılır.">
            <Inp
              id="f-wa"
              maxLength={LIMITS.phone}
              type="tel"
              inputMode="tel"
              value={info.whatsapp}
              onValue={(v) => set("whatsapp", v)}
              error={err.whatsapp}
            />
          </Field>
        </div>
        <Field id="f-wish" label="Web sitenizde özellikle olmasını istediğiniz şeyler?" optional>
          <textarea
            className="input"
            maxLength={LIMITS.wishes}
            id="f-wish"
            value={info.wishes}
            onChange={(e) => set("wishes", e.target.value)}
          ></textarea>
        </Field>
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-hp">Bu alanı boş bırakın</label>
          <input
            id="f-hp"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        <div className="form-foot">
          <span className="fine">
            Kişisel verileriniz,{" "}
            <button type="button" className="inl" onClick={() => openLegal("kvkk")}>
              KVKK Aydınlatma Metni
            </button>{" "}
            kapsamında yalnızca siparişiniz için işlenir.
          </span>
          <button className="btn btn-primary btn-lg" onClick={next}>
            Devam Et
          </button>
        </div>
      </div>
    </Shell>
  );
}
