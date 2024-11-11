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
        className={`p-2 border border-black hover:bg-red-500 rounded-r-full ${
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
        className={`p-2 border border-y-black hover:bg-yellow-500 ${
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
        className={`p-2 border border-black hover:bg-green-400 rounded-l-full ${
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
