import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

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
    // Decoding of slug
    const decodedSlug = decodeURIComponent(slug);

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

    // Path Normalization und Security
    const normalizedPath = path.normalize(file);
    const postsPath = path.join(process.cwd(), "public", "posts", folder);
    if (!normalizedPath.startsWith(postsPath)) {
      throw new Error("Invalid filepath.");
    }

    // Checks if file exists
    if (!fs.existsSync(file)) {
      // Instead of throwing an error, redirect to 404 page
      notFound();
    }

    // Reads content of file
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    console.error("Error when reading file contents:", error);
    throw error;
  }
}

/**
 * switches locale from de to en and vice verca
 * @param locale current locale (language)
 * @param pathName current path of the website which the user is on
 * @returns new pathName with switched out locale
 */
function replaceLocale(locale: string, pathName: string) {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
}

// Determine contrasting color
function getContrastingColor(bgColor: string) {
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return "black"; // Fallback if parsing fails

  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}

function getBackgroundColorBehindNav(nav: HTMLElement): string {
  const originalPointerEvents = nav.style.pointerEvents;
  nav.style.pointerEvents = "none";

  const rect = nav.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const elBehindNav = document.elementFromPoint(
    centerX,
    centerY,
  ) as HTMLElement;

  nav.style.pointerEvents = originalPointerEvents;

  if (!elBehindNav) return "rgb(255, 255, 255)";

  let bgColor = window.getComputedStyle(elBehindNav).backgroundColor;

  let parent = elBehindNav.parentElement;
  while (
    parent &&
    (bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)")
  ) {
    bgColor = window.getComputedStyle(parent).backgroundColor;
    parent = parent.parentElement;
  }

  return bgColor;
}
