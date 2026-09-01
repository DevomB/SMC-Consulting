import type { MetadataRoute } from "next";
import { robotsSpec } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return robotsSpec();
}
