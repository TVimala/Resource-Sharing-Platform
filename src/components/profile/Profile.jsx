import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Uploadgraph from '../uploadgraph/Uploadgraph';
// import Skillbar from '../skillbar/Skillbar';
import Streak from '../streak/Streak';
import './Profile.css'
function Profile() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState({ uploadCount: 0 });
  const [msg, setMsg] = useState('');
  const [liked,setliked] =useState({likedcount:0})

  async function fetchUploads() {
    let username = currentUser.username;
    try {
      let res = await fetch(`http://localhost:4000/user-api/user-uploads/${username}`);
      let data = await res.json();
  
      if (res.ok) {
        console.log("Payload:", data.payload);
        if (data.payload && data.payload.uploadCount !== undefined) {
          // Set the uploadCount from the payload
          console.log("Upload count:", data.payload.uploadCount);

          setUploads({ uploadCount: data.payload.uploadCount });
          setMsg('');
        } else {
          // Handle the case where uploadCount is missing in the response
          setMsg('Upload count not found in response');
        }
      } else {
        // Handle server errors
        setMsg(data.error || 'An error occurred on the server');
      }
    } catch (err) {
      console.log(err);
      // Handle any network or unexpected errors
      setMsg('An error occurred while fetching uploads');
    }
  }
  

  // Fetch uploads when the component mounts
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchUploads();
    }
  }, [currentUser.username]);
  const [saved, setsaved] =useState({savedcount: 0 })
  async function fetchsaved(){
    let username=currentUser.username
    try{
      let res=await fetch(`http://localhost:4000/user-api/user-saved/${username}`)
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

    async function fetchliked(){
      let username=currentUser.username
      try{
        let res=await fetch(`http://localhost:4000/user-api/user-liked/${username}`)
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
    <div className="container d-flex flex-column justify-content-evenly">
    {/* Uploads Circle */}
    <div className="circle text-center p-2">
      <h5>Uploads</h5>
      <span className="upload-count">{uploads.uploadCount}</span>
    </div>
  
    {/* Likes Circle */}
    <div className="circle text-center p-2">
      <h5>Likes</h5>
      <span className="upload-count">{liked.likedcount}</span>
    </div>
  
    {/* Saved Files Circle */}
    <div className="circle text-center p-2">
      <h5>Saved</h5>
      <span className="upload-count">{saved.savedcount}</span>
    </div>
      <Uploadgraph></Uploadgraph>
      <Streak></Streak>
    </div>
  );
}
export default Profile;
