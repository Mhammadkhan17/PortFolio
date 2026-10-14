import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  problem?: string;
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
  client?: string;
  role?: string;
  status?: string;
  order?: number;
  date?: string;
  duration?: string;
  draft?: boolean;
  noindex?: boolean;
  related?: string[];
}

function mapProject(data: Record<string, unknown>) {
  return {
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    description: data.description as string,
    problem: data.problem as string | undefined,
    tech: data.tech as string[],
    category: data.category as string,
    demo: data.demo as string,
    github: data.github as string,
    outcomeHeadline: data.outcomeHeadline as string | undefined,
    industry: data.industry as string | undefined,
    context: data.context as string | undefined,
    approach: data.approach as string[] | undefined,
    metric: data.metric as string | undefined,
    metricLabel: data.metricLabel as string | undefined,
    clientQuote: data.clientQuote as string | undefined,
    clientName: data.clientName as string | undefined,
    clientRole: data.clientRole as string | undefined,
    client: data.client as string | undefined,
    role: data.role as string | undefined,
    status: data.status as string | undefined,
    order: data.order as number | undefined,
    date: data.date as string | undefined,
    duration: data.duration as string | undefined,
    draft: data.draft as boolean | undefined,
    noindex: data.noindex as boolean | undefined,
    related: data.related as string[] | undefined,
  };
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const content = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(content);

    return { slug, ...mapProject(data) };
  });
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(content);

  return { slug, ...mapProject(data), body };
}
