import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { routerType } from "./router-types";
import Pages from "./router";

const Router = () => {
  const navigate = useNavigate()

  const pageRoutes = Pages.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element}/>
  });

  return (
    <BrowserRouter>
      <Routes>{pageRoutes}</Routes>
    </BrowserRouter>);
};
export default Router;