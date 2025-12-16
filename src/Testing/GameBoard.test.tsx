import { render, screen } from "@testing-library/react";
import GameBoard from "../Components/GameBoard/GameBoard";
import useGameManager from "../Context/useGameManager";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../Context/useGameManager");

describe("GameBoard", () => {
  const mockBoard = Array.from({ length: 5 }, (_, x) =>
    Array.from({ length: 5 }, (_, y) => ({
      loc: [x, y],
      active: false,
      face: null,
    }))
  );

  beforeEach(() => {
    vi.clearAllMocks();
    (useGameManager as any).mockReturnValue({
      board: mockBoard,
    });
  });

  it("renders a 5x5 board (25 cells)", () => {
    render(<GameBoard />);

    const cells = screen.getAllByRole("gridcell");
    expect(cells.length).toBe(25);
  });

  it("renders exactly 36 lights", () => {
    render(<GameBoard />);

    const lights = screen.getAllByTestId("light-cell");
    expect(lights.length).toBe(36);
  });

  it("applies highlight class when num % 3 === 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(<GameBoard />);

    const lights = screen.getAllByTestId("light-cell");

    lights.forEach((cell) => {
      expect(cell).toHaveClass("bg-yellow-200");
    });
  });
});
