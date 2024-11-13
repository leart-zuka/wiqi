"use client";
import PostPreview from "@/app/components/PostPreview";
import { useEffect, useState } from "react";
import DifficultySelector from "@/app/components/DifficultySelector";
import { useCookies } from "next-client-cookies";

type File = {
  key: string;
  slug: string;
  metadata: {
    subtitle: string;
    date: string;
  };
  locale: string;
};

export default function Page({ params }: { params: { locale: string } }) {
  const cookies = useCookies();
  const initialDifficulty = cookies.get("difficulty") ?? "highschool";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [files, setFiles] = useState<File[]>([]);

  let getFiles = async (difficulty: string, locale: string) => {
    try {
      const response = await fetch("/api/getBlogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: locale,
          difficulty: difficulty,
          folder: "quantum_tuesdays",
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

  return (
    <div className="m-10">
      <DifficultySelector
        initialDifficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <div className="grid grid-cols-3 gap-6 p-10">
        {" "}
        {/* Adjusted padding */}
        {files.map((file) => (
          <div
            key={file.slug} // Unique key for each item
            className="flex items-center justify-center"
          >
            <PostPreview
              slug={file.slug}
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
