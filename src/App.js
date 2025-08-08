import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Libros from './components/Libros';
import Autores from './components/Autores';
import SessionTokens from './components/SessionTokens';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        
        {/* RUTA PROTEGIDA */}
        <Route path="/menu" element={<Dashboard />}>
          <Route path="libros" element={<Libros />} />
          <Route path="autores" element={<Autores />} />
          <Route path="tokens" element={<SessionTokens />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
