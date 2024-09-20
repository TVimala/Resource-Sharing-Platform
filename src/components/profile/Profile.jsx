import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
function Profile() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState({ uploadCount: 0 });
  const [msg, setMsg] = useState('');

  async function fetchUploads(username) {
    try {
      let res=await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
      console.log(data); // Log the data to check its structure
      if (res.ok) {
        if (data.payload && data.payload.uploadCount !== undefined) {
          setUploads({ uploadCount: data.payload.uploadCount }); // Correctly set state
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
  const [saved, setsaved] =useState({savedcount: 0 })
  async function fetchsaved(username){
    try{
      let res=await fetch(`http://localhost:4000/user-api/user-saved/${currentUser.username}`)
      let data=await res.json()
      if(res.ok){
        setsaved(data.payload)
        setMsg("")
      }
      else{
        setMsg(data.error)
        }
      }
        catch(err){
          console.log(err)
          setMsg("An error occured while fetching saved")
    }
  }
    useEffect(() => {
      if(currentUser && currentUser.username){
      fetchsaved()
      }
    }, [currentUser.username])
    const [liked,setliked] =useState({likedcount:0})
    async function fetchliked(username){
      try{
        let res=await fetch(`http://localhost:4000/user-api/user-liked/${currentUser.username}`)
        let data=await res.json()
        if(res.ok){
          setliked(data.payload)
          setMsg("")
        }
        else{
          setMsg(data.error)
          }
        }
          catch(err){
            console.log(err)
            setMsg("An error occured while fetching liked")
      }
    }
  
    
      useEffect(() => {
        if(currentUser && currentUser.username){
        fetchliked()
        }
      }, [currentUser.username])
  return (
    <div className="container d-flex flex-column m-3"> 
      <div className="card text-center shadow-sm mb-3"> {/* Adds a shadow effect */}  
        <div className="card-header bg-primary text-white"> {/* Bootstrap card header with a primary background */}
        <h3 className="mb-0">Profile</h3>
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="card-title">
          <h5>Number of Uploads:{uploads.uploadCount}</h5>
          </div>
        </div>
        <div className="card-footer text-muted">
          Keep Uploading files!
        </div>
      </div>

      <div className="card text-center shadow-sm mb-3"> {/* Adds a shadow effect */}
        <div className="card-header bg-primary text-white"> {/* Bootstrap card header with a primary background */}
          <h3 className="mb-0">Profile</h3>
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="card-title">
          <h5>Number of Likes:{liked.likedcount}</h5>
          </div>
        </div>
        <div className="card-footer text-muted">
          Keep going to like files!
        </div>
      </div>

      <div className="card text-center shadow-sm"> {/* Adds a shadow effect */}
        <div className="card-header bg-primary text-white"> {/* Bootstrap card header with a primary background */}
          <h3 className="mb-0">Profile</h3>
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title">Number of Saved Files:{saved.savedcount}</h5>
          <p className="card-text fs-5"></p> 
        </div>
        <div className="card-footer text-muted">
          Keep saving files!
        </div>
      </div>
    </div>
  );
}

export default Profile;
