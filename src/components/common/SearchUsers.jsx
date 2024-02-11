import React from "react";
import { IoIosClose } from "react-icons/io";

export default function SearchUsers({ setIsSearch, setIsSearchInput }) {
    return (
    <div className="w-[68%] sm:w-[50%] md:w-[40%] mr-auto flex flex-row justify-center items-center">

        <input 
            placeholder="Search Users..." 
            onChange={(event) => setIsSearchInput(event.target.value)}
            className="w-[100%] p-[5px] tracking-wider pl-2 rounded-full border-2  border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0"
        ></input>

        <IoIosClose 
            size={25} 
            className="-ml-[2rem] cursor-pointer text-gray-500" 
            onClick={() => { setIsSearch(false); setIsSearchInput("")}}
        />
    </div>
    )
}