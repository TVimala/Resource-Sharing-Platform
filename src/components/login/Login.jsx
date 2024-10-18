import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import ClipLoader from 'react-spinners/ClipLoader'; // Using react-spinners for loader

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, isLogin } = useContext(userLoginContext);
  const navigate = useNavigate();
  
  const [userCredErr, setUserCredErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  async function onLogin(userCred) {
    setLoading(true); // Show loader when login starts
    let res = await loginUser(userCred);
    
    if (!isLogin) {
      setUserCredErr('Invalid username or password');
    }
    setLoading(false); // Stop loader after login process
  }

  useEffect(() => {
    if (isLogin) {
      setLoading(false); // Hide loader if login is successful
      navigate('/profile');
    }
  }, [isLogin]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="login-card shadow-lg rounded">
          <h1 className="text-center mb-4 text-primary">Login Form</h1>

          {isLogin === false && userCredErr.length !== 0 && (
            <p className="fs-5 text-danger text-center">{userCredErr}</p>
          )}

          {loading ? (
            // Display spinner while loading is true
            <div className="loader-container d-flex justify-content-center align-items-center">
              <ClipLoader color={"#1976D2"} loading={loading} size={80} />
            </div>
          ) : (
            // Display login form when not loading
            <form onSubmit={handleSubmit(onLogin)} className="login-form p-4">
              <div className="mb-3">
                <label htmlFor="username" className="form-label login-form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  {...register('username', { required: true })}
                  className="form-control login-form-control"
                />
                {errors.username?.type === 'required' && (
                  <p className="text-danger">Username is required</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label login-form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    {...register('password', { required: true })}
                    className="form-control login-form-control"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="btn btn-outline-secondary"
                  >
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>
                {errors.password?.type === 'required' && (
                  <p className="text-danger">Password is required</p>
                )}
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>

              <p className="text-center mt-3 text-white">
                New User? <Link to="/register" className="text-primary">Register</Link>
              </p>
            </form>
          )}
        </div>

        {/* Footer with Copyright */}
        <footer className="footer text-center mt-4">
          <p className="text-white">&copy; {new Date().getFullYear()} ResoLink. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Login;
