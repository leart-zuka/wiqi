import { type DragEndEvent, type DragOverEvent } from "@dnd-kit/core";

import React from "react";

import { PlacedGate } from "@/app/components/QCircuit";
import { QGateInterface } from "./quantum_gates";

export const handleDragOver = (event: DragOverEvent) => {};

const isMultiQubit = (gateId: string, gates: QGateInterface[]) => {
  return gates.find((gate) => gate.id === gateId)?.multiQubit;
};

export const handleDragEnd = (
  event: DragEndEvent,
  placedGates: PlacedGate[],
  setPlacedGates: React.Dispatch<React.SetStateAction<PlacedGate[]>>,
  gates: QGateInterface[],
) => {
  const { active, over } = event;

  if (!over) {
    // dropping over nothing
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
    // dropping over something
    const [_, qubitStr, posStr] = over.id.toString().split("-");
    let qubit = Number.parseInt(qubitStr);
    let position = Number.parseInt(posStr);

    const gatesAtQubitPosition = placedGates.filter((gate) => {
      return gate.qubit === qubit && gate.position === position;
    });

    if (gatesAtQubitPosition.length > 0) {
      // over spot is not empty
      let draggedGate;
      if (active.id.toString().startsWith("placed-")) {
        // dragged gate was already placed
        draggedGate = placedGates.find(
          (gate) =>
            gate.instanceId === active.id.toString().replace("placed-", ""),
        );
      } else {
        // dragged gate was not previously placed
        draggedGate = gates.find((gate) => gate.id === active.id.toString());
      }

      if (draggedGate) {
        setPlacedGates((prevGates) =>
          prevGates
            .filter(
              (gate) =>
                gate.instanceId !== active.id.toString().replace("placed-", ""),
            )
            .map((gate) =>
              gate.position === position && gate.qubit === qubit
                ? {
                    ...draggedGate,
                    qubit,
                    position,
                    instanceId: `${draggedGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  }
                : gate,
            ),
        );
      }
    } else {
      // over spot is empty
      if (active.id.toString().startsWith("placed-")) {
        const instanceIdPlacedGate = active.id
          .toString()
          .replace("placed-", "");

        setPlacedGates(
          placedGates.map((gate) =>
            gate.instanceId === instanceIdPlacedGate
              ? { ...gate, qubit, position }
              : gate,
          ),
        );
      } else {
        const draggedGate = gates.find(
          (gate) => gate.id === active.id.toString(),
        )!;
        if (draggedGate.multiQubit) {
          if (qubit < 1) {
            qubit = 1;
          }
          let controlQubit = qubit - 1;
          let controlGate = gates.find((gate) => gate.id === "control")!;
          setPlacedGates([
            ...placedGates,
            {
              ...draggedGate,
              qubit,
              position,
              instanceId: `${draggedGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            },
            {
              ...controlGate,
              qubit: controlQubit,
              position,
              instanceId: `${controlGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            },
          ]);
        } else {
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
