import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface RemainingComponentsProps {
    entry: any;
}

// A small, reusable helper component to display each section cleanly.
const DetailSection: React.FC<{ label: string; value: string | null; editLink: string }> = ({ label, value, editLink }) => {
    return (
        <div className="py-4 px-6 border-t first:border-t-0">
            <h3 className="font-semibold text-lg">{label}</h3>
            {value ? (
                // If the value exists, display it.
                <p className="mt-1 text-muted-foreground">{value}</p>
            ) : (
                // If the value is missing, show the "Add Entry" button.
                <div className="flex items-center justify-between mt-2">
                    <p className="text-muted-foreground italic">This section was skipped.</p>
                    {/* Note: These edit routes don't exist yet, but this sets up the UI for when you decide to build them. */}
                    <Button asChild variant="secondary" size="sm">
                        <Link to={editLink}>Add Entry</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

const RemainingComponents: React.FC<RemainingComponentsProps> = ({ entry }) => {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle>Your Private Reflection</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Section for displaying the 'thorn' */}
                <DetailSection 
                    label="Your Thorn" 
                    value={entry.oneThorn} 
                    editLink={`/journal/edit/one-thorn/${entry.$id}`}
                />
                {/* Section for displaying the 'vibe' */}
                <DetailSection 
                    label="Your Vibe" 
                    value={entry.vibe}
                    editLink={`/journal/edit/vibe-check/${entry.$id}`}
                />
            </CardContent>
        </Card>
    );
};

export default RemainingComponents;