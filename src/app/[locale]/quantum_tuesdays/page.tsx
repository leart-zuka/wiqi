"use client";
import PostPreview from "@/app/components/PostPreview";
import { useEffect, useState } from "react";
import DifficultySelector from "@/app/components/DifficultySelector";
import { useCookies } from "next-client-cookies";

export default function Page({ params }: { params: { locale: string } }) {
  const cookies = useCookies();
  const initialDifficulty = cookies.get("difficulty") ?? "highschool";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [files, setFiles] = useState([]);

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
      <div className="p-40">
        {files.map((file) => {
          return (
            <PostPreview
              key={file.slug}
              slug={file.slug}
              subtitle={file.metadata.subtitle}
              date={file.metadata.date}
              locale={params.locale}
            />
          );
        })}
      </div>
    </div>
  );
}
