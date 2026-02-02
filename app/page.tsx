'use client'

import { useState, useLayoutEffect } from "react";
import { db } from "./firebase"
import { collection, addDoc, getDocs } from "firebase/firestore";

type User = {
  id?: string;
  name: string;
  age: number;
};

export default function Home() {

  const [users, setUsers] = useState<User[] | null>(null);

  useLayoutEffect(() => {
    const fetchUsers = async () => {
      try {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);

        const data: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
        }));

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);



  const addUser = async ():Promise<void> => {
    try {
      const userData:User = {
        name:"swapnil",
        age:33
      }
      await addDoc(collection(db, "users"), userData);
      console.log("Data added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={() => addUser()}>
        Add data
      </button>

      <div>
        {users?.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
          </div>
        ))}
      </div>
    </>
  );
}
