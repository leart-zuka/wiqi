import { QGate } from "./QGate";
import { QGateInterface } from "../[locale]/qc_builder/utils/quantum_gates";

interface QGatesInterface {
  qgates: QGateInterface[];
  nrQubits: number;
}

export const QGates = ({ qgates, nrQubits }: QGatesInterface) => {
  return (
    <div className="col-span-1 grid grid-cols-2 grid-rows-2 place-items-center justify-items-center gap-4 rounded-lg bg-gray-800 p-4">
      {qgates.map((qgate) => {
        if (qgate.display) {
          if (qgate.id === "cnot-x" && nrQubits < 2) {
            return (
              <div
                id={qgate.id}
                key={qgate.id}
                className={`flex h-12 w-12 items-center justify-center rounded-md bg-gray-500 shadow-md`}
              >
                <p className="font-bold">{qgate.title}</p>
              </div>
            );
          } else {
            return (
              <QGate
                key={qgate.id}
                id={qgate.id}
                title={qgate.title}
                color={qgate.color}
                math={qgate.math}
                display={qgate.display}
              />
            );
          }
        }
      })}
    </div>
  );
};
