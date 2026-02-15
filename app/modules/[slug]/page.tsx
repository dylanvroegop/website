import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { modules, moduleSlugs, getModuleBySlug } from "@/content/modules";
import { ModuleDetailContent } from "./ModuleDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return moduleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) return {};

  return {
    title: `${module.name} - ${module.description}`,
    description: `${module.description}. ${module.features.slice(0, 3).join(". ")}. Onderdeel van OfferteHulp, de complete offerte-software voor timmerbedrijven.`,
  };
}

export default async function ModuleDetailPage({ params }: Props) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);

  if (!module) {
    notFound();
  }

  return <ModuleDetailContent module={module} />;
}
