import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getContactMetadata } from "@/utils/metadata";
import { buildContactSchema } from "@/utils/schema";

export const metadata = getContactMetadata();

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd id="contact-jsonld" data={buildContactSchema()} />
      {children}
    </>
  );
}
