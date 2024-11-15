import { setCookie } from "cookies-next";

interface DifficultySelector {
  initialDifficulty: string;
  setDifficulty: any;
}

export default function DifficultySelector({
  initialDifficulty,
  setDifficulty,
}: DifficultySelector) {
  return (
    <div className="flex flex-row-reverse">
      <button
        className={`rounded-r-full border border-black p-2 hover:bg-red-500 ${
          initialDifficulty === "college" ? "bg-red-400" : ""
        }`}
        onClick={() => {
          setDifficulty("college");
          setCookie("difficulty", "college");
        }}
      >
        🧑‍🏫
      </button>
      <button
        className={`border border-y-black p-2 hover:bg-yellow-500 ${
          initialDifficulty === "highschool" ? "bg-yellow-400" : ""
        }`}
        onClick={() => {
          setDifficulty("highschool");
          setCookie("difficulty", "highschool");
        }}
      >
        🧑‍💻
      </button>
      <button
        className={`rounded-l-full border border-black p-2 hover:bg-green-400 ${
          initialDifficulty === "elementary" ? "bg-green-400" : ""
        }`}
        onClick={() => {
          setDifficulty("elementary");
          setCookie("difficulty", "elementary");
        }}
      >
        🧒
      </button>
    </div>
  );
}
