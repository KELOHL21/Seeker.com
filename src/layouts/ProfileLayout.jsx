import React, {useMemo, useState} from 'react'
import TopBar from '../components/common/Topbar'
import { getCurrentUsers } from '../api/FirestoreApis';
import ProfilePage from '../pages/ProfilePage';


const ProfileLayout = () => {

   const [currentUser, setCurrentUser] = useState({});

   useMemo(() => {
      getCurrentUsers(setCurrentUser);
   },[])
  return (
   <>
   <TopBar />
   <ProfilePage currentUser={currentUser}/>
   </>
  )
}

export default ProfileLayout