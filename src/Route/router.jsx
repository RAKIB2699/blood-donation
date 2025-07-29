import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import SearchDonors from "../SearchDonor/SearchDonors";
import PendingRequests from "../PendingRequests/PendingRequests";
import DashboardLayout from "../LayOut/DashboardLayout";
import AllUsers from "../dashboard/admin/all-users/AllUsers";
import AllBloodDonationRequest from "../dashboard/admin/allBloodDonationRequest/AllBloodDonationRequest";
import ContentManagement from "../dashboard/admin/contentManagement/ContentManagement";
import CreateDonationRequest from "../dashboard/donor/createDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../dashboard/donor/myDonationRequests/MyDonationRequests";
import Dashboard from "../dashboard/dashboard/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children:[
        {
         index:true,
         Component : Home  
        },
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/search',
          Component: SearchDonors
        },
        {
          path: '/request',
          Component: PendingRequests
        }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'all-users',
        Component: AllUsers
      },
      {
        path: 'all-donation-requests',
        Component: AllBloodDonationRequest
      },
      {
        path: 'content-management',
        Component: ContentManagement,
      },
      {
        path: 'create-donation-request',
        Component: CreateDonationRequest,
      },
      {
        path: 'my-donation-requests',
        Component: MyDonationRequests
      }
    ]
  }
]);

export default router;