import { Divider, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { STATUS, TASK } from "@/types";

import TaskCard from "../TaskCard";
import { getGroupComplimentaryText } from "@/utils/taskUtility";

const GroupCardList = React.memo(
  ({
    taskList,
    groupStatus,
  }: {
    taskList: TASK[];
    groupStatus: STATUS | "all";
  }) => {
    const groupText: string = useMemo(
      () => getGroupComplimentaryText(groupStatus),
      [groupStatus]
    );

    return (
      <div className="flex-1 flex flex-col gap-6 rounded w-full h-full bg-[var(--color-task-list)] shadow border border-[var(--color-divider)] p-2 md:p-4 py-4 overflow-y-auto no-scrollbar">
        {taskList && taskList?.length > 0 ? (
          taskList.map((task) => (
            <React.Fragment key={task.id}>
              <TaskCard task={task} />
              <Divider
                sx={{
                  borderColor: `var(--color-divider)`,
                  borderWidth: "1.5px",
                }}
              />
            </React.Fragment>
          ))
        ) : (
          <Typography className="text-[var(--color-text-secondary)] font-semibold text-center ">
            No task found
          </Typography>
        )}

        <p className="text-[var(--color-text-secondary)]  text-xs font-semibold text-center ">
          {groupText}
        </p>
      </div>
    );
  }
);

export default GroupCardList;
