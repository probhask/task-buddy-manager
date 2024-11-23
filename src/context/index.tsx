import {
  FILTER_FORM,
  STATUS,
  TASK,
  TASK_FORM,
  TaskManagerContextProps,
} from "@/types";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { checkIfOverDue } from "@/utils/taskUtility";
import { filterFormInitialState, formInitialState } from "@/utils/formUtility";
import {
  storeToLocalStorage,
  storedLocalStorageData,
} from "@/utils/localStorageUtility";

import { useSearchParams } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

// 👉👉 context
export const TaskManagerContext = createContext<
  TaskManagerContextProps | undefined
>(undefined);

// 👉👉 context provider
export const TaskManagerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentEditedTaskID, setCurrentEditedTaskID] = useState<string | null>(
    null
  );
  const [taskFormData, setTaskFormData] = useState<TASK_FORM>(formInitialState);
  const [filterFormData, setFilterFormData] = useState<FILTER_FORM>(
    storedLocalStorageData<FILTER_FORM>("task-filter") || filterFormInitialState
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    URLSearchParams.get("search") || ""
  );

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(
    URLSearchParams.get("search") || ""
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskList, setTaskList] = useState<TASK[]>(
    storedLocalStorageData<TASK[]>("task-buddy") || []
  );
  const [filteredTaskList, setFilteredTaskList] = useState<TASK[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    storedLocalStorageData<boolean>("dark-mode") || false
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      return !prev;
    });
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    storeToLocalStorage<boolean>("dark-mode", isDarkMode);
  }, [isDarkMode]);
  const updateTaskList = (data: TASK[]): void => {
    setTaskList([...data]);
    storeToLocalStorage("task-buddy", data);
  };

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    SetURLSearchParams((prev) => {
      if (query) {
        prev.set("search", query);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  }, []);

  const updateFilterData = (data: FILTER_FORM) => {
    setFilterFormData(data);
    storeToLocalStorage<FILTER_FORM>("task-filter", data);
  };

  // edited task id
  const updateCurrentEditedTaskID = useCallback((value: string | null) => {
    setCurrentEditedTaskID(value);
  }, []);
  // modal
  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpenModal(false);
    setCurrentEditedTaskID(null);
    setTaskFormData(formInitialState);
  }, []);

  // add new task
  const addNewTask = useCallback(
    (data: TASK_FORM) => {
      const newTask: TASK = {
        ...data,
        id: uuidV4(),
        status: checkIfOverDue(data.endDate) ? "overdue" : "pending",
      };
      const updatedData = [...taskList, newTask];
      updateTaskList([...updatedData]);
    },
    [taskList]
  );
  // complete task
  const completeTask = useCallback(
    (taskID: string) => {
      const updatedData = taskList.map((task) =>
        task.id === taskID
          ? {
              ...task,
              status: "completed" as STATUS,
            }
          : task
      );
      updateTaskList([...updatedData]);
    },
    [taskList]
  );
  // complete task
  const inCompleteTask = useCallback(
    (taskID: string) => {
      const updatedData = taskList.map((task) =>
        task.id === taskID
          ? {
              ...task,
              status: checkIfOverDue(task.endDate)
                ? "overdue"
                : ("pending" as STATUS),
            }
          : task
      );
      updateTaskList([...updatedData]);
    },
    [taskList]
  );
  // edit task
  const editTask = useCallback(
    (data: TASK_FORM, taskID: string) => {
      const updatedData = taskList.map((task) =>
        task.id === taskID
          ? {
              ...task,
              ...data,
              status: checkIfOverDue(data.endDate)
                ? "overdue"
                : ("pending" as STATUS),
            }
          : task
      );
      updateTaskList([...updatedData]);
    },
    [taskList]
  );
  // delete task
  const deleteTask = useCallback(
    (taskID: string) => {
      const updatedData = taskList.filter((task) => task.id !== taskID);
      updateTaskList([...updatedData]);
    },
    [taskList]
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);
  useEffect(() => {
    const searchRegex = new RegExp(debouncedSearchQuery.trim(), "i");
    let filterList = taskList.filter((task) => {
      if (
        (task.status === filterFormData.status ||
          filterFormData.status === "all") &&
        filterFormData.priority.includes(task.priority) &&
        task.title.match(searchRegex)
      ) {
        return true;
      } else {
        return false;
      }
    });
    filterList =
      filterFormData.endDate === "ascending"
        ? filterList.sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          )
        : filterFormData.endDate === "descending"
        ? filterList.sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          )
        : filterList;

    setFilteredTaskList(filterList);
  }, [taskList, filterFormData, debouncedSearchQuery]);

  const contextData = {
    // modal
    isOpenModal,
    openModal,
    closeModal,
    // darkMode
    isDarkMode,
    toggleDarkMode,
    // edit task id
    currentEditedTaskID,
    updateCurrentEditedTaskID,
    // task form
    taskFormData,
    setTaskFormData,
    // filter form
    filterFormData,
    setFilterFormData,
    updateFilterData,
    // search query
    searchQuery,
    updateSearchQuery,
    // task list
    taskList,
    filteredTaskList,
    addNewTask,
    editTask,
    deleteTask,
    completeTask,
    inCompleteTask,
  };
  return (
    <TaskManagerContext.Provider value={contextData}>
      {children}
    </TaskManagerContext.Provider>
  );
};
