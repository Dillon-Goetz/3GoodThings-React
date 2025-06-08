// src/Hooks/useDailyJournalProgress.tsx
import { useState, useEffect } from 'react';
import { account } from '../appwriteConfig'; // To get the current user
import { databases } from '../appwriteConfig'; // To query the database
import { Query } from 'appwrite'; // To build queries

// Ensure these environment variables are correctly set in your .env file
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
const goodThingsCollectionId = import.meta.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID;
const oneThornCollectionId = import.meta.env.VITE_APPWRITE_ONETHORN_COLLECTION_ID;
const journalCollectionId = import.meta.env.VITE_APPWRITE_JOURNALENTRY_COLLECTION_ID;
const photoCollectionId = import.meta.env.VITE_APPWRITE_PHOTO_COLLECTION_ID; // Used in saveAddPhoto

export type JournalCompletionStatus = 'NONE' | 'PARTIAL' | 'COMPLETE';

export const useDailyJournalProgress = () => {
    const [completionStatus, setCompletionStatus] = useState<JournalCompletionStatus>('NONE');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkJournalProgress = async () => {
            setIsLoading(true);
            try {
                const user = await account.get();

                if (!user?.$id || !databaseId) {
                    setCompletionStatus('NONE');
                    setIsLoading(false);
                    return;
                }

                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
                const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

                const dateQueries = [
                    Query.greaterThanEqual('createdAt', startOfDay),
                    Query.lessThan('createdAt', endOfDay),
                    Query.limit(1) // We only need to know if at least one exists for the day
                ];

                // 1. Check for "3-good-things" (marks COMPLETE)
                if (goodThingsCollectionId) {
                    const threeGoodThingsResponse = await databases.listDocuments(
                        databaseId,
                        goodThingsCollectionId,
                        [Query.equal('userId', user.$id), ...dateQueries]
                    );

                    if (threeGoodThingsResponse.total > 0) {
                        setCompletionStatus('COMPLETE');
                        setIsLoading(false);
                        return; // Found the mandatory item, so we're done
                    }
                } else {
                    console.warn("goodThingsCollectionId is not defined. Cannot check for 'COMPLETE' status accurately.");
                }

                // 2. If not 'COMPLETE', check for any other activity (marks PARTIAL)
                // Add other collection IDs here if they also count towards "partial" completion
                const partialCheckCollections = [
                    { id: oneThornCollectionId, name: "One Thorn" },
                    { id: journalCollectionId, name: "Journal Entry" },
                    // The photoCollectionId in journalService.tsx is used for storing image metadata,
                    // including a photoUrl from Appwrite Storage. So, we check this collection.
                    { id: photoCollectionId, name: "Photo" }
                ];

                let hasPartialActivity = false;
                for (const collection of partialCheckCollections) {
                    if (collection.id) {
                        try {
                            const response = await databases.listDocuments(
                                databaseId,
                                collection.id,
                                [Query.equal('userId', user.$id), ...dateQueries]
                            );
                            if (response.total > 0) {
                                hasPartialActivity = true;
                                break; // Found at least one partial activity
                            }
                        } catch (err) {
                            console.warn(`Could not check collection ${collection.name} (ID: ${collection.id}):`, err);
                        }
                    } else {
                         console.warn(`${collection.name} collectionId is not defined. Skipping for partial check.`);
                    }
                }

                if (hasPartialActivity) {
                    setCompletionStatus('PARTIAL');
                } else {
                    setCompletionStatus('NONE'); // No "3-good-things" and no other partial activity
                }

            } catch (error) {
                console.error("Error checking journal progress:", error);
                setCompletionStatus('NONE'); // Default to NONE on error
            } finally {
                setIsLoading(false);
            }
        };

        checkJournalProgress();
    }, []); // Re-run if user changes, or on a specific event that indicates a new post.

    return { completionStatus, isLoading };
};