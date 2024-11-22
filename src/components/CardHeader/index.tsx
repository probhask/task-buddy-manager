import { CheckCircle, DeleteForever, Edit } from "@material-ui/icons";
import React, { useMemo } from "react";

import { IconButton } from "@mui/material";
import { TASK } from "@/types";
import { getPriorityColor } from "@/utils/taskUtility";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const TaskCardHeader = React.memo(
  ({
    task,
    handleDeleteTask,
  }: {
    task: TASK;
    handleDeleteTask: () => void;
  }) => {
    const { updateCurrentEditedTaskID, openModal, setTaskFormData } =
      useTaskManagerContext();

    const cardPriorityColor = useMemo(
      () => getPriorityColor(task.priority),
      [task.priority]
    );

    const handleTaskEdit = () => {
      const { id, ...restFormData } = task;
      updateCurrentEditedTaskID(id);
      setTaskFormData(restFormData);
      openModal();
    };
    return (
      <div className="flex items-center justify-between">
        <h5
          style={{
            backgroundColor: cardPriorityColor,
          }}
          className={`text-[var(--color-card-bg)] bg-[${cardPriorityColor}] w-fit text-xs font-semibold rounded-2xl px-2 pb-1 text-center py-0.5 mb-1.5`}
        >
          {task.priority}
        </h5>

        <div className="flex items-center justify-self-center">
          <IconButton
            sx={{
              color: "#15803d",
              ":hover": { backgroundColor: "rgb(74 222 128 / 0.1)" },
            }}
            size="small"
            className="active:scale-90 transition-all"
            onClick={handleTaskEdit}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              color: "#15803d",
              ":hover": { backgroundColor: "rgb(74 222 128 / 0.1)" },
            }}
            size="small"
            className="active:scale-90 transition-all"
            onClick={handleTaskEdit}
          >
            <CheckCircle fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              color: "#C62E2E",
              ":hover": { backgroundColor: "rgb(220 38 38 / 0.1)" },
            }}
            size="small"
            className="active:scale-90 transition-all"
            onClick={handleDeleteTask}
          >
            <DeleteForever fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }
);

export default TaskCardHeader;
