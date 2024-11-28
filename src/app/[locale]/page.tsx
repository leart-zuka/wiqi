"use client";
import Image from "next/image";
import S_Button from "../components/S_Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Home({ params }: { params: { locale: string } }) {
  const [measurement, setMeasurement] = useState("superpos.svg");

  const router = useRouter();
  const t = useTranslations("Index");

  const getRandomMeasurement = () => {
    const measurements = ["|1>.svg", "|0>.svg", "main.svg"];
    return measurements[Math.floor(Math.random() * measurements.length)];
  };

  const handleMouseEnter = () => {
    const randomColor = getRandomMeasurement();
    setMeasurement(randomColor);
  };

  const handleMouseLeave = () => {
    setMeasurement("superpos.svg");
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center space-y-5 text-center">
          <h1 className="w-11/12 max-w-xl font-serif text-6xl sm:w-9/12 md:text-7xl">
            {t("hello")}{" "}
            <span className="bg-gradient-to-r from-blue-700 to-rose-700 bg-clip-text text-6xl font-bold text-transparent">
              Wiqi
            </span>
          </h1>
          <h2 className="text-3xl">{t("sub hello")}</h2>
          <S_Button
            onClick={() => router.push(`/${params.locale}/quantum_tuesdays`)}
          >
            <p className="text-white">{t("hello button")}</p>
          </S_Button>
        </div>

        <div
          className="flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={`${measurement}`}
            alt="A qubit :D"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
