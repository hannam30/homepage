import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import UnseLayout from "../pages/unse/page";
import {
  UnseLanding,
  UnseBirth,
  UnsePreset,
  UnseComingSoon,
} from "../pages/unse/steps";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/unse",
    element: <UnseLayout />,
    children: [
      { index: true, element: <UnseLanding /> },
      { path: "birth", element: <UnseBirth /> },
      { path: "preset", element: <UnsePreset /> },
      // 4페이지(/result)·엔진은 배포하지 않음. 추후 phone_choice 연결 시 교체
      { path: "coming-soon", element: <UnseComingSoon /> },
      { path: "result", element: <UnseComingSoon /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
