import * as tf from "@tensorflow/tfjs";
import { Tensor, Rank } from "@tensorflow/tfjs";

let real, imag;

real = tf.tensor2d([
  [0, 1],
  [1, 0],
]);
imag = tf.zeros([2, 2]);
const xGate = tf.complex(real, imag);

real = tf.tensor2d([
  [0, 0],
  [0, 0],
]);
imag = tf.tensor2d([
  [0, -1],
  [1, 0],
]);
const yGate = tf.complex(real, imag);

real = tf.tensor2d([
  [1, 0],
  [0, -1],
]);
imag = tf.zeros([2, 2]);
const zGate = tf.complex(real, imag);

const scale = 1 / Math.sqrt(2);
real = tf.tensor2d(
  [
    [scale, scale],
    [scale, -scale],
  ],
  [2, 2],
);

imag = tf.zeros([2, 2]);
const hGate = tf.complex(real, imag);

real = tf.tensor2d([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
]);
imag = tf.zeros([4, 4]);
const cnotGate = tf.complex(real, imag);

export const quantum_gates = [
  {
    id: "hadamard",
    title: "H",
    color: "bg-red-500",
    math: hGate,
    display: true,
  },
  {
    id: "x-rot",
    title: "X",
    color: "bg-blue-500",
    math: xGate,
    display: true,
  },
  {
    id: "y-rot",
    title: "Y",
    color: "bg-blue-500",
    math: yGate,
    display: true,
  },
  {
    id: "z-rot",
    title: "Z",
    color: "bg-blue-500",
    math: zGate,
    display: true,
  },
  {
    id: "cnot-x",
    title: "CX",
    color: "bg-rose-500",
    math: cnotGate,
    multiQubit: true,
    display: true,
  },
  {
    id: "control",
    title: "C",
    color: "bg-gray-500",
    math: cnotGate,
    multiQubit: true,
    display: false,
  },
];

export interface QGateInterface {
  id: string;
  title: string;
  color: string;
  math: Tensor<Rank>;
  multiQubit?: boolean;
  display: boolean;
}
