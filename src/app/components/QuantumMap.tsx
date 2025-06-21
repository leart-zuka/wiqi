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
              className="absolute inset-0 backdrop-blur-sm"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, transparent 70%, black 100%)",
              }}
            />
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
