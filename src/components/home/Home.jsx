import React from 'react'
import CourseCards from '../courseCards/CourseCards'
import cardData from '../cardData'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <div className='image'>
     <img src="home.jpg" alt="" />
     <button className=" start btn btn-primary">Start</button>
     </div>
        <CourseCards cardData={cardData} />
    </div>
  )
}

export default Home