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
        <main className="flex  flex-col items-center justify-between p-24 font-mono">
            <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex min-h-display">
                <Link href={locale === 'de' ? '/en' : '/de'}>
                    <Image
                        src={useLocale() + ".svg"}
                        alt={useLocale() + " Flag"}
                        className="fixed right-0 top-0 p-2 cursor-pointer"
                        width={50}
                        height={12}
                        priority
                    />
                </Link>
            </div>
            <div className="flex justify-center space-y-4">
                <DropDown className={"fixed left-10 w-20 "} stateChange={setDifficulty} />
                <p className="fixed border-2 border-sky-500 w-fit p-4">
                    {t(`${difficulty}`)}
                </p>
            </div>
        </main>
    );
}
