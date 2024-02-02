import React, {useState} from 'react';
import seekerLogo  from '../../assets/seekerLogo.png';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineUserSwitch,
} from 'react-icons/ai';
import {BsBriefcase, } from 'react-icons/bs';
import {BiGroup} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './ProfilePopup';


const Topbar = () => {

  const [popupVisible, setpopupVisible] = useState(false);

  const handlePopUp = () => {
    setpopupVisible(!popupVisible);
  }

  let navigate = useNavigate();

  const goToRoute = (route) => {
      navigate(route);
  };

  return (
    <>
    <div>
         <div className='w-[100%] bg-white h-[5rem] flex flex-row'>

         {popupVisible ? (
                    <div className='order-3'>
                      <ProfilePopup />
                    </div>
                  ) : (
                    <></>
                  )}

            <div className='items-center'>
               <img src={seekerLogo} className='h-[5rem]  cursor-pointer'/>
            </div>

            <div className='flex flex-row text-center m-auto justify-between  w-full'>
              <div className='flex flex-row items-start mx-5 space-x-12 '>
                <AiOutlineSearch size={25} className='react-icon cursor-pointer'/>
                <AiOutlineHome size={25} className='react-icon cursor-pointer' onClick={() => goToRoute('/home')}/>
                <BiGroup size={25} className='react-icon cursor-pointer' onClick={() => goToRoute('/connections')}/>
                <AiOutlineMessage size={25} className='react-icon cursor-pointer'/>
                <BsBriefcase size={25} className='react-icon cursor-pointer'/>
                <AiOutlineBell size={25} className='react-icon cursor-pointer'/>
              </div>
              <div>
              <AiOutlineUserSwitch 
                onClick={ handlePopUp}
                size={25} 
                className='react-icon cursor-pointer mr-5'
                />
              </div>
            </div>
         </div>
    </div>
  
    </>
  )
}

export default Topbar