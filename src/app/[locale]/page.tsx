"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
      <section className="relative min-h-screen overflow-hidden bg-slate-50 py-24 dark:bg-black sm:pb-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-normal text-gray-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {t("hello")}{" "}
                <span className="animate-gradient-x bg-gradient-to-r from-blue-700 to-rose-700 bg-200% bg-clip-text text-6xl font-semibold text-transparent">
                  PushQuantum WiQi
                </span>
              </h1>
              <p className="mt-4 text-lg font-normal text-gray-600 dark:text-gray-400 sm:mt-8">
                {t("sub hello")}
              </p>

              {/* Stars Section */}
              <div className="mt-3 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                        fill="url(#defaultGradient)"
                      />
                      <defs>
                        <linearGradient
                          id="defaultGradient"
                          x1="3.07813"
                          y1="3.8833"
                          x2="23.0483"
                          y2="6.90161"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" style={{ stopColor: "purple" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#FE2B77" }}
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-base font-normal text-gray-900 dark:text-white">
                  5/5
                </span>
                <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  2 Reviews (Leart & Alpi)
                </span>
              </div>
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
                  className={`absolute inset-0 h-full w-full transition-all duration-[1200ms] ease-in-out ${
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
