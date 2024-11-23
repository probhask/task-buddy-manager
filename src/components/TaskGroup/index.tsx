import { STATUS, TASK } from "@/types";

import GroupCardList from "../GroupCardList";
import GroupHeader from "../GroupHeader";
import React from "react";

type TaskGroupProps = {
  taskList: TASK[];
  groupStatus: STATUS | "all";
};

const TaskGroup = React.memo(({ taskList, groupStatus }: TaskGroupProps) => {
  return (
    <div className="flex-1 flex flex-col sm:min-w-[65%] w-auto max-w-[600px]  overflow-y-auto ">
      {/* header */}
      <GroupHeader
        groupStatus={groupStatus}
        taskCount={taskList?.length ?? 0}
      />

      {/* group card */}
      <GroupCardList taskList={taskList} groupStatus={groupStatus} />
    </div>
  );
});
TaskGroup.displayName = "Task Group";
export default TaskGroup;
