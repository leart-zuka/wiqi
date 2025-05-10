"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface CardData {
  id: string;
  title: string;
  description: string;
  additionalInfo: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  difficulty: string;
  readTime: string;
  endpoint: string;
}

interface FeaturedCardProps {
  locale: string;
}

export default function FeaturedCard({ locale }: FeaturedCardProps) {
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    // Load the appropriate cards data based on locale
    const cardsData: CardData[] =
      locale === "de"
        ? require("./data/de/cards.json")
        : require("./data/en/cards.json");

    // Select a random card
    const randomIndex = Math.floor(Math.random() * cardsData.length);
    setCard(cardsData[randomIndex]);
  }, [locale]);

  if (!card) return null;

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>
      <div className="relative rotate-2 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-transparent dark:bg-blue-900/30 dark:text-blue-300">
            {locale === "de" ? "Ausgewählter Inhalt" : "Featured content"}
          </Badge>
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-rose-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {card.description}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {card.additionalInfo}
          </p>
          <Link
            href={`/${locale}/posts/quantum_tuesdays/elementary/${card.endpoint}`}
            className="mt-3 flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>{card.ctaText}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <div className="flex justify-center p-2">
            <Link
              href={`/${locale}/posts/quantum_tuesdays/elementary/${card.endpoint}`}
              className="relative h-48 w-full overflow-hidden rounded-lg"
            >
              <img
                src={card.imageSrc || "/placeholder.svg"}
                alt={card.imageAlt}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm font-medium text-white">
                  {card.imageCaption}
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Difficulty: {card.difficulty}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {card.readTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
