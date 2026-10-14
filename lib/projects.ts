import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  tech: string[];
  category: string;
  demo: string;
  github: string;
  outcomeHeadline?: string;
  industry?: string;
  context?: string;
  approach?: string[];
  metric?: string;
  metricLabel?: string;
  clientQuote?: string;
  clientName?: string;
  clientRole?: string;
  status?: string;
  order?: number;
  date?: string;
  duration?: string;
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const content = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(content);

    return {
      slug,
      title: data.title,
      seoTitle: data.seoTitle,
      description: data.description,
      tech: data.tech,
      category: data.category,
      demo: data.demo,
      github: data.github,
      outcomeHeadline: data.outcomeHeadline,
      industry: data.industry,
      context: data.context,
      approach: data.approach,
      metric: data.metric,
      metricLabel: data.metricLabel,
      clientQuote: data.clientQuote,
      clientName: data.clientName,
      clientRole: data.clientRole,
      status: data.status,
      order: data.order,
      date: data.date,
      duration: data.duration,
    };
  });
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(content);

  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle,
    description: data.description,
    tech: data.tech,
    category: data.category,
    demo: data.demo,
    github: data.github,
    outcomeHeadline: data.outcomeHeadline,
    industry: data.industry,
    context: data.context,
    approach: data.approach,
    metric: data.metric,
    metricLabel: data.metricLabel,
    clientQuote: data.clientQuote,
    clientName: data.clientName,
    clientRole: data.clientRole,
    status: data.status,
    order: data.order,
    date: data.date,
    duration: data.duration,
    body,
  };
}
