import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Uploadgraph from '../uploadgraph/Uploadgraph';
import Skillbar from '../skillbar/Skillbar';
import Streak from '../streak/Streak';
import Badges from '../badges/Badges';
import './Profile.css'
function Profile() {
  const { currentUser } = useContext(userLoginContext);
  const [uploads, setUploads] = useState({ uploadCount: 0 });
  const [msg, setMsg] = useState('');

  async function fetchUploads(username) {
    try {
      let res=await fetch(`http://localhost:4000/user-api/user-uploads/${currentUser.username}`);
      let data = await res.json();
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
    <div className="container justify-content-evenly">
     <div className="d-flex">
        <div className='d-flex flex-column mx-5'>
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
    </div>
     <div>
      <Streak></Streak>
     </div>
      </div>    
      <Uploadgraph></Uploadgraph>
      <Badges></Badges>
    </div>
  );
}
export default Profile;
