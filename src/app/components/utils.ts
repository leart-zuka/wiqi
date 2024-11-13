import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Checks if slug is safe.
 * Denies path traversal by excluding '../' and absolute path.
 * Allows all other symbols.
 * @param slug Decoded slug.
 * @returns true, if slug is valid, else false.
 */
function isValidSlug(slug: string): boolean {
  // Exclusion of invalid paths
  if (slug.includes("..") || path.isAbsolute(slug)) {
    return false;
  }
  return true;
}

/**
 * Read content of a file based on folder and slug.
 * Allows all symbols in slug, but still checks if slug name is valid.
 * @param folder folder, in which post is located in.
 * @param slug Slug of the post (URL-coded).
 * @returns Matter object which includes content and metadata of post.
 */
export function getPostContent(folder: string, slug: string) {
  try {
    console.log("Original slug:", slug);

    // Decoding of slug
    const decodedSlug = decodeURIComponent(slug);
    console.log("Decoded slug:", decodedSlug);

    // Validation of slug
    if (!isValidSlug(decodedSlug)) {
      throw new Error("Invalid symbol in slug.");
    }

    // Optional: Removal of trailing or preceeding spaces
    const sanitizedSlug = decodedSlug.trim();

    // Creation of full file path
    const file = path.join(
      process.cwd(),
      "public",
      "posts",
      folder,
      `${sanitizedSlug}.mdx`,
    );
    console.log("Tried filepath:", file);

    // Path Normalization und Security
    const normalizedPath = path.normalize(file);
    const postsPath = path.join(process.cwd(), "public", "posts", folder);
    if (!normalizedPath.startsWith(postsPath)) {
      throw new Error("Invalid filepath.");
    }

    // Checks if file exists
    if (!fs.existsSync(file)) {
      throw new Error(
        `File ${sanitizedSlug}.mdx doesn't exist in folder ${folder}.`,
      );
    }

    // Reads content of file
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    console.log("Successfully read file contents.");
    return matterResult;
  } catch (error) {
    console.error("Error when reading file contents:", error);
    throw error;
  }
}
