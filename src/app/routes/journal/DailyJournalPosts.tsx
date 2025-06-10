// src/app/routes/journal/DailyJournalPosts.tsx
import React, { useState, useEffect } from 'react'; //
import { getAllJournalDataForUser } from '../../../services/journalService'; //
import { JournalData } from '../../../services/aiService'; //
import PostPreview from '@/components/Shared/PostPreview'; //
import RemainingComponents from '@/components/Shared/RemainingComponents'; //
import { Button } from '@/components/ui/button'; //
import { Link } from 'react-router-dom'; //

const DailyJournalPosts: React.FC = () => { //
    const [entries, setEntries] = useState<any[]>([]); //
    const [loading, setLoading] = useState(true); //
    const [error, setError] = useState<string | null>(null); //
    const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null); //

    useEffect(() => { //
        const fetchAndProcessData = async () => { //
            try {
                const rawData: JournalData = await getAllJournalDataForUser(); //
                
                // This logic groups all separate documents by the day they were created
                const groupedByDay = new Map<string, any>(); //

                const processCollection = (collection: any[], type: string) => { //
                    collection.forEach(doc => { //
                        const day = new Date(doc.createdAt).toISOString().split('T')[0]; //
                        if (!groupedByDay.has(day)) { //
                            groupedByDay.set(day, { createdAt: doc.createdAt, day }); //
                        }
                        const dayData = groupedByDay.get(day); //
                        dayData[type] = doc; //
                    });
                };

                processCollection(rawData.threeGoodThings, 'threeGoodThings'); //
                processCollection(rawData.oneThorn, 'oneThorn'); //
                processCollection(rawData.journalEntries, 'journalEntry'); //
                // The photo collection is not processed here
                
                const sortedEntries = Array.from(groupedByDay.values()) //
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); //
                
                setEntries(sortedEntries); //
            } catch (err: any) { //
                setError(err.message || 'Failed to fetch journal entries.'); //
            } finally {
                setLoading(false); //
            }
        };

        fetchAndProcessData(); //
    }, []);

    const toggleExpand = (entryId: string) => { //
        setExpandedEntryId(prevId => (prevId === entryId ? null : entryId)); //
    };

    if (loading) { //
        return <div className="text-center p-8">Loading your journal history...</div>; //
    }

    if (error) { //
        return <div className="text-center p-8 text-red-500">Error: {error}</div>; //
    }

    if (entries.length === 0) { //
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-2">No Entries Yet</h2> //
                <p className="text-muted-foreground mb-4">You haven't written any journal entries. Start today!</p> //
                <Button asChild>
                    <Link to="/journal/vibe-check">Start Today's Entry</Link> //
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold mb-6">Your Journal History</h1> //
            <div className="space-y-8">
                {entries.map(entry => ( //
                    <div key={entry.day}>
                        <PostPreview 
                            entry={{...entry.threeGoodThings, photoFileId: entry.photo?.photoFileId }} //
                            onToggleExpand={() => toggleExpand(entry.day)} //
                            isExpanded={expandedEntryId === entry.day} //
                        />
                        {expandedEntryId === entry.day && ( //
                            <RemainingComponents entry={{ ...entry.oneThorn, ...entry.journalEntry }} /> //
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyJournalPosts; //