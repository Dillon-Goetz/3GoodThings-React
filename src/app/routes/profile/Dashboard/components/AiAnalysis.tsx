import React, { useState, useEffect } from 'react';
import { getAllJournalDataForUser } from '@/services/journalService';
import { getAnalysisOverview } from '@/services/aiService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AiAnalysisProps {
    onAnalysisComplete: (overview: string) => void;
}

const AiAnalysis: React.FC<AiAnalysisProps> = ({ onAnalysisComplete }) => {
    const [overview, setOverview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Start in loading state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            const today = new Date().toISOString().split('T')[0]; // Get 'YYYY-MM-DD' format
            const lastFetchDate = localStorage.getItem('lastAnalysisFetchDate');
            const storedOverview = localStorage.getItem('analysisOverview');

            // If we have a stored overview from today, use it
            if (lastFetchDate === today && storedOverview) {
                setOverview(storedOverview);
                onAnalysisComplete(storedOverview);
                setIsLoading(false);
                return; // Exit without fetching
            }

            // Otherwise, fetch new data
            try {
                const journalData = await getAllJournalDataForUser();
                const result = await getAnalysisOverview(journalData);

                // Save the new overview and today's date to localStorage
                localStorage.setItem('analysisOverview', result);
                localStorage.setItem('lastAnalysisFetchDate', today);

                setOverview(result);
                onAnalysisComplete(result);
            } catch (e: any) {
                setError(e.message || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalysis();
    }, [onAnalysisComplete]); // Effect runs once on component mount

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Overview</CardTitle>
                <CardDescription>A summary of your "Three Good Things" trends and patterns.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p className="text-muted-foreground">Thinking... please wait.</p>}
                
                {error && <p className="text-destructive mt-4">{error}</p>}

                {overview && !isLoading && (
                    <div className="mt-4 p-4 bg-secondary rounded-lg">
                        <p className="whitespace-pre-wrap">{overview}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AiAnalysis;