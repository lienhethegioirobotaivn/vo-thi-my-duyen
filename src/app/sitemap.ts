import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.vothimyduyen.com";

  const staticRoutes = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/admin`, lastModified: new Date() },
  ];

  return [...staticRoutes];
}
