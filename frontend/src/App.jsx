import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';  // Import useState
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Profilepage from './pages/Profilepage';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import TakeData from './pages/TakeData';
import FindTeammate from "./pages/FindTeammate"

import { useAuthstore } from './store/useAuthstore';
import { Loader } from 'lucide-react';
import Settings from './pages/Settings';
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
        <Route path="/" element={!authUser ? <WelcomePage /> : <HomePage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/takedata" element={<TakeData />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/teammate' element={authUser ? <FindTeammate /> : <WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
