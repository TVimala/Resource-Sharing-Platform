import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Register.css'; // Make sure this file is also updated for any specific styles if necessary
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Using react-spinners for loader

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  async function onUserRegister(newUser) {
    setLoading(true); // Show loader when registration starts
    try {
      console.log(newUser);
      let res=await fetch("https://file-api-xi.vercel.app/user-api/user",{
     // let res=await fetch("https://file-api-huow.onrender.com/user-api/user",{
      //let res = await fetch("http://localhost:4000/user-api/user", {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      let msg = await res.json();
      console.log(msg);
      if (msg.message === "user created") {
        navigate('/login');
      } else {
        setErr(msg.message);
      }
    } catch (err) {
      console.log(err);
      setErr(err.message);
    } finally {
      setLoading(false); // Hide loader after registration process
    }
  }

  return (
    <>
      <div className="register-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="register-card shadow-lg rounded">
          <h1 className='text-center mb-4 text-primary'>User Registration Form</h1>

          {err && <p className="text-danger text-center">{err}</p>}

          {loading ? (
            // Display spinner while loading is true
            <div className="loader-container d-flex justify-content-center align-items-center">
              <ClipLoader color={"#1976D2"} loading={loading} size={80} />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onUserRegister)} className='register-form p-4'>
              <div className='mb-3'>
                <label htmlFor="username" className='form-label register-form-label'>Username</label>
                <input
                  type="text"
                  id='username'
                  placeholder="Enter your username" 
                  {...register('username', { required: true })}
                  className='form-control register-form-control'
                />
                {errors.username?.type === 'required' && <p className='text-danger'>Username required</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor="password" className='form-label register-form-label'>Password</label>
                <input
                  type="password"
                  id='password'
                  placeholder="Enter your password" 
                  {...register('password', { required: true })}
                  className='form-control register-form-control'
                />
                {errors.password?.type === 'required' && <p className='text-danger'>Password Required</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor="email" className='form-label register-form-label'>Email</label>
                <input
                  type="email"
                  id='email'
                  placeholder="Enter your email"
                  {...register('email', { required: true })}
                  className='form-control register-form-control'
                />
                {errors.email?.type === 'required' && <p className='text-danger'>Email required</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor="number" className='form-label register-form-label'>Phone Number</label>
                <input
                  type="number"
                  id='number'
                  placeholder="Enter your phone number"
                  {...register('number', { required: true })}
                  className='form-control register-form-control'
                />
                {errors.number?.type === 'required' && <p className='text-danger'>Phone Number required</p>}
              </div>

              <div className="d-flex justify-content-evenly">
                <button type="submit" className='btn btn-primary'>Register</button>
              </div>
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

export default Register;
