import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import Terminal from "../Components/Terminal/Terminal";
import useGameManager from "../Context/useGameManager";
import { placeExecute } from "../Helpers/Place";

vi.mock("../Context/useGameManager", () => ({
  default: vi.fn(),
}));

vi.mock("../Helpers/Place", () => ({
  placeExecute: vi.fn(),
}));

describe("Terminal", () => {
  let move: any;
  let left: any;
  let right: any;
  let report: any;
  let place: any;

  beforeEach(() => {
    move = vi.fn();
    left = vi.fn();
    right = vi.fn();
    report = vi.fn();
    place = vi.fn();

    (useGameManager as any).mockReturnValue({
      move,
      left,
      right,
      report,
      place,
    });

    (placeExecute as any).mockReturnValue(true);
  });

  const setup = () => {
    render(<Terminal />);
    return screen.getByPlaceholderText(
      "Type a command place(), move(), left(), right(), report()"
    );
  };

  it("calls move() when command is move()", () => {
    const input = setup();
    fireEvent.change(input, { target: { value: "move()" } });
    fireEvent.submit(input.closest("form")!);
    expect(move).toHaveBeenCalled();
  });

  it("calls left() when command is left()", () => {
    const input = setup();
    fireEvent.change(input, { target: { value: "left()" } });
    fireEvent.submit(input.closest("form")!);
    expect(left).toHaveBeenCalled();
  });

  it("calls right() when command is right()", () => {
    const input = setup();
    fireEvent.change(input, { target: { value: "right()" } });
    fireEvent.submit(input.closest("form")!);
    expect(right).toHaveBeenCalled();
  });

  it("calls report() when command is report()", () => {
    const input = setup();
    fireEvent.change(input, { target: { value: "report()" } });
    fireEvent.submit(input.closest("form")!);
    expect(report).toHaveBeenCalled();
  });

  it("calls placeExecute for place commands", () => {
    const input = setup();
    fireEvent.change(input, { target: { value: "place(1,2,north)" } });
    fireEvent.submit(input.closest("form")!);
    expect(placeExecute).toHaveBeenCalledWith("place(1,2,north)", place);
  });

  it("shows error message when placeExecute returns false", async () => {
    (placeExecute as any).mockReturnValue(false);
    const input = setup();
    fireEvent.change(input, { target: { value: "invalid command" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() =>
      expect(screen.getByText("Invalid command")).toBeInTheDocument()
    );
  });
});
