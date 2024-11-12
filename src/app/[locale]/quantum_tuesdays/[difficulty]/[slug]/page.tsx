import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getPostContent } from "@/app/components/utils";

export default function Post({
  params,
}: {
  params: { locale: string; slug: string; difficulty: string };
}) {
  const post = getPostContent(
    `${params.locale}/${params.difficulty}/quantum_tuesdays`,
    params.slug,
  );
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600">{post.data.title}</h1>
        <p className="mt-2 text-slate-400">{post.data.date}</p>
      </div>

      <article className="prose mx-auto block max-w-2xl px-6 text-black">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]} // need both remark and rehype plugins for proper latex rendering
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
