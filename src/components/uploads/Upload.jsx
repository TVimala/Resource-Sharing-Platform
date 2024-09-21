import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import FileDisplay from '../filedisplay/FileDisplay'
import Profile from '../profile/Profile'

function Upload() {
  const { currentUser } = useContext(userLoginContext)
  const [uploads,setUploads] =useState([])
  const [msg,setMsg] = useState("")

  async function fetchUploads() {
    try {
      let res = await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
      if (res.ok) {
        setUploads(data.payload);
        setMsg("");
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      console.log(err);
      setMsg("An error occurred while fetching uploads");
    }
  }
  
  console.log("Uploads:", uploads.lenght);
    useEffect(() => {
      if(currentUser && currentUser.username){
      fetchUploads()
      }
    }, [currentUser.username])

  return (
    <>
    <h1>Your Uploads</h1>
    {msg && <p className="error-message">{msg}</p>}
    {uploads && uploads.length > 0 ? (
        uploads.map((file, index) => (
          <FileDisplay
            key={index}
            driveLink={file.driveLink}    
            fileName={file.fileName}      
            tags={file.tags}
            uploaderName={file.uploaderName}
          />
        ))
      ) : (
        <p>No uploads found.</p>
      )}
    </>
  )
}

export default Upload