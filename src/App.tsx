import Header from "@/layout/Header";
import { Outlet } from "react-router-dom";
import TaskFormContainer from "@/features/Home/TaskFormContainer";
import { TaskManagerContextProvider } from "@/context";

function App() {
  return (
    <TaskManagerContextProvider>
      <div className=" w-full min-h-screen container mx-auto flex justify-center py-4">
        <div className="h-full w-full sm:w-[100%]  lg:w-[80%]">
          <Header />
          <Outlet />
          <TaskFormContainer />
        </div>
      </div>
    </TaskManagerContextProvider>
  );
}

export default App;
