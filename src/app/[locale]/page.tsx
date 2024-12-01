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
  const [measurement, setMeasurement] = useState<string>("superpos.svg");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const router = useRouter();
  const t = useTranslations("Index");

  const getRandomMeasurement = (): string => {
    const measurements = ["|1>.svg", "|0>.svg", "main.svg"];
    return measurements[Math.floor(Math.random() * measurements.length)];
  };

  const handleMouseEnter = () => {
    const randomColor = getRandomMeasurement();
    setMeasurement(randomColor);
  };

  const handleMouseLeave = () => {
    setMeasurement("superpos.svg");
  };

  const toggleMenu = () => {
    setIsExpanded((prev) => !prev);
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
        <div className="relativea mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <div className="mt-8 sm:mt-12">
                <p className="text-lg font-normal text-white">
                  Your 5 Star Site for Quantum Computing
                </p>
                <div className="mt-3 flex items-center">
                  <div className="flex">
                    {/* Repeat SVG stars as needed */}
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
                  <span className="ml-2 text-base font-normal text-white">
                    5/5
                  </span>
                  <span className="ml-1 text-base font-normal text-gray-500">
                    2 Reviews (Leart & Alpi)
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0">
                <svg
                  className="opacity-70 blur-3xl filter"
                  style={{ filter: "blur(64px)" }}
                  width="444"
                  height="536"
                  viewBox="0 0 444 536"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                    fill="url(#c)"
                  />
                  <defs>
                    <linearGradient
                      id="c"
                      x1="82.7339"
                      y1="550.792"
                      x2="-39.945"
                      y2="118.965"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "var(--color-cyan-500)" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "var(--color-purple-500)" }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="flex items-center justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  className="relative mx-auto w-full max-w-md"
                  src={`/${measurement}`}
                  alt="A qubit :D"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
