import { TaskManagerContext } from "@/context";
import { useContext } from "react";

// 👉👉 context provider
const useTaskManagerContext = () => {
  const context = useContext(TaskManagerContext);
  if (!context) {
    throw new Error(
      "useTaskManagerContext hook must be used within TaskManger context provider"
    );
  }
  return context;
};
export default useTaskManagerContext;
