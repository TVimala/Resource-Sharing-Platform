import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Uploadgraph from '../uploadgraph/Uploadgraph';
import Badges from '../badges/Badges';
import './Profile.css';

function Profile() {
    const { currentUser } = useContext(userLoginContext);
    const [uploads, setUploads] = useState({ uploadCount: 0 });
    const [saved, setSaved] = useState({ savedCount: 0 });
    const [liked, setLiked] = useState({ likedCount: 0 });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading

    async function fetchUploads(username) {
        try {
            let res = await fetch(`https://file-api-xi.vercel.app/user-api/user-uploads/${username}`);
           // let res = await fetch(`https://file-api-huow.onrender.com/user-api/user-uploads/${username}`);
          //  let res = await fetch(`http://localhost:4000/user-api/user-uploads/${username}`);
            let data = await res.json();
            if (res.ok) {
                setUploads({ uploadCount: data.payload.uploads.length });
                setMsg('');
            } else {
                setMsg(data.error);
            }
        } catch (err) {
            console.log(err);
            setMsg('An error occurred while fetching uploads');
        }
    }

    async function fetchSaved(username) {
        try {
            let res = await fetch(`https://file-api-xi.vercel.app/user-api/user-saved/${username}`);
           //  let res = await fetch(`https://file-api-huow.onrender.com/user-api/user-saved/${username}`);
           // let res = await fetch(`http://localhost:4000/user-api/user-saved/${username}`);
            let data = await res.json();
            if (res.ok) {
                setSaved({ savedCount: data.payload.saved.length });
                setMsg('');
            } else {
                setMsg(data.error);
            }
        } catch (err) {
            console.log(err);
            setMsg('An error occurred while fetching saved');
        }
    }

    async function fetchLiked(username) {
        try {
            let res = await fetch(`https://file-api-xi.vercel.app/user-api/user-liked/${username}`);
           // let res = await fetch(`https://file-api-huow.onrender.com/user-api/user-liked/${username}`);
           // let res = await fetch(`http://localhost:4000/user-api/user-liked/${username}`);
            let data = await res.json();
            if (res.ok) {
                setLiked({ likedCount: data.payload.liked.length });
                setMsg('');
            } else {
                setMsg(data.error);
            }
        } catch (err) {
            console.log(err);
            setMsg('An error occurred while fetching liked');
        }
    }

    useEffect(() => {
        if (currentUser && currentUser.username) {
            setLoading(true); // Set loading to true before fetching data
            fetchUploads(currentUser.username);
            fetchSaved(currentUser.username);
            fetchLiked(currentUser.username);
            setLoading(false); // Set loading to false after fetching data
        }
    }, [currentUser.username]);

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            {msg && <div className="error-message">{msg}</div>}
            {loading ? ( // Show loader while data is loading
                <div className="loader">Loading...</div>
            ) : (
                <>
                    <div className="stats-container">
                        <div className="circle text-center">
                            <h5>Uploads</h5>
                            <span className="upload-count">{uploads.uploadCount}</span>
                        </div>
                        <div className="circle text-center">
                            <h5>Likes</h5>
                            <span className="upload-count">{liked.likedCount}</span>
                        </div>
                        <div className="circle text-center">
                            <h5>Saved</h5>
                            <span className="upload-count">{saved.savedCount}</span>
                        </div>
                    </div>

                    <h3 className="additional-title">Additional Information</h3>
                    <div className="additional-info">
                        <h4 className="info-title">Upload Graph</h4>
                        <Uploadgraph />
                        <h4 className="info-title">Badges Earned</h4>
                        <Badges />
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
