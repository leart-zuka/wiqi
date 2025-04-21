"use client";
import { useState } from "react";
import type React from "react";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import { QGates } from "@/app/components/QGates";
import type { QGateInterface } from "@/app/components/QGate";

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
    id: "z-rot",
    title: "Z",
    color: "bg-blue-500",
  },
];

interface PlacedGate extends QGateInterface {
  position: number; // Column position
  qubit: number; // Qubit index
  instanceId: string; // Unique ID for this placed instance
}

export default function QuantumCircuitPage() {
  const [gates] = useState(quantum_gates);
  // State to track gates placed on the circuit
  const [placedGates, setPlacedGates] = useState<PlacedGate[]>([]);
  // Number of columns in our circuit
  const columns = 5;
  const [qubits, setQubits] = useState([0, 1]);
  // Track which gate is currently being dragged from the circuit
  const [draggedPlacedGateId, setDraggedPlacedGateId] = useState<string | null>(
    null,
  );

  const handleDragOver = (event: DragOverEvent) => {
    console.debug(event.over);
    console.debug(event.active);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    // Check if the dragged item is a placed gate
    if (active.id.toString().startsWith("placed-")) {
      setDraggedPlacedGateId(active.id.toString());
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset the dragged placed gate id
    setDraggedPlacedGateId(null);

    // If nothing was dropped on, or dropped outside valid areas
    if (!over) {
      if (active.id.toString().startsWith("placed-")) {
        console.debug(placedGates);
        setPlacedGates((prev) =>
          prev.filter((gate) => `placed-${gate.instanceId}` !== active.id),
        );
      }
      return;
    }

    // Handle dropping on a valid droppable area
    if (over.id.toString().includes("droppable-")) {
      // Extract qubit and position from the droppable ID
      const [_, qubitStr, posStr] = over.id.toString().split("-");
      const qubit = Number.parseInt(qubitStr);
      const position = Number.parseInt(posStr);

      // Check if we're moving an existing placed gate
      if (active.id.toString().startsWith("placed-")) {
        const placedGateId = active.id.toString().replace("placed-", "");
        const placedGateIndex = placedGates.findIndex(
          (gate) => gate.instanceId === placedGateId,
        );

        console.debug(`cunt ${placedGateIndex}`);
        if (placedGateIndex >= 0) {
          // Check if there's already another gate at the target position
          const existingGateAtTarget = placedGates.findIndex(
            (gate) =>
              gate.qubit === qubit &&
              gate.position === position &&
              gate.instanceId !== placedGateId,
          );
          console.debug(`bla ${existingGateAtTarget}`);

          // If position is occupied by another gate, don't allow the move
          if (existingGateAtTarget >= 0) {
            return;
          }

          // Move the gate to the new position
          const updatedGates = [...placedGates];
          updatedGates[placedGateIndex] = {
            ...updatedGates[placedGateIndex],
            qubit,
            position,
          };
          setPlacedGates(updatedGates);
        }
      } else {
        // This is a new gate from the palette
        // Find the gate that was dragged
        const draggedGate = gates.find((gate) => gate.id === active.id);

        if (draggedGate) {
          // Check if there's already a gate at this position
          const existingGateIndex = placedGates.findIndex(
            (gate) => gate.qubit === qubit && gate.position === position,
          );

          if (existingGateIndex >= 0) {
            // Replace the existing gate
            const updatedGates = [...placedGates];
            updatedGates[existingGateIndex] = {
              ...draggedGate,
              qubit,
              position,
              instanceId: `${draggedGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            };
            setPlacedGates(updatedGates);
          } else {
            // Add a new gate
            setPlacedGates([
              ...placedGates,
              {
                ...draggedGate,
                qubit,
                position,
                instanceId: `${draggedGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              },
            ]);
          }
        }
      }
    }
  };

  // Find a gate at a specific position
  const getGateAtPosition = (qubit: number, position: number) => {
    return placedGates.find(
      (gate) => gate.qubit === qubit && gate.position === position,
    );
  };

  return (
    <div className="space-y-16 p-16">
      <h1 className="text-2xl font-bold">Quantum Circuit Builder</h1>

      <DndContext>
        <div className="grid grid-cols-1 gap-6 rounded-lg border border-cyan-400 md:grid-cols-4">
          <div className="content-center rounded-lg border border-red-300 bg-gray-900 p-5 md:col-span-3">
            {/* Quantum circuit */}
            <div className="flex h-min flex-col space-y-12">
              {qubits.map((qIndex) => (
                <div key={qIndex} className="flex items-center space-x-2">
                  <p className="w-12 font-mono text-sm text-gray-300">
                    q[{qIndex}]
                  </p>
                  <div className="flex flex-1 items-center">
                    {/* Create droppable areas for each position on the wire */}
                    {Array.from({ length: columns }).map((_, colIndex) => {
                      const gateAtPosition = getGateAtPosition(
                        qIndex,
                        colIndex,
                      );
                      const isDraggingThisGate =
                        gateAtPosition &&
                        draggedPlacedGateId ===
                          `placed-${gateAtPosition.instanceId}`;
                      return (
                        <DroppableArea
                          key={`${qIndex}-${colIndex}`}
                          id={`droppable-${qIndex}-${colIndex}`}
                        >
                          {gateAtPosition && !isDraggingThisGate && (
                            <DraggablePlacedGate gate={gateAtPosition} />
                          )}
                        </DroppableArea>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantum gates palette */}
          <QGates qgates={gates} />
        </div>
        <TrashDroppable id="trash" key="trash" />
      </DndContext>
    </div>
  );
}

// Droppable area component for the circuit
function DroppableArea({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-14 w-14 border border-dashed ${isOver ? "border-yellow-400 bg-yellow-900/20" : "border-gray-600"} m-1 flex items-center justify-center rounded-md transition-colors`}
    >
      {children}
    </div>
  );
}

// Draggable component for placed gates
function DraggablePlacedGate({ gate }: { gate: PlacedGate }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `placed-${gate.instanceId}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${gate.color} flex h-12 w-12 cursor-grab items-center justify-center rounded-md shadow-md active:cursor-grabbing`}
      style={style}
    >
      <p className="font-bold">{gate.title}</p>
    </div>
  );
}

function TrashDroppable({ id }: { id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`mt-8 flex h-20 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${isOver ? "border-red-500 bg-red-700/20 text-red-300" : "border-gray-500 text-gray-400"}`}
    >
      🗑 Drop here to delete gate
    </div>
  );
}
