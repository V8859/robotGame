import { createContext } from "react";
import type { boardType, faceType } from "../Helpers/Gameboard";
type Props = {
  board: boardType;
  place: (x: number, y: number, face: faceType) => void;
  move: () => void;
  left: () => void;
  right: () => void;
  report: () => void;
  activityLog: string[];
  back: () => void;
};
const GameManagerContext = createContext<Props | undefined>(undefined);
export default GameManagerContext;
