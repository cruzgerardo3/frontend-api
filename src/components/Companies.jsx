import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({name:'',type:'NATURAL',address:'',phone:'',email:''});
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;
  
  const role = localStorage.getItem('role'); // Deberías guardar el rol al loguear

  useEffect(()=>{
    axios.get(`${API_URL}/companies`, {
      headers:{ Authorization: `Bearer ${token}`}
    }).then(res=>setCompanies(res.data));
  },[]);

  const handleCreate = async () => {
    try {
      await axios.post(`${API_URL}/companies`, form, {
        headers:{ Authorization: `Bearer ${token}`}
      });
      alert('Empresa creada');
      window.location.reload();
    } catch(err){
      alert('No se pudo crear');
    }
  }

  return (
    <div>
      <h2>Empresas</h2>
      <ul>
        {companies.map(c=><li key={c.id}>{c.name} - {c.type}</li>)}
      </ul>
      {role === 'ADMIN' && (
        <div>
          <h3>Crear Empresa</h3>
          <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option value="NATURAL">NATURAL</option>
            <option value="JURIDICA">JURIDICA</option>
          </select>
          <input placeholder="Dirección" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <input placeholder="Teléfono" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <button onClick={handleCreate}>Crear</button>
        </div>
      )}
    </div>
  );
}

export default Companies;
