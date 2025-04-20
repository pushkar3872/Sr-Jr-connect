import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/Profilepage.jsx';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar.jsx';
import FindTeammatePage from './pages/FindTeammatePage.jsx';
import ConnectionPage from './pages/ConnectionPage.jsx';
import { useAuthstore } from './store/useAuthstore.js';
import { Loader } from 'lucide-react';
import SettingsPage from './pages/SettingsPage.jsx';
import { useThemeStore } from './store/useThemeStore.js';
import Page404 from './pages/Page404'; // ✅ Added 404 Page
import Events from './components/Events.jsx';

import AboutUs from './pages/AboutUs.jsx';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthstore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const ProtectedRoute = ({ element }) => {
    return authUser ? element : <Navigate to="/" />;
  };

  const PublicRoute = ({ element }) => {
    return !authUser ? element : <Navigate to="/" />;
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <Toaster />

      <NavBar />

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <WelcomePage />}
        />
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />

        {/* Protected routes */}
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/teammate" element={<ProtectedRoute element={<FindTeammatePage />} />} />
        <Route path="/connections" element={<ProtectedRoute element={<ConnectionPage />} />} />
        
        <Route path="/events" element={<ProtectedRoute element={<Events/>} />} />
        <Route path="/aboutus" element={<ProtectedRoute element={<AboutUs/>} />} />


        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
