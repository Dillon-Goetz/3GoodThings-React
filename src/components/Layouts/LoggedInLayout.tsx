import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header'; // Import your Header component

interface LoggedInLayoutProps {
  onLogout: () => void;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ onLogout }) => {
  return (
    <div>
      <Header onLogout={onLogout} />
      <main>
        <Outlet /> {/* Renders the child route components */}
      </main>
    </div>
  );
};

export default LoggedInLayout;