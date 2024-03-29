import React, {useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsers } from '../../api/FirestoreApis';
import Button from './Button';
import { Logout } from '../../api/AuthApi';

const ProfilePopup = () => {

  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUsers(setCurrentUser);
  }, []);

  return (
    <div className=' border-2 rounded w-[16rem] flex  flex-col  justify-center h-[15rem] top-[75px] right-[5px] bg-[#ffebee] mr-1 absolute z-[999] items-center drop'>
      <p className="text-center py-2 font-semibold mt-[-1rem]">{currentUser.name}</p>
      <p className="text-[13px] mb-[0.5rem] text-center leading-tight w-[12rem]">{currentUser.headline}</p>
      <Button 
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },  
          })
        }
      />
      <Button
        title="Logout"
        onClick={() => Logout()}
      />
    </div>
  )
}

export default ProfilePopup;