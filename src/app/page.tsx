import type { Metadata } from "next";

import HomePage from "@/app/home/page";
import { getHomeMetadata } from "@/utils/metadata";

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default HomePage;
