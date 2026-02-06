import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define the shape of UserStats to match what we use in context
// We can import this from the context file if we export the interface, 
// but to avoid circular deps, let's redefine or keep it loose for now.
// For better type safety, we should ideally move types to a separate file.
// For MVP, we'll define a compatible interface here.

interface PlanProgress {
    planId: string;
    completedModules: string[];
    startedAt: string;
    started: boolean;
}

interface UserStatsData {
    totalMeditationMinutes: number;
    sessionsCompleted: number;
    streakDays: number;
    lastMeditationDate: string | null;
    activePlans: Record<string, PlanProgress>;
    lastSyncedAt?: string;
}

export const getUserProgress = async (userId: string): Promise<UserStatsData | null> => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserStatsData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting user progress:", error);
        return null;
    }
};

export const saveUserProgress = async (userId: string, data: UserStatsData) => {
    try {
        const docRef = doc(db, "users", userId);
        // We use setDoc with merge: true to avoid overwriting other fields if we add them later
        // But for progress, we generally want the latest snapshot.
        // Let's add a lastSyncedAt timestamp.
        const dataToSave = {
            ...data,
            lastSyncedAt: new Date().toISOString()
        };
        await setDoc(docRef, dataToSave, { merge: true });
        console.log("Progress saved for user:", userId);
    } catch (error) {
        console.error("Error saving user progress:", error);
    }
};
