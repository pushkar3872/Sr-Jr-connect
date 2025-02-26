import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';  // Import useState
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profilepage';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import TakeData from './pages/TakeData';
import FindTeammatePage from './pages/FindTeammatePage';
import ConnectionPage from './pages/ConnectionPage';


import { useAuthstore } from './store/useAuthstore';
import { Loader } from 'lucide-react';
import SettingsPage from './pages/SettingsPage';

//import Profilepage from './pages/Profile';

function App() {


  const { authUser, checkAuth, isCheckingAuth } = useAuthstore();

  useEffect(() => {
    // console.log("called !!!!")
    checkAuth();
  }, [checkAuth])


  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster />

      {/* Conditionally render NavBar based on authentication state */}
      <NavBar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <WelcomePage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />} />

        <Route path="/profile" element={authUser ? <ProfilePage /> : <WelcomePage />} />

        <Route path="/takedata" element={authUser ? <TakeData /> : <Navigate to={"/"} />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/teammate' element={authUser ? <FindTeammatePage /> : <WelcomePage />} />
        <Route path='/connections' element={authUser ? <ConnectionPage /> : <WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
