import React,{ useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import FileDisplay from '../filedisplay/FileDisplay'
import { ClipLoader } from 'react-spinners'
import './liked.css';
function Liked() {
  const { currentUser } = useContext(userLoginContext)
  const [liked,setliked] =useState([])
  const [msg,setMsg] = useState("")
  const [loading, setLoading] = useState(true); // Loader state


  async function fetchliked(){
    setLoading(true);
    try{
      let res=await fetch(`https://file-api-huow.onrender.com/user-api/user-liked/${currentUser.username}`)
    //  let res=await fetch(`http://localhost:4000/user-api/user-liked/${currentUser.username}`)
      let data=await res.json()
      if(res.ok){
        console.log("Fetched Liked Files:", data);
        setliked(data.payload.liked);
        setMsg("")
      }
      else{
        setMsg(data.error)
        }
      }
        catch(err){
          console.log(err)
          setMsg("An error occured while fetching liked items")
    } finally{
      setLoading(false);
    }
  }

  
    useEffect(() => {
      if(currentUser && currentUser.username){
      fetchliked()
      }
    }, [currentUser.username])

  return (
    <>
     <h1 className='text-center mt-4 mb-4 text-primary'>Your Liked Items</h1>
    {loading ? (
        // Show loader while loading
        <div className="loader-container d-flex justify-content-center align-items-center">
          <ClipLoader color={"#2563EB"} loading={loading} size={80} />
        </div>
      ) : msg ? (
        // Show error message if any
        <p className="error-message text-center text-danger">{msg}</p>
      ) : liked && liked.length > 0 ? (
        <div className="file-card-container">
       {liked.map((file, index) => (
          <FileDisplay
            key={index}
            url={file.url}    // Pass file URL
            fileName={file.fileName}      // Pass file name
            tags={file.tags}              // Pass file tags
            uploaderName={file.uploaderName} // Pass uploader's name
          />
        ))}
        </div>
      ) : (
         // Show "No liked items found" message if there are no liked items
         <div className="no-liked-container">
         <h2 className="text-center text-muted">No liked items found.</h2>
         <p className="text-center text-muted">Start liking files to view them here.</p>
       </div>
      )}
    </>
  );
}

export default Liked