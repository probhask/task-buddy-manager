import Filters from "@/components/Filters";
import React from "react";
import Search from "@/components/Search";
import logoImagePath from "/logo-task-buddy.png";

const Header = React.memo(() => {
  return (
    <header className="px-0 sm:px-2 md:px-5 lg:px-10 py-3 flex item-center justify-between">
      <div className="w-28 h-10 overflow-hidden ">
        <img
          src={logoImagePath}
          alt="task-buddy-logo"
          className=" object-contain w-full h-full "
        />
      </div>
      <div className="flex items-center gap-2">
        <Search />
        <Filters />
      </div>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
