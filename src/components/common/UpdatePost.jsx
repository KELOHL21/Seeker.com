import React, {useState, useMemo} from 'react';
import ModalInput from './Modal';
import { PostStatus, getStatus } from '../../api/FirestoreApis';
import PostCard from './PostCard';
import { getTimeStamp } from '../../helper/useMoment';
import { getUuid } from '../../helper/getUuid';



const UpdatePost = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatus, setAllStatus] = useState([]);
  const sendStatus = async () => {
      let object = {
        status:status,
        timestamp:getTimeStamp('lll'),
        userEmail : currentUser.email,
        userName: currentUser.name,
        userID: currentUser.userID,
        postId: getUuid(),
      }
      await PostStatus(object);
      await setStatus("");
      await setModalOpen(false);
  }
  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  // console.log(currentUser.name);

  return (
    <div>
      <div className="h-[7rem] bg-white w-[100%] align-middle justify-center rounded-lg ">
         <div className='flex justify-center align-middle items-center h-[7rem]'>
         <button onClick={() => setModalOpen(true) } className=' w-[85%] text-center tracking-wider p-2 text-xl rounded-full border-2 border-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845] font-medium'>Create a Post</button>
         </div>
      </div>

      <ModalInput 
        onClick={sendStatus}
        setStatus={setStatus}
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        status = {status}
        sendStatus = {sendStatus}
      />

      <div>
        {allStatus.map((posts)=> {
            return(
              <div key={posts.id} >
                  <PostCard posts={posts}/>
              </div>
            )
          })}
      </div>
    </div>

  )
}

export default UpdatePost