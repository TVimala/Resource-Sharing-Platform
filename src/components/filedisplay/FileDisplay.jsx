import React from 'react';
import './FileDisplay.css';
import { FaFileAlt } from 'react-icons/fa';
import { RiBookmarkLine } from "react-icons/ri";
import {userLoginContext} from '../../contexts/userLoginContext'
import { useState } from 'react';
import { useContext } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { RiBookmarkFill } from 'react-icons/ri';
import { useEffect } from 'react';

function FileDisplay({ driveLink, fileName, tags, uploaderName }) {
  const [message, setMessage] = useState(""); 
  const [isLiked,setLiked] = useState(false);
  const [isSaved,setSaved] = useState(false);
  let {currentUser}=useContext(userLoginContext)

  const file = { driveLink, fileName, tags, uploaderName };

  useEffect(() => {
    fetchUserData();
  }, [currentUser.username, driveLink]);

  async function fetchUserData() {
    try {
      // Fetch saved files from the backend
      let resSaved = await fetch(`http://localhost:4000/user-api/user-saved/${currentUser.username}`);
      let savedFiles = await resSaved.json();
      
      // Check if the current file is in the saved list
      const isFileSaved = savedFiles.payload.some(savedFile => savedFile.driveLink === driveLink);
      setSaved(isFileSaved);

      // Fetch liked files from the backend
      let resLiked = await fetch(`http://localhost:4000/user-api/user-liked/${currentUser.username}`);
      let likedFiles = await resLiked.json();
      
      // Check if the current file is in the liked list
      const isFileLiked = likedFiles.payload.some(likedFile => likedFile.driveLink === driveLink);
      setLiked(isFileLiked);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  async function addToSaved(){
    let username=currentUser.username
    try{
    let res=await fetch(`http://localhost:4000/user-api/add-to-saved/${username}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(file)
    })
    let result=await res.json();
    console.log(result);
    if (result.payload.modifiedCount === 1) {
      setSaved(true)
      setMessage("File added to saved items!"); // Set success message
    } else {
      setMessage("Failed to add file to saved items.");
    }
  } catch (error) {
    console.error("Error adding to saved", error);
    setMessage("An error occurred while adding the file.");
  }
}

async function deleteFromSaved(){
  let username=currentUser.username
  try{
    let res=await fetch(`http://localhost:4000/user-api/remove-from-saved/${username}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(file)
      })
      let result=await res.json();
      console.log(result);
      if (result.payload.modifiedCount === 1) {
        setSaved(false); // Set saved state to false
        setMessage("File removed from saved items.");
      } else {
        setMessage("Failed to remove file from saved items.");
      }
    } catch (error) {
      console.error("Error removing from saved items", error);
      setMessage("An error occurred while removing the file from saved items.");
    }
    
}


async function addToLiked(){
  let username=currentUser.username
  try{
  let res=await fetch(`http://localhost:4000/user-api/add-to-liked/${username}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(file)
  })
  let result=await res.json();
  console.log(result);
  if (result.payload.modifiedCount === 1) {
    setMessage("File added to liked items!"); // Set success message
  } else {
    setMessage("Failed to add file to liked items.");
  }
} catch (error) {
  console.error("Error adding to liked", error);
  setMessage("An error occurred while adding the file.");
  }
}

  return (
    <div className="file-card">
      <div className="file-card-content">
        <FaFileAlt className="file-icon" />
        <div className="file-details">
          <a href={driveLink} target="_blank" rel="noopener noreferrer" className="file-link">
            <span className="file-name">{fileName || 'Click to view the file'}</span>
          </a>
          {uploaderName && <div className="uploader-name">Uploaded by: {uploaderName}</div>}
          {tags && tags.length > 0 && (
            <div className="file-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        { isSaved ? (
        <button type="button" onClick={()=>deleteFromSaved()}>
        <RiBookmarkFill /> 
        </button>
         ):(
         <button type="button" onClick={()=>addToSaved()}>
        <RiBookmarkLine /> 
        </button>
        )}
        
        <button 
          type="button"
          onClick={()=>addToLiked()}>
        <FaRegHeart/>
        </button>
      </div>
      {message && <div className="success-message">{message}</div>}
    </div>
  );
}

export default FileDisplay;

