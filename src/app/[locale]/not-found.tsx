import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="px-4 text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            {t("goHome")}
          </a>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{t("helpText")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
