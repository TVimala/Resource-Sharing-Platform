import Header from "./components/header/Header"
import { Outlet } from "react-router-dom"
import React from 'react'
import { useContext } from "react"
import DashBoard from "./components/dashboard/Dashboard"
import { userLoginContext } from "./contexts/userLoginContext"

function RootLayout() {
  const { isLogin } = useContext(userLoginContext)
  return (
    <div>
       {isLogin===false?( 
        <>
      <Header/>
       <div style={{minHeight:'90vh'}}> <Outlet/>
       </div>
       </>
       ):(
      <>
            <div className="dashboard-container">
              <DashBoard />
            </div>
       </>
     )} 
    </div>
  )
}
export default RootLayout
