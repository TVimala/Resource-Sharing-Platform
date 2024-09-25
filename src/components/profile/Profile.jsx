import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Uploadgraph from '../uploadGraph/Uploadgraph';
import Streak from '../streak/Streak';
import './Profile.css';

function Profile() {
    const { currentUser } = useContext(userLoginContext);
    const [uploads, setUploads] = useState({ uploadCount: 0 });
    const [saved, setSaved] = useState({ savedCount: 0 });
    const [liked, setLiked] = useState({ likedCount: 0 });
    const [msg, setMsg] = useState('');

    async function fetchUploads(username) {
        try {
            let res = await fetch(`http://localhost:4000/user-api/user-uploads/${username}`);
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

    async function fetchsaved(username) {
        try {
            let res = await fetch(`http://localhost:4000/user-api/user-saved/${username}`);
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

    async function fetchliked(username) {
        try {
            let res = await fetch(`http://localhost:4000/user-api/user-liked/${username}`);
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
            fetchUploads(currentUser.username);
            fetchsaved(currentUser.username);
            fetchliked(currentUser.username);
        }
    }, [currentUser]);

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
                <span className="upload-count">{liked.likedCount}</span>
            </div>
            {/* Saved Files Circle */}
            <div className="circle text-center p-2">
                <h5>Saved</h5>
                <span className="upload-count">{saved.savedCount}</span>
            </div>
            <Uploadgraph />
            <Streak />
        </div>
    );
}

export default Profile;
