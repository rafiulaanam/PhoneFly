import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { AuthContext } from "../../../Context/AuthProvider";
import userPhoto from "../../../Assets/img/user.png"


const DashboardNavbar = () => {
const {logoutUser,user}=useContext(AuthContext)
const navigate = useNavigate()


 const handleLogout=()=>{
  logoutUser()
  .then(()=>{
    localStorage.removeItem('accessToken')
    navigate('/')
  })
  .catch(e=>console.log(e))
 }


  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
        <Link to={"/all-phones"}>All Phone</Link>
      </li>
    
      
    </>
  );

 

  return (
    <div>
        <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label htmlFor="dashboard-modal" tabIndex={0} className="btn btn-ghost lg:hidden">
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
      <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">0</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">0 Items</span>
          <span className="text-info">Subtotal: $000</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
 
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
      
        <img src={user?.photoURL ? user.photoURL : userPhoto}  alt="N/A"/>
      </div>
    </label>
    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <Link to={'/profile'} className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li><a href='#!'>Settings</a></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </ul>
  </div>
 
  </div>
</div>
      </div>
    </div>
    
   
  );
};

export default DashboardNavbar;
