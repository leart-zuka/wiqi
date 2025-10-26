'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

interface ScrollProgressBarProps {
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Height of the progress bar
   * @default 'h-1'
   */
  height?: string;
  /**
   * Background color classes for the track
   * @default 'bg-slate-200 dark:bg-slate-800'
   */
  trackColor?: string;
  /**
   * Background color classes for the progress bar
   * @default 'bg-gradient-to-r from-blue-600 to-purple-600'
   */
  progressColor?: string;
  /**
   * Position of the progress bar
   * @default 'fixed'
   */
  position?: 'fixed' | 'sticky' | 'absolute' | 'relative';
  /**
   * Whether to show the progress bar on mobile devices
   * @default false
   */
  showOnMobile?: boolean;
  /**
   * Whether to calculate progress based on content only (more accurate for reading)
   * @default true
   */
  contentOnly?: boolean;
  /**
   * Throttle delay for scroll events in milliseconds
   * @default 16
   */
  throttleMs?: number;
  /**
   * Minimum progress percentage to show the bar (prevents flickering)
   * @default 0
   */
  minProgress?: number;
  /**
   * Animation duration for progress changes
   * @default 'duration-150'
   */
  animationDuration?: string;
  /**
   * Z-index value
   * @default 'z-50'
   */
  zIndex?: string;
  /**
   * Label for screen readers
   * @default 'Reading progress'
   */
  ariaLabel?: string;
  /**
   * Whether to show percentage text (for debugging or accessibility)
   * @default false
   */
  showPercentage?: boolean;
}

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         Modern Scroll Progress Bar                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

/**
 * A modern, accessible scroll progress bar component with performance optimizations
 * 
 * Features:
 * - Smooth animations with CSS transitions
 * - Throttled scroll events for better performance
 * - Accessible with proper ARIA attributes
 * - Customizable appearance and behavior
 * - Mobile responsive with optional mobile display
 * - Content-based progress calculation for accurate reading progress
 */
export function ScrollProgressBar({
  className,
  height = 'h-1',
  trackColor = 'bg-slate-200 dark:bg-slate-800',
  progressColor = 'bg-gradient-to-r from-blue-600 to-purple-600',
  position = 'fixed',
  showOnMobile = false,
  contentOnly = true,
  throttleMs = 16,
  minProgress = 0,
  animationDuration = 'duration-150',
  zIndex = 'z-50',
  ariaLabel = 'Reading progress',
  showPercentage = false
}: ScrollProgressBarProps) {
  const { progress, hasScrolled } = useScrollProgress({
    throttleMs,
    contentOnly
  });

  // Don't render if progress is below minimum threshold
  const shouldShow = progress >= minProgress && hasScrolled;
  const displayProgress = Math.max(0, progress);

  // Position classes mapping
  const positionClasses = {
    fixed: 'fixed top-0 left-0 right-0',
    sticky: 'sticky top-0',
    absolute: 'absolute top-0 left-0 right-0',
    relative: 'relative'
  };

  // Mobile visibility classes
  const mobileClasses = showOnMobile ? 'block' : 'hidden md:block';

  return (
    <div
      className={cn(
        // Base styles
        height,
        trackColor,
        positionClasses[position],
        zIndex,
        mobileClasses,
        // Smooth opacity transition
        'transition-opacity duration-300',
        shouldShow ? 'opacity-100' : 'opacity-0',
        className
      )}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={Math.round(displayProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(displayProgress)}% complete`}
    >
      {/* Progress fill */}
      <div
        className={cn(
          'h-full',
          progressColor,
          'transition-all',
          animationDuration,
          'ease-out'
        )}
        style={{ 
          width: `${displayProgress}%`,
          // Ensure smooth transitions with transform for better performance
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      />
      
      {/* Optional percentage display for debugging/accessibility */}
      {showPercentage && (
        <div className="absolute right-2 top-full mt-1 text-xs text-slate-600 dark:text-slate-400">
          {Math.round(displayProgress)}%
        </div>
      )}
    </div>
  );
}

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                           Usage Examples                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

/**
 * Basic usage:
 * <ScrollProgressBar />
 * 
 * Custom styling:
 * <ScrollProgressBar
 *   height="h-2"
 *   progressColor="bg-green-500"
 *   trackColor="bg-gray-100"
 *   showOnMobile={true}
 * />
 * 
 * Reading progress (content-based):
 * <ScrollProgressBar
 *   contentOnly={true}
 *   minProgress={5}
 *   ariaLabel="Article reading progress"
 * />
 * 
 * Performance optimized:
 * <ScrollProgressBar
 *   throttleMs={32}
 *   animationDuration="duration-300"
 * />
 */
