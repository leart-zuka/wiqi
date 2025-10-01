"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  pulsePhase: number;
}

const QUANTUM_EQUATIONS = [
  "ψ(x,t) = Ae^(i(kx-ωt))",
  "H|ψ⟩ = E|ψ⟩",
  "[X,P] = iℏ",
  "⟨0|1⟩ = 0",
  "U†U = I",
  "|+⟩ = (|0⟩+|1⟩)/√2",
];

const PARTICLE_COLORS = [
  "from-blue-400 to-cyan-300",
  "from-purple-400 to-pink-300",
  "from-indigo-400 to-blue-300",
  "from-violet-400 to-purple-300",
  "from-cyan-400 to-teal-300",
  "from-emerald-400 to-green-300",
  "from-pink-400 to-rose-300",
];

export default function NotFound() {
  const [randomPost, setRandomPost] = useState<RandomPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [waveOffset, setWaveOffset] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothMousePos = useRef({ x: 0, y: 0 });

  // Initialize particles and fetch random post
  useEffect(() => {
    const initializeParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 4 + 2,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.8 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
      setParticles(newParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const fetchRandomPost = async () => {
      try {
        const res = await fetch("/api/getRandomPost");
        const data = await res.json();
        if (data.post) {
          setRandomPost(data.post);
        }
      } catch (error) {
        console.error("Failed to fetch random post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeParticles();
    window.addEventListener("mousemove", handleMouseMove);
    fetchRandomPost();

    const animate = () => {
      setWaveOffset((prev) => prev + 0.02);

      // Smooth mouse position interpolation
      const lerp = 0.1;
      smoothMousePos.current.x +=
        (mousePos.current.x - smoothMousePos.current.x) * lerp;
      smoothMousePos.current.y +=
        (mousePos.current.y - smoothMousePos.current.y) * lerp;

      setParticles((prev) =>
        prev.map((particle) => {
          const newX = particle.x + particle.vx;
          const newY = particle.y + particle.vy;

          return {
            ...particle,
            x: newX,
            y: newY,
            vx:
              newX <= 0 || newX >= window.innerWidth
                ? -particle.vx
                : particle.vx,
            vy:
              newY <= 0 || newY >= window.innerHeight
                ? -particle.vy
                : particle.vy,
            pulsePhase: particle.pulsePhase + 0.05,
            opacity: 0.3 + Math.sin(particle.pulsePhase) * 0.4,
          };
        }),
      );
    };

    const interval = setInterval(animate, 16);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Canvas particle connections and waves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw quantum wave patterns
      const drawWave = (
        yOffset: number,
        color: string,
        frequency1: number,
        frequency2: number,
        amplitude1: number,
        amplitude2: number,
      ) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            yOffset +
            Math.sin(x * frequency1 + waveOffset) * amplitude1 +
            Math.sin(x * frequency2 + waveOffset * 1.5) * amplitude2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawWave(
        canvas.height / 2,
        "rgba(59, 130, 246, 0.2)",
        0.01,
        0.005,
        50,
        30,
      );
      drawWave(
        canvas.height / 3,
        "rgba(168, 85, 247, 0.15)",
        0.008,
        0.012,
        40,
        25,
      );

      animationRef.current = requestAnimationFrame(drawConnections);
    };

    drawConnections();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, waveOffset]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 text-center">
      {/* Canvas for particle connections and waves */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-tl from-cyan-500/10 via-transparent to-violet-500/10"></div>

      {/* Complex quantum grid patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            linear-gradient(45deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
          }}
        ></div>
      </div>

      {/* Quantum circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(59, 130, 246, 0.3) 21px, rgba(59, 130, 246, 0.3) 22px),
            repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(168, 85, 247, 0.3) 21px, rgba(168, 85, 247, 0.3) 22px)
          `,
          }}
        ></div>
      </div>

      {/* Enhanced particles with more varieties */}
      {particles.map((particle, i) => (
        <div key={i}>
          <div
            className={`absolute rounded-full bg-gradient-to-r ${particle.color} animate-pulse`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              transform: "translate(-50%, -50%)",
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px rgba(139, 92, 246, 0.4)`,
            }}
          />
          {/* Particle glow effect */}
          <div
            className="absolute animate-ping rounded-full bg-white/10"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size * 2,
              height: particle.size * 2,
              transform: "translate(-50%, -50%)",
              opacity: particle.opacity * 0.3,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        </div>
      ))}

      {/* Floating quantum equations */}
      {QUANTUM_EQUATIONS.map((equation, i) => (
        <div
          key={i}
          className="absolute animate-float-equation font-mono text-xs text-blue-300/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + i * 10}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + i}s`,
          }}
        >
          {equation}
        </div>
      ))}

      {/* Multiple quantum orbs with different effects */}
      <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-spin-slow rounded-full border border-blue-400/30">
        <div className="absolute inset-4 animate-spin-slow-reverse rounded-full border border-cyan-400/20"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 h-24 w-24 animate-spin-slow-reverse rounded-full border border-purple-400/30">
        <div className="absolute inset-2 animate-spin-slow rounded-full border border-pink-400/20"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 h-16 w-16 animate-bounce-slow rounded-full border border-pink-400/30"></div>
      <div className="absolute right-1/3 top-1/3 h-20 w-20 animate-pulse-slow rounded-full border border-emerald-400/30"></div>

      {/* Central quantum vortex effect */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-cyan-500/10 blur-3xl"></div>
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-blue-500/15 blur-2xl"></div>

      {/* Mouse-following quantum field */}
      <div
        className="pointer-events-none absolute h-32 w-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"
        style={{
          left: smoothMousePos.current.x - 64,
          top: smoothMousePos.current.y - 64,
        }}
      />

      <div className="relative z-10 max-w-xl">
        <div className="mb-12">
          <h1 className="relative animate-pulse bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-8xl font-bold text-transparent">
            404
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-8xl font-bold text-transparent opacity-50 blur-sm"></div>
          </h1>
          <div className="mt-2 animate-pulse font-mono text-sm text-blue-300">
            QUANTUM_STATE_NOT_FOUND
          </div>
          <div className="mt-1 font-mono text-xs text-purple-400/60">
            |ψ⟩ = α|found⟩ + β|not_found⟩
          </div>
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Quantum superposition error
          </h2>
          <p className="text-gray-300">
            The quantum state you&apos;re looking for has collapsed into
            uncertainty. But in quantum mechanics, every observation creates new
            possibilities.
          </p>
        </div>

        <div className="space-y-6">
          {randomPost && (
            <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-slate-800/80 to-purple-900/80 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
              <div className="mb-4 flex items-center justify-center">
                <div className="relative animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  <svg
                    className="relative z-10 h-5 w-5 text-white"
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
                  <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30"></div>
                </div>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-white">
                Quantum suggestion
              </h3>
              <p className="mb-4 text-sm text-gray-300">
                While you&apos;re here, explore this quantum topic:
              </p>
              <Link
                href={`/${randomPost.locale}/posts/${randomPost.folder}/${randomPost.difficulty}/${randomPost.slug}`}
                className="group relative inline-block overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10">
                  {randomPost.metadata.title}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <p className="mt-3 text-xs text-gray-400">
                {randomPost.metadata.subtitle}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-slate-800/80 to-purple-900/80 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-pink-400 to-blue-400"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-sm text-gray-300">
                  Loading quantum suggestions...
                </span>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="group relative inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span className="relative z-10">Return to quantum base</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
