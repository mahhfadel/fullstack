import React from 'react';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CriarContaPage from './pages/CriarContaPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/criar-conta" element={<CriarContaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
