import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import Modal from "./Modal";
import { toast } from "react-toastify";

const Contact = ({ name, email, id, open, isUpdate, close, updateId}) => {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <div className="flex border bg-yellow rounded-[10px] px-2 items-center py-1">
        <div className="flex gap-2 flex-grow">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="flex-grow">
            <h2 className="text-md font-bold">{name}</h2>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-2">
          <RiEditCircleLine
            className="cursor-pointer"
            onClick={() => open(true, id)}
          />
          <MdDelete
            className="text-orange cursor-pointer"
            onClick={() => deleteContact(id)}
          />
        </div>
      </div>
      {
        isUpdate && id==updateId && <Modal isUpdate={isUpdate} close={close} name={name} email={email} id={id}/>
      }
    </>
  );
};

export default Contact;
