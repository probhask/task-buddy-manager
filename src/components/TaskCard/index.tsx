import { Box, Card, Fade } from "@mui/material";
import React, { useCallback, useState } from "react";

import { TASK } from "@/types";
import TaskCardHeader from "../CardHeader";
import TaskInfo from "../TaskInfo";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const TaskCard = React.memo(({ task }: { task: TASK }) => {
  const { deleteTask } = useTaskManagerContext();
  const [deletedTaskID, setDeletedTaskID] = useState<string | null>(null);

  const handleDeleteTask = useCallback(() => {
    setDeletedTaskID(task.id);
    setTimeout(() => {
      deleteTask(task.id);
      setDeletedTaskID(null);
    }, 500);
  }, [task, deleteTask]);

  return (
    <Box
      sx={{
        flexShrink: 0,
        backgroundColor: `${task?.color}`,
        borderRadius: "8px",
        overflow: "hidden",
        // border: `2px solid ${task?.color}`,
      }}
    >
      <Fade in={deletedTaskID !== task.id} timeout={500}>
        <Card
          sx={{
            backgroundColor: `${task?.color}`,
            border: `2px solid ${task?.color}`,
            overflow: "visible",
            height: "100%",
            minHeight: "150px",
          }}
          className={`w-full shadow-lg px-2 py-4  transition-all`}
        >
          <TaskCardHeader
            task={task}
            status={task.status}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskInfo
            title={task.title}
            description={task.description}
            endDate={task.endDate}
          />
        </Card>
      </Fade>
    </Box>
  );
});
TaskCard.displayName = "Task Card";
export default TaskCard;
