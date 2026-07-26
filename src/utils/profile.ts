import about from "@/data/about.json";
import contact from "@/data/contact.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function extractYearsOfExperience(text: string) {
  const match = text.match(/over\s+[^.]*?years of experience/i);
  return match?.[0] ?? "experience in software development";
}

function joinList(values: string[]) {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

function collectExpertiseAreas() {
  const areas: string[] = [];

  const titles = experience.map((item) => item.title.toLowerCase());
  const technologies = unique([
    ...experience.flatMap((item) => item.technologies),
    ...projects.flatMap((project) =>
      project.languages.map((language) => language.name),
    ),
  ]).map((value) => value.toLowerCase());

  if (
    titles.some((title) => title.includes("frontend")) ||
    technologies.some((tech) =>
      ["react", "react.js", "next.js", "angular", "vue.js", "vue"].includes(
        tech,
      ),
    )
  ) {
    areas.push("frontend development");
  }

  if (
    projects.some((project) => project.category === "web") ||
    technologies.some((tech) =>
      [
        "html",
        "css",
        "javascript",
        "typescript",
        "wordpress",
        "shopify",
      ].includes(tech),
    )
  ) {
    areas.push("web applications");
  }

  if (
    projects.some((project) => project.category === "mobile") ||
    technologies.some((tech) =>
      ["react native", "flutter", "expo", "dart"].includes(tech),
    )
  ) {
    areas.push("mobile applications");
  }

  return areas;
}

export const primaryTechnologies = unique([
  ...experience.flatMap((item) => item.technologies),
  ...projects.flatMap((project) =>
    project.languages.map((language) => language.name),
  ),
]).filter((technology) =>
  [
    "React",
    "React.js",
    "Next.js",
    "Angular",
    "Vue.js",
    "Vue",
    "TypeScript",
    "Node.js",
    "React Native",
    "Flutter",
    "Expo",
    "WordPress",
    "Shopify",
  ].includes(technology),
);

export const professionalProfile = {
  expertiseAreas: collectExpertiseAreas(),
  fullName: about.name,
  location: contact.location,
  primaryRole: "Software Developer",
  tagline: about.tagline,
  yearsOfExperience: extractYearsOfExperience(about.about),
};

export function getProfessionalSummary() {
  const areaSummary = joinList(professionalProfile.expertiseAreas);
  const stackSummary = joinList(primaryTechnologies.slice(0, 5));

  return `${professionalProfile.fullName} is a ${professionalProfile.primaryRole.toLowerCase()} in ${professionalProfile.location} with ${professionalProfile.yearsOfExperience}, focused on ${areaSummary} with ${stackSummary}.`;
}

export function getProjectPageLead(
  projectCount: number,
  mobileCount: number,
  webCount: number,
) {
  return `${projectCount} selected projects spanning ${webCount} web builds and ${mobileCount} mobile builds across ${joinList(primaryTechnologies.slice(0, 5))}.`;
}
