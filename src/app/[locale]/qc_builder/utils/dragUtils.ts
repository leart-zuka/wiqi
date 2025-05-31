import { type DragEndEvent, type DragOverEvent } from "@dnd-kit/core";

import React from "react";

import { PlacedGate } from "@/app/components/QCircuit";
import { QGateInterface } from "./quantum_gates";
import {
  dropOverNothing,
  dropOverEmptySpot,
  dropOverNonEmptySpot,
  isOccupied,
} from "./dragHelpers";

export const handleDragOver = (event: DragOverEvent) => {};

export const handleDragEnd = (
  event: DragEndEvent,
  placedGates: PlacedGate[],
  setPlacedGates: React.Dispatch<React.SetStateAction<PlacedGate[]>>,
  gates: QGateInterface[],
) => {
  const { active, over } = event;

  if (!over) {
    dropOverNothing(active, placedGates, setPlacedGates);
  } else {
    // dropping over something
    const [_, qubitStr, posStr] = over.id.toString().split("-");
    let qubit = Number.parseInt(qubitStr);
    let position = Number.parseInt(posStr);

    if (isOccupied(qubit, position, placedGates)) {
      dropOverNonEmptySpot(
        active,
        placedGates,
        qubit,
        position,
        setPlacedGates,
        gates,
      );
    } else {
      dropOverEmptySpot(
        active,
        placedGates,
        qubit,
        position,
        setPlacedGates,
        gates,
      );
    }
  }
};
