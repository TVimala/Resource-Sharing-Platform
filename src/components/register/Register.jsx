import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
      <>
        <h1 className='text-center mb-3'>Register</h1>

        <div className="row">
        <div className='col-11 col-sm-10 col-md-6 mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='register-form rounded p-5'>

                <div className='mb-3'>
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" id='username' 
                      {...register('username', { required: true })} 
                      className='form-control' />
                    {errors.username?.type === 'required' && <p className='text-danger'>Username required</p>}
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" id='password' 
                      {...register('password', { required: true })} 
                      className='form-control' />
                    {errors.password?.type === 'required' && <p className='text-danger'>Password Required</p>}
                </div>

                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" id='email' 
                    {...register('email', { required: true })} 
                    className='form-control' />
                    {errors.email?.type === 'required' && <p className='text-danger'>Email required</p>}
                </div>

                <div className='mb-3'>
                    <label htmlFor="number" className='form-label'>Phone Number</label>
                    <input type="number" id='number' 
                    {...register('number', { required: true })} 
                    className='form-control' />
                    {errors.number?.type === 'required' && <p className='text-danger'>Phone Number required</p>}
                </div>

                <div className="d-flex justify-content-evenly">
                <button type="submit" className='btn btn-dark'>Register</button>
                </div>
            </form>
            </div>
            </div>
            </>
    );
}

export default Register;
