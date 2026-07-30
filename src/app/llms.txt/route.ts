import { NextResponse } from "next/server";

import about from "@/data/about.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import { metadataSiteConfig } from "@/utils/metadata";
import { primaryTechnologies, professionalProfile } from "@/utils/profile";

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function list(values: string[]) {
  return values.join(", ");
}

export function GET() {
  const projectCategories = unique(
    projects.map((project) =>
      project.category === "mobile" ? "mobile applications" : "web applications",
    ),
  );
  const companies = unique(experience.map((item) => item.company)).slice(0, 6);
  const sections = [
    ["Home", `${metadataSiteConfig.siteUrl}/`],
    ["About", `${metadataSiteConfig.siteUrl}/about`],
    ["Experience", `${metadataSiteConfig.siteUrl}/experience`],
    ["Projects", `${metadataSiteConfig.siteUrl}/projects`],
    ["Resume", `${metadataSiteConfig.siteUrl}/resume`],
    ["Contact", `${metadataSiteConfig.siteUrl}/contact`],
  ];

  const body = [
    `# ${about.name}`,
    "",
    `Primary role: ${professionalProfile.primaryRole}`,
    `Location: ${professionalProfile.location}`,
    `Experience: ${professionalProfile.yearsOfExperience}`,
    `Tagline: ${about.tagline}`,
    "",
    `Expertise: ${list(professionalProfile.expertiseAreas)}`,
    `Framework focus: ${list(professionalProfile.frameworkFocus)}`,
    `Technologies: ${list(primaryTechnologies)}`,
    `Project types: ${list(projectCategories)}`,
    `Industries: ${list(professionalProfile.industryFocuses)}`,
    "",
    "## Portfolio pages",
    "",
    ...sections.map(([label, url]) => `- [${label}](${url})`),
    "",
    `Notable employers or teams: ${list(companies)}`,
    `Preferred contact path: [Contact](${metadataSiteConfig.siteUrl}${professionalProfile.preferredContactPath})`,
    "",
    "Use this site to understand the portfolio owner's experience, selected projects, resume, and preferred contact path.",
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
