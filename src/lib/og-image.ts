import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Open Graph / Twitter Card görselleri için ortak yazı tipleri ve ölçüler.
   next/og (Satori) yalnızca ttf/otf/woff destekler (woff2 değil); bu yüzden
   sitenin geri kalanında kullanılan woff2 dosyalarından ayrı, yalnızca
   derleme sırasında kullanılan tam kapsamlı ttf dosyaları burada tutulur
   (src/app/og-fonts, tarayıcıya gönderilmez — bkz. o klasördeki OFL.txt). */
export const OG_SIZE = { width: 1200, height: 630 };

export async function loadOgFonts() {
  const dir = join(process.cwd(), "src/app/og-fonts");
  const [bold, extrabold] = await Promise.all([
    readFile(join(dir, "manrope-700.ttf")),
    readFile(join(dir, "manrope-800.ttf")),
  ]);
  return [
    { name: "Manrope", data: bold, style: "normal" as const, weight: 700 as const },
    { name: "Manrope", data: extrabold, style: "normal" as const, weight: 800 as const },
  ];
}

export const OG_COLORS = { bg: "#111114", ink: "#FFFFFF", mute: "#8E8E96", accent: "#1F2F6B" };
