
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className='home-container text-center'>
      {/* First image design: Header and button */}
      <h1 className='resource p-3'>Resource-Sharing-Platform</h1>

      <button className="start btn fs-4 bg-white">START</button>

      {/* Second image design: Courses section */}
      {/* <div className='courseimg m-5 d-flex'>
        <CourseCards cardData={cardData} />
      </div> */}

      {/* Third image design: About section */}
      <div className='about-section d-flex'>
        <div className='about-text'>
          <h2>About</h2>
          <p>
          ResoLink is a platform where students can upload and find academic resources with ease. Use tags to categorize and search for notes, study guides, and more. Join ResoLink to access a wide range of shared materials and boost your learning.          </p>
        </div>
        <img src='bookshelf.jpg' alt='Bookshelf' className='about-image' />
      </div>
    </div>
  );
}

export default Home;

