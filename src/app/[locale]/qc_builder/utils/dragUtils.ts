import { type DragEndEvent, type DragOverEvent } from "@dnd-kit/core";

import React from "react";

import { PlacedGate } from "@/app/components/QCircuit";
import { QGateInterface } from "@/app/components/QGate";

export const handleDragOver = (event: DragOverEvent) => {};

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
    const qubit = Number.parseInt(qubitStr);
    const position = Number.parseInt(posStr);

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
        // console.debug(`Dropping gate ${active.id.toString()} at qubit ${qubit} at position ${position}`)
        const draggedGate = gates.find(
          (gate) => gate.id === active.id.toString(),
        )!;
        setPlacedGates([
          ...placedGates,
          {
            ...draggedGate,
            qubit,
            position,
            instanceId: `${draggedGate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          },
        ]);
        return;
      }
    }
  }
};
