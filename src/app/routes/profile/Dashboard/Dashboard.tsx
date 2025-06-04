// src/app/routes/profile/ProfileDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDailyJournalProgress, JournalCompletionStatus } from '@/hooks/useDailyJournalProgress'; // Or your path to the hook
import RecentPostsDisplay from './components/RecentPostsDisplay'; // Import the new component

const ProfileDashboard: React.FC = () => { // Or Dashboard: React.FC
    const { completionStatus, isLoading } = useDailyJournalProgress();

    if (isLoading) { // This isLoading is from useDailyJournalProgress
        return (
            <div className="p-4 md:p-8 flex justify-center items-center min-h-screen">
                <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
            </div>
        );
    }

    // ... (logic for promptMessage, buttonText, linkTo based on completionStatus) ...
    let promptMessage;
    let buttonText = "Start Today's Journal";
    let linkTo = "/journal/vibe-check";

    switch (completionStatus) {
        case 'NONE':
            promptMessage = "You haven't posted yet today! Get started on your daily journal.";
            break;
        case 'PARTIAL':
            promptMessage = "Keep going! You're making progress on your daily journal.";
            buttonText = "Continue Journal";
            break;
        case 'COMPLETE':
            promptMessage = null; 
            break;
        default:
            promptMessage = "Checking your journal status...";
    }


    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">My Dashboard</h1>

            {/* Display logic for top based on completionStatus */}
            {promptMessage && (
                <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-blue-700">
                    <p className="mb-2">{promptMessage}</p>
                    {completionStatus !== 'COMPLETE' && (
                        <Link to={linkTo}>
                            <Button variant="default">{buttonText}</Button>
                        </Link>
                    )}
                </div>
            )}
            
            {completionStatus === 'COMPLETE' && !promptMessage && (
                 <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                    <p>Great job on completing your journal for today!</p>
                 </div>
            )}

            {/* === Add the RecentPostsDisplay component here === */}
            <RecentPostsDisplay />

            {/* Placeholder for other dashboard sections (Highlights, AI Assistant) */}
            <div className="mt-6 border-t pt-6">
                <p className="text-muted-foreground">Highlights this week section will go here...</p>
            </div>
            <div className="mt-6 border-t pt-6">
                <p className="text-muted-foreground">AI Assistant section will go here...</p>
            </div>
        </div>
    );
};

export default ProfileDashboard; // Or Dashboard