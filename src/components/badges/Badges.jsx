import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import './Badges.css'
function Badges() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState({ uploadCount: 0 });
  const [msg, setMsg] = useState('');
  const badgeImages = [
    { count: 3, image: 'alien1.png' },  
    { count: 5, image: 'alien2.png' }, 
    { count: 9, image: 'alien3.png' }  
  ];
  async function fetchUploads(username) {
    try {
      let res = await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
      if (res.ok) {
        if (data.payload && data.payload.uploadCount !== undefined) {
          setUploads({ uploadCount: data.payload.uploadCount });
          setMsg('');
        } else {
          setMsg('Upload count not found in response');
        }
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      console.log(err);
      setMsg('An error occurred while fetching uploads');
    }
  }

  // Fetch uploads when the component mounts
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchUploads(currentUser.username);
    }
  }, [currentUser.username]);

  // Filter badges based on the upload count
  const displayedBadges = badgeImages.filter(badge => uploads.uploadCount >= badge.count);

  return (
    <div className="badges-container">
      <div className="card w-100">
        <div className="card-header text-center">
          <h1>Badges</h1>
        </div>
        <div className="card-body">
          {msg && <p>{msg}</p>}
          {!msg && (
            <>
              <p>Here are your earned badges:</p>
              <div className="badge-list d-flex">
                {displayedBadges.map((badge, index) => (
                  <div className="badge" key={index}>
                    <img src={badge.image} alt={`badge-${index}`} className="badge-icon" />
                  </div>
                ))}
              </div>
              <p>Total uploads: {uploads.uploadCount}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Badges;
