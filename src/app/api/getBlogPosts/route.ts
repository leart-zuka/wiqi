import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Response {
  metadata: {
    title: string;
    subtitle: string;
    author: string;
    date: string;
  };
  slug: string;
  content: string;
  folder: string;
}

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response: Response[] = [];
    body.folder.forEach((folder: string) => {
      const files_in_folder = getBlogPosts(
        folder,
        body.language,
        body.difficulty,
      );
      files_in_folder.forEach((file) => {
        response.push({
          metadata: file.metadata,
          slug: file.slug,
          content: file.content,
          folder: folder,
        });
      });
    });
    return NextResponse.json({ files: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't retrieve blog posts" },
      { status: 500 },
    );
  }
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor): ParsedMarkdown {
  let rawContent = fs.readFileSync(filePath, "utf8");
  let { data, content } = matter(rawContent);
  return {
    metadata: data as Frontmatter,
    content,
  };
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir); // file names of all posts

  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

function getBlogPosts(folder: string, locale: string, difficulty: string) {
  return getMDXData(
    path.join(
      `${process.cwd()}/public/posts/${locale}/${difficulty}/${folder}`,
    ),
  );
}
