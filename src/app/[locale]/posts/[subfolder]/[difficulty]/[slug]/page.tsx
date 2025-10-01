"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import wordsCounter from "word-counting";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import "./page.css";

interface PostMetadata {
  title: string;
  subtitle: string;
  author: string;
  date: string;
}

interface BlogPost {
  metadata: PostMetadata;
  slug: string;
  content: string;
}

// Optional: define API response shape
interface ApiResponse {
  post?: BlogPost;
  error?: string;
}

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

  const [file, setFile] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [readingTime, setReadingTime] = useState<number | null>(null);
  const getFile = async (
    difficulty: string,
    locale: string,
    subfolder: string,
    slug: string,
  ) => {
    try {
      const response = await fetch("/api/getSingularBlogPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: `/${locale}/${difficulty}/${subfolder}`,
          fileName: slug,
        }),
      });

      if (!response.ok) {
        notFound();
      }

      const data: ApiResponse = await response.json();

      if (data.post) {
        setFile(data.post);
        setError(null);
        // Calculate reading time
        const wordCount = wordsCounter(data.post.content).wordsCount;
        setReadingTime(Math.ceil(wordCount / 200));
      } else {
        notFound();
      }
    } catch (err: any) {
      console.error("Failed to fetch blog post:", err);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFile(params.difficulty, params.locale, params.subfolder, params.slug);
  }, [params]);
  if (loading) return <p className="mt-20 text-center">Loading...</p>;
  if (!file) notFound();

  return (
    <div className="my-28">
      <div className="my-12 text-center">
        <h1 className="text-3xl font-bold text-slate-600 dark:text-white">
          {file.metadata.title}
        </h1>
        <p className="mt-2 text-slate-400">
          {file.metadata.date} · {readingTime} min read
        </p>
        {file.metadata.subtitle && (
          <p className="mt-1 italic text-slate-500">{file.metadata.subtitle}</p>
        )}
      </div>

      <article className="prose prose-lg mx-auto max-w-2xl px-6 text-justify text-black dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white dark:prose-code:bg-slate-600 dark:prose-code:text-white dark:prose-li:marker:text-white">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            [rehypeKatex, { throwOnError: false, strict: false }],
          ]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ borderRadius: "0.5rem", padding: "1rem" }}
                >
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
          {file.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
