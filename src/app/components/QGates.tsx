import { QGate } from "./QGate";
import { QGateInterface } from "../[locale]/qc_builder/utils/quantum_gates";

interface QGatesInterface {
  qgates: QGateInterface[];
}

export const QGates = ({ qgates }: QGatesInterface) => {
  return (
    <div className="col-span-1 grid grid-cols-2 grid-rows-2 place-items-center justify-items-center gap-4 rounded-lg bg-gray-800 p-4">
      {qgates.map((qgate) => {
        if (qgate.display) {
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
      })}
    </div>
  );
};
