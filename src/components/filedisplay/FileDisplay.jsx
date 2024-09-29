import React, { useState, useContext } from 'react';
import './FileDisplay.css';
import { FaFileAlt } from 'react-icons/fa';
import { RiBookmarkLine } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; 
import { userLoginContext } from '../../contexts/userLoginContext';
function FileDisplay({ driveLink, fileName, tags, uploaderName, isUpload }) { 
  const [message, setMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false); 
  const [isSaved, setIsSaved] = useState(false); 
  let { currentUser } = useContext(userLoginContext);
  async function deleteFile() {
    let username = currentUser.username;
    const productObj = { driveLink, fileName };
    try {
      let res = await fetch(`http://localhost:4000/user-api/delete-uploads/${username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      
      let result = await res.json();
      if (result.success) {
        setMessage("File deleted successfully!");
      } else {
        setMessage("Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file", error);
      setMessage("An error occurred while deleting the file.");
    }
  }

  async function toggleLike() {
    let username = currentUser.username;
    const productObj = { driveLink, fileName, tags, uploaderName };
    try {
      let endpoint = isLiked 
        ? `http://localhost:4000/user-api/remove-from-liked/${username}`
        : `http://localhost:4000/user-api/add-to-liked/${username}`;
        
      let res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      
      let result = await res.json();
      if (result.payload.modifiedCount === 1) {
        setMessage(isLiked ? "File removed from liked items!" : "File added to liked items!");
        setIsLiked(!isLiked); 
      } else {
        setMessage("Failed to update liked items.");
      }
    } catch (error) {
      console.error("Error updating liked status", error);
      setMessage("An error occurred while updating the file.");
    }
  }

  async function addToSaved() {
    let username = currentUser.username;
    const productObj = { driveLink, fileName, tags, uploaderName };
    try {
      let res = await fetch(`http://localhost:4000/user-api/add-to-saved/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      let result = await res.json();
      if (result.payload.modifiedCount === 1) {
        setMessage("File added to saved items!");
        setIsSaved(true); 
      } else {
        setMessage("Failed to add file to saved items.");
      }
    } catch (error) {
      console.error("Error adding to saved", error);
      setMessage("An error occurred while adding the file.");
    }
  }

  return (
    <div className="file-container">
      <div className="file-card col-lg-3 col-md-4 col-sm-6">
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
          onClick={addToSaved}>
          <RiBookmarkLine style={{ color: isSaved ? 'black' : 'inherit' }} />
        </button>
        <button 
          type="button"
          onClick={toggleLike}>
          {isLiked ? <FaHeart style={{ color: '#f93a8d' }} /> : <FaRegHeart />}
        </button>
        {isUpload && uploaderName === currentUser.username && (
          <button 
            type="button" 
            onClick={deleteFile}>
            <MdDelete style={{ color: 'red' }} />
          </button>
        )}
      </div>
      {message && <div className="success-message">{message}</div>}
    </div>
    </div>
  );
}

export default FileDisplay;
