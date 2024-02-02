import React, {useState, useMemo} from 'react';
import ModalInput from './Modal';
import { PostStatus, getStatus, updatePost } from '../../api/FirestoreApis';
import PostCard from './PostCard';
import { getTimeStamp } from '../../helper/useMoment';
import { getUuid } from '../../helper/getUuid';



const UpdatePost = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [currentPost, setCurrentPost]= useState({});
  
  const sendStatus = async () => {
      let object = {
        status:status,
        timestamp:getTimeStamp('lll'),
        userEmail : currentUser.email,
        userName: currentUser.name,
        userID: currentUser.id,
        postId: getUuid(),
      }
      await PostStatus(object);
      await setStatus("");
      await setModalOpen(false);
      setisEdit(false);
  }
 
  const getEditData = (posts) => {
    setCurrentPost(posts)
    setStatus(posts?.status)
    setModalOpen(true);
    setisEdit(true);
  }

  const updateStatus = () => {

    updatePost(currentPost.id, status)
    setModalOpen(false);
  }

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div>

      <div className='h-[13rem] bg-white my-5 flex flex-col justify-center items-center'>
        <div>
          <img className='w-[110px] h-[110px] object-cover rounded-full border-5 -mt-[2rem]  border-[#a5a5a5] items-center' src={currentUser?.imageLink} alt='profileImg' />
        </div>

        <div>
          <p className='p-5 tracking-wide text-[20px] font-semibold'>{currentUser?.name}</p>
          <p className='text-[14px] tracking-wider leading-5 w-auto px-3 font-semibold -mt-[1rem] text-gray-500'>{currentUser?.headline}</p>
        </div>
      </div>

      <div className="h-[7rem] bg-white w-[100%] justify-center rounded-lg ">
         <div className='flex justify-center items-center  h-[7rem]'>
         <div>
          <img className='w-[60px] h-[60px] object-cover rounded-full border-3 mx-[10px]  border-[#cacaca] items-center' src={currentUser?.imageLink} alt='profileImg' />
        </div>
         <button onClick={() => {setModalOpen(true); setisEdit(false)}} className=' w-[70%] text-center capitalize text-gray-500 tracking-wider p-[5px] text-xl rounded-full border-2 mx-2 border-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] font-medium'>
          Create a Post
          </button>
         </div>
      </div>

      <ModalInput 
        onClick={sendStatus}
        setStatus={setStatus}
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        status = {status}
        sendStatus = {sendStatus}
        isEdit= {isEdit}
        updateStatus= {updateStatus}
      />

      <div>
        {allStatus.map((posts)=> {
            return(
              <div key={posts.id} >
                  <PostCard posts={posts} getEditData={getEditData}/>
              </div>
            )
          })}
      </div>
    </div>

  )
}

export default UpdatePost