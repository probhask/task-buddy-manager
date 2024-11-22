import "./index.css";

import { ErrorBoundary, Loading } from "@/components";
import { StrictMode, Suspense } from "react";

import { RouterProvider } from "react-router-dom";
import appPagesRoutes from "@/routes/index.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <RouterProvider
          router={appPagesRoutes}
          future={{ v7_startTransition: true }}
        />
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
