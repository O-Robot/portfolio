import type { ReactNode } from "react";

import { getAboutMetadata } from "@/utils/metadata";

export const metadata = getAboutMetadata();

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
