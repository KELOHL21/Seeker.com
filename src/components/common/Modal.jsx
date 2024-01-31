import React, { useState } from 'react';
import { Modal, Button,ConfigProvider } from 'antd';

const ModalInput = ({ modalOpen, setModalOpen, sendStatus, setStatus, status, isEdit, updateStatus }) => {

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
            }}
            onCancel={() => {
              setStatus("");
              setModalOpen(false)
            }}
            footer ={[
              <Button 
              onClick={isEdit ? updateStatus : sendStatus}
              key='submit' 
              type='primary' 
              className=' w-[5rem] text-gray-600' 
              disabled={status.length > 0 ? false : true }
             >
                {isEdit ? "Update" : "Post"}
              </Button>
              
            ]}
          >
          
        <input 
          placeholder="What is on your mind?" 
          className='w-[98%] p-2 text-lg border-2 border-gray-200 rounded-full'
          onChange={(event) => setStatus(event.target.value)}      value={status}
        />
        
          </Modal>   



    </>

  );
};

export default ModalInput;