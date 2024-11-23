import { InputAdornment } from "@mui/material";
import React from "react";
import { SearchOutlined } from "@material-ui/icons";
import { StyledTextField } from "../ui/custom-mui-style";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const Search = React.memo(() => {
  const { searchQuery, updateSearchQuery } = useTaskManagerContext();
  return (
    <div className="flex-1 max-w-[300px]">
      <StyledTextField
        variant="standard"
        value={searchQuery}
        placeholder="search"
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
  );
});
Search.displayName = "Search";

export default Search;
