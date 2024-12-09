import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleLogin = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <Router>
      <Routes>
        {!token ? (
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="/*" element={<Dashboard onLogout={handleLogout} />} />
        )}
        <Route path="*" element={!token ? <Navigate to="/login"/> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
