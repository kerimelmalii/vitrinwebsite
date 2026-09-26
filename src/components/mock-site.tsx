import type { CSSProperties, ReactNode } from "react";
import type { MockData } from "@/lib/types";

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="bframe">
      <div className="bbar">
        <span className="dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className="burl">{url}</span>
      </div>
      <div className="bview">{children}</div>
    </div>
  );
}

const mockVars = (m: MockData): CSSProperties =>
  ({
    "--m-bg": m.bg,
    "--m-ink": m.ink,
    "--m-ac": m.ac,
    "--m-acink": m.acink,
    "--m-card": m.card,
    "--m-g1": m.g[0],
    "--m-g2": m.g[1],
    "--m-g3": m.g[2],
    "--m-r": m.r,
    "--m-font": m.font,
    "--m-hfont": m.hfont || m.font,
  }) as CSSProperties;

export function MockSite({ d }: { d: { m: MockData } }) {
  const m = d.m;
  const nav = (
    <div className="ms-nav">
      <span className="ms-logo">{m.name}</span>
      <span className="ms-links">
        {m.nav.map((x) => (
          <span key={x}>{x}</span>
        ))}
      </span>
      <span className="ms-btn">{m.cta}</span>
    </div>
  );
  let body: ReactNode = null;
  if (m.variant === "split") {
    body = (
      <>
        <div className="sp">
          <div>
            <div className="ms-tag">{m.tag}</div>
            <div className="ms-h">{m.h}</div>
            <p className="ms-p">{m.p}</p>
            <div className="ms-cta">
              <span className="ms-btn">{m.cta}</span>
              <span className="ms-btn g">{m.cta2}</span>
            </div>
          </div>
          <div className="ms-img"></div>
        </div>
        <div className="ms-row">
          {m.cards.map((c) => (
            <div className="ms-card" key={c}>
              <b>{c}</b>
              <span>Detayları gör</span>
            </div>
          ))}
        </div>
      </>
    );
  } else if (m.variant === "center") {
    body = (
      <>
        <div className="ct">
          <div className="ms-tag">{m.tag}</div>
          <div className="ms-h">{m.h}</div>
          <p className="ms-p">{m.p}</p>
          <div className="ms-cta">
            <span className="ms-btn">{m.cta}</span>
            <span className="ms-btn g">{m.cta2}</span>
          </div>
        </div>
        <div className="ms-strip">
          {m.cards.map((c, i) => (
            <div key={c}>
              <div
                className="ms-img"
                style={{ background: "linear-gradient(135deg," + m.g[i % 3] + "," + m.g[(i + 1) % 3] + ")" }}
              ></div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (m.variant === "full") {
    body = (
      <>
        <div className="bg"></div>
        <div className="fb">
          <div className="ms-tag">{m.tag}</div>
          <div className="ms-h">{m.h}</div>
          <p className="ms-p">{m.p}</p>
          <div className="ms-cta">
            <span className="ms-btn">{m.cta}</span>
            <span className="ms-btn g">{m.cta2}</span>
          </div>
        </div>
        <div className="bar">
          {m.cards.map((c) => (
            <div key={c}>{c}</div>
          ))}
        </div>
      </>
    );
  } else {
    const tiles = m.tiles || [];
    body = (
      <>
        <div className="gh">
          <div className="ms-h sm">{m.h}</div>
          <div className="ms-chips">
            {m.cards.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="ms-tiles">
          {tiles.map((t, i) => (
            <div className="ms-tile" key={i}>
              <div
                className="ms-img"
                style={{ background: "linear-gradient(135deg," + m.g[i % 3] + "," + m.g[(i + 1) % 3] + ")" }}
              ></div>
              <div className="cp">
                <b>{t[0]}</b>
                <span>{t[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className={"ms ms-" + m.variant} style={mockVars(m)} aria-hidden="true">
      {nav}
      {body}
    </div>
  );
}

export function MockPhone({ d }: { d: { m: MockData } }) {
  const m = d.m;
  return (
    <div className="pframe">
      <div className="ms" style={mockVars(m)} aria-hidden="true">
        <div className="mp-nav">
          <span className="ms-logo">{m.name}</span>
          <span className="mp-bg"></span>
        </div>
        <div className="mp-hero">
          <div className="ms-tag">{m.tag}</div>
          <div className="mp-h">{m.h}</div>
          <span className="ms-btn">{m.cta}</span>
        </div>
        <div className="ms-img mp-img"></div>
        <div className="mp-cards">
          {m.cards.slice(0, 2).map((c) => (
            <div className="ms-card" key={c}>
              <b>{c}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
