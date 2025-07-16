"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AtomIcon,
  Users,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Fallback function for translations
const useSafeTranslation = (namespace: string) => {
  const t = useTranslations(namespace);

  return (key: string, defaultValue = "") => {
    try {
      return t(key);
    } catch (error) {
      console.error(`Translation key not found: ${namespace}.${key}`);
      return defaultValue;
    }
  };
};

// Quantum particle animation component
const QuantumParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full bg-pink-500/50"
      initial={{
        scale: 0,
        x: 0,
        y: 0,
        opacity: 0,
      }}
      animate={{
        scale: [0, 1.5, 0.5, 1.2, 0],
        x: [null, Math.random() * 200 - 100],
        y: [null, Math.random() * 200 - 100],
        opacity: [0, 0.8, 0.2, 0.9, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Quantum field background
const QuantumField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-90">
      {Array.from({ length: 20 }).map((_, i) => (
        <QuantumParticle key={i} delay={i * 0.4} />
      ))}
    </div>
  );
};

export default function AboutPage() {
  const t = useSafeTranslation("About Us");
  const [activeTab, setActiveTab] = useState("story");
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  // Simulate scroll reveal
  const [scrollY, setScrollY] = useState(0);
  const isMascotOn = false;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Using the existing translation keys from the JSON files
  const motivationParagraphs = [
    t("main 1"),
    t("main 2"),
    t("main 3"),
    t("main 4"),
    t("main 5"),
  ];

  const teamMembers = [
    {
      name: t("member1 name"),
      role: t("member1 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member1 image")}.JPG`,
      bio: t("member1 bio"),
      skills: ["Quantum Computing", "Algorithm Design", "Physics"],
      social: {
        github: "https://github.com/leart-zuka",
        linkedin: "https://www.linkedin.com/in/leart-zuka-741092213/",
        email: "leart.zuka@web.de",
      },
    },
    {
      name: t("member2 name"),
      role: t("member2 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member2 image")}.JPG`,
      bio: t("member2 bio"),
      skills: ["Quantum Entanglement", "Cryptography", "Research"],
      social: {
        github: "https://github.com/noluyorAbi",
        linkedin: "https://www.linkedin.com/in/alperen-adatepe/",
        email: "adatepe.alperen.lmu@gmail.com",
      },
    },
    {
      name: t("member3 name"),
      role: t("member3 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member3 image")}.JPG`,
      bio: t("member3 bio"),
      skills: ["Quantum Hardware", "Engineering", "Innovation"],
      social: {
        github: "https://github.com/helenakhlr",
        linkedin:
          "https://www.linkedin.com/in/helena-ir%C3%A9ne-k%C3%B6hler-33a642330/",
        email: "helena.koehler8@gmail.com",
      },
    },
    {
      name: t("member4 name"),
      role: t("member4 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member4 image")}.JPG`,
      bio: t("member4 bio"),
      skills: ["Education", "Outreach", "Communication"],
      social: {
        github: "https://github.com/adhesh-sagar",
        linkedin: "https://www.linkedin.com/in/adhesh-sagar/",
        email: "adhesh004@gmail.com",
      },
    },
    {
      name: t("member5 name"),
      role: t("member5 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member5 image")}.JPG`,
      bio: t("member5 bio"),
      skills: ["Education", "Outreach", "Communication"],
      social: {
        github: "https://github.com/codedevil13",
        linkedin: "https://www.linkedin.com/in/sudharshan-k-30a3431b3",
        email: "rahulkannan356@gmail.com",
      },
    },
    {
      name: t("member6 name"),
      role: t("member6 role"),
      image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/squad/${t("member6 image")}.JPG`,
      bio: t("member6 bio"),
      skills: ["Education", "Outreach", "Communication"],
      social: {
        github: "https://github.com/OtherGitAcc",
        linkedin: "https://www.linkedin.com/in/bhushan-kad-a36175253/",
        email: "bhushanbrk@gmail.com",
      },
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-100 text-slate-900 dark:from-slate-900 dark:to-indigo-950 dark:text-white">
      {/* Quantum-inspired decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-white/0 to-transparent dark:from-indigo-900/20 dark:via-slate-900/0 dark:to-transparent"></div>
        <QuantumField />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <Badge
            variant="outline"
            className="mb-6 border-pink-500/50 px-4 py-1.5 text-sm font-medium text-pink-700 dark:border-pink-500/50 dark:text-pink-300"
          >
            <AtomIcon className="mr-2 h-3.5 w-3.5" />
            {t("our story", "Our Quantum Journey")}
          </Badge>

          <h1 className="bg-gradient-to-r from-slate-900 via-pink-800 to-indigo-800 bg-clip-text px-4 py-4 font-serif text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-pink-200 dark:to-indigo-200 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {t("motivation title", "Shaping the Quantum Future")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 dark:text-indigo-200 sm:text-xl">
            {t(
              "motivation subtitle",
              "Bridging the gap between quantum science and society through education, innovation, and collaboration",
            )}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-indigo-600 text-white transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]"
              onClick={() => {
                const element = document.getElementById("story");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center">
                {t("learn more", "Discover Our Mission")}
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600/0 via-white/10 to-indigo-600/0 opacity-0 blur-xl transition-opacity duration-300 hover:opacity-100"></span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="relative border-2 border-indigo-400/50 bg-white/80 text-indigo-800 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/70 hover:bg-indigo-100/80 hover:text-indigo-900 hover:shadow-[0_0_20px_rgba(165,180,252,0.2)] dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:bg-indigo-900/50 dark:hover:text-white"
              onClick={() => {
                const element = document.getElementById("team");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center">
                {t("meet team", "Meet Our Team")}
              </span>
            </Button>
          </div>
        </motion.div>

        {/* Decorative orbit */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20">
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/30"></div>
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/30"></div>
          <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Story Section */}
        <section id="story" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Tabs
              defaultValue="story"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mx-auto max-w-3xl"
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 dark:bg-indigo-950/50">
                <TabsTrigger
                  value="story"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/10 data-[state=active]:to-indigo-600/10 data-[state=active]:text-indigo-900 dark:data-[state=active]:from-pink-600/20 dark:data-[state=active]:to-indigo-600/20 dark:data-[state=active]:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("our story tab", "Our Story")}
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/10 data-[state=active]:to-indigo-600/10 data-[state=active]:text-indigo-900 dark:data-[state=active]:from-pink-600/20 dark:data-[state=active]:to-indigo-600/20 dark:data-[state=active]:text-white"
                >
                  <AtomIcon className="mr-2 h-4 w-4" />
                  {t("our vision tab", "Our Vision")}
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="story"
                className="mt-8 space-y-8 rounded-xl bg-white/70 p-6 backdrop-blur-sm dark:bg-indigo-950/30"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 dark:text-white">
                    {t("story title", "A Group of Motivated Students")}
                  </h2>

                  <div className="prose prose-lg prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-indigo-100">
                    <p>{motivationParagraphs[0]}</p>
                    <p>{motivationParagraphs[1]}</p>
                    <p>{motivationParagraphs[2]}</p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent
                value="vision"
                className="mt-8 space-y-8 rounded-xl bg-white/70 p-6 backdrop-blur-sm dark:bg-indigo-950/30"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 dark:text-white">
                    {t("vision title", "Our Vision for Quantum Technology")}
                  </h2>

                  <div className="prose prose-lg prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-indigo-100">
                    <p>{motivationParagraphs[3]}</p>
                    <p>{motivationParagraphs[4]}</p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mascot Feature */}

          {isMascotOn && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: scrollY > 200 ? 1 : 0,
                y: scrollY > 200 ? 0 : 40,
              }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100/80 to-blue-100/80 p-8 backdrop-blur-sm dark:from-pink-900/20 dark:to-indigo-900/20 lg:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                  <Badge
                    variant="outline"
                    className="mb-4 w-fit border-indigo-500/50 px-3 py-1 text-sm font-medium text-indigo-700 dark:border-pink-500/50 dark:text-pink-300"
                  >
                    {t("meet mascot", "Meet Our Mascot")}
                  </Badge>

                  <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                    {t("mascot title", "WiQi: Your Quantum Guide")}
                  </h2>

                  <p className="mb-6 text-lg text-slate-700 dark:text-indigo-200">
                    {t(
                      "mascot description",
                      "WiQi is our friendly quantum mascot, designed to make the complex world of quantum physics approachable and fun. With a playful personality and deep knowledge, WiQi helps bridge the gap between quantum science and everyday understanding.",
                    )}
                  </p>

                  <Button className="mt-4 w-fit bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 dark:from-pink-600 dark:to-indigo-600 dark:hover:from-pink-700 dark:hover:to-indigo-700">
                    {t("learn more mascot", "Learn More About WiQi")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="relative flex items-center justify-center">
                  {/* Quantum effect around mascot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-xl dark:from-pink-500/20 dark:to-indigo-500/20"></div>
                  </div>

                  {/* Orbiting particles */}
                  <div className="absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full border border-indigo-500/30 dark:border-pink-500/30"></div>
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 dark:bg-pink-500"
                      animate={{
                        x: [0, 100, 0, -100, 0],
                        y: [0, 100, 0, -100, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Mascot image with floating animation */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 h-64 w-64 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 p-1 backdrop-blur-sm dark:from-pink-500/10 dark:to-indigo-500/10 lg:h-80 lg:w-80"
                  >
                    <Image
                      src="/Wiqi_Mascot_Minimalistic.png"
                      alt="WiQi Mascot"
                      width={1024}
                      height={1024}
                      className="h-full w-full rounded-full object-cover"
                      priority
                    />
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl dark:bg-pink-600/10"></div>
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl dark:bg-indigo-600/10"></div>
            </motion.div>
          )}
        </section>
        {/* Team Section */}
        <section id="team" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: scrollY > 800 ? 1 : 0,
              y: scrollY > 800 ? 0 : 20,
            }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <Badge
              variant="outline"
              className="mb-4 border-indigo-500/50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-pink-500/50 dark:text-pink-300"
            >
              <Users className="mr-2 h-3.5 w-3.5" />
              {t("our team", "Our Team")}
            </Badge>

            <h2 className="bg-gradient-to-r from-slate-900 via-indigo-800 to-blue-900 bg-clip-text font-serif text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-pink-200 dark:to-indigo-200 sm:text-5xl">
              {t("who are we", "Who are we?")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 dark:text-indigo-200">
              {t(
                "team subtitle",
                "Meet the passionate minds behind our quantum initiative, working together to bridge science and society",
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mb-16 flex justify-center"
          >
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-xl dark:border-indigo-500/20">
              <Image
                src="/static/squad/Team.JPG" // Make sure this is in /public
                alt="Illustration of Our Team"
                width={1600}
                height={700}
                priority={false}
                className="h-auto w-full object-cover brightness-95 dark:brightness-75"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
            </div>
          </motion.div>
          <div className="mb-8 space-y-8">
            {teamMembers.map((member, idx) => {
              const isOdd = idx % 2 !== 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: scrollY > 900 ? 1 : 0,
                    y: scrollY > 900 ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden border-slate-200 bg-white p-4 backdrop-blur-sm dark:border-2 dark:border-purple-800/60 dark:bg-transparent">
                    <div
                      className={`flex flex-col sm:flex-row ${isOdd ? "sm:flex-row-reverse" : ""}`}
                    >
                      {/* Image Section */}
                      <div className="relative flex sm:w-1/3 sm:items-center sm:justify-center">
                        <div className="aspect-square w-full max-w-[150px] overflow-hidden rounded-full border border-black/20 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-600 dark:to-gray-700">
                          <Avatar className="h-full w-full rounded-full">
                            <AvatarImage
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              className="h-full w-full rounded-full border border-black/20 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <AvatarFallback className="h-full w-full rounded-full border border-black/20 bg-gradient-to-br from-indigo-200 to-blue-200 text-4xl text-indigo-800 dark:from-gray-700 dark:to-gray-900 dark:text-gray-200">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      {/* Description Section */}
                      <div className="flex flex-col justify-between p-4 sm:w-2/3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100">
                            {member.name}
                          </h3>
                          <p className="text-sm text-slate-700 dark:text-gray-300">
                            {member.role}
                          </p>
                          <p className="mt-2 text-slate-700 dark:text-gray-200">
                            {member.bio}
                          </p>
                          {/*
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {member.skills.map((skill, skillIdx) => (
                                                            <Badge
                                                                key={skillIdx}
                                                                variant="outline"
                                                                className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg dark:border-gray-600 dark:text-gray-100"
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>*/}
                        </div>
                        <div className="f mt-4 flex gap-3">
                          <a
                            href={member.social.github}
                            className="rounded-full bg-slate-100 p-2 text-slate-700 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                          <a
                            href={member.social.linkedin}
                            className="rounded-full bg-slate-100 p-2 text-slate-700 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={`mailto:${member.social.email}`}
                            className="rounded-full bg-slate-100 p-2 text-slate-700 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
