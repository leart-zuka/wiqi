import { useState, useEffect } from "react";

/**
 * useResizeObserverHeight:
 *  - Observes an element specified by a selector.
 *  - Returns the current height (in px) of that element.
 */
function useResizeObserverHeight(selector: string): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Grab the element we want to observe
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;

    // Function that updates our state with the element's current height
    const updateHeight = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height);
    };

    // Initialize a ResizeObserver to watch for size changes
    const ro = new ResizeObserver(() => {
      updateHeight();
    });

    // Start observing
    ro.observe(el);

    // Set initial height
    updateHeight();

    // Cleanup
    return () => {
      ro.disconnect();
    };
  }, [selector]);

  return height;
}

export default useResizeObserverHeight;
