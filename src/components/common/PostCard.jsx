import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ posts, id }) => {

  let navigate = useNavigate();
  
  return (
    <div className="h-auto bg-white w-[100%] align-middle mt-[30px] rounded-sm items-center p-5" key={id}>

      {/* Navigating us to the currentUser via their unique Id and email address */}
      <p className="text-left text-[15px] text-gray-600 font-semibold mb-[-0.8rem] underline cursor-pointer" 
      onClick={() => navigate('/profile', {
        state: {id:posts?.userID, email:posts.userEmail},
      })
      }>{posts.userName}</p>
      <p className='text-[12px] text-gray-400 text-left font-semibold '>{posts.timestamp}</p>
      <p className='text-left font-medium text-sm py-2'>{posts.status}</p>

    </div>
  )
}

export default PostCard