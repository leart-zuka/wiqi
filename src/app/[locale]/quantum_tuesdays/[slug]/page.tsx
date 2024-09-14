import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { getPostContent } from "@/app/components/utils";

export default function Post({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = getPostContent("quantum_tuesdays", params.slug);
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600 ">{post.data.title}</h1>
        <p className="text-slate-400 mt-2">{post.data.date}</p>
      </div>

      <article className="prose text-black mx-auto max-w-2xl px-6">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
