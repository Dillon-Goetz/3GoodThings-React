// src/components/Layouts/LoggedInLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import { useTheme } from '../Shared/ThemeProvider';
import { cn } from '@/lib/utils';
import { Models } from 'appwrite';

// Define the shape of the journal data state
interface JournalDataState {
  threeGoodThings: string[];
  isPublic: boolean;
  oneThorn: string;
  vibe: string;
  photoFileId: string | null;
  isPhotoPublic: boolean;
  selectedFile: File | null;
  journalText: string;
}

// 1. UPDATE THE PROPS INTERFACE
interface LoggedInLayoutProps {
  onLogout: () => void;
  currentUser: Models.User<Models.Preferences> | null;
  journalData: JournalDataState;
  onJournalDataChange: (field: keyof JournalDataState, value: any) => void;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ 
  onLogout, 
  currentUser, 
  journalData, 
  onJournalDataChange 
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn('min-h-screen', {
        'bg-gradient-to-b from-blue-900 to-indigo-950 text-white':
          theme === 'dark',
        'bg-gradient-to-b from-blue-100 to-white': theme === 'light',
      })}
    >
      <Header onLogout={onLogout} />
      <main>
        {/* 2. ADD THE JOURNAL STATE AND HANDLER TO THE OUTLET'S CONTEXT */}
        <Outlet context={{ 
          user: currentUser,
          journalData: journalData,
          onDataChange: onJournalDataChange,
        }} /> 
      </main>
    </div>
  );
};

export default LoggedInLayout;