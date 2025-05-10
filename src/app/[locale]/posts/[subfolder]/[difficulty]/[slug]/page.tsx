import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { getPostContent } from "@/app/components/server_utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import wordsCounter from "word-counting";
import { useTranslations } from "next-intl";
import "katex/dist/katex.min.css";
import "./page.css";

export default function Post({
  params,
}: {
  params: {
    locale: string;
    subfolder: string;
    slug: string;
    difficulty: string;
  };
}) {
  const t = useTranslations("Posts");
  const post = getPostContent(
    `${params.locale}/${params.difficulty}/${params.subfolder}`,
    params.slug,
  );
  const numberOfWords = wordsCounter(post.content).wordsCount;
  const readingTime = Math.ceil(numberOfWords / 200);
  return (
    <div className="mt-28">
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600">{post.data.title}</h1>
        <p className="mt-2 text-slate-400">{post.data.date}</p>
        <p className="mt-2 text-slate-400">
          {t("average reading time")}: ~{readingTime} m
        </p>
      </div>

      <article className="prose mx-auto block max-w-2xl px-6 text-black dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white dark:prose-code:bg-slate-500 dark:prose-code:text-white dark:prose-li:marker:text-white">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            [rehypeKatex, { throwOnError: false, strict: false }],
          ]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter customStyle={atomDark} language={match[1]}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
