import { getCurrentPos } from "./LocaStorangeHandler";
import { type faceType, type locType } from "./Gameboard";

//rotates anti clockwise
export const handleLeft = () => {
  const { CurrentPos, face } = getCurrentPos() as {
    CurrentPos: locType;
    face: faceType;
  };
  if (CurrentPos !== null && face !== null) {
    const map = {
      north: "west",
      west: "south",
      south: "east",
      east: "north",
    };
    return (map[face] as faceType) ?? null;
  }
};

// rotates clockwise
export const handleRight = () => {
  const { CurrentPos, face: face } = getCurrentPos() as {
    CurrentPos: locType;
    face: faceType;
  };
  if (CurrentPos !== null && face !== null) {
    const map = {
      north: "east",
      east: "south",
      south: "west",
      west: "north",
    };
    return (map[face] as faceType) ?? null;
  }
};
