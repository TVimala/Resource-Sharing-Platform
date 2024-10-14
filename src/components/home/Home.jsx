import React from 'react';
import './Home.css';
<<<<<<< HEAD
import backgroundImage from '/background.jpg'; // Vite asset handling

function Home() {
  // Apply background image to the home container
  const homeContainerStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

=======
import Totalusers from '../totalusers/Totalusers';
import { FaChevronDown } from "react-icons/fa6";
function Home() {
  const handleScroll = () => {
    const element = document.getElementById("projects");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
>>>>>>> d84ec1c27b41801070e325ec87112375937161bb
  return (
    <div className="home-container" style={homeContainerStyle}>
      {/* Header Section with Title and Button */}
      <header className="header-content">
        <h1 className="resource">Resource-Sharing-Platform</h1>
        <button className="start-btn">Get Started</button>
      </header>
      <button className="start btn fs-4 bg-white">START</button>

      {/* Second image design: Courses section */}
      {/* <div className='courseimg m-5 d-flex'>
        <CourseCards cardData={cardData} />
      </div> */}

      {/* Third image design: About section */}
      <div className='about-section d-flex m-3'>
        <div className='about-text'>
          <h2>About</h2>
          <p>
            ResoLink is a platform where students can upload and find academic resources with ease. Categorize and search for notes, study guides, and more. Join ResoLink to access a wide range of shared materials and elevate your learning experience.
          </p>
        </div>
        <img src='bookshelf.jpg' alt='Bookshelf' className='about-image' />
      </div>
      {/* <div className='d-flex justify-content-center'>
       <button className='dive px-4 py-2  border-0 fs-4 mb-5'onClick={handleScroll}>Dive in <FaChevronDown className='g-1'/>
       </button>
       </div> */}
      <div>
      {/* <Totalusers></Totalusers> */}
      </div>

    </div>
  );
}

export default Home;
