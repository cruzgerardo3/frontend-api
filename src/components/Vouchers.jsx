import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Vouchers() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    type:'purchase',
    company_id:'',
    voucher_type:'CREDITO_FISCAL',
    voucher_number:'',
    date:'',
    amount:'',
    provider:'',
    client:''
  });
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(()=>{
    axios.get(`${API_URL}/companies`, {
      headers:{ Authorization: `Bearer ${token}`}
    }).then(res=>setCompanies(res.data));
  },[]);

  const handleCreate = async () => {
    const endpoint = form.type === 'purchase' ? 'purchase' : 'sale';
    const body = {
      company_id: form.company_id,
      voucher_type: form.voucher_type,
      voucher_number: form.voucher_number,
      date: form.date,
      amount: form.amount,
      pdf_url: '',
      json_url: ''
    };
    if(form.type === 'purchase'){
      body.provider = form.provider;
    } else {
      body.client = form.client;
    }
    try {
      await axios.post(`${API_URL}/vouchers/${endpoint}`, body, {
        headers:{ Authorization: `Bearer ${token}`}
      });
      alert('Comprobante creado');
    } catch(err){
      alert('Error al crear');
    }
  }

  return (
    <div>
      <h2>Comprobantes</h2>
      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
        <option value="purchase">Compra</option>
        <option value="sale">Venta</option>
      </select>
      <select value={form.company_id} onChange={e=>setForm({...form,company_id:e.target.value})}>
        <option value="">Seleccione empresa</option>
        {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select value={form.voucher_type} onChange={e=>setForm({...form,voucher_type:e.target.value})}>
        <option value="CREDITO_FISCAL">CREDITO_FISCAL</option>
        <option value="CONSUMIDOR_FINAL">CONSUMIDOR_FINAL</option>
      </select>
      <input placeholder="N° Comprobante" value={form.voucher_number} onChange={e=>setForm({...form,voucher_number:e.target.value})}/>
      <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <input placeholder="Monto" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
      {form.type==='purchase' ? (
        <input placeholder="Proveedor" value={form.provider} onChange={e=>setForm({...form,provider:e.target.value})}/>
      ) : (
        <input placeholder="Cliente" value={form.client} onChange={e=>setForm({...form,client:e.target.value})}/>
      )}
      <button onClick={handleCreate}>Crear Comprobante</button>
    </div>
  );
}

export default Vouchers;
