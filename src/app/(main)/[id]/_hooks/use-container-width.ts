import { useEffect, useState } from "react";

export const useContainerWidth = () => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const calculateContainerWidth = () => {
      // Get viewport width
      const viewportWidth = window.innerWidth;

      // Common breakpoints and their max container widths
      const breakpoints = {
        sm: 640, // max-w-sm
        md: 768, // max-w-md
        lg: 1024, // max-w-lg
        xl: 1280, // max-w-xl
        "2xl": 1536, // max-w-2xl
        "3xl": 1920, // max-w-3xl
        "4xl": 2560, // max-w-4xl
        "5xl": 3200, // max-w-5xl
        "6xl": 3840, // max-w-6xl
        "7xl": 4480, // max-w-7xl
      };

      // Find the largest container width that fits within the viewport
      let maxWidth = 0;

      for (const [breakpoint, width] of Object.entries(breakpoints)) {
        if (viewportWidth >= width) {
          maxWidth = width;
        } else {
          break;
        }
      }

      // If viewport is smaller than the smallest breakpoint, use viewport width
      if (maxWidth === 0) {
        maxWidth = viewportWidth;
      }

      // Account for common padding/margins (typically 16px on each side)
      const padding = 32; // 16px * 2
      const finalWidth = Math.max(0, maxWidth - padding);

      setContainerWidth(finalWidth);
    };

    // Calculate initial width
    calculateContainerWidth();

    // Add resize listener
    window.addEventListener("resize", calculateContainerWidth);

    return () => window.removeEventListener("resize", calculateContainerWidth);
  }, []);

  return containerWidth;
};
