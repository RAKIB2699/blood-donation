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
import RequestDetails from "../RequestDetails/RequestDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import Blog from "../shared/Blog/Blog";
import BlogDetails from "../shared/BlogDetails/BlogDetails";
import CommonRoute from "../Provider/CommonRoute";
import AdminRoute from "../Provider/adminRoute";
import FundingPage from "../founding/FoundingPage";
import ErrorPage from "../ErrorPage/ErrorPage";




const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    errorElement: <ErrorPage></ErrorPage>,
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
        },
        {
           path: "/donation-request/:id",
          element : <PrivateRoute>
            <RequestDetails />
          </PrivateRoute>
        },
        {
          path: '/blog',
          Component : Blog
        },
        {
          path: '/blogs/:id',
          Component: BlogDetails
        },
        {
          path: '/founding-page',
          element: <PrivateRoute><FundingPage/></PrivateRoute>
        }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
      {
        path: 'all-users',
        element:<AdminRoute><AllUsers/></AdminRoute>
      },
      {
        path: 'all-donation-requests',
        element: <CommonRoute><AllBloodDonationRequest/></CommonRoute>
      },
      {
        path: 'content-management',
        element: <CommonRoute><ContentManagement/></CommonRoute>
      },
      {
        path: 'create-donation-request',
        element:<PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>
      },
      {
        path: 'my-donation-requests',
        element: <PrivateRoute><MyDonationRequests></MyDonationRequests></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: `edit-donation-request/:id`,
        loader : ({params})=>fetch(`http://localhost:3000/donation-req/${params.id}`),
        element: <PrivateRoute><EditRequest/></PrivateRoute>
      },
      {
        path: 'add-blog',
        element: <CommonRoute><AddBlog/></CommonRoute>
      }
    ]
  }
]);

export default router;