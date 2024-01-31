import { Button, Modal, Progress } from 'antd';

export default function ImageUploadModal({ modalOpen, setModalOpen, getImage, uploadImage, currentImage, progress }) {
    return (
    <div>
      <Modal
        title="Add Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button 
            disabled= {currentImage.name ? false : true}
            key="submit" 
            type="primary" 
            onClick={uploadImage}
            className='bg-red-500 hover:bg-black' 
          >
            Upload Image
          </Button>,
        ]}>

        <div className='flex flex-col justify-center items-center h-[60px]'>

          {progress === 0 ? 
          (
            <> </>
          ) : 
          (
            <div className='pt-5 w-full'>
                <Progress percent={progress}  />
            </div>
          )}

            <p className='text-base p-2'>{currentImage.name}</p>
           <label htmlFor="imageUpload" className='text-base leading-5 tracking-wide cursor-pointer border-[2px] border-slate-600 p-[10px]'>
            Add Image
           </label>

          <input hidden id="imageUpload" className='w-[100%] text-sm' type={'file'} onChange={getImage} />
        </div>

      </Modal>
    </div>
  );
}
