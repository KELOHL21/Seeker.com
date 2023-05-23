import React from 'react';
import Topbar from './common/Topbar';
import UpdatePost from './common/UpdatePost'

const HomeComp = ({currentUser}) => {
  return (
    <div className='h-full w-full bg-gray-300 text-center p-5 text-2xl'>
      <UpdatePost currentUser={currentUser}/>
    </div>
  )
}

export default HomeComp

// Maybe Use this color
// bg-gradient-to-r from-[#FF5733]  via-[#C70039] to-[#701b57]