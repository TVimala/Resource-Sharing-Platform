import { useState,useContext,useEffect } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'
import './Streak.css';
function Streak() {
    const { currentUser } = useContext(userLoginContext);
      const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const fetchUserStreak = async (username) => {
    try {
      const res = await fetch(`http://localhost:4000/user-api/user-streak/${currentUser.username}`);
      console.log(res.data);
      setCurrentStreak(res.data.currentStreak);
      setLongestStreak(res.data.longestStreak);
      setErrorMsg('');
    } catch (err) {
      console.log('Error fetching streak:', err);
      setErrorMsg('An error occurred while fetching streak');
    }
  };
  useEffect(() => {
    if(currentUser && currentUser.username){
    fetchUserStreak()
    }
  }, [currentUser.username])
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
