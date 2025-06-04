// src/app/routes/journal/SubmitAll.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'

const SubmitAll: React.FC = () => {
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