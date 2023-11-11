import React from "react";
import { createPortal } from "react-dom";
import { Formik, Field, Form } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Modal = ({close, isUpdate, name, email, id}) => {

  const addContact=async(contact)=>{
    try{
      const contactRef=collection(db, 'contacts');
      await addDoc(contactRef, contact);
      toast.success("Contact added successfully");
      close();
    }
    catch(error){
  
    }
  }

  const updateContact=async(contact, id)=>{
    
    try{
      const contactRef=doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      toast.success("Contact updated successfully");
      close();
    }
    catch(error){
      console.log(error);
    }
  }


  return createPortal(
    <>
      <div className="h-60  bg-white z-20 relative w-[370px] mx-auto p-4">
        <Formik
        initialValues={
          isUpdate?{name:name, email:email}:{name:"", email:""}}
        onSubmit={(values)=>{
          isUpdate?updateContact(values, id):addContact(values);
        }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name='name' type='text' className='border border-black p-2' required/>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name='email' type='email' className='border border-black p-2' required/>
            </div>
            <button className="bg-orange p-2 rounded-md border border-black self-end">{isUpdate?'Update':'Add'} Contact</button>
          </Form>
        </Formik>
      </div>
      <div className="backdrop-blur h-screen w-screen absolute top-0 z-10" onClick={close}></div>
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
