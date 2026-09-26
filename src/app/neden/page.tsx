import type { Metadata } from "next";
import { WhyPage } from "@/components/why-page";

export const metadata: Metadata = {
  title: "Neden web sitesi?",
  description: "İşletmeniz için bir web sitesinin neden önemli olduğunu araştırmalarla anlatıyoruz.",
};

export default function Page() {
  return <WhyPage />;
}
