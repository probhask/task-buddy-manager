import {
  CheckCircle,
  DeleteForever,
  Edit,
  PanoramaFishEye,
} from "@material-ui/icons";
import React, { useMemo } from "react";

import { IconButton, Tooltip } from "@mui/material";
import { STATUS, TASK } from "@/types";
import { getPriorityColor } from "@/utils/taskUtility";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const TaskCardHeader = React.memo(
  ({
    task,
    handleDeleteTask,
    status,
  }: {
    task: TASK;
    handleDeleteTask: () => void;
    status: STATUS;
  }) => {
    const {
      updateCurrentEditedTaskID,
      openModal,
      setTaskFormData,
      completeTask,
      inCompleteTask,
    } = useTaskManagerContext();

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
          <Tooltip title="edit" placement="top">
            <IconButton
              sx={{
                color: "var(--color-text-primary)",
                ":hover": { backgroundColor: "var(--color-btn-hover)" },
              }}
              size="small"
              className="active:scale-90 transition-all"
              onClick={handleTaskEdit}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              status === "completed" ? "Task Incomplete" : "Task Completed"
            }
            placement="top"
          >
            <IconButton
              sx={{
                color: "var(--color-text-primary)",
                ":hover": { backgroundColor: "var(--color-btn-hover)" },
              }}
              size="small"
              className="active:scale-90 transition-all"
              onClick={() =>
                status === "completed"
                  ? inCompleteTask(task.id)
                  : completeTask(task.id)
              }
            >
              {status === "completed" ? (
                <CheckCircle fontSize="small" />
              ) : (
                <PanoramaFishEye />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Task" placement="top">
            <IconButton
              sx={{
                color: "var(--color-text-primary)",
                ":hover": { backgroundColor: "var(--color-btn-hover)" },
              }}
              size="small"
              className="active:scale-90 transition-all"
              onClick={handleDeleteTask}
            >
              <DeleteForever fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
);

export default TaskCardHeader;
