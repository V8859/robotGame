"use client";
import { useState } from "react";

import React from "react";
import {
  getActivityLog,
  getCurrentPos,
  getGameBoard,
  // initGameBoard,
  changeCurrentPos,
  updateActivityLog,
  updateGameBoard,
  getPreviousPos,
  setPreviousPos,
} from "../Helpers/LocaStorangeHandler";
import { handleLeft, handleRight } from "../Helpers/HandleTurns";
import type {
  boardType,
  faceType,
  itemType,
  locType,
} from "../Helpers/Gameboard";
import GameManagerContext from "./GameManagerContext";
import { computeMove } from "../Helpers/ComputeMove";
// import { placeExecute } from "../Helpers/Place";

const GameManager = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<boardType>(() => getGameBoard());
  const [activityLog, setActivityLog] = useState<string[]>(() =>
    getActivityLog()
  );
  // Uncomment line below, if getGameBoard is being funny
  // if (board === undefined) initGameBoard();

  const updateLog = (message: string) => {
    setActivityLog((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.push(message);
      updateActivityLog(copy);
      return copy;
    });
  };

  const updateCell = (expression: locType, fn: (cell: itemType) => void) => {
    if (expression !== null) {
      const [x, y] = expression;
      // We check if move is valid here. So an x value less than 0 wouldn't work etc.
      if (x >= 0 && x < 5 && y >= 0 && y < 5) {
        setBoard((prev) => {
          const copy: boardType = prev.map((row) =>
            row.map((cell) => ({ ...cell }))
          );
          fn(copy[x][y]);
          updateGameBoard(copy);
          return copy;
        });
        return true;
      } else {
        // returning false for future enhancements
        return false;
      }
    }
  };
  const deactivateCell = (x: number, y: number) => {
    updateCell([x, y], (cell) => {
      cell.active = false;
      cell.face = null;
    });
  };

  const place = (x: number, y: number, face: faceType) => {
    // This is for funcationality where place is valid to use even if robot already exists on the board
    // const { CurrentPos } = getCurrentPos();
    // if (CurrentPos !== null) {
    //   deactivateCell(CurrentPos[0], CurrentPos[1]);
    // }

    changeCurrentPos([x, y], face);
    const res = updateCell([x, y], (cell) => {
      cell.active = true;
      cell.face = face;
    });
    if (res)
      updateLog("place(" + x + "," + y + "," + face?.toUpperCase() + ")");
  };

  const back = () => {
    const { PreviousPos, Previousface } = getPreviousPos();
    const { CurrentPos, face } = getCurrentPos();
    if (PreviousPos !== null && CurrentPos !== null) {
      changeCurrentPos(PreviousPos, face);
      // console.log(PreviousPos);
      updateCell([PreviousPos[0], PreviousPos[1]], (cell) => {
        cell.active = true;
        cell.face = Previousface;
        deactivateCell(CurrentPos[0], CurrentPos[1]);
      });
    }
  };

  const move = () => {
    const { CurrentPos, face } = getCurrentPos();
    setPreviousPos(CurrentPos, face);
    const direction = computeMove(face);
    if (direction !== null && CurrentPos !== null) {
      const expression = [
        CurrentPos[0] + direction[0],
        CurrentPos[1] + direction[1],
      ] as locType;
      changeCurrentPos(expression, face);
      const res = updateCell(expression, (cell) => {
        cell.active = true;
        cell.face = face;
        deactivateCell(CurrentPos[0], CurrentPos[1]);
      });
      if (res) updateLog("move()");
    }
  };
  const left = () => {
    const { CurrentPos } = getCurrentPos();
    const { PreviousPos } = getPreviousPos();
    if (CurrentPos) {
      const direction = handleLeft();
      if (direction !== null && direction !== undefined) {
        changeCurrentPos(CurrentPos, direction);
        if (PreviousPos !== null) {
          setPreviousPos(PreviousPos, direction);
        }
        updateCell([CurrentPos[0], CurrentPos[1]], (cell) => {
          cell.face = direction;
        });
        updateLog("left()");
      }
    }
  };
  const right = () => {
    const { CurrentPos } = getCurrentPos();
    const { PreviousPos } = getPreviousPos();

    if (CurrentPos) {
      const direction = handleRight();
      if (direction !== null && direction !== undefined) {
        changeCurrentPos(CurrentPos, direction);
        if (PreviousPos !== null) {
          setPreviousPos(PreviousPos, direction);
        }
        updateCell([CurrentPos[0], CurrentPos[1]], (cell) => {
          cell.face = direction;
        });
        updateLog("right()");
      }
    }
  };
  const report = () => {
    const { CurrentPos, face } = getCurrentPos();
    if (CurrentPos !== null && face !== null) {
      updateLog(
        `report() => Output: ${CurrentPos[0]},${
          CurrentPos[1]
        },${face.toUpperCase()}`
      );
    }
  };

  return (
    <GameManagerContext.Provider
      value={{
        place,
        activityLog,
        move,
        left,
        right,
        report,
        board,
        back,
      }}
    >
      {children}
    </GameManagerContext.Provider>
  );
};

export default GameManager;
