import React, {useState, useMemo} from 'react';
import { getSinglePost, getSingleUser } from '../../api/FirestoreApis';
import PostCard from './PostCard';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from  'react-icons/hi'


const ProfileCard = ({currentUser, onEdit}) => {

  let location = useLocation();

  const [allStatus, setAllStatus] = useState([]);

  const [currentProfile, setCurrentProfile] = useState({});

  useMemo(() => {
    if (location?.state?.id) {
      getSinglePost(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <div>


    <div className="bg-slate-100 h-auto max-w-[1200px] m-auto rounded-sm">
       
       <div className='flex flex-row items-center justify-between  w-[100%]  p-2 rounded-sm'>

          {/* Left side */}
          <div className='text-left'>

            <div className='flex flex-row items-center'>
               {/* Name */}
                <h3 className='text-[18px] font-bold text-left text-gray-900'>
                  {/* Checking whether the profile that is displayed is === 0 if so current user is displayed if not the the current profile clicked will be displayed */}
                  {Object.values(currentProfile).length === 0
                  ? currentUser.name
                  : currentProfile?.name}
                </h3>

                <div>
                  <HiOutlinePencil className='absolute right-[2.54rem] -mt-[1rem] hover:text-gray-500 cursor-pointer border-2' onClick={onEdit} size={25}/>
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
               <p className='text-left pt-2  text-gray-700 mt-5 text-sm font-semibold leading-5 tracking-wide'>
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






