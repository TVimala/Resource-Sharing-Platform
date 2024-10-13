import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function onUserRegister(newUser) {
        try {
            let res = await fetch("http://localhost:4000/user-api/user", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            let msg = await res.json();
            if (msg.message === "user created") {
                navigate('/login');
            } else {
                setErr(msg.message);
            }
        } catch (err) {
            setErr(err.message);
        }
    }
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    return (
        <>
           <div className='register-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100'>
<div className="register-card shadow-lg rounded">
<h1 className="text-center mb-4 text-primary">Register</h1>    
{err && <p className="text-danger">{err}</p>}

    <form onSubmit={handleSubmit(onUserRegister)} className='register-form p-4'>

        <div className='mb-3'>
            <label htmlFor="username" className='form-label'>Username</label>
            <input 
                type="text" 
                id='username'
                {...register('username', { required: true })}
                className='form-control' />
            {errors.username && <p className='text-danger'>Username required</p>}
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

        <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input 
                type="email" 
                id='email'
                {...register('email', { required: true })}
                className='form-control' />
            {errors.email && <p className='text-danger'>Email required</p>}
        </div>

        <div className='mb-3'>
            <label htmlFor="number" className='form-label'>Phone Number</label>
            <input 
                type="number" 
                id='number'
                {...register('number', { required: true })}
                className='form-control' />
            {errors.number && <p className='text-danger'>Phone number required</p>}
        </div>

        <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
    </form>
</div>
           </div>
        </>
    );
}
export default Register;
