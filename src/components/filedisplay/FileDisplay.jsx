import React, { useState, useContext } from 'react';
import './FileDisplay.css';
import { FaFileAlt, FaRegHeart } from 'react-icons/fa';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { userLoginContext } from '../../contexts/userLoginContext';
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import ClipLoader from 'react-spinners/ClipLoader'; // Import loader

function FileDisplay({ url, fileName, tags, uploaderName, isUpload }) {
  const [message, setMessage] = useState('');
  const [loadingSave, setLoadingSave] = useState(false); // Loader state for saving
  const [loadingLike, setLoadingLike] = useState(false); // Loader state for liking
  const [loadingDelete, setLoadingDelete] = useState(false); // Loader state for deleting
  const { currentUser, savedFiles, addToSaved, removeFromSaved, likedFiles, addToLiked, removeFromLiked } = useContext(userLoginContext);

  const isSaved = savedFiles.some((file) => file.url === url && file.fileName === fileName);
  const isLiked = likedFiles.some((file) => file.url === url && file.fileName === fileName);

  // Add to saved handler
  const handleSaveToggle = async () => {
    const fileObj = { url, fileName, tags, uploaderName };
    setLoadingSave(true); // Start loading for save action
    try {
      if (isSaved) {
        // await removeFromSaved(fileObj);
        removeFromSaved(fileObj);
        setMessage('File removed from saved items!');
      } else {
        // await addToSaved(fileObj);
        addToSaved(fileObj);
        setMessage('File added to saved items!');
      }
    } finally {
      setLoadingSave(false); // Stop loading for save action
    }
  };

  // Add to liked handler
  const handleLikeToggle = async () => {
    const fileObj = { url, fileName, tags, uploaderName };
    setLoadingLike(true); // Start loading for like action
    try {
      if (isLiked) {
        // await removeFromLiked(fileObj);
        removeFromLiked(fileObj);
        setMessage('File removed from liked items!');
      } else {
        // await addToLiked(fileObj);
        addToLiked(fileObj);
        setMessage('File added to liked items!');
      }
    } finally {
      setLoadingLike(false); // Stop loading for like action
    }
  };

  // Delete file function
  const deleteFile = async () => {
    let username = currentUser.username;
    const fileObj = { url, fileName };
    setLoadingDelete(true); // Start loading for delete action
    try {
      let res = await fetch(`https://file-api-huow.onrender.com/user-api/delete-uploads/${username}`, {  
     // let res = await fetch(`http://localhost:4000/user-api/delete-uploads/${username}`, {  
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileObj)
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
    } finally {
      setLoadingDelete(false); // Stop loading for delete action
    }
  };

  return (
    <div className="file-card">
      <div className="file-card-content">
        <FaFileAlt className="file-icon" />
        <div className="file-details">
          <a href={url} target="_blank" rel="noopener noreferrer" className="file-link">
            <span className="file-name">{fileName || 'Click to view the file'}</span>
          </a>
          {uploaderName && <div className="uploader-name">Uploaded by: {uploaderName}</div>}
          {tags && tags.length > 0 && (
            <div className="file-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="action-buttons">
          <button type="button" className='icons' onClick={handleSaveToggle} disabled={loadingSave || loadingLike || loadingDelete}>
            {loadingSave ? (
              <ClipLoader color="#007bff" size={20} />
            ) : (
              isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />
            )}
          </button>
          <button type="button" className='icons' onClick={handleLikeToggle} disabled={loadingSave || loadingLike || loadingDelete}>
            {loadingLike ? (
              <ClipLoader color="#007bff" size={20} />
            ) : (
              isLiked ? <FcLike /> : <FaRegHeart />
            )}
          </button>
          {isUpload && uploaderName === currentUser.username && (
            <button type="button" className='icons' onClick={deleteFile} disabled={loadingSave || loadingLike || loadingDelete}>
              {loadingDelete ? (
                <ClipLoader color="#007bff" size={20} />
              ) : (
                <MdDelete style={{ color: 'red' }} />
              )}
            </button>
          )}
        </div>
      </div>
      {message && <div className="success-message">{message}</div>}
    </div>
  );
}

export default FileDisplay;
