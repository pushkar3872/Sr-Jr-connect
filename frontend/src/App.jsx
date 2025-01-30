import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './logincomponents/WelcomePage';
import LoginPage from './logincomponents/LoginPage';
import RegisterPage from './logincomponents/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
