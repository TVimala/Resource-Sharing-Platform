import React from 'react'
import CourseCards from '../courseCards/CourseCards'
import cardData from '../cardData'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <h1 className='resource p-5'>Resource-Sharing-Platform</h1>
     <button className=" start btn">START</button>
       <div className='courseimg m-5 flex'>
       <CourseCards cardData={cardData}/>
       </div>
        </div>
  )
}
export default Home