import React from 'react'
import './Login.css'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';
function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div>
        <div className=''>
        <h1 className='text-center'>Login</h1>
        <div className='row'>
        <div className='col-11 col-sm-10 col-md-6 mx-auto'>
            <form action="" className=' login rounded p-5'>
            <div className='mb-3'>
         <label htmlFor="username" className='form-label'>Username</label>
         <input type="text" id='username'{...register('username',{required:true})} className='form-control' />
          {errors.username?.type==='required' && <p className='text-danger'>Username required</p>}
        </div>
        <div className='mb-3'>
         <label htmlFor="password" className='form-label'>Password</label>
         <input type="password" id='password'{...register('password',{required:true})} className='form-control' />
         {/* <div className='d-flex'>
         <input type={showPassword ? "text" : "password"} id='password' {...register('password',{required:true})} className='form-control' />
         <button onClick={handleTogglePassword} className='border-0'>
        {showPassword ? <IoMdEye />:<IoMdEyeOff />
        }
         </button>
          </div> */}
         {errors.password?.type==='required' && <p className='text-danger'>Password Required</p>}
        </div>
        <div className='d-flex justify-content-evenly'>
            <button className=' btn btn-dark'>Login</button>
        </div>
        <p className='text-center'>New User? <Link to="/register">Register</Link></p>
        </form>
        </div> 
        </div>
        </div>
    </div>
  )
}
export default Login