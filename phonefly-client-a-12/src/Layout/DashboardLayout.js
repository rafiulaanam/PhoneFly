import React, { useContext} from "react";
import { Link, Outlet} from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import DashboardNavbar from "../Pages/Shared/Navbar/DashboardNavbar";


const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);



  const menubar = (
    <>
      
      {isAdmin && (
        <>
        <li className="font-bold text-md">
        <Link to={"/admin/dashboard"}>Dashboard</Link>
      </li>
          <li className="font-bold text-md">
            <Link to={"/admin/dashboard/all-sellers"}>All Sellers</Link>
          </li>

          <li className="font-bold text-md  ">
            <Link to={"/admin/dashboard/all-buyers"}>All Buyers</Link>
          </li>
          <li className="font-bold text-md  ">
            <Link to={"/admin/dashboard/reported-items"}>Reported Items</Link>
          </li>
        </>
      )}
      {isSeller && (
        <>
        <li className="font-bold text-md">
        <Link to={"/seller/dashboard"}>Dashboard</Link>
      </li>
          <li className="font-bold text-md">
            <Link to={"/seller/dashboard/add-product"}>Add A Product</Link>
          </li>

          <li className="font-bold text-md">
            <Link to={"/seller/dashboard/my-products"}>My Products</Link>
          </li>
          <li className="font-bold text-md">
            <Link to={"/seller/dashboard/my-buyers"}>My Buyers</Link>
          </li>
        </>
      )}
      {isBuyer && (
        <>
        <li className="font-bold text-md">
        <Link to={"/buyer/dashboard"}>Dashboard</Link>
      </li>
          <li className="font-bold text-md">
            <Link to={"/buyer/dashboard/my-orders"}>My Orders</Link>
          </li>
          <li className="font-bold text-md">
            <Link to={"/buyer/dashboard/my-wishlist"}>My Wishlist</Link>
          </li>

        
        </>
      )}
    </>
  );
  return (
    <div>
      <DashboardNavbar></DashboardNavbar>

      <div className="drawer drawer-mobile ">
        <input id="dashboard-modal" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#E2E8EC] ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-modal" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  lg:bg-none md:bg-none text-base-content">
            {menubar}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
