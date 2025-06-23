import { setCookie } from "cookies-next";

interface DifficultySelector {
  initialDifficulty: string;
  setDifficulty: any;
}

export default function DifficultySelector({
  initialDifficulty,
  setDifficulty,
}: DifficultySelector) {
  const difficulties = [
    {
      id: "elementary",
      emoji: "🧑‍🏫",
      bg: "bg-green-500 dark:bg-green-600",
      hoverBg: "hover:bg-green-600 dark:hover:bg-green-700",
      className:
        "relative z-10 flex-1 rounded-full text-center font-bold text-white transition-all duration-300",
    },
    {
      id: "highschool",
      emoji: "🧑‍🎓",
      bg: "bg-yellow-500 dark:bg-yellow-600",
      hoverBg: "hover:bg-yellow-600 dark:hover:bg-yellow-700",
      className:
        "relative z-10 flex-1 rounded-full text-center font-bold text-white transition-all duration-300",
    },
    {
      id: "college",
      emoji: "🧑‍🔬",
      bg: "bg-red-500 dark:bg-red-600",
      hoverBg: "hover:bg-red-600 dark:hover:bg-red-700",
      className:
        "relative z-10 flex-1 rounded-full text-center font-bold text-white transition-all duration-300",
    },
  ];

  const initialIndex = difficulties.findIndex(
    (diff) => diff.id === initialDifficulty,
  );

  const selectedDifficulty =
    initialIndex !== -1 ? difficulties[initialIndex] : difficulties[0];

  return (
    <div className="relative z-40 flex h-12 w-48 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-gray-800 dark:shadow-gray-900/50">
      {/* Sliding background indicator */}
      <div
        className={`absolute left-0 top-0 h-full w-1/3 rounded-full shadow-lg transition-all duration-500 ease-out ${selectedDifficulty.bg}`}
        style={{
          transform: `translateX(${initialIndex * 100}%)`,
        }}
      ></div>

      {/* Difficulty buttons */}
      {difficulties.map((difficulty, index) => {
        const isSelected = index === initialIndex;
        return (
          <button
            key={difficulty.id}
            className={`${difficulty.className} ${difficulty.hoverBg} ${
              isSelected
                ? "text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            } hover:scale-105 active:scale-95`}
            onClick={() => {
              setDifficulty(difficulty.id);
              setCookie("difficulty", difficulty.id);
            }}
          >
            <span className="text-lg">{difficulty.emoji}</span>
          </button>
        );
      })}
    </div>
  );
}
