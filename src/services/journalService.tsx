import { account, databases } from '../appwriteConfig';
import { ID, Query } from 'appwrite';
import { JournalData } from './aiService';

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
const goodThingsCollectionId = import.meta.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID;
const OneThornCollectionId = import.meta.env.VITE_APPWRITE_ONETHORN_COLLECTION_ID;
const journalCollectionId = import.meta.env.VITE_APPWRITE_JOURNALENTRY_COLLECTION_ID;
const photoCollectionId = import.meta.env.VITE_APPWRITE_PHOTO_COLLECTION_ID;
const completionCollectionId = import.meta.env.VITE_APPWRITE_COMPLETION_COLLECTION_ID;

// This interface defines the shape of the data coming from your app's state
export interface JournalDataPayload {
    threeGoodThings: string[];
    isPublic: boolean;
    oneThorn: string;
    vibe: string;
    photoFileId: string | null;
    isPhotoPublic: boolean;
    journalText: string;
}

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
};

/**
 * Submits all parts of the journal entry as a single atomic operation.
 */
export const submitJournalEntry = async (data: JournalDataPayload) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not logged in. Cannot submit journal entry.");
    }
    
    try {
        const entryDate = new Date().toISOString();

        // 1. Save Three Good Things
        if (data.threeGoodThings && data.threeGoodThings.some(t => t.trim() !== '')) {
            await databases.createDocument(databaseId, goodThingsCollectionId, ID.unique(), {
                userId: user.$id,
                goodThing1: data.threeGoodThings[0] || '',
                goodThing2: data.threeGoodThings[1] || '',
                goodThing3: data.threeGoodThings[2] || '',
                isPublic: data.isPublic,
                createdAt: entryDate,
                vibe: data.vibe,
            });
        }

        // 2. Save One Thorn
        if (data.oneThorn && data.oneThorn.trim() !== '') {
            await databases.createDocument(databaseId, OneThornCollectionId, ID.unique(), {
                userId: user.$id,
                thornText: data.oneThorn,
                isPublic: false,
                createdAt: entryDate,
                vibe: data.vibe,
            });
        }
        
        // 3. Save Journal Entry
        if (data.journalText && data.journalText.trim() !== '') {
            await databases.createDocument(databaseId, journalCollectionId, ID.unique(), {
                userId: user.$id,
                journalText: data.journalText,
                isPublic: false,
                createdAt: entryDate,
                vibe: data.vibe,
            });
        }

        // 4. Save Photo Info (assumes file is already uploaded from AddPhoto step)
        if (data.photoFileId) {
             await databases.createDocument(databaseId, photoCollectionId, ID.unique(), {
                userId: user.$id,
                photoFileId: data.photoFileId,
                isPublic: data.isPhotoPublic,
                createdAt: entryDate,
            });
        }

        // 5. Finally, mark the day as complete
        await markDayAsComplete(user.$id);

        return { success: true };

    } catch (error) {
        console.error("Error submitting full journal entry:", error);
        return { success: false, error: error };
    }
};

/**
 * Creates a "completion" record for the user for the current day.
 */
export const markDayAsComplete = async (userId: string): Promise<boolean> => {
    try {
        await databases.createDocument(
            databaseId,
            completionCollectionId,
            ID.unique(),
            {
                userId: userId, // Use lowercase 'u' to match your code's convention
                completedAt: new Date().toISOString()
            }
        );
        return true;
    } catch (error) {
        console.error("Error marking day as complete:", error);
        return false;
    }
};

/**
 * Fetches all journal data for the current user to display in the feed.
 */
export const getAllJournalDataForUser = async (): Promise<JournalData> => {
    const user = await getCurrentUser();
    if (!user) throw new Error("No user logged in");

    const collectionsToFetch = [
        { id: goodThingsCollectionId, key: 'threeGoodThings' as keyof JournalData },
        { id: OneThornCollectionId, key: 'oneThorn' as keyof JournalData },
        { id: journalCollectionId, key: 'journalEntries' as keyof JournalData },
        { id: photoCollectionId, key: 'photos' as keyof JournalData }
    ];

    const data: JournalData = {
        threeGoodThings: [],
        oneThorn: [],
        journalEntries: [],
        photos: []
    };
 
    for (const collection of collectionsToFetch) {
        if (collection.id) {
            try {
                const response = await databases.listDocuments(
                    databaseId,
                    collection.id,
                    [
                        Query.equal('userId', user.$id),
                        Query.orderDesc('$createdAt'),
                        Query.limit(100)
                    ]
                );
                data[collection.key] = response.documents;
            } catch (error) {
                console.error(`Error fetching from ${collection.key}:`, error);
            }
        }
    }
    return data;
};