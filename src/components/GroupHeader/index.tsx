import React, { useMemo } from "react";

import { STATUS } from "@/types";
import { getGroupColor } from "@/utils/taskUtility";

const GroupHeader = React.memo(
  ({
    groupStatus,
    taskCount = 0,
  }: {
    groupStatus: STATUS | "all";
    taskCount: number;
  }) => {
    const groupColor: string = useMemo(
      () => getGroupColor(groupStatus),
      [groupStatus]
    );
    return (
      <div
        style={{
          color: `${groupColor}`,
          borderTopColor: `${groupColor}`,
        }}
        className={`w-full text-[${groupColor}] bg-[var(--color-card-bg)]  border-t-[5px] border-t-[${groupColor}] flex gap-2 items-center  px-2 py-1  mb-2 rounded  shadow sticky top-0`}
      >
        <h2 className="capitalize">
          {groupStatus === "all" ? "All Tasks" : groupStatus}
        </h2>
        <span className="text-[var(--color-text-secondary)] text-sm">
          ({taskCount})
        </span>
      </div>
    );
  }
);

export default GroupHeader;
