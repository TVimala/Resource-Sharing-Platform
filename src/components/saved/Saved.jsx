import React, { useState, useContext, useEffect } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import FileDisplay from '../filedisplay/FileDisplay';
import ClipLoader from 'react-spinners/ClipLoader'; // Loader from react-spinners
import './Saved.css'; // Assuming you have a CSS file for styling the saved component

function Saved() {
  const { currentUser } = useContext(userLoginContext);
  const [saved, setSaved] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true); // Loader state

  // Function to fetch saved items from the API
  async function fetchSaved() {
    setLoading(true); // Start loader when fetching data
    try {
      let res = await fetch(`https://file-api-huow.onrender.com/user-api/user-saved/${currentUser.username}`);
    //let res = await fetch(`http://localhost:4000/user-api/user-saved/${currentUser.username}`);
      let data = await res.json();
      if (res.ok) {
        setSaved(data.payload.saved);
        setMsg('');
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      console.log(err);
      setMsg('An error occurred while fetching saved items.');
    } finally {
      setLoading(false); // Stop loader after fetching
    }
  }

  // Fetch saved items when the component mounts and the user is available
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchSaved();
    }
  }, [currentUser]);

  return (
    <>
      <h1 className='text-center mt-4 mb-4 text-primary'>Your Saved Items</h1>

      {loading ? (
        // Show loader while loading
        <div className="loader-container d-flex justify-content-center align-items-center">
          <ClipLoader color={"#2563EB"} loading={loading} size={80} />
        </div>
      ) : msg ? (
        // Show error message if any
        <p className="error-message text-center text-danger">{msg}</p>
      ) : saved && saved.length > 0 ? (
        // Display saved items if found
        <div className="file-card-container">
          {saved.map((file, index) => (
            <FileDisplay
              key={index}
              url={file.url}
              fileName={file.fileName}
              tags={file.tags}
              uploaderName={file.uploaderName}
            />
          ))}
        </div>
      ) : (
        // Show "No saved items found" message if there are no saved items
        <div className="no-saved-container">
          <h2 className="text-center text-muted">No saved items found.</h2>
          <p className="text-center text-muted">Start saving files to view them here.</p>
        </div>
      )}
    </>
  );
}

export default Saved;
