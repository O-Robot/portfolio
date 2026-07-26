import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getResumeMetadata } from "@/utils/metadata";
import { buildWebPageSchema } from "@/utils/schema";

export const metadata = getResumeMetadata();

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="resume-jsonld"
        data={buildWebPageSchema(
          "/resume",
          "Ogooluwani Adewale Resume",
          metadata.description as string,
        )}
      />
      {children}
    </>
  );
}
