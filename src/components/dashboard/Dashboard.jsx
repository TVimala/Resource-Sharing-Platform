import React, { useContext, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { FaRegBookmark, FaUserEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { userLoginContext } from '../../contexts/userLoginContext';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const { logoutUser, currentUser } = useContext(userLoginContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev); // Toggle the sidebar state
    };

    return (
        <div className='dashboard-container'>
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? '✖' : '☰'} {/* Toggle icon */}
                </button>
                <div className="profile">
                    <div className="image-placeholder">
                        <img src="profile.png" alt="" />
                    </div>
                    {isSidebarOpen && <h1>{currentUser.username}</h1>} {/* Display username only if sidebar is open */}
                </div>

                <ul className='dashboard-links'>
                    <li className='nav-item'>
                        <MdHome className='fs-2' />
                        {isSidebarOpen && <Link to="/profile" className='nav-link fs-4'>Profile</Link>}
                    </li>
                    <li className='nav-item'>
                        <ImBooks className='fs-2' />
                        {isSidebarOpen && <Link to='/courses' className='nav-link fs-4'>Courses</Link>}
                    </li>
                    <li className='nav-item'>
                        <FiUpload className='fs-2' />
                        {isSidebarOpen && <Link to="/uploads" className='nav-link fs-4'>Uploads</Link>}
                    </li>
                    <li className='nav-item'>
                        <FaRegBookmark className='fs-2' />
                        {isSidebarOpen && <Link to="/saved" className='nav-link fs-4'>Saved</Link>}
                    </li>
                    <li className='nav-item'>
                        <FaHeart className='fs-2' />
                        {isSidebarOpen && <Link to="/liked" className='nav-link fs-4'>Liked</Link>}
                    </li>
                    <li className='nav-item'>
                        <RiLogoutCircleLine className='fs-2' />
                        {isSidebarOpen && <button className='nav-link fs-4' onClick={logoutUser}>Logout</button>}
                    </li>
                </ul>
            </aside>

            <main className='outlet-container'>
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;
