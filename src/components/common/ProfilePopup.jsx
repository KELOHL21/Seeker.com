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
    <div className=' border-2 rounded w-[16rem] flex flex-col justify-center h-[15rem] mt-[4rem] ml-[-16rem] bg-white mr-1 absolute z-[999] items-center'>
      <p className="text-center py-2 font-semibold mt-[-1rem]">{currentUser.name}</p>
      <p className="text-[13px] mb-[0.5rem] text-center leading-tight w-[12rem]">{currentUser.headline}</p>
      <Button 
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.userID,
            },
          })
        }
      />
      <Button
        title="Logout"
        onClick={Logout}
      />
    </div>
  )
}

export default ProfilePopup