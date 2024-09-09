import React from 'react';
import CourseCards from '../courseCards/CourseCards'
import cardData from '../cardData'
import './Home.css'

function Home() {
  return (
    <div className='home-container text-center'>
      <h1 className='resource p-3'>Resource-Sharing-Platform</h1>
     <button className="start btn fs-4  " >START</button>
     <div className='courseimg m-5 d-flex'>
       <CourseCards cardData={cardData}/>
       </div>
        </div>
  )
}
export default Home