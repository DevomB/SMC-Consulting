import { ContributeView } from "@/components/contact/contribute-view";
import { pageMetadata } from "@/lib/seo";
import { buildView } from "@/lib/site";

export const metadata = pageMetadata("contribute");
export const dynamic = "force-static";

export default function ContributePage() {
  return <ContributeView view={buildView()} />;
}
