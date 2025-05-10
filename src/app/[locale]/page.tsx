"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuantumMap from "../components/QuantumMap";
import Link from "next/link";
import FeaturedCard from "../../components/homepage/FeaturedCard";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: HomeProps) {
  const t = useTranslations("Index");
  const images = ["superpos.svg", "|1>.svg", "|0>.svg", "main.svg"];
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  // Image switch on hover
  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setVisibleIndex(randomIndex);
  };

  const handleMouseLeave = () => {
    setVisibleIndex(0); // Reset to default image
  };

  // Beispiel-Difficulty-Level
  const difficultyLevels = [
    {
      id: "elementary",
      title: "Elementary",
      description:
        "Perfect for beginners with no prior knowledge of quantum concepts.",
    },
    {
      id: "highschool",
      title: "High School",
      description:
        "Designed for students with basic understanding of physics and mathematics.",
    },
    {
      id: "college",
      title: "College",
      description:
        "Advanced content for university students and professionals.",
    },
  ];

  // Beispiel-Features
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Interactive Learning",
      description:
        "Engage with interactive simulations and visualizations to understand quantum concepts.",
    },
    {
      icon: (
        <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      title: "Structured Courses",
      description:
        "Follow a carefully designed curriculum that builds your knowledge step by step.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      title: "Real-world Applications",
      description:
        "Learn how quantum computing is applied in various industries and research fields.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/5"></div>
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/30">
                  {t("quantum education")}
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                  {t("hello")}{" "}
                  <span className="mt-2 block animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 bg-200% bg-clip-text text-transparent">
                    PushQuantum WiQi
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                  {t("sub hello")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${params.locale}/posts/quantum_tuesdays`}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    {t("explore courses")}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700"
                >
                  {t("learn more")}
                </Button>
              </div>
            </div>

            {/* Interactive Image Display */}
            <div className="relative h-[500px] w-full">
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl border-gray-200 backdrop-blur-sm dark:border-gray-800"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {images.map((src, index) => (
                  <motion.img
                    key={index}
                    src={`/${src}`}
                    alt={`Quantum visualization ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{
                      opacity: visibleIndex === index ? 1 : 0,
                      scale: visibleIndex === index ? 1 : 0.9,
                      filter:
                        visibleIndex === index ? "blur(0px)" : "blur(10px)",
                      zIndex: visibleIndex === index ? 10 : 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50/50 py-16 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/30">
              {t("features")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("why choose us")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {t("features description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200 bg-white/70 backdrop-blur-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-slate-800/70"
              >
                <CardContent className="p-6">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <QuantumMap />
        </div>
      </section>

      {/* Difficulty Levels Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
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
                  <div
                    key={level.id}
                    className="flex items-start rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-slate-800"
                  >
                    <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {level.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {level.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FeaturedCard locale={params.locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
