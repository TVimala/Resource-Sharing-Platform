import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <h2>ResoLink</h2>
      </div>
      <ul className='nav justify-content-end'>
          <li className='nav-item'>
            <Link to="login" className='nav-link text-white'><h3>Login</h3></Link>
          </li>
      </ul>
    </div>
  )
}
export default Header
