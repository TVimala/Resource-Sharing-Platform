import Header from "./components/header/Header"
import { Outlet } from "react-router-dom"
import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import DashBoard from "./components/dashboard/Dashboard"
import SearchBar from "./components/searchBar/SearchBar"
import UploadBar from "./components/uploadBar/UplaodBar"
import { userLoginContext } from "./contexts/userLoginContext"
import ResourceList from "./components/resourcelist/ResourceList"
function RootLayout() {
  const { isLogin } = useContext(userLoginContext)
  const [resources, setResources] = useState([]);
  const addResource = (resource) => {
    setResources([...resources, resource]);
  };

  return (
    <div>
      {isLogin===false?(
        <>
      <Header/>
       <div style={{minHeight:'90vh'}}> <Outlet/>
       </div>
       </>
      ):(
       <div className="grid-container">
      <div className="searchbar-container">
        <SearchBar />
      </div>
      <div className="dashboard-container">
        <DashBoard />
      </div>
      <div className="resourcelist-container">
            <ResourceList resources={resources} />
          </div>
      <div className="uploadbar-container">
      <UploadBar addResource={addResource} />
      </div>
    </div> 
    )}
    </div>
  )
}
export default RootLayout
