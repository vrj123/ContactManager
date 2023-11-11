import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import { db } from './config/firebase';
import Contact from './components/Contact'
import Modal from './components/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound'

const App = () => {

  const [contacts, setContacts]=useState([]);
  const [isopen, setIsOpen]=useState(false);
  const [isUpdate, setIsUpdate]=useState(false);
  const [notFound, setNotFound]=useState(false);
  const [updateId, setUpdateId]=useState("");

  const onOpen=(update, id)=>{
    if(update===true) setUpdateId(id);
    setIsOpen(true);
    setIsUpdate(update);
  }

  const onClose=()=>{
    setIsOpen(false);
    setIsUpdate(false);
    setUpdateId("");
  }

  useEffect(()=>{
    const getContacts=async()=>{
      try{
        const contactRef=collection(db, 'contacts');
        // const contactSnapshot=await getDocs(contactRef);

        onSnapshot(contactRef, (snapshot)=>{
          const contactList=snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactList);
          return contactList;
        });
        
      }
      catch(error){
        console.log("Error");
      }
    }
    getContacts();
  }, []);


  const fliterContacts=(e)=>{
    const value=e.target.value;
    const contactRef=collection(db, 'contacts');
        // const contactSnapshot=await getDocs(contactRef);

        onSnapshot(contactRef, (snapshot)=>{
          const contactList=snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactList);
          const updatedContact=contactList.filter((contact)=>contact.name.toLowerCase().includes(value.toLowerCase()));
        setContacts(updatedContact);
          return contactList;
        });
  }

  return (
    <div className='w-[370px] mx-auto px-4'>
      <Navbar/>
      <Search open={onOpen} fliterContacts={fliterContacts}/>
      <div className='flex flex-col gap-2 my-6'>
        {
          contacts.map((info)=>{
            return <Contact name={info.name} email={info.email} key={info.id} id={info.id} open={onOpen} isUpdate={isUpdate} close={onClose} updateId={updateId} />
          })
        }
      </div>
      {contacts.length==0 && <NotFound/>}
      {
        !isUpdate && isopen && <Modal close={onClose} isUpdate={isUpdate}/>
      }
      <ToastContainer position='bottom-center'/>
    </div>
  )
}

export default App;