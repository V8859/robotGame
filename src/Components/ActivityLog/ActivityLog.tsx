import useGameManager from "../../Context/useGameManager";

const ActivityLog = () => {
  const { activityLog } = useGameManager();
  return (
    <div className="border border-l-transparent flex h-100.25 w-fit flex-col md:w-45">
      <span className="border-b h-fit min-w-full bg-gray-950">
        Activity Log
      </span>
      <ul className="min-w-full h-full flex-col-reverse flex overflow-y-scroll">
        {activityLog.map((message: string, _: number) => {
          return (
            <li
              key={`${_} + ${message}`}
              className="w-fit text-start text-xs md:px-1 h-fit"
            >
              {message}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityLog;
