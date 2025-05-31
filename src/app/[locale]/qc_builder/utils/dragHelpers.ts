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
      if (qubit === 1) {
        /*
         * INFO: if user tries to place target qubit gate on the 0th qubit, place it on the 1st one instead as the 0th one will get taken up by the control gate
         */
        qubit = 1;
      }
      const controlQubit = qubit - 1;
      let filteredGate = placedGates.filter(
        (gate) => gate.position === position && gate.qubit === qubit,
      )[0];
      if (filteredGate.multiQubit) {
        // TODO: drop over a multiqubit gate
      } else {
        // TODO: drop over single qubit gate
      }
    } else {
      // NOTE: implement case for dropping off over one of the 2 qubit gates, so that it deletes both of them

      let filteredGate = placedGates.filter(
        (gate) => gate.position === position && gate.qubit === qubit,
      )[0];

      if (filteredGate.multiQubit) {
        let controlQubit: number;
        let targetQubit: number;

        if (!filteredGate.control) {
          // This is the target gate
          targetQubit = qubit;
          controlQubit = targetQubit - 1;
        } else {
          // This is the control gate
          controlQubit = qubit;
          targetQubit = controlQubit + 1;
        }

        setPlacedGates((prevGates) => {
          const targetInstanceId = active.id.toString().replace("placed-", "");

          return [
            ...prevGates.filter(
              (gate) =>
                gate.instanceId !== targetInstanceId && // remove dragged version if any
                !(
                  gate.position === position &&
                  (gate.qubit === controlQubit || gate.qubit === targetQubit)
                ),
            ),
            {
              ...draggedGate,
              qubit,
              position,
              instanceId: `${draggedGate.id}-${Date.now()}`,
            },
          ];
        });
      } else {
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
      const pairQubit = isControl ? qubit + 1 : qubit - 1;
      setPlacedGates(
        placedGates.map((gate) => {
          if (gate.instanceId === instanceIdPlacedGate) {
            return { ...gate, position, qubit };
          }
          if (
            gate.multiQubit &&
            gate.position &&
            position &&
            gate.qubit === (isControl ? qubit + 1 : qubit - 1)
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
    // gate wasn't placed already
    const draggedGate = gates.find((gate) => gate.id === active.id.toString())!;
    if (draggedGate.multiQubit) {
      // multi qubit gate
      if (qubit === 0) {
        /*
         * INFO: if user tries to place target qubit gate on the 0th qubit, place it on the 1st one instead as the 0th one will get taken up by the control gate
         */
        qubit = 1;
      }
      let controlQubit = qubit - 1;
      let controlGate = gates.find((gate) => gate.id === "control")!;

      if (isOccupied(controlQubit, position, placedGates)) {
        /*
         * INFO: if we try to drop over empty spot, but the spot for the control qubit is occupied, switch out the qubit that would block control qubit with control qubit
         */
        setPlacedGates((prevGates) => {
          const updatedGates = prevGates
            .filter(
              (gate) =>
                gate.instanceId !== active.id.toString().replace("placed-", ""),
            )
            .filter(
              (gate) =>
                !(gate.qubit === controlQubit && gate.position === position),
            );
          return [
            ...updatedGates,
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
              instanceId: `${controlGate.id}-${Date.now()}`,
              control: true,
              targetQubit: qubit,
            },
          ];
        });
      } else {
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
      }
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

export const isOccupied = (
  qubit: number,
  position: number,
  placedGates: PlacedGate[],
) => {
  const gatesAtPosition = placedGates.filter((gate) => {
    return gate.qubit === qubit && gate.position === position;
  });
  return gatesAtPosition.length > 0;
};
