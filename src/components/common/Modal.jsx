import React, { useState } from 'react';
import { Modal, Button,Progress } from 'antd';
import { SlPicture } from "react-icons/sl";
import ReactQuill from 'react-quill';

const ModalInput = ({ 
  modalOpen, 
  setModalOpen, 
  sendStatus, 
  setStatus, 
  status, 
  isEdit, 
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost
 }) => {

  const [progress,setProgress] = useState(0)

  return (
    
    <>
          <Modal
            title="Share your thoughts"
            centered
            open={modalOpen}
            // Allows the status thatas already been wrriten to display when edit button is clicked
            onOk={() => {
              setStatus("");
              setModalOpen(false)
              setCurrentPost({})
              setPostImage("")
            }}
            onCancel={() => {
              setStatus("");
              setModalOpen(false)
              setPostImage("")
              setCurrentPost({})
            }}
            footer ={[
              <Button 
              onClick={isEdit ? updateStatus : sendStatus}
              key='submit' 
              type='primary' 
              className=' w-[5rem] text-white bg-rose-500 ' 
              disabled={status.length > 0 ? false : true }
             >
                {isEdit ? "Update" : "Post"}

              </Button>
              
            ]}
          >
          
        <textarea 
          placeholder="What is on your mind?" 
          className='w-[98%] resize-none p-2 text-lg border-2 border-gray-400 rounded-md'
          onChange={(event) => setStatus(event.target.value)}      
          value={status}
        />

        {progress === 0 || progress === 100 ? (<></>) 
        
        : 
        
        (<div>
          <Progress percent={progress}  />
        </div>)
        
        }

        {postImage?.length > 0 || currentPost?.postImage?.length ? 
            (<img src={postImage || currentPost?.postImage} alt='postImg' className='rounded-sm h-[20%] object-contain  w-[99%]'/>) 
            : 
            (<></>)
        }

        <div>
          <label htmlFor="pic-upload" className='absolute bottom-[20px]'>
                  <SlPicture size={30} className='text-gray-500 hover:text-gray-600 hover:cursor-pointer'/>
          </label>

          <input id='pic-upload' type={"file"} hidden onChange={(event) => uploadPostImage(event.target.files[0], setPostImage, setProgress)}/>
        </div>
        

        </Modal>   



    </>

  );
};

export default ModalInput;