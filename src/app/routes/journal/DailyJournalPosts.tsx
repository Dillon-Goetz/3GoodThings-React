import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases } from '../../../appwriteConfig'; // Assuming direct import for simplicity
import PostPreview from '../../../components/Shared/PostPreview';
import RemainingComponents from '../../../components/Shared/RemainingComponents';
import { useAuth } from '@/Hooks/useAuth'

const DailyJournalPosts: React.FC = () => {
    const { entryId } = useParams<{ entryId: string }>();
    const { user } = useAuth();
    const [entry, setEntry] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!entryId || !user) return;

        const fetchEntry = async () => {
            try {
                // This is a simplified fetch, you might want to use your journalService
                const document = await databases.getDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    entryId
                );
                
                // Security check: ensure the fetched entry belongs to the logged-in user
                if (document.userId === user.$id) {
                    setEntry(document);
                } else {
                    setError("You do not have permission to view this entry.");
                }

            } catch (err) {
                setError("Failed to fetch journal entry.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntry();
    }, [entryId, user]);

    if (isLoading) return <div className="text-center p-8">Loading your entry...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
    if (!entry) return <div className="text-center p-8">Entry not found.</div>;

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-center mb-6">Your Entry for {new Date(entry.$createdAt).toLocaleDateString()}</h1>
            
            {/* Part 1: The reusable "social media" preview */}
            <PostPreview entry={entry} />

            {/* Part 2: The remaining private components with edit/fill options */}
            <RemainingComponents entry={entry} />
        </div>
    );
};

export default DailyJournalPosts;