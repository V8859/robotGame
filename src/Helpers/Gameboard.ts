export type faceType = "north" | "south" | "east" | "west" | null;
export type locType = [number, number] | null;
export type itemType = { loc: locType; active: boolean; face: faceType };
export type boardType = itemType[][];

export const board: boardType = [
  [
    { loc: [0, 0], active: false, face: null },
    { loc: [0, 1], active: false, face: null },
    { loc: [0, 2], active: false, face: null },
    { loc: [0, 3], active: false, face: null },
    { loc: [0, 4], active: false, face: null },
  ],
  [
    { loc: [1, 0], active: false, face: null },
    { loc: [1, 1], active: false, face: null },
    { loc: [1, 2], active: false, face: null },
    { loc: [1, 3], active: false, face: null },
    { loc: [1, 4], active: false, face: null },
  ],
  [
    { loc: [2, 0], active: false, face: null },
    { loc: [2, 1], active: false, face: null },
    { loc: [2, 2], active: false, face: null },
    { loc: [2, 3], active: false, face: null },
    { loc: [2, 4], active: false, face: null },
  ],
  [
    { loc: [3, 0], active: false, face: null },
    { loc: [3, 1], active: false, face: null },
    { loc: [3, 2], active: false, face: null },
    { loc: [3, 3], active: false, face: null },
    { loc: [3, 4], active: false, face: null },
  ],
  [
    { loc: [4, 0], active: false, face: null },
    { loc: [4, 1], active: false, face: null },
    { loc: [4, 2], active: false, face: null },
    { loc: [4, 3], active: false, face: null },
    { loc: [4, 4], active: false, face: null },
  ],
];

const newGameBoard: boardType = [];
for (let i = 0; i < 5; i++) {
  newGameBoard.push([]);
  for (let j = 0; j < 5; j++) {
    newGameBoard[i].push({ loc: [i, j], active: false, face: null });
  }
}
