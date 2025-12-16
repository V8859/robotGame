import { LucideTerminal } from "lucide-react";
import { useState } from "react";
import useGameManager from "../../Context/useGameManager";
import { placeExecute } from "../../Helpers/Place";

const Terminal = () => {
  const [message, setMessage] = useState("");
  const { move, place, right, left, report } = useGameManager();
  return (
    <div className="block relative w-[50%]">
      <form
        className="flex w-full p-2 border-2 rounded items-start justify-start"
        action={(formData) => {
          const command = formData.get("command");
          if (command === "move()") {
            move();
            return;
          }
          if (command === "left()") {
            left();
            return;
          }
          if (command === "right()") {
            right();
            return;
          }
          if (command === "report()") {
            report();
            return;
          }
          if (command !== null) {
            const valid = placeExecute(command as string, place);
            if (!valid) {
              setMessage("Invalid command");
            }
          }
        }}
      >
        <LucideTerminal />
        <input
          className="outline-none w-full border-none font-[Hack]"
          type="text"
          autoComplete="off"
          name="command"
          placeholder="Type a command place(), move(), left(), right(), report()"
        />
      </form>
      <span
        className={`absolute w-full left-0 transition-opacity duration-1000`}
      >
        {message}
      </span>
    </div>
  );
};

export default Terminal;
