"use client";

/**
 * QuantumMap Component
 *
 * Interactive map component with quantum nodes and partner organizations.
 * Features responsive design, hover effects, and smooth animations.
 */

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Atom,
  Cpu,
  FlowArrow,
  Monitor,
  Ruler,
  Warning,
  MagnifyingGlass,
} from "phosphor-react";
import { motion, useInView } from "framer-motion";

type MapView = "quantum" | "partner" | "deutschland" | "garching";

interface Rectangle {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
  isInternal?: boolean;
}

export default function QuantumMap() {
  const params = useParams();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [currentMapView, setCurrentMapView] = useState<MapView>("quantum");
  const [isMobile, setIsMobile] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Check for mobile devices and update responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track container dimensions for proper image scaling
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleLogoClick = () => {
    if (currentMapView === "quantum") {
      setCurrentMapView("partner");
    } else {
      setCurrentMapView("quantum");
    }
  };

  const handleDeutschlandClick = () => {
    setCurrentMapView("deutschland");
  };

  const handleGarchingClick = () => {
    setCurrentMapView("garching");
  };

  // Shared easing curve for consistent animations
  const easing = [0.4, 0, 0.2, 1] as const;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  const nodeVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: i % 2 === 0 ? 32 : -32,
      scale: 0.85,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: i * 0.12 + 0.2,
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  };

  // Quantum nodes data
  const nodes = [
    {
      id: "center",
      label: "Quantum Center",
      icon: Atom,
      x: 45,
      y: 45,
    },
    {
      id: "computing",
      label: "Quantum Computing",
      icon: Cpu,
      x: 40,
      y: 25,
    },
    {
      id: "algorithms",
      label: "Algorithms",
      icon: FlowArrow,
      x: 62,
      y: 24,
    },
    {
      id: "applications",
      label: "Applications",
      icon: Monitor,
      x: 13,
      y: 42,
    },
    {
      id: "current",
      label: "Current state",
      icon: Cpu,
      x: 21,
      y: 68,
    },
    {
      id: "physical",
      label: "Physical realisations",
      icon: Ruler,
      x: 39.5,
      y: 86,
    },
    {
      id: "obstacles",
      label: "Obstacles",
      icon: Warning,
      x: 79,
      y: 83,
    },
    {
      id: "error",
      label: "Error correction",
      icon: MagnifyingGlass,
      x: 70,
      y: 51,
    },
  ];

  // Calculate image positioning for object-contain behavior
  const getImageDimensions = () => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      return { imageWidth: 0, imageHeight: 0, offsetX: 0, offsetY: 0 };
    }

    // Assuming partner_map.svg has an aspect ratio of approximately 3:2 (more accurate for the map)
    const imageAspectRatio = 3 / 2;
    const containerAspectRatio =
      containerDimensions.width / containerDimensions.height;

    let imageWidth, imageHeight, offsetX, offsetY;

    if (containerAspectRatio > imageAspectRatio) {
      // Container is wider than image - image fits by height
      imageHeight = containerDimensions.height;
      imageWidth = imageHeight * imageAspectRatio;
      offsetX = (containerDimensions.width - imageWidth) / 2;
      offsetY = 0;
    } else {
      // Container is taller than image - image fits by width
      imageWidth = containerDimensions.width;
      imageHeight = imageWidth / imageAspectRatio;
      offsetX = 0;
      offsetY = (containerDimensions.height - imageHeight) / 2;
    }

    return { imageWidth, imageHeight, offsetX, offsetY };
  };

  // Partner map rectangles - positioned relative to actual image dimensions
  const getPartnerRectangles = () => {
    const { imageWidth, imageHeight, offsetX, offsetY } = getImageDimensions();

    if (imageWidth === 0 || imageHeight === 0) {
      return [];
    }

    // Base coordinates relative to the actual image (0-100%) - adjusted for better positioning
    const baseRectangles = [
      {
        id: "meetiqm",
        name: "MeetIQM",
        x: 14,
        y: 7,
        width: 13,
        height: 13,
        url: "https://meetiqm.com/",
      },
      {
        id: "munich-quantum-valley",
        name: "Munich Quantum Valley",
        x: 49.5,
        y: 16,
        width: 16,
        height: 14,
        url: "https://www.munich-quantum-valley.de/",
      },
      {
        id: "mcqst",
        name: "Munich Center for Quantum Science & Technology",
        x: 46.5,
        y: 42,
        width: 14,
        height: 14,
        url: "https://www.mcqst.de/",
      },
      {
        id: "wiqi-team",
        name: "WiQi-Team",
        x: 43,
        y: 63,
        width: 9,
        height: 16,
        url: "/about",
        isInternal: true,
      },
      {
        id: "deutsches-museum",
        name: "Deutsches Museum",
        x: 43,
        y: 82,
        width: 28,
        height: 13,
        url: "https://www.deutsches-museum.de/",
      },
      {
        id: "dlr-garching",
        name: "DLR Garching Forschungszentrum",
        x: 76,
        y: 2,
        width: 24,
        height: 23,
        url: "https://www.dlr.de/",
      },
      {
        id: "deutschland",
        name: "Deutschlandkarte",
        x: 1,
        y: 66,
        width: 13,
        height: 29,
        url: "https://www.example.de/",
      },
    ];

    // Convert image-relative coordinates to container-relative coordinates
    return baseRectangles.map((rect) => {
      const actualX = offsetX + (rect.x / 100) * imageWidth;
      const actualY = offsetY + (rect.y / 100) * imageHeight;
      const actualWidth = (rect.width / 100) * imageWidth;
      const actualHeight = (rect.height / 100) * imageHeight;

      // Convert to percentages relative to container
      const containerX = (actualX / containerDimensions.width) * 100;
      const containerY = (actualY / containerDimensions.height) * 100;
      const containerWidth = (actualWidth / containerDimensions.width) * 100;
      const containerHeight = (actualHeight / containerDimensions.height) * 100;

      return {
        ...rect,
        x: Math.max(0, Math.min(containerX, 95)), // Ensure rectangles stay within bounds
        y: Math.max(0, Math.min(containerY, 95)),
        width: Math.max(containerWidth, isMobile ? 10 : 6), // Larger minimum size for better touch targets
        height: Math.max(containerHeight, isMobile ? 8 : 5),
      };
    });
  };

  const partnerRectangles = getPartnerRectangles();

  // Deutschland map rectangles - positioned relative to actual image dimensions
  const getDeutschlandRectangles = () => {
    const { imageWidth, imageHeight, offsetX, offsetY } = getImageDimensions();

    if (imageWidth === 0 || imageHeight === 0) {
      return [];
    }

    // Base coordinates relative to the Deutschland map image (0-100%)
    const baseRectangles = [
      {
        id: "bmbf",
        name: "BMBF - Bundesministerium für Bildung und Forschung",
        x: 60,
        y: 35.5,
        width: 4,
        height: 7,
        url: "https://www.bmbf.de/DE/Home/home_node.html",
      },
      {
        id: "technoseum",
        name: "TECHNOSEUM",
        x: 36.5,
        y: 62.5,
        width: 1,
        height: 4,
        url: "https://www.technoseum.de/",
      },
      {
        id: "fraunhofer",
        name: "Fraunhofer-Gesellschaft",
        x: 36.5,
        y: 68.5,
        width: 1,
        height: 4,
        url: "https://www.fraunhofer.de/",
      },
    ];

    // Convert image-relative coordinates to container-relative coordinates
    return baseRectangles.map((rect) => {
      const actualX = offsetX + (rect.x / 100) * imageWidth;
      const actualY = offsetY + (rect.y / 100) * imageHeight;
      const actualWidth = (rect.width / 100) * imageWidth;
      const actualHeight = (rect.height / 100) * imageHeight;

      // Convert to percentages relative to container
      const containerX = (actualX / containerDimensions.width) * 100;
      const containerY = (actualY / containerDimensions.height) * 100;
      const containerWidth = (actualWidth / containerDimensions.width) * 100;
      const containerHeight = (actualHeight / containerDimensions.height) * 100;

      return {
        ...rect,
        x: Math.max(0, Math.min(containerX, 95)), // Ensure rectangles stay within bounds
        y: Math.max(0, Math.min(containerY, 95)),
        width: Math.max(containerWidth, isMobile ? 10 : 6), // Larger minimum size for better touch targets
        height: Math.max(containerHeight, isMobile ? 8 : 5),
      };
    });
  };

  // Garching map rectangles - positioned relative to actual image dimensions
  const getGarchingRectangles = () => {
    const { imageWidth, imageHeight, offsetX, offsetY } = getImageDimensions();

    if (imageWidth === 0 || imageHeight === 0) {
      return [];
    }

    // Base coordinates relative to the Garching map image (0-100%)
    const baseRectangles = [
      {
        id: "mpq",
        name: "Max-Planck-Institut für Quantenoptik",
        x: 33.5,
        y: 54,
        width: 28,
        height: 14,
        url: "https://www.mpq.mpg.de/",
      },
      {
        id: "photonlab",
        name: "Photonlab",
        x: 38.25,
        y: 69,
        width: 19,
        height: 27,
        url: "https://www.mpg.de/",
      },
    ];

    // Convert image-relative coordinates to container-relative coordinates
    return baseRectangles.map((rect) => {
      const actualX = offsetX + (rect.x / 100) * imageWidth;
      const actualY = offsetY + (rect.y / 100) * imageHeight;
      const actualWidth = (rect.width / 100) * imageWidth;
      const actualHeight = (rect.height / 100) * imageHeight;

      // Convert to percentages relative to container
      const containerX = (actualX / containerDimensions.width) * 100;
      const containerY = (actualY / containerDimensions.height) * 100;
      const containerWidth = (actualWidth / containerDimensions.width) * 100;
      const containerHeight = (actualHeight / containerDimensions.height) * 100;

      return {
        ...rect,
        x: Math.max(0, Math.min(containerX, 95)), // Ensure rectangles stay within bounds
        y: Math.max(0, Math.min(containerY, 95)),
        width: Math.max(containerWidth, isMobile ? 10 : 6), // Larger minimum size for better touch targets
        height: Math.max(containerHeight, isMobile ? 8 : 5),
      };
    });
  };

  // Unified transparent styling for all rectangles
  const getRectangleStyles = () => ({
    border: "border-transparent",
    bg: "bg-transparent",
    hoverBorder: "hover:border-white/20",
    hoverBg: "hover:bg-white/5",
  });

  return (
    <motion.div
      ref={ref}
      className={`relative h-full w-full overflow-hidden rounded-xl border shadow-xl dark:border-gray-800 ${isMobile ? "block" : "hidden md:block"} `}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        // Ensure the map maintains a consistent aspect ratio for responsive positioning
        aspectRatio: isMobile ? "2/3" : "3/2", // Match the image aspect ratio better
        minHeight: isMobile ? "350px" : "450px",
        maxHeight: isMobile ? "600px" : "none",
      }}
    >
      {/* Map Background with Layered Switching */}
      <div className="absolute inset-0">
        {/* Munich Map - Always visible as background to fill gaps */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(0px)", scale: 1 }}
          animate={{
            opacity: isInView ? 1 : 0,
            filter: currentMapView !== "quantum" ? "blur(4px)" : "blur(0px)",
            scale: currentMapView !== "quantum" ? 1.02 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            filter: {
              duration: 0.6,
              ease: easing,
              delay: currentMapView !== "quantum" ? 0 : 0.2,
            },
            scale: { duration: 0.8, ease: easing },
          }}
        >
          <Image
            src="/image_1.png"
            alt="Munich Map"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Partner Map - Overlays on top when active */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{
            opacity: isInView && currentMapView === "partner" ? 1 : 0,
            scale: isInView && currentMapView === "partner" ? 1 : 0.95,
            y: isInView && currentMapView === "partner" ? 0 : 10,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            opacity: {
              duration: 0.6,
              ease: easing,
              delay: currentMapView === "partner" ? 0.2 : 0,
            },
            scale: { duration: 0.8, ease: easing },
            y: { duration: 0.8, ease: easing },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/partner_map.svg"
              alt="Partner Map"
              fill
              className="object-contain"
            />

            {/* Inset blur overlay */}
            <div
              className="pointer-events-none absolute inset-0 backdrop-blur-sm"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
              }}
            />
            {/* Partner Map Rectangles - Responsive clickable areas with improved hover effects */}
            {partnerRectangles.map((rect, index) => {
              const colors = getRectangleStyles();
              return (
                <motion.div
                  key={rect.id}
                  className="group absolute z-10"
                  style={{
                    left: `${rect.x}%`,
                    top: `${rect.y}%`,
                    width: `${rect.width}%`,
                    height: `${rect.height}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: easing,
                    delay: index * 0.1 + 0.3,
                  }}
                  whileHover={{ scale: 1.05, z: 20 }}
                >
                  {rect.id === "deutschland" ? (
                    <div
                      onClick={handleDeutschlandClick}
                      className={`relative block h-full w-full cursor-pointer rounded-lg border-2 ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10`}
                      title={`View ${rect.name}`}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
                        {rect.name}
                        {/* Arrow pointing down */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90 dark:border-t-white/90" />
                      </div>

                      {/* Subtle gradient overlay for better visual feedback */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ) : rect.id === "dlr-garching" ? (
                    <div
                      onClick={handleGarchingClick}
                      className={`relative block h-full w-full cursor-pointer rounded-lg border-2 ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10`}
                      title={`View ${rect.name}`}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
                        {rect.name}
                        {/* Arrow pointing down */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90 dark:border-t-white/90" />
                      </div>

                      {/* Subtle gradient overlay for better visual feedback */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ) : (
                    <Link
                      href={
                        rect.isInternal
                          ? `/${params.locale}${rect.url}`
                          : rect.url
                      }
                      target={rect.isInternal ? "_self" : "_blank"}
                      rel={rect.isInternal ? undefined : "noopener noreferrer"}
                      className={`relative block h-full w-full cursor-pointer rounded-lg border-2 ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10`}
                      title={
                        rect.isInternal
                          ? `Go to ${rect.name}`
                          : `Visit ${rect.name}`
                      }
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
                        {rect.name}
                        {/* Arrow pointing down */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90 dark:border-t-white/90" />
                      </div>

                      {/* Subtle gradient overlay for better visual feedback */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Deutschland Map - Overlays on top when active */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{
            opacity: isInView && currentMapView === "deutschland" ? 1 : 0,
            scale: isInView && currentMapView === "deutschland" ? 1 : 0.95,
            y: isInView && currentMapView === "deutschland" ? 0 : 10,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            opacity: {
              duration: 0.6,
              ease: easing,
              delay: currentMapView === "deutschland" ? 0.2 : 0,
            },
            scale: { duration: 0.8, ease: easing },
            y: { duration: 0.8, ease: easing },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/deutschland_karte.svg"
              alt="Deutschland Map"
              fill
              className="object-contain"
            />
            {/* Inset blur overlay */}
            <div
              className="pointer-events-none absolute inset-0 backdrop-blur-sm"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
              }}
            />
            {/* Deutschland Map Rectangles - Responsive clickable areas */}
            {getDeutschlandRectangles().map((rect, index) => {
              const colors = getRectangleStyles();
              return (
                <motion.div
                  key={rect.id}
                  className="group absolute z-10"
                  style={{
                    left: `${rect.x}%`,
                    top: `${rect.y}%`,
                    width: `${rect.width}%`,
                    height: `${rect.height}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: easing,
                    delay: index * 0.1 + 0.3,
                  }}
                  whileHover={{ scale: 1.05, z: 20 }}
                >
                  <Link
                    href={rect.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block h-full w-full cursor-pointer rounded-lg border-2 ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10`}
                    title={`Visit ${rect.name}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
                      {rect.name}
                      {/* Arrow pointing down */}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90 dark:border-t-white/90" />
                    </div>

                    {/* Subtle gradient overlay for better visual feedback */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Garching Map - Overlays on top when active */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{
            opacity: isInView && currentMapView === "garching" ? 1 : 0,
            scale: isInView && currentMapView === "garching" ? 1 : 0.95,
            y: isInView && currentMapView === "garching" ? 0 : 10,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            opacity: {
              duration: 0.6,
              ease: easing,
              delay: currentMapView === "garching" ? 0.2 : 0,
            },
            scale: { duration: 0.8, ease: easing },
            y: { duration: 0.8, ease: easing },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/garching_karte.svg"
              alt="Garching Map"
              fill
              className="object-contain"
            />
            {/* Inset blur overlay */}
            <div
              className="pointer-events-none absolute inset-0 backdrop-blur-sm"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
              }}
            />
            {/* Garching Map Rectangles - Responsive clickable areas */}
            {getGarchingRectangles().map((rect, index) => {
              const colors = getRectangleStyles();
              return (
                <motion.div
                  key={rect.id}
                  className="group absolute z-10"
                  style={{
                    left: `${rect.x}%`,
                    top: `${rect.y}%`,
                    width: `${rect.width}%`,
                    height: `${rect.height}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: easing,
                    delay: index * 0.1 + 0.3,
                  }}
                  whileHover={{ scale: 1.05, z: 20 }}
                >
                  <Link
                    href={rect.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block h-full w-full cursor-pointer rounded-lg border-2 ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10`}
                    title={`Visit ${rect.name}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-white/90 dark:text-black">
                      {rect.name}
                      {/* Arrow pointing down */}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90 dark:border-t-white/90" />
                    </div>

                    {/* Subtle gradient overlay for better visual feedback */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Map Switch Button - Top Left Corner */}
      <motion.button
        onClick={handleLogoClick}
        className="group absolute left-2 top-2 z-20 transition-transform duration-300 hover:scale-110 md:left-4 md:top-4"
        variants={buttonVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Image
            src="/wiqi_icon_button_for_map.svg"
            alt="Switch Map View"
            width={isMobile ? 48 : 64}
            height={isMobile ? 48 : 64}
            className="drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
          />
          {/* Tooltip */}
          <div
            className={`absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 ${isMobile ? "text-xs" : "text-sm"} `}
          >
            {currentMapView === "partner"
              ? "Switch to Quantum Map"
              : currentMapView === "deutschland"
                ? "Switch to Quantum Map"
                : currentMapView === "garching"
                  ? "Switch to Quantum Map"
                  : "Switch to Partner Map"}
            {/* Arrow pointing to the button */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black/80" />
          </div>
        </div>
      </motion.button>

      {/* Quantum Nodes - Hidden when partner map is active */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView && currentMapView === "quantum" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              zIndex: node.id === hoveredNode ? 10 : 1,
            }}
            variants={nodeVariants}
            custom={index}
            initial="hidden"
            animate={
              isInView && currentMapView === "quantum" ? "visible" : "hidden"
            }
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`flex items-center justify-center rounded-full border-2 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${
                node.id === "center"
                  ? "h-24 w-24 border-white bg-black/80 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] lg:h-36 lg:w-36"
                  : "h-10 w-10 border-gray-800 bg-white/80 shadow-lg lg:h-16 lg:w-16"
              } dark:!border-white dark:!bg-black/80 dark:!text-white`}
            >
              <node.icon
                size={node.id === "center" ? 64 : 32}
                weight="regular"
                className="transition-colors duration-300"
              />
            </div>
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-3 py-1.5 text-[0.6rem] font-medium text-white shadow-md transition-all duration-300 group-hover:scale-110 lg:text-sm">
              {node.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Map overlay for better readability */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </motion.div>
  );
}
