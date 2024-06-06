'use client';
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import DropDown from "../components/DropDownSelect";

export default function Home() {
    const t = useTranslations('Index')
    const [locale, setLocale] = useState(useLocale())
    const [difficulty, setDifficulty] = useState("Elementary School Student")
    return (
        <main >
            <div>
                <Link href={locale === 'de' ? '/en' : '/de'}>
                    <Image
                        src={useLocale() + ".svg"}
                        alt={useLocale() + " Flag"}
                        width={50}
                        height={12}
                        className="relative float-right p-2"
                        priority
                    />
                </Link>
            </div>
            <div className="text-center">
                <h1 className="relative left-2"> Hi this is the title of my page </h1>
            </div>
            <DropDown className={"absolute left-2 w-20"} stateChange={setDifficulty} />
            <div className="relative top-10 ">
                <p className="text-center">
                    {t(`${difficulty}`)}
                </p>
            </div>
        </main >
    );
}
