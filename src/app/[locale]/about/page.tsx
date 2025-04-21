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
    <div className="absolute inset-0 overflow-hidden opacity-30">
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
      name: t("member1 name", "Dr. Quantum"),
      role: t("member1 role", "Quantum Physicist"),
      image: "/wq.png",
      bio: t(
        "member1 bio",
        "Leading researcher in quantum computing with expertise in quantum algorithms and error correction.",
      ),
      skills: ["Quantum Computing", "Algorithm Design", "Physics"],
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "contact@example.com",
      },
    },
    {
      name: t("member2 name", "Prof. Entanglement"),
      role: t("member2 role", "Theoretical Physicist"),
      image: "/wq.png",
      bio: t(
        "member2 bio",
        "Specializes in quantum entanglement and its applications in secure communications.",
      ),
      skills: ["Quantum Entanglement", "Cryptography", "Research"],
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "contact@example.com",
      },
    },
    {
      name: t("member3 name", "Dr. Superposition"),
      role: t("member3 role", "Quantum Engineer"),
      image: "/wq.png",
      bio: t(
        "member3 bio",
        "Works on practical implementations of quantum technologies for real-world applications.",
      ),
      skills: ["Quantum Hardware", "Engineering", "Innovation"],
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "contact@example.com",
      },
    },
    {
      name: t("member4 name", "Prof. Wave Function"),
      role: t("member4 role", "Education Director"),
      image: "/wq.png",
      bio: t(
        "member4 bio",
        "Passionate about making quantum concepts accessible to the broader public.",
      ),
      skills: ["Education", "Outreach", "Communication"],
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "contact@example.com",
      },
    },
  ];

  const toggleMember = (idx: number) => {
    setExpandedMember(expandedMember === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
      {/* Quantum-inspired decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-transparent"></div>
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
            className="mb-6 border-pink-500/50 px-4 py-1.5 text-sm font-medium text-pink-300"
          >
            <AtomIcon className="mr-2 h-3.5 w-3.5" />
            {t("our story", "Our Quantum Journey")}
          </Badge>

          <h1 className="bg-gradient-to-r from-white via-pink-200 to-indigo-200 bg-clip-text p-6 font-serif text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            {t("motivation title", "Shaping the Quantum Future")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200 sm:text-xl">
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
                <motion.div
                  className="ml-2 h-1 w-1 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600/0 via-white/10 to-indigo-600/0 opacity-0 blur-xl transition-opacity duration-300 hover:opacity-100"></span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="relative border-2 border-indigo-400/50 bg-indigo-950/30 text-indigo-200 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/70 hover:bg-indigo-900/50 hover:text-white hover:shadow-[0_0_20px_rgba(165,180,252,0.2)]"
              onClick={() => {
                const element = document.getElementById("team");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center">
                {t("meet team", "Meet Our Team")}
                motion.{" "}
                <motion.div
                  className="ml-2 h-5 w-5 rounded-full border border-indigo-400/50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
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
        <section
          id="story"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mb-16">
            <Tabs
              defaultValue="story"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mx-auto max-w-3xl"
            >
              <TabsList className="grid w-full grid-cols-2 bg-indigo-950/50">
                <TabsTrigger
                  value="story"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/20 data-[state=active]:to-indigo-600/20 data-[state=active]:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("our story tab", "Our Story")}
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/20 data-[state=active]:to-indigo-600/20 data-[state=active]:text-white"
                >
                  <AtomIcon className="mr-2 h-4 w-4" />
                  {t("our vision tab", "Our Vision")}
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="story"
                className="mt-8 space-y-8 rounded-xl bg-indigo-950/30 p-6 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-6 font-serif text-3xl font-bold text-white">
                    {t("story title", "A Group of Motivated Students")}
                  </h2>

                  <div className="prose prose-lg prose-invert max-w-none text-indigo-100">
                    <p>{motivationParagraphs[0]}</p>
                    <p>{motivationParagraphs[1]}</p>
                    <p>{motivationParagraphs[2]}</p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent
                value="vision"
                className="mt-8 space-y-8 rounded-xl bg-indigo-950/30 p-6 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-6 font-serif text-3xl font-bold text-white">
                    {t("vision title", "Our Vision for Quantum Technology")}
                  </h2>

                  <div className="prose prose-lg prose-invert max-w-none text-indigo-100">
                    <p>{motivationParagraphs[3]}</p>
                    <p>{motivationParagraphs[4]}</p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mascot Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: scrollY > 200 ? 1 : 0,
              y: scrollY > 200 ? 0 : 40,
            }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-pink-900/20 to-indigo-900/20 p-8 backdrop-blur-sm lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <Badge
                  variant="outline"
                  className="mb-4 w-fit border-pink-500/50 px-3 py-1 text-sm font-medium text-pink-300"
                >
                  {t("meet mascot", "Meet Our Mascot")}
                </Badge>

                <h2 className="mb-6 font-serif text-3xl font-bold text-white lg:text-4xl">
                  {t("mascot title", "WiQi: Your Quantum Guide")}
                </h2>

                <p className="mb-6 text-lg text-indigo-200">
                  {t(
                    "mascot description",
                    "WiQi is our friendly quantum mascot, designed to make the complex world of quantum physics approachable and fun. With a playful personality and deep knowledge, WiQi helps bridge the gap between quantum science and everyday understanding.",
                  )}
                </p>

                <Button className="mt-4 w-fit bg-gradient-to-r from-pink-600 to-indigo-600 text-white hover:from-pink-700 hover:to-indigo-700">
                  {t("learn more mascot", "Learn More About WiQi")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative flex items-center justify-center">
                {/* Quantum effect around mascot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-pink-500/20 to-indigo-500/20 blur-xl"></div>
                </div>

                {/* Orbiting particles */}
                <div className="absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full border border-pink-500/30"></div>
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500"
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
                  className="relative z-10 h-64 w-64 overflow-hidden rounded-full bg-gradient-to-r from-pink-500/10 to-indigo-500/10 p-1 backdrop-blur-sm lg:h-80 lg:w-80"
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
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-pink-600/10 blur-3xl"></div>
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl"></div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
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
              className="mb-4 border-pink-500/50 px-4 py-1.5 text-sm font-medium text-pink-300"
            >
              <Users className="mr-2 h-3.5 w-3.5" />
              {t("our team", "Our Team")}
            </Badge>

            <h2 className="bg-gradient-to-r from-white via-pink-200 to-indigo-200 bg-clip-text font-serif text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              {t("who are we", "Who are we?")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
              {t(
                "team subtitle",
                "Meet the passionate minds behind our quantum initiative, working together to bridge science and society",
              )}
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: scrollY > 900 ? 1 : 0,
                  y: scrollY > 900 ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="group overflow-hidden border-indigo-800/30 bg-indigo-950/30 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(219,39,119,0.15)]">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-indigo-900/50 to-pink-900/50">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarImage
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <AvatarFallback className="h-full w-full rounded-none bg-gradient-to-br from-indigo-800 to-pink-800 text-4xl">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Quantum effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950 to-transparent p-4 text-white">
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-sm text-indigo-300">{member.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-96">
                      <p className="mb-4 mt-2 text-indigo-200">{member.bio}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIdx) => (
                          <Badge
                            key={skillIdx}
                            variant="outline"
                            className="border-pink-500/30 bg-pink-950/20 text-pink-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-center gap-3">
                        <a
                          href={member.social.github}
                          className="rounded-full bg-slate-900/80 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-800"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a
                          href={member.social.linkedin}
                          className="rounded-full bg-slate-900/80 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-800"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                          href={`mailto:${member.social.email}`}
                          className="rounded-full bg-slate-900/80 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-slate-800"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-center">
                      <ChevronDown className="h-4 w-4 text-indigo-300 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer with quantum-inspired design */}
      <footer className="relative z-10 mt-20 border-t border-indigo-800/30 bg-indigo-950/80 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center">
              <AtomIcon className="mr-2 h-6 w-6 text-pink-400" />
              <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
                WiQi
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="#"
                className="text-sm text-indigo-300 transition-colors hover:text-white"
              >
                {t("footer about", "About Us")}
              </a>
              <a
                href="#"
                className="text-sm text-indigo-300 transition-colors hover:text-white"
              >
                {t("footer projects", "Projects")}
              </a>
              <a
                href="#"
                className="text-sm text-indigo-300 transition-colors hover:text-white"
              >
                {t("footer resources", "Resources")}
              </a>
              <a
                href="#"
                className="text-sm text-indigo-300 transition-colors hover:text-white"
              >
                {t("footer contact", "Contact")}
              </a>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-indigo-900/50 p-2 text-indigo-300 transition-colors hover:bg-indigo-800 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-indigo-900/50 p-2 text-indigo-300 transition-colors hover:bg-indigo-800 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-indigo-900/50 p-2 text-indigo-300 transition-colors hover:bg-indigo-800 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-indigo-400">
            <p>
              © {new Date().getFullYear()} WiQi.{" "}
              {t("footer rights", "All rights reserved.")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
