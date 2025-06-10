import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import { useTheme } from '../Shared/ThemeProvider';
import { cn } from '@/lib/utils';
import { Models } from 'appwrite'; // 1. Make sure Models is imported from appwrite

// 2. Define the props interface for the component
interface LoggedInLayoutProps {
  onLogout: () => void;
  currentUser: Models.User<Models.Preferences> | null; // 3. Add currentUser to the interface
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ onLogout, currentUser }) => {
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
        {/* Pass the currentUser to all child routes via the Outlet's context */}
        <Outlet context={{ user: currentUser }} /> 
      </main>
    </div>
  );
};

export default LoggedInLayout;