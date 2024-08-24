import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
function App() {
  return (
    <>
     <div>
        <Login></Login>
        <Register></Register>
     </div>
    </>
  )
}

export default App
