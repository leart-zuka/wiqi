import { Tensor, Rank } from "@tensorflow/tfjs";

export interface QGateInterface {
  id: string;
  title: string;
  color: string;
  gate: Tensor<Rank>;
}

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const QGate = ({ id, title, color, gate }: QGateInterface) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      id={id}
      key={id}
      className={`${color} flex h-12 w-12 cursor-grab items-center justify-center rounded-md shadow-md active:cursor-grabbing`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <p className="font-bold">{title}</p>
    </div>
  );
};
