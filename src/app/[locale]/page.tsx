"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import DropDown from "../components/DropDownSelect";
import CustomLink from "../components/CustomLink";

export default function Home() {
    const t = useTranslations("Index");
    const [locale, setLocale] = useState(useLocale());
    const [difficulty, setDifficulty] = useState("Elementary School Student");
    return (
        <main>
            <nav className="bg-opacity-20 bg-white w-full start-0 h-fit">
                <div className="relative flex flex-wrap items-center mx-auto justify-between p-2">
                    <a
                        href="https://www.pushquantum.tech/"
                        className="flex items-center space-x-0"
                    >
                        <Image
                            src="pq_logo.svg"
                            className="h-8 p-2"
                            alt="PushQuantum Logo"
                            width={34}
                            height={20}
                        />
                        <span className="text-lg font-semibold italic dark:text-white">
                            {" "}
                            PushQuantum
                        </span>
                    </a>
                    <DropDown
                        className={"relative right-12 w-20"}
                        stateChange={setDifficulty}
                    />
                    <Link href={locale === "de" ? "/en" : "/de"}>
                        <Image
                            src={useLocale() + ".svg"}
                            alt={useLocale() + " Flag"}
                            width={50}
                            height={12}
                            className="self-center p-2 md:order-2"
                            priority
                        />
                    </Link>
                </div>
            </nav>
            <div className="text-center top-24 h-fit">
                <p className="">{t(`${difficulty}`)}</p>
                <h1 className="text-5xl"> Hi this is a text </h1>
                <CustomLink href="https://www.pushquantum.tech/"><h1> test </h1></CustomLink>
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
