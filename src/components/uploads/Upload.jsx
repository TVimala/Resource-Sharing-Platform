import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Upload.css';

const UploadsDisplay = ({ userId }) => {
  const [uploadCount, setUploadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the number of uploads from the backend
    const fetchUploads = async () => {
      try {
        const response = await axios.get(`/users/${userId}/uploads`);
        setUploadCount(response.data.uploadCount);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch upload count');
        setLoading(false);
      }
    };

    fetchUploads();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="upload-container">
      <div className="user-info">
        <img src="user-avatar.jpg" alt="User Avatar" className="user-avatar" />
        <h2 className="user-name">John Doe</h2>
      </div>
      <div className="upload-stats">
        <p className="upload-count">
          Uploads: <span className="count">{uploadCount}</span>
        </p>
      </div>
    </div>
  );
};

export default UploadsDisplay;
