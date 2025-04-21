import { type QGateInterface, QGate } from "./QGate";

interface QGatesInterface {
  qgates: QGateInterface[];
}

export const QGates = ({ qgates }: QGatesInterface) => {
  return (
    <div className="col-span-1 grid grid-cols-2 grid-rows-2 place-items-center justify-items-center gap-4 rounded-lg border border-red-300 bg-gray-800 p-4">
      {qgates.map((qgate) => {
        return (
          <QGate
            key={qgate.id}
            id={qgate.id}
            title={qgate.title}
            color={qgate.color}
          />
        );
      })}
    </div>
  );
};
