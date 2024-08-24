import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
      <ul className='nav justify-content-end'>
                <li className='nav-item'>
                    <Link to="" className='nav-link text-white'>Home</Link>
                 </li>
                 <li className='nav-item'>
                    <Link to="login" className='nav-link text-white'>Login</Link>
                 </li>
            </ul>
    </div>
  )
}

export default Header
