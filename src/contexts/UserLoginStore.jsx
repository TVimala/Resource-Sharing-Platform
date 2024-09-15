import React from 'react'
import { userLoginContext } from './userLoginContext'
import { useState,useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

function UserLoginStore({children}) {
  // const navigate = useNavigate();

    // let [currentUser,setCurrentUser]=useState(null)
    // let [isLogin,setIsLogin]=useState(false)
    // let [err,setErr]=useState("")
    // const [username, setUsername] = useState('');
    // const [userId, setUserId] = useState('');
// Check for stored login state and user in localStorage
const [isLogin, setIsLogin] = useState(() => {
  const savedLoginState = localStorage.getItem('isLogin');
  return savedLoginState === 'true'; // Convert string to boolean
});

const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem('currentUser');
  return savedUser ? JSON.parse(savedUser) : null; // Parse stored user data if it exists
});

const [err, setErr] = useState('');
const [username, setUsername] = useState(() => {
  return currentUser ? currentUser.username : '';
});
const [userId, setUserId] = useState(() => {
  return currentUser ? currentUser._id : '';
});

useEffect(() => {
  // Persist login state and user data in localStorage whenever they change
  localStorage.setItem('isLogin', isLogin);
  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('currentUser');
  }
}, [isLogin, currentUser]);

    async function loginUser(userCred){
        try{
            let res=await fetch('http://localhost:4000/user-api/login',
                {
                    method:'POST',
                    headers: {"Content-type":"application/json"},
                    body:JSON.stringify(userCred)
                }
            )
            let data=await res.json()
            if(data.message==="login success"){
                setCurrentUser(data.user)
                setIsLogin(true)
                setErr('')
                setUsername(data.user.username); // Assuming response contains username
                setUserId(data.user._id); // Assuming response contains userId
                // navigate('/profile')
                //store token in session storage
                sessionStorage.setItem('token',data.token)
            }
            else{
              setErr(data.message)
              setCurrentUser(null)
              setUsername('');
              setUserId('');
              setIsLogin(false)
            }
        }
        catch(error){
          setErr(error.message)
        }
      }
        //user logout
        function logoutUser(){
          setCurrentUser(null)
          setUsername('');
          setUserId('');
          setIsLogin(false)
          //remove token
          sessionStorage.removeItem('token');
          localStorage.removeItem('isLogin');
          localStorage.removeItem('currentUser');
          }
          
  return (
    <userLoginContext.Provider value=
    {{isLogin,loginUser,logoutUser,currentUser,username,userId,setCurrentUser}}>
        {children}
    </userLoginContext.Provider>
  )
}

export default UserLoginStore
