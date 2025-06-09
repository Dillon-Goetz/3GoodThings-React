import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';

interface LoggedInLayoutProps {
  onLogout: () => void;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ onLogout }) => {
  return (
    // We wrap everything in a div with our new background style
    // 'min-h-screen' ensures it covers the full height of the screen
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-950">
      <Header onLogout={onLogout} />
      <main>
        <Outlet /> {/* Renders the child route components */}
      </main>
    </div>
  );
};

export default LoggedInLayout;