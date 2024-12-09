import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [companies, setCompanies] = useState([]);
  const [type, setType] = useState('sales');
  const [company_id, setCompany] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState([]);

  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(()=>{
    axios.get(`${API_URL}/companies`, {
      headers:{ Authorization: `Bearer ${token}`}
    }).then(res=>setCompanies(res.data));
  },[]);

  const handleGenerate = async () => {
    const url = `${API_URL}/reports/${type}?company_id=${company_id}&from=${from}&to=${to}`;
    const {data} = await axios.get(url, {
      headers:{ Authorization: `Bearer ${token}`}
    });
    setReport(data);
  }

  return (
    <div>
      <h2>Reportes</h2>
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option value="sales">Ventas</option>
        <option value="purchases">Compras</option>
      </select>
      <select value={company_id} onChange={e=>setCompany(e.target.value)}>
        <option value="">Seleccione empresa</option>
        {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
      <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
      <button onClick={handleGenerate}>Generar Reporte</button>
      <h3>Resultados:</h3>
      <ul>
        {report.map(r=><li key={r.id}>{r.voucher_number} - {r.date} - {r.amount}</li>)}
      </ul>
    </div>
  );
}

export default Reports;
