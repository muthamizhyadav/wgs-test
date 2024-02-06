import { routerType } from "./router-types";

import Landing from "../pages/Landing"

const Pages: routerType[] = [
    {
      title: "Landing",
      path: "/",
      element: <Landing />,
    },
  ];
  
  export default Pages;