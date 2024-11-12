import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPostContent(folder: string, slug: string) {
  const file = path.join(
    process.cwd(),
    "public",
    "posts",
    folder,
    `${slug}.mdx`,
  );
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
}
