import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Headerstyling.css'; // Create this CSS file for styling

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false); // Close menu after logout
    navigate('/'); // Or navigate to your login page
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <Link to="/" className="logo">
          Daily Mindfulness
        </Link>
      </div>

      {isMenuOpen && (
        <div className="menu">
          <Link to="/profile" className="menu-item" onClick={() => setIsMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/vibe-check" className="menu-item" onClick={() => setIsMenuOpen(false)}>
            Log Entry
          </Link>
          <button onClick={handleLogout} className="menu-item logout">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;