"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import Fuse from "fuse.js";

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

const replaceLocale = (locale: string, pathName: string): string => {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
};

// Determine contrasting color
function getContrastingColor(bgColor: string) {
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return "black"; // Fallback if parsing fails

  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}

function getBackgroundColorBehindNav(nav: HTMLElement): string {
  const originalPointerEvents = nav.style.pointerEvents;
  nav.style.pointerEvents = "none";

  const rect = nav.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const elBehindNav = document.elementFromPoint(
    centerX,
    centerY,
  ) as HTMLElement;

  nav.style.pointerEvents = originalPointerEvents;

  if (!elBehindNav) return "rgb(255, 255, 255)";

  let bgColor = window.getComputedStyle(elBehindNav).backgroundColor;

  let parent = elBehindNav.parentElement;
  while (
    parent &&
    (bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)")
  ) {
    bgColor = window.getComputedStyle(parent).backgroundColor;
    parent = parent.parentElement;
  }

  return bgColor;
}

const Header = (props: HeaderProps) => {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialDifficulty = getCookie("difficulty")?.toString() ?? "elementary";
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const [dynamicTextColor, setDynamicTextColor] = useState("black");
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
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateTextColor = useCallback(() => {
    const navSelector = ".sticky.top-0.z-40.w-full";
    const navElement = document.querySelector(navSelector) as HTMLElement;
    if (!navElement) return;
    const bgColor = getBackgroundColorBehindNav(navElement);
    const contrastColor = getContrastingColor(bgColor);
    setDynamicTextColor(contrastColor);
  }, []);

  // Update color on scroll
  useEffect(() => {
    window.addEventListener("scroll", updateTextColor);
    // Initial call on mount
    updateTextColor();
    return () => {
      window.removeEventListener("scroll", updateTextColor);
    };
  }, [updateTextColor]);

  // Re-calculate text color whenever theme changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure the DOM class (.dark) has been applied
    // before we compute background colors
    requestAnimationFrame(() => {
      updateTextColor();
    });
  }, [theme, updateTextColor]);

  // Immediately update color on theme toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    // Option 1: requestAnimationFrame
    requestAnimationFrame(() => {
      updateTextColor();
    });

    // Option 2 (alternative): short setTimeout did not like too quick
    // setTimeout(() => updateTextColor(), 0);
  };

  const handleSearch = () => {
    const query = inputRef.current?.value || "";
    if (query) {
      setShowDropdown(true);
      const fuse = new Fuse(files, fuseOptions);
      const results = fuse.search(query);
      console.debug(results);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div
      id="mainNavbar"
      className="fixed top-0 z-30 w-full flex-none border-b border-slate-900/10 backdrop-blur-sm transition-colors duration-300 ease-out dark:border-slate-50/[0.06]"
      style={{ color: dynamicTextColor }}
    >
      <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-16 2xl:px-64">
        <div className="mx-4 py-4 dark:border-slate-300/10 lg:mx-0 lg:border-0 lg:px-0">
          <div className="flex items-center justify-between">
            {/* Left side: Logo + Search */}
            <div className="flex items-center space-x-4">
              <a
                className="flex w-[2.0625rem] items-center transition-all duration-200 ease-in-out hover:scale-95 md:w-auto"
                href="/"
                style={{ color: dynamicTextColor }}
              >
                <span className="sr-only">WiQi home page</span>
                <Image
                  src="/wq.png"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="transition-transform duration-200 ease-in-out hover:rotate-12"
                />
                <span
                  className="ml-3 select-none text-2xl font-semibold text-pink-600 opacity-0 transition-colors duration-200 ease-in-out sm:opacity-100"
                  style={{ color: dynamicTextColor }}
                >
                  <p className="dark:text-slate-500">WiQi</p>
                </span>
              </a>
            </div>

            <div className="justify-left flex w-1/2 flex-1 pl-20">
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                crossOrigin="anonymous"
              />
              <form
                className="custom-form"
                style={{
                  borderColor: dynamicTextColor,
                }}
              >
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
                  className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Clear
                </button>
                {showDropdown && searchResults.length > 0 && (
                  <ul
                    className="absolute z-50 mt-10 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:bg-black"
                    style={{
                      borderColor: dynamicTextColor, // Dynamic border color
                    }}
                  >
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => {
                          // Navigate to the selected item's slug
                          window.location.href = result.slug;
                          clearInput();
                        }}
                      >
                        <a
                          href={`/${props.locale}/quantum_tuesdays/${initialDifficulty}/${result.slug}`}
                        >
                          <p className="font-semibold text-black dark:text-white">
                            {result.slug}
                          </p>
                          <p className="text-sm text-black dark:text-white">
                            {result.metadata.date}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>

            {/* Added: ENTRIES*/}
            {/* Desktop nav (hidden on mobile) */}
            <div className="hidden items-center space-x-6 lg:flex">
              <nav
                className="text-sm font-semibold leading-6"
                style={{ color: dynamicTextColor }}
              >
                <ul className="flex space-x-8">
                  <li>
                    <a
                      className="transition-all duration-300 ease-in-out hover:scale-105"
                      style={{ color: dynamicTextColor }}
                      href={`/${props.locale}/quantum_tuesdays`}
                    >
                      <p className="dark:text-slate-500">Quantum Tuesdays</p>
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Theme toggle + Language Switch */}
              <div className="flex items-center border-l border-slate-500 pl-6">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  className="mr-4 focus:outline-none"
                  onClick={toggleTheme}
                  style={{ color: dynamicTextColor }}
                >
                  {theme === "dark" ? (
                    // Dark mode icon
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
                    // Light mode icon
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
                className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
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
          } flex flex-col overflow-hidden p-4 backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden`}
        >
          <nav className="mb-4 text-sm font-semibold leading-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${props.locale}/quantum_tuesdays`}
                  className="block w-full py-2 hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quantum Tuesdays
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Theme Toggle & Language Switch */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="mr-4 focus:outline-none"
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
    </div>
  );
};

export default Header;
