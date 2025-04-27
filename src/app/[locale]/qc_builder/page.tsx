"use client";
import { useState } from "react";
import type React from "react";

import { DndContext } from "@dnd-kit/core";

import { QGates } from "@/app/components/QGates";
import { PlacedGate } from "@/app/components/QCircuit";
import { QCircuit } from "@/app/components/QCircuit";
import { handleDragEnd, handleDragOver } from "./utils/dragUtils";
import { quantum_gates } from "./utils/quantum_gates";

export default function QuantumCircuitPage() {
  // State to track our quantum gates
  const [gates, setGates] = useState(quantum_gates);
  // State to track gates placed on the circuit
  const [placedGates, setPlacedGates] = useState<PlacedGate[]>([]);
  // Number of columns in our circuit
  const columns = 5;
  // number of qubits in our circuit
  const [qubits, setQubits] = useState(2);
  // Track which gate is currently being dragged from the circuit
  const [draggedPlacedGateId, setDraggedPlacedGateId] = useState<string | null>(
    null,
  );

  return (
    <div className="space-y-16 p-32">
      <h1 className="text-2xl font-bold">Quantum Circuit Builder</h1>
      <div className="flex w-fit gap-2 divide-solid rounded-full border border-solid border-black">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-600"
          onClick={() => setQubits(qubits + 1)}
        >
          <p className="text-lg font-bold">+</p>
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
          onClick={() => setQubits(qubits > 1 ? qubits - 1 : qubits)}
        >
          <p className="text-lg font-bold">-</p>
        </button>
      </div>
      {/* place draggable components in here in order to drag and drop them */}
      <DndContext
        onDragEnd={(event) =>
          handleDragEnd(event, placedGates, setPlacedGates, gates)
        }
        onDragOver={handleDragOver}
      >
        <div className="grid grid-cols-1 gap-6 rounded-lg md:grid-cols-4">
          {/* Quantum circuit */}
          <QCircuit
            qubits={qubits}
            columns={columns}
            placedGates={placedGates}
            draggedPlacedGateId={draggedPlacedGateId}
          />
          {/* Quantum gates palette */}
          <QGates qgates={gates} />
        </div>
      </DndContext>
    </div>
  );
}
