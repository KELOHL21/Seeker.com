import React from 'react';
import Topbar from './common/Topbar';
import UpdatePost from './common/UpdatePost'

const HomeComp = ({currentUser}) => {
  return (
    <div className='h-[100%] bg-gradient-to-r from-rose-700 to-pink-600 text-center p-5 text-2xl'>
      <UpdatePost currentUser={currentUser}/>
    </div>
  )
}

export default HomeComp

// Maybe Use this color
// bg-gradient-to-r from-[#FF5733]  via-[#C70039] to-[#701b57]

