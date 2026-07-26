import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getAboutMetadata } from "@/utils/metadata";
import { buildWebPageSchema } from "@/utils/schema";

export const metadata = getAboutMetadata();

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="about-jsonld"
        data={buildWebPageSchema(
          "/about",
          "About Ogooluwani Adewale",
          metadata.description as string,
        )}
      />
      {children}
    </>
  );
}
