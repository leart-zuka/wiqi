"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { ChevronLeft, X, Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    const [readingProgress, setReadingProgress] = useState(0);
    
    // Progress bar
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
            setReadingProgress(Math.min(100, Math.max(0, scrollPercentage)));
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
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
        const newPath = pathname.replace(/\/[^\/]+\//, `/${newDifficulty}/`);
        setCookie("difficulty", newDifficulty);
        router.push(newPath);
    };
    
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Progress Bar - Desktop Only */}
            <div className="sticky top-0 z-50 hidden h-1 bg-slate-200 dark:bg-slate-800 md:block">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>
            
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
                                <span>{post.data.date}</span>
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
                    <aside className={`hidden lg:block transition-all duration-300 ${isLeftSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                        <div className="sticky top-1 py-6">
                            <Card className="p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Navigation</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                                        className="h-6 w-6"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                {toc.length > 0 && (
                                    <nav className="space-y-2">
                                        {toc.map((heading, index) => (
                                            <a
                                                key={index}
                                                href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                            >
                                                {heading}
                                            </a>
                                        ))}
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
                    
                    {/* Mobile: Show sidebar toggle button if sidebar is hidden */}
                    {!isLeftSidebarOpen && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="fixed left-4 top-24 z-40 lg:hidden"
                            onClick={() => setIsLeftSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
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
                    <aside className={`hidden lg:block transition-all duration-300 ${isRightSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                        <div className="sticky top-1 py-6">
                            <Card className="p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Difficulty</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                                        className="h-6 w-6"
                                    >
                                        <X className="h-4 w-4" />
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
                    
                    {/* Mobile: Show sidebar toggle button if sidebar is hidden */}
                    {!isRightSidebarOpen && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="fixed right-4 top-24 z-40 lg:hidden"
                            onClick={() => setIsRightSidebarOpen(true)}
                        >
                            <GraduationCap className="h-5 w-5" />
                        </Button>
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

