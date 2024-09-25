import { createBrowserRouter, Navigate } from "react-router-dom";

import MessagePage from "../pages/message/MessagePage";

import { DashboardLayout } from "../layouts/DashboardLayout";
import ComparePage from "../pages/compare/ComparePage";

export const menuRoutes = [
  {
    to: "/chat",
    icon: "fa-solid fa-spell-check",
    title: "Chat",
    description: "Ask anything within BDO scope",
    component: <MessagePage />,
  },
  {
    to: "/chat/compare",
    icon: "fa-solid fa-code-compare",
    title: "Compare",
    description: "Compare different documents",
    component: <ComparePage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);
