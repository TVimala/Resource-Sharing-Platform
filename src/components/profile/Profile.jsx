import React from 'react';

function Profile({ uploadsLength }) {
  console.log("Uploads length in Profile:", uploadsLength);

  return (
    <div className='profile-upload'>
      {/* Display the length of uploads passed from Upload.jsx */}
      <h1>Number of Uploads: {uploadsLength}</h1>
    </div>
  );
}

export default Profile;