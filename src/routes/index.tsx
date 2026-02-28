import { createBrowserRouter } from "react-router-dom"
import AppShell from "../components/layout/AppShell"
import CalculatorPage from "../pages/CalculatorPage"
import FranchisePage from "../pages/FranchisePage"
import NotFoundPage from "../pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <CalculatorPage /> },
      { path: "franchise", element: <FranchisePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])