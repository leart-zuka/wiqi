"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface RandomPost {
  slug: string;
  locale: string;
  difficulty: string;
  folder: string;
  metadata: {
    title: string;
    subtitle: string;
    author: string;
    date: string;
  };
}

export default function NotFound() {
  const [randomPost, setRandomPost] = useState<RandomPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; vx: number; vy: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);

    fetch("/api/getRandomPost")
      .then((res) => res.json())
      .then((data) => {
        if (data.post) {
          setRandomPost(data.post);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx:
            particle.x <= 0 || particle.x >= window.innerWidth
              ? -particle.vx
              : particle.vx,
          vy:
            particle.y <= 0 || particle.y >= window.innerHeight
              ? -particle.vy
              : particle.vy,
        })),
      );
    };

    let animationFrameId: number;
    const animationLoop = () => {
      animate();
      animationFrameId = requestAnimationFrame(animationLoop);
    };
    animationFrameId = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 text-center dark:from-gray-900 dark:to-blue-900">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"
          style={{
            left: particle.x,
            top: particle.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="relative z-10 max-w-xl">
        <div className="mb-12">
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-8xl font-bold text-transparent">
            404
          </h1>
          <div className="mt-2 font-mono text-sm text-blue-600 dark:text-blue-400">
            QUANTUM_STATE_NOT_FOUND
          </div>
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Quantum superposition error
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The quantum state you&apos;re looking for has collapsed into
            uncertainty. But in quantum mechanics, every observation creates new
            possibilities.
          </p>
        </div>

        <div className="space-y-6">
          {randomPost && (
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:border-blue-700 dark:from-gray-800 dark:to-blue-900">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Quantum suggestion
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                While you&apos;re here, explore this quantum topic:
              </p>
              <Link
                href={`/${randomPost.locale}/posts/${randomPost.folder}/${randomPost.difficulty}/${randomPost.slug}`}
                className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                {randomPost.metadata.title}
              </Link>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {randomPost.metadata.subtitle}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:border-blue-700 dark:from-gray-800 dark:to-blue-900">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-pink-500 to-blue-500"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Loading quantum suggestions...
                </span>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Return to quantum base
          </Link>
        </div>
      </div>

      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full border border-blue-300 opacity-30 dark:border-blue-600"></div>
      <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full border border-purple-300 opacity-30 dark:border-purple-600"></div>
      <div className="absolute bottom-1/3 left-1/3 h-16 w-16 rounded-full border border-pink-300 opacity-20 dark:border-pink-600"></div>
    </div>
  );
}
