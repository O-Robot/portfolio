import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getProjectsMetadata } from "@/utils/metadata";

export function generateMetadata(): Metadata {
  return getProjectsMetadata();
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
