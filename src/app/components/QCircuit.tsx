import React from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { QGateInterface } from "./QGate";

export interface PlacedGate extends QGateInterface {
  position: number; // Column position
  qubit: number; // Qubit index
  instanceId: string; // Unique ID for this placed instance
}
interface QCircuitInterface {
  qubits: number;
  columns: number;
  placedGates: PlacedGate[];
  draggedPlacedGateId: string | null;
}

export const QCircuit = ({
  qubits,
  columns,
  placedGates,
  draggedPlacedGateId,
}: QCircuitInterface) => {
  // Find a gate at a specific position
  const getGateAtPosition = (qubit: number, position: number) => {
    return placedGates.find(
      (gate) => gate.qubit === qubit && gate.position === position,
    );
  };

  return (
    <div className="content-center rounded-lg bg-gray-900 p-5 md:col-span-3">
      <div className="flex h-min flex-col space-y-12">
        {Array.from({ length: qubits }).map((_, qIndex) => (
          <div key={qIndex} className="flex items-center space-x-2">
            <p className="w-12 font-mono text-sm text-gray-300">q[{qIndex}]</p>
            <div className="flex flex-1 items-center">
              {/* Create droppable areas for each position on the wire */}
              {Array.from({ length: columns }).map((_, colIndex) => {
                const gateAtPosition = getGateAtPosition(qIndex, colIndex);
                const isDraggingThisGate =
                  gateAtPosition &&
                  draggedPlacedGateId === `placed-${gateAtPosition.instanceId}`;
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
  );
};

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
