"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    /* Üretimde bu bir hata izleme servisine (Sentry vb.) da gönderilebilir. */
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-x doc-wrap">
      <h1 className="h-2">Bir şeyler ters gitti.</h1>
      <p className="lead" style={{ margin: "14px 0 26px" }}>
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Sipariş bilgileriniz kaydedildiyse kaybolmaz.
      </p>
      <button className="btn btn-primary" onClick={reset}>
        Tekrar Deneyin
      </button>
    </main>
  );
}
