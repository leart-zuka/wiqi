"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link
              href="https://www.pushquantum.tech/"
              className="flex items-center"
            >
              <Image
                src="/pq_logo.svg"
                className="h-8 w-8"
                alt="PushQuantum Logo"
                width={34}
                height={34}
              />
              <span className="ml-2 text-lg font-semibold italic text-white">
                PushQuantum
              </span>
            </Link>
          </div>

          {/* Center Section: Quantum Tuesdays (visible on medium and larger screens) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:flex">
            <Link
              href={`/${props.locale}/quantum_tuesdays`}
              className="font-bold text-white hover:text-sky-400"
            >
              Quantum Tuesdays
            </Link>
          </div>

          {/* Right Section: Locale Flag and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Desktop Flag */}
            <div className="hidden md:flex">
              <Link href={replaceLocale(props.locale, pathName)}>
                <Image
                  src={`/${props.locale}.svg`}
                  alt={`${props.locale} Flag`}
                  width={24}
                  height={24}
                  className="self-center"
                  priority
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="ml-2 md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-200 hover:text-white focus:text-white focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  // Close Icon
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href={`/${props.locale}/quantum_tuesdays`}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-sky-400"
            >
              Quantum Tuesdays
            </Link>
            <Link
              href={replaceLocale(props.locale, pathName)}
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-sky-400"
            >
              <Image
                src={`/${props.locale}.svg`}
                alt={`${props.locale} Flag`}
                width={24}
                height={24}
                className="mr-2"
                priority
              />
              {props.locale.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
