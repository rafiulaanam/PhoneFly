import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import { AuthContext } from "../../../Context/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useBuyer from "../../../Hooks/useBuyer";
import useSeller from "../../../Hooks/useSeller";
import userPhoto from "../../../Assets/img/user.png";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);
  const navigate = useNavigate();

  const url = `https://phonefly-server-a-12-rafiulaanam.vercel.app/bookings?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  // const [data, setData] = useState([]);

  // axios
  //   .get(`https://phonefly-server-a-12-rafiulaanam.vercel.app/bookings?email=${user?.email}`)
  //   .then((res) => {
  //     const data = res.data;
  //     setData(data);
  //   })
  //   .catch((e) => console.log(e));

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((e) => console.log(e));
  };
  const dashboardBtn = (
    <>
      {isAdmin && (
        <>
          <Link
            to={"/admin/dashboard"}
            className="btn text-left btn-ghost mr-2"
          >
            Dashboard
          </Link>
        </>
      )}
      {isSeller && (
        <>
          <Link
            to={"/seller/dashboard"}
            className="btn text-left btn-ghost mr-2"
          >
            Dashboard
          </Link>
        </>
      )}
      {isBuyer && (
        <>
          <Link
            to={"/buyer/dashboard"}
            className="btn text-left btn-ghost mr-2"
          >
            Dashboard
          </Link>
        </>
      )}
    </>
  );

  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/all-phones"}>All Phone</Link>
      </li>
      <li>
        <Link to={"/blogs"}>Blogs</Link>
      </li>
    </>
  );
  console.log();
  const menuButton = (
    <>
      {user ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {bookings.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {bookings.length} Items
                </span>
                <span className="text-info">Subtotal: $999 </span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL ? user.photoURL : userPhoto}
                  alt="N/A"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {dashboardBtn}
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a href="#!">Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Link to={"/login"} className="btn text-left btn-ghost mr-2">
            Login
          </Link>

          <Link to={"/register"}>
            <PrimaryButton>Register</PrimaryButton>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
              <div className="">
                <Link to={"/login"} className="btn text-left btn-ghost mr-2">
                  Login
                </Link>

                <Link to={"/register"}>
                  <PrimaryButton>Register</PrimaryButton>
                </Link>
              </div>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            <img className="w-10" src={logo} alt="" />
            PhoneFly
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>

        <div className="navbar-end  lg:flex">
          <ul className="menu menu-horizontal p-0">{menuButton}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
