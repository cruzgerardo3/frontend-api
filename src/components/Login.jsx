import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${API_URL}/auth/login`, {username, password});
      onLogin(data.token);
    } catch(err) {
      alert('Credenciales inválidas');
    }
  }

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuario" value={username} onChange={e=>setUser(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPass(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
