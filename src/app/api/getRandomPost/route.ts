/**
 * API Route: /api/getRandomPost
 *
 * PURPOSE:
 * This route provides random blog post suggestions for the 404 error page.
 * When users encounter a "Page Not Found" error, instead of just showing a generic
 * 404 page, we offer them a curated suggestion of quantum content to explore.
 * This improves user experience by turning a dead end into an opportunity for discovery.
 *
 * USAGE:
 * - Called by the 404 page components (both global and locale-specific)
 * - Fetches a random post from all available content across languages and difficulties
 * - Returns post metadata and routing information for direct navigation
 *
 * TECHNICAL DETAILS:
 * - Scans all blog post directories: /public/posts/{locale}/{difficulty}/{folder}/
 * - Supports multiple locales (en, de), difficulties (elementary, highschool, college)
 * - Handles both "entries" and "quantum_tuesdays" content folders
 * - Uses gray-matter to parse frontmatter metadata from MDX files
 * - Returns structured data for easy integration with Next.js routing
 * - Validates file existence to prevent suggesting non-existent posts
 *
 * RESPONSE FORMAT:
 * {
 *   post: {
 *     slug: string,           // URL-friendly post identifier
 *     locale: string,         // Language code (en/de)
 *     difficulty: string,     // Content level (elementary/highschool/college)
 *     folder: string,         // Content category (entries/quantum_tuesdays)
 *     metadata: {
 *       title: string,        // Post title for display
 *       subtitle: string,     // Post subtitle/description
 *       author: string,       // Author name
 *       date: string          // Publication date
 *     }
 *   },
 *   totalPosts: number        // Total number of available posts
 * }
 *
 * ERROR HANDLING:
 * - Returns 500 status if file system operations fail
 * - Gracefully handles missing directories or files
 * - Provides fallback behavior in 404 components
 * - Validates file existence before suggesting posts
 *
 * INTEGRATION:
 * - Used in: src/app/not-found.tsx (global 404)
 * - Used in: src/app/[locale]/not-found.tsx (locale-specific 404)
 * - Called via fetch() in useEffect hooks
 * - Supports both client-side and server-side rendering
 *
 * KNOWN ISSUES:
 * - There might be discrepancies between the API's file scanning and the actual
 *   routing logic, potentially suggesting posts that don't exist in the file system.
 * - This can cause users to click on suggestions and get another 404 error.
 * - The API now validates file existence, but edge cases may still occur.
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Frontmatter {
  title: string;
  subtitle: string;
  author: string;
  date: string;
}

interface ParsedMarkdown {
  content: string;
  metadata: Frontmatter;
}

export async function GET() {
  try {
    const locales = ["en", "de"];
    const difficulties = ["elementary", "highschool", "college"];
    const folders = ["entries", "quantum_tuesdays"];

    const allPosts: Array<{
      slug: string;
      locale: string;
      difficulty: string;
      folder: string;
      metadata: Frontmatter;
    }> = [];

    // Collect all available posts with validation
    for (const locale of locales) {
      for (const difficulty of difficulties) {
        for (const folder of folders) {
          const dir = path.join(
            process.cwd(),
            "public/posts",
            locale,
            difficulty,
            folder,
          );
          if (fs.existsSync(dir)) {
            const files = fs
              .readdirSync(dir)
              .filter((file) => file.endsWith(".mdx"));
            for (const file of files) {
              const filePath = path.join(dir, file);
              // Double-check file exists before processing
              if (fs.existsSync(filePath)) {
                try {
                  const { data } = matter(fs.readFileSync(filePath, "utf8"));
                  const slug = path.basename(file, ".mdx");
                  allPosts.push({
                    slug,
                    locale,
                    difficulty,
                    folder,
                    metadata: data as Frontmatter,
                  });
                } catch (error) {
                  // Skip files that can't be parsed
                  console.warn(`Failed to parse ${filePath}:`, error);
                }
              }
            }
          }
        }
      }
    }

    // Ensure we have valid posts before selecting
    if (allPosts.length === 0) {
      return NextResponse.json(
        {
          error: "No valid posts found",
          post: null,
          totalPosts: 0,
        },
        { status: 404 },
      );
    }

    // Select a random post
    const randomPost = allPosts[Math.floor(Math.random() * allPosts.length)];

    return NextResponse.json(
      {
        post: randomPost,
        totalPosts: allPosts.length,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't retrieve random blog post" },
      { status: 500 },
    );
  }
}
