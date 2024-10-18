import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import './Totalusers.css'; 

function Totalusers() {
    const { currentUser } = useContext(userLoginContext);
    const [stats, setStats] = useState({ userscount: 0, uploadcount:0 });
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const fetchUsers = async () => {
        try {
            let res = await fetch(`https://file-api-huow.onrender.com/user-api/stats`);
           //const res = await fetch(`http://localhost:4000/user-api/stats`);
            const data = await res.json();
            console.log('Response:', res); // Log the whole response for debugging
            console.log('Data:', data); // Log the data received
            if (res.ok) {
                setStats({ userscount: data.totalUsers, uploadcount:data.totalUploads });
                setMsg('');
            } else {
                setMsg(data.error || 'Error fetching data');
            }
        } catch (err) {
            console.error('Error fetching users count:', err);
            setMsg('An error occurred while fetching users count');
        } finally {
            setIsLoading(false); // Set loading to false after the fetch
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
    <div className="total-stats-container">
    <div className="stats-table">
        <div className="stat-cell">
            <h3>Total Users</h3>
            <h1>{stats.userscount}</h1>
        </div>
        <div className="separator"></div>
        <div className="stat-cell">
            <h3>Total Uploads</h3>
            <h1>{stats.uploadcount}</h1>
        </div>
    </div>
    {msg && <p className="error-message">{msg}</p>}
</div>
    );
}


export default Totalusers;
