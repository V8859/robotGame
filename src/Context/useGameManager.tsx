import { useContext } from "react";
import GameManagerContext from "./GameManagerContext";

const useGameManager = () => {
  const context = useContext(GameManagerContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
export default useGameManager;
