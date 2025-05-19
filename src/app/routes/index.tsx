// src/app/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import JournalLayout from './journal/JournalLayout';
import VibeCheck           from './journal/VibeCheck';
import CenteringBreath     from './journal/CenteringBreath';
import MindfulnessQOTD     from './journal/MindfulnessQOTD';
import ThreeGoodThings     from './journal/EntryForms/3GoodThings';
import OneThorn            from './journal/EntryForms/OneThorn';
import JournalEntry        from './journal/EntryForms/JournalEntry';
import AddPhoto            from './journal/AddPhoto';
import SubmitAll           from './journal/SubmitAll';

// This component will now define routes RELATIVE to the path it's rendered on (which will be /journal/*)

export default function AppRoutes() {
  return (
    // JournalLayout will provide the common UI and the <Outlet /> for these steps
    <JournalLayout>
      <Routes>
        {/* 'index' means this route matches when the path is exactly what JournalLayout is rendered for (e.g. /journal/) */}
        <Route index element={<Navigate to="vibe-check" replace />} />
        <Route path="vibe-check" element={<VibeCheck />} />
        <Route path="centering-breath" element={<CenteringBreath />} />
        <Route path="mindfulness-qotd" element={<MindfulnessQOTD />} />
        <Route path="3-good-things" element={<ThreeGoodThings />} />
        <Route path="one-thorn" element={<OneThorn />} />
        <Route path="journal-entry" element={<JournalEntry />} />
        <Route path="add-photo" element={<AddPhoto />} />
        <Route path="submit-all" element={<SubmitAll />} />
        {/* Optional: A fallback within the journal section if a sub-path is wrong */}
        <Route path="*" element={<Navigate to="vibe-check" replace />} />
      </Routes>
    </JournalLayout>
  );
}