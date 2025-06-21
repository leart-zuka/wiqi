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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      {/* Munich Map Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/image_1.png"
          alt="Munich Map"
          fill
          className="object-cover opacity-60"
          priority
        />
      </motion.div>

      {/* Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`group absolute -translate-x-1/2 -translate-y-1/2 transform`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              zIndex: node.id === hoveredNode ? 10 : 1,
            }}
            variants={nodeVariants}
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {node.id === "wiqi" ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-800 text-[10px] font-bold text-white shadow-[0_0_15px_rgba(91,33,182,0.6)] transition-transform duration-300 group-hover:scale-110 lg:h-16 lg:w-16 lg:text-sm">
                <span>{node.label}</span>
              </div>
            ) : (
              <>
                <div
                  className={`flex items-center justify-center ${
                    node.id === "center"
                      ? "h-24 w-24 lg:h-36 lg:w-36"
                      : "h-10 w-10 lg:h-16 lg:w-16"
                  } ${
                    node.id === "center"
                      ? "bg-black/80 text-white"
                      : "bg-white/80"
                  } rounded-full border-2 backdrop-blur-sm ${
                    node.id === "center"
                      ? "border-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                      : "border-gray-800 shadow-lg"
                  } transition-transform duration-300 group-hover:scale-110 dark:!border-white dark:!bg-black/80 dark:!text-white`}
                >
                  {node.icon && (
                    <node.icon
                      size={node.id === "center" ? 64 : 32}
                      weight="regular"
                      className="transition-colors duration-300"
                    />
                  )}
                </div>
                <div
                  className={`absolute -top-9 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-black/70 px-3 py-1.5 text-[0.6rem] font-medium text-white shadow-md transition-all duration-300 group-hover:scale-110 lg:text-sm`}
                >
                  {node.label}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

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
