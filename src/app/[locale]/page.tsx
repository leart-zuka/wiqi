"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomLink from "../components/CustomLink";
import Header from "../components/Header";

export default function Home() {
  const t = useTranslations("Index");
  const [difficulty, setDifficulty] = useState("Elementary School Student");
  return (
    <main>
      <Header stateChange={setDifficulty} />
      <div className="text-center top-24 h-fit">
        <p className="">{t(`${difficulty}`)}</p>
        <h1 className="text-5xl"> Hi this is a text </h1>
        <div>
          <CustomLink href="https://www.pushquantum.tech/">test</CustomLink>
          <p>blablaba</p>
        </div>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
        <h1> Hi this is a text </h1>
      </div>
    </main>
  );
}

const main_colors = {
  dark_blue: "#06014a",
  pink: "#fe2a77",
};
