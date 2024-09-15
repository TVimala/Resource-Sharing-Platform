import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import FileDisplay from '../filedisplay/FileDisplay'

function Upload() {
  const { currentUser } = useContext(userLoginContext)
  const [uploads,setUploads] =useState([])
  const [msg,setMsg] = useState("")

  async function fetchUploads(){
    try{
      let res=await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`)
      let data=await res.json()
      if(res.ok){
        setUploads(data.payload)
        setMsg("")
      }
      else{
        setMsg(data.error)
        }
      }
        catch(err){
          console.log(err)
          setMsg("An error occured while fetching uploads")
    }
  }

  
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
            driveLink={file.driveLink}    // Pass file URL
            fileName={file.fileName}      // Pass file name
            tags={file.tags}              // Pass file tags
            uploaderName={file.uploaderName} // Pass uploader's name
          />
        ))
      ) : (
        <p>No uploads found.</p>
      )}
    </>
  )
}

export default Upload