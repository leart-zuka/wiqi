"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBeer, FaGithub } from "react-icons/fa";
import "./button.css";

interface HeaderProps {
  locale: string;
}

const replaceLocale = (locale: string, pathName: string): string => {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
};

const Header = (props: HeaderProps) => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  function clearInput(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="sticky top-0 z-40 w-full flex-none rounded-b-md bg-white/60 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-[#334155]/60">
      <div className="max-w-8xl mx-auto">
        <div className="mx-4 border-b border-slate-900/10 py-4 lg:mx-0 lg:border-0 lg:px-8 dark:border-slate-300/10">
          <div className="relative flex items-center">
            <a
              className="mr-3 flex w-[2.0625rem] items-center overflow-hidden transition-all duration-200 ease-in-out hover:scale-95 hover:text-pink-700 md:w-auto"
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
              <span className="ml-3 select-none text-2xl font-semibold text-pink-600 transition-colors duration-200 ease-in-out">
                WiQi
              </span>
            </a>
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
              integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
              crossOrigin="anonymous"
            />
            <form className="custom-form">
              <input type="search" ref={inputRef} autoFocus required />
              <i className="fa fa-search"></i>
              <button
                type="button"
                onClick={clearInput}
                style={{ cursor: "pointer" }}
              >
                Clear
              </button>
            </form>

            <div className="relative ml-auto hidden items-center lg:flex">
              <nav className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-8">
                  <li>
                    <a
                      className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-pink-600"
                      href={`/${props.locale}/quantum_tuesdays`}
                    >
                      Quantum Tuesdays
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-500">
                <label
                  className="sr-only"
                  for="headlessui-listbox-button-:r5:"
                  id="headlessui-label-:r4:"
                  data-headlessui-state=""
                >
                  Theme
                </label>
                <button
                  type="button"
                  id="headlessui-listbox-button-:r5:"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  data-headlessui-state=""
                  aria-labelledby="headlessui-label-:r4: headlessui-listbox-button-:r5:"
                >
                  <span className="dark:hidden">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-6 w-6"
                    >
                      <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        className="fill-sky-400/20 stroke-sky-500"
                      ></path>
                      <path
                        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                        className="stroke-sky-500"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden dark:inline">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                        className="fill-sky-400/20"
                      ></path>
                      <path
                        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                        className="fill-sky-500"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                        className="fill-sky-500"
                      ></path>
                    </svg>
                  </span>
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

                {/* 
                <a
                  href="https://github.com/leart-zuka/wiqi"
                  className="ml-6 block text-white hover:text-slate-500 dark:hover:text-slate-300"
                >
                  <span className="sr-only">WiQi on GitHub</span>
                  <FaGithub className="text scale-150 rounded-3xl" />
                </a>
                 */}
              </div>
            </div>
            <button
              type="button"
              className="-my-1 ml-auto flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300"
            >
              <span className="sr-only">Search</span>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
            </button>
            <div className="-my-1 ml-2 lg:hidden">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <span className="sr-only">Navigation</span>
                <svg width="24" height="24" fill="none" aria-hidden="true">
                  <path
                    d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              {/* 
              <div
                hidden=""
                style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"
              ></div>
               */}
            </div>
          </div>
        </div>
        <div className="flex items-center border-b border-slate-900/10 p-4 lg:hidden dark:border-slate-50/[0.06]">
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
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
          <ol className="ml-4 flex min-w-0 whitespace-nowrap text-sm leading-6">
            <li className="flex items-center">
              Getting Started
              <svg
                width="3"
                height="6"
                aria-hidden="true"
                className="mx-3 overflow-visible text-slate-400"
              >
                <path
                  d="M0 0L3 3L0 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
              </svg>
            </li>
            <li className="truncate font-semibold text-slate-900 dark:text-slate-200">
              Installation
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Header;
