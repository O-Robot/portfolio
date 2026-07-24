import type { Metadata } from "next";
import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getExperienceMetadata } from "@/utils/metadata";
import { buildExperienceSchema } from "@/utils/schema";

export function generateMetadata(): Metadata {
  return getExperienceMetadata();
}

export default function ExperienceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd id="experience-jsonld" data={buildExperienceSchema()} />
      {children}
    </>
  );
}
