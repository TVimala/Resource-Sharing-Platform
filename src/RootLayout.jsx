import Header from "./components/header/Header"
import { Outlet } from "react-router-dom"
import React from 'react'
import DashBoard from "./components/dashboard/Dashboard"
import SearchBar from "./components/searchBar/SearchBar"
import UploadBar from "./components/uploadBar/UplaodBar"
function RootLayout() {
  return (
    <div>
      {/* <Header/>
       <div style={{minHeight:'90vh'}}> <Outlet/></div> */}
      <div className="grid-container">
      <div className="searchbar-container">
        <SearchBar />
      </div>
      <div className="dashboard-container">
        <DashBoard />
      </div>
      <div className="uploadbar-container">
        <UploadBar />
      </div>
    </div>
    </div>
  )
}
export default RootLayout
