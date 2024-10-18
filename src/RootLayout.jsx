// import React, { useContext } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import DashBoard from "./components/dashboard/Dashboard";
// import { userLoginContext } from "./contexts/userLoginContext";
// import Login from "./components/login/Login";

// function RootLayout() {
//   const { isLogin } = useContext(userLoginContext);
//   const location = useLocation();

//   // Determine if we are on the login page
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {!isLoginPage ? ( // Don't show anything but Outlet on login page
//         <>
//           <div style={{ minHeight: '90vh' }}>
//             <Outlet /> {/* This is where Home, Dashboard, etc. will render */}
//           </div>
//         </>
//       ) : (
//         <div className="dashboard-container">
//           {isLogin ? <DashBoard /> : <Login />}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RootLayout;

//import Header from "./components/header/Header"
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
      {/* <Header/> */}
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