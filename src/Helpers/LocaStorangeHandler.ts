import {
  board,
  type boardType,
  type faceType,
  type locType,
} from "./Gameboard";

export const getGameBoard = () => {
  const board = localStorage.getItem("GameBoard");
  if (board) {
    console.log(board);
    return JSON.parse(board);
  } else {
    initGameBoard();
    const board = localStorage.getItem("GameBoard");
    if (board) {
      return JSON.parse(board);
    }
  }
};
export const initGameBoard = () => {
  if (!localStorage.getItem("GameBoard")) {
    localStorage.setItem("GameBoard", JSON.stringify(board));
    console.log("Initializing Game Board");
  }
};

export const resetGameBoard = () => {
  localStorage.setItem("GameBoard", JSON.stringify(board));
};

export const getCurrentPos = () => {
  const { CurrentPos, face } = JSON.parse(
    localStorage.getItem("CurrentPos") || "{}"
  ) as { CurrentPos: locType; face: faceType };
  if (CurrentPos != null && face !== null) {
    return { CurrentPos, face };
  }
  return { CurrentPos: null, face: null };
};
export const changeCurrentPos = (CurrentPos: locType, face: faceType) => {
  const payload = {
    CurrentPos,
    face,
  };
  if (CurrentPos) {
    const [x, y] = CurrentPos;
    // console.log("Calling POS");
    // console.log("Activated POS");
    if (x !== null && y !== null && x >= 0 && x < 5 && y >= 0 && y < 5) {
      localStorage.setItem("CurrentPos", JSON.stringify(payload));
    }
  }
};

export const resetCurrentPos = () => {
  const payload = {
    CurrentPos: [null, null],
    face: null,
  };
  localStorage.setItem("CurrentPos", JSON.stringify(payload));
};

export const updateGameBoard = (GameBoard: boardType) => {
  console.log("Gameboard updated to localstorage");
  localStorage.setItem("GameBoard", JSON.stringify(GameBoard));
};

export const initActivityLog = () => {
  localStorage.setItem("ActivityLog", JSON.stringify([""]));
};
export const getActivityLog = () => {
  const activityLog = localStorage.getItem("ActivityLog");
  if (activityLog) {
    return JSON.parse(activityLog);
  } else {
    initActivityLog();
    const activityLog = localStorage.getItem("ActivityLog");
    if (activityLog) {
      return JSON.parse(activityLog);
    }
  }
};

export const updateActivityLog = (message: string[]) => {
  localStorage.setItem("ActivityLog", JSON.stringify(message));
};

export const resetGame = async () => {
  resetGameBoard();
  resetCurrentPos();
  updateActivityLog([""]);
  resetPreviousPos();
};

export const setPreviousPos = (
  PreviousPos: locType,
  Previousface: faceType
) => {
  localStorage.setItem(
    "PrevPosition",
    JSON.stringify({ PreviousPos, Previousface })
  );
};

export const getPreviousPos = () => {
  const { PreviousPos, Previousface } = JSON.parse(
    localStorage.getItem("PrevPosition") || "{}"
  ) as { PreviousPos: locType; Previousface: faceType };
  if (PreviousPos !== null && Previousface !== null) {
    localStorage.setItem(
      "PrevPosition",
      JSON.stringify({ PreviousPos: null, Previousface: null })
    );
    return { PreviousPos, Previousface };
  }
  return { PreviousPos: null, Previousface: null } as {
    PreviousPos: locType;
    Previousface: faceType;
  };
};

export const resetPreviousPos = () => {
  localStorage.setItem(
    "PrevPosition",
    JSON.stringify({ PreviousPos: null, Previousface: null })
  );
};
