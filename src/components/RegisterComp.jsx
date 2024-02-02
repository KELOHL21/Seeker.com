import React, { useState } from 'react';
import {RegisterApi, GoogleApi } from '../api/AuthApi';
import { postuserData } from '../api/FirestoreApis';
import  seekerLogo  from '../assets/seekerLogo.png';
import illustration from '../assets/illustration/teamwork.png';
import googleLogo from '../assets/google.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUuid } from '../helper/getUuid';
import userImg from "../assets/user.png"

const RegisterComp = () => {

  let navigate = useNavigate();

  const [ credentials , setCredentials] = useState({});

  const register = async () => {

    try{
      let res = await RegisterApi(credentials.email, credentials.password);
      toast.success('Account Created!');
      postuserData({
      userID:getUuid(),
      name:credentials.name, 
      email:credentials.email,
      imageLink:userImg,
    })
      navigate("/home");
      localStorage.setItem('userEmail', res.user.email);
    }catch(err) {
      console.log(err);
      toast.error('Something went wrong.Please try again!');
    }

 };

 const signwithGoogle = () => {
   let res = GoogleApi();
   navigate("/home");
   localStorage.setItem('userEmail', res.user.email);
   console.log(res)
   toast.success('Signed into Seeker!');
 }

  return (

    <div>

      <img src={seekerLogo} className='h-[6rem] ml-[-1.5rem] mt-[-1.5rem] md:h-[6rem]'/>

      <div className='flex flex-col md:grid md:grid-cols-2 md:justify-center  '>

          <div className='md:order-2'>

          <div className='text-center m-auto '>
            <h1 className=' text-5xl mb-[-1rem] relative'>Sign Up to</h1>
              <div className='flex flex-row items-center justify-center'>
              <img src={seekerLogo} className='h-[8rem] ml-[-2rem] mr-[-1rem]'/>
              <p className='text-center ml-[-2rem] text-4xl'>eeker</p>
              </div>
          </div>

          <div className='flex flex-col m-5'>

              <label className='text-left ml-[1rem] mb-[5px] lg:ml-[2rem]'>Enter Your Name</label>
              <input onChange = {(event) => {
                setCredentials({...credentials, name:event.target.value})
              }}
              type='text'
              className=' border-slate-800 border-2 text-left w-[95%] p-[1rem] m-auto rounded-lg '/>
              
              <label className='text-left ml-[1rem] mt-[2rem] lg:ml-[2rem]'>Enter Your Email</label>
              <input onChange = {(event) => {
                setCredentials({...credentials, email:event.target.value})
              }}
              type='email'
              className=' border-slate-800 border-2 text-left w-[95%] p-[1rem] m-auto rounded-lg '/>

              <label className='text-left ml-[1rem] lg:ml-[2rem] mb-[5px] mt-[2rem]'> Enter Your Password</label>
              <input onChange = {(event) => {
                setCredentials({...credentials, password:event.target.value})
              }} 
              type='password'
              className='border-slate-800 border-2 text-left w-[95%] p-[1rem] m-auto rounded-lg bg-white'/>

              <button className='m-auto my-5 text-lg text-white font-semibold bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] rounded-full w-[95%] p-[0.5rem] hover:opacity-90' onClick={register} >Agree & Join</button>
              
              <div className='grid grid-cols-3 m-5 items-center text-center'>

              <hr/>

                <p className='text-xl'>or</p>

              <hr />

              </div>

              <div >

                <div className='border-2 rounded-full text-center py-3 my-1 border-slate-800 mx-5 text-lg font-semibold text-gray-600 cursor-pointer hover:bg-slate-100' onClick = {
                  () => navigate("/")
                }>

                  Already connected? Login now.
                </div>

              </div>


          </div>


          </div>

          <div className='items-center'>
            <img src={illustration} className=' m-auto items-center h-[10rem] md:h-[25rem] md:mt-[8rem] pt-2'/>

            <p className='text-center text-2xl p-5 font-semibold'>Let`s help create a better future for <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] font-semibold'>You</span></p>
          </div>

      </div>

    </div>
  )
}

export default RegisterComp