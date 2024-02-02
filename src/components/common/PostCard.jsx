import React, { useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsers, getUsers, deletePost } from '../../api/FirestoreApis';
import LikeButton from './LikeBtn';
import { BsPencil, BsTrash } from 'react-icons/bs';

const PostCard = ({ posts, id, getEditData }) => {

  let navigate = useNavigate();

  const [currentUser,setCurrentUser] = useState({});
  const [allusers,setAllUsers] = useState([])

  useMemo(() => {
    getCurrentUsers(setCurrentUser);
    getUsers(setAllUsers);
  }, [])

  console.log(allusers)

  return (
    <div className="h-auto bg-white w-[100%] text-left align-middle mt-[30px] rounded-sm items-center p-5" key={id}>

     <div className='flex justify-between items-center -mt-3'>
        <div className='flex items-center'>
          
          <div className='w-14 h-14'>
            <img 
            src={allusers.filter((item)=> item.id === posts.userID).map((item)=> (item.imageLink))[0]} 
            alt='userProfileImg'
            className='w-full h-full object-cover rounded-full text-[10px] text-center'      
              ></img>
          </div>
    
            <div className='p-3'>
                {/* Navigating us to the currentUser via their unique Id and email address */}
                <p className="text-left text-[15px] text-gray-600 font-semibold mb-[-0.8rem] underline cursor-pointer" 
                onClick={() => navigate('/profile', {
                  state: {id:posts?.userID, email:posts.userEmail},
                })
                }>{allusers.filter((users) => users.id === posts.userID)[0]?.name}</p>
                <p className='text-[12px] max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-500 leading-tight pt-2'>{allusers.filter((users) => users.id === posts.userID)[0]?.headline}</p>
                <p className='text-[12px] text-gray-400 text-left font-semibold '>{posts.timestamp}</p>
            </div>
    
          </div>

          {/* ALLOW ONLY YOUR POST CAN BE EDITED AND DELTED */}
          <div>
           {currentUser.id === posts.userID ? (
           <div className='flex flex-row items-center '> 

              <BsPencil size={19}  
                onClick={() => getEditData(posts)} 
                className=' text-gray-500 cursor-pointer hover:text-gray-800'/>
            
              <BsTrash 
                size={19} 
                className='ml-2 text-gray-500 cursor-pointer'
                onClick={ () => deletePost(posts.id)}
                />       
            </div> 
              )
               : 
               (<> </>)
             } 
          </div>

      </div>
      
      
      
    
      <p className='text-left font-medium text-sm py-2'>{posts?.status}</p>

      <LikeButton userId={currentUser?.userID} postId={posts?.id} currentUser={currentUser}  />
      

    </div>
  )
  
}



export default PostCard