import { notFound } from "next/navigation";
import { loadManifest } from "@/lib/manifest";
import { MENUS } from "@/lib/menus";
import ScrollViewer from "@/components/viewer/ScrollViewer";
import WebPCheck from "@/components/viewer/WebPCheck";

interface ViewerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ViewerPage({ params }: ViewerPageProps) {
  const { slug } = await params;

  const menu = MENUS.find((m) => m.slug === slug);
  if (!menu) {
    notFound();
  }

  let manifest;
  try {
    manifest = loadManifest(slug);
  } catch (err) {
    throw new Error(
      `Failed to load manifest for menu "${slug}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return (
    <WebPCheck>
      <ScrollViewer
        manifest={manifest}
        menuTitle={menu.title}
        cdnBaseUrl="/data"
      />
    </WebPCheck>
  );
}

export function generateStaticParams() {
  return MENUS.map((menu) => ({ slug: menu.slug }));
}
