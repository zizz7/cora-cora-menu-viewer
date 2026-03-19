import { notFound } from "next/navigation";
import { loadManifest } from "@/lib/manifest";
import { MENUS } from "@/lib/menus";
import ScrollViewer from "@/components/viewer/ScrollViewer";
import WebPCheck from "@/components/viewer/WebPCheck";

interface ViewerPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Legacy route — kept for backward compatibility with existing QR codes
 * pointing to /menu/beverage etc.
 */
export default async function ViewerPage({ params }: ViewerPageProps) {
  const { slug } = await params;

  const menu = MENUS.find((m) => m.slug === slug);
  if (!menu) {
    notFound();
  }

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
        variants={menu.variants}
      />
    </WebPCheck>
  );
}

export function generateStaticParams() {
  return MENUS.map((menu) => ({ slug: menu.slug }));
}
