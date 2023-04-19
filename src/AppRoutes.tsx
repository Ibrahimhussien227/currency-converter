import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Currencies from "./pages/Currencies";
import Exchanges from "./pages/Exchanges";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Currencies />,
      },
      {
        path: "/exchange-rate",
        element: <Exchanges />,
      },
    ],
  },
]);

export default router;
