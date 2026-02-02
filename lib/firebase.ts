import { db } from "@/app/firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";


/* ---------------- ADD CARD ---------------- */

export const addCard = async (cardData: {
    number: string;
    expiry: string;
}) => {
    try {
        await addDoc(collection(db, "cards"), {
            ...cardData,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding card:", error);
    }
};

/* ---------------- FETCH CARDS ---------------- */

export const fetchCards = async () => {
    try {
        const q = query(collection(db, "cards"), orderBy("createdAt", "desc"));
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

export const addPassword = async (passwordData: {
    website: string;
    username: string;
}) => {
    try {
        await addDoc(collection(db, "passwords"), {
            ...passwordData,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding password:", error);
    }
};

/* ---------------- FETCH PASSWORDS ---------------- */

export const fetchPasswords = async () => {
    try {
        const q = query(
            collection(db, "passwords"),
            orderBy("createdAt", "desc")
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
