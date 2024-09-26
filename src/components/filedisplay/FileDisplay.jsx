// FileDisplay.js
import React, { useState, useContext } from 'react';
import './FileDisplay.css';
import { FaFileAlt, FaRegHeart } from 'react-icons/fa';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { userLoginContext } from '../../contexts/userLoginContext';
import { FcLike } from "react-icons/fc";

function FileDisplay({ driveLink, fileName, tags, uploaderName }) {
  const [message, setMessage] = useState('');
  const { currentUser, savedFiles, addToSaved, removeFromSaved, likedFiles, addToLiked, removeFromLiked } = useContext(userLoginContext);

  // Check if the file is saved based on the global savedFiles array
  const isSaved = savedFiles.some((file) => file.driveLink === driveLink && file.fileName === fileName);
  const isLiked = likedFiles.some((file) => file.driveLink === driveLink && file.fileName === fileName);

  // Add to saved handler
  const handleSaveToggle = () => {
    const fileObj = { driveLink, fileName, tags, uploaderName };
    if (isSaved) {
      removeFromSaved(fileObj);
      setMessage('File removed from saved items!');
    } else {
      addToSaved(fileObj);
      setMessage('File added to saved items!');
    }
  };

   // Add to liked handler
   const handleLikeToggle = () => {
    const fileObj = { driveLink, fileName, tags, uploaderName };
    if (isLiked) {
      removeFromLiked(fileObj);
      setMessage('File removed from liked items!');
    } else {
      addToLiked(fileObj);
      setMessage('File added to liked items!');
    }
  };

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
        <button type="button" onClick={handleSaveToggle}>
          {isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}
        </button>
        <button type="button" onClick={handleLikeToggle}>
          {isLiked ? <FcLike />:<FaRegHeart />}
        </button>
      </div>
      {message && <div className="success-message">{message}</div>}
    </div>
  );
}

export default FileDisplay;
