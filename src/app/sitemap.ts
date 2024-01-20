import client from "@/contentful/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    select: ["fields.slug", "sys.updatedAt"],
    limit: 1000,
  });

  const sitemap: MetadataRoute.Sitemap = items.map(({ fields, sys }) => ({
    url: `https://developing-from-amsterdam.dev/${fields.slug}`,
    lastModified: sys.updatedAt.toString(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  sitemap.push(
    {
      url: "https://developing-from-amsterdam.dev",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://developing-from-amsterdam.dev//about",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }
  );

  return sitemap;
}
