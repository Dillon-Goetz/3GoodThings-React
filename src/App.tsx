import { useState } from 'react'
import AuthPage from './components/Features/auth/components/AuthPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/auth" />} /> {/* Redirect if not logged in */}
        {/* other routes */}
      </Routes>
    </Router>
  );
};

export default App
