import type { Metadata } from "next";

import about from "@/data/about.json";
import contact from "@/data/contact.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import {
  getProfessionalSummary,
  getProjectPageLead,
  primaryTechnologies,
  professionalProfile,
} from "@/utils/profile";

const portfolioProject =
  projects.find((project) => project.url === "https://ogooluwaniadewale.com") ??
  projects[0];

const siteUrl = portfolioProject?.url || "https://ogooluwaniadewale.com";
const siteName = `${about.name} Portfolio`;
const location = contact.location;
const socialImage = portfolioProject?.image || about.image;
const twitterUrl =
  contact.socialMediaLinks.find((link) => link.name === "X")?.link || "";
const twitterHandle = twitterUrl
  ? `@${twitterUrl.replace(/\/$/, "").split("/").pop()}`
  : undefined;

const homepageDescription = getProfessionalSummary();

function cleanText(value: string) {
  return value
    .replace(/\[\[NAME\]\]|\[\[SPEAKER\]\]/g, about.name)
    .replace(/[^\p{L}\p{N}\s.,'&()/+-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toDescription(value: string, maxLength = 160) {
  const cleaned = cleanText(value);
  if (cleaned.length <= maxLength) return cleaned;

  const truncated = cleaned.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 80 ? lastSpace : truncated.length).trim()}.`;
}

function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

function buildKeywords(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

export const metadataSiteConfig = {
  siteUrl,
  siteName,
  personName: about.name,
  location,
  socialImage,
  socialImageUrl: absoluteUrl(socialImage),
  twitterHandle,
  homepageDescription,
  authorEmail: contact.mail,
};

const defaultKeywords = buildKeywords([
  about.name,
  professionalProfile.primaryRole,
  "Frontend Developer",
  "Frontend Engineer",
  "React Developer",
  "Next.js Developer",
  "Angular Developer",
  "React Native Developer",
  "Flutter Developer",
  location,
]);

type PageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  category?: string;
};

export function buildPageMetadata({
  path,
  title,
  description,
  keywords = [],
  image = socialImage,
  category = "technology",
}: PageMetadataOptions): Metadata {
  const canonical = path || "/";
  const pageTitle = title === about.name ? title : `${title} | ${about.name}`;
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: buildKeywords([...defaultKeywords, ...keywords]),
    category,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: pageTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      creator: twitterHandle,
      images: [imageUrl],
    },
  };
}

export function getHomeMetadata(): Metadata {
  const baseMetadata = buildPageMetadata({
    path: "/",
    title: professionalProfile.primaryRole,
    description: homepageDescription,
    keywords: ["TypeScript Developer", "Node.js Developer", "Nigeria", "Lagos"],
    image: socialImage,
    category: "portfolio",
  });

  return {
    ...baseMetadata,
    title: {
      absolute: `${about.name} | Software Developer`,
    },
  };
}

export function getAboutMetadata(): Metadata {
  return buildPageMetadata({
    path: "/about",
    title: `About ${about.name}`,
    description: toDescription(about.about),
    keywords: ["About Ogooluwani Adewale", "Software Developer Bio"],
    image: about.image,
    category: "portfolio",
  });
}

export function getExperienceMetadata(): Metadata {
  const featuredCompanies = experience
    .map((item) => item.company)
    .filter((company, index, list) => list.indexOf(company) === index)
    .slice(0, 4)
    .join(", ");

  return buildPageMetadata({
    path: "/experience",
    title: "Software Development Experience",
    description: `${professionalProfile.fullName}'s experience spans ${featuredCompanies}, with ${professionalProfile.yearsOfExperience} across frontend, web, and mobile delivery.`,
    keywords: ["Frontend Experience", "Software Developer Experience"],
    category: "portfolio",
  });
}

export function getProjectsMetadata(): Metadata {
  const projectCount = projects.length;
  const mobileCount = projects.filter(
    (project) => project.category === "mobile",
  ).length;
  const webCount = projects.filter(
    (project) => project.category === "web",
  ).length;

  return buildPageMetadata({
    path: "/projects",
    title: "Web and Mobile Projects",
    description: getProjectPageLead(projectCount, mobileCount, webCount),
    keywords: ["Portfolio Projects", "Web Projects", "Mobile Projects"],
    image: socialImage,
    category: "portfolio",
  });
}

export function getResumeMetadata(): Metadata {
  const currentRole = experience[0];

  return buildPageMetadata({
    path: "/resume",
    title: `${about.name} Resume`,
    description: `View the resume of ${about.name}, ${currentRole?.title?.toLowerCase() || "software developer"} with experience in ${primaryTechnologies.slice(0, 5).join(", ")}.`,
    keywords: ["Software Developer Resume", "Frontend Resume"],
    category: "resume",
  });
}

export function getContactMetadata(): Metadata {
  return buildPageMetadata({
    path: "/contact",
    title: `Contact ${about.name}`,
    description: `Contact ${about.name} in ${location} for software development, frontend, web, and mobile opportunities.`,
    keywords: ["Contact Ogooluwani Adewale", "Hire Software Developer"],
    category: "contact",
  });
}

export function getThreeMetadata(): Metadata {
  return buildPageMetadata({
    path: "/three",
    title: "Three.js Showcase",
    description: `Explore ${about.name}'s interactive Three.js showcase demonstrating frontend graphics and immersive web experiences.`,
    keywords: ["Three.js Portfolio", "WebGL Showcase", "Frontend Graphics"],
    image: socialImage,
    category: "showcase",
  });
}
