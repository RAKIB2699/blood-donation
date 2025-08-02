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
import Profile from "../dashboard/Profile/Profile";
import EditRequest from "../dashboard/donor/EditRequest/EditRequest";
import AddBlog from "../dashboard/admin/contentManagement/addblog/AddBlog";



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
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: `edit-donation-request/:id`,
        loader : ({params})=>fetch(`http://localhost:3000/donation-req/${params.id}`),
        Component : EditRequest
      },
      {
        path: 'add-blog',
        Component : AddBlog
      }
    ]
  }
]);

export default router;