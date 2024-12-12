import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import { ROOT_PATH } from "../settings/routePath";
import Layout from "../components/layout";

const Home = lazy(() => import("../pages"));
const Template = lazy(() => import("../pages/template"));
const NewTemplate = lazy(() => import("../pages/newTemplate"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_PATH} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Template />} />
          <Route path="new" element={<NewTemplate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
