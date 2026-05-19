import { getCollection } from "astro:content";
import { SITE } from "../../../lib/site";

export async function getStaticPaths() {

  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: {
      slug: post.slug
    }
  }));
}

export async function GET({ params }) {

  const posts = await getCollection("blog");

  const post = posts.find(
    (p) => p.slug === params.slug
  );

  const title =
    post?.data.title || SITE.title;

  const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1200"
  height="630"
>

<rect
  width="1200"
  height="630"
  fill="#111827"
/>

<text
  x="60"
  y="160"
  fill="white"
  font-size="64"
  font-family="Arial"
  font-weight="bold"
>
${escapeXML(title)}
</text>

</svg>
`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

function escapeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
