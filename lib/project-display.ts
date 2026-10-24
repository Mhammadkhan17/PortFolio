import type { Project } from "./projects";

export function provenanceOf(project: Project): string {
  const client = project.client ?? "";

  if (/confidential/i.test(client)) return "CONFIDENTIAL CLIENT";
  if (/team/i.test(client)) return "TEAM BUILD";
  if (/personal/i.test(client)) return "PERSONAL";

  return client.toUpperCase() || project.status?.toUpperCase() || "PROVENANCE STATED";
}

export function outcomeOf(project: Project): { value: string; label: string } {
  if (project.metric) {
    return {
      value: project.metric,
      label: project.metricLabel ?? "Outcome",
    };
  }

  if (project.status) {
    return {
      value: project.status,
      label: "Current state",
    };
  }

  return {
    value: "Built",
    label: "Documented build",
  };
}
