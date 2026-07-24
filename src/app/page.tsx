import type { Metadata } from "next";

import HomePage from "@/app/home/page";
import JsonLd from "@/components/seo/JsonLd";
import { getHomeMetadata } from "@/utils/metadata";
import { buildHomeSchema } from "@/utils/schema";

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default function Page() {
  return (
    <>
      <JsonLd id="home-jsonld" data={buildHomeSchema()} />
      <HomePage />
    </>
  );
}
