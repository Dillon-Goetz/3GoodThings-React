import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Shared/ThemeProvider'; // Make sure this path is correct

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
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

      {/* Right side: Theme Toggle Button */}
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-4 w-56 bg-card text-card-foreground rounded-md shadow-lg border z-10">
          <div className="p-2 flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start" onClick={() => handleNavigate('/profile')}>
              My Dashboard
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => handleNavigate('/journal')}>
              Log Today's Entry
            </Button>
            <Button variant="destructive" className="justify-start mt-2" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;