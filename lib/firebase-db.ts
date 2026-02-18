import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserStats } from "@/types/user";

export const getUserProgress = async (userId: string): Promise<UserStats | null> => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserStats;
        }
        return null;
    } catch (error) {
        console.error("Error getting user progress:", error);
        return null;
    }
};

export const saveUserProgress = async (userId: string, data: UserStats): Promise<void> => {
    try {
        const docRef = doc(db, "users", userId);
        const dataToSave: UserStats = {
            ...data,
            lastSyncedAt: new Date().toISOString(),
        };
        // merge: true preserves any server-added fields we don't know about client-side
        await setDoc(docRef, dataToSave, { merge: true });
    } catch (error) {
        console.error("Error saving user progress:", error);
    }
};
