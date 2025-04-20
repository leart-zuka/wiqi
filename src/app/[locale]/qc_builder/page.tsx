"use client";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

const quantum_gates = [
  {
    id: "hadamard",
    title: "H",
    color: "bg-red-500",
  },
  {
    id: "x-rot",
    title: "X",
    color: "bg-blue-500",
  },
  {
    id: "y-rot",
    title: "Y",
    color: "bg-blue-500",
  },
  {
    id: "Z-rot",
    title: "Z",
    color: "bg-blue-500",
  },
];

export default function QuantumCircuitPage() {
  return (
    <div className="space-y-6 p-32">
      <h1>Cunt</h1>
      {/* basic structure of our builder with the circuit being on the left side and our gates on the right side */}
      <DndContext>
        <div className="grid grid-cols-4 gap-3 border border-cyan-400">
          <div className="col-span-3 content-center border border-red-300 p-5">
            {/* actual circuit */}
            <div className="flex flex-col space-y-6">
              {[0, 1].map((qIndex) => (
                <div key={qIndex} className="flex items-center space-x-2">
                  <span className="w-12 text-sm text-gray-300">
                    q[{qIndex}]
                  </span>
                  <div className="h-px flex-1 bg-gray-600" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-2 grid-rows-2 justify-items-center gap-4 border border-red-300 p-4">
            {/* quantum gates */}
            {quantum_gates.map((quantum_gate) => {
              return (
                <div
                  id={quantum_gate.id}
                  key={quantum_gate.id}
                  className={`${quantum_gate.color}`}
                >
                  <p className="p-5">{quantum_gate.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
