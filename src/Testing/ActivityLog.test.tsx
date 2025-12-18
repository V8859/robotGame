//eslint-disable
//@ts-ignore
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ActivityLog from "../Components/ActivityLog/ActivityLog";
import useGameManager from "../Context/useGameManager";
vi.mock("../Context/useGameManager", () => ({
  default: vi.fn(),
}));

describe("ActivityLog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header", () => {
    (useGameManager as any).mockReturnValue({ activityLog: [] });
    render(<ActivityLog />);
    expect(screen.getByText("Activity Log")).toBeInTheDocument();
  });

  it("renders all log entries", () => {
    (useGameManager as any).mockReturnValue({
      activityLog: ["move()", "left()", "report()"],
    });

    render(<ActivityLog />);

    expect(screen.getByText("move()")).toBeInTheDocument();
    expect(screen.getByText("left()")).toBeInTheDocument();
    expect(screen.getByText("report()")).toBeInTheDocument();
  });

  it("renders entries in reverse visual order (flex-col-reverse)", () => {
    const logs = ["first", "second", "third"];
    (useGameManager as any).mockReturnValue({ activityLog: logs });

    render(<ActivityLog />);

    const items = screen.getAllByRole("listitem");
    expect(items[0].textContent).toBe("first");
    expect(items[1].textContent).toBe("second");
    expect(items[2].textContent).toBe("third");
  });

  it("renders nothing when log is empty", () => {
    (useGameManager as any).mockReturnValue({ activityLog: [] });

    render(<ActivityLog />);

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
  });
});
