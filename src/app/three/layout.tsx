import type { ReactNode } from "react";

import { getThreeMetadata } from "@/utils/metadata";

export const metadata = getThreeMetadata();

export default function ThreeLayout({ children }: { children: ReactNode }) {
  return children;
}
