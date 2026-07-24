import type { Metadata } from "next";
import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getProjectsMetadata } from "@/utils/metadata";
import { buildProjectsSchema } from "@/utils/schema";

export function generateMetadata(): Metadata {
  return getProjectsMetadata();
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd id="projects-jsonld" data={buildProjectsSchema()} />
      {children}
    </>
  );
}
