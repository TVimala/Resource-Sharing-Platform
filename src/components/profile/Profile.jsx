import React from 'react'
import Uploadgraph from '../uploadGraph/Uploadgraph'
import { userLoginContext } from '../../contexts/userLoginContext';
import { useContext } from 'react';

function Profile(){
  let {currentUser}=useContext(userLoginContext)

  return (
   <div>
    Profile
    <Uploadgraph username={currentUser.username} />
  </div> 
  )
}
export default Profile