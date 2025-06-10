import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../LiteDarkToggle/ThemeToggle';
import { useTheme } from '../ThemeProvider'; // 1. Import the useTheme hook
import { cn } from '@/lib/utils'; // 2. Ensure cn (classnames utility) is imported

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme(); // 3. Get the current theme
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <header className="relative p-4 flex justify-between items-center">
      {/* Left side: Menu Icon and Logo */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/profile" className="text-xl font-bold tracking-tight">
          Daily Mindfull
        </Link>
      </div>

      <ThemeToggle />

      {/* Dropdown Menu */}
      {isMenuOpen && (
        // 4. Update the className to be conditional
        <div
          className={cn(
            "absolute top-16 left-4 w-56 rounded-md shadow-lg border z-10",
            // This applies a solid white or a solid dark background
            theme === 'light' ? 'bg-white text-black' : 'bg-[#1C2033] text-white'
          )}
        >
          <div className="p-2 flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigate('/profile')}
            >
              My Dashboard
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigate('/journal')}
            >
              Log Today's Entry
            </Button>
            <Button
              variant="destructive"
              className="justify-start"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;