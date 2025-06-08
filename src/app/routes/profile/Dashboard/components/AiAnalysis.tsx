import React, { useState, useEffect } from 'react';
import { getAllJournalDataForUser } from '@/services/journalService';
import { getAnalysisOverview, JournalData } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AiAnalysisProps {
    onAnalysisComplete: (overview: string) => void;
}

const AiAnalysis: React.FC<AiAnalysisProps> = ({ onAnalysisComplete }) => {
    const [overview, setOverview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const journalData = await getAllJournalDataForUser();
            const result = await getAnalysisOverview(journalData as JournalData);
            setOverview(result);
            onAnalysisComplete(result); // Pass the result to the parent
        } catch (e: any) {
            setError(e.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Overview</CardTitle>
                <CardDescription>Get a gentle summary of your recent journal entries to spot trends and patterns.</CardDescription>
            </CardHeader>
            <CardContent>
                {!overview && (
                    <Button onClick={handleAnalysis} disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Generate My Overview"}
                    </Button>
                )}
                
                {isLoading && <p className="text-muted-foreground mt-4">Thinking... please wait.</p>}
                
                {error && <p className="text-destructive mt-4">{error}</p>}

                {overview && (
                    <div className="mt-4 p-4 bg-secondary rounded-lg">
                        <p className="whitespace-pre-wrap">{overview}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AiAnalysis;