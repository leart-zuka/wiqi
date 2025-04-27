import * as tf from "@tensorflow/tfjs";

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

export const quantum_gates = [
  {
    id: "hadamard",
    title: "H",
    color: "bg-red-500",
    gate: hGate,
  },
  {
    id: "x-rot",
    title: "X",
    color: "bg-blue-500",
    gate: xGate,
  },
  {
    id: "y-rot",
    title: "Y",
    color: "bg-blue-500",
    gate: yGate,
  },
  {
    id: "z-rot",
    title: "Z",
    color: "bg-blue-500",
    gate: zGate,
  },
];
