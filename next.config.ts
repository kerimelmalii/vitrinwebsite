import type { NextConfig } from "next";

/* GitHub Pages, proje sitelerini "/<repo-adı>/" alt yolunda sunar (kullanıcı adı.github.io/vitrinwebsite).
   Gerçek domain bağlandığında veya başka bir statik host kullanıldığında bu alt yol gerekmez;
   bu yüzden yalnızca GitHub Actions içindeki (GITHUB_PAGES=true) derlemede etkinleştirilir. */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/vitrinwebsite";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? repoBasePath : "",
  assetPrefix: isGithubPages ? repoBasePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
};

export default nextConfig;
