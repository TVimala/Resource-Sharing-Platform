import React, { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { userLoginContext } from '../../contexts/userLoginContext';
import './Uploadgraph.css'; // Import the CSS for styling

const Uploadgraph = () => {
  const [uploadData, setUploadData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const { currentUser } = useContext(userLoginContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const username = currentUser.username;
        const response = await fetch(`https://file-api-xi.vercel.app/user-api/user-uploads/${username}/daily`);
       //const response = await fetch(`https://file-api-huow.onrender.com/user-api/user-uploads/${username}/daily`);
      //  const response = await fetch(`http://localhost:4000/user-api/user-uploads/${username}/daily`);
        const result = await response.json();
        
        // Check and format the response data
        if (result.payload) {
          setUploadData(result.payload); // Set the actual payload for chart
        } else {
          setUploadData([]); // Handle cases where payload is missing
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [currentUser.username]);

  return (
    <div className="upload-graph-container">
      <h4 className="graph-title">Upload Activity Over Time</h4>
      {loading ? (
        <div className="loader">Loading...</div> // Loader while fetching data
      ) : uploadData.length === 0 ? (
        <div className="no-data-message">No upload data available for your account.</div> // Message when no data
      ) : (
        <ResponsiveContainer width="100%" height={200} className="m-3">
          <LineChart data={uploadData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uploads" stroke="#1565C0" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Uploadgraph;
