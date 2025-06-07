"use client";

import { useState, useEffect } from "react";
import { WavyBackgroundDark } from "@/components/ui/wavy-background-dark";
import { WavyBackgroundLight } from "@/components/ui/wavy-background-light";

/**
 * DarkModeAwareBackground Component
 *
 * A dynamic background component that automatically switches between dark and light wave animations
 * based on the user's theme preference. It uses MutationObserver to detect theme changes in real-time.
 *
 * @component
 * @returns {JSX.Element} Renders either WavyBackgroundDark or WavyBackgroundLight based on theme
 */
export function DarkModeAwareBackground() {
  // State to track the current theme mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial theme check
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // Set up MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Only update if the class attribute changes
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    // Start observing the document root for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"], // Only observe class attribute changes
    });

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, []);

  // Render appropriate background based on theme
  return isDarkMode ? (
    <WavyBackgroundDark className="mx-auto max-w-4xl pb-40">
      {/* Empty paragraphs for layout structure - can be removed if not needed */}
      <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl"></p>
      <p className="inter-var mt-4 text-center text-base font-normal text-white md:text-lg"></p>
    </WavyBackgroundDark>
  ) : (
    <WavyBackgroundLight className="mx-auto max-w-4xl pb-40">
      {/* Empty paragraphs for layout structure - can be removed if not needed */}
      <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl"></p>
      <p className="inter-var mt-4 text-center text-base font-normal text-white md:text-lg"></p>
    </WavyBackgroundLight>
  );
}
