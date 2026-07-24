import type { ReactNode } from "react";

import { getContactMetadata } from "@/utils/metadata";

export const metadata = getContactMetadata();

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
