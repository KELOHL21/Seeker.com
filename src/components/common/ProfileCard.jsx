import React, {useState, useMemo} from 'react';
import { getSinglePost, getSingleUser } from '../../api/FirestoreApis';
import PostCard from './PostCard';
import { useLocation } from 'react-router-dom';


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
    <div className="h-[20vh] bg-white w-[100%] align-middle mt-[20px] rounded-sm items-center p-6 ">
      <div className='absolute right-[2.54rem] text-[13px] bg-gray-900 border-2 border-none rounded-sm px-3 text-white font-semibold' onClick={onEdit}>
        <button >Edit</button>
      </div>
      <div className='mt-[0.5rem]'>
          <h3 className='text-left text-lg -mt-5 text-gray-900 font-bold'>
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
            <div className='flex flex-row justify-between'>
            <div>
            <p className='text-left text-base  text-gray-700 w-[280px] leading-5 tracking-wide mt-2'>
            {Object.values(currentProfile).length === 0 
            ? currentUser.headline
            : currentProfile?.headline}  
            </p>
            <p className='text-left text-sm pt-3 text-gray-700 w-[350px] leading-5 tracking-wide font-semibold'>{Object.values(currentProfile).length === 0 
            ? currentUser.location
            : currentProfile?.location}
            </p>
            </div>
            <div className=" mr-[-0.3rem]">
                <p className='text-left pt-2  text-gray-700 mb-[-0.5rem] text-sm font-semibold leading-5 tracking-wide'>
                {Object.values(currentProfile).length === 0 
                ? currentUser.company
                : currentProfile?.company}
                </p>
                <p className='text-left text-sm pt-3  text-gray-700 font-semibold leading-5 tracking-wide'>
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