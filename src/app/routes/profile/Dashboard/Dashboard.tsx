// src/app/routes/profile/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDailyJournalProgress } from '../../../../Hooks/useDailyJournalProgress';
import RecentPostsDisplay from './components/RecentPostsDisplay';
import AiAnalysis from './components/AiAnalysis';
import AiChat from './components/AiChat';

const ProfileDashboard: React.FC = () => {
    const { completionStatus} = useDailyJournalProgress();
    const [analysisOverview, setAnalysisOverview] = useState<string | null>(null);

    const handleAnalysisComplete = (overview: string) => {
        setAnalysisOverview(overview);
    };

    // if (isLoading) {
    //     return (
    //         <div className="p-4 md:p-8 flex justify-center items-center min-h-screen">
    //             <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
    //         </div>
    //     );
    // }

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

            {/* Daily Journal Prompt */}
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

            {/* Recent Posts Display */}
            <RecentPostsDisplay />

            {/* === Section 1: AI-Powered Overview (Your Highlights) === */}
            <div className="mt-8 border-t pt-6">
                <AiAnalysis onAnalysisComplete={handleAnalysisComplete} />
            </div>

            {/* === Section 2: AI Chat (appears after analysis is generated) === */}
            {analysisOverview && (
                <div className="mt-8">
                    <AiChat analysisContext={analysisOverview} />
                </div>
            )}
        </div>
    );
};

export default ProfileDashboard;