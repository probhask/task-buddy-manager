import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full h-svh flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 bg-[var(--color-completed)] text-[var( --color-text-primary)] rounded p-5">
        <h1 className="text-3xl font-extrabold">Page Not Found !</h1>
        <Link to="/">
          <Button
            sx={{
              backgroundColor: `var(--color-text-primary)`,
              color: `var(--color-text-secondary)`,
            }}
          >
            Go back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
