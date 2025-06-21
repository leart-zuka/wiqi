"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useAnimation, useScroll, useTransform } from "motion/react";
import { ChevronDown, Search, Sun } from "lucide-react";
import Image from "next/image";

import { DarkModeAwareBackground } from "../../components/homepage/DarkModeAwareBackground";
import QuantumMap from "../../components/QuantumMap";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: HomeProps) {
  const t = useTranslations("QuantumMap");
  const controls = useAnimation();

  // Animate in on mount
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-900">
      {/* Hero Section - Full Width with Animated Background */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
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
            <motion.div className="w-full max-w-2xl space-y-8">
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
                  variants={itemVariants}
                >
                  {t("Title")}
                </motion.h1>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 z-50 -translate-x-1/2 transform">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-xl backdrop-blur-md dark:border-gray-700/30"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10"
              />
              <ChevronDown
                className="relative z-10 text-gray-800 dark:text-gray-100"
                size={24}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t("Description")}
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("Project Name")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t("Funding")
                .split("**")
                .map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={index} className="font-bold">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Unser{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                WIQI
              </span>{" "}
              {t("WiQi Description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navbar Demo Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Mock Navbar - Replica of actual Header */}
            <div className="relative w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-900/80">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo Section - Exact replica */}
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-pink-500 p-0.5 shadow-lg">
                        <Image
                          src="/wq.png"
                          alt="WiQi Logo"
                          width={30}
                          height={30}
                          className="h-full w-full rounded-full bg-white object-contain p-0.5 dark:bg-slate-900"
                        />
                      </div>
                      <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:inline-block">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                          WiQi
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Search Bar - Exact replica */}
                  <div className="relative hidden w-full max-w-md lg:block">
                    <div className="relative flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                      <Search
                        className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        placeholder="Suchen..."
                        className="h-8 flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Navigation - Exact replica */}
                  <nav className="hidden space-x-8 lg:flex">
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      About
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      Quantum Tuesdays
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      Entries
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                  </nav>

                  {/* Right Side Actions - Exact replica */}
                  <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <div className="rounded-full p-2 text-slate-700 dark:text-slate-400">
                      <Sun className="h-5 w-5 text-amber-500" />
                    </div>
                    {/* Language Switcher */}
                    <div className="overflow-hidden rounded-full ring-2 ring-white transition-transform duration-200 dark:ring-slate-800">
                      <Image
                        src="/de.svg"
                        alt="Deutsch"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("Map Description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*
       * _______ ____  _____   ____
       * |__   __/ __ \|  __ \ / __ \
       *    | | | |  | | |  | | |  | |
       *    | | | |  | | |  | | |  | |
       *    | | | |__| | |__| | |__| |
       *    |_|  \____/|_____/ \____/
       *
       * TODO: Consider using a div 2 screenshot extension to capture
       *       the wiqi.info map and display it here for better
       *       visual representation and user experience.
       *
       * This would allow users to see the actual map layout
       * before interacting with the interactive version below.
       * Also i hate the scaling of the map tbh.
       */}

      {/* Quantum Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-96 w-full md:h-[500px] lg:h-[600px]"
          >
            <QuantumMap />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
