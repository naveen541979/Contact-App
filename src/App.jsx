import './App.css';
import Navbar from './components/Navbar';
import { FiSearch } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from './components/NotFound';
function App() {
  const [contacts, setContacts] = useState([]);
  const{isOpen,onClose,onOpen}=useDisclose();

  
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactLists);
          return contactLists
        })   
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts=(e)=>{
    const value=e.target.value
    const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const filteredContacts=contactLists.filter((contact)=>
            contact.name.toLowerCase().includes(value.toLowerCase())
          );
          setContacts(filteredContacts);
          return filteredContacts;
        });
  };

  return (
    <>
    <div className="mx-auto max-w-[370px]">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute text-3xl text-white ml-1" />
          <input
            onChange={filterContacts}
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9"
          />
        </div>
        <CiCirclePlus onClick={onOpen} className="text-5xl text-white cursor-pointer" />
      </div>
      <div className="mt-4 gap-3 flex flex-col">
        {contacts.length<=0 ? (<NotFound/>):contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer
    position="bottom-center"
    />
    </>
  );
}

export default App;
