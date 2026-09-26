"use client";

import Link from "next/link";
import { BlogCover, Blocks, PostLink } from "@/components/blog";
import { BLOG, readMin } from "@/data/blog";
import { BASE_PRICE, TL } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { NotFound } from "@/components/legal";

export function BlogPost({ slug }: { slug: string }) {
  const { startCheckout } = useApp();
  const p = BLOG.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const others = BLOG.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <main id="main" className="container-x doc-wrap">
      <nav className="crumbs" aria-label="Konum">
        <Link className="linkb" href="/blog">
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span>Yazı</span>
      </nav>
      <article className="post">
        <h1 className="h-2">{p.title}</h1>
        <p className="bmeta">
          {p.date}
          <span aria-hidden="true">|</span>
          {readMin(p)} dakikalık okuma
        </p>
        <div className="pcover">
          <BlogCover k={p.cover} />
        </div>
        <Blocks body={p.body} />
      </article>
      <div className="post-cta">
        <div>
          <b>İşletmeniz için bir web sitesi mi düşünüyorsunuz?</b>
          <p>
            Temel paket {TL(BASE_PRICE)}, ilk yıl servis ve bakım ücretsiz.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => startCheckout()}>
          Web Sitesi Edinin
        </button>
      </div>
      {others.length > 0 && (
        <nav className="lg-others" aria-label="Diğer yazılar">
          <h2 className="h-3">Diğer yazılar</h2>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <PostLink p={o}>{o.title}</PostLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
