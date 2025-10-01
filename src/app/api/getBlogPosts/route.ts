import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "../helpers/utils";

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
      { error: "Blogpost doesn't exist" },
      { status: 404 },
    );
  }
}
