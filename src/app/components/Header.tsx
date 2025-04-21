"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import Fuse from "fuse.js";
import { replaceLocale } from "./client_utils";

import "./button.css";

interface HeaderProps {
  locale: string;
}

type File = {
  key: string;
  slug: string;
  metadata: {
    subtitle: string;
    date: string;
  };
  locale: string;
};

const fuseOptions = {
  keys: ["slug", "metadata.subtitle", "metadata.date"],
};

const Header = (props: HeaderProps) => {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialDifficulty = getCookie("difficulty")?.toString() ?? "elementary";
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<File[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
          folder: ["quantum_tuesdays"],
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
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSearch = () => {
    const query = inputRef.current?.value || "";
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

  return (
    <header
      id="mainNavbar"
      className="fixed top-0 z-30 w-full flex-none border-b border-slate-900/10 bg-white/80 text-black backdrop-blur-sm transition-colors duration-300 ease-out dark:border-slate-50/[0.06] dark:bg-slate-900/80 dark:text-white"
    >
      <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-16 2xl:px-32">
        <div className="mx-4 border-b border-slate-300/10 py-4 dark:border-slate-700/10 lg:mx-0 lg:border-0 lg:px-0">
          <div className="flex items-center justify-between">
            {/* Left side: Logo */}
            <div className="flex items-center space-x-4">
              <Link
                className="flex w-[2.0625rem] items-center text-black transition-all duration-200 ease-in-out hover:scale-95 dark:text-white"
                href="/"
              >
                <span className="sr-only">WiQi home page</span>
                <Image
                  src="/wq.png"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="transition-transform duration-200 ease-in-out hover:rotate-12"
                />
                <span className="ml-3 select-none text-2xl font-semibold transition-colors duration-200 ease-in-out dark:text-white sm:opacity-100">
                  WiQi
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="justify-left flex w-1/2 flex-1 pl-10 lg:pl-40 xl:pl-48 2xl:pl-96">
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                crossOrigin="anonymous"
              />
              <form className="custom-form relative">
                <input
                  type="search"
                  ref={inputRef}
                  required
                  className="rounded-md border border-gray-300 px-2 py-1 text-black"
                  onChange={handleSearch}
                  onFocus={() => setShowDropdown(true)}
                />
                <i className="fa fa-search"></i>
                <button
                  type="button"
                  onClick={clearInput}
                  className="ml-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear
                </button>
                {showDropdown && searchResults.length > 0 && (
                  <ul className="absolute z-50 mt-10 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          window.location.href = result.slug;
                          clearInput();
                        }}
                      >
                        <Link
                          href={`/${props.locale}/quantum_tuesdays/${initialDifficulty}/${result.slug}`}
                        >
                          <p className="font-semibold text-black dark:text-white">
                            {result.slug}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {result.metadata.date}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>

            {/* Desktop nav (hidden on mobile) */}
            <div className="hidden items-center space-x-6 lg:flex">
              <nav className="text-sm font-semibold leading-6 text-black dark:text-white">
                <ul className="flex space-x-8">
                  <li>
                    <Link
                      className="text-black transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      href={`/${props.locale}/quantum_tuesdays`}
                    >
                      Quantum Tuesdays
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      href={`/${props.locale}/entries`}
                    >
                      Entries
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Theme toggle + Language Switch */}
              <div className="flex items-center border-l border-slate-500 pl-6 dark:border-slate-400">
                <button
                  type="button"
                  className="mr-4 text-black focus:outline-none dark:text-white"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                        className="fill-[#850379]/20"
                      ></path>
                      <path
                        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                        className="fill-[#850379]"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                        className="fill-[#850379]"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        className="fill-[#850379]/20 stroke-[#850379]"
                      ></path>
                      <path
                        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                        className="stroke-[#850379]"
                      ></path>
                    </svg>
                  )}
                </button>

                <Link href={replaceLocale(props.locale, pathName)}>
                  <Image
                    src={`/${props.locale}.svg`}
                    alt={`${props.locale} Flag`}
                    width={24}
                    height={24}
                    className="rounded-md transition-transform duration-200 ease-in-out hover:scale-95 hover:shadow-md"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Hamburger (mobile only) */}
            <div className="lg:hidden">
              <button
                type="button"
                className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Toggle mobile menu</span>
                <svg width="24" height="24">
                  <path
                    d="M5 6h14M5 12h14M5 18h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "hidden max-h-0 opacity-0"
          } flex flex-col overflow-hidden bg-white/80 p-4 text-black backdrop-blur-sm transition-all duration-300 ease-in-out dark:bg-slate-900/80 dark:text-white lg:hidden`}
        >
          <nav className="mb-4 text-sm font-semibold leading-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${props.locale}/quantum_tuesdays`}
                  className="block w-full py-2 text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quantum Tuesdays
                </Link>
                <Link
                  href={`/${props.locale}/entries`}
                  className="block w-full py-2 text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entries
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Theme Toggle & Language Switch */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="mr-4 text-black focus:outline-none dark:text-white"
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                    className="fill-[#850379]/20"
                  ></path>
                  <path
                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                    className="fill-[#850379]"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                    className="fill-[#850379]"
                  ></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    className="fill-[#850379]/20 stroke-[#850379]"
                  ></path>
                  <path
                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                    className="stroke-[#850379]"
                  ></path>
                </svg>
              )}
            </button>

            <Link
              href={replaceLocale(props.locale, pathName)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src={`/${props.locale}.svg`}
                alt={`${props.locale} Flag`}
                width={24}
                height={24}
                className="rounded-md transition-transform duration-200 ease-in-out hover:scale-95 hover:shadow-md"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
