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
            <nav className="fixed bg-white border-gray-200 top-5 w-screen start-0 flex flex-wrap items-center mx-auto h-auto justify-between">
                <DropDown className={"space-x-10 w-20 scale-75 rtl:space-x-3"} stateChange={setDifficulty} />
                <Link href={locale === 'de' ? '/en' : '/de'}>
                    <Image
                        src={useLocale() + ".svg"}
                        alt={useLocale() + " Flag"}
                        width={50}
                        height={12}
                        className="self-center p-2 md:order-2"
                        priority
                    />
                </Link>
            </nav>

            <div className="relative top-52">
                <p className="text-center">
                    {t(`${difficulty}`)}
                </p>
            </div>
        </main >
    );
}
