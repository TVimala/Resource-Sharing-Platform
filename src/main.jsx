import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import UserLoginStore from './contexts/UserLoginStore.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <UserLoginStore>
    <App />
  </UserLoginStore>
)
