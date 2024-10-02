import React, { useEffect, useState } from 'react'
import Heatmapcalendra from '../heatmapcalendra/Heatmapcalendra'
function Heatmap() {
    const [activitydata,setactivitydata]=useState([])
    useEffect(()=>{
        fetch('')
        .then(res=>res.json())
        .then(data=>setactivitydata(data.userActivity))
        .catch(err=>console.log("error in fetching data",err))
    },[])
  return (
    <div>
        <Heatmapcalendra startDate={'2024-09-01'} endDate={'2024-12-13'} dataValues={activitydata}/>
    </div>
  )
}

export default Heatmap