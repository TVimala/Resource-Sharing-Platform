import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        MyApp
      </div>
      <ul className='nav justify-content-end'>
          <li className='nav-item'>
            <Link to="login" className='nav-link text-white'>Login</Link>
          </li>
      </ul>
    </div>
  )
}

export default Header
