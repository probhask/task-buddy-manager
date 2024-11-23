import { NightsStay, WbSunnySharp } from "@material-ui/icons";

import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const ToggleDarkMode = React.memo(() => {
  const { isDarkMode, toggleDarkMode } = useTaskManagerContext();
  return (
    <div className="order-3">
      <Tooltip title={isDarkMode ? "Dark Mode" : "Light Mode"} placement="top">
        <IconButton onClick={toggleDarkMode}>
          {isDarkMode ? (
            <NightsStay className="text-white" />
          ) : (
            <WbSunnySharp className="text-[#FFC107]" />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
});

export default ToggleDarkMode;
