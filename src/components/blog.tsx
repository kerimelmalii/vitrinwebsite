import Link from "next/link";
import type { ReactNode } from "react";
import { BLOG, readMin } from "@/data/blog";
import type { BlogBlock, BlogPost as BlogPostType } from "@/lib/types";

export function Blocks({ body }: { body: BlogBlock[] }): ReactNode {
  return (
    <>
      {body.map((x, i) => {
        if (x[0] === "h2") return <h2 key={i}>{x[1]}</h2>;
        if (x[0] === "ul")
          return (
            <ul key={i}>
              {x[1].map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          );
        if (x[0] === "ol")
          return (
            <ol key={i}>
              {x[1].map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ol>
          );
        return <p key={i}>{x[1]}</p>;
      })}
    </>
  );
}

export function PostLink({ p, children, cls }: { p: BlogPostType; children: ReactNode; cls?: string }) {
  return (
    <Link className={cls} href={`/blog/${p.slug}`}>
      {children}
    </Link>
  );
}

/* Blog kapakları: dosyanın içinde çizilmiş SVG'ler (dış görsel yüklenmez, hızlıdır, her ekranda nettir). */
export function BlogCover({ k }: { k: BlogPostType["cover"] }) {
  const box = { viewBox: "0 0 400 250", preserveAspectRatio: "xMidYMid slice", "aria-hidden": true, focusable: "false" } as const;
  if (k === "map")
    return (
      <svg {...box}>
        <rect width="400" height="250" fill="#ECECF0" />
        <rect x="20" y="20" width="80" height="70" rx="8" fill="#E3E3E8" />
        <rect x="250" y="190" width="120" height="50" rx="8" fill="#E3E3E8" />
        <rect x="30" y="185" width="70" height="55" rx="8" fill="#E3E3E8" />
        <path d="M0 165 C110 145 210 205 400 135" stroke="#fff" strokeWidth="18" fill="none" />
        <path d="M125 0 L175 250" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M0 58 L400 92" stroke="#fff" strokeWidth="10" fill="none" />
        <path
          d="M165 152 C150 130 140 118 140 102 a25 25 0 0 1 50 0 c0 16 -10 28 -25 50z"
          fill="#111114"
        />
        <circle cx="165" cy="102" r="9" fill="#fff" />
        <ellipse cx="165" cy="156" rx="14" ry="4" fill="#111114" opacity=".15" />
        <rect x="222" y="54" width="148" height="126" rx="16" fill="#fff" />
        <rect x="240" y="74" width="92" height="10" rx="5" fill="#111114" />
        <polygon points="247.0,98.0 248.5,101.9 252.7,102.1 249.5,104.8 250.5,108.9 247.0,106.6 243.5,108.9 244.5,104.8 241.3,102.1 245.5,101.9" fill="#111114" />
        <polygon points="263.0,98.0 264.5,101.9 268.7,102.1 265.5,104.8 266.5,108.9 263.0,106.6 259.5,108.9 260.5,104.8 257.3,102.1 261.5,101.9" fill="#111114" />
        <polygon points="279.0,98.0 280.5,101.9 284.7,102.1 281.5,104.8 282.5,108.9 279.0,106.6 275.5,108.9 276.5,104.8 273.3,102.1 277.5,101.9" fill="#111114" />
        <polygon points="295.0,98.0 296.5,101.9 300.7,102.1 297.5,104.8 298.5,108.9 295.0,106.6 291.5,108.9 292.5,104.8 289.3,102.1 293.5,101.9" fill="#111114" />
        <polygon points="311.0,98.0 312.5,101.9 316.7,102.1 313.5,104.8 314.5,108.9 311.0,106.6 307.5,108.9 308.5,104.8 305.3,102.1 309.5,101.9" fill="#CFCFD6" />
        <rect x="240" y="122" width="110" height="7" rx="3.5" fill="#DADAE0" />
        <rect x="240" y="136" width="82" height="7" rx="3.5" fill="#DADAE0" />
        <rect x="240" y="154" width="62" height="16" rx="8" fill="#ECECF0" />
      </svg>
    );
  if (k === "search")
    return (
      <svg {...box}>
        <rect width="400" height="250" fill="#ECECF0" />
        <rect x="44" y="36" width="312" height="42" rx="21" fill="#fff" />
        <circle cx="71" cy="56" r="8" stroke="#111114" strokeWidth="3" fill="none" />
        <path d="M77 62l7 7" stroke="#111114" strokeWidth="3" strokeLinecap="round" />
        <rect x="96" y="52" width="128" height="8" rx="4" fill="#DADAE0" />
        <rect x="44" y="94" width="210" height="42" rx="12" fill="#fff" />
        <rect x="60" y="104" width="120" height="8" rx="4" fill="#111114" />
        <rect x="60" y="119" width="170" height="6" rx="3" fill="#DADAE0" />
        <rect x="44" y="144" width="210" height="42" rx="12" fill="#fff" opacity=".75" />
        <rect x="60" y="154" width="104" height="8" rx="4" fill="#9A9AA3" />
        <rect x="60" y="169" width="150" height="6" rx="3" fill="#E3E3E8" />
        <rect x="44" y="194" width="210" height="42" rx="12" fill="#fff" opacity=".55" />
        <rect x="60" y="204" width="92" height="8" rx="4" fill="#BDBDC4" />
        <rect x="60" y="219" width="130" height="6" rx="3" fill="#E3E3E8" />
        <rect x="282" y="196" width="20" height="40" rx="6" fill="#D2D2D8" />
        <rect x="311" y="166" width="20" height="70" rx="6" fill="#9A9AA3" />
        <rect x="340" y="126" width="20" height="110" rx="6" fill="#111114" />
      </svg>
    );
  return (
    <svg {...box}>
      <rect width="400" height="250" fill="#ECECF0" />
      <rect x="36" y="34" width="236" height="176" rx="14" fill="#fff" />
      <path d="M36 62h236" stroke="#ECECF0" strokeWidth="2" />
      <circle cx="54" cy="48" r="4" fill="#D4D4DA" />
      <circle cx="67" cy="48" r="4" fill="#D4D4DA" />
      <circle cx="80" cy="48" r="4" fill="#D4D4DA" />
      <rect x="56" y="82" width="124" height="12" rx="6" fill="#111114" />
      <rect x="56" y="104" width="172" height="7" rx="3.5" fill="#DADAE0" />
      <rect x="56" y="117" width="140" height="7" rx="3.5" fill="#DADAE0" />
      <rect x="56" y="136" width="66" height="18" rx="9" fill="#111114" />
      <rect x="56" y="166" width="196" height="30" rx="8" fill="#ECECF0" />
      <rect x="252" y="66" width="108" height="170" rx="20" fill="#111114" />
      <rect x="258" y="72" width="96" height="158" rx="15" fill="#fff" />
      <circle cx="276" cy="94" r="9" fill="#DADAE0" />
      <rect x="291" y="89" width="46" height="6" rx="3" fill="#111114" />
      <rect x="291" y="99" width="30" height="5" rx="2.5" fill="#DADAE0" />
      <rect x="264" y="116" width="26" height="26" rx="4" fill="#DADAE0" />
      <rect x="293" y="116" width="26" height="26" rx="4" fill="#ECECF0" />
      <rect x="322" y="116" width="26" height="26" rx="4" fill="#111114" />
      <rect x="264" y="145" width="26" height="26" rx="4" fill="#ECECF0" />
      <rect x="293" y="145" width="26" height="26" rx="4" fill="#9A9AA3" />
      <rect x="322" y="145" width="26" height="26" rx="4" fill="#DADAE0" />
      <rect x="264" y="174" width="26" height="26" rx="4" fill="#9A9AA3" />
      <rect x="293" y="174" width="26" height="26" rx="4" fill="#DADAE0" />
      <rect x="322" y="174" width="26" height="26" rx="4" fill="#ECECF0" />
    </svg>
  );
}

export function BlogList() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "96px" }}>
        <div className="container-x">
          <h1 className="h-1">Blog</h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Web siteleri, arama motorlarında görünürlük ve işletmenizi internette büyütmek üzerine pratik yazılar.
          </p>
          <div className="bgrid">
            {BLOG.map((p) => (
              <PostLink key={p.slug} p={p} cls="bcard">
                <span className="bcover">
                  <BlogCover k={p.cover} />
                </span>
                <span className="bbody">
                  <span className="bmeta">
                    {p.date}
                    <span aria-hidden="true">|</span>
                    {readMin(p)} dakikalık okuma
                  </span>
                  <h2>{p.title}</h2>
                  <p>{p.excerpt}</p>
                  <span className="bmore">Yazıyı okuyun</span>
                </span>
              </PostLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
