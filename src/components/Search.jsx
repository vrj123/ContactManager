import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
const Search = ({open, fliterContacts}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex realtive items-center flex-grow">
        <FiSearch className="text-white text-3xl absolute ml-1" />
        <input
          type="text"
          onChange={(e)=>fliterContacts(e)}
          placeholder="Search Contact"
          className="bg-transparent border border-white flex-grow rounded-md h-10 text-white pl-10 outline-none"
        />
      </div>
      <AiFillPlusCircle className="text-white text-4xl cursor-pointer" onClick={()=>open(false)}/>
    </div>
  );
};

export default Search;
