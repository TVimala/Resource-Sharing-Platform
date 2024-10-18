import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import './Streak.css';
function Streak() {
    const { currentUser } = useContext(userLoginContext);
      const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

 const fetchUserStreak = async () => {
  try {
    let username = currentUser.username;
    //const res = await fetch(`https://file-api-huow.onrender.com/user-api/user-streak/${username}`);
    const res = await fetch(`http://localhost:4000/user-api/user-streak/${username}`);

    if (!res.ok) {
      throw new Error(`Server error: ${res.statusText}`);
    }
    
    const data = await res.json(); // Parse the response as JSON
    console.log(data); // Log to inspect the response

    if (data && data.currentStreak !== undefined && data.longestStreak !== undefined) {
      setCurrentStreak(data.currentStreak);
      setLongestStreak(data.longestStreak);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid response structure');
    }
    
  } catch (err) {
    console.error('Error fetching streak:', err);
    setErrorMsg('An error occurred while fetching streak');
  }
};

  useEffect(() => {
    if(currentUser && currentUser.username){
    fetchUserStreak()
    }
  }, [currentUser])
  return (
    <div className="container-streak rounded">
      <h2 className="text-white text-center">Streak</h2>
      <div className="d-flex justify-content-around">
        <div className="current">
          <p className="text-white">Current Streak</p>
          <p className="streak-number">{currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}</p>
        </div>
        <div className="longest">
          <p className="text-white">Longest Streak</p>
          <p className="streak-number">{longestStreak} {longestStreak === 1 ? 'Day' : 'Days'}</p>
        </div>
      </div>
      {errorMsg && <p className="text-danger">{errorMsg}</p>}
    </div>
  );
}

export default Streak;
