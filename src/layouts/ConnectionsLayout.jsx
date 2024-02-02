import { useMemo, useState } from 'react';
import { getCurrentUsers } from '../api/FirestoreApis';
import Topbar from '../components/common/Topbar';
import Connections from '../pages/Connections';

const ConnectionsLayout  = () => {

  const [currentUser, setCurrentUser]= useState({});
  useMemo(() => {
    getCurrentUsers(setCurrentUser)
  },[]);

  return (
   <>
      <Topbar />
      <Connections currentUser={currentUser}/>
   </> 
  ) 
}

export default ConnectionsLayout 