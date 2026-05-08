"use client";

import { useState, useEffect } from "react";
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
import { ShareWidget } from "@/components/ShareWidget";

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
    const [randomPosts, setRandomPosts] = useState<{ title: string; subtitle: string; slug: string }[]>([]);
    
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
    
    // Get category label for banner
    const getCategoryLabel = () => {
        if (params.subfolder === "quantum_tuesdays") {
            return t("quantum tuesday");
        } else if (params.subfolder === "entries") {
            return "Quantum";
        }
        return params.subfolder;
    };
    
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
    
    // Fetch random posts for "Read Next" widget
    useEffect(() => {
        const fetchRandomPosts = async () => {
            try {
                const response = await fetch("/api/getBlogPosts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        language: params.locale,
                        difficulty: params.difficulty,
                        folder: [params.subfolder],
                    }),
                });
                const data = await response.json();
                
                if (data.files && data.files.length > 0) {
                    // Filter out current post
                    const otherPosts = data.files.filter((file: any) => file.slug !== params.slug);
                    
                    if (otherPosts.length > 0) {
                        // Shuffle array and pick up to 3 random posts
                        const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
                        const selectedPosts = shuffled.slice(0, Math.min(3, shuffled.length));
                        
                        setRandomPosts(
                            selectedPosts.map((post: any) => ({
                                title: post.metadata.title,
                                subtitle: post.metadata.subtitle || '',
                                slug: post.slug,
                            }))
                        );
                    }
                }
            } catch (error) {
                console.error("Failed to fetch random posts:", error);
            }
        };
        
        fetchRandomPosts();
    }, [params.locale, params.difficulty, params.subfolder, params.slug]);
    
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
            <header className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-8 dark:border-slate-800 dark:bg-slate-900 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(236,72,153,0.35)] md:p-12 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                        {/* Quantum Particle Field - Floating Particles */}
                        <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-40 dark:group-hover:opacity-30">
                            {/* Left side particles */}
                            <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg shadow-pink-500/50 transition-all duration-500 group-hover:shadow-pink-500/60" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute left-1/3 top-2/3 h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 transition-all duration-500 group-hover:shadow-blue-500/60" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute left-1/5 top-1/2 h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50 transition-all duration-500 group-hover:shadow-purple-500/60" style={{ animationDelay: '1s' }}></div>
                            
                            {/* Center particles */}
                            <div className="absolute left-1/2 top-1/3 h-1.5 w-1.5 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50 transition-all duration-500 group-hover:shadow-cyan-500/60" style={{ animationDelay: '0.3s' }}></div>
                            <div className="absolute left-1/2 top-2/3 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 to-purple-400 shadow-lg shadow-violet-500/50 transition-all duration-500 group-hover:shadow-violet-500/60" style={{ animationDelay: '0.8s' }}></div>
                            
                            {/* Right side particles */}
                            <div className="absolute right-1/4 top-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow-lg shadow-indigo-500/50 transition-all duration-500 group-hover:shadow-indigo-500/60" style={{ animationDelay: '1.2s' }}></div>
                            <div className="absolute right-1/3 bottom-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/50 transition-all duration-500 group-hover:shadow-emerald-500/60" style={{ animationDelay: '1.5s' }}></div>
                            <div className="absolute right-1/5 top-1/2 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-rose-400 to-pink-400 shadow-lg shadow-rose-500/50 transition-all duration-500 group-hover:shadow-rose-500/60" style={{ animationDelay: '0.7s' }}></div>
                        </div>
                        
                        {/* Quantum Entanglement Visualization - Left Qubit */}
                        <div className="absolute left-0 top-1/2 h-48 w-48 -translate-x-1/4 -translate-y-1/2 rounded-full bg-pink-500/30 blur-2xl transition-all duration-700 group-hover:bg-pink-500/40 group-hover:scale-105 md:h-64 md:w-64 dark:group-hover:bg-pink-500/50 dark:group-hover:scale-110">
                            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-400/50 bg-pink-500/20 backdrop-blur-sm transition-all duration-700 group-hover:border-pink-400/60"></div>
                            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-pink-300/50"></div>
                            {/* Quantum state particles around left qubit */}
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(24px) translateY(0px)' }}></div>
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(-24px) translateY(0px)', animationDelay: '0.3s' }}></div>
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(0px) translateY(24px)', animationDelay: '0.6s' }}></div>
                        </div>
                        
                        {/* Quantum Entanglement Visualization - Right Qubit */}
                        <div className="absolute right-0 top-1/2 h-48 w-48 translate-x-1/4 -translate-y-1/2 rounded-full bg-slate-700/50 blur-2xl transition-all duration-700 group-hover:bg-slate-600/55 group-hover:scale-105 md:h-64 md:w-64 dark:group-hover:bg-slate-600/60 dark:group-hover:scale-110">
                            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-400/50 bg-slate-600/20 backdrop-blur-sm transition-all duration-700 group-hover:border-slate-400/60"></div>
                            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-slate-300/50" style={{ animationDelay: '0.5s' }}></div>
                            {/* Quantum state particles around right qubit */}
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(24px) translateY(0px)' }}></div>
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(-24px) translateY(0px)', animationDelay: '0.3s' }}></div>
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(0px) translateY(24px)', animationDelay: '0.6s' }}></div>
                        </div>
                        
                        {/* Quantum Wave Patterns - Inspired by not-found.tsx */}
                        <svg 
                            className="absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-25 dark:group-hover:opacity-20"
                            viewBox="0 0 1000 200"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(236,72,153,0.4)" />
                                    <stop offset="50%" stopColor="rgba(168,85,247,0.3)" />
                                    <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
                                </linearGradient>
                                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                                    <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
                                    <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
                                </linearGradient>
                            </defs>
                            {/* Wave pattern 1 */}
                            <path
                                d="M 0,100 Q 125,60 250,100 T 500,100 T 750,100 T 1000,100"
                                stroke="url(#wave1)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-pulse"
                            />
                            {/* Wave pattern 2 */}
                            <path
                                d="M 0,100 Q 125,140 250,100 T 500,100 T 750,100 T 1000,100"
                                stroke="url(#wave2)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            />
                        </svg>
                        
                        {/* Quantum Particle Connections - Dynamic Lines */}
                        <svg 
                            className="absolute inset-0 h-full w-full opacity-10 transition-opacity duration-500 group-hover:opacity-15 dark:group-hover:opacity-20"
                            viewBox="0 0 1000 200"
                            preserveAspectRatio="none"
                        >
                            {/* Connection lines between qubits */}
                            <line 
                                x1="200" 
                                y1="100" 
                                x2="800" 
                                y2="100" 
                                stroke="rgba(236,72,153,0.3)" 
                                strokeWidth="1" 
                                strokeDasharray="5,5"
                                className="animate-pulse"
                            />
                            {/* Additional quantum state lines */}
                            <line 
                                x1="150" 
                                y1="80" 
                                x2="850" 
                                y2="120" 
                                stroke="rgba(168,85,247,0.2)" 
                                strokeWidth="1" 
                                strokeDasharray="3,7"
                                className="animate-pulse"
                                style={{ animationDelay: '0.3s' }}
                            />
                            <line 
                                x1="150" 
                                y1="120" 
                                x2="850" 
                                y2="80" 
                                stroke="rgba(59,130,246,0.2)" 
                                strokeWidth="1" 
                                strokeDasharray="3,7"
                                className="animate-pulse"
                                style={{ animationDelay: '0.6s' }}
                            />
                        </svg>
                        
                        {/* Quantum Orb Effects - Spinning Rings */}
                        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-pink-400/20 opacity-30 transition-all duration-700 group-hover:opacity-40 dark:group-hover:opacity-30">
                            <div className="absolute inset-4 animate-spin-slow-reverse rounded-full border border-purple-400/20"></div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-spin-slow-reverse rounded-full border border-blue-400/20 opacity-20 transition-all duration-700 group-hover:opacity-30 dark:group-hover:opacity-20">
                            <div className="absolute inset-3 animate-spin-slow rounded-full border border-cyan-400/20"></div>
                        </div>
                        
                        {/* Quantum Circuit Grid Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="quantum-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#quantum-grid)" />
                            </svg>
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            {/* Category Label with Quantum Badge */}
                            <div className="mb-4">
                                <span className="group/badge inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:scale-105">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                                    </span>
                                    Blog: {getCategoryLabel()}
                                </span>
                            </div>
                            
                            {/* Title and Subtitle with Quantum Glow Effect */}
                            <div className="mb-6">
                                <h1 className="mb-3 text-3xl font-bold leading-tight text-white transition-all duration-300 group-hover:text-pink-100 md:text-4xl lg:text-5xl">
                                    <span className="relative inline-block">
                                {post.data.title}
                                        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    </span>
                            </h1>
                                <p className="text-base leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white/90 md:text-lg">
                                {post.data.subtitle}
                            </p>
                            </div>
                            
                            {/* Metadata with Quantum Icons */}
                            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80 md:text-base">
                                <span className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(post.data.date)}
                                </span>
                                {post.data.author && (
                                    <>
                                        <span className="text-white/50">•</span>
                                        <span className="flex items-center gap-1.5">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            By {post.data.author}
                                        </span>
                                    </>
                                )}
                                <span className="text-white/50">•</span>
                                <span className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-pink-500/80 to-pink-600/80 px-4 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:from-pink-500 hover:to-pink-600 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95">
                                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {readingTime} min read
                                    <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-50"></span>
                                </span>
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
                            <div className="sticky top-1 py-6 h-fit">
                                <Card className="p-4 h-full">
                                    {/* Back to Posts Button */}
                                    <div className="mb-4">
                                        <Link 
                                            href={`/${params.locale}/posts/${params.subfolder}`}
                                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Back to Posts
                                        </Link>
                                    </div>
                                    
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
                        <div className="py-6">
                            <Card className="p-6 md:p-8">
                            <article className="prose prose-lg mx-auto max-w-full text-justify text-slate-900 dark:prose-invert dark:text-white">
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={[
                                        [rehypeKatex, { throwOnError: false, strict: false }],
                                    ]}
                                    components={{
                                    p({ node, children, ...props }) {
                                        const hasImage = node?.children?.some(
                                            child => child.type === 'element' && child.tagName === 'img'
                                        );
                                        if (hasImage) {
                                            return <>{children}</>;
                                        }
                                        return <p {...props}>{children}</p>;
                                    },
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
                                    img({ node, alt, src, title, ...props }) {
                                        return (
                                            <figure>
                                                <img src={src} alt={alt} title={title} {...props} />
                                                {alt && (
                                                    <figcaption>
                                                        {alt}
                                                    </figcaption>
                                                )}
                                            </figure>
                                            );
                                        },
                                    }}
                            >
                                {post.content}
                            </ReactMarkdown>
                            </article>
                            </Card>
                        </div>
                    </main>
                    
                    {/* Right Sidebar - Desktop */}
                    {isRightSidebarOpen ? (
                        <aside className="hidden lg:block w-64 transition-all duration-300">
                            <div className="sticky top-1 py-6 h-fit">
                                <Card className="p-4 h-full">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{t("difficulty")}</h3>
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
                                
                                {/* Share Widget */}
                                <ShareWidget
                                    currentUrl=""
                                    postTitle={post.data.title}
                                    postSubtitle={post.data.subtitle}
                                    shareLabel={t("share")}
                                    shareHelper={t("shareHelper")}
                                />
                                
                                {/* Read Next Widget */}
                                <Card className="p-4 h-full mt-4">
                                    <div className="mb-3">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{t("readNext")}</h3>
                                    </div>
                                    {randomPosts.length > 0 ? (
                                        <div className="space-y-2">
                                            {randomPosts.map((post, index) => (
                                                <Link
                                                    key={index}
                                                    href={`/${params.locale}/posts/${params.subfolder}/${params.difficulty}/${post.slug}`}
                                                    className="block rounded-md p-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                >
                                                    <p className="font-semibold text-slate-900 dark:text-white">{post.title}</p>
                                                    {post.subtitle && (
                                                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{post.subtitle}</p>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Loading...
                                        </div>
                                    )}
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

