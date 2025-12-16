import "./App.css";
import Terminal from "./Components/Terminal/Terminal";
import GameBoard from "./Components/GameBoard/GameBoard";
import { RefreshCcw } from "lucide-react";
import { resetGame } from "./Helpers/LocaStorangeHandler";
import ActivityLog from "./Components/ActivityLog/ActivityLog";

function App() {
  return (
    <>
      <div className="flex relative overflow-y-hidden gap-4 flex-col items-center justify-center min-w-screen md:w-screen h-screen bg-sky-900">
        <div className="w-full h-fit flex items-center justify-center">
          <div className="md:w-[50%] w-fit border bg-red-950 flex items-center justify-center h-fit">
            <GameBoard />
          </div>
          <ActivityLog />
        </div>
        <div className="w-full h-fit flex items-center justify-center">
          <Terminal />
          <button
            className="bg-slate-50/30 w-fit h-full rounded ml-1 px-3 hover:cursor-pointer flex items-center justify-center"
            type="button"
            onClick={async () => {
              await resetGame();
              window.location.reload();
            }}
          >
            <RefreshCcw />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
