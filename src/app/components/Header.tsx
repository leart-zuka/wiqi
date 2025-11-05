"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Fuse from "fuse.js";
import { replaceLocale } from "./client_utils";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { File } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  locale: string;
}

const fuseOptions = {
  keys: ["slug", "metadata.subtitle", "metadata.date", "folder"],
};

const Header = (props: HeaderProps) => {
  const pathName = usePathname();
  const t = useTranslations("Navbar");
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);
  const initialDifficulty = getCookie("difficulty")?.toString() ?? "elementary";
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<File[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setHasMounted(true);
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const getFiles = async (difficulty: string, locale: string) => {
    try {
      const response = await fetch("/api/getBlogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: locale,
          difficulty: difficulty,
          folder: ["quantum_tuesdays", "entries"],
        }),
      });
      const data = await response.json();
      setFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFiles(initialDifficulty, props.locale);
  }, [initialDifficulty, props.locale]);

  useEffect(() => {
    if (!hasMounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, hasMounted]);

  const clearInput = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);

    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchResults([]);
      setShowDropdown(false);
    }

    if (mobileInputRef.current) {
      mobileInputRef.current.value = "";
    }
  };

  // Handle clicks outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDesktopSearchClicked =
        searchContainerRef.current &&
        searchContainerRef.current.contains(event.target as Node);

      const isMobileSearchClicked =
        mobileSearchContainerRef.current &&
        mobileSearchContainerRef.current.contains(event.target as Node);

      if (!isDesktopSearchClicked && !isMobileSearchClicked) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    requestAnimationFrame(() => {
      // Update any theme-dependent UI here if needed
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      setShowDropdown(true);
      const fuse = new Fuse(files, fuseOptions);
      const results = fuse.search(query);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // Animation variants for search results
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${props.locale}`}
              className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
            >
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
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div
            ref={searchContainerRef}
            className="relative hidden w-full max-w-md lg:block"
          >
            <div
              className={`relative flex items-center rounded-full border ${
                isSearchFocused
                  ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900/30"
                  : "border-slate-200 dark:border-slate-700"
              } bg-white px-3 py-1.5 transition-all duration-200 dark:bg-slate-800`}
            >
              <Search
                className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
              <Input
                ref={inputRef}
                type="search"
                value={searchQuery}
                placeholder={t("Search")}
                className="h-8 flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white"
                onChange={handleSearch}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchQuery) setShowDropdown(true);
                }}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Search Results Dropdown with Animation */}
            <AnimatePresence>
              {showDropdown && searchResults.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-white/95 py-1 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/95"
                  style={{
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={staggerChildrenVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={`/${props.locale}/posts/${result.folder}/${initialDifficulty}/${result.slug}`}
                        className="block px-4 py-3 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm dark:hover:bg-slate-700/70"
                        onClick={() => {
                          clearInput();
                          setShowDropdown(false);
                        }}
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {result.metadata.title}
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {result.folder}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {result.metadata.date}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden space-x-8 lg:flex">
            <Link
              href={`/${props.locale}/about`}
              className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400"
            >
              {t("About")}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href={`/${props.locale}/posts/quantum_tuesdays`}
              className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400"
            >
              {t("Quantum Tuesdays")}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href={`/${props.locale}/posts/entries`}
              className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400"
            >
              {t("Entries")}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-purple-400" />
              ) : (
                <Sun className="h-5 w-5 text-amber-500" />
              )}
            </Button>
            {/* Language Switcher */}
            <Link
              href={replaceLocale(props.locale, pathName)}
              className="overflow-hidden rounded-full ring-2 ring-white transition-transform duration-200 hover:scale-105 dark:ring-slate-800"
            >
              <Image
                src={`/${props.locale}.svg`}
                alt={`${props.locale === "en" ? "English" : "Deutsch"}`}
                width={24}
                height={24}
                className="h-6 w-6"
                priority
              />
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 rounded-full text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 dark:border-slate-700 lg:hidden">
            {/* Mobile Search */}
            <div ref={mobileSearchContainerRef} className="mb-4">
              <div className="relative flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <Search
                  className="mr-2 h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  ref={mobileInputRef}
                  type="search"
                  value={searchQuery}
                  placeholder={t("Search")}
                  className="h-8 flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white"
                  onChange={handleSearch}
                  onFocus={() => {
                    if (searchQuery) setShowDropdown(true);
                  }}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 rounded-full p-0 text-slate-400 hover:bg-slate-100 hover:text-slate-500 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-400"
                    onClick={clearInput}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>

              {/* Mobile Search Results with Animation */}
              <AnimatePresence>
                {showDropdown && searchResults.length > 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="mt-2 max-h-60 overflow-auto rounded-lg border border-slate-200 bg-white/95 py-1 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/95"
                    style={{
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={staggerChildrenVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={`/${props.locale}/posts/${result.folder}/${initialDifficulty}/${result.slug}`}
                          className="block px-4 py-3 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm dark:hover:bg-slate-700/70"
                          onClick={() => {
                            clearInput();
                            setShowDropdown(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {result.metadata.title}
                          </div>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                              {result.folder}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {result.metadata.date}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <Link
                href={`/${props.locale}/about`}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("About")}
              </Link>
              <Link
                href={`/${props.locale}/posts/quantum_tuesdays`}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("Quantum Tuesdays")}
              </Link>
              <Link
                href={`/${props.locale}/posts/entries`}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("Entries")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
