"use client";
import Image from "next/image";
import S_Button from "../components/S_Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Home({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const t = useTranslations("Index");
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

        <div className="flex items-center justify-center">
          <Image
            src="/pq_logo.svg"
            alt="PushQuantum Logo"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
