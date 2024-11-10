import { useCookies } from "next-client-cookies";
import { useState } from "react";

interface DifficultySelector {
  initialDifficulty: string | undefined;
}

export default function DifficultySelector({
  initialDifficulty,
}: DifficultySelector) {
  const cookies = useCookies();
  const [difficulty, setDifficulty] = useState(
    initialDifficulty ?? cookies.set("difficulty", "highschool"),
  );

  return (
    <div className="flex flex-row-reverse">
      <button
        className={`p-2 border border-black hover:bg-red-500 rounded-r-full ${
          difficulty === "college" ? "bg-red-400" : ""
        }`}
        onClick={() => {
          setDifficulty("college");
          cookies.set("difficulty", "college");
        }}
      >
        🧑‍🏫
      </button>
      <button
        className={`p-2 border border-y-black hover:bg-yellow-500 ${
          difficulty === "highschool" ? "bg-yellow-400" : ""
        }`}
        onClick={() => {
          setDifficulty("highschool");
          cookies.set("difficulty", "highschool");
        }}
      >
        🧑‍💻
      </button>
      <button
        className={`p-2 border border-black hover:bg-green-400 rounded-l-full ${
          difficulty === "elementary" ? "bg-green-400" : ""
        }`}
        onClick={() => {
          setDifficulty("elementary");
          cookies.set("difficulty", "elementary");
        }}
      >
        🧒
      </button>
    </div>
  );
}
