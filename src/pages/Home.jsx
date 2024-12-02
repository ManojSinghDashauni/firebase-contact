import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import AddSVG from "../components/AddSVG";
import Search from "../components/Search";
import ContactSVG from "../components/ContactSVG";
import DeleteSvg from "../components/DeleteSVG";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Model from "../components/Model";
import useDisclose from "../hook/useDisclose";

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const contactRef = collection(db, "newCollection");
        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setData(contactList);
          return contactList;
        });
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "newCollection");
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setData(filterContacts);
      return filterContacts;
    });
  };

  const { isOpen, onClose, onOpen } = useDisclose(false);

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "newCollection", id));
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="h-[90%] bg-orange-300 p-8 flex flex-col items-center">
      <div className="flex items-center gap-4">
        <Search filter={filterContact} placeholder="Search Contact" />
        <Button onClick={onOpen}>
          <AddSVG />
        </Button>
      </div>

      <div>
        {data ? (
          <div>
            {data.map((item) => (
              <ul
                key={item.id}
                className="flex items-center justify-between bg-orange-400 w-96 rounded-xl px-8 py-2 my-4"
              >
                <ContactSVG />
                <div>
                  <li className="font-semibold text-lg">{item.name}</li>
                  <li>{item.email}</li>
                </div>
                <Button onClick={() => deleteContact(item.id)}>
                  <DeleteSvg />
                </Button>
              </ul>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4 items-center h-full">
            <ContactSVG />
            <p>No contact found</p>
          </div>
        )}
      </div>

      <Model
        className="absolute"
        data={data}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default Home;
