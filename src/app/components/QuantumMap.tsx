"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Code,
  Cpu,
  Maximize2,
  Search,
  AtomIcon,
  MonitorIcon,
} from "lucide-react";
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
      icon: AtomIcon,
      x: 50,
      y: 45,
      size: 80,
    },
    {
      id: "computing",
      label: "Quantum Computing",
      icon: Cpu,
      x: 40,
      y: 25,
      size: 60,
    },
    {
      id: "algorithms",
      label: "Algorithms",
      icon: Code,
      x: 63,
      y: 25,
      size: 60,
    },
    {
      id: "applications",
      label: "Applications",
      icon: MonitorIcon,
      x: 15,
      y: 35,
      size: 60,
    },
    {
      id: "current",
      label: "Current state",
      icon: Cpu,
      x: 20,
      y: 60,
      size: 60,
    },
    {
      id: "physical",
      label: "Physical realisations",
      icon: Maximize2,
      x: 40,
      y: 80,
      size: 60,
    },
    {
      id: "obstacles",
      label: "Obstacles",
      icon: AlertTriangle,
      x: 80,
      y: 77,
      size: 60,
    },
    {
      id: "error",
      label: "Error correction",
      icon: Search,
      x: 70,
      y: 50,
      size: 60,
    },
    { id: "wiqi", label: "< WIQI >", icon: null, x: 50, y: 5, size: 100 },
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
                      ? "h-20 w-20 lg:h-28 lg:w-28"
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
                      className={`${
                        node.id === "center"
                          ? "h-8 w-8 lg:h-14 lg:w-14"
                          : "h-5 w-5 lg:h-8 lg:w-8"
                      } transition-colors duration-300`}
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
