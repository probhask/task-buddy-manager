import { Fab, styled, Tooltip } from "@mui/material";

import { Add } from "@material-ui/icons";
import FilterForm from "@/components/FilterForm";
import { TaskGroup } from "@/components";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const Home = () => {
  const { openModal, filterFormData, filteredTaskList } =
    useTaskManagerContext();

  return (
    <div className="w-full flex justify-between gap-x-4 gap-y-20 p-2 h-full container mx-auto ">
      <TaskGroup
        groupStatus={filterFormData?.status}
        taskList={filteredTaskList}
      />
      <div className="hidden sm:block relative">
        <FilterForm />
      </div>
      <Tooltip title="Add New Task" placement="top">
        <StyledAddMoreTaskFab onClick={openModal}>
          <Add />
        </StyledAddMoreTaskFab>
      </Tooltip>
    </div>
  );
};

export default Home;

const StyledAddMoreTaskFab = styled(Fab)({
  position: "fixed",
  bottom: 16,
  left: 16,
  backgroundColor: "var(--color-primary)",
  color: "#fff",
  ":hover": {
    backgroundColor: "var(--color-primary)",
  },
});
