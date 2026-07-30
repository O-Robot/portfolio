import about from "@/data/about.json";
import contact from "@/data/contact.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function prioritizeValues(values: string[], priority: string[]) {
  const prioritySet = new Set(priority);
  const prioritized = priority.filter((value) => values.includes(value));
  const remainder = values.filter((value) => !prioritySet.has(value));

  return [...prioritized, ...remainder];
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

function collectIndustryFocuses() {
  const sourceText = [
    about.about,
    ...experience.map((item) => item.description),
    ...projects.flatMap((project) => [
      project.description,
      project.summary ?? "",
      project.context ?? "",
    ]),
  ]
    .join(" ")
    .toLowerCase();

  const industryMatchers: Array<[string, RegExp]> = [
    ["enterprise software", /\benterprise\b/],
    ["media", /\bmedia\b|\bpodcast\b|\bmagazine\b|\beditorial\b/],
    ["logistics", /\blogistics\b/],
    [
      "business applications",
      /\bbusiness applications?\b|\bdashboard\b|\badmin\b/,
    ],
    [
      "e-commerce",
      /\be-commerce\b|\bcommerce\b|\bshopping\b|\bstorefront\b|\bretail\b/,
    ],
    ["real estate", /\breal estate\b|\bproperty\b/],
    ["digital health", /\bhealth\b|\bchronic conditions\b/],
    ["education", /\beducation\b|\blearning\b|\bedu\b/],
    ["compliance and audit", /\bcompliance\b|\baudit\b|\bdata protection\b/],
  ];

  return industryMatchers
    .filter(([, matcher]) => matcher.test(sourceText))
    .map(([industry]) => industry);
}

function collectFrameworkFocus() {
  return primaryTechnologies.filter((technology) =>
    [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "React Native",
      "Flutter",
      "TypeScript",
    ].includes(technology),
  );
}

export const primaryTechnologies = prioritizeValues(
  unique([
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
      "React Native",
      "Vue.js",
      "Vue",
      "TypeScript",
      "Node.js",
      "Flutter",
      "Expo",
      "WordPress",
      "Shopify",
    ].includes(technology),
  ),
  ["React"],
);

export const professionalProfile = {
  frameworkFocus: collectFrameworkFocus(),
  expertiseAreas: collectExpertiseAreas(),
  fullName: about.name,
  industryFocuses: collectIndustryFocuses(),
  location: contact.location,
  preferredContactPath: "/contact",
  primaryRole: "Software Developer",
  tagline: about.tagline,
  yearsOfExperience: extractYearsOfExperience(about.about),
};

export function getProfessionalSummary() {
  const areaSummary = joinList(professionalProfile.expertiseAreas);
  const stackSummary = joinList(primaryTechnologies.slice(0, 5));

  return `${professionalProfile.fullName} is a ${professionalProfile.primaryRole.toLowerCase()} in ${professionalProfile.location} with ${professionalProfile.yearsOfExperience}, focused on ${areaSummary} with ${stackSummary}.`;
}

export function getHomepageValueProposition() {
  const frameworkSummary = joinList(
    professionalProfile.frameworkFocus.slice(0, 4),
  );

  return `Building fast, accessible web and mobile products with ${frameworkSummary}.`;
}

export function getHomepageProofLine() {
  const industrySummary = joinList(
    professionalProfile.industryFocuses.slice(0, 6),
  );

  return `${professionalProfile.yearsOfExperience} across ${industrySummary}.`;
}

export function getProjectPageLead(
  projectCount: number,
  mobileCount: number,
  webCount: number,
) {
  return `${projectCount} selected projects spanning ${webCount} web builds and ${mobileCount} mobile builds across ${joinList(primaryTechnologies.slice(0, 6))}.`;
}
