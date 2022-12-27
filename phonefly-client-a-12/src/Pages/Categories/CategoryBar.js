import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBar = () => {
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal p-0">
      <li><Link to={'/all-phones/Apples'}>Apple</Link></li>
      <li><Link to={'/all-phones/Samsung'}>Samsung</Link></li>
      <li><Link to={'/all-phones/Xiaomi'}>Xiaomi</Link></li>
      <li><Link to={'/all-phones/Oppo'}>Oppo</Link></li>
      <li><Link to={'/all-phones/Vivo'}>Vivo</Link></li>
    
      
    </ul>
  </div>
  <div className="navbar-end">
   
  </div>
</div>
    );
};

export default CategoryBar;