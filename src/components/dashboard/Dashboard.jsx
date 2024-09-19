import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { Outlet } from 'react-router-dom';
function Dashboard() {
  let {logoutUser,currentUser}=useContext(userLoginContext)

  return (
    <div className='dashboard-container'>
    <aside className='dashboard-sidebar'>
      <h1>{currentUser.username}</h1>
      <ul className='dashboard-links'>
        <li className='nav-item'>
          <MdHome className='fs-2'/>
          <Link to="/profile" className='nav-link text-dark fs-4'>Profile</Link>
        </li>
        <li className='nav-item'>
          <ImBooks className='fs-2'/>
          <Link to='/courses' className='nav-link text-dark fs-4'>Courses</Link>
        </li>
        <li className='nav-item'>
          <FiUpload className='fs-2'/>
          <Link to="/uploads" className='nav-link text-dark fs-4'>Uploads</Link>
        </li>
        <li className='nav-item'>
          <FaRegBookmark className='fs-2'/>
          <Link to="/saved" className='nav-link text-dark fs-4'>Saved</Link>
        </li>
        <li className='nav-item'>
          <FaHeart className='fs-2'/>
          <Link to="/liked" className='nav-link text-dark fs-4'>Liked</Link>
        </li>
        <li className='nav-item'>
          <RiLogoutCircleLine className='fs-2'/>
          <button className='nav-link text-dark fs-4' onClick={logoutUser}>Logout</button>
        </li>
      </ul>
    </aside>

    <main className='outlet-container'>
      <Outlet/>
    </main>
  </div>
  )
}

export default Dashboard
