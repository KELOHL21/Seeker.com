import React, {useState} from 'react'
import { editProfile } from '../../api/FirestoreApis';

const EditBtn = ({onEdit, currentUser }) => {

   const [editInput, setEditInput] = useState({});

   const getInput = (event) => {
      let {name, value} = event.target;
      let input = { [name]: value };
      // Tracks the input value as its being typed
      setEditInput({...editInput,...input});
   };

   const updateProfileData = async () => {
      await editProfile(currentUser.userID, editInput);
     await  onEdit();
   }

  return (
   <div className='h-screen w-full bg-gray-300  p-5 text-2xl'>
    <div className="h-[90vh] bg-white w-[100%] align-middle mt-[30px] rounded-sm items-center p-6">
      <div className='absolute right-[2.54rem] text-[13px] bg-gray-900 border-2 border-none rounded-sm px-3 text-white font-semibold' onClick={onEdit}>
        <button>Edit</button>
      </div>
      <div className='mt-[5rem] '>
         <div className='my-5'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Name</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     name='name'
                     className='border-slate-800 border-2 text-left w-[95%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-7'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Headline</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     name='headline'
                     className='border-slate-800 border-2 text-left w-[95%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-7'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Location</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     name='location'
                     className='border-slate-800 border-2 text-left w-[95%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-7'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Company</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     name='company'
                     className='border-slate-800 border-2 text-left w-[95%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-7'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Education</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     name='education'
                     className='border-slate-800 border-2 text-left w-[95%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
      </div>
      <button className='bg-black text-white text-sm uppercase p-2 w-[70%] ml-[5rem]' onClick={ updateProfileData}>Save</button>
    </div>
    </div>
  )
}

export default EditBtn