import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { showcases } from "@/content/portfolio";
import { DemoChrome } from "@/components/showcase/DemoChrome";
import { SpaDemo } from "@/components/showcase/SpaDemo";
import { RestaurantDemo } from "@/components/showcase/RestaurantDemo";
import { HotelDemo } from "@/components/showcase/HotelDemo";
import { RetailDemo } from "@/components/showcase/RetailDemo";
import { BusinessDemo } from "@/components/showcase/BusinessDemo";
import { LifestyleDemo } from "@/components/showcase/LifestyleDemo";
const demos = {
  spa: SpaDemo,
  restaurant: RestaurantDemo,
  hotel: HotelDemo,
  retail: RetailDemo,
  business: BusinessDemo,
  lifestyle: LifestyleDemo,
};
export function generateStaticParams() {
  return showcases.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const showcase = showcases.find((item) => item.slug === slug);
  return {
    title: showcase
      ? showcase.brand + " — " + showcase.category + " website concept"
      : "Showcase not found",
    description: showcase?.description,
  };
}
export default async function ShowcaseDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const showcase = showcases.find((item) => item.slug === slug);
  if (!showcase) notFound();
  const Demo = demos[showcase.visualKey];
  return (
    <DemoChrome showcase={showcase}>
      <Demo />
    </DemoChrome>
  );
}
