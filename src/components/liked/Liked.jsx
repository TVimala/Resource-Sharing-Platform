import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import FileDisplay from '../filedisplay/FileDisplay'

function Liked() {
  const { currentUser } = useContext(userLoginContext)
  const [liked,setliked] =useState([])
  const [msg,setMsg] = useState("")

  async function fetchliked(){
    try{
      let res=await fetch(`http://localhost:4000/user-api/user-liked/${currentUser.username}`)
      let data=await res.json()
      if(res.ok){
        console.log("Fetched Liked Files:", data);
        setliked(data.payload.liked);
        setMsg("")
      }
      else{
        setMsg(data.error)
        }
      }
        catch(err){
          console.log(err)
          setMsg("An error occured while fetching liked")
    }
  }

  
    useEffect(() => {
      if(currentUser && currentUser.username){
      fetchliked()
      }
    }, [currentUser.username])

  return (
    <>
    <h1>Your liked</h1>
    {msg && <p className="error-message">{msg}</p>}
    {liked && liked.length > 0 ? (
        <div className="file-card-container">
       {liked.map((file, index) => (
          <FileDisplay
            key={index}
            url={file.url}    // Pass file URL
            fileName={file.fileName}      // Pass file name
            tags={file.tags}              // Pass file tags
            uploaderName={file.uploaderName} // Pass uploader's name
          />
        ))}
        </div>
      ) : (
        <p>No liked found.</p>
      )}
    </>
  )
}

export default Liked