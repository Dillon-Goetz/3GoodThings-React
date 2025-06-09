import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Shared/ThemeProvider';

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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setTheme(isChecked ? 'dark' : 'light');
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

      {/* Right side: Theme Toggle Slider */}
      <div>
        <label className="theme-slider-switch">
          <input
            type="checkbox"
            onChange={handleSliderChange}
            checked={theme === 'dark'}
          />
          <span className="theme-slider-slider round">
            <span className="slider-knob">
              <Sun className="sun-icon h-5 w-5" />
              <Moon className="moon-icon h-5 w-5" />
            </span>
          </span>
        </label>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-4 w-56 bg-card text-card-foreground rounded-md shadow-lg border z-10">
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