import React, {useEffect, useState} from 'react';
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
import SearchUsers from './SearchUsers';
import { getUsers } from '../../api/FirestoreApis';


const Topbar = ({currentUser}) => {  
  
  let navigate = useNavigate();

  // States
  const [popupVisible, setpopupVisible] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isSearchInput,setIsSearchInput] = useState('');
  const [searchUsers, setSearchUsers] = useState([])
  const [users,setUsers] = useState([]);

  // Functions
  const handlePopUp = () => {
    setpopupVisible(!popupVisible);
  }  
  
  const goToRoute = (route) => {
      navigate(route);
  };

  // Search Function
  const handleSearch = () => {

    if (isSearchInput !== '') {
      let searchResponse =  users.filter((user) => {
      // Converting all users to a value/array
        return Object.values(user)
        .join("")
        .toLowerCase()
        .includes(isSearchInput.toLowerCase())
        })

        setSearchUsers(searchResponse);
    }else {

      setSearchUsers(users);

    }   
  };

  const openUserProfile = (user) => {
    navigate('/profile', {
      state : {
        id:user.id,
        email:user.email,
      }} )
  }

//  Effects

  useEffect(() => {
    getUsers(setUsers);
  },[])

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch()
    }, 1000)

    return () => clearTimeout(debounced)

  },[isSearchInput])



  return (
    <>
    <div>
         <div className=' bg-white items-center h-[5rem] flex flex-row text-center justify-between w-full'>

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

            {isSearch ? (<SearchUsers setIsSearch={setIsSearch} setIsSearchInput={setIsSearchInput} /> ) : (
              <div className=''>
              <div className='flex flex-row items-start space-x-7'>
                <AiOutlineSearch size={25} className='react-icon cursor-pointer' onClick={() => setIsSearch(true)}/>
                <AiOutlineHome size={25} className='react-icon cursor-pointer' onClick={() => goToRoute('/home')}/>
                <BiGroup size={25} className='react-icon cursor-pointer' onClick={() => goToRoute('/connections')}/>
                <AiOutlineMessage size={25} className='react-icon cursor-pointer'/>
                <BsBriefcase size={25} className='react-icon cursor-pointer'/>
                <AiOutlineBell size={25} className='react-icon cursor-pointer'/>
              </div>
              <div>
              </div>
            </div>
            ) }

            <div className='w-12 h-12 items-center mr-2' onClick={ handlePopUp}>
             <img className='rounded-full h-full w-full object-cover' src={currentUser.imageLink} alt='profileImg'/>
            </div>
       
         </div>

        {/* Search Results Div */}

        {isSearchInput.length === 0 ? 

        (<></>) 
         : 
        (
            <div className='w-auto h-auto left-[8rem] top-[4rem] bg-white absolute rounded-md border-[2px] border-slate-300'> 
            
           {searchUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
           ) 
          
          :

          (searchUsers.map((user) => (

              <div key={user.name} className='p-[2px] hover:bg-slate-400 hover:cursor-pointer hover:transition-all flex flex-row items-center space-x-3 py-[8px] w-auto'onClick={() => openUserProfile(user)}> 

                <div className='w-14 h-14'>
                    <img src={user.imageLink} alt='profileImg' className='w-full h-full object-cover rounded-full text-[10px] text-center border-[2px] border-gray-300 p-[2px]'/>
                </div>

                <p className='font-semibold tracking-wider px-7'>{user.name}</p>

              </div>)

            ))}

            </div>
        )}


    </div>
    </>
  )
}

export default Topbar