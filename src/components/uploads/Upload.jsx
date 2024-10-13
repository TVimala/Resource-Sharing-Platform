import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import FileDisplay from '../filedisplay/FileDisplay';
function Upload() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState([]);
  const [msg, setMsg] = useState('');
  async function fetchUploads(){
    try {
      let res=await fetch(`https://file-api-huow.onrender.com/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
      if (res.ok) {
        setUploads(data.payload.uploads);
        setMsg('');
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      console.log(err);
      setMsg('An error occurred while fetching uploads');
    }
  }
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchUploads();
    }
  }, [currentUser]);
  return (
    <>
      <h1>Your Uploads</h1>
      {msg && <p className="error-message">{msg}</p>}
      {uploads && uploads.length > 0 ? (
    <div className="file-card-container">
       { uploads.map((file, index) => (
          <FileDisplay
            key={index}
            url={file.url}
            fileName={file.fileName}
            tags={file.tags}
            uploaderName={file.uploaderName}
            isUpload={true}
          />
        ))}
        </div>
      ) : (
        <p>No uploads found.</p>
      )}
    </>
  );
}
export default Upload;
