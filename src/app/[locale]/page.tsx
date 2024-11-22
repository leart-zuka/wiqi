"use client";
import Image from "next/image";
import CustomLink from "../components/CustomLink";
import SuperpositionButton from "../components/SuperpositionButton";

export default function Home() {
  return (
    <div className="y-10 flex items-center justify-between px-10 lg:py-0 xl:rounded-xl xl:border-hidden">
      <div className="space-y-5 p-10 lg:py-6">
        <h1 className="w-11/12 max-w-xl font-serif text-6xl sm:w-9/12 md:text-7xl">
          Welcome to the{" "}
          <span className="bg-gradient-to-r from-blue-700 to-rose-700 bg-clip-text text-6xl font-bold text-transparent">
            Wiqi
          </span>{" "}
        </h1>
        <h1 className="w-9/12 text-3xl">
          We want to teach the world about world of quantum. <br />
        </h1>
        <SuperpositionButton>
          <p className="text-white"> Visit our current blogposts </p>
        </SuperpositionButton>
      </div>
      <Image
        src="/pq_logo.svg"
        alt="PushQuantum Logo"
        width={400}
        height={400}
      />
    </div>
  );
}
