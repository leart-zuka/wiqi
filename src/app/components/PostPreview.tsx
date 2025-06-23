"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface PostPreviewProps {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  locale: string;
  difficulty: string;
  folder: string;
  viewMode?: "grid" | "list";
}

const PostPreview = (props: PostPreviewProps) => {
  const { viewMode = "grid" } = props;
  const t = useTranslations("Posts");
  const href = `/${props.locale}/posts/${props.folder}/${props.difficulty}/${props.slug}`;

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(
        props.locale === "de" ? "de-DE" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      );
    } catch {
      return dateString;
    }
  };

  // Get difficulty info
  const getDifficultyInfo = () => {
    switch (props.difficulty) {
      case "elementary":
        return {
          emoji: "🧑‍🏫",
          label: t("elementary"),
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        };
      case "highschool":
        return {
          emoji: "🧑‍🎓",
          label: t("high school"),
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        };
      case "college":
        return {
          emoji: "🧑‍🔬",
          label: t("college"),
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        };
      default:
        return {
          emoji: "📚",
          label: props.difficulty,
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
        };
    }
  };

  // Get category info
  const getCategoryInfo = () => {
    if (props.folder === "quantum_tuesdays") {
      return {
        label: t("quantum tuesday"),
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      };
    } else if (props.folder === "entries") {
      return {
        label: t("entry"),
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      };
    }
    return {
      label: props.folder,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
  };

  const difficultyInfo = getDifficultyInfo();
  const categoryInfo = getCategoryInfo();

  if (viewMode === "list") {
    return (
      <div className="relative">
        <Link href={href} className="group block">
          <Card className="overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800/80 dark:hover:border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  {/* Category and Difficulty Badges */}
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${categoryInfo.color} pointer-events-none text-xs font-medium`}
                    >
                      {categoryInfo.label}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${difficultyInfo.color} pointer-events-none text-xs font-medium`}
                    >
                      <span className="mr-1">{difficultyInfo.emoji}</span>
                      {difficultyInfo.label}
                    </Badge>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                      {props.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-gray-600 dark:text-gray-300">
                      {props.subtitle}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(props.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>5-10 {t("min read")}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-100 dark:bg-gray-700 dark:group-hover:bg-purple-900/30">
                    <ArrowRight className="h-5 w-5 text-gray-600 transition-colors group-hover:text-purple-600 dark:text-gray-300 dark:group-hover:text-purple-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="relative h-full">
      <Link href={href} className="group block h-full">
        <Card className="group relative h-full overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-slate-800/80 dark:hover:border-gray-600">
          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            <CardHeader className="pb-3">
              {/* Category and Difficulty Badges */}
              <div className="flex items-center justify-between gap-2">
                <Badge
                  className={`${categoryInfo.color} pointer-events-none text-xs font-medium`}
                >
                  {categoryInfo.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${difficultyInfo.color} pointer-events-none text-xs font-medium`}
                >
                  <span className="mr-1">{difficultyInfo.emoji}</span>
                  {difficultyInfo.label}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col pt-0">
              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold leading-tight text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                {props.title}
              </h3>

              {/* Subtitle */}
              <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600 dark:text-gray-300">
                {props.subtitle}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(props.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>5-10 {t("min read")}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="flex items-center gap-1 text-xs font-medium text-purple-600 transition-all duration-300 group-hover:gap-2 dark:text-purple-400">
                  <span>{t("read more")}</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </CardContent>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        </Card>
      </Link>
    </div>
  );
};

export default PostPreview;
