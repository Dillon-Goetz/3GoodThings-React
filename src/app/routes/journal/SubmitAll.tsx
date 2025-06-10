import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { markDayAsComplete } from '../../../services/journalService';
import { Models } from 'appwrite';

// Define the shape of the context we expect from JournalLayout, including all fields
interface JournalContextType {
  user: Models.User<Models.Preferences> | null;
  journalData: {
    threeGoodThings: string[];
    oneThorn: string;
    vibe: string;
    selectedFile: File | null;
    journalText: string;
  };
}

const SubmitAll: React.FC = () => {
  // 1. Get the complete user and journalData objects from the context
  const { user, journalData } = useOutletContext<JournalContextType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirmSubmit = async () => {
    if (!user) {
      alert("User not found, cannot submit.");
      return;
    }
    setIsSubmitting(true);
    // TODO: In the future, a function here would save the entire journalData object.
    const success = await markDayAsComplete(user.$id);
    setIsSubmitting(false);

    if (success) {
      setIsSubmitted(true);
    } else {
      alert("There was an error submitting your journal. Please try again.");
    }
  };

  // If the submission is complete, show the final success message
  if (isSubmitted) {
    return (
      <section className="text-center p-10">
        <h2 className="text-3xl font-bold">Done!</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Your Daily Mindfull practice is complete!
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/profile">Go to My Dashboard</Link>
          </Button>
        </div>
      </section>
    );
  }

  // 2. Otherwise, show the review panel with data from journalData
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Review Your Entry</h1>
      <p className="text-center text-muted-foreground mb-8">Please review your entry below before finalizing.</p>

      <div className="space-y-6">
        {/* Review Photo */}
        {journalData.selectedFile && (
          <Card>
            <CardHeader><CardTitle>Your Photo</CardTitle></CardHeader>

            <CardContent className="flex justify-center">
              <img src={URL.createObjectURL(journalData.selectedFile)} alt="Journal preview" className="rounded-md max-h-64" />
            </CardContent>
          </Card>
        )}

        {/* Review 3 Good Things */}
        <Card>
            <CardHeader><CardTitle>Three Good Things</CardTitle></CardHeader>
            <CardContent>
                <ul className="list-disc list-inside space-y-1">
                    {journalData.threeGoodThings?.map((thing, index) => 
                        thing && <li key={index}>{thing}</li>
                    )}
                </ul>
            </CardContent>
        </Card>

        {/* Review One Thorn */}
        {journalData.oneThorn && (
            <Card>
                <CardHeader><CardTitle>One Thorn</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{journalData.oneThorn}</p>
                </CardContent>
            </Card>
        )}

        {/* Review Journal Entry */}
        {journalData.journalText && (
            <Card>
                <CardHeader><CardTitle>Journal Entry</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{journalData.journalText}</p>
                </CardContent>
            </Card>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" onClick={handleConfirmSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm & Submit"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitAll;