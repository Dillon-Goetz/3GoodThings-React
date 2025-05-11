// src/services/journalService.tsx
import { account, databases } from '../appwriteConfig';
import { ID } from 'appwrite';

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
const goodThingsCollectionId = import.meta.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID;
const OneThornCollectionId = import.meta.env.VITE_APPWRITE_ONETHORN_COLLECTION_ID;
// Add other collection IDs here as needed...

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
};

export const saveThreeGoodThings = async (goodThing1: string, goodThing2: string, goodThing3: string, isPublic: boolean) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await databases.createDocument(
            databaseId,
            goodThingsCollectionId,
            ID.unique(),
            {
                userId: user.$id,
                goodThing1,
                goodThing2,
                goodThing3,
                isPublic,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving Three Good Things:", error);
        return false;
    }
};

// Future add-ons:
export const saveOneThorn = async (thorn: string) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await databases.createDocument(
            databaseId,
            goodThingsCollectionId,
            ID.unique(),
            {
                userId: user.$id,
                thornText, //what is this?
                isPublic:false,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving Three Good Things:", error);
        return false;
    }
};

export const saveJournalEntry = async (entryText: string) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await databases.createDocument(
            databaseId,
            goodThingsCollectionId,
            ID.unique(),
            {
                userId: user.$id,
                journalText, //what is this?
                isPublic:false,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving Three Good Things:", error);
        return false;
    }
};

export const saveAddPhoto = async (photoUrl: string) => {
    // same pattern
}
// etc....
