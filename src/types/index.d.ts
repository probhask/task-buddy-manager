export type STATUS = "pending" | "completed" | "overdue";
export type PRIORITY = "high" | "medium" | "low";
export type TASK = {
  id: string;
  title: string;
  description: string;
  status: STATUS;
  priority: PRIORITY;
  endDate: Date;
  color?: string;
};

export type TASK_FORM = {
  title: string;
  description: string;
  priority: PRIORITY;
  endDate: Date;
  color: string;
};
export type FILTER_FORM = {
  status: STATUS | "all";
  priority: PRIORITY[];
  endDate: "ascending" | "descending" | "default";
};
export type FORMIK_TASK_FORM = {
  title: string;
  description: string;
  priority: PRIORITY;
  endDate: string;
  color: string;
};
export type FORM_CONTROLS = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  componentType: string;
  options?: { name: string; value: string; color?: string }[];
  items?: { name: string; value: string }[];
};
export type TaskManagerContextProps = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentEditedTaskID: string | null;
  updateCurrentEditedTaskID: (value: string | null) => void;
  taskFormData: TASK_FORM;
  setTaskFormData: Dispatch<SetStateAction<TASK_FORM>>;
  filterFormData: FILTER_FORM;
  setFilterFormData: Dispatch<SetStateAction<FILTER_FORM>>;
  updateFilterData: (data: FILTER_FORM) => void;
  taskList: TASK[];
  filteredTaskList: TASK[];
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  addNewTask: (data: TASK_FORM) => void;
  editTask: (data: TASK_FORM, taskID: string) => void;
  deleteTask: (taskID: string) => void;
  completeTask: (taskID: string) => void;
  inCompleteTask: (taskID: string) => void;
};
