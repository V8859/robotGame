import { useState } from "react";
import useGameManager from "../../Context/useGameManager";

const GameBoard = () => {
  const [lights] = useState(() => {
    return Array.from({ length: 36 }, () => {
      const number = Math.floor(Math.random() * 10);
      return number;
    });
  });
  const { board } = useGameManager();
  return (
    <div className="h-100 w-62.5 flex items-center justify-center">
      <div className="transform-3d md:perspective-[1000px] w-full h-full md:-translate-x-35">
        <div className="md:translate-y-7 border-2 border-l-4 border-black md:translate-x-39 md:translate-z-40 md:-rotate-x-150 rotate-x-180 grid grid-cols-5 grid-rows-5 place-items-center h-[50%] bg-green-900">
          {board.map((row) => {
            return row.map((box) => {
              return (
                <div
                  key={box.loc?.toString()}
                  data-testid={`cell-${box.loc?.[0]}-${box.loc?.[1]}`}
                  role="gridcell"
                  className={`relative w-full h-full bg-slate-500 border-[0.5px] border-gray-300/20 items-center justify-center`}
                >
                  <div
                    data-testid={`robot-${box.loc?.[0]}-${box.loc?.[1]}`}
                    className={`absolute top-2 left-2 transform-3d z-1 transition-all duration-500 ease-in-out h-[50%] w-[50%]
                      ${box.active ? "block" : "hidden"}
                      ${box.face === "north" ? "rotate-0" : ""}
                      ${box.face === "south" ? "rotate-180" : ""}
                      ${box.face === "east" ? "rotate-270" : ""}
                      ${box.face === "west" ? "rotate-90" : ""} `}
                  >
                    <div
                      className={`bg-slate-600 inset-0 transition-all duration-500 ease-in-out items-center justify-center flex rounded-2xl h-full w-full `}
                    >
                      <div className="bg-slate-900 flex absolute border-2 border-slate-950 h-[50%] rounded-2xl w-[50%]">
                        <div className="bg-amber-600 h-[60%] w-[60%]"></div>
                        <div className="bg-purple-800 h-[60%] w-[60%]"></div>
                      </div>
                    </div>
                    <div className="absolute w-[25%] rounded-b-2xl z-[-5] h-[80%] top-2 shadow-2xl left-0 bg-sky-500"></div>
                    <div className="absolute w-[25%] rounded-b-2xl z-[-5] h-[80%] top-2 shadow-2xl right-0 bg-sky-500"></div>
                  </div>
                  <div className="absolute border-l border-slate-600 top-1 w-[98%] h-full bg-slate-400"></div>
                </div>
              );
            });
          })}
        </div>
        <div className="gap-1 border-l-4 bg-slate-400 border-2 border-black p-1 h-[50%] bg-gradient-to-t grid grid-cols-6 grid-rows-6 md:translate-x-39 md:translate-z-40 md:rotate-x-150">
          {lights.map((num, i) => {
            return (
              <div
                key={`${num} + ${i}` + i}
                data-testid="light-cell"
                className={`border-t-2 border-b-[0.1px] border-l-[0.1px] border-r-2 border-gray-900 grid grid-cols-6 grid-rows-6 place-items-center bg-sky-800/50 relative w-full h-full ${
                  num % 3 == 0 &&
                  "bg-yellow-200 border-t-slate-700 border-r-slate-700"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="gap-1 md:bg-gray-950 p-1 h-[50%] -translate-y-49 md:-translate-y-49 -translate-x-10 md:translate-x-20 -translate-z-20 md:translate-z-0 rotate-x-50"></div>
      </div>
    </div>
  );
};

export default GameBoard;
