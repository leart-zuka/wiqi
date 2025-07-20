import fs from "fs";
import matter from "gray-matter";
import path from "path";

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

function getMDXDataMultiple(dir: string) {
  let mdxFiles = getMDXFiles(dir); // file names of all posts
  let data = mdxFiles.map((file) => getMDXDataSingle(dir, file));
  return data;
}

export function getMDXDataSingle(dir: string, file: string) {
  let { metadata, content } = readMDXFile(path.join(dir, file));
  let slug = path.basename(file, path.extname(file));
  return {
    metadata,
    slug,
    content,
  };
}

export function getBlogPosts(
  folder: string,
  locale: string,
  difficulty: string,
) {
  return getMDXDataMultiple(
    path.join(
      `${process.cwd()}/public/posts/${locale}/${difficulty}/${folder}`,
    ),
  );
}
