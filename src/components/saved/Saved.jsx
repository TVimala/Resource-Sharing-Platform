import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import FileDisplay from '../filedisplay/FileDisplay'

function Saved() {
  const { currentUser } = useContext(userLoginContext)
  const [saved, setsaved] =useState([])
  const [msg,setMsg] = useState("")

  async function fetchsaved(){
    try{
      let res=await fetch(`https://file-api-huow.onrender.com/user-api/user-saved/${currentUser.username}`)
      let data=await res.json()
      if(res.ok){
        setsaved(data.payload.saved)
        setMsg("")
      }
      else{
        setMsg(data.error)
        }
      }
        catch(err){
          console.log(err)
          setMsg("An error occured while fetching saved")
    }
  }

  
    useEffect(() => {
      if(currentUser && currentUser.username){
      fetchsaved()
      }
    }, [currentUser])

  return (
    <>
    <h1>Your saved</h1>
    {msg && <p className="error-message">{msg}</p>}
    {saved && saved.length > 0 ? (
    <div className="file-card-container">
       {saved.map((file, index) => (
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
        <p>No saved found.</p>
      )}
    </>
  )
}

export default Saved