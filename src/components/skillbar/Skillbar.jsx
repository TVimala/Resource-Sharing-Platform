import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Skillbar.css'
const Skillbar = () => {
   const [courseUploadCounts, setCourseUploadCounts] = useState([]);
  const [msg,setMsg] = useState("")
  async function fetchCourseCounts() {
    try {
      let res = await fetch(`http://localhost:4000/course-api/courses/upload-counts`); 

      if (res.ok) {
        setCourseCounts(data.courseUploadCounts); // Assuming the backend returns a `courseUploadCounts` object
        setMsg(''); // Clear any previous error message
      } else {
        setMsg(data.error); // Set an error message if the request fails
      }
    } catch (err) {
      console.log(err);
      setMsg('An error occurred while fetching course upload counts');
    }
  }
  
  useEffect(() => {
    fetchCourseCounts(); // Fetch course counts when the component mounts
  }, []);
  

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Course Upload Progress</h4>      
      {courseUploadCounts.length > 0 ? (
        courseUploadCounts.map((course, index) => {
          const percentage = course.uploadCount; // Assuming this is the percentage, or adjust as needed
          return (
            <div key={index} className="mb-3">
              <span>{course.courseName}</span>
              <div className="progress" style={{ height: '25px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${percentage}%` }}
                  aria-valuenow={course.uploadCount}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {course.uploadCount} Uploads
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No course upload data available</p>
      )}
    </div>
  );
};

export default Skillbar;
