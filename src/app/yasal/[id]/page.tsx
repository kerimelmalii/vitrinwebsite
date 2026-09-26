import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal";
import { LEGAL_DOCS, LEGAL_LINKS } from "@/data/legal";

export function generateStaticParams() {
  return LEGAL_LINKS.map(([id]) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doc = LEGAL_DOCS[id];
  return doc ? { title: doc.t, alternates: { canonical: `/yasal/${id}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!LEGAL_DOCS[id]) notFound();
  return <LegalPage id={id} />;
}
