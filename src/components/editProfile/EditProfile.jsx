import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/userLoginContext';

function EditProfile() {
  let { register, handleSubmit, setValue } = useForm();
  let { currentUser, setCurrentUser } = useContext(userLoginContext);
  let navigate = useNavigate();

  async function onsave(modifiedUser){
    console.log(modifiedUser)
    let res=await fetch('https://file-api-huow.onrender.com/user-api/update-user',{
      method:'PUT',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(modifiedUser)
    })
    let data=await res.json()
    console.log(data)

    if(data.message='user updated'){
      modifiedUser.id=currentUser.id
      setCurrentUser(modifiedUser); 
      navigate('/user-profile')
    }
  }
  return (
    <div>
       <form className='mx-auto mt-5 bg-light shadow-md p-3' onSubmit={handleSubmit(onsave)}>
            <label htmlFor="" className='form-label'>Username</label>
             <input
                type="text"  
                {...register('username',{required:true})} 
                className='form-control mb-3' 
                name="username" id="username" 
                value={setValue("username",currentUser.username)} 
                disabled />
             
             {/* {errors.username?.type==='required'&& <p className="text-danger">Username is required</p> } */}

            <label htmlFor="" className='form-label'>Email</label>
            <input type="email" {...register('email',{required:true})} className='form-control mb-3' name="email" id="email"
            value={setValue("email",currentUser.email)} />
            {/* {errors.email?.type==='required'&& <p className="text-danger">Email is required</p> } */}

            <label htmlFor="" className='form-label'>Password</label>
            <input type="password" {...register('password',{required:true})} className='form-control mb-3' name="password" id="password" 
             value={setValue("password",currentUser.password)}
            disabled/>
            {/* {errors.password?.type==='required'&& <p className="text-danger">Password is required</p> } */}

            <label htmlFor="" className='form-label'>Mobile</label>
            <input type="tel" {...register('mobile',{required:true})} className='form-control mb-3' name="mobile" id="mobile"
            value={setValue("mobile",currentUser.mobile)} />
            {/* {errors.mobile?.type==='required'&& <p className="text-danger">Mobile is required</p> } */}

            <label htmlFor="" className='form-label'>Paste Img URL</label>
            <input type="text" {...register('image', { required: true })} className='form-control mb-3' id="url"
            value={setValue("image",currentUser.image)}
            disabled />
            {/* {errors.image?.type === 'required' && <p className="text-danger">URL is required</p>} */}

            <button className="btn btn-info d-block mx-auto" type='submit'>Save</button>
          </form>
    </div>
  )
}
export default EditProfile;
