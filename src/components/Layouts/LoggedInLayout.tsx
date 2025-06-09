import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import { useTheme } from '../Shared/ThemeProvider';
import { cn } from '@/lib/utils';

interface LoggedInLayoutProps {
  onLogout: () => void;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ onLogout }) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'min-h-screen',
        {
          // Dark theme classes
          'bg-gradient-to-b from-blue-900 to-indigo-950 text-white':
            theme === 'dark',
          // Light theme classes
          'bg-gradient-to-b from-blue-100 to-blue-200 text-gray-900':
            theme === 'light',
        }
      )}
    >
      <Header onLogout={onLogout} />
      <main>
        <Outlet /> {/* Renders the child route components */}
      </main>
    </div>
  );
};

export default LoggedInLayout;