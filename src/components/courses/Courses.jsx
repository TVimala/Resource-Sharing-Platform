import React from 'react'
import './Courses.css'
import CourseCards from '../courseCards/CourseCards'
import cardData from '../cardData'

function Courses() {
  return (
    <div className='courseimg m-5 flex'>
    <CourseCards cardData={cardData}/>
    </div>
  )
}

export default Courses
