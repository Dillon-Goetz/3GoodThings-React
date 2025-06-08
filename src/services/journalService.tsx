// src/services/journalService.tsx
import { account, databases } from '../appwriteConfig';
import { ID, Query } from 'appwrite'; // Make sure Query is imported
import { JournalData } from './aiService'; // 1. Import JournalData

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
const goodThingsCollectionId = import.meta.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID;
const OneThornCollectionId = import.meta.env.VITE_APPWRITE_ONETHORN_COLLECTION_ID;
const journalCollectionId = import.meta.env.VITE_APPWRITE_JOURNALENTRY_COLLECTION_ID
const photoCollectionId =  import.meta.env.VITE_APPWRITE_PHOTO_COLLECTION_ID;

// ... (other functions remain the same) ...
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

export const saveOneThorn = async (thorn: string) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await databases.createDocument(
            databaseId,
            OneThornCollectionId, // Fixed: use correct collection ID
            ID.unique(),
            {
                userId: user.$id,
                thornText: thorn, // Fixed: use the parameter name
                isPublic: false,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving One Thorn:", error);
        return false;
    }
};

export const saveJournalEntry = async (entryText: string) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await databases.createDocument(
            databaseId,
            journalCollectionId, // Fixed: use correct collection ID
            ID.unique(),
            {
                userId: user.$id,
                journalText: entryText, // Fixed: use the parameter name
                isPublic: false,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving Journal Entry:", error);
        return false;
    }
};

export const saveAddPhoto = async (photoUrl: string) => {
    const user = await getCurrentUser();
    if (!user) return false;

    try {


        await databases.createDocument(
            databaseId,
            photoCollectionId,
            ID.unique(),
            {
                userId: user.$id,
                photoUrl,
                createdAt: new Date().toISOString(),
            }
        );
        return true;
    } catch (error) {
        console.error("Error saving Photo:", error);
        return false;
    }
};


// 2. Update the function's return type signature
export const getAllJournalDataForUser = async (): Promise<JournalData> => {
    const user = await getCurrentUser();
    if (!user) throw new Error("No user logged in");

    const collectionsToFetch = [
        { id: goodThingsCollectionId, key: 'threeGoodThings' as keyof JournalData },
        { id: OneThornCollectionId, key: 'oneThorn' as keyof JournalData },
        { id: journalCollectionId, key: 'journalEntries' as keyof JournalData }
    ];

    // 3. Set the type of the 'data' object to JournalData
    const data: JournalData = {
        threeGoodThings: [],
        oneThorn: [],
        journalEntries: []
    };

    for (const collection of collectionsToFetch) {
        if (collection.id) {
            try {
                const response = await databases.listDocuments(
                    databaseId,
                    collection.id,
                    [
                        Query.equal('userId', user.$id),
                        Query.orderDesc('createdAt'),
                        Query.limit(100)
                    ]
                );
                // Assigning to a key of JournalData is now type-safe
                data[collection.key] = response.documents;
            } catch (error) {
                console.error(`Error fetching from ${collection.key}:`, error);
            }
        }
    }
    return data;
};