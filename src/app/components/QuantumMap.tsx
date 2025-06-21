"use client";

// ===============================================
// =                   TODO                      =
// ===============================================
//
// ISSUE: Map scaling breaks icon positioning
//
// PROBLEM:
// - Icons are positioned using percentage-based coordinates (x%, y%)
// - When screen size changes, the map container resizes
// - But the background image aspect ratio doesn't match container
// - This causes icons to drift from their intended map locations
// - Icons should stay on specific map landmarks regardless of screen size
//
// NEEDED SOLUTION:
// - Implement responsive scaling that maintains aspect ratio
// - Ensure icons remain anchored to their map positions
// - Consider using CSS aspect-ratio or responsive image techniques
// - May need to recalculate icon positions based on actual image dimensions
//
// @Leart Zuka
//
// ===============================================

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function QuantumMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isPartnerMap, setIsPartnerMap] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleLogoClick = () => {
    setIsPartnerMap(!isPartnerMap);
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

  // TODO: Fix responsiveness of partner rectangles
  // - Make rectangles transparent with proper opacity
  // - Add responsive positioning for different screen sizes
  // - Ensure rectangles scale properly on mobile devices
  // - Add hover effects for better user interaction

  // TODO: Add missing partner organizations
  // - Add Garching Forschungszentrum (German Aerospace Center - DLR)
  // - Add Deutschland Map button/link
  // - Update partnerRectangles array with new entries
  // - Ensure proper positioning and sizing for new partners

  // TODO: Implement responsive design improvements
  // - Use CSS Grid or Flexbox for better layout control
  // - Add media queries for different breakpoints
  // - Ensure partner rectangles don't overlap on smaller screens
  // - Add smooth transitions for responsive changes

  // Partner map rectangles - easily customizable positions, sizes, and URLs
  const partnerRectangles = [
    {
      id: "meetiqm",
      x: 340,
      y: 27,
      width: 180,
      height: 140,
      url: "https://meetiqm.com/",
    },
    {
      id: "munich-quantum-valley",
      x: 730,
      y: 110,
      width: 200,
      height: 120,
      url: "https://www.munich-quantum-valley.de/",
    },
    {
      id: "mcqst",
      x: 700,
      y: 285,
      width: 180,
      height: 135,
      url: "https://www.mcqst.de/",
    },
    {
      id: "deutsches-museum",
      x: 660,
      y: 568,
      width: 320,
      height: 100,
      url: "https://www.deutsches-museum.de/",
    },
    {
      id: "partner5",
      x: 1000,
      y: 10,
      width: 320,
      height: 180,
      url: "https://example.com/partner5",
    },
    {
      id: "partner6",
      x: 180,
      y: 450,
      width: 240,
      height: 250,
      url: "https://example.com/partner6",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="relative hidden h-full w-full overflow-hidden rounded-xl border shadow-xl dark:border-gray-800 md:block"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Map Background with Layered Switching */}
      <div className="absolute inset-0">
        {/* Munich Map - Always visible as background to fill gaps */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(0px)", scale: 1 }}
          animate={{
            opacity: isInView ? 1 : 0,
            filter: isPartnerMap ? "blur(4px)" : "blur(0px)",
            scale: isPartnerMap ? 1.02 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            filter: {
              duration: 0.6,
              ease: easing,
              delay: isPartnerMap ? 0 : 0.2,
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
            opacity: isInView && isPartnerMap ? 1 : 0,
            scale: isInView && isPartnerMap ? 1 : 0.95,
            y: isInView && isPartnerMap ? 0 : 10,
          }}
          transition={{
            duration: 0.8,
            ease: easing,
            opacity: {
              duration: 0.6,
              ease: easing,
              delay: isPartnerMap ? 0.2 : 0,
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
            {/* Partner Map Rectangles - Clickable areas positioned on top of partner map */}
            {partnerRectangles.map((rect, index) => (
              <motion.div
                key={rect.id}
                className="absolute z-10"
                style={{
                  left: `${rect.x}px`,
                  top: `${rect.y}px`,
                  width: `${rect.width}px`,
                  height: `${rect.height}px`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: easing,
                  delay: index * 0.1 + 0.3,
                }}
              >
                <Link
                  href={rect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full cursor-pointer border-2 border-blue-500/70 bg-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-400/80 hover:bg-blue-500/30"
                  title={`Visit ${rect.id}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Logo Button - Top Left Corner */}
      <motion.button
        onClick={handleLogoClick}
        className="group absolute left-4 top-4 z-20 transition-transform duration-300 hover:scale-110"
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
            width={64}
            height={64}
            className="drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
          />
          {/* Tooltip */}
          <div className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            {isPartnerMap ? "Switch to Quantum Map" : "Switch to Partner Map"}
            {/* Arrow pointing to the button */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black/80" />
          </div>
        </div>
      </motion.button>

      {/* Quantum Nodes - Hidden when partner map is active */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView && !isPartnerMap ? 1 : 0 }}
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
            animate={isInView && !isPartnerMap ? "visible" : "hidden"}
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
