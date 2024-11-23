import { IconButton, Menu, Tooltip } from "@mui/material";
import React, { useState } from "react";

import FilterForm from "../FilterForm";
import { FilterList } from "@material-ui/icons";

const Filters = React.memo(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="sm:hidden  -order-1">
      <Tooltip title="Filters" placement="top">
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            display: { sx: "block", sm: "none" },
          }}
        >
          <FilterList className="text-[var(--color-text-primary)]" />
        </IconButton>
      </Tooltip>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        color="var(--color-bg)"
        sx={{
          ".MuiList-root": {
            backgroundColor: "var(--color-task-list)",
            color: "var(--color-text-secondary)",
          },
        }}
      >
        <FilterForm closeMenu={handleCloseMenu} />
      </Menu>
    </div>
  );
});
Filters.displayName = "Filters";
export default Filters;
