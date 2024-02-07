import { useEffect, useState } from "react";
import { getConnections } from "../../api/FirestoreApis";
import { IoMdPersonAdd } from "react-icons/io";

export default function ConnectionUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setConnection] = useState(false);

  useEffect(() => {
    getConnections(currentUser.id, user.id, setConnection);
  }, [currentUser.id, user.id]);
  
  return (
    isConnected ? 
    (<></>) 
    : 
    (
      <div className="m-2 text-center p-2 h-auto rounded-sm border-2 border-gray-400 flex flex-col justify-between items-center">
        <img src={user.imageLink} alt="profileImg" className="w-[150px] h-[150px] object-cover rounded-full"/>
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-lg font-semibold pt-2">{user.name}</p>
          <p className="text-[12px] font-medium leading-tight tracking-wider h-[50px]">{user.headline}</p>
          <button className="mt-2 border cursor-pointer font-semibold bg-gradient-to-r from-rose-700 to-pink-600 text-white p-[5px] w-full rounded-full flex flex-row items-center justify-center" onClick={() => getCurrentUser(user.id)}>
          <IoMdPersonAdd className="mx-2 " size={20}/> Connect
          </button> 
        </div>
      </div>
    )
  );
}
