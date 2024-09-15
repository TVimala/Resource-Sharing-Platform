import React from 'react';
import './FileDisplay.css';
import { FaFileAlt } from 'react-icons/fa';
import { RiBookmarkLine } from "react-icons/ri";
import {userLoginContext} from '../../contexts/userLoginContext'
import { useState } from 'react';
import { useContext } from 'react';
import { FaRegHeart } from "react-icons/fa";

function FileDisplay({ driveLink, fileName, tags, uploaderName }) {
  const [message, setMessage] = useState(""); 
  let {currentUser}=useContext(userLoginContext)


  async function addToSaved(){
    let username=currentUser.username
    const productObj = { driveLink, fileName, tags, uploaderName };
    try{
    let res=await fetch(`http://localhost:4000/user-api/add-to-saved/${username}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(productObj)
    })
    let result=await res.json();
    console.log(result);
    if (result.payload.modifiedCount === 1) {
      setMessage("File added to saved items!"); // Set success message
    } else {
      setMessage("Failed to add file to saved items.");
    }
  } catch (error) {
    console.error("Error adding to saved", error);
    setMessage("An error occurred while adding the file.");
  }
}
async function addToLiked(){
  let username=currentUser.username
  const productObj = { driveLink, fileName, tags, uploaderName };
  try{
  let res=await fetch(`http://localhost:4000/user-api/add-to-liked/${username}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(productObj)
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
        <button 
          type="button"
          onClick={()=>addToSaved()}>
        <RiBookmarkLine/>
        </button>
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

