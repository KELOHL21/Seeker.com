import React, {useState, useMemo} from 'react';
import { Logout } from '../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsers } from '../../api/FirestoreApis';
import Button from './Button';

const ProfilePopup = () => {

  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUsers(setCurrentUser);
  }, []);

  return (
    <div className=' border-2 rounded-lg w-[7rem] flex flex-col justify-center h-[8rem] mt-[4rem] ml-[-8rem] bg-white mr-1 absolute z-[999]'>
      <Button title="View Profile"/>
      {/* <ul className='text-left text-sm px-2 py-5 cursor-pointer'>
        <button
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.userID,
            },
          })
        }
      > Profile </button>
        
      </ul> */}
       <button onClick={Logout}>
            Logout
         </button>
    </div>
  )
}

export default ProfilePopup