import { NextRequest, NextResponse } from "next/server";
import { getMDXDataSingle } from "../helpers/utils";

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
    const folder = `${process.cwd()}/public/posts/${body.folder}`;
    const fileName = `${body.fileName}.mdx`;
    const data = getMDXDataSingle(folder, fileName);
    return NextResponse.json({ post: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Blogpost doesn't exist" },
      { status: 404 },
    );
  }
}
