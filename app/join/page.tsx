import { JoinView } from "@/components/contact/join-view";
import { pageMetadata } from "@/lib/seo";
import { buildView } from "@/lib/site";

export const metadata = pageMetadata("join");
export const dynamic = "force-static";

export default function JoinPage() {
  return <JoinView view={buildView()} />;
}
