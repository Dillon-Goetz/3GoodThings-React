// dillon-goetz/3goodthings-react/3GoodThings-React-f5ff1be69f4efc9501921ccccab53b65ab3eac26/src/components/Shared/Header/Header.tsx
import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import X icon for when menu is open
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../LiteDarkToggle/ThemeToggle';
import { useTheme } from '../ThemeProvider';
import { cn } from '@/lib/utils';
import DailyMindfullLogo from "@/assets/Daily_Mindfull-noBG.png"; // Ensure this path is correct

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Create refs for the menu container and the menu toggle button
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Assuming your Button component forwards ref to the native button element

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the menu is open, and the click is not on the menu itself,
      // and not on the button that toggles the menu, then close the menu.
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && // Check if buttonRef exists
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when the component mounts or when isMenuOpen changes
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts or effect re-runs
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // Dependency array: re-run effect if isMenuOpen changes

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false); // Close menu on logout
  };

  return (
    <header className="relative p-4 flex justify-between items-center">
      {/* Left side: Menu Icon and Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <Button
          ref={buttonRef} // Attach the ref to the button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <img src={DailyMindfullLogo || "/placeholder.svg"} alt="Daily Mindfull Logo" className="h-12 w-auto" />
        <Link to="/profile" className="text-xl font-bold tracking-tight">
          Daily Mindfull
        </Link>
      </div>

      <ThemeToggle />

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef} // Attach the ref to the menu container
          className={cn(
            "absolute top-16 left-4 w-56 rounded-md shadow-lg border z-10",
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
              variant="ghost"
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