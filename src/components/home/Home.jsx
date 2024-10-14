
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
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