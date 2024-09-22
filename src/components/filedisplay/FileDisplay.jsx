import React, { useState, useContext } from 'react';
import './FileDisplay.css';
import { FaFileAlt } from 'react-icons/fa';
import { RiBookmarkLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { userLoginContext } from '../../contexts/userLoginContext';

function FileDisplay({ driveLink, fileName, tags, uploaderName }) {
  const [message, setMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false); // Track like button state
  const [isSaved, setIsSaved] = useState(false); // Track save button state
  let { currentUser } = useContext(userLoginContext);

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
        setIsSaved(true); // Mark as saved
      } else {
        setMessage("Failed to add file to saved items.");
      }
    } catch (error) {
      console.error("Error adding to saved", error);
      setMessage("An error occurred while adding the file.");
    }
  }

  async function addToLiked() {
    let username = currentUser.username;
    const productObj = { driveLink, fileName, tags, uploaderName };
    try {
      let res = await fetch(`http://localhost:4000/user-api/add-to-liked/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      let result = await res.json();
      if (result.payload.modifiedCount === 1) {
        setMessage("File added to liked items!");
        setIsLiked(true); // Mark as liked
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
          onClick={addToSaved}>
          <RiBookmarkLine style={{ color: isSaved ? 'black' : 'inherit' }} />
        </button>
        <button 
          type="button"
          onClick={addToLiked}>
          <FaRegHeart style={{ color: isLiked ? 'linear-gradient(45deg, #ff6ec4, #f93a8d)' : 'inherit' }} />
        </button>
      </div>
      {message && <div className="success-message">{message}</div>}
    </div>
  );
}

export default FileDisplay;
