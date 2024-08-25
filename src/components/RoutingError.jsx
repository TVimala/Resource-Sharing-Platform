import React from 'react'
import { useRouteError } from 'react-router-dom'

function RoutingError() {
    let err=useRouteError()
    console.log(err)
  return (
    <div className='text-center text-danger'>
      <h1 className="mt-5 display-1 ">Invalid path</h1> 
      <h2 className="display-3 text-warning">{err.data}</h2>
      <h2 className="display-3 text-warning">{err.status}-{err.statusText}</h2>

      <p className='display-5'>Check the URL entered</p>
    </div>
  )
}

export default RoutingError