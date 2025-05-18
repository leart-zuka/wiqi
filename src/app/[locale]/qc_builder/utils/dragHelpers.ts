"use client";

import { Active } from "@dnd-kit/core";
import { PlacedGate } from "@/app/components/QCircuit";
import { QGateInterface } from "./quantum_gates";

export const dropOverNothing = (
  active: Active,
  placedGates: PlacedGate[],
  setPlacedGates: React.Dispatch<React.SetStateAction<PlacedGate[]>>,
) => {
  // dropping over nothing
  if (active.id.toString().startsWith("placed-")) {
    const draggedGate = placedGates.find(
      (gate) => gate.instanceId === active.id.toString().replace("placed-", ""),
    );

    if (draggedGate) {
      const { qubit, position, multiQubit, control } = draggedGate;

      setPlacedGates(
        placedGates.filter((placedGate) => {
          const isMainGate = placedGate.instanceId === draggedGate.instanceId;

          const isPairedGate =
            multiQubit &&
            (control
              ? placedGate.qubit === qubit + 1 &&
                placedGate.position === position
              : placedGate.qubit === qubit - 1 &&
                placedGate.position === position);

          return !isMainGate && !isPairedGate;
        }),
      );
    }
  }
  return;
};

export const dropOverNonEmptySpot = (
  active: Active,
  placedGates: PlacedGate[],
  qubit: number,
  position: number,
  setPlacedGates: React.Dispatch<React.SetStateAction<PlacedGate[]>>,
  gates: QGateInterface[],
) => {
  // over spot is not empty
  let draggedGate;
  if (active.id.toString().startsWith("placed-")) {
    // dragged gate was already placed
    draggedGate = placedGates.find(
      (gate) => gate.instanceId === active.id.toString().replace("placed-", ""),
    );
  } else {
    // dragged gate was not previously placed
    draggedGate = gates.find((gate) => gate.id === active.id.toString());
  }

  if (draggedGate) {
    if (draggedGate.multiQubit) {
      console.debug("cunt");
      const filteredGates = placedGates.filter(
        (gate) =>
          gate.instanceId !== active.id.toString().replace("placed-", "") &&
          (gate.control
            ? gate.position === position && gate.qubit === qubit + 1
            : gate.position === position && gate.qubit === qubit - 1),
      );
      filteredGates.forEach((gate) => console.debug(gate));
      // TODO: Implement case for dropping off over gates
      //
      // setPlacedGates((prevGates) =>
      //     prevGates
      //         .filter(
      //             (gate) =>
      //                 (gate.instanceId !== active.id.toString().replace("placed-", "")) &&
      //                 (gate.control ? (gate.position === position && gate.qubit === qubit + 1) : (gate.position === position && gate.qubit === qubit - 1))
      //         )
      //         .map((gate) =>
      //             gate.position === position && gate.qubit === qubit
      //                 ? {
      //                     ...draggedGate,
      //                     qubit,
      //                     position,
      //                     instanceId: `${draggedGate.id}-${Date.now()}`,
      //                 }
      //                 : gate,
      //         ),
      // );
    } else {
      // TODO: implement case for dropping off over one of the 2 qubit gates, so that it deletes both of them
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
                  instanceId: `${draggedGate.id}-${Date.now()}`,
                }
              : gate,
          ),
      );
    }
  }
};

export const dropOverEmptySpot = (
  active: Active,
  placedGates: PlacedGate[],
  qubit: number,
  position: number,
  setPlacedGates: React.Dispatch<React.SetStateAction<PlacedGate[]>>,
  gates: QGateInterface[],
) => {
  // over spot is empty
  if (active.id.toString().startsWith("placed-")) {
    // gate was already placed at a different position
    const instanceIdPlacedGate = active.id.toString().replace("placed-", "");

    const draggedGate = placedGates.find(
      (gate) => gate.instanceId === instanceIdPlacedGate,
    );

    if (!draggedGate) return;

    if (draggedGate.multiQubit) {
      // multi qubit gate
      const isControl = draggedGate.control;
      const pairQubit = isControl ? qubit : qubit - 1;

      setPlacedGates(
        placedGates.map((gate) => {
          if (gate.instanceId === instanceIdPlacedGate) {
            return { ...gate, qubit, position };
          } else if (
            gate.multiQubit &&
            gate.control !== draggedGate.control && // other half of pair
            gate.position === draggedGate.position &&
            gate.qubit ===
              (isControl ? draggedGate.qubit + 1 : draggedGate.qubit - 1)
          ) {
            return { ...gate, qubit: pairQubit, position };
          }
          return gate;
        }),
      );
    } else {
      // Single-qubit gate move
      setPlacedGates(
        placedGates.map((gate) =>
          gate.instanceId === instanceIdPlacedGate
            ? { ...gate, qubit, position }
            : gate,
        ),
      );
    }
  } else {
    const draggedGate = gates.find((gate) => gate.id === active.id.toString())!;
    if (draggedGate.multiQubit) {
      // TODO: implement case for when dropping off but one of the qubits is blocked with another gate, so that we then delete that one qubit gate
      //
      // multi qubit gate
      if (qubit === 1) {
        // if user tries to place target qubit gate on the 0th qubit, place it on the 1st one instead as the 0th one will get taken up by the control gate
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
          instanceId: `${draggedGate.id}-${Date.now()}`,
          control: false,
        },
        {
          ...controlGate,
          qubit: controlQubit,
          position,
          instanceId: `${controlGate.id}-${Date.now() + 1}`,
          control: true,
        },
      ]);
    } else {
      // single qubit gate
      setPlacedGates([
        ...placedGates,
        {
          ...draggedGate,
          qubit,
          position,
          instanceId: `${draggedGate.id}-${Date.now()}`,
        },
      ]);
    }
  }
};
