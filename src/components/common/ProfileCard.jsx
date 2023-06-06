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
    <div className="h-[23vh] bg-white w-[100%] align-middle mt-[20px] rounded-sm items-center p-6 ">

      <HiOutlinePencil className='absolute right-[2.54rem] mt-[-0.4rem] hover:text-gray-500 cursor-pointer ' onClick={onEdit} size={22}/>

      <div className='mt-[0.5rem]'>
            <h3 className='-mt-5 text-lg font-bold text-left text-gray-900'>
              {/* Checking whether the profile that is displayed is === 0 if so current user is displayed if not the the current profile clicked will be displayed */}
              {Object.values(currentProfile).length === 0
              ? currentUser.name
              : currentProfile?.name}
              </h3>
                <p className='text-left text-[12px] text-gray-700 tracking-wide -mt-2'>
                {Object.values(currentProfile).length === 0 
                ? currentUser.email
                : currentProfile?.email}
                </p>
            <div className='flex flex-row justify-center'>
            <div className=''>
                <p className='text-left text-base  text-gray-700 w-[250px] leading-5 tracking-wide mt-2 '>
                {Object.values(currentProfile).length === 0 
                ? currentUser.headline
                : currentProfile?.headline}  
                </p>
                <p className='text-left text-sm pt-3 text-gray-700 w-[350px] leading-5 tracking-wide font-semibold'>
                    {Object.values(currentProfile).length === 0 
                    ? currentUser.location
                    : currentProfile?.location}
                </p>
            </div>
            <div className="ml-[-4rem]">
                <p className='text-left pt-2  text-gray-700 mb-[-0.5rem] text-sm font-semibold leading-5 tracking-wide'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.company
                  : currentProfile?.company}
                </p>
                <p className='pt-3 text-sm font-semibold leading-5 tracking-wide text-left text-gray-700'>
                  {Object.values(currentProfile).length === 0 
                  ? currentUser.education
                  : currentProfile?.education}
                </p>
            </div>
          </div>
      </div>

      <div className='mt-[5rem]'>
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