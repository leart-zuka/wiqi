"use client";

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

import PostPreview from "@/app/components/PostPreview";
import DifficultySelector from "@/app/components/DifficultySelector";
import useResizeObserverHeight from "../../components/useResizeObserverHeight";

type File = {
  key: string;
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    date: string;
    author: string;
  };
  locale: string;
};

export default function Page({ params }: { params: { locale: string } }) {
  const cookies = useCookies();
  const initialDifficulty = cookies.get("difficulty") ?? "elementary";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [files, setFiles] = useState<File[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // 1) Measure the navbar’s height:
  const navbarHeight = useResizeObserverHeight("#mainNavbar");

  // 2) Listen for scroll to toggle "scrolled" state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3) Fetch the files (unchanged)
  const getFiles = async (difficulty: string, locale: string) => {
    try {
      const response = await fetch("/api/getBlogPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: locale,
          difficulty: difficulty,
          folder: "entries",
        }),
      });
      const data = await response.json();
      setFiles(data.files);
    } catch (err) {
      console.debug(err);
    }
  };

  useEffect(() => {
    getFiles(difficulty, params.locale);
  }, [difficulty, params.locale]);

  /**
   * 4) Combine the measured navbar height + the extra offset
   *    you want after scrolling. For example:
   *
   *    - If NOT scrolled:   use just `navbarHeight` (so we're snug below).
   *    - If scrolled:       `navbarHeight + 40` (to replicate "top-10" which is 2.5rem ≈ 40px).
   *
   *    Adjust to taste if you want more/less offset.
   */
  const topOffset = scrolled ? navbarHeight : navbarHeight;

  return (
    <div className="m-10">
      {/* 
        Instead of toggling tailwind classes `top-10 pt-10` vs. `top-0 pt-0`,
        we do a single sticky container + inline style for dynamic offset
      */}
      <div
        className="sticky z-20 grid place-items-end pt-3 transition-all duration-300"
        style={{
          top: `${topOffset}px`,
        }}
      >
        <DifficultySelector
          initialDifficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </div>

      <div className="z-10 grid grid-cols-1 gap-6 p-10 md:grid-cols-3">
        {files.map((file) => (
          <div key={file.slug} className="flex items-center justify-center">
            <PostPreview
              slug={file.slug}
              title={file.metadata.title}
              subtitle={file.metadata.subtitle}
              date={file.metadata.date}
              locale={params.locale}
              difficulty={difficulty}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
