import { externalRel } from "@/lib/utils";

export function AnnouncementBar({
  text,
  href,
}: {
  text: string;
  href: string;
  endsAt?: string;
}) {
  const isHttp = href.startsWith("https://");
  return (
    <a className="announcement" href={href} {...(isHttp ? externalRel(true) : {})}>
      {text}
    </a>
  );
}
