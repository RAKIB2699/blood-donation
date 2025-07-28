import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children:[
        {
         index:'true',
         Component : Home  
        },
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/login',
          Component: Login
        }
    ]
  },
]);

export default router;