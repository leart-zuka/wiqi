import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPostContent(folder: string, slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const file = path.join(
      process.cwd(),
      "public",
      "posts",
      folder,
      `${decodedSlug}.mdx`,
    );

    if (!fs.existsSync(file)) {
      throw new Error(
        `Die Datei ${decodedSlug}.mdx existiert nicht im Ordner ${folder}.`,
      );
    }

    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    console.error("Fehler beim Lesen des Beitragsinhalts:", error);
    throw error;
  }
}
