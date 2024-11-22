import { InputAdornment } from "@mui/material";
import React from "react";
import { SearchOutlined } from "@material-ui/icons";
import { StyledTextField } from "../ui/custom-mui-style";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const Search = React.memo(() => {
  const { searchQuery, updateSearchQuery } = useTaskManagerContext();
  return (
    <div>
      <div>
        <StyledTextField
          variant="standard"
          value={searchQuery}
          onChange={(e) => {
            updateSearchQuery(e.target.value);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined
                    fontSize="small"
                    className="text-[var(--color-text-primary)]"
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
    </div>
  );
});
Search.displayName = "Search";

export default Search;
