import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
function UplaodBar() {
  const [file,setfile]=useState();
  return (
    <div className='uploadbar'>
      <input type="file" onChange={(e)=>setfile(e.target.files[0])} />
      {/* <button><FiUpload />
      </button> */}
    </div>
  )
}

export default UplaodBar
