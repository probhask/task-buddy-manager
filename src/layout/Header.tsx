import Filters from "@/components/Filters";
import React from "react";
import Search from "@/components/Search";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import logoImagePath from "/logo-task-buddy.png";

const Header = React.memo(() => {
  return (
    <header className="px-0  py-3 flex flex-col sm:flex-row item-center justify-between gap-y-6 sticky top-0 z-10 bg-[var(--color-bg)]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-52 h-16 sm:w-40 sm:h-14 overflow-hidden ">
          <img
            src={logoImagePath}
            alt="task-buddy-logo"
            className=" object-contain w-full h-full "
          />
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end  gap-2">
        <Search />
        <Filters />
        <ToggleDarkMode />
      </div>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
