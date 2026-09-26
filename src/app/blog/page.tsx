import type { Metadata } from "next";
import { BlogList } from "@/components/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Web siteleri, arama motorlarında görünürlük ve işletmenizi internette büyütmek üzerine pratik yazılar.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogList />;
}
