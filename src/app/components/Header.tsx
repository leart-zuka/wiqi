import Image from "next/image";
import Link from "next/link";
import DropDown from "../components/DropDownSelect";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export default function Header({
  stateChange,
}: {
  stateChange: Dispatch<SetStateAction<string>>;
}) {
  const [locale, setLocale] = useState(useLocale());
  return (
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
          className={"relative right-12 w-20 z-50"}
          stateChange={stateChange}
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
  );
}
