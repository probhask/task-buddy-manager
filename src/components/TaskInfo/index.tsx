import { CalendarToday, DescriptionOutlined } from "@material-ui/icons";

import React from "react";

type TaskInfoProps = {
  title: string;
  description: string;
  endDate: Date;
};

const TaskInfo = React.memo(
  ({ description, endDate, title }: TaskInfoProps) => {
    return (
      <>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
          {title}
        </h3>
        <div className="flex gap-x-2 mb-1.5 ">
          <span>
            <DescriptionOutlined
              fontSize="small"
              className={`text-[var(--color-text-secondary)] w-0 h-0`}
            />
          </span>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] ">
            {description}
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <span>
            <CalendarToday
              fontSize="small"
              className={`text-[var(--color-text-secondary)] w-0 h-0`}
            />
          </span>
          <p className="text-[0.65rem] leading-[1.5rem] font-semibold bg-gray-600 text-[var(--color-card-bg)]  px-2 rounded-2xl">
            Due date: {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
      </>
    );
  }
);

export default TaskInfo;
