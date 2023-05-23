import React, { useState } from 'react';
import {LoginApi, GoogleApi} from '../api/AuthApi';
import  seekerLogo  from '../assets/seekerLogo.png';
import illustration from '../assets/illustration/character 16.png';
import googleLogo from '../assets/google.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const LoginComp = () => {

  let navigate = useNavigate();

  const [ credentials , setCredentials] = useState({});

  const login = async () => {

    try{
      let res = await LoginApi(credentials.email, credentials.password);
     toast.success("Signing into Seeker!");
     localStorage.setItem('userEmail', res.user.email);
     navigate("/home");

    }catch(err) {
      console.log(err);
      toast.error("Please check your Email and Password!");
    }

 };

 const signwithGoogle = () => {
   let response =GoogleApi();
   localStorage.setItem('userEmail', response.user.email);
   toast.success('Signing into Seeker!');
   navigate("/home");

 }

  return (

    <div>

      <img src={seekerLogo} className='h-[6rem] ml-[-1.5rem] mt-[-1.5rem]'/>

      <div className='flex flex-col md:grid md:grid-cols-2 md:justify-center md:mt-[6rem]'>

          <div>

          <div className='text-center m-auto '>
            <h1 className=' text-5xl mb-[-1.8rem] relative'>Welcome to</h1>
              <div className='flex flex-row items-center justify-center'>
              <img src={seekerLogo} className='h-[8rem] ml-[-2rem] mr-[-1rem]'/>
              <p className='text-center ml-[-2rem] text-3xl'>eeker</p>
              </div>
          </div>

          <div className='flex flex-col m-5'>

              <label className='text-left ml-[1rem] mb-[5px] lg:ml-[2rem]'> Enter Your Email</label>
              <input onChange = {(event) => {
                setCredentials({...credentials, email:event.target.value})
              }}
              className=' border-slate-800 border-2 text-left w-[95%] p-[1rem] m-auto rounded-lg '/>

              <label className='text-left ml-[1rem] lg:ml-[2rem] mb-[5px] mt-[2rem]'> Enter Your Password</label>
              <input onChange = {(event) => {
                setCredentials({...credentials, password:event.target.value})
              }} type='password'
              className='border-slate-800 border-2 text-left w-[95%] p-[1rem] m-auto rounded-lg bg-white'/>

              <p className='py-[1rem] ml-[1rem] lg:ml-[2rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] cursor-pointer'>Forgot your password?</p>

              <button className='m-auto text-lg text-white font-semibold bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] rounded-full w-[95%] p-[0.5rem] hover:opacity-90' onClick={login} >Sign in</button>
              
              <div className='grid grid-cols-3 m-5 items-center text-center'>

              <hr className='b-black'/>

                <p className='text-xl'>or</p>

              <hr />

              </div>

              <div className='flex flex-col'>

                <div className='border-2 rounded-full text-center py-3 border-slate-800 mx-5 flex flex-row justify-center text-lg font-semibold text-gray-600 cursor-pointer hover:bg-slate-100' onClick={signwithGoogle}>

                 <img src={googleLogo} className='h-7 items-center px-2'/> 
                 
                 Sign in with Google

                </div>

                <div className='border-2 rounded-full text-center py-3 my-5 border-slate-800 mx-5 text-lg font-semibold text-gray-600 cursor-pointer hover:bg-slate-100' onClick = {
                  () => navigate("/register")
                }>

                  New to Seeker? Join us now.
                </div>

              </div>


          </div>


          </div>

          <div className='items-center'>
            <img src={illustration} className=' m-auto items-center h-[10rem] md:h-[25rem] md:mt-[8rem] pt-2'/>

            <p className='text-center text-2xl p-5 font-semibold'>Let's make your dream a reality. <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] font-semibold'>Together!</span></p>
          </div>

      </div>

    </div>
  )
}

export default LoginComp