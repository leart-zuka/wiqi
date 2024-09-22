"use client";
import DifficultySelector from "@/app/components/DifficultySelector";
import { useCookies } from "next-client-cookies";

export default function QTLayout({ children }: { children: React.ReactNode }) {
  const cookies = useCookies();
  const initialDifficulty = cookies.get("difficulty") ?? "highschool";

  return (
    <div className="m-10">
      <DifficultySelector initialDifficulty={initialDifficulty} />
      <div className="p-20">{children}</div>
    </div>
  );
}
