import { jsonLdDocument } from "@/lib/seo";

export function StructuredData() {
  const document = jsonLdDocument();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(document).replace(/</g, "\\u003c"),
      }}
    />
  );
}
