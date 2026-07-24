import about from "@/data/about.json";
import contact from "@/data/contact.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import { metadataSiteConfig } from "@/utils/metadata";

type JsonLdNode = Record<string, unknown>;

const context = "https://schema.org";
const personId = `${metadataSiteConfig.siteUrl}#person`;
const websiteId = `${metadataSiteConfig.siteUrl}#website`;
const contactPointId = `${metadataSiteConfig.siteUrl}#contact-point`;

const publicProfileLinks = contact.socialMediaLinks
  .map((link) => link.link)
  .filter((link) => /^https?:\/\//i.test(link));

const dedupedOrganizations = experience.reduce<
  Array<{
    id: string;
    name: string;
    url?: string;
    location?: string;
  }>
>((organizations, item) => {
  const name = item.company.trim();
  if (!name || name === "Self-employed") return organizations;

  const id = `${metadataSiteConfig.siteUrl}#org-${slugify(name)}`;
  if (organizations.some((organization) => organization.id === id)) {
    return organizations;
  }

  organizations.push({
    id,
    name,
    url: item.link || undefined,
    location: item.location,
  });

  return organizations;
}, []);

const allTechnologies = Array.from(
  new Set(
    [
      ...experience.flatMap((item) => item.technologies),
      ...projects.flatMap((project) => project.languages.map((language) => language.name)),
    ].filter(Boolean),
  ),
);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function absoluteUrl(path = "/") {
  return new URL(path, metadataSiteConfig.siteUrl).toString();
}

function getBreadcrumbName(path: string) {
  const map: Record<string, string> = {
    "/": "Home",
    "/about": "About",
    "/experience": "Experience",
    "/projects": "Projects",
    "/resume": "Resume",
    "/contact": "Contact",
    "/three": "Three.js Showcase",
  };

  return map[path] ?? "Page";
}

export function buildBreadcrumbSchema(path: string) {
  const segments = path === "/" ? ["/"] : ["/", path];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getBreadcrumbName(segment),
      item: absoluteUrl(segment),
    })),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: metadataSiteConfig.siteUrl,
        name: metadataSiteConfig.siteName,
        alternateName: metadataSiteConfig.personName,
        description: metadataSiteConfig.homepageDescription,
        publisher: {
          "@id": personId,
        },
        inLanguage: "en",
      },
    ],
  };
}

function buildOrganizationNodes(): JsonLdNode[] {
  return dedupedOrganizations.map((organization) => ({
    "@type": "Organization",
    "@id": organization.id,
    name: organization.name,
    url: organization.url,
    location: organization.location
      ? {
          "@type": "Place",
          name: organization.location,
        }
      : undefined,
  }));
}

function buildCreativeWorkNode(project: (typeof projects)[number], index: number) {
  const projectUrl = project.url || project.previewUrl || project.devicePreview || "";

  return {
    "@type": "CreativeWork",
    "@id": `${metadataSiteConfig.siteUrl}#project-${project.id}`,
    position: index + 1,
    name: project.name,
    description: project.description,
    url: projectUrl || undefined,
    image: absoluteUrl(project.image),
    creator: {
      "@id": personId,
    },
    keywords: project.languages.map((language) => language.name),
    genre: project.category,
    dateCreated: project.createdAt,
  };
}

export function buildHomeSchema() {
  const currentProject = projects.find(
    (project) => project.url === metadataSiteConfig.siteUrl,
  );

  return {
    "@context": context,
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: metadataSiteConfig.personName,
        url: metadataSiteConfig.siteUrl,
        image: absoluteUrl(about.image),
        description: metadataSiteConfig.homepageDescription,
        email: `mailto:${metadataSiteConfig.authorEmail}`,
        knowsAbout: allTechnologies,
        sameAs: publicProfileLinks,
        homeLocation: {
          "@type": "Place",
          name: metadataSiteConfig.location,
        },
        worksFor: dedupedOrganizations.map((organization) => ({
          "@id": organization.id,
        })),
      },
      {
        "@type": "ProfilePage",
        "@id": `${metadataSiteConfig.siteUrl}#profile-page`,
        url: metadataSiteConfig.siteUrl,
        name: `${metadataSiteConfig.personName} Portfolio`,
        description: metadataSiteConfig.homepageDescription,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
        breadcrumb: {
          "@id": `${metadataSiteConfig.siteUrl}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(currentProject?.image || about.image),
        },
      },
      buildBreadcrumbSchema("/"),
      ...buildOrganizationNodes(),
    ],
  };
}

export function buildWebPageSchema(path: string, name: string, description: string) {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        breadcrumb: {
          "@id": `${absoluteUrl(path)}#breadcrumb`,
        },
      },
      buildBreadcrumbSchema(path),
    ],
  };
}

export function buildProjectsSchema() {
  const creativeWorks = projects.map(buildCreativeWorkNode);

  return {
    "@context": context,
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/projects")}#collection-page`,
        url: absoluteUrl("/projects"),
        name: "Projects",
        description: `${projects.length} selected web and mobile projects by ${metadataSiteConfig.personName}.`,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": `${absoluteUrl("/projects")}#item-list`,
        },
        breadcrumb: {
          "@id": `${absoluteUrl("/projects")}#breadcrumb`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/projects")}#item-list`,
        name: "Project Portfolio",
        numberOfItems: creativeWorks.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: creativeWorks.map((creativeWork) => ({
          "@type": "ListItem",
          position: creativeWork.position,
          item: {
            "@id": creativeWork["@id"],
          },
        })),
      },
      buildBreadcrumbSchema("/projects"),
      ...creativeWorks,
    ],
  };
}

export function buildExperienceSchema() {
  const organizationNodes = buildOrganizationNodes();

  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/experience")}#webpage`,
        url: absoluteUrl("/experience"),
        name: "Experience",
        description: `${metadataSiteConfig.personName}'s professional experience across software, frontend, media, logistics, and enterprise teams.`,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mentions: organizationNodes.map((organization) => ({
          "@id": organization["@id"],
        })),
        breadcrumb: {
          "@id": `${absoluteUrl("/experience")}#breadcrumb`,
        },
      },
      buildBreadcrumbSchema("/experience"),
      ...organizationNodes,
    ],
  };
}

export function buildContactSchema() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/contact")}#webpage`,
        url: absoluteUrl("/contact"),
        name: "Contact",
        description: `Contact ${metadataSiteConfig.personName} for software development opportunities.`,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": contactPointId,
        },
        breadcrumb: {
          "@id": `${absoluteUrl("/contact")}#breadcrumb`,
        },
      },
      {
        "@type": "ContactPoint",
        "@id": contactPointId,
        contactType: "professional inquiries",
        email: metadataSiteConfig.authorEmail,
        telephone: contact.phone,
        areaServed: contact.location,
        availableLanguage: ["English"],
        url: absoluteUrl("/contact"),
      },
      buildBreadcrumbSchema("/contact"),
    ],
  };
}
