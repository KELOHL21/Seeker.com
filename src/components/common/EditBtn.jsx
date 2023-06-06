import React, {useState} from 'react';
import { editProfile } from '../../api/FirestoreApis';
import { HiOutlinePencil } from  'react-icons/hi';

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
   <div className='h-full w-full bg-gray-300 p-5 text-2xl'>
    <div className="h-[100vh] bg-white w-[100%] align-middle mt-[30px] rounded-sm items-center p-4">
    <HiOutlinePencil  className='absolute right-[2.54rem] mt-[-0.4rem] hover:text-slate-700 cursor-pointer' onClick={onEdit} size={22}/>
      <div className='flex flex-col justify-center'>
         <div className='my-[5px] '>
            <label className='text-left lg:ml-[1rem] text-sm tracking-wide font-semibold'>Full Name</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.name}
                     name='name'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left lg:ml-[1rem] text-sm tracking-wide font-semibold'>Headline</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.headline}
                     name='headline'
                     placeholder='Headline'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left lg:ml-[1rem] text-sm tracking-wide font-semibold'>About Me</label>
            <textarea
               onChange={getInput}
               value={editInput.aboutMe}
               name='aboutMe'
               placeholder='About'
               rows={4}
               className='border-slate-800 border-2 text-left w-[100%] m-auto rounded-md bg-white p-2 text-sm  font-normal'
            />
         </div>
         <div className='my-[5px] '>
            <label className='text-left lg:ml-[1rem]  text-sm tracking-wide font-semibold'>Location</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.location}
                     name='location'
                     placeholder='Location'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left  lg:ml-[1rem] text-sm tracking-wide font-semibold'>Company</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.company}
                     name='company'
                     placeholder='Company'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left  lg:ml-[1rem] text-sm tracking-wide font-semibold'>Industry</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.industry}
                     name='industry'
                     placeholder='Industry'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left  lg:ml-[1rem] text-sm tracking-wide font-semibold'>Education</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.education}
                     name='education'
                     placeholder='Education'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left  lg:ml-[1rem]  text-sm tracking-wide font-semibold'>Website</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.website}
                     name='website'
                     placeholder='Website'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
         <div className='my-[5px] '>
            <label className='text-left lg:ml-[1rem] text-sm tracking-wide font-semibold'>Skills</label>
                  <input  
                     type='text'
                     onChange={getInput}
                     value={editInput.skills}
                     name='skills'
                     placeholder='Skills'
                     className='border-slate-800 border-2 text-left w-[100%] h-[35px] m-auto rounded-md bg-white p-2 text-sm  font-normal'
                  />
         </div>
      </div>
         <div className="flex flex-col justify-center items-center m-auto mt-5">
            <button className='bg-black  rounded-md text-white text-sm uppercase p-2 w-[70%] items-center' onClick={ updateProfileData}>Save</button>
         </div>
    </div>
    </div>
  )
}

export default EditBtn