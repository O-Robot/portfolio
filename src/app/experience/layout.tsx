import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getExperienceMetadata } from "@/utils/metadata";

export function generateMetadata(): Metadata {
  return getExperienceMetadata();
}

export default function ExperienceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
