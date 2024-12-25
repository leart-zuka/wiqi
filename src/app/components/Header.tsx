"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./button.css";

interface HeaderProps {
  locale: string;
}

const replaceLocale = (locale: string, pathName: string): string => {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
};

// Kontrastfarbe bestimmen
function getContrastingColor(bgColor: string) {
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return "black"; // Fallback

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

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const [dynamicTextColor, setDynamicTextColor] = useState("black");

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

  useEffect(() => {
    if (!hasMounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, hasMounted]);

  function clearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Wir definieren updateTextColor hier, damit wir sie sowohl beim Scrollen als auch beim Theme-Wechsel aufrufen können
  const updateTextColor = useCallback(() => {
    const navSelector = ".sticky.top-0.z-40.w-full";
    const navElement = document.querySelector(navSelector) as HTMLElement;
    if (!navElement) return;
    const bgColor = getBackgroundColorBehindNav(navElement);
    const contrastColor = getContrastingColor(bgColor);
    setDynamicTextColor(contrastColor);
  }, []);

  // Beim Scrollen erneuern
  useEffect(() => {
    window.addEventListener("scroll", updateTextColor);
    updateTextColor();

    return () => {
      window.removeEventListener("scroll", updateTextColor);
    };
  }, [updateTextColor]);

  // Bei Änderung des Themes auch erneut berechnen
  useEffect(() => {
    updateTextColor();
  }, [theme, updateTextColor]);

  return (
    <div
      className={`sticky top-0 z-40 w-full flex-none border-b border-slate-900/10 backdrop-blur-sm transition-colors duration-300 ease-out dark:border-slate-50/[0.06]`}
      style={{ color: dynamicTextColor }}
    >
      <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-16 2xl:px-64">
        <div className="mx-4 border-b border-slate-900/10 py-4 dark:border-slate-300/10 lg:mx-0 lg:border-0 lg:px-0">
          <div className="relative flex items-center">
            <a
              className="mr-3 flex w-[2.0625rem] items-center overflow-hidden transition-all duration-200 ease-in-out hover:scale-95 md:w-auto"
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
                className="ml-3 select-none text-2xl font-semibold text-pink-600 transition-colors duration-200 ease-in-out"
                style={{ color: dynamicTextColor }}
              >
                WiQi
              </span>
            </a>
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
              integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
              crossOrigin="anonymous"
            />
            {/* Suchleiste */}
            <form
              className="custom-form"
              style={{
                borderColor: dynamicTextColor, // Dynamic border color
              }}
            >
              <input
                type="search"
                ref={inputRef}
                required
                className="rounded-md border border-gray-300 px-2 py-1 text-black"
              />
              <i className="fa fa-search"></i>
              <button
                type="button"
                onClick={clearInput}
                className="ml-2 text-sm text-blue-500 hover:text-blue-700"
              >
                Clear
              </button>
            </form>
            {/* Ende Suchleiste */}

            <div className="relative ml-auto hidden items-center lg:flex">
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
                      Quantum Tuesdays
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="ml-6 flex items-center border-l border-slate-500 pl-6">
                <label className="sr-only" htmlFor="theme-selector">
                  Theme
                </label>
                <button
                  type="button"
                  id="theme-selector"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  className="focus:outline-none"
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

                <div className="ml-4 hidden md:flex">
                  <Link href={replaceLocale(props.locale, pathName)}>
                    <Image
                      src={`/${props.locale}.svg`}
                      alt={`${props.locale} Flag`}
                      width={24}
                      height={24}
                      className="self-center rounded-md transition-transform duration-200 ease-in-out hover:scale-95 hover:shadow-md"
                      priority
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="flex items-center border-b border-slate-900/10 p-4 dark:border-slate-50/[0.06] lg:hidden">
          <button
            type="button"
            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <span className="sr-only">Navigation</span>
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
          <ol className="ml-4 flex min-w-0 whitespace-nowrap text-sm leading-6"></ol>
        </div>
      </div>
    </div>
  );
};

export default Header;
