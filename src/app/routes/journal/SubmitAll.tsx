import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { markDayAsComplete } from '../../../services/journalService';
import { Models } from 'appwrite';

// Define the shape of the context provided by LoggedInLayout
interface OutletContextType {
  user: Models.User<Models.Preferences> | null;
}

const SubmitAll: React.FC = () => {
  // Get the user from the context provided by LoggedInLayout
  const { user } = useOutletContext<OutletContextType>();

  // Use the useEffect hook to perform an action when the component loads
  useEffect(() => {
    // Only run the function if we have the user object
    if (user) {
      console.log("Submitting final entry and marking day as complete...");
      // This is the crucial step: we call the service function to create the "receipt"
      // that proves the user finished the entire flow for the day.
      markDayAsComplete(user.$id);
    }
    // The dependency array [user] ensures this effect runs once the user object is available.
  }, [user]);

  return (
    <section style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Done!</h2>
      <p style={{ margin: '20px 0' }}>
        Your Daily Mindfull practice is complete!
      </p>
      <div>
        <Link to="/profile">
          <Button>Go to My Dashboard</Button>
        </Link>
      </div>
    </section>
  );
};

export default SubmitAll;