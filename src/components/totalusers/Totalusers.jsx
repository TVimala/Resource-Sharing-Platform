import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useLocation } from 'react-router-dom';
import './Totalusers.css'; 

function Totalusers() {
    // const location = useLocation();

    // useEffect(() => {
    //     if (location.hash) {
    //         const element = document.getElementById("totalusers");
    //         if (element) {
    //             element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         }
    //     }
    // }, [location]);

    const { currentUser } = useContext(userLoginContext);
    const [users, setUsers] = useState({ userscount: 0 });
    const [msg, setMsg] = useState('');
    
    async function fetchUsers() {
        try {
            let res = await fetch(`http://localhost:4000/user-api/users-count`);
            let data = await res.json();
            console.log(data)
            if (res.ok && data.payload) {
                setUsers({ userscount: data.payload.totalUsers });
                setMsg('');
            } else {
                setMsg(data.error || 'Error fetching data');
            }
        } catch (err) {
            console.log(err);
            setMsg('An error occurred while fetching users count');
        }
    }
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    return (
        <div className="total-users-container">
            <h2 className='text-white'>Total Registered Users</h2>
            <div className="circle">
                <h1>{users.userscount}</h1>
            </div>
            {msg && <p className="error-message">{msg}</p>}
        </div>
    );    
}

export default Totalusers;
