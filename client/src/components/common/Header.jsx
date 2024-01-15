import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './Header.css'


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate()

  const handleLogout = ()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    navigate("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // const logout=()=>{
  //       localStorage.clear()
  //       window.location.reload()
  //     }

  return (
    <nav className=" p-4" style={{backgroundColor:"darkslategray"}}>
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo or Brand */}
        <div className=" text-lg font-semibold"  style={{ color: "burlywood" }}>
          YourLogo
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-4" style={{listStyle:"none"}}>
        <NavLink to={'/home'} className="text-white">Home</NavLink>
        <NavLink to={'posts'} className="text-white">Posts</NavLink>
             <NavLink to={'settings'} className="text-white">Profile</NavLink>
             <NavLink to={'allpost'} className="text-white">AllPost</NavLink>
             <NavLink to={'/vdocall'} className="text-white">Video call</NavLink>
             <NavLink to={'/message'} className="text-white">Groupchat</NavLink>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
        <button onClick={handleLogout} className=" hover:bg-emerald-950 text-white px-4 py-2 rounded" style={{backgroundColor:"burlywood"}}>Log out</button>
          <Link   to={'settings'}><button className="  text-white px-4 py-2 rounded" style={{backgroundColor:"burlywood"}}>Settings</button></Link> 
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} bg-gray-800 text-white p-4`}>
      <NavLink to={'/home'} className="text-white">Home</NavLink>
        <NavLink to={'posts'} className="text-white">Posts</NavLink>
             <NavLink to={'settings'} className="text-white">Profile</NavLink>
             <NavLink to={'allpost'} className="text-white">AllPost</NavLink>
        <div className="mt-4 space-y-2">
           <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Log out
           </button>
          <Link   to={'settings'}><button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Settings</button></Link> 
        </div>
      </div>
    </nav>
  );
};


const NavLink = ({ to, children }) => (
    <li className="mb-2 lg:mb-0 lg:ml-6">
      <Link
        to={to}
        className="block lg:inline-block px-2 py-1 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white text-decoration-none"
        style={{ color: "burlywood" }}
      >
        {children}
      </Link>
    </li>
  );
export default Header;

