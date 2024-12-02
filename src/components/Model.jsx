import React, { useState } from "react";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Model = ({ onClose, isOpen, className = "" }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "newCollection");
      await addDoc(contactRef, contact);
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = (e) => {
    const value = { name, email };
    e.preventDefault();
    addContact(value);
  };
  return (
    <>
      {isOpen && (
        <div className={`${className}`}>
          <form
            onSubmit={onsubmit}
            className="bg-orange-500 p-4 rounded-lg flex flex-col z-10"
          >
            <div className="ml-auto">
              <Button type="button" onClick={onClose} className="z-15">
                X
              </Button>
            </div>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-2 px-4 text-xl w-full py-2 border-2 border-white outline-none focus:border-white`}
            />
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 px-4 text-xl w-full py-2 border-2 border-white outline-none focus:border-white`}
            />
            <div className="ml-auto">
              <Button
                type="submit"
                className="mt-4 px-6 py-3 text-lg font-semibold bg-orange-300 rounded-full"
              >
                summiy
              </Button>
            </div>
          </form>
          {/* <div className=" backdrop-blur h-screen w-screen absolute top-0 -z-1" /> */}
        </div>
      )}
    </>
  );
};

export default Model;
