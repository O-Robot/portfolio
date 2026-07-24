import type { ReactNode } from "react";

import { getResumeMetadata } from "@/utils/metadata";

export const metadata = getResumeMetadata();

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return children;
}
