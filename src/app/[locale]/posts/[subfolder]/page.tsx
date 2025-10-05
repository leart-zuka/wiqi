"use client";

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { File } from "@/types";
import PostPreview from "@/app/components/PostPreview";
import DifficultySelector from "@/app/components/DifficultySelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Grid3X3, List, Atom } from "lucide-react";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: { locale: string; subfolder: string };
}) {
  const cookies = useCookies();
  const t = useTranslations("Posts");
  const initialDifficulty = cookies.get("difficulty") ?? "elementary";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [files, setFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get the files
  const getFiles = async (difficulty: string, locale: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getBlogPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: locale,
          difficulty: difficulty,
          folder: [params.subfolder],
        }),
      });
      const data = await response.json();
      setFiles(data.files);
      setFilteredFiles(data.files);
    } catch (err) {
      console.debug(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFiles(difficulty, params.locale);
  }, [difficulty, params.locale]);

  // Sort files by date (newest first)
  useEffect(() => {
    const sorted = files.sort((a, b) => {
      return (
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
      );
    });
    setFilteredFiles(sorted);
  }, [files]);

  // Get category info
  const getCategoryInfo = () => {
    if (params.subfolder === "quantum_tuesdays") {
      return {
        title: "Quantum Tuesdays",
        description: "Weekly quantum physics explorations and discoveries",
        icon: "🌌",
        gradient: "from-purple-600 to-pink-600",
        bgGradient:
          "from-slate-50 to-white dark:from-slate-900 dark:to-slate-800",
      };
    } else if (params.subfolder === "entries") {
      return {
        title: "Quantum Entries",
        description: "Deep dives into quantum concepts and applications",
        icon: "⚛️",
        gradient: "from-blue-600 to-indigo-600",
        bgGradient:
          "from-slate-50 to-white dark:from-slate-900 dark:to-slate-800",
      };
    }
    return {
      title: params.subfolder,
      description: "Explore quantum concepts",
      icon: "📚",
      gradient: "from-gray-600 to-gray-800",
      bgGradient:
        "from-slate-50 to-white dark:from-slate-900 dark:to-slate-800",
    };
  };

  const categoryInfo = getCategoryInfo();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${categoryInfo.bgGradient}`}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm"
            >
              <span className="text-4xl">{categoryInfo.icon}</span>
            </motion.div>

            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              <span
                className={`bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent`}
              >
                {categoryInfo.title}
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300 dark:text-gray-200">
              {categoryInfo.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span>{files.length} Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5-15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Atom className="h-4 w-4" />
                <span>Quantum Physics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="sticky top-16 z-30 border-b border-gray-200/50 bg-white/90 backdrop-blur-lg dark:border-gray-700/50 dark:bg-slate-900/90">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white/70 p-1 dark:border-gray-600 dark:bg-slate-800/70">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 ${
                  viewMode === "grid"
                    ? "dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100"
                    : "dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 ${
                  viewMode === "list"
                    ? "dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100"
                    : "dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Difficulty Selector */}
            <DifficultySelector
              initialDifficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("all articles")}
          </h2>
          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
            {filteredFiles.length}{" "}
            {filteredFiles.length === 1 ? t("result") : t("results")}
          </Badge>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-8 w-8 rounded-full border-4 border-purple-200 border-t-purple-600 dark:border-purple-800 dark:border-t-purple-400"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  {t("loading articles")}
                </span>
              </div>
            </motion.div>
          ) : filteredFiles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {t("no articles found")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("no articles difficulty")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                  : "space-y-6"
              }
            >
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.slug}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <PostPreview
                    slug={file.slug}
                    title={file.metadata.title}
                    subtitle={file.metadata.subtitle}
                    date={file.metadata.date}
                    locale={params.locale}
                    difficulty={difficulty}
                    folder={params.subfolder}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
