import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import {userLoginContext} from '../../contexts/userLoginContext'
import { useContext } from 'react';

const Uploadgraph = ({ username }) => {
  const [uploadData, setUploadData] = useState([]);
  let {currentUser}=useContext(userLoginContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let username=currentUser.username

        const response = await fetch(`http://localhost:4000/user-api/user-uploads/${username}/daily`);
        const result = await response.json();
        console.log('Full response:', result); // Check the full response

        // Check and format the response data
        if (result.payload) {
          console.log('Data fetched:', result.payload); // Check the payload data
          setUploadData(result.payload);  // Set the actual payload for chart
        } else {
          console.log('No payload in response');
          setUploadData([]);  // Handle cases where payload is missing
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <LineChart data={uploadData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="uploads" fill="#8884d8" />
      </LineChart> */}

      <LineChart width={500} height={300} data={uploadData}>
    <XAxis dataKey="date"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uploads" stroke="#8884d8" />
  </LineChart>
    </ResponsiveContainer>
  );
};

export default Uploadgraph;