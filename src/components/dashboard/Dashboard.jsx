import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
function Dashboard() {
  return (
    <div className='dashboard'>
      <h1>Username</h1>
      <div className='nav'>
      <ul className='links'>
      <li className='nav-item'>
            <Link to="" className='nav-link text-dark'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/uploads" className='nav-link text-dark'>Uploads</Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link text-dark'>Courses</Link>
          </li>
          <li className='nav-item'>
            <Link to="/saved" className='nav-link text-dark'>Saved</Link>
          </li>
          <li className='nav-item'>
            <Link to="/liked" className='nav-link text-dark'>Liked</Link>
          </li>
          <li className='nav-item'>
            <Link to="/logout" className='nav-link text-dark'>Logout</Link>
          </li>
      </ul>
      </div>
    </div>
  )
}

export default Dashboard
