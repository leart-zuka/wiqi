"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { setCookie } from "cookies-next";
import { ChevronLeft, ChevronRight, Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

interface PostClientProps {
    post: any;
    params: {
        locale: string;
        subfolder: string;
        slug: string;
        difficulty: string;
    };
    readingTime: number;
    tldrContent: string | null;
    toc: string[];
}

export default function PostClient({
    post,
    params,
    readingTime,
    tldrContent,
    toc,
}: PostClientProps) {
    const t = useTranslations("Posts");
    const router = useRouter();
    const pathname = usePathname();
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    
    // Format date in European format (DD.MM.YYYY)
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        } catch {
            return dateString;
        }
    };
    
    const difficulties = [
        {
            id: "elementary",
            emoji: "🧑‍🏫",
            label: "Elementary",
            bg: "bg-green-500 dark:bg-green-600",
        },
        {
            id: "highschool",
            emoji: "🧑‍🎓",
            label: "High School",
            bg: "bg-yellow-500 dark:bg-yellow-600",
        },
        {
            id: "college",
            emoji: "🧑‍🔬",
            label: "College",
            bg: "bg-red-500 dark:bg-red-600",
        },
    ];
    
    const currentDifficultyIndex = difficulties.findIndex(d => d.id === params.difficulty);
    
    const switchDifficulty = (newDifficulty: string) => {
        // Get all path segments
        const pathSegments = pathname.split('/');
        // Find the index of difficulty in the path (it's at index 3: /en/posts/entries/[difficulty]/slug)
        const difficultyIndex = pathSegments.indexOf(params.difficulty);
        
        if (difficultyIndex !== -1) {
            // Replace the difficulty segment
            pathSegments[difficultyIndex] = newDifficulty;
            const newPath = pathSegments.join('/');
            setCookie("difficulty", newDifficulty);
            router.push(newPath);
        }
    };
    
    // Helper function to generate IDs for headings
    const generateHeadingId = (text: string) => {
        // Remove brackets before generating ID to ensure matching between TOC and headings
        const cleanText = text.replace(/[\[\]]/g, '');
        return cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    };
    
    // Helper function to extract text from React children (handles links, etc.)
    const extractTextFromChildren = (children: any): string => {
        if (typeof children === 'string') {
            return children;
        }
        if (Array.isArray(children)) {
            return children.map(child => extractTextFromChildren(child)).join('');
        }
        if (children && typeof children === 'object' && 'props' in children) {
            return extractTextFromChildren(children.props.children);
        }
        return '';
    };
    
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Modern Scroll Progress Bar */}
            <ScrollProgressBar
                position="sticky"
                contentOnly={true}
                ariaLabel="Article reading progress"
                minProgress={1}
                showOnMobile={false}
            />
            
            {/* Banner */}
            <header className="border-b border-slate-200 bg-slate-50 px-4 py-8 dark:border-slate-800 dark:bg-slate-950 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                                {post.data.title}
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 md:text-base">
                                {post.data.subtitle}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <span>{formatDate(post.data.date)}</span>
                                <span>•</span>
                                <span>{t("average reading time")}: ~{readingTime} m</span>
                                {post.data.author && (
                                    <>
                                        <span>•</span>
                                        <span>By {post.data.author}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="mx-auto max-w-7xl">
                <div className="flex gap-6">
                    {/* Left Sidebar - Desktop */}
                    {isLeftSidebarOpen ? (
                        <aside className="hidden lg:block w-64 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Card className="p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Navigation</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsLeftSidebarOpen(false)}
                                            className="h-6 w-6"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {toc.length > 0 && (
                                        <nav className="max-h-[60vh] space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                                            {toc.map((heading, index) => {
                                                const id = generateHeadingId(heading);
                                                return (
                                                    <a
                                                        key={index}
                                                        href={`#${id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const element = document.getElementById(id);
                                                            if (element) {
                                                                const offset = 80; // Add space above the heading
                                                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                                                const offsetPosition = elementPosition - offset;
                                                                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                    >
                                                        {heading}
                                                    </a>
                                                );
                                            })}
                                        </nav>
                                    )}
                                    <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                                        <Link 
                                            href={`/${params.locale}/posts/${params.subfolder}`}
                                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Back to Posts
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </aside>
                    ) : (
                        <aside className="hidden lg:block w-12 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsLeftSidebarOpen(true)}
                                    className="h-10 w-10"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </div>
                        </aside>
                    )}
                    
                    {/* Main Content */}
                    <main className="min-w-0 flex-1">
                        {/* TLDR Section */}
                        {tldrContent && (
                            <section className="my-6 rounded-lg border-2 border-blue-500 bg-blue-50 p-6 dark:border-blue-600 dark:bg-blue-950/20">
                                <h2 className="mb-3 text-xl font-bold text-blue-900 dark:text-blue-100">
                                    TL;DR
                                </h2>
                                <div className="prose prose-sm max-w-none text-blue-800 dark:text-blue-200">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {tldrContent}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}
                        
                        {/* Article */}
                        <article className="prose prose-lg mx-auto max-w-3xl px-4 py-6 text-justify text-slate-900 dark:prose-invert dark:text-white">
                            <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[
                                    [rehypeKatex, { throwOnError: false, strict: false }],
                                ]}
                                components={{
                                    h2({ node, children, ...props }) {
                                        const headingText = extractTextFromChildren(children);
                                        const id = generateHeadingId(headingText);
                                        return (
                                            <h2 id={id} {...props}>
                                                {children}
                                            </h2>
                                        );
                                    },
                                    h3({ node, children, ...props }) {
                                        const headingText = extractTextFromChildren(children);
                                        const id = generateHeadingId(headingText);
                                        return (
                                            <h3 id={id} {...props}>
                                                {children}
                                            </h3>
                                        );
                                    },
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
                    </main>
                    
                    {/* Right Sidebar - Desktop */}
                    {isRightSidebarOpen ? (
                        <aside className="hidden lg:block w-64 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Card className="p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Difficulty</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsRightSidebarOpen(false)}
                                            className="h-6 w-6"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {difficulties.map((difficulty) => (
                                            <Button
                                                key={difficulty.id}
                                                variant={params.difficulty === difficulty.id ? "default" : "outline"}
                                                className="w-full justify-start"
                                                onClick={() => switchDifficulty(difficulty.id)}
                                            >
                                                <span className="mr-2">{difficulty.emoji}</span>
                                                {difficulty.label}
                                            </Button>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </aside>
                    ) : (
                        <aside className="hidden lg:block w-12 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsRightSidebarOpen(true)}
                                    className="h-10 w-10"
                                >
                                    <GraduationCap className="h-5 w-5" />
                                </Button>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
            
            {/* Mobile Bottom Bar - Difficulty Switcher */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
                <div className="relative mx-auto flex h-14 w-full max-w-md items-center overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-gray-800">
                    {/* Sliding background indicator */}
                    <div
                        className={`absolute left-0 top-0 h-full w-1/3 rounded-full shadow-lg transition-all duration-500 ease-out ${currentDifficultyIndex !== -1 ? difficulties[currentDifficultyIndex].bg : difficulties[0].bg}`}
                        style={{
                            transform: `translateX(${currentDifficultyIndex !== -1 ? currentDifficultyIndex * 100 : 0}%)`,
                        }}
                    ></div>
                    
                    {/* Difficulty buttons */}
                    {difficulties.map((difficulty, index) => {
                        const isSelected = index === currentDifficultyIndex;
                        return (
                            <button
                                key={difficulty.id}
                                className={`relative z-10 flex-1 rounded-full text-center font-bold transition-all duration-300 ${
                                    isSelected
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-400"
                                } hover:scale-105 active:scale-95`}
                                onClick={() => switchDifficulty(difficulty.id)}
                            >
                                <span className="text-lg">{difficulty.emoji}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

