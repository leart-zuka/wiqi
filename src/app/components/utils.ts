import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, "utf8");
  return matter(rawContent);
}

export function getMDXData(dir: string) {
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

export function getBlogPosts(
  folder: string,
  locale: string,
  difficulty: string,
) {
  return getMDXData(
    path.join(process.cwd(), "public", "posts", locale, difficulty, folder),
  );
}
