import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useDailyReset from '../../../Hooks/useDailyReset';

const steps = [
  'vibe-check',
  'centering-breath',
  'mindfulness-qotd',
  '3-good-things',
  'one-thorn',
  'journal-entry',
  'add-photo',
  'submit-all',
];

const JournalLayout: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Sync index with URL
  useEffect(() => {
    const lastSegment = pathname.split('/').pop() || '';
    const idx = steps.indexOf(lastSegment);
    if (idx >= 0) setCurrentIndex(idx);
  }, [pathname]);

  // Reset journal data at midnight
  useDailyReset(() => {
    console.log('Resetting journal data...');
    localStorage.removeItem('journalEntries');
  });

  const goTo = (i: number, query = '') => {
    if (i < 0 || i >= steps.length) return;
    setCurrentIndex(i);
    navigate(`${steps[i]}${query}`);
  };

  // Troubleshoot log to confirm render
  console.log('JournalLayout rendered');

  return (
    <div>
      <Outlet context={{ goTo, currentIndex, lastIndex: steps.length - 1 }} />
    </div>
  );
};

export default JournalLayout;
