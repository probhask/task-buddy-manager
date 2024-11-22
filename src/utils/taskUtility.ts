import { PRIORITY, STATUS, TASK } from "@/types";

export const getGroupColor = (status: STATUS | "all") =>
  status === "all"
    ? "gray"
    : status === "pending"
    ? "var(--color-secondary)"
    : status === "completed"
    ? "var(--color-primary)"
    : "var(--color-danger)";

export const getPriorityColor = (priority: PRIORITY) =>
  priority === "high"
    ? "var(--color-priority-high)"
    : priority === "medium"
    ? "var(--color-priority-medium)"
    : "var(--color-priority-low)";

export const getGroupComplimentaryText = (status: STATUS | "all") =>
  status === "all"
    ? "All tasks list"
    : status === "pending"
    ? "Tasks being actively worked on"
    : status === "completed"
    ? "Completed tasks"
    : "Overdue tasks";

export const getCategoricalTaskList = (taskList: TASK[]) => {
  const categoricalList: { [key in TASK["status"]]: TASK[] } = {
    pending: [],
    completed: [],
    overdue: [],
  };
  taskList.forEach((task) => {
    if (task.status === "pending") {
      categoricalList["pending"].push(task);
    } else if (task.status === "completed") {
      categoricalList["completed"].push(task);
    } else if (task.status === "overdue") {
      categoricalList["overdue"].push(task);
    }
  });
  return categoricalList;
};

export const checkIfOverDue = (endDate: string | Date): boolean => {
  const parsedDate = new Date(endDate);
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date format:", endDate);
    return false; // Or handle this case as needed.
  }
  return parsedDate <= new Date();
};
