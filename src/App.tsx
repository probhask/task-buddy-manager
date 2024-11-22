import Header from "@/layout/Header";
import { Outlet } from "react-router-dom";
import TaskFormContainer from "@/features/Home/TaskFormContainer";
import { TaskManagerContextProvider } from "@/context";

function App() {
  return (
    <TaskManagerContextProvider>
      <div className=" w-full min-h-screen ">
        <Header />
        <Outlet />
        <TaskFormContainer />
      </div>
    </TaskManagerContextProvider>
  );
}

export default App;
