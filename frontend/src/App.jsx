// src/App.jsx
import {Routes, Route, NavLink } from 'react-router-dom' // Import Router components
import WelcomePage from './logincomponents/WelcomePage'
import LoginPage from './logincomponents/LoginPage'
import RegisterPage from './logincomponents/RegisterPage'
import HomePage from './pages/HomePage';

function App() {
  return (

    <>
    <main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
    </main>
      

    </>
  )
}

export default App
