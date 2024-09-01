import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";


function Dashboard() {
  return (
    <div className='dashboard'>
      <h1>Username</h1>
      <div className='nav'>
        <ul className='links'>
          <li className='nav-item'>
            <MdHome className='fs-2'/>
            <Link to="" className='nav-link text-dark fs-4'>Home</Link>
          </li>
          <li className='nav-item'>
          <FiUpload className='fs-2'/>
            <Link to="/uploads" className='nav-link text-dark fs-4'>Uploads</Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link text-dark fs-4'>Courses</Link>
          </li>
          <li className='nav-item'>
          <FaRegBookmark className='fs-2'/>
            <Link to="/saved" className='nav-link text-dark fs-4'>Saved</Link>
          </li>
          <li className='nav-item'>
          <FaHeart  className='fs-2'/>
            <Link to="/liked" className='nav-link text-dark fs-4'>Liked</Link>
          </li>
          <li className='nav-item'>
          <RiLogoutCircleLine  className='fs-2'/>
            <Link to="/logout" className='nav-link text-dark fs-4'>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
