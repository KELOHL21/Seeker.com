import React, {useState, useMemo} from 'react';
import { getSinglePost, getSingleUser, editProfile } from '../../api/FirestoreApis';
import PostCard from './PostCard';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from  'react-icons/hi'
import { uploadImage as uploadImageAPI } from '../../api/ImageStorage';
import ImageUploadModal from './ImageUploadModal';


const ProfileCard = ({currentUser, onEdit}) => {

  let location = useLocation();

  const [allStatus, setAllStatus] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [currentProfile, setCurrentProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress,setProgress] = useState(0)

    // Image Input Function
    const getImage = (event) => {
      setCurrentImage(event.target.files[0]);
    }


    const uploadImage = () => {
      uploadImageAPI(currentImage, currentUser.id, setModalOpen, setProgress,setCurrentImage);
      setCurrentImage({})
    };


  useMemo(() => {
    if (location?.state?.id) {
      getSinglePost(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, [])

  return (
    <div>

    <ImageUploadModal 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen} 
      getImage={getImage} 
      uploadImage={uploadImage}
      currentImage={currentImage}
      progress={progress}
    />
  
    <div className="bg-slate-100 h-auto max-w-[1200px] m-auto rounded-sm">
  
       <div className='flex flex-row items-center justify-between  w-[100%]  p-2 rounded-sm'>

          {/* Left side */}
          <div className='text-left md:p-[5px] cursor-pointer'>

            <img 
              className="w-[200px] h-[200px] object-cover rounded-full border-2 p-[5px] border-[#cacaca]" 
              src={currentUser?.imageLink} 
              alt='profileImg' 
              onClick={() => setModalOpen(true) }>
            </img>

            <div className='flex flex-row items-center'>
               {/* Name */}
                <h3 className='text-[18px] font-bold text-left text-gray-900'>
                  {/* Checking whether the profile that is displayed is === 0 if so current user is displayed if not the the current profile clicked will be displayed */}
                  {Object.values(currentProfile).length === 0
                  ? currentUser.name
                  : currentProfile?.name}
                </h3>

                <div>
                  <HiOutlinePencil className='absolute right-[2.54rem] -mt-[12rem] hover:text-gray-500 cursor-pointer border-2' onClick={onEdit} size={25}/>
              </div>
            </div>
               

                {/* email */}
                <p className='text-left text-[12px] text-gray-700 tracking-wide -mt-2'>
                {Object.values(currentProfile).length === 0 
                ? currentUser.email
                : currentProfile?.email}
                </p>

                {/* Headline */}
                <p className='text-left text-[13px] text-gray-700 w-[280px] leading-5 tracking-wide mt-[-0.5rem] font-semibold'>
                {Object.values(currentProfile).length === 0 
                ? currentUser.headline
                : currentProfile?.headline}  
                </p>

                {/* Website */}
                <div className=''>
                  <p className='text-left pt-2  text-gray-700  text-sm leading-5 tracking-wide'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.location
                  : currentProfile?.location}
                </p>
                  <a className='text-left text-xs text-blue-700  tracking-wide font-semibold hover:text-black underline' 
                  href={
                    Object.values(currentProfile).length === 0 
                      ? currentUser.website
                      : currentProfile?.website
                      }
                      target='_blank'>
                        {
                    Object.values(currentProfile).length === 0 
                      ? currentUser.website
                      : currentProfile?.website
                      }
                  </a>
                </div>
          </div>

          {/*Right Side Country & education */}
          <div>
               <p className='text-left pt-2  text-gray-700 -mt-[6.5rem] text-sm font-semibold leading-5 tracking-wide'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.company
                  : currentProfile?.company}
                </p>
                <p className=' text-sm font-semibold leading-5 tracking-wide text-left text-gray-700'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.education
                  : currentProfile?.education}
                </p>
          </div>
          
       </div>
      
        {/*  About */}
        <div>
        <p className='text-left text-[15px] pl-[10px] leading-tight tracking-wide'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.aboutMe
                  : currentProfile?.aboutMe}
        </p>
       </div>

        {/*  Skills */}
        <div>
        <p className='text-left text-[15px] pl-[10px] leading-tight p-2 tracking-wide'>

                  <span className='font-bold'>Skills: </span> 
                  
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.skills
                  : currentProfile?.skills}
        </p>
       </div>
      
    </div>
    
      <div className='mt-[0.5rem] rounded-sm w-[400px] m-auto'>
                  {allStatus?.map((posts) => {
                            return (
                              <div key={posts.id}>
                                <PostCard posts={posts} />
                              </div>
                            );
                          })}
      </div>

        </div>
  )
}

export default ProfileCard 






