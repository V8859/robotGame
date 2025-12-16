import type { faceType } from "./Gameboard";
import { getCurrentPos } from "./LocaStorangeHandler";

export const placeExecute = (
  command: string,
  place: (x: number, y: number, face: faceType) => void
) => {
  const stringified = command?.toString().replace(")", "").split("(");
  if (stringified) {
    if (stringified[0] === "place") {
      const furtherStringified = stringified[1].split(",");
      const x = furtherStringified[0];
      const y = furtherStringified[1];
      const direction = furtherStringified[2].toLowerCase().replace(/'/g, "");
      console.log(direction);
      const { CurrentPos } = getCurrentPos();
      if (CurrentPos === null) {
        console.log("placing");
        if (
          direction === "north" ||
          direction === "south" ||
          direction === "east" ||
          direction === "west"
        ) {
          place(Number(x), Number(y), direction);
        }
      }
    }
    return true;
  } else {
    return false;
  }
};
