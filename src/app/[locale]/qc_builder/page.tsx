"use client";
import { act, useState } from "react";
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
import { draftMode } from "next/headers";

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
    console.debug(event.over?.id.toString());

    // What we need to do here is, if over isn't null or undefined, make it display a hover effect over the
    // box we're currently hovering over
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.debug(active.id.toString());

    // Fuck whatever this code below me does, it's stupid
    // Check if the dragged item is a placed gate
    // if (active.id.toString().startsWith("placed-")) {
    //     setDraggedPlacedGateId(active.id.toString());
    // }
    //
    // What we can do instead is maybe keep track of our actively dragged component somehow else in a state maybe, to then
    // use that state variable to keep track of the info of what we're trying to place
    // nvm we can just check which gate we picked up from the active object in our dropEvent
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      if (active.id.toString().startsWith("placed-")) {
        setPlacedGates(
          placedGates.filter(
            (placedGate) =>
              placedGate.instanceId !=
              active.id.toString().replace("placed-", ""),
          ),
        );
      }
      return;
    } else {
      // handle the case for when we're placing our gate over something (same as over not being null)
      // we can also use the check that if the over id is dropable-{number from 0 to numQubits}-{number from 0 to numCols} then we handle that shit
      // but tbh that seems a bit of a hastle -> easier to just check if over is not null + we only make the gates a droppable area and there won't be any other
      // areas where we can drop shit
      //
      // Get info about where we're dropping (bois)
      const [_, qubitStr, posStr] = over.id.toString().split("-");
      const qubit = Number.parseInt(qubitStr);
      const position = Number.parseInt(posStr);

      // console.debug(`Dropping gate ${active.id.toString()} at qubit ${qubit} at position ${position}`)
      const draggedGate = gates.find(
        (gate) => gate.id === active.id.toString(),
      ); // need to technically check if the gate we picked up isn't null but eh
      if (draggedGate) {
        const existingGateIndex = placedGates.findIndex(
          (gate) => gate.qubit === qubit && gate.position === position,
        );
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
      return;
    }
  };

  const handleDragEndbla = (event: DragEndEvent) => {
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

      <DndContext
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
