import React from 'react';
import './Home.css';
import backgroundImage from '/background.jpg'; // Vite asset handling

function Home() {
  // Apply background image to the home container
  const homeContainerStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  return (
    <div className="home-container" style={homeContainerStyle}>
      {/* Header Section with Title and Button */}
      <header className="header-content">
        <h1 className="resource">Resource-Sharing-Platform</h1>
        <button className="start-btn">Get Started</button>
      </header>

      {/* About Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>About ResoLink</h2>
          <p>
            ResoLink is a platform where students can upload and find academic resources with ease. Categorize and search for notes, study guides, and more. Join ResoLink to access a wide range of shared materials and elevate your learning experience.
          </p>
        </div>
        <img src="bookshelf.jpg" alt="Bookshelf" className="about-image" />
      </section>
    </div>
  );
}

export default Home;
