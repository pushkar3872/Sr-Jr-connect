import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage'; // Fixed capitalization
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import FindTeammatePage from './pages/FindTeammatePage';
import ConnectionPage from './pages/ConnectionPage';
import { useAuthstore } from './store/useAuthstore';
import { Loader } from 'lucide-react';
import SettingsPage from './pages/SettingsPage';
import { useThemeStore } from './store/useThemestore';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthstore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Reusable protected route logic
  const ProtectedRoute = ({ element }) => {
    return authUser ? element : <Navigate to="/" />;
  };

  // Reusable public route logic (accessible only when not authenticated)
  const PublicRoute = ({ element }) => {
    return !authUser ? element : <Navigate to="/" />;
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <Toaster />
      <NavBar />

      <Routes>
        {/* Public routes */}
        <Route path="/"
          element={authUser
            ? <HomePage />
            : <WelcomePage />
          }
        />
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />

        {/* Protected routes */}
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
        <Route path="/teammate" element={<ProtectedRoute element={<FindTeammatePage />} />} />
        <Route path="/connections" element={<ProtectedRoute element={<ConnectionPage />} />} />

        {/* Catch-all route for 404 - add this if you need it */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
export default App;