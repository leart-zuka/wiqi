import { useState, useEffect, useCallback, useRef } from "react";

interface UseScrollProgressOptions {
  /**
   * Throttle delay in milliseconds for scroll events
   * @default 16 (~60fps)
   */
  throttleMs?: number;
  /**
   * Element to track scroll progress for
   * @default window
   */
  element?: HTMLElement | null;
  /**
   * Whether to calculate progress based on content area only (excluding viewport)
   * @default false
   */
  contentOnly?: boolean;
}

/**
 * Custom hook for tracking scroll progress with performance optimizations
 *
 * @param options Configuration options for scroll tracking
 * @returns Object containing scroll progress percentage (0-100) and scroll position
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const {
    throttleMs = 16, // ~60fps
    element = null,
    contentOnly = false,
  } = options;

  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const lastCallTime = useRef(0);
  const rafId = useRef<number>();

  const calculateProgress = useCallback(() => {
    const target = element || window;
    const isWindow = target === window;

    let scrollTop: number;
    let scrollHeight: number;
    let clientHeight: number;

    if (isWindow) {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    } else {
      const el = target as HTMLElement;
      scrollTop = el.scrollTop;
      scrollHeight = el.scrollHeight;
      clientHeight = el.clientHeight;
    }

    setScrollY(scrollTop);

    // Calculate progress based on content only or including viewport
    let progressPercentage: number;

    if (contentOnly) {
      // Progress based on scrollable content only
      const maxScroll = scrollHeight - clientHeight;
      progressPercentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    } else {
      // Progress based on total document height (current implementation)
      const scrolled = scrollTop + clientHeight;
      progressPercentage = (scrolled / scrollHeight) * 100;
    }

    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progressPercentage));
    setProgress(clampedProgress);
  }, [element, contentOnly]);

  const throttledCalculateProgress = useCallback(() => {
    const now = Date.now();

    if (now - lastCallTime.current >= throttleMs) {
      lastCallTime.current = now;
      calculateProgress();
    } else {
      // Use requestAnimationFrame for smooth updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        if (Date.now() - lastCallTime.current >= throttleMs) {
          calculateProgress();
        }
      });
    }
  }, [calculateProgress, throttleMs]);

  useEffect(() => {
    const target = element || window;

    // Initial calculation
    calculateProgress();

    // Add event listeners with passive option for better performance
    const options: AddEventListenerOptions = { passive: true };

    if (target === window) {
      window.addEventListener("scroll", throttledCalculateProgress, options);
      window.addEventListener("resize", throttledCalculateProgress, options);
    } else {
      const el = target as HTMLElement;
      el.addEventListener("scroll", throttledCalculateProgress, options);
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      if (target === window) {
        window.removeEventListener("scroll", throttledCalculateProgress);
        window.removeEventListener("resize", throttledCalculateProgress);
      } else {
        const el = target as HTMLElement;
        el.removeEventListener("scroll", throttledCalculateProgress);
      }
    };
  }, [element, throttledCalculateProgress, calculateProgress]);

  return {
    /**
     * Scroll progress as a percentage (0-100)
     */
    progress,
    /**
     * Current scroll position in pixels
     */
    scrollY,
    /**
     * Whether the user has scrolled past the initial viewport
     */
    hasScrolled: scrollY > 0,
    /**
     * Whether the user has reached the bottom of the content
     */
    isAtBottom: progress >= 99.5, // Small threshold for floating point precision
  };
}
