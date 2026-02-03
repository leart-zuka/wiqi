"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackgroundLight = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  blur = 5,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkModeRef = useRef(false);

  // Check initial dark mode and listen for changes
  useEffect(() => {
    // Initial check
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
    isDarkModeRef.current = isDark;

    // Listen for theme changes via localStorage
    const handleStorageChange = () => {
      const storedTheme = window.localStorage.getItem("theme");
      const newIsDark = storedTheme === "dark";
      setIsDarkMode(newIsDark);
      isDarkModeRef.current = newIsDark;
    };

    // Listen for class changes on document.documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const newIsDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(newIsDark);
          isDarkModeRef.current = newIsDark;
        }
      });
    });

    window.addEventListener("storage", handleStorageChange);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // Safari support
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  useEffect(() => {
    let w: number,
      h: number,
      nt: number,
      i: number,
      x: number,
      ctx: any,
      canvas: any;
    let animationId: number;

    const getSpeed = () => {
      switch (speed) {
        case "slow":
          return 0.001;
        case "fast":
          return 0.002;
        default:
          return 0.001;
      }
    };

    const init = () => {
      if (!canvasRef.current) return;
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
      nt = 0;

      const handleResize = () => {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
      };

      window.addEventListener("resize", handleResize);
      render();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    // Define color schemes for light and dark modes
    const darkModeColors = colors ?? [
      "#354FCC",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];

    const lightModeColors = [
      "#354FCC", // lighter blue
      "#850379", // lighter indigo
      "#CC3766", // lighter purple
      "#06b6d4", // lighter cyan
    ];

    const drawWave = (n: number) => {
      nt += getSpeed();
      const isDark = isDarkModeRef.current;
      const currentColors = isDark ? darkModeColors : lightModeColors;

      for (i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = currentColors[i % currentColors.length];
        for (x = 0; x < w; x += 5) {
          var y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      if (!ctx) return;
      const isDark = isDarkModeRef.current;

      // Clear the canvas
      ctx.fillStyle = isDark ? "black" : "white";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);

      // Draw the waves
      drawWave(4);

      // Continue the animation
      animationId = requestAnimationFrame(render);
    };

    const cleanupResize = init();

    return () => {
      if (cleanupResize) cleanupResize();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [blur, colors, speed, waveOpacity, waveWidth]); // Removed isDarkMode dep, using Ref

  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
