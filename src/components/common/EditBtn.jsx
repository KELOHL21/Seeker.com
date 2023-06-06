import React, {useState} from 'react'
import { editProfile } from '../../api/FirestoreApis';
import { HiOutlinePencil } from  'react-icons/hi'

const EditBtn = ({onEdit, currentUser }) => {

   const [editInput, setEditInput] = useState(currentUser);

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
    <div className="h-[70vh] bg-white w-[100%] align-middle mt-[30px] rounded-sm items-center p-6">
    <HiOutlinePencil className='absolute right-[2.54rem] mt-[-0.4rem] hover:text-slate-700 cursor-pointer' onClick={onEdit} size={22}/>
      <div className='mt-[2rem] flex flex-col justify-center'>
         <div className='my-[0.5rem]'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Full Name</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.name}
                     name='name'
                     className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-[0.5rem]'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Headline</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.headline}
                     name='headline'
                     className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-[0.5rem]'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Location</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.location}
                     name='location'
                     className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-[0.5rem]'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Company</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.company}
                     name='company'
                     className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
         <div className='my-[0.5rem]'>
            <label className='text-left  lg:ml-[1rem]  text-lg tracking-wide '>Education</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.education}
                     name='education'
                     className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-base font-normal'
                  />
         </div>
      </div>
         <div className="flex flex-col justify-center items-center m-auto my-5">
            <button className='bg-black  rounded-md text-white text-sm uppercase p-2 w-[70%] items-center' onClick={ updateProfileData}>Save</button>
         </div>
    </div>
    </div>
  )
}

export default EditBtn