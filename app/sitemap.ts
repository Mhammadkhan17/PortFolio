import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

const LAST_UPDATED = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = getAllProjects()
    .filter((project) => !project.draft && project.outcomeHeadline)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
