import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import backgroundImage from '/background.jpg'; // Vite asset handling
import Totalusers from '../totalusers/Totalusers';
function Home() {
  const navigate = useNavigate(); // Hook for navigation

  // Apply background image to the home container
  const homeContainerStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  // Scroll to the About section when "About" button is clicked
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <>
     {/* Header Section */}
    <div className='header'>
    <div className='logo'>
      <h2>ResoLink</h2>
    </div>
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link to="login" className='nav-link text-white'>
          <h3>Login</h3>
        </Link>
      </li>
      <li className='nav-item'>
        <button onClick={handleScrollToAbout} className='nav-link text-white'>
          <h3>About</h3>
        </button>
      </li>
    </ul>
  </div>
    <div className="home-container" style={homeContainerStyle}>
      {/* Main Section with Title and Button */}
      <header className="header-content">
        <h1 className="resource">Resource-Sharing Platform</h1>
        <button className="start-btn" onClick={handleStartClick}>Get Started</button>
      </header>
      <Totalusers/>

      {/* About Section */}
      <div className='about-section d-flex m-3' id='about'>
        <div className='about-text'>
          <h2>About</h2>
          <p>
            ResoLink is a platform where students can upload and find academic resources with ease. Categorize and search for notes, study guides, and more. Join ResoLink to access a wide range of shared materials and elevate your learning experience.
          </p>
        </div>
        <img src='bookshelf.jpg' alt='Bookshelf' className='about-image' />
      </div>

      {/* Copyright Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Resource-Sharing-Platform. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}

export default Home;
