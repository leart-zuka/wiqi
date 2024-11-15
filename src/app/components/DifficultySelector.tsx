import { setCookie } from "cookies-next";

interface DifficultySelector {
  initialDifficulty: string;
  setDifficulty: (difficulty: string) => void;
}

export default function DifficultySelector({
  initialDifficulty,
  setDifficulty,
}: DifficultySelector) {
  const difficulties = [
    {
      id: "elementary",
      emoji: "🧒",
      bg: "bg-green-400",
      hover: "hover:bg-green-500",
    },
    {
      id: "highschool",
      emoji: "🧑‍💻",
      bg: "bg-yellow-400",
      hover: "hover:bg-yellow-500",
    },
    { id: "college", emoji: "🧑‍🏫", bg: "bg-red-400", hover: "hover:bg-red-500" },
  ];

  const initialIndex = difficulties.findIndex(
    (diff) => diff.id === initialDifficulty,
  );

  return (
    <div className="relative flex h-12 w-48 overflow-hidden rounded-full bg-slate-200">
      <div
        className={`absolute left-0 top-0 h-full w-1/3 rounded-full transition-all duration-500 ${
          initialIndex !== -1 ? difficulties[initialIndex].bg : "bg-green-400"
        } hover: ${initialIndex !== -1 ? difficulties[initialIndex].hover : "hover:bg-green-400"}`}
        style={{
          transform: `translateX(${initialIndex * 100}%)`,
        }}
      ></div>

      {difficulties.map((difficulty) => (
        <button
          key={difficulty.id}
          className={"relative z-10 flex-1 text-center font-bold text-white"}
          onClick={() => {
            setDifficulty(difficulty.id);
            setCookie("difficulty", difficulty.id);
          }}
        >
          {difficulty.emoji}
        </button>
      ))}
    </div>
  );
}
