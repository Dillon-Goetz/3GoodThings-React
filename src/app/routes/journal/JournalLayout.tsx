// src/app/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import JournalLayout from '../journal/JournalLayout';
import VibeCheck from '../journal/VibeCheck';
import CenteringBreath from '../journal/CenteringBreath';
import MindfulnessQOTD from '../journal/MindfulnessQOTD';
import ThreeGoodThings from '../journal/EntryForms/3GoodThings';
import OneThorn from '../journal/EntryForms/OneThorn';
import JournalTextEntry from '../journal/EntryForms/JournalEntry';
import AddPhoto from '../journal/AddPhoto';
import SubmitAll from '../journal/SubmitAll';

const AppRoutes = () => {
  return (
    <Routes>
      {/* JournalLayout acts as the parent route with nested routes */}
      <Route path="/" element={<JournalLayout />}>
        <Route index element={<Navigate to="vibe-check" replace />} />
        <Route path="vibe-check" element={<VibeCheck />} />
        <Route path="centering-breath" element={<CenteringBreath />} />
        <Route path="mindfulness-qotd" element={<MindfulnessQOTD />} />
        <Route path="3-good-things" element={<ThreeGoodThings />} />
        <Route path="one-thorn" element={<OneThorn />} />
        <Route path="journal-entry" element={<JournalTextEntry />} />
        <Route path="add-photo" element={<AddPhoto />} />
        <Route path="submit-all" element={<SubmitAll />} />
        <Route path="*" element={<Navigate to="vibe-check" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;