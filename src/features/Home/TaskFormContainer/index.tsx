import { Modal } from "@mui/material";
import React from "react";
import TaskForm from "@/components/TaskForm";
import TaskFormHeader from "./TaskFormHeader";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const TaskFormContainer = React.memo(() => {
  const { isOpenModal, closeModal, currentEditedTaskID } =
    useTaskManagerContext();
  return (
    <Modal
      open={isOpenModal}
      onClose={closeModal}
      className="no-scrollbar"
      sx={{
        backgroundColor: "rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        overflow: "auto",
        paddingTop: { xs: "0px", sm: "0px" },
        width: "100%",
      }}
    >
      <div className="bg-[var(--color-task-list)] text-[var(--color-text-primary)] px-4 py-8 sm:rounded-lg h-svh  sm:h-auto w-full sm:w-[600px]">
        <div className="w-full h-full">
          <TaskFormHeader
            isEditing={Boolean(currentEditedTaskID)}
            closeModal={closeModal}
          />
          {/* form */}
          <TaskForm />
        </div>
      </div>
    </Modal>
  );
});

TaskFormContainer.displayName = "TaskFormContainer";

export default TaskFormContainer;
