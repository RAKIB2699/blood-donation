import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Home/Home";



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children:[
        {
         index:'true',
         Component : Home  
        },
    ]
  },
]);

export default router;