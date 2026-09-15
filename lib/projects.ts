import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  demo: string;
  github: string;
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
      description: data.description,
      tech: data.tech,
      category: data.category,
      demo: data.demo,
      github: data.github,
    };
  });
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    tech: data.tech,
    category: data.category,
    demo: data.demo,
    github: data.github,
    body,
  };
}
