import React from 'react'
import { userLoginContext } from './userLoginContext'
import { useState } from 'react'


function UserLoginStore({children}) {

    let [currentUser,setCurrentUser]=useState(null)
    let [isLogin,setIsLogin]=useState(false)
    let [err,setErr]=useState("")

    async function loginUser(userCred){
        try{
            let res=await fetch('http://localhost:4000/users',
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
                //store token in session storage
                sessionStorage.setItem('token',data.token)
            }
            else{
              setErr(data.message)
              setCurrentUser(null)
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
          setIsLogin(false)
          //remove token
          sessionStorage.removeItem('token')
          }
          
  return (
    <userLoginContext.Provider value=
    {{isLogin,loginUser,logoutUser,currentUser,setCurrentUser}}>
        {children}
    </userLoginContext.Provider>
  )
}

export default UserLoginStore
