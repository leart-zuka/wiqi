import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { getPostContent } from "@/app/components/server_utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import wordsCounter from "word-counting";
import PostClient from "./PostClient";
import "katex/dist/katex.min.css";
import "./page.css";

export default async function Post({
    params,
}: {
    params: {
        locale: string;
        subfolder: string;
        slug: string;
        difficulty: string;
    };
}) {
    const post = getPostContent(
        `${params.locale}/${params.difficulty}/${params.subfolder}`,
        params.slug,
    );

    const numberOfWords = wordsCounter(post.content).wordsCount;
    const readingTime = Math.ceil(numberOfWords / 200);

    // Extract TLDR section from content
    const extractTLDR = (content: string) => {
        const tldrRegex = /## TLDR\n\n([\s\S]*?)(?=\n## |$)/i;
        const match = content.match(tldrRegex);
        return match ? match[1].trim() : null;
    };

    const tldrContent = extractTLDR(post.content);

    // Extract table of contents from markdown
    const extractTOC = (content: string) => {
        const headingRegex = /^#{2,3}\s+(.+)$/gm;
        const headings = [];
        let match;
        while ((match = headingRegex.exec(content)) !== null) {
            // Strip markdown links from headings: [text](url) becomes "[text]"
            const cleanHeading = match[1]
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '[$1]') // Convert [text](url) to [text]
                .trim();
            headings.push(cleanHeading);
        }
        return headings;
    };

    const toc = extractTOC(post.content);

    // Serialize post data to plain object for client component
    const postData = {
        content: post.content,
        data: post.data,
    };

    return (
        <PostClient
            post={postData}
            params={params}
            readingTime={readingTime}
            tldrContent={tldrContent}
            toc={toc}
        />
    );
}