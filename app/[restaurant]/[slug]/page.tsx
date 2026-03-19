import { notFound } from "next/navigation";
import { loadManifest } from "@/lib/manifest";
import { RESTAURANTS, getRestaurant } from "@/lib/menus";
import ScrollViewer from "@/components/viewer/ScrollViewer";
import WebPCheck from "@/components/viewer/WebPCheck";

interface ViewerPageProps {
  params: Promise<{ restaurant: string; slug: string }>;
}

export default async function ViewerPage({ params }: ViewerPageProps) {
  const { restaurant: restaurantSlug, slug } = await params;

  const restaurant = getRestaurant(restaurantSlug);
  if (!restaurant) notFound();

  const menu = restaurant.menus.find((m) => m.slug === slug);
  if (!menu) notFound();

  // Determine which manifest slug to load (default = first variant or the slug itself)
  const defaultSlug =
    menu.variants && menu.variants.length > 0
      ? menu.variants[0].slug
      : menu.slug;

  let manifest;
  try {
    manifest = loadManifest(defaultSlug);
  } catch (err) {
    throw new Error(
      `Failed to load manifest for menu "${defaultSlug}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return (
    <WebPCheck>
      <ScrollViewer
        manifest={manifest}
        menuTitle={menu.title}
        cdnBaseUrl="/data"
        backUrl={`/${restaurantSlug}`}
        variants={menu.variants}
      />
    </WebPCheck>
  );
}

export function generateStaticParams() {
  const params: { restaurant: string; slug: string }[] = [];
  for (const r of RESTAURANTS) {
    for (const m of r.menus) {
      params.push({ restaurant: r.slug, slug: m.slug });
    }
  }
  return params;
}
