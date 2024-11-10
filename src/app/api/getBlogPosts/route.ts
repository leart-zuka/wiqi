import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.debug(body.folder, body.language, body.difficulty);
    const files = getBlogPosts(body.folder, body.language, body.difficulty);
    console.debug(files);
    return NextResponse.json({ files: files }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't retrieve blog posts" },
      { status: 500 },
    );
  }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, "utf8");
  return matter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir); // file names of all posts

  return mdxFiles.map((file) => {
    let { data: metadata, content } = readMDXFile(path.join(dir, file));
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
