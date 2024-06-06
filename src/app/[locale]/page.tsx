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
        <main className="text-center">
            <div>
                <Link href={locale === 'de' ? '/en' : '/de'}>
                    <Image
                        src={useLocale() + ".svg"}
                        alt={useLocale() + " Flag"}
                        width={50}
                        height={12}
                        priority
                    />
                </Link>
            </div>
            <div>
                <DropDown className={"w-20"} stateChange={setDifficulty} />
                <p>
                    {t(`${difficulty}`)}
                </p>
            </div>
        </main>
    );
}
