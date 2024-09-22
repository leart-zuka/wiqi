"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  locale: string;
}

const replaceLocale = (locale: string, pathName: string): string => {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
};

const Header = (props: HeaderProps) => {
  const pathName = usePathname();
  return (
    <nav className="bg-slate-700 w-full start-0 h-fit">
      <div className="relative flex flex-wrap items-center mx-auto justify-between p-2">
        <a
          href="https://www.pushquantum.tech/"
          className="flex items-center space-x-0"
        >
          <Image
            src="/pq_logo.svg"
            className="h-8 p-2"
            alt="PushQuantum Logo"
            width={34}
            height={20}
          />
          <span className="text-lg font-semibold italic text-white">
            {" "}
            PushQuantum
          </span>
        </a>
        <Link href={`${props.locale}/quantum_tuesdays`}>
          <h1 className="text-white font-bold hover:text-sky-400">
            Quantum Tuesdays
          </h1>
        </Link>
        <Link href={replaceLocale(props.locale, pathName)}>
          <Image
            src={`/${props.locale}.svg`}
            alt={`${props.locale} Flag`}
            width={50}
            height={12}
            className="self-center p-2 md:order-2"
            priority
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
