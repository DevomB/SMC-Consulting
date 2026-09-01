import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function joinPublicUrl(origin, basePath, path) {
  const host = origin.replace(/\/$/, "");
  const base = !basePath || basePath === "/" ? "" : `/${basePath.replace(/^\/|\/$/g, "")}`;
  if (path === "/" || path === "") return `${host}${base}`;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${host}${base}${suffix}`;
}

assert.equal(joinPublicUrl("https://smc.test", "/", "/"), "https://smc.test");
assert.equal(joinPublicUrl("https://smc.test", "/", "/join"), "https://smc.test/join");
assert.equal(
  joinPublicUrl("https://org.github.io", "/smc-website", "/privacy"),
  "https://org.github.io/smc-website/privacy",
);
assert.equal(
  joinPublicUrl("https://org.github.io/", "/smc-website/", "/sitemap.xml"),
  "https://org.github.io/smc-website/sitemap.xml",
);

const seo = readFileSync(join(root, "lib/seo.ts"), "utf8");
const indexLine = seo.split("\n").find((line) => line.includes("INDEXABLE_PATHS ="));
assert.ok(indexLine);
assert.match(indexLine, /\["\/", "\/join", "\/contribute", "\/privacy"\]/);
assert.equal(indexLine.includes("404"), false);
assert.equal(indexLine.includes("insights"), false);
assert.equal(indexLine.includes("blog"), false);
assert.equal(indexLine.includes("resources"), false);

const sitemap = readFileSync(join(root, "app/sitemap.ts"), "utf8");
assert.match(sitemap, /sitemapEntries/);

const robots = readFileSync(join(root, "app/robots.ts"), "utf8");
assert.match(robots, /robotsSpec/);

const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
assert.match(layout, /rootMetadata/);
assert.match(layout, /StructuredData/);

for (const [file, route] of [
  ["app/join/page.tsx", "join"],
  ["app/contribute/page.tsx", "contribute"],
  ["app/privacy/page.tsx", "privacy"],
  ["app/not-found.tsx", "notFound"],
]) {
  const source = readFileSync(join(root, file), "utf8");
  assert.match(source, new RegExp(`pageMetadata\\("${route}"\\)`));
}

console.log("seo checks passed");
