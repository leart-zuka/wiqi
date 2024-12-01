"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface HomeProps {
  params: {
    locale: string;
  };
}

const Home: React.FC<HomeProps> = ({ params }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("Index");

  const images = ["superpos.svg", "|1>.svg", "|0>.svg", "main.svg"];
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setVisibleIndex(randomIndex);
  };

  const handleMouseLeave = () => {
    setVisibleIndex(0); // Reset to default image
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="shrink-0"></div>

        {/* Mobile Navigation Menu */}
        {isExpanded && (
          <nav>
            <div className="flex flex-col space-y-6 pb-4 pt-8">
              <a
                href="#"
                title="Products"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Products
              </a>

              <a
                href="#"
                title="Features"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Features
              </a>

              <a
                href="#"
                title="Pricing"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Pricing
              </a>

              <a
                href="#"
                title="Support"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Support
              </a>

              <div className="group relative inline-flex items-center justify-center">
                <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <a
                  href="#"
                  title="Start Free Trial"
                  className="relative inline-flex w-full items-center justify-center rounded-full border border-transparent bg-black px-6 py-2 text-base font-normal text-white"
                  role="button"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>

      <section className="relative min-h-screen overflow-hidden bg-black py-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {t("hello")}{" "}
                <span className="animate-gradient-x bg-200% bg-gradient-to-r from-blue-700 to-rose-700 bg-clip-text text-6xl font-semibold text-transparent">
                  PushQuantum WiQi
                </span>
              </h1>
              <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                {t("sub hello")}
              </p>
            </div>

            <div
              className="relative h-[500px] w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={`/${src}`}
                  alt={`Image ${index}`}
                  className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
                    visibleIndex === index
                      ? "z-10 scale-100 opacity-100 blur-0"
                      : "z-0 scale-90 opacity-0 blur-md"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
