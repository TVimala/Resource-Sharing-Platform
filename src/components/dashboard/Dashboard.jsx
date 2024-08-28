import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";

function Dashboard() {
  return (
    <div className='dashboard'>
      <h1>Username</h1>
      <div className='nav'>
      <ul className='links'>
      <li className='nav-item d-flex'>
      <MdHome className='fs-4 text-center' />
            <Link to="" className='nav-link text-dark align-items-center fs-4 rounded'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/uploads" className='nav-link text-dark fs-4 rounded'>Uploads</Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link text-dark fs-4 rounded'>Courses</Link>
          </li>
          <li className='nav-item'>
            <Link to="/saved" className='nav-link text-dark fs-4 rounded'>Saved</Link>
          </li>
          <li className='nav-item'>
            <Link to="/liked" className='nav-link text-dark fs-4 rounded'>Liked</Link>
          </li>
          <li className='nav-item'>
            <Link to="/logout" className='nav-link text-dark fs-4 rounded'>Logout</Link>
          </li>
      </ul>
      </div>
    </div>
  )
}

export default Dashboard
