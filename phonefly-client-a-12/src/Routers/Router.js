import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error/Error";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Categories from "../Pages/Categories/Categories";
import AllBuyers from "../Pages/DashBoards/Admin/AllBuyers";
import AllSellers from "../Pages/DashBoards/Admin/AllSellers";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import PrivateRoute from "./PrivateRoute";
import SingleCategory from "../Pages/SingleCategory/SingleCategory";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import BuyerRoute from "./BuyerRoute";
import Blogs from "../Pages/Blogs/Blogs";
import AddProduct from "../Pages/DashBoards/Seller/AddProduct";
import Profile from "../Pages/Profile/Profile";
import MyProduct from "../Pages/DashBoards/Seller/MyProduct";
import MyBuyers from "../Pages/DashBoards/Seller/MyBuyers";
import ReportedItem from "../Pages/DashBoards/Admin/ReportedItem";
import MyOrders from "../Pages/DashBoards/Buyer/MyOrders";
import AdminDashboard from "../Pages/DashBoards/Admin/AdminDashboard";
import BuyerDashboard from "../Pages/DashBoards/Buyer/BuyerDashboard";
import SellerDashboard from "../Pages/DashBoards/Seller/SellerDashboard";
import MyWishlist from "../Pages/DashBoards/Buyer/MyWishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/Register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/all-phones",
        element: <Categories></Categories>,
      },
      {
        path: "/all-phones/:category",
        element: <SingleCategory></SingleCategory>,
        loader: ({ params }) =>
          fetch(
            `https://phonefly-server-a-12-rafiulaanam.vercel.app/all-phones/${params.category}`
          ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/reported-items",
        element: (
          <AdminRoute>
            <ReportedItem></ReportedItem>
          </AdminRoute>
        ),
      },
      {
        path: "/seller/dashboard",
        element: (
          <SellerRoute>
            <SellerDashboard></SellerDashboard>
          </SellerRoute>
        ),
      },
      {
        path: "/seller/dashboard/add-product",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/seller/dashboard/my-products",
        element: (
          <SellerRoute>
            <MyProduct></MyProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/seller/dashboard/my-buyers",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
      {
        path: "/buyer/dashboard",
        element: (
          <BuyerRoute>
            <BuyerDashboard></BuyerDashboard>
          </BuyerRoute>
        ),
      },
      {
        path: "/buyer/dashboard/my-orders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/buyer/dashboard/my-wishlist",
        element: (
          <BuyerRoute>
            <MyWishlist></MyWishlist>
          </BuyerRoute>
        ),
      },

      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
