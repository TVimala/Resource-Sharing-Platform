import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
// import FileDisplay from '../filedisplay/FileDisplay'; // Import the FileDisplay component
import SearchBar from '../searchBar/SearchBar'
import UploadBar from '../uploadBar/UplaodBar';
import {userLoginContext} from '../../contexts/userLoginContext'

function CourseDetails () {

  let { domain } = useParams(); // Extract the domain from the URL
  let [files, setFiles] = useState([]); 
  let [error, setError] = useState(null); // State to handle errors

  const { username, userId } = useContext(userLoginContext);
  console.log('username:', username);
  console.log('userId:', userId);

  // Optionally format the domain string for display
  const formattedDomain = domain.replace(/-/g, ' ');

   // Fetch the files from the backend
   async function fetchFiles(){
    try {
      let res = await fetch(`https://file-api-xi.vercel.app/course-api/${domain}/files`);
     //let res = await fetch(`https://file-api-huow.onrender.com/course-api/${domain}/files`);
     // let res = await fetch(`http://localhost:4000/course-api/${domain}/files`);

      if (!res.ok) {
        throw new Error(`Failed to fetch course materials: ${res.statusText}`);
      }
      let data = await res.json();
      setFiles(data);
    }
    catch (error) {
      setError(error.message);
    } 
  };

  useEffect(() => {
    fetchFiles();
  }, [domain]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Course Materials for: {formattedDomain}</h1>
      {files.length === 0 ? (
        <p>No materials available for this course. Please check back later or contact the instructor for more details.</p>
      ) : (
        <div>
            <SearchBar files={files}/>
        </div>
      )}
      <UploadBar  
        courseName={domain} 
        username={username} 
        userId={userId} />
    </div>
  );
};

export default CourseDetails;
