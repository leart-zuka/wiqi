"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useAnimation, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuantumMap from "../components/QuantumMap";
import Link from "next/link";
import FeaturedCard from "../components/homepage/FeaturedCard";
import { DarkModeAwareBackground } from "../components/homepage/DarkModeAwareBackground";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: HomeProps) {
  const t = useTranslations("Index");
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Animate in on mount
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Beispiel-Difficulty-Level
  const difficultyLevels = [
    {
      id: "elementary",
      title: t("Difficulty Elementary 1"),
      description: t("Difficulty Elementary 2"),
    },
    {
      id: "highschool",
      title: t("Difficulty High School 1"),
      description: t("Difficulty High School 2"),
    },
    {
      id: "college",
      title: t("Difficulty College 1"),
      description: t("Difficulty College 2"),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="scroll-snap-container bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-900">
      {/* Hero Section - Full Width with Animated Background */}
      <section className="scroll-snap-section relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Quantum Background with hover effect */}
        <div className="absolute inset-0 h-full w-full">
          {/* DarkModeAwareBackground: A dynamic background component that switches between light and dark wave animations based on the user's theme preference. 
              It uses WavyBackgroundDark for dark mode and WavyBackgroundLight for light mode, 
              automatically detecting and responding to theme changes through DOM mutations. */}
          <DarkModeAwareBackground />
        </div>

        <motion.div
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mx-auto flex flex-col items-center justify-center rounded-xl bg-white/20 p-8 text-center backdrop-blur-md dark:bg-black/20 md:max-w-3xl">
            <motion.div
              className="w-full max-w-2xl space-y-8"
              style={{ opacity, scale }}
            >
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
                  variants={itemVariants}
                >
                  {t("hello")}{" "}
                  <motion.span className="mt-2 block text-gray-900 dark:text-white">
                    PushQuantum WiQi
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
                  variants={itemVariants}
                >
                  {t("sub hello")}
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                variants={itemVariants}
              >
                <Link
                  href={`/${params.locale}/posts/quantum_tuesdays`}
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    >
                      {t("explore courses")}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>

                <Link
                  href={`/${params.locale}/about`}
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700"
                    >
                      {t("About Us")}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/70 shadow-lg backdrop-blur-md dark:bg-gray-800/70"
          >
            <ChevronRight
              className="rotate-90 text-gray-700 dark:text-gray-200"
              size={24}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="scroll-snap-section h-screen bg-gray-50/50 py-16 dark:bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full w-full"
        >
          <QuantumMap />
        </motion.div>
      </section>

      {/* Difficulty Levels Section */}
      <section className="scroll-snap-section py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
                {t("for everyone")}
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("difficulty levels")}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {t("difficulty description")}
              </p>

              <div className="mt-8 space-y-4">
                {difficultyLevels.map((level, index) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-start rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-slate-800">
                      <motion.div
                        className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {level.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <FeaturedCard locale={params.locale} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
