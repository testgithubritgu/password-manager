import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

/* ---------------- ADD CARD ---------------- */

export const addCard = async (
  userId: string,
  cardData: {
    number: string;
    expiry: string;
  },
) => {
  try {
    await addDoc(collection(db, "users", userId, "cards"), {
      ...cardData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding card:", error);
  }
};

/* ---------------- FETCH CARDS ---------------- */

export const fetchCards = async (userId: string) => {
  try {
    const q = query(
      collection(db, "users", userId, "cards"),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};

/* ---------------- ADD PASSWORD ---------------- */

export const addPassword = async (
  userId: string,
  passwordData: {
    website: string;
    password: string;
  },
) => {
  try {
    await addDoc(collection(db, "users", userId, "passwords"), {
      ...passwordData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding password:", error);
  }
};

/* ---------------- FETCH PASSWORDS ---------------- */

export const fetchPasswords = async (userId: string) => {
  try {
    const q = query(
      collection(db, "users", userId, "passwords"),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return [];
  }
};
