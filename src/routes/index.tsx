import App from "@/App";
import Home from "@/pages/Home";
import PageNotFound from "@/components/Error/PageNotFound";
import { createBrowserRouter } from "react-router-dom";

const appPagesRoutes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default appPagesRoutes;
