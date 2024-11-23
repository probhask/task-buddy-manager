import { Close } from "@material-ui/icons";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const TaskFormHeader = React.memo(
  ({
    closeModal,
    isEditing,
  }: {
    isEditing: boolean;
    closeModal: () => void;
  }) => {
    return (
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-xl font-bold flex-1 text-center">
          {isEditing ? "Edit Task" : "Add New Task"}
        </h1>
        <Tooltip title="close" placement="top">
          <IconButton size="small" onClick={closeModal}>
            <Close
              fontSize="small"
              className="text-[var(--color-text-primary)]"
            />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
);

export default TaskFormHeader;
