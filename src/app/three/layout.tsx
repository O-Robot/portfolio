import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import { getThreeMetadata } from "@/utils/metadata";
import { buildWebPageSchema } from "@/utils/schema";

export const metadata = getThreeMetadata();

export default function ThreeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="three-jsonld"
        data={buildWebPageSchema(
          "/three",
          "Three.js Showcase",
          metadata.description as string,
        )}
      />
      {children}
    </>
  );
}
