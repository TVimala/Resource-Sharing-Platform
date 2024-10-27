import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import FileDisplay from '../filedisplay/FileDisplay';
import ClipLoader from 'react-spinners/ClipLoader'; // Loader from react-spinners
import './Upload.css'; // Assuming you have a CSS file for styling the upload component

function Upload() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true); // Loader state

  // Function to fetch uploads from the API
  async function fetchUploads() {
    setLoading(true); // Start loader when fetching data
    try {
      let res = await fetch(`https://file-api-xi.vercel.app/user-api/user-uploads/${currentUser.username}`);
      //let res = await fetch(`https://file-api-huow.onrender.com/user-api/user-uploads/${currentUser.username}`);
      // let res = await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
      if (res.ok) {
        setUploads(data.payload.uploads);
        setMsg('');
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      console.log(err);
      setMsg('An error occurred while fetching uploads.');
    } finally {
      setLoading(false); // Stop loader after fetching
    }
  }

  // Fetch uploads when the component mounts and the user is available
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchUploads();
    }
  }, [currentUser]);

  return (
    <>
      <h1 className='text-center mt-4 mb-4 text-primary'>Your Uploads</h1>

      {loading ? (
        // Show loader while loading
        <div className="loader-container d-flex justify-content-center align-items-center">
          <ClipLoader color={"#2563EB"} loading={loading} size={80} />
        </div>
      ) : msg ? (
        // Show error message if any
        <p className="error-message text-center text-danger">{msg}</p>
      ) : uploads && uploads.length > 0 ? (
        // Display uploads if found
        <div className="file-card-container">
          {uploads.map((file, index) => (
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
        // Show "No uploads found" message if there are no uploads
        <div className="no-uploads-container">
          <h2 className="text-center text-muted">No uploads found.</h2>
          <p className="text-center text-muted">Start uploading to see your files here.</p>
        </div>
      )}
    </>
  );
}

export default Upload;
