import React from 'react'
import './Login.css'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
      console.log(data);
      // Handle login logic here, e.g., API call
      // After successful login, navigate to another page
      // navigate('/dashboard');
    };
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

  return (
    <>
    <h1 className="text-center mb-4">Login</h1>
    <div className="row">
      <div className="col-11 col-sm-10 col-md-6 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form rounded p-5">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              id="username" 
              {...register('username', { required: true })} 
              className="form-control" 
            />
            {errors.username?.type === 'required' && (
              <p className="text-danger">Username is required</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: true })}
                className="form-control"
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
          <div className="d-flex justify-content-evenly">
            <button type="submit" className="btn btn-dark">Login</button>
          </div>
          <p className="text-center mt-3">
            New User? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  </>
  )
}
export default Login