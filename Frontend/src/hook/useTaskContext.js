import { useContext } from "react";
import { TasksContext } from "../context/taskContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("useTasksContext must be used inside an TasksContextProvider");
  }

  return context;
};
