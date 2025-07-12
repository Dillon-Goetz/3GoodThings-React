// src/app/routes/journal/components/TodaysCompletedPostDisplay.tsx
import React, { useState, useEffect } from 'react';
import { getAllJournalDataForUser } from '../../../services/journalService';
import { JournalData } from '../../../services/aiService'; // Assuming JournalData is defined here
import PostPreview from '../../../components/Shared/PostPreview';
import RemainingComponents from '../../../components/Shared/RemainingComponents';
import { Card, CardContent } from '@/components/ui/card'; // Assuming you use these for layout
// import { Button } from '@/components/ui/button'; // For the expand/hide button within PostPreview

interface TodaysCompletedPostDisplayProps {
  // No specific props needed as it fetches its own data for today
}

const TodaysCompletedPostDisplay: React.FC<TodaysCompletedPostDisplayProps> = () => {
  const [todaysEntry, setTodaysEntry] = useState<any | null>(null); // 'any' for now, can be more specific later
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // State for expanding details

  useEffect(() => {
    const fetchTodaysEntry = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allJournalData: JournalData = await getAllJournalDataForUser();
        // Assuming your 'threeGoodThings' entries have a 'createdAt' field
        // And that all related components (thorn, journalText, photo) share the same createdAt date.
        // We need to find the most recent/today's entry from the threeGoodThings,
        // and then find its corresponding thorn, journal text, and photo if they exist.

        // Get today's date in YYYY-MM-DD format for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day
        const todayISO = today.toISOString().split('T')[0];

        // Find today's good things entry (most recent for today)
        const todaysGoodThings = allJournalData.threeGoodThings.find(entry =>
          new Date(entry.createdAt).toISOString().split('T')[0] === todayISO
        );

        if (todaysGoodThings) {
          // Now, find corresponding thorn, journal text, and photo based on the same createdAt date
          const correspondingThorn = allJournalData.oneThorn.find(thorn =>
            new Date(thorn.createdAt).toISOString().split('T')[0] === todayISO
          );
          const correspondingJournalText = allJournalData.journalEntries.find(journal =>
            new Date(journal.createdAt).toISOString().split('T')[0] === todayISO
          );
          const correspondingPhoto = allJournalData.photos.find(photo =>
            new Date(photo.createdAt).toISOString().split('T')[0] === todayISO
          );

          // Combine all parts into a single entry object for display
          setTodaysEntry({
            ...todaysGoodThings, // Contains goodThing1,2,3, createdAt, vibe, isPublic
            oneThorn: correspondingThorn?.thornText || null, // Assuming thornText is the field
            journalText: correspondingJournalText?.journalText || null, // Assuming journalText is the field
            photoFileId: correspondingPhoto?.photoFileId || null, // Assuming photoFileId is the field
            // Add other fields from JournalDataPayload if needed for display
          });
        } else {
          setTodaysEntry(null); // No entry for today
        }
      } catch (err) {
        console.error("Error fetching today's journal entry:", err);
        setError("Failed to load today's journal entry.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodaysEntry();
  }, []); // Run once on component mount

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading today's entry...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">{error}</div>;
  }

  if (!todaysEntry) {
    return <div className="text-center py-8 text-muted-foreground">No journal entry found for today.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Today's Completed Entry</h2>
      <Card>
        <CardContent className="p-4">
          <PostPreview entry={todaysEntry} onToggleExpand={handleToggleExpand} isExpanded={isExpanded} />
          {isExpanded && (
            <RemainingComponents
              entry={{
                oneThorn: todaysEntry.oneThorn,
                vibe: todaysEntry.vibe, // vibe is already in PostPreview's entry, but can be passed again
                journalText: todaysEntry.journalText, // Ensure journalText is passed
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaysCompletedPostDisplay;