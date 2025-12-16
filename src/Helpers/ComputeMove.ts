import type { faceType } from "./Gameboard";

export const computeMove = (direction: faceType) => {
  // Just a simple map to simplify movement
  const map = {
    north: [1, 0],
    south: [-1, 0],
    east: [0, 1],
    west: [0, -1],
  };
  if (direction !== null) {
    return map[direction];
  }
  return null;
};
