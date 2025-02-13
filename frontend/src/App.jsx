import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';  // Import useState
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import TakeData from './pages/TakeData';
//import Settings from './pages/Settings';

function App() {
  // State to track user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle logout, setting authenticated state to false
  const handleLogout = () => {
    setIsAuthenticated(false);  // This would be set after a successful logout
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster />

      {/* Conditionally render NavBar based on authentication state */}
      {isAuthenticated && <NavBar />}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/takedata" element={<TakeData onLogin={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}

export default App;
