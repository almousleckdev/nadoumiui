import type { MetadataRoute } from "next";
import { getScholarships } from "@/services/scholarshipService";
import { getUniversities } from "@/services/universityService";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://nadoumi.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/scholarships",
  "/universities",
  "/faq",
  "/contact",
  "/partners",
  "/partnership",
  "/guides/city-guides",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // Best-effort: if the backend is unreachable at build/request time, ship the
  // sitemap with just the static routes rather than failing the whole route.
  const [scholarships, universities] = await Promise.all([
    getScholarships({ status: "published", limit: 500 }).catch(() => null),
    getUniversities({ limit: 500 }).catch(() => null),
  ]);

  const scholarshipEntries: MetadataRoute.Sitemap =
    scholarships?.scholarships.map((s) => ({
      url: `${SITE_URL}/scholarships/${s.id}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
    })) ?? [];

  const universityEntries: MetadataRoute.Sitemap =
    universities?.universities.map((u) => ({
      url: `${SITE_URL}/universities/${u.id}`,
      lastModified: u.updatedAt ? new Date(u.updatedAt) : new Date(),
    })) ?? [];

  return [...staticEntries, ...scholarshipEntries, ...universityEntries];
}
