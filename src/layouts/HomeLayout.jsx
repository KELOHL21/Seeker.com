import { useMemo, useState } from 'react';
import { getCurrentUsers } from '../api/FirestoreApis';
import HomePage from '../pages/HomePage';
import Topbar from '../components/common/Topbar';

const HomeLayout = () => {

  const [currentUser, setCurrentUser]= useState({});
  useMemo(() => {
    getCurrentUsers(setCurrentUser)
  },[]);

  return (
   <>
      <Topbar />
      <HomePage currentUser={currentUser}/>
   </> 
  )
}

export default HomeLayout