import React, { useState } from 'react'
import ProfileCard from './common/ProfileCard';
import EditBtn from './common/EditBtn';

const ProfileComp = ({currentUser}) => {

  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(!isEdit);
  }

  return (
    <>
    {isEdit ? <EditBtn onEdit={onEdit} currentUser={currentUser} /> : <div className=' h-full bg-gray-300 text-center p-5 text-2xl'>
      <ProfileCard currentUser={currentUser} onEdit={onEdit}/>
    </div> }
    </>
  )
}

export default ProfileComp